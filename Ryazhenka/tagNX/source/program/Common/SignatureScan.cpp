#include "Common/SignatureScan.hpp"

/*
    Everything in this file is ChatGPT slop
    It works tho so :?
*/
namespace SignatureScan{
    std::pair<std::vector<uint8_t>, std::vector<bool>> ParsePattern(const char* pattern) {
        std::vector<uint8_t> bytes;
        std::vector<bool> mask;
        
        if (!pattern) {
            return {bytes, mask};
        }

        const char* ptr = pattern;
        while(*ptr) {
            // Skip spaces and non-printable characters
            if (*ptr <= 32 || *ptr > 126) {
                ptr++;
                continue;
            }
            
            // Handle wildcards
            if(*ptr == '?') {
                bytes.push_back(0);
                mask.push_back(false);
                ptr++;
                continue;
            }
            
            // Need at least 2 characters for a hex byte
            if (!ptr[0] || !ptr[1]) {
                break;
            }

            // Parse hex bytes - stricter checking
            if(isxdigit((unsigned char)ptr[0]) && isxdigit((unsigned char)ptr[1])) {
                char byte_str[3] = {ptr[0], ptr[1], '\0'};
                char* end_ptr = nullptr;
                long value = strtol(byte_str, &end_ptr, 16);
                
                // Validate conversion
                if (end_ptr != byte_str && value >= 0 && value <= 0xFF) {
                    bytes.push_back(static_cast<uint8_t>(value));
                    mask.push_back(true);
                }
                ptr += 2;
                continue;
            }
            
            // Skip invalid characters
            ptr++;
        }
        
        return {bytes, mask};
    }

    uintptr_t FindPattern(const char* pattern) {        
        uintptr_t start = exl::util::modules::GetMainInfo().m_Total.m_Start;
        size_t size = exl::util::modules::GetMainInfo().m_Total.m_Size;

        auto [bytes, mask] = ParsePattern(pattern);
        
        // Validate pattern
        if(bytes.empty() || bytes.size() != mask.size()) {
            return 0;
        }

        // Search memory range
        for(uintptr_t i = 0; i < size - bytes.size(); i++) {
            bool found = true;
            
            for(size_t j = 0; j < bytes.size(); j++) {
                // Skip wildcards
                if(!mask[j]) {
                    continue;
                }
                
                // Compare bytes
                if(bytes[j] != *(uint8_t*)(start + i + j)) {
                    found = false;
                    break;
                }
            }
            
            if(found) {
                return start + i;
            }
        }

        return 0;
    }
}