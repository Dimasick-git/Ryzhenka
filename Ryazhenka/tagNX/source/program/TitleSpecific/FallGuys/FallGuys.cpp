#include "FallGuys.hpp"
#include "Common/Dialog.hpp"
#include "Common/PiggybackCURL.hpp"

namespace TitleSpecific::FallGuys{
    void StartupCallback(){
        PiggybackCURL::SetupPiggyback(
            PiggybackCURL::EPiggybackMode::SignatureScan,
            "? ? ? D1 ? ? ? A9 ? ? ? 91 ? ? ? D0 ? ? ? B9",
            "? ? ? D1 ? ? ? A9 ? ? ? 91 ? ? ? A9 ? ? ? A9 ? ? ? A9 ? ? ? 3D ? ? ? 3D ? ? ? AD ? ? ? AD ? ? ? AD ? ? ? B4 ? ? ? 92",
            "? ? ? A9 ? ? ? A9 FD 03 00 91 F3 03 00 AA E0 03 01 AA ? ? ? 94",
            "? ? ? D1 ? ? ? A9 ? ? ? 91 ? ? ? F9 ? ? ? A9 ? ? ? A9 ? ? ? A9 ? ? ? 52 ? ? ? B4",
            "? ? ? D1 ? ? ? A9 ? ? ? 91 ? ? ? A9 ? ? ? A9 F3 03 01 AA F4 03 00 AA ? ? ? ? ? ? ? 72", nullptr, nullptr, nullptr);

        EOS::SetupForManualAuth("xyza7891mADED0tPNJFOiF8OmI0DwY0J", "8bedfebaf56f406ebab78986ada3f9b3", "Authorization: Basic eHl6YTc4OTFtQURFRDB0UE5KRk9pRjhPbUkwRHdZMEo6OHcyc0R3TDUvR3VVamVWYkhaSXhlMUZBRndpK3R1UUkybXNTQ1ZJTytFQQ==", "basic_profile+offline_access+openid");
    }

    /*
        Storytime!
        So when I originally developed this, I assumed that I didn't need to care about the local Nintendo account check
        Linkalho, Tinfoil, and I'm sure others exist, so why would I need to fake the presence of an account?
        Turns out there's an unresolved issue with fake account link homebrew that seems unresolved as of the time of writing:
        https://github.com/Atmosphere-NX/Atmosphere/issues/1987 (WAS THAT THE GITHUB ISSUE OF '87????)
        Because I don't like other people's hacky workarounds (only my own), I decided to try and work around it by stubbing the function
        in the SDK that checks for an account.
    */
    HOOK_DEFINE_TRAMPOLINE(AsyncIsDone){
        static __int64_t Callback(__int64_t* a1, bool* a2) {
            *a2 = true;

            return 0;
        }
    };

    HOOK_DEFINE_TRAMPOLINE(EnsureNetworkServiceAccountIDTokenCacheAsync){
        static __int64_t Callback(void* a1, __int64_t a2) {
            return 0;
        }
    };

    HOOK_DEFINE_TRAMPOLINE(GetSystemEvent){
        static __int64_t Callback(__int64_t a1, __int64_t* a2) {
            return 1;
        }
    };

    void InstallHooks(){
        EnsureNetworkServiceAccountIDTokenCacheAsync::InstallAtSymbol("_ZN2nn7account44EnsureNetworkServiceAccountIdTokenCacheAsyncEPNS0_12AsyncContextERKNS0_10UserHandleE");
        AsyncIsDone::InstallAtSymbol("_ZN2nn7account12AsyncContext7HasDoneEPb");
        GetSystemEvent::InstallAtSymbol("_ZN2nn7account12AsyncContext14GetSystemEventEPNS_2os11SystemEventE");
    }
}