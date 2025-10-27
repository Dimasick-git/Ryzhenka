#pragma once

#include "lib.hpp"
#include "Common/SignatureScan.hpp"

namespace PiggybackCURL{
    #define CURLOPT_URL 10002
    #define CURLOPT_POSTFIELDS 10015
    #define CURLOPT_POSTFIELDS 10015
    #define CURLOPT_HTTPHEADER 10023
    #define CURLOPT_WRITEFUNCTION 20011
    #define CURLOPT_WRITEDATA 10001
    #define CURLOPT_SSL_CTX_FUNCTION 20108

    struct CURL{

    };

    struct curl_slist{
        const char* data;
        curl_slist* next;
    };

    enum EPiggybackMode{
        Symbolicated,
        SignatureScan
    };

    extern EPiggybackMode mode;

    namespace Offsets{
        extern uintptr_t curl_easy_init;
        extern uintptr_t curl_easy_setopt;
        extern uintptr_t curl_slist_append;
        extern uintptr_t curl_easy_perform;
        extern uintptr_t ssl_ctx_cb;
        extern uintptr_t curl_multi_perform;
        extern uintptr_t curl_multi_init;
        extern uintptr_t curl_multi_add_handle;
    };

    void SetupPiggyback(EPiggybackMode setupMode, const char* curl_easy_init_pattern, const char* curl_easy_setopt_pattern, const char* curl_slist_append_pattern, const char* curl_easy_perform_pattern, const char* ssl_ctx_cb_pattern, const char* curl_multi_perform_pattern, const char* curl_multi_init_pattern, const char* curl_multi_add_handle_pattern);

    CURL* curl_easy_init();

    void curl_easy_setopt(CURL* curl, int opt, void* data);

    curl_slist* curl_slist_append(curl_slist* headers, const char* data);

    int curl_easy_perform(CURL* curl);

    __int64_t curl_multi_init();

    void curl_multi_add_handle(__int64_t multi_handle, CURL* easy_handle);

    __int64_t curl_multi_perform(__int64_t multi_handle, int* running);
}