#include "Minecraft.hpp"

namespace TitleSpecific::Minecraft{
    HOOK_DEFINE_TRAMPOLINE(NeuterNEX) {
        static __int64_t Callback() {
            return 0;
        }
    };

    HOOK_DEFINE_TRAMPOLINE(UnfuckServerListStructure) {
        static __int64_t Callback() {
            return 1;
        }
    };

    HOOK_DEFINE_TRAMPOLINE(UnfuckJoinPanel) {
        static __int64_t Callback() {
            return 1;
        }
    };

    HOOK_DEFINE_TRAMPOLINE(UnfuckServerList) {
        static __int64_t Callback(__int64_t a1, __int64_t a2, __int64_t a3, __int64_t a4, __int64_t a5, __int64_t a6, __int64_t a7) {
            return 1;
        }
    };

    void StartupCallback(){
        
    }

    void InstallHooks(){
        NeuterNEX::InstallAtSignature("? ? ? D1 ? ? ? A9 ? ? ? A9 ? ? ? A9 ? ? ? A9 ? ? ? A9 ? ? ? 91 ? ? ? 39 F3 03 00 AA ? ? ? F9 ? ? ? F9");
        UnfuckServerListStructure::InstallAtSignature("? ? ? D1 ? ? ? A9 ? ? ? A9 ? ? ? 91 F4 03 00 AA ? ? ? F9 F3 03 01 2A ? ? ? F9 ? ? ? F9 ? ? ? 91");
        UnfuckJoinPanel::InstallAtSignature("? ? ? A9 ? ? ? F9 FD 03 00 91 ? ? ? F9 ? ? ? F9 ? ? ? 97 ? ? ? 36 ? ? ? F9 ? ? ? 97 ? ? ? 36 ? ? ? F9 ? ? ? 97 ? ? ? 36 ? ? ? F9 ? ? ? 97");
        UnfuckServerList::InstallAtSignature("? ? ? A9 ? ? ? F9 FD 03 00 91 ? ? ? F9 ? ? ? F9 ? ? ? 97 ? ? ? 36 ? ? ? F9 ? ? ? 97 ? ? ? 36 ? ? ? F9 ? ? ? 97 ? ? ? 36 ? ? ? F9 ? ? ? 52");
    }
}