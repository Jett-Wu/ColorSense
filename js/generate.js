import { initThemeSwitch, initLangSwitch } from './shared.js';

class PaletteGenerator {
    constructor() {
        this.refreshBtn = document.querySelector('.refresh-btn');
        this.paletteContainer = document.querySelector('.palette-container');
        this.modeBtns = document.querySelectorAll('.mode-btn');
        this.currentMode = 'recommend';
        
        this.recommendedPalettes = [
            ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'],
            ['#D4A5A5', '#9D6381', '#445552', '#475841', '#87A878'],
            ['#FF9A8B', '#FFB5A7', '#FDC5BE', '#F8E1E4', '#E8C2CA'],
            ['#084C61', '#4F6D7A', '#56A3A6', '#9DC7C8', '#DBE9EE']
        ];
        
        this.setupEventListeners();
        this.generatePalettes();
    }
    
    setupEventListeners() {
        this.refreshBtn.addEventListener('click', () => {
            this.refreshBtn.classList.add('rotating');
            this.generatePalettes();
            setTimeout(() => {
                this.refreshBtn.classList.remove('rotating');
            }, 300);
        });
        
        this.modeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.modeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentMode = btn.dataset.mode;
                this.generatePalettes();
            });
        });
    }
    
    generatePalettes() {
        if (this.currentMode === 'recommend') {
            this.generateRecommendedPalettes();
        } else {
            this.generateCustomPalettes();
        }
    }
    
    generateRecommendedPalettes() {
        const palettes = this.recommendedPalettes.map(colors => {
            return `
                <div class="palette-card">
                    <div class="color-strip">
                        ${colors.map(color => `
                            <div class="color-block" style="background-color: ${color}">
                                <span class="color-value">${color}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="palette-actions">
                        <button class="copy-btn" title="复制色值">
                            <i class="fas fa-copy"></i>
                        </button>
                        <button class="like-btn" title="收藏">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        this.paletteContainer.innerHTML = palettes;
        this.setupPaletteInteractions();
    }

    generateCustomPalettes() {
        const customControls = `
            <div class="custom-controls">
                <div class="scheme-selector">
                    <button class="scheme-btn active" data-scheme="monochromatic">单色</button>
                    <button class="scheme-btn" data-scheme="complementary">互补色</button>
                    <button class="scheme-btn" data-scheme="triadic">三角色</button>
                </div>
                <div class="color-picker">
                    <label>选择基础色相</label>
                    <input type="color" value="#4A90E2">
                </div>
            </div>
            <div class="custom-palette">
                <!-- 动态生成的配色方案 -->
            </div>
        `;

        this.paletteContainer.innerHTML = customControls;
        this.setupCustomControls();
    }

    setupPaletteInteractions() {
        // 复制功能
        this.paletteContainer.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const colors = Array.from(
                    e.target.closest('.palette-card').querySelectorAll('.color-value')
                ).map(span => span.textContent);
                
                navigator.clipboard.writeText(colors.join(', ')).then(() => {
                    this.showToast('颜色已复制到剪贴板');
                });
            });
        });

        // 收藏功能
        this.paletteContainer.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const icon = btn.querySelector('i');
                icon.classList.toggle('far');
                icon.classList.toggle('fas');
            });
        });
    }

    setupCustomControls() {
        const colorPicker = this.paletteContainer.querySelector('input[type="color"]');
        const schemeBtns = this.paletteContainer.querySelectorAll('.scheme-btn');
        let currentScheme = 'monochromatic';

        colorPicker.addEventListener('input', () => {
            this.updateCustomPalette(colorPicker.value, currentScheme);
        });

        schemeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                schemeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentScheme = btn.dataset.scheme;
                this.updateCustomPalette(colorPicker.value, currentScheme);
            });
        });

        // 初始生成配色
        this.updateCustomPalette(colorPicker.value, currentScheme);
    }

    updateCustomPalette(baseColor, scheme) {
        const customPalette = this.paletteContainer.querySelector('.custom-palette');
        let colors;

        switch (scheme) {
            case 'monochromatic':
                colors = this.generateMonochromaticColors(baseColor);
                break;
            case 'complementary':
                colors = this.generateComplementaryColors(baseColor);
                break;
            case 'triadic':
                colors = this.generateTriadicColors(baseColor);
                break;
        }

        customPalette.innerHTML = `
            <div class="palette-card">
                <div class="color-strip">
                    ${colors.map(color => `
                        <div class="color-block" style="background-color: ${color}">
                            <span class="color-value">${color}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="palette-actions">
                    <button class="copy-btn" title="复制色值">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // 辅助方法：生成不同配色方案
    generateMonochromaticColors(baseColor) {
        // 实现单色配色逻辑
        return [baseColor, /* ... 其他变体色 ... */];
    }

    generateComplementaryColors(baseColor) {
        // 实现互补色配色逻辑
        return [baseColor, /* ... 互补色 ... */];
    }

    generateTriadicColors(baseColor) {
        // 实现三角配色逻辑
        return [baseColor, /* ... 其他两个色 ... */];
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }
}

// 初始化
function init() {
    initThemeSwitch();
    initLangSwitch();
    new PaletteGenerator();
}

document.addEventListener('DOMContentLoaded', init); 