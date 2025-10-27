#include "PiggybackCURL.hpp"

/*
    Here's what's up with this amalgam:
    libNX CURL requires libNX (duh), which can't coexist with the official Nintendo SDK.
    Fortunately, online games usually ship their own version of CURL.
    UNfortunately, in some cases these versions of CURL aren't symbolicated, forcing
    us to fall back to signature scanning.
*/
namespace PiggybackCURL{
    EPiggybackMode mode = EPiggybackMode::Symbolicated;

    namespace Offsets{
        uintptr_t curl_easy_init = 0;
        uintptr_t curl_easy_setopt = 0;
        uintptr_t curl_slist_append = 0;
        uintptr_t curl_easy_perform = 0;
        uintptr_t ssl_ctx_cb = 0;
        uintptr_t curl_multi_perform = 0;
        uintptr_t curl_multi_init = 0;
        uintptr_t curl_multi_add_handle = 0;
    };

    void SetupPiggyback(EPiggybackMode setupMode, const char* curl_easy_init_pattern, const char* curl_easy_setopt_pattern, const char* curl_slist_append_pattern, const char* curl_easy_perform_pattern, const char* ssl_ctx_cb_pattern, const char* curl_multi_perform_pattern, const char* curl_multi_init_offset, const char* curl_multi_add_handle_offset){
        mode = setupMode;

        if(mode == EPiggybackMode::SignatureScan){
            Offsets::curl_easy_init = SignatureScan::FindPattern(curl_easy_init_pattern);
            if(curl_easy_perform_pattern){
                Offsets::curl_easy_perform = SignatureScan::FindPattern(curl_easy_perform_pattern);
            }
            else{
                Offsets::curl_multi_perform = SignatureScan::FindPattern(curl_multi_perform_pattern);
                Offsets::curl_multi_init = SignatureScan::FindPattern(curl_multi_init_offset);
                Offsets::curl_multi_add_handle = SignatureScan::FindPattern(curl_multi_add_handle_offset);
            }
            Offsets::curl_easy_setopt = SignatureScan::FindPattern(curl_easy_setopt_pattern);
            Offsets::curl_slist_append = SignatureScan::FindPattern(curl_slist_append_pattern);
            Offsets::ssl_ctx_cb = SignatureScan::FindPattern(ssl_ctx_cb_pattern);
        }
    }

    CURL* curl_easy_init(){
        uintptr_t addr = Offsets::curl_easy_init;

        if(mode == EPiggybackMode::Symbolicated)
            nn::ro::LookupSymbol(&addr, "curl_easy_init");

        return reinterpret_cast<CURL*(*)()>(addr)();
    }

    void curl_easy_setopt(CURL* curl, int opt, void* data){
        uintptr_t addr = Offsets::curl_easy_setopt;

        if(mode == EPiggybackMode::Symbolicated)
            nn::ro::LookupSymbol(&addr, "curl_easy_setopt");

        return reinterpret_cast<void(*)(CURL*, int, void*)>(addr)(curl, opt, data);
    }

    curl_slist* curl_slist_append(curl_slist* headers, const char* data){
        uintptr_t addr = Offsets::curl_slist_append;

        if(mode == EPiggybackMode::Symbolicated)
            nn::ro::LookupSymbol(&addr, "curl_slist_append");

        return reinterpret_cast<curl_slist*(*)(curl_slist*, const char*)>(addr)(headers, data);
    }

    int curl_easy_perform(CURL* curl){
        uintptr_t addr = Offsets::curl_easy_perform;

        if(mode == EPiggybackMode::Symbolicated)
            nn::ro::LookupSymbol(&addr, "curl_easy_perform");

        return reinterpret_cast<int(*)(CURL*)>(addr)(curl);
    }

    __int64_t curl_multi_init(){
        uintptr_t addr = Offsets::curl_multi_init;

        if(mode == EPiggybackMode::Symbolicated)
            nn::ro::LookupSymbol(&addr, "curl_multi_init");

        return reinterpret_cast<__int64_t(*)()>(addr)();
    }

    void curl_multi_add_handle(__int64_t multi_handle, CURL* easy_handle){
        uintptr_t addr = Offsets::curl_multi_add_handle;

        if(mode == EPiggybackMode::Symbolicated)
            nn::ro::LookupSymbol(&addr, "curl_multi_add_handle");

        return reinterpret_cast<void(*)(__int64_t, CURL*)>(addr)(multi_handle, easy_handle);
    }

    __int64_t curl_multi_perform(__int64_t multi_handle, int* running){
        uintptr_t addr = Offsets::curl_multi_perform;

        if(mode == EPiggybackMode::Symbolicated)
            nn::ro::LookupSymbol(&addr, "curl_multi_perform");

        return reinterpret_cast<__int64_t(*)(__int64_t, int*)>(addr)(multi_handle, running);
    }
}