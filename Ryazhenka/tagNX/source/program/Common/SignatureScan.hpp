#pragma once

#include <utility>
#include <vector>
#include "lib.hpp"

namespace SignatureScan{
    std::pair<std::vector<uint8_t>, std::vector<bool>> ParsePattern(const char* pattern);

    uintptr_t FindPattern(const char* pattern);
}