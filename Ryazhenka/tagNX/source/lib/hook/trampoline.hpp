#pragma once

#include "base.hpp"
#include "util/func_ptrs.hpp"
#include <functional>

#define HOOK_DEFINE_TRAMPOLINE(name)                        \
struct name : public ::exl::hook::impl::TrampolineHook<name>

namespace nn::ro {
    Result LookupSymbol(uintptr_t* pOutAddress, const char* name);
};

/*
    Forward declaration because including Common/SignatureScan caused such a shitfuck
    I don't even want to *think* about doing this the right way
*/
namespace SignatureScan{
    std::pair<std::vector<uint8_t>, std::vector<bool>> ParsePattern(const char* pattern);

    uintptr_t FindPattern(const char* pattern);
}

namespace exl::hook::impl {

    template<typename Derived>
    class TrampolineHook {

        template<typename T = Derived>
        using CallbackFuncPtr = decltype(&T::Callback);

        static ALWAYS_INLINE auto& OrigRef() {
            _HOOK_STATIC_CALLBACK_ASSERT();

            static constinit CallbackFuncPtr<> s_FnPtr = nullptr;

            return s_FnPtr;
        }

        public:
        template<typename... Args>
        static ALWAYS_INLINE decltype(auto) Orig(Args &&... args) {
            _HOOK_STATIC_CALLBACK_ASSERT();

            return OrigRef()(std::forward<Args>(args)...);
        }

        static ALWAYS_INLINE void InstallAtOffset(ptrdiff_t address) {
            _HOOK_STATIC_CALLBACK_ASSERT();

            OrigRef() = hook::Hook(util::modules::GetTargetStart() + address, Derived::Callback, true);
        }

        template<typename T>
        static ALWAYS_INLINE void InstallAtFuncPtr(T ptr) {
            _HOOK_STATIC_CALLBACK_ASSERT();

            using Traits = util::FuncPtrTraits<T>;
            static_assert(std::is_same_v<typename Traits::CPtr, CallbackFuncPtr<>>, "Argument pointer type must match callback type!");

            OrigRef() = hook::Hook(ptr, Derived::Callback, true);
        }

        static ALWAYS_INLINE void InstallAtPtr(uintptr_t ptr) {
            _HOOK_STATIC_CALLBACK_ASSERT();
            
            OrigRef() = hook::Hook(ptr, Derived::Callback, true);
        }

        /*
            Looks up an exported symbol, and installs the hook at it if it exists.
            Fails gracefully and returns false if the symbol can't be found.

            NOTE: Some symbols that show up as exports in disassemblers AREN'T possible to lookup this way
        */
        static ALWAYS_INLINE bool InstallAtSymbol(const char* symbol) {
            _HOOK_STATIC_CALLBACK_ASSERT();
            uintptr_t ptr = 0;
            
            nn::ro::LookupSymbol(&ptr, symbol);

            if(ptr){
                OrigRef() = hook::Hook(ptr, Derived::Callback, true);
            }

            return ptr;
        }

        static ALWAYS_INLINE bool InstallAtSignature(const char* sig){
            _HOOK_STATIC_CALLBACK_ASSERT();
            uintptr_t ptr = SignatureScan::FindPattern(sig);

            if(ptr){
                OrigRef() = hook::Hook(ptr, Derived::Callback, true);
            }

            return ptr;
        }
    };

}
