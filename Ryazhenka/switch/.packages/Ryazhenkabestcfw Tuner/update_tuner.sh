#!/bin/bash
# ═══════════════════════════════════════════════════════════
#  Ryazhenkabestcfw Tuner - Auto Update Script
#  AI Test Patch - Nintendo Switch Homebrew
# ═══════════════════════════════════════════════════════════

# Конфигурация
GITHUB_REPO="Dimasick-git/Ryzhenka"
INSTALL_PATH="/switch/.packages/Ryazhenkabestcfw Tuner"
BACKUP_PATH="/switch/.packages/Ryazhenkabestcfw Tuner.backup"
RELEASE_URL="https://api.github.com/repos/${GITHUB_REPO}/releases/latest"

# Цвета для консоли Switch
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "═══════════════════════════════════════════════════════════"
echo "  Ryazhenkabestcfw Tuner - Auto Updater"
echo "  AI Test Patch v1.0"
echo "═══════════════════════════════════════════════════════════"
echo -e "${NC}"

# Функция проверки интернет-соединения
check_internet() {
    echo -e "${YELLOW}[*] Проверка интернет-соединения...${NC}"
    if ! ping -c 1 github.com &> /dev/null; then
        echo -e "${RED}[!] Ошибка: Нет подключения к интернету${NC}"
        exit 1
    fi
    echo -e "${GREEN}[✓] Интернет подключен${NC}"
}

# Функция получения последней версии
get_latest_version() {
    echo -e "${YELLOW}[*] Получение информации о последнем релизе...${NC}"
    LATEST_RELEASE=$(curl -s "${RELEASE_URL}")
    
    if [ -z "$LATEST_RELEASE" ]; then
        echo -e "${RED}[!] Ошибка: Не удалось получить информацию о релизе${NC}"
        exit 1
    fi
    
    VERSION=$(echo "$LATEST_RELEASE" | grep '"tag_name"' | cut -d '"' -f 4)
    DOWNLOAD_URL=$(echo "$LATEST_RELEASE" | grep '"browser_download_url"' | grep 'Tuner' | cut -d '"' -f 4 | head -n 1)
    
    echo -e "${GREEN}[✓] Найдена версия: ${VERSION}${NC}"
}

# Функция создания резервной копии
create_backup() {
    echo -e "${YELLOW}[*] Создание резервной копии текущей версии...${NC}"
    
    if [ -d "${INSTALL_PATH}" ]; then
        rm -rf "${BACKUP_PATH}"
        cp -r "${INSTALL_PATH}" "${BACKUP_PATH}"
        echo -e "${GREEN}[✓] Резервная копия создана в: ${BACKUP_PATH}${NC}"
    else
        echo -e "${YELLOW}[!] Текущая установка не найдена, пропуск резервного копирования${NC}"
    fi
}

# Функция загрузки обновления
download_update() {
    echo -e "${YELLOW}[*] Загрузка обновления...${NC}"
    
    TEMP_FILE="/tmp/tuner_update.zip"
    
    if [ -z "$DOWNLOAD_URL" ]; then
        echo -e "${RED}[!] Ошибка: URL загрузки не найден${NC}"
        exit 1
    fi
    
    curl -L -o "${TEMP_FILE}" "${DOWNLOAD_URL}"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}[✓] Загрузка завершена${NC}"
    else
        echo -e "${RED}[!] Ошибка при загрузке${NC}"
        exit 1
    fi
}

# Функция установки обновления
install_update() {
    echo -e "${YELLOW}[*] Установка обновления...${NC}"
    
    # Распаковка
    unzip -o "${TEMP_FILE}" -d "${INSTALL_PATH}"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}[✓] Обновление установлено${NC}"
        rm -f "${TEMP_FILE}"
    else
        echo -e "${RED}[!] Ошибка при установке${NC}"
        # Восстановление из резервной копии
        if [ -d "${BACKUP_PATH}" ]; then
            echo -e "${YELLOW}[*] Восстановление из резервной копии...${NC}"
            rm -rf "${INSTALL_PATH}"
            cp -r "${BACKUP_PATH}" "${INSTALL_PATH}"
            echo -e "${GREEN}[✓] Восстановление завершено${NC}"
        fi
        exit 1
    fi
}

# Функция обновления конфигурации
update_config() {
    echo -e "${YELLOW}[*] Обновление конфигурации...${NC}"
    
    CONFIG_FILE="${INSTALL_PATH}/package.ini"
    if [ -f "${CONFIG_FILE}" ]; then
        # Обновляем дату последнего обновления
        CURRENT_DATE=$(date +"%Y-%m-%d %H:%M:%S")
        sed -i "s/last_update=.*/last_update=${CURRENT_DATE}/" "${CONFIG_FILE}"
        echo -e "${GREEN}[✓] Конфигурация обновлена${NC}"
    fi
}

# Основная логика
main() {
    check_internet
    get_latest_version
    create_backup
    download_update
    install_update
    update_config
    
    echo -e "${GREEN}"
    echo "═══════════════════════════════════════════════════════════"
    echo "  Обновление успешно завершено!"
    echo "  Версия: ${VERSION}"
    echo "═══════════════════════════════════════════════════════════"
    echo -e "${NC}"
    
    echo -e "${YELLOW}Перезапустите тюнер для применения изменений${NC}"
}

# Запуск скрипта
main

# ═══════════════════════════════════════════════════════════
# ИНСТРУКЦИИ ПО ИСПОЛЬЗОВАНИЮ:
# ═══════════════════════════════════════════════════════════
# 1. Скопируйте этот скрипт в: /switch/.packages/Ryazhenkabestcfw Tuner/
# 2. Сделайте его исполняемым: chmod +x update_tuner.sh
# 3. Запустите через hbmenu или напрямую: ./update_tuner.sh
# 4. Скрипт автоматически:
#    - Проверит интернет-соединение
#    - Найдёт последний релиз на GitHub
#    - Создаст резервную копию текущей версии
#    - Загрузит и установит обновление
#    - Обновит конфигурацию package.ini
# 5. В случае ошибки произойдёт автоматическое восстановление
#
# АВТОМАТИЗАЦИЯ:
# Добавьте в cron для автоматических обновлений:
# 0 3 * * * /switch/.packages/Ryazhenkabestcfw\ Tuner/update_tuner.sh
#
# Создано AI Test Patch для Nintendo Switch Homebrew Community
# ═══════════════════════════════════════════════════════════
