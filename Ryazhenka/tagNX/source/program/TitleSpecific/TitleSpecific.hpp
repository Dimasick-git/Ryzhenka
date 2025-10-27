#include "lib.hpp"
#include "EDIT_ME_IF_BUILDING.hpp"

#include "TitleSpecific/FallGuys/FallGuys.hpp"
#include "TitleSpecific/AmongUs/AmongUs.hpp"
#include "TitleSpecific/Dauntless/Dauntless.hpp"
#include "TitleSpecific/Minecraft/Minecraft.hpp"

namespace TitleSpecific{
    /*
        Some C++ wizard could def pull out something much better here, but I'm not that guy (tm)
        So you get this massive switch statement
    */
    void InstallTitleSpecificHooks(){
        switch(TITLEID){
            case 0x0100C3C015738000: // Fall Guys
                FallGuys::InstallHooks();
                break;
            case 0x0100B0C013912000: // Among Us
                AmongUs::InstallHooks();
                break;
            case 0x0100B9500D1B0000: // Dauntless
                Dauntless::InstallHooks();
                break;
            case 0x0100D71004694000: // Minecraft
                Minecraft::InstallHooks();
                break;
            default:
                break;
        }
    }

    void RunTitleSpecificStartupCallbacks(){
        switch(TITLEID){
            case 0x0100C3C015738000: // Fall Guys
                FallGuys::StartupCallback();
                break;
            case 0x0100B0C013912000: // Among Us
                AmongUs::StartupCallback();
                break;
            case 0x0100B9500D1B0000: // Dauntless
                Dauntless::StartupCallback();
                break;
            case 0x0100D71004694000: // Minecraft
                Minecraft::StartupCallback();
                break;
            default:
                break;
        }
    }
}