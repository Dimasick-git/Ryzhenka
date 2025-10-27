#pragma once

#include "lib.hpp"
#include "Common/PiggybackCURL.hpp"
#include "cJSON/cJSON.h"
#include "Common/Dialog.hpp"
#include <utility>
#include <sstream>
#include <iomanip>

#define EOS_EpicAccountId __int64_t // Close enough

// Stuff we need for manual auth
#define EPIC_AUTH_URL "https://api.epicgames.dev/epic/oauth/v2/deviceAuthorization"
#define EPIC_TOKEN_URL "https://api.epicgames.dev/epic/oauth/v2/token"

namespace EOS{
    // Many struct defs from the EOS C SDK docs, we're just assuming they're the same
    // on switch as they are everywhere else
    struct EOS_Auth_Credentials{
        int32_t ApiVersion;
        const char* Id;
        const char* Token;
        uint8_t Type;
        void* SystemAuthCredentialsOptions;
        uint8_t ExternalType;
    };

    struct EOS_Auth_LoginOptions{
        int32_t ApiVersion;
        EOS_Auth_Credentials* Credentials;
        uint8_t ScopeFlags;
        uint64_t LoginFlags;
    };

    struct EOS_Connect_Credentials{
        uint32_t ApiVersion;
        const char* Token;
        uint8_t Type;
    };

    struct EOS_Connect_LoginOptions{
        int32_t ApiVersion;
        EOS_Connect_Credentials* Credentials;
        void* UserLoginInfo;
    };

    struct EOS_Auth_LoginCallbackInfo{
        int32_t responseCode = 0;
        void* ClientData;
        EOS_EpicAccountId LocalUserId;
        void* PinGrantInfo;
        void* ContinuanceToken; //COULD BE WRONG WARNING WARNING
        void* idrc;
        EOS_EpicAccountId SelectedAccountId;
    };

    struct EOS_Auth_CopyIdTokenOptions{
        int32_t ApiVersion;
        EOS_EpicAccountId AccountId;
    };

    struct EOS_Auth_IdToken{
        int32_t ApiVersion;
        EOS_EpicAccountId AccountId;
        const char* JsonWebToken;
    };

    struct EOS_Auth_CopyUserAuthTokenOptions{
        int32_t ApiVersion;
    };

    struct EOS_Auth_Token{
        int32_t ApiVersion;
        const char* App;
        const char* ClientId;
        EOS_EpicAccountId AccountId;
        const char* AccessToken;
        double ExpiresIn;
        const char* ExpiresAt;
        uint8_t AuthType;
        const char* RefreshToken;
        double RefreshExpiresIn;
        const char* RefreshExpiresAt;
    };

    // Structure to store write callback data
    typedef struct {
        char *data;
        size_t size;
    } WriteBuffer;

    // Callback function for CURL write operations
    static size_t WriteCallback(void *contents, size_t size, size_t nmemb, void *userp) {
        size_t realsize = size * nmemb;
        WriteBuffer *wb = (WriteBuffer *)userp;

        char *ptr = (char*)realloc(wb->data, wb->size + realsize + 1);
        if(!ptr) {
            return 0;
        }

        wb->data = ptr;
        memcpy(&(wb->data[wb->size]), contents, realsize);
        wb->size += realsize;
        wb->data[wb->size] = 0;

        return realsize;
    }

    // Globals
    static EOS_EpicAccountId g_accId = 0x0;
    static __int64_t g_origLoginCallback = 0x0;
    static __int64_t g_authHandle = 0x0;
    static bool g_EOSHooked = false;
    static const char* g_manualAccessToken = "";

    static const char* g_clientId;
    static const char* g_deploymentId;
    static const char* g_authHeader;
    static const char* g_scopes;

    void SetupForManualAuth(const char* clientId, const char* deploymentId, const char* authHeader, const char* scopes);

    void OnLoginCallback(EOS_Auth_LoginCallbackInfo* Data);
    
    void TryInstallEOSHooks();

    std::pair<const char*, const char*> InitiateDeviceAuth(const char* clientId, const char* scopes);

    const char* CheckForRefreshToken(const char* deviceCode, const char* deploymentId, const char* authorizationHeader);

    const char* CheckForAccessToken(const char* deviceCode, const char* deploymentId, const char* authorizationHeader);

    void ShowDialog(const char* text);
}