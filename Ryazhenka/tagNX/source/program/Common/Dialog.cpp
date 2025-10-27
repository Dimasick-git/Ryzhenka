#include "Dialog.hpp"

namespace Dialog{
    /*
        Hijacks the application error dialog to show arbitrary text
    */
    void ShowDialog(const char* text){
        uintptr_t addrConstructApplicationErrorArg = 0x0;
        
        nn::ro::LookupSymbol(&addrConstructApplicationErrorArg, "_ZN2nn3err19ApplicationErrorArgC1Ev");

        __int64_t applicationErrorArg = (__int64_t)malloc(0x100);

        reinterpret_cast<void(*)(__int64_t)>(addrConstructApplicationErrorArg)(applicationErrorArg);

        uintptr_t addrSetDialogMessage = 0x0;

        nn::ro::LookupSymbol(&addrSetDialogMessage, "_ZN2nn3err19ApplicationErrorArg16SetDialogMessageEPKc");

        reinterpret_cast<void(*)(__int64_t, const char*)>(addrSetDialogMessage)(applicationErrorArg, text);

        uintptr_t addrSetErrorCodeNumber = 0x0;

        nn::ro::LookupSymbol(&addrSetErrorCodeNumber, "_ZN2nn3err19ApplicationErrorArg29SetApplicationErrorCodeNumberEj");

        reinterpret_cast<void(*)(__int64_t, unsigned int)>(addrSetErrorCodeNumber)(applicationErrorArg, 69);

        uintptr_t addrSetLanguageCode = 0x0;

        __int32_t languageCode = 0;

        nn::ro::LookupSymbol(&addrSetLanguageCode, "_ZN2nn3err19ApplicationErrorArg15SetLanguageCodeERKNS_8settings12LanguageCodeE");

        reinterpret_cast<void(*)(__int64_t, int*)>(addrSetLanguageCode)(applicationErrorArg, &languageCode);

        uintptr_t addrShowApplicationError = 0x0;

        nn::ro::LookupSymbol(&addrShowApplicationError, "_ZN2nn3err20ShowApplicationErrorERKNS0_19ApplicationErrorArgE");

        reinterpret_cast<void(*)(__int64_t)>(addrShowApplicationError)(applicationErrorArg);
    }
}