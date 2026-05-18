(function() {
    // 1. Система смены цвета (Тем)
    const themes = {
        purple: {
            primary: 'oklch(62.7% .265 303.9)',
            gradient: 'linear-gradient(to bottom right, oklch(38.1% .176 304.987), oklch(20.8% .042 265.755))'
        },
        blue: {
            primary: 'oklch(62.3% .214 259.815)',
            gradient: 'linear-gradient(to bottom right, oklch(48.8% .243 264.376), oklch(20.8% .042 265.755))'
        },
        green: {
            primary: 'oklch(72.3% .219 149.579)',
            gradient: 'linear-gradient(to bottom right, oklch(59.6% .145 163.225), oklch(20.8% .042 265.755))'
        },
        red: {
            primary: 'oklch(63.7% .237 25.331)',
            gradient: 'linear-gradient(to bottom right, oklch(57.7% .245 27.325), oklch(20.8% .042 265.755))'
        }
    };

    function setTheme(themeName) {
        const theme = themes[themeName];
        if (!theme) return;
        document.documentElement.style.setProperty('--color-purple-500', theme.primary);
        document.documentElement.style.setProperty('--color-purple-600', theme.primary);
        // Дополнительные корректировки для градиентов фона, если они зашиты в CSS
        localStorage.setItem('ryzhenka-theme', themeName);
    }

    // Загрузка сохраненной темы
    const savedTheme = localStorage.getItem('ryzhenka-theme');
    if (savedTheme) {
        setTimeout(() => setTheme(savedTheme), 100);
    }

    // 2. Система чатов (Улучшение)
    // Мы можем добавить кнопку в настройки или просто сделать интерфейс выбора темы
    
    function injectSettings() {
        const settingsContainer = document.createElement('div');
        settingsContainer.id = 'custom-settings-panel';
        settingsContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 15px;
            border-radius: 12px;
            z-index: 1000;
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            display: none;
        `;
        
        settingsContainer.innerHTML = `
            <h3 style="margin-bottom: 10px; font-size: 16px;">Настройки темы</h3>
            <div style="display: flex; gap: 10px;">
                <div class="theme-dot" data-theme="purple" style="width: 25px; height: 25px; border-radius: 50%; background: oklch(62.7% .265 303.9); cursor: pointer;"></div>
                <div class="theme-dot" data-theme="blue" style="width: 25px; height: 25px; border-radius: 50%; background: oklch(62.3% .214 259.815); cursor: pointer;"></div>
                <div class="theme-dot" data-theme="green" style="width: 25px; height: 25px; border-radius: 50%; background: oklch(72.3% .219 149.579); cursor: pointer;"></div>
                <div class="theme-dot" data-theme="red" style="width: 25px; height: 25px; border-radius: 50%; background: oklch(63.7% .237 25.331); cursor: pointer;"></div>
            </div>
        `;
        
        document.body.appendChild(settingsContainer);
        
        settingsContainer.querySelectorAll('.theme-dot').forEach(dot => {
            dot.addEventListener('click', () => setTheme(dot.dataset.theme));
        });

        // Добавим кнопку вызова настроек
        const settingsBtn = document.createElement('button');
        settingsBtn.innerHTML = '⚙️';
        settingsBtn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1001;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            cursor: pointer;
            font-size: 20px;
        `;
        settingsBtn.onclick = () => {
            const panel = document.getElementById('custom-settings-panel');
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        };
        document.body.appendChild(settingsBtn);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectSettings);
    } else {
        injectSettings();
    }
})();
