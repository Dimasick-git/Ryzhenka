#!/bin/bash

# Ryazhenka Build Script
# Скрипт для локальной сборки проекта

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Конфигурация
PROJECT_NAME="Ryazhenka"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
BUILD_DIR="$PROJECT_ROOT/build"
DIST_DIR="$PROJECT_ROOT/dist"

# Функции
print_header() {
    echo -e "${BLUE}═══════════════════════════════════════════${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Получение версии из CHANGELOG
get_version() {
    if [ -f "$PROJECT_ROOT/CHANGELOG.md" ]; then
        head -n 5 "$PROJECT_ROOT/CHANGELOG.md" | grep -oP '\[\K[0-9]+\.[0-9]+\.[0-9]+' | head -1
    else
        echo "0.0.0"
    fi
}

# Проверка зависимостей
check_dependencies() {
    print_header "🔍 Проверка зависимостей"
    
    local deps=("zip" "sha256sum" "git")
    local missing_deps=()
    
    for cmd in "${deps[@]}"; do
        if command -v "$cmd" &> /dev/null; then
            print_success "$cmd установлен"
        else
            missing_deps+=("$cmd")
            print_error "$cmd не найден"
        fi
    done
    
    if [ ${#missing_deps[@]} -gt 0 ]; then
        print_error "Установите отсутствующие зависимости: ${missing_deps[*]}"
        exit 1
    fi
}

# Создание директорий сборки
setup_build_dirs() {
    print_header "📁 Подготовка директорий"
    
    rm -rf "$BUILD_DIR" "$DIST_DIR" 2>/dev/null || true
    mkdir -p "$BUILD_DIR" "$DIST_DIR"
    
    print_success "Директории созданы: $BUILD_DIR, $DIST_DIR"
}

# Сборка проекта
build_project() {
    print_header "🔨 Сборка проекта"
    
    local version=$(get_version)
    local archive_name="${PROJECT_NAME}-${version}.zip"
    local archive_path="$BUILD_DIR/$archive_name"
    
    print_info "Версия: $version"
    print_info "Архив: $archive_name"
    
    cd "$PROJECT_ROOT"
    
    # Создание архива
    zip -r "$archive_path" . \
        --exclude "*.git*" \
        --exclude ".github/*" \
        --exclude "build/*" \
        --exclude "dist/*" \
        --exclude "node_modules/*" \
        --exclude ".env*" \
        --exclude "*.DS_Store" \
        > /dev/null 2>&1
    
    if [ -f "$archive_path" ]; then
        local size=$(du -h "$archive_path" | cut -f1)
        print_success "Архив создан: $archive_name ($size)"
    else
        print_error "Ошибка при создании архива"
        exit 1
    fi
}

# Генерация контрольных сумм
generate_checksums() {
    print_header "🔐 Генерация контрольных сумм"
    
    cd "$BUILD_DIR"
    
    # SHA256
    sha256sum *.zip > checksums-sha256.txt
    print_success "SHA256 контрольные суммы: checksums-sha256.txt"
    
    # MD5
    md5sum *.zip > checksums-md5.txt
    print_success "MD5 контрольные суммы: checksums-md5.txt"
    
    # Вывод контрольных сумм
    print_info "SHA256:"
    cat checksums-sha256.txt
}

# Статистика проекта
print_statistics() {
    print_header "📊 Статистика проекта"
    
    local file_count=$(find "$PROJECT_ROOT" -type f -not -path '*/\.git/*' | wc -l)
    local dir_count=$(find "$PROJECT_ROOT" -type d -not -path '*/\.git/*' | wc -l)
    local total_size=$(du -sh "$PROJECT_ROOT" | cut -f1)
    local build_size=$(du -sh "$BUILD_DIR" | cut -f1)
    
    echo "Всего файлов: $file_count"
    echo "Всего директорий: $dir_count"
    echo "Размер проекта: $total_size"
    echo "Размер сборки: $build_size"
}

# Копирование в dist
copy_to_dist() {
    print_header "📤 Копирование результатов в dist"
    
    cp -r "$BUILD_DIR"/* "$DIST_DIR/"
    
    print_success "Файлы скопированы в $DIST_DIR"
}

# Генерация отчёта о сборке
generate_build_report() {
    print_header "📝 Генерация отчёта о сборке"
    
    local report_file="$BUILD_DIR/BUILD_REPORT.md"
    local version=$(get_version)
    local build_time=$(date '+%Y-%m-%d %H:%M:%S')
    local git_commit=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
    local git_branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
    
    cat > "$report_file" << EOF
# 🔨 Build Report — $PROJECT_NAME v$version

**Build Date**: $build_time
**Git Commit**: $git_commit
**Git Branch**: $git_branch

## 📦 Build Artifacts
$(ls -lh "$BUILD_DIR"/*.zip 2>/dev/null | awk '{print "- " $9 " (" $5 ")"}')

## 🔐 Checksums (SHA256)
\`\`\`
$(cat "$BUILD_DIR/checksums-sha256.txt")
\`\`\`

## 📊 File Statistics
$(print_statistics)

## ✅ Build Status
- ✓ Project built successfully
- ✓ Checksums generated
- ✓ Artifacts ready for distribution

---
*Generated by Ryazhenka Build Script*
EOF
    
    print_success "Отчёт создан: BUILD_REPORT.md"
}

# Основной workflow
main() {
    echo ""
    echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║   🥛 Ryazhenka Build Script          ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
    echo ""
    
    check_dependencies
    setup_build_dirs
    build_project
    generate_checksums
    copy_to_dist
    generate_build_report
    print_statistics
    
    echo ""
    echo -e "${GREEN}✅ Сборка завершена успешно!${NC}"
    echo -e "${BLUE}📁 Результаты в: $DIST_DIR${NC}"
    echo ""
}

# Запуск
main "$@"
