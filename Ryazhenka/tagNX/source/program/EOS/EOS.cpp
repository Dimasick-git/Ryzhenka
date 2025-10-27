#include "EOS.hpp"

namespace EOS{
    void SetupForManualAuth(const char* clientId, const char* deploymentId, const char* authHeader, const char* scopes){
        g_clientId = clientId;
        g_deploymentId = deploymentId;
        g_authHeader = authHeader;
        g_scopes = scopes;
    }

    /*
        EOS_Auth_Login is often the first function called during EOS authentication.
        We need to intercept this call and redirect it to login using the EOS Overlay,
        instead of trying to use our (fake) Switch system credentials.

        NOTE: The system overlay will not fire if a proxy is present,
        and will sometimes fail for completely unknown reasons.

        Most games that call this function will call EOS_Connect_Login next.
        For that call, we will need:
            - The signed in user's account ID (returned in the callback, a4)
            - The Auth Handle (a1)
    */
    void OnLoginCallback(EOS_Auth_LoginCallbackInfo* Data){
        g_accId = Data->LocalUserId;
        reinterpret_cast<void(*)(EOS_Auth_LoginCallbackInfo*)>(g_origLoginCallback)(Data);
    }

    HOOK_DEFINE_TRAMPOLINE(EOSAuthLogin) {
        static __int64_t Callback(__int64_t a1, EOS_Auth_LoginOptions* Options, __int64_t a3, __int64_t a4) {
            auto creds = InitiateDeviceAuth(g_clientId, g_scopes);

            std::string d("To sign in with your Epic Games account, visit:\n");
            d.append(std::string(creds.second));
            d.append("\n");
            d.append("Then click OK once signed in!");

            Dialog::ShowDialog(d.c_str());

            const char* refreshToken = CheckForRefreshToken(creds.first, g_deploymentId, g_authHeader);

            while(!refreshToken){
                std::string d("To sign in with your Epic Games account, visit:\n");
                d.append(std::string(creds.second));
                d.append("\n");
                d.append("Then click OK once signed in!");

                Dialog::ShowDialog(d.c_str());

                refreshToken = CheckForRefreshToken(creds.first, g_deploymentId, g_authHeader);
            }

            Options->Credentials->Type = 0x5;
            Options->Credentials->SystemAuthCredentialsOptions = nullptr;
            Options->Credentials->Id = nullptr;
            Options->Credentials->Token = refreshToken;
            g_authHandle = a1;
            g_origLoginCallback = a4;
            a4 = (__int64_t)OnLoginCallback;

            return Orig(a1, Options, a3, a4);
        }
    };

    /*
        In most EOS auth setups, EOS_Connect_Login is called after EOS_Auth_Login.
        In this case our course of action is simple:
        Use our already obtained auth handle and account ID to copy the auth token
        we got in EOS_Auth_Login, then intercept this call and sign in with said auth token.

        Some games however, ONLY call this function for EOS authentication.
        In these cases, we need to call EOS_Auth_Login ourselves, using some game-specific variables.
        After this the flow is identical, intercept the call and sign in with our new auth token.
    */
    HOOK_DEFINE_TRAMPOLINE(EOSConnectLogin) {
        static __int64_t Callback(__int64_t a1, EOS_Connect_LoginOptions* Options, __int64_t a3, __int64_t a4) {
            if(g_authHandle){ // We have called EOS_Auth_Login before now, so we're good to copy that token and sign in with it
                Options->UserLoginInfo = nullptr;
                Options->Credentials->Type = 0x0;

                uintptr_t addrCopyIdToken = 0x0;

                EOS_Auth_Token* idToken = new EOS_Auth_Token();

                EOS_Auth_CopyUserAuthTokenOptions options = EOS_Auth_CopyUserAuthTokenOptions();

                options.ApiVersion = 1;

                nn::ro::LookupSymbol(&addrCopyIdToken, "EOS_Auth_CopyUserAuthToken");

                reinterpret_cast<void(*)(__int64_t, EOS_Auth_CopyUserAuthTokenOptions*, EOS_EpicAccountId, EOS_Auth_Token**)>(addrCopyIdToken)(g_authHandle, &options, g_accId, &idToken);

                Options->Credentials->Token = idToken->AccessToken;
            }
            else{ // We haven't called EOS_Auth_Login, and probably won't if we're here, so we need to manually trigger device auth and use that token
                Options->UserLoginInfo = nullptr;
                Options->Credentials->Type = 0x0;

                auto creds = InitiateDeviceAuth(g_clientId, g_scopes);

                std::string d("To sign in with your Epic Games account, visit:\n");
                d.append(std::string(creds.second));
                d.append("\n");
                d.append("Then click OK once signed in!");

                const char* authToken = CheckForAccessToken(creds.first, g_deploymentId, g_authHeader);

                while(!authToken){
                    std::string d("To sign in with your Epic Games account, visit:\n");
                    d.append(std::string(creds.second));
                    d.append("\n");
                    d.append("Then click OK once signed in!");

                    Dialog::ShowDialog(d.c_str());

                    authToken = CheckForRefreshToken(creds.first, g_deploymentId, g_authHeader);
                }

                Options->Credentials->Token = authToken;
            }

            __int64_t ret = Orig(a1, Options, a3, a4);

            return ret;
        }
    };

    struct EOS_Platform_Options{
        int32_t ApiVersion;
        void* Reserved;
        const char* ProductId;
        const char* SandboxId;
        const char* ClientId;
        const char* ClientSecret;
        __int32_t bIsServer;
        const char* EncryptionKey;
        const char* OverrideCountryCode;
        const char* OverrideLocaleCode;
        const char* DeploymentId;
        uint64_t Flags;
        const char* CacheDirectory;
        uint32_t TickBudgetInMilliseconds;
        void* RTCOptions;
        __int64_t IntegratedPlatformOptionsContainerHandle;
        const void* SystemSpecificOptions;
        double* TaskNetworkTimeoutSeconds;
    };

    HOOK_DEFINE_TRAMPOLINE(EOSPlatformCreate) {
        static __int64_t Callback(EOS_Platform_Options* Options){
            Options->IntegratedPlatformOptionsContainerHandle = 0x0;

            return Orig(Options);
        }
    };

    /*
        InstallAtSymbol gracefully fails if the symbol isn't present,
        and we have a global variable preventing us from hooking things twice,
        so we can spam this function anytime we think the EOS SDK might have been loaded in.
    */
    void TryInstallEOSHooks(){
        if(!g_EOSHooked){
            bool hookedAuth = EOSAuthLogin::InstallAtSymbol("EOS_Auth_Login");
            bool hookedConnect = EOSConnectLogin::InstallAtSymbol("EOS_Connect_Login");

            EOSPlatformCreate::InstallAtSymbol("EOS_Platform_Create");

            if(hookedAuth || hookedConnect){ // If we hooked something
                g_EOSHooked = true; // Don't do it again, or we'll crash
            }
        }
    }

    std::pair<const char*, const char*> InitiateDeviceAuth(const char* clientId, const char* scopes){
        PiggybackCURL::CURL *curl;
        int res = 0;
        WriteBuffer wb = {0};
        bool success = false;

        const char* deviceCode = "";
        const char* verificationUri = "";

        curl = PiggybackCURL::curl_easy_init();
        char post_data[512];
        snprintf(post_data, sizeof(post_data), "client_id=%s&scope=%s", clientId, scopes);
        PiggybackCURL::curl_easy_setopt(curl, CURLOPT_URL, (void*)EPIC_AUTH_URL);
        PiggybackCURL::curl_easy_setopt(curl, CURLOPT_POSTFIELDS, post_data);
        PiggybackCURL::curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, (void*)WriteCallback);
        PiggybackCURL::curl_easy_setopt(curl, CURLOPT_WRITEDATA, &wb);
        PiggybackCURL::curl_easy_setopt(curl, CURLOPT_SSL_CTX_FUNCTION, (void*)PiggybackCURL::Offsets::ssl_ctx_cb);
        struct PiggybackCURL::curl_slist *headers = NULL;
        headers = PiggybackCURL::curl_slist_append(headers, "Content-Type: application/x-www-form-urlencoded");
        PiggybackCURL::curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

        if(PiggybackCURL::Offsets::curl_easy_perform){
            res = PiggybackCURL::curl_easy_perform(curl);
        }
        else{
            __int64_t multi = PiggybackCURL::curl_multi_init();

            PiggybackCURL::curl_multi_add_handle(multi, curl);

            int running = 1;
            while(running){
                PiggybackCURL::curl_multi_perform(multi, &running);
            }
        }

        if(res == 0) {
            cJSON *json = cJSON_Parse(wb.data);
            if(json) {
                cJSON *device_code_json = cJSON_GetObjectItem(json, "device_code");
                cJSON *verification_uri_json = cJSON_GetObjectItem(json, "verification_uri_complete");
                if(device_code_json && verification_uri_json) {
                    deviceCode = strdup(device_code_json->valuestring);
                    verificationUri = strdup(verification_uri_json->valuestring);
                    success = true;
                }
                cJSON_Delete(json);
            }
        }

        return {deviceCode, verificationUri};
    }

    std::string UrlEncode(const std::string &value) {
        std::ostringstream escaped;
        escaped.fill('0');
        escaped << std::hex;

        for (std::string::const_iterator i = value.begin(), n = value.end(); i != n; ++i) {
            std::string::value_type c = (*i);

            // Keep alphanumeric and other accepted characters intact
            if (isalnum(c) || c == '-' || c == '_' || c == '.' || c == '~') {
                escaped << c;
                continue;
            }

            // Any other characters are percent-encoded
            escaped << std::uppercase;
            escaped << '%' << std::setw(2) << int((unsigned char) c);
            escaped << std::nouppercase;
        }

        return escaped.str();
    }

    const char* CheckForRefreshToken(const char* deviceCode, const char* deploymentId, const char* authorizationHeader){
        PiggybackCURL::CURL *curl;
        int res = 0;
        WriteBuffer wb = {0};

        curl = PiggybackCURL::curl_easy_init();

        char post_data[1024];
        snprintf(post_data, sizeof(post_data), 
                "grant_type=device_code&device_code=%s&deployment_id=%s",
                UrlEncode(deviceCode).c_str(), deploymentId);
        struct PiggybackCURL::curl_slist *headers = NULL;
        headers = PiggybackCURL::curl_slist_append(headers, "Content-Type: application/x-www-form-urlencoded");
        headers = PiggybackCURL::curl_slist_append(headers, authorizationHeader);
        wb.data = NULL;
        wb.size = 0;
        PiggybackCURL::curl_easy_setopt(curl, CURLOPT_URL, (void*)EPIC_TOKEN_URL);
        PiggybackCURL::curl_easy_setopt(curl, CURLOPT_POSTFIELDS, post_data);
        PiggybackCURL::curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, (void*)WriteCallback);
        PiggybackCURL::curl_easy_setopt(curl, CURLOPT_WRITEDATA, &wb);
        PiggybackCURL::curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        PiggybackCURL::curl_easy_setopt(curl, CURLOPT_SSL_CTX_FUNCTION, (void*)PiggybackCURL::Offsets::ssl_ctx_cb);
        if(PiggybackCURL::Offsets::curl_easy_perform){
            res = PiggybackCURL::curl_easy_perform(curl);
        }
        else{
            __int64_t multi = PiggybackCURL::curl_multi_init();

            PiggybackCURL::curl_multi_add_handle(multi, curl);

            int running = 1;
            while(running){
                PiggybackCURL::curl_multi_perform(multi, &running);
            }
        }
        if(res == 0) {
            cJSON *json = cJSON_Parse(wb.data);
            if(json) {
                cJSON *refresh_token_json = cJSON_GetObjectItem(json, "refresh_token");
                if(refresh_token_json) {
                    return strdup(refresh_token_json->valuestring);
                }
            }
        }

        return nullptr;
    }

    const char* CheckForAccessToken(const char* deviceCode, const char* deploymentId, const char* authorizationHeader){
        PiggybackCURL::CURL *curl;
        int res;
        WriteBuffer wb = {0};

        curl = PiggybackCURL::curl_easy_init();

        char post_data[1024];
        snprintf(post_data, sizeof(post_data), 
                "grant_type=device_code&device_code=%s&deployment_id=%s",
                UrlEncode(deviceCode).c_str(), deploymentId);
        struct PiggybackCURL::curl_slist *headers = NULL;
        headers = PiggybackCURL::curl_slist_append(headers, "Content-Type: application/x-www-form-urlencoded");
        headers = PiggybackCURL::curl_slist_append(headers, authorizationHeader);
        wb.data = NULL;
        wb.size = 0;
        PiggybackCURL::curl_easy_setopt(curl, CURLOPT_URL, (void*)EPIC_TOKEN_URL);
        PiggybackCURL::curl_easy_setopt(curl, CURLOPT_POSTFIELDS, post_data);
        PiggybackCURL::curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, (void*)WriteCallback);
        PiggybackCURL::curl_easy_setopt(curl, CURLOPT_WRITEDATA, &wb);
        PiggybackCURL::curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        PiggybackCURL::curl_easy_setopt(curl, CURLOPT_SSL_CTX_FUNCTION, (void*)PiggybackCURL::Offsets::ssl_ctx_cb);
        if(PiggybackCURL::Offsets::curl_easy_perform){
            res = PiggybackCURL::curl_easy_perform(curl);
        }
        else{
            __int64_t multi = PiggybackCURL::curl_multi_init();

            PiggybackCURL::curl_multi_add_handle(multi, curl);

            int running = 1;
            while(running){
                PiggybackCURL::curl_multi_perform(multi, &running);
            }
        }
        if(res == 0) {
            cJSON *json = cJSON_Parse(wb.data);
            if(json) {
                cJSON *refresh_token_json = cJSON_GetObjectItem(json, "access_token");
                if(refresh_token_json) {
                    return strdup(refresh_token_json->valuestring);
                }
            }
        }

        return nullptr;
    }
}