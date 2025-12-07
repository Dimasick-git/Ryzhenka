#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Ryazhenka Release Manager
Управляет релизами и генерирует информацию о них
"""

import os
import json
import hashlib
import subprocess
import re
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional

class ReleaseManager:
    """Класс для управления релизами Ryazhenka"""
    
    def __init__(self, project_root: str = "."):
        self.project_root = Path(project_root)
        self.changelog_path = self.project_root / "CHANGELOG.md"
        self.readme_path = self.project_root / "README.md"
        self.manifests_path = self.project_root / "manifests.json"
        
    def get_version(self) -> str:
        """Получает текущую версию из CHANGELOG.md"""
        try:
            with open(self.changelog_path, 'r', encoding='utf-8') as f:
                content = f.read()
            match = re.search(r'\[\d+\.\d+\.\d+\]', content)
            if match:
                return match.group(0)[1:-1]  # Убираем скобки
        except Exception as e:
            print(f"❌ Ошибка при чтении версии: {e}")
        return "0.0.0"
    
    def get_latest_changes(self, limit: int = 20) -> List[str]:
        """Получает последние изменения из CHANGELOG.md"""
        try:
            with open(self.changelog_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            
            changes = []
            in_version = False
            count = 0
            
            for line in lines:
                if re.match(r'## \[\d+\.\d+\.\d+\]', line):
                    if in_version and count > 0:
                        break
                    in_version = True
                    continue
                
                if in_version and line.strip().startswith('-'):
                    changes.append(line.strip()[1:].strip())
                    count += 1
                    if count >= limit:
                        break
            
            return changes
        except Exception as e:
            print(f"❌ Ошибка при чтении изменений: {e}")
            return []
    
    def calculate_file_hash(self, file_path: str, algorithm: str = 'sha256') -> str:
        """Вычисляет хеш файла"""
        hash_obj = hashlib.new(algorithm)
        try:
            with open(file_path, 'rb') as f:
                for chunk in iter(lambda: f.read(4096), b''):
                    hash_obj.update(chunk)
            return hash_obj.hexdigest()
        except Exception as e:
            print(f"❌ Ошибка при вычислении хеша: {e}")
            return ""
    
    def generate_release_info(self, version: str, file_path: Optional[str] = None) -> Dict:
        """Генерирует информацию о релизе"""
        release_info = {
            "version": version,
            "date": datetime.now().isoformat(),
            "changelog_url": f"https://github.com/Dimasick-git/Ryzhenka/blob/main/CHANGELOG.md#{version.replace('.', '')}",
            "download_url": f"https://github.com/Dimasick-git/Ryzhenka/releases/download/v{version}/Ryazhenka-{version}.zip",
            "changes": self.get_latest_changes()
        }
        
        if file_path and os.path.exists(file_path):
            release_info["file"] = {
                "name": os.path.basename(file_path),
                "size": os.path.getsize(file_path),
                "sha256": self.calculate_file_hash(file_path, 'sha256'),
                "md5": self.calculate_file_hash(file_path, 'md5')
            }
        
        return release_info
    
    def generate_manifests(self, output_file: Optional[str] = None) -> Dict:
        """Генерирует manifests.json с информацией о всех релизах"""
        manifests = {
            "project": "Ryazhenka",
            "description": "Best Custom Firmware for Nintendo Switch",
            "repository": "https://github.com/Dimasick-git/Ryzhenka",
            "latest_version": self.get_version(),
            "updated": datetime.now().isoformat(),
            "components": {
                "hekate": {
                    "description": "Bootloader",
                    "repository": "https://github.com/CTCaer/hekate",
                    "version": "6.2.0+"
                },
                "atmosphere": {
                    "description": "Custom Firmware",
                    "repository": "https://github.com/Atmosphere-NX/Atmosphere",
                    "version": "1.8.0+"
                },
                "tesla-menu": {
                    "description": "Overlay System",
                    "repository": "https://github.com/WerWolv/Tesla-Menu"
                },
                "ryazhahand-overlay": {
                    "description": "Controller Management Overlay",
                    "repository": "https://github.com/Dimasick-git/Ryazhahand-Overlay"
                },
                "sys-clk": {
                    "description": "CPU/GPU Overclocking Module",
                    "repository": "https://github.com/Ryazhenka-Helper-1/Sys-clk-for-RYZ"
                }
            },
            "quick_links": {
                "downloads": "https://github.com/Dimasick-git/Ryzhenka/releases",
                "installation": "https://github.com/Dimasick-git/Ryzhenka/blob/main/INSTALL.md",
                "documentation": "https://github.com/Dimasick-git/Ryzhenka/wiki",
                "issues": "https://github.com/Dimasick-git/Ryzhenka/issues",
                "telegram": "https://t.me/Ryazhenkacfw",
                "youtube": "https://www.youtube.com/@Dimaick-git"
            }
        }
        
        if output_file:
            try:
                with open(output_file, 'w', encoding='utf-8') as f:
                    json.dump(manifests, f, indent=2, ensure_ascii=False)
                print(f"✓ Manifests сохранены: {output_file}")
            except Exception as e:
                print(f"❌ Ошибка при сохранении manifests: {e}")
        
        return manifests
    
    def update_manifests(self) -> None:
        """Обновляет manifests.json в корне проекта"""
        output_file = str(self.manifests_path)
        self.generate_manifests(output_file)
    
    def get_git_info(self) -> Dict:
        """Получает информацию о текущем коммите"""
        try:
            commit = subprocess.check_output(
                ["git", "rev-parse", "--short", "HEAD"],
                cwd=self.project_root,
                text=True
            ).strip()
            
            branch = subprocess.check_output(
                ["git", "rev-parse", "--abbrev-ref", "HEAD"],
                cwd=self.project_root,
                text=True
            ).strip()
            
            return {
                "commit": commit,
                "branch": branch
            }
        except Exception as e:
            print(f"⚠ Не удалось получить информацию о git: {e}")
            return {"commit": "unknown", "branch": "unknown"}
    
    def print_release_info(self, version: Optional[str] = None) -> None:
        """Выводит информацию о релизе"""
        if not version:
            version = self.get_version()
        
        print("\n" + "="*50)
        print(f"🥛 Ryazhenka Release Information")
        print("="*50)
        
        git_info = self.get_git_info()
        release_info = self.generate_release_info(version)
        
        print(f"\n📌 Version: {version}")
        print(f"📅 Date: {release_info['date']}")
        print(f"🔗 Git Commit: {git_info['commit']}")
        print(f"🌳 Git Branch: {git_info['branch']}")
        
        print(f"\n📥 Download: {release_info['download_url']}")
        print(f"📖 Changelog: {release_info['changelog_url']}")
        
        print(f"\n📋 Latest Changes:")
        for i, change in enumerate(release_info['changes'], 1):
            print(f"  {i}. {change}")
        
        print("\n" + "="*50 + "\n")


def main():
    """Главная функция"""
    import sys
    
    manager = ReleaseManager()
    
    if len(sys.argv) < 2:
        manager.print_release_info()
    else:
        command = sys.argv[1].lower()
        
        if command == "version":
            print(manager.get_version())
        
        elif command == "info":
            version = sys.argv[2] if len(sys.argv) > 2 else None
            manager.print_release_info(version)
        
        elif command == "manifests":
            manager.update_manifests()
        
        elif command == "changes":
            limit = int(sys.argv[2]) if len(sys.argv) > 2 else 20
            changes = manager.get_latest_changes(limit)
            for change in changes:
                print(f"- {change}")
        
        elif command == "hash":
            if len(sys.argv) < 3:
                print("❌ Usage: python3 release_manager.py hash <file_path>")
                sys.exit(1)
            file_path = sys.argv[3]
            algo = sys.argv[3] if len(sys.argv) > 3 else "sha256"
            file_hash = manager.calculate_file_hash(file_path, algo)
            print(f"{algo.upper()}: {file_hash}")
        
        else:
            print(f"❌ Неизвестная команда: {command}")
            print("\nДоступные команды:")
            print("  version      - Показать текущую версию")
            print("  info         - Показать информацию о релизе")
            print("  manifests    - Обновить manifests.json")
            print("  changes      - Показать последние изменения")
            print("  hash         - Вычислить хеш файла")


if __name__ == "__main__":
    main()
