import { initThemeSwitch, initLangSwitch, getTranslations } from './shared.js';

// 配色方案生成器
class PaletteGenerator {
    constructor() {
        this.refreshBtn = document.querySelector('.refresh-btn');
        this.paletteGrid = document.querySelector('.palette-grid');
        this.colorSchemes = []; // 缓存生成的配色方案
        
        this.setupEventListeners();
        this.generatePalettes(); // 初始生成配色
    }
    
    setupEventListeners() {
        this.refreshBtn.addEventListener('click', () => {
            // 使用 requestAnimationFrame 优化动画性能
            requestAnimationFrame(() => {
                this.refreshBtn.style.pointerEvents = 'none';
                this.refreshBtn.classList.add('rotating');
                this.generatePalettes();
                
                setTimeout(() => {
                    this.refreshBtn.style.pointerEvents = 'auto';
                    this.refreshBtn.classList.remove('rotating');
                }, 300);
            });
        });
    }
    
    generatePalettes() {
        // 使用 DocumentFragment 减少 DOM 操作
        const fragment = document.createDocumentFragment();
        this.colorSchemes = []; // 清空缓存
        
        // 预先生成所有配色方案
        for (let i = 0; i < 6; i++) {
            const colors = this.generateColorScheme();
            this.colorSchemes.push(colors);
            fragment.appendChild(this.createPaletteCard(colors));
        }
        
        // 一次性更新 DOM
        this.paletteGrid.innerHTML = '';
        this.paletteGrid.appendChild(fragment);
    }
    
    generateColorScheme() {
        const baseHue = Math.floor(Math.random() * 360);
        const scheme = [];
        const schemeType = Math.floor(Math.random() * 3);
        
        // 预计算常用值
        const hue120 = (baseHue + 120) % 360;
        const hue180 = (baseHue + 180) % 360;
        const hue240 = (baseHue + 240) % 360;
        
        switch (schemeType) {
            case 0: // 单色配色
                scheme.push(
                    this.hslToHex(baseHue, 70, 50),
                    this.hslToHex(baseHue, 60, 70),
                    this.hslToHex(baseHue, 80, 30),
                    this.hslToHex(baseHue, 50, 60),
                    this.hslToHex(baseHue, 90, 40)
                );
                break;
                
            case 1: // 互补色配色
                scheme.push(
                    this.hslToHex(baseHue, 70, 50),
                    this.hslToHex(baseHue, 60, 70),
                    this.hslToHex(hue180, 70, 50),
                    this.hslToHex(hue180, 60, 70),
                    this.hslToHex(baseHue, 80, 40)
                );
                break;
                
            case 2: // 三角配色
                scheme.push(
                    this.hslToHex(baseHue, 70, 50),
                    this.hslToHex(hue120, 70, 50),
                    this.hslToHex(hue240, 70, 50),
                    this.hslToHex(baseHue, 60, 70),
                    this.hslToHex(hue120, 60, 70)
                );
                break;
        }
        
        return scheme;
    }
    
    createPaletteCard(colors) {
        const card = document.createElement('div');
        card.className = 'color-card';
        
        // 使用模板字符串优化 HTML 创建
        card.innerHTML = `
            <div class="color-strip">
                ${colors.map(color => 
                    `<div class="color" style="background-color: ${color}"></div>`
                ).join('')}
            </div>
            <div class="color-info">
                <div class="hex-codes">
                    ${colors.map(color => 
                        `<span class="hex-code" data-color="${color}">${color.toUpperCase()}</span>`
                    ).join('')}
                </div>
            </div>
        `;
        
        // 使用事件委托优化事件监听
        card.querySelector('.hex-codes').addEventListener('click', (e) => {
            if (e.target.classList.contains('hex-code')) {
                const color = e.target.dataset.color;
                navigator.clipboard.writeText(color);
                
                const originalText = e.target.textContent;
                const lang = localStorage.getItem('language') || 'zh';
                e.target.textContent = getTranslations()[lang].palettes.copied;
                
                setTimeout(() => {
                    e.target.textContent = originalText;
                }, 1000);
            }
        });
        
        return card;
    }
    
    // 优化的 HSL 转 Hex 函数
    hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        
        // 使用位运算优化计算
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