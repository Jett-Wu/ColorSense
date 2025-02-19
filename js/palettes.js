import { initThemeSwitch, initLangSwitch, getTranslations } from './shared.js';

// 配色方案生成器
class PaletteGenerator {
    constructor() {
        this.refreshBtn = document.querySelector('.refresh-btn');
        this.paletteGrid = document.querySelector('.palette-grid');
        
        this.setupEventListeners();
        this.generatePalettes(); // 初始生成配色
    }
    
    setupEventListeners() {
        this.refreshBtn.addEventListener('click', () => {
            this.refreshBtn.style.pointerEvents = 'none'; // 防止重复点击
            this.generatePalettes();
            setTimeout(() => {
                this.refreshBtn.style.pointerEvents = 'auto';
            }, 500);
        });
    }
    
    generatePalettes() {
        this.paletteGrid.innerHTML = ''; // 清空现有配色
        
        // 生成6个配色方案
        for (let i = 0; i < 6; i++) {
            const colors = this.generateColorScheme();
            this.createPaletteCard(colors);
        }
    }
    
    generateColorScheme() {
        // 随机生成基础色相
        const baseHue = Math.floor(Math.random() * 360);
        const scheme = [];
        
        // 随机选择配色方案类型
        const schemeType = Math.floor(Math.random() * 3);
        
        switch (schemeType) {
            case 0: // 单色配色
                scheme.push(this.hslToHex(baseHue, 70, 50));
                scheme.push(this.hslToHex(baseHue, 60, 70));
                scheme.push(this.hslToHex(baseHue, 80, 30));
                scheme.push(this.hslToHex(baseHue, 50, 60));
                scheme.push(this.hslToHex(baseHue, 90, 40));
                break;
                
            case 1: // 互补色配色
                scheme.push(this.hslToHex(baseHue, 70, 50));
                scheme.push(this.hslToHex(baseHue, 60, 70));
                scheme.push(this.hslToHex((baseHue + 180) % 360, 70, 50));
                scheme.push(this.hslToHex((baseHue + 180) % 360, 60, 70));
                scheme.push(this.hslToHex(baseHue, 80, 40));
                break;
                
            case 2: // 三角配色
                scheme.push(this.hslToHex(baseHue, 70, 50));
                scheme.push(this.hslToHex((baseHue + 120) % 360, 70, 50));
                scheme.push(this.hslToHex((baseHue + 240) % 360, 70, 50));
                scheme.push(this.hslToHex(baseHue, 60, 70));
                scheme.push(this.hslToHex((baseHue + 120) % 360, 60, 70));
                break;
        }
        
        return scheme;
    }
    
    createPaletteCard(colors) {
        const card = document.createElement('div');
        card.className = 'color-card';
        
        const strip = document.createElement('div');
        strip.className = 'color-strip';
        
        colors.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'color';
            colorDiv.style.backgroundColor = color;
            strip.appendChild(colorDiv);
        });
        
        const info = document.createElement('div');
        info.className = 'color-info';
        
        const hexCodes = document.createElement('div');
        hexCodes.className = 'hex-codes';
        
        colors.forEach(color => {
            const code = document.createElement('span');
            code.className = 'hex-code';
            code.textContent = color.toUpperCase();
            code.addEventListener('click', () => {
                navigator.clipboard.writeText(color);
                const lang = localStorage.getItem('language') || 'zh';
                code.textContent = getTranslations()[lang].palettes.copied;
                setTimeout(() => {
                    code.textContent = color.toUpperCase();
                }, 1000);
            });
            hexCodes.appendChild(code);
        });
        
        info.appendChild(hexCodes);
        card.appendChild(strip);
        card.appendChild(info);
        this.paletteGrid.appendChild(card);
    }
    
    hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }
}

// 初始化
function init() {
    initThemeSwitch();
    initLangSwitch();
    new PaletteGenerator();
}

document.addEventListener('DOMContentLoaded', init); 