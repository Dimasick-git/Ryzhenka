#include "lib.hpp"
#include "EOS/EOS.hpp"
#include "Common/Common.hpp"
#include "TitleSpecific/TitleSpecific.hpp"

extern "C" void exl_main(void* x0, void* x1) {
    /* Setup hooking environment. */
    exl::hook::Initialize();

    Common::InstallCommonHooks();

    EOS::TryInstallEOSHooks();

    TitleSpecific::RunTitleSpecificStartupCallbacks();

    TitleSpecific::InstallTitleSpecificHooks();
}

extern "C" NORETURN void exl_exception_entry() {
    /* Note: this is only applicable in the context of applets/sysmodules. */
    EXL_ABORT("Something has gone horrifically wrong, you should never see this!");
}