#include "Common.hpp"
#include "EOS/EOS.hpp"

namespace Common{
    /*
        This call just errors if a network service account isn't available.
        All we need to do to stub it properly is return RESULT_OK, or 0.
    */
    HOOK_DEFINE_TRAMPOLINE(EnsureNetworkServiceAccountAvailable) {
        static __int64_t Callback(__int64_t a1) {
            return 0;
        }
    };

    /*
        Same as EnsureNetworkServiceAccountAvailable, but the boolean a1 is passed out as a status check.
        To stub, return RESULT_OK and make sure *a1 is true.
    */
    HOOK_DEFINE_TRAMPOLINE(IsNetworkServiceAccountAvailable) {
        static __int64_t Callback(bool *a1, __int64_t a2) {
            *a1 = true;
            return 0;
        }
    };

    /*
        Some network service account checks don't fire immediately, but create
        async contexts which then return whether a network service account is available.
        Even if these calls fail, they will stay on the "happy path" until the result itself is requested.
        We hook here as a catch-all, to ensure that all async account-related things appear good.
    */
    HOOK_DEFINE_TRAMPOLINE(AsyncContextGetResult) {
        static __int64_t Callback(__int64_t* a1) {
            return 0;
        }
    };

    /*
        We tell our first lie here - A console that has not been linked with a Nintendo account will not have
        a network service account id. While this is possible to fake (see linkalho, tinfoil, et al.), it's just
        easier to take care of it here. To stub we need to return, you guessed it, RESULT_OK, and some nonzero
        value for the network service account id itself.
    */
    HOOK_DEFINE_TRAMPOLINE(GetNetworkServiceAccountId) {
        static __int64_t Callback(__int64_t* a1, __int64_t a2) {
            *a1 = 0x69;
            return 0;
        }
    };

    /*
        This is *the* function we can't fake, that prevents us from logging in "the right way."
        The flow on an online switch is the following simplified:
            - Send credentials to Nintendo
            - Nintendo signs a token for us, that will expire after a set amount of time
            - We send that token to the requesting application
        If we're banned or otherwise unable to talk to Nintendo, they can't/won't give us these tokens.
        While we know exactly what the payload of the token SHOULD be, we cryptographically can't sign them ourselves as only Nintendo has the key to.
        This stub serves two purposes:
            - For applications that just care about something that "looks correct", and not the actual signature/content of the token this will be enough to fool them
            - For applications that DO care about the token but that we have other methods to login to, we typically need to get past this step in order to authenticate
        In either case, this stub returns a somewhat realistic looking token with no identifying info, that will fail if actually inspected.
    */
    HOOK_DEFINE_TRAMPOLINE(LoadNSAIDTokenCache) {
        static __int64_t Callback(unsigned long* a1, const char** a2, unsigned long a3, __int64_t a4) {
            *a1 = strlen(DUMMY_TOKEN);

            *a2 = DUMMY_TOKEN;

            EOS::TryInstallEOSHooks(); // Not a great programming pattern, but in some games the EOS SDK is loaded in at runtime, forcing us to try and guess when it'll be needed. If an EOS game is asking for the the token cache, it's a pretty good guess it's about to run the EOS login process, which will fail if not hooked. Therefore, we attempt to hook it here.

            return 0;
        }
    };

    /*
        Not 100% sure on this one, but it's necessary for games like Minecraft Dungeons to run properly.
    */
    HOOK_DEFINE_TRAMPOLINE(GetNetworkServiceLicenseKind){
        static __int64_t Callback(__int64_t a1) {
            return 1;
        }
    };

    HOOK_DEFINE_TRAMPOLINE(LoadModule){
        static __int64_t Callback(__int64_t a1, __int64_t a2, __int64_t a3, __int64_t a4, int a5){
            EOS::TryInstallEOSHooks();

            __int64_t ret = Orig(a1, a2, a3, a4, a5);

            EOS::TryInstallEOSHooks();

            return ret;
        }
    };

    /*
        These functions are present on virtually all online Switch games, and need to be stubbed to either bypass online auth, or to keep us on the "happy path" to enable further auth tampering.
    */
    void InstallCommonHooks(){
        EnsureNetworkServiceAccountAvailable::InstallAtSymbol("_ZN2nn7account36EnsureNetworkServiceAccountAvailableERKNS0_10UserHandleE");
        IsNetworkServiceAccountAvailable::InstallAtSymbol("_ZN2nn7account32IsNetworkServiceAccountAvailableEPbRKNS0_10UserHandleE");
        AsyncContextGetResult::InstallAtSymbol("_ZN2nn7account12AsyncContext9GetResultEv");
        GetNetworkServiceAccountId::InstallAtSymbol("_ZN2nn7account26GetNetworkServiceAccountIdEPNS0_23NetworkServiceAccountIdERKNS0_10UserHandleE");
        LoadNSAIDTokenCache::InstallAtSymbol("_ZN2nn7account37LoadNetworkServiceAccountIdTokenCacheEPmPcmRKNS0_10UserHandleE");
        GetNetworkServiceLicenseKind::InstallAtSymbol("_ZN2nn7account37AsyncNetworkServiceLicenseInfoContext28GetNetworkServiceLicenseKindEv");
        LoadModule::InstallAtSymbol("_ZN2nn2ro10LoadModuleEPNS0_6ModuleEPKvPvmi");
    }
}