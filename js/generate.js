import { initThemeSwitch, initLangSwitch } from './shared.js';

class PaletteGenerator {
    constructor() {
        this.refreshBtn = document.querySelector('.refresh-btn');
        this.paletteContainer = document.querySelector('.palette-container');
        
        this.recommendedPalettes = {
            academic: [
                // 基础学术配色
                ['#001219', '#005F73', '#0A9396', '#94D2BD', '#E9D8A6'],
                ['#1B263B', '#415A77', '#778DA9', '#E0E1DD', '#FFFFFF'],
                ['#14213D', '#455E89', '#A8DADC', '#E9ECEF', '#FFFFFF'],
                
                // Nature风格配色
                ['#2A4858', '#557B94', '#82A5BE', '#B8D0E6', '#FFFFFF'],
                ['#1A365D', '#3C6997', '#7DB0D5', '#BED8EB', '#FFFFFF'],
                ['#27374D', '#526D82', '#9DB2BF', '#DDE6ED', '#FFFFFF'],
                ['#053B50', '#176B87', '#64CCC5', '#EEEEEE', '#FFFFFF'],
                ['#040D12', '#183D3D', '#5C8374', '#93B1A6', '#FFFFFF'],
                ['#22092C', '#872341', '#BE3144', '#F05941', '#FFFFFF'],
                ['#0C2D57', '#1A5D1A', '#C1D8C3', '#E9F5E9', '#FFFFFF'],
                
                // Science风格配色
                ['#012A4A', '#013A63', '#01497C', '#014F86', '#FFFFFF'],
                ['#2C3333', '#2E4F4F', '#0E8388', '#CBE4DE', '#FFFFFF'],
                ['#1F4172', '#3A6B35', '#CBD5E1', '#F8F9FA', '#FFFFFF'],
                ['#0A2647', '#144272', '#205295', '#2C74B3', '#FFFFFF'],
                ['#0F0F0F', '#232D3F', '#005B41', '#008170', '#FFFFFF'],
                
                // 数据可视化配色
                ['#003F5C', '#58508D', '#BC5090', '#FF6361', '#FFFFFF'],
                ['#045275', '#089099', '#7CCBA2', '#FCDE9C', '#FFFFFF'],
                ['#033F63', '#28666E', '#7C9885', '#B5B682', '#FFFFFF'],
                ['#374955', '#5C8374', '#9EC8B9', '#F1F0E8', '#FFFFFF'],
                ['#1D5B79', '#468B97', '#EF6262', '#F3AA60', '#FFFFFF'],

                // 医学期刊风格
                ['#16123F', '#1B3358', '#3D5A80', '#98C1D9', '#FFFFFF'],
                ['#142850', '#27496D', '#0C7B93', '#00A8CC', '#FFFFFF'],
                ['#11324D', '#164B60', '#1B6B93', '#4FC0D0', '#FFFFFF'],
                ['#0D1282', '#2F52A2', '#2C3333', '#A5C9CA', '#FFFFFF'],
                ['#19376D', '#576CBC', '#A5D7E8', '#0B2447', '#FFFFFF'],

                // 生物学配色
                ['#2B3467', '#1A5D1A', '#BAD7E9', '#FCFFE7', '#FFFFFF'],
                ['#0E2954', '#1F6E8C', '#84A7A1', '#FFFFFF', '#E0F4FF'],
                ['#2D4356', '#435B66', '#A76F6F', '#EAB2A0', '#FFFFFF'],
                ['#0F2167', '#0D1282', '#3085C3', '#7BC2E4', '#FFFFFF'],
                ['#164863', '#427D9D', '#9BBEC8', '#DDF2FD', '#FFFFFF'],

                // 物理学配色
                ['#070F2B', '#1B1A55', '#535C91', '#9290C3', '#FFFFFF'],
                ['#352F44', '#5C5470', '#B9B4C7', '#FAF0E6', '#FFFFFF'],
                ['#1D267D', '#5C469C', '#A4D0A4', '#F5F5F5', '#FFFFFF'],
                ['#27005D', '#4B0082', '#9400D3', '#E0B0FF', '#FFFFFF'],
                ['#1A120B', '#3C2A21', '#D5CEA3', '#E5E5CB', '#FFFFFF'],

                // 化学配色
                ['#040303', '#461111', '#A13333', '#B3541E', '#FFFFFF'],
                ['#54B435', '#379237', '#2B2A4C', '#F4E869', '#FFFFFF'],
                ['#793FDF', '#7091F5', '#97FFF4', '#FFFFFF', '#EEFFF7'],
                ['#451952', '#662549', '#AE445A', '#F39F5A', '#FFFFFF'],
                ['#451952', '#662549', '#AE445A', '#F39F5A', '#FFFFFF'],

                // 地球科学配色
                ['#2C3639', '#3F4E4F', '#A27B5C', '#DCD7C9', '#FFFFFF'],
                ['#2C3333', '#395B64', '#A5C9CA', '#E7F6F2', '#FFFFFF'],
                ['#354259', '#6D8299', '#9BA4B5', '#CDC2AE', '#F2D7D9'],
                ['#293462', '#1CD6CE', '#FEDB39', '#D61C4E', '#FFFFFF'],
                ['#1A374D', '#406882', '#6998AB', '#B1D0E0', '#FFFFFF'],

                // Nature补充配色
                ['#003F5C', '#444E86', '#955196', '#DD5182', '#FFFFFF'],
                ['#21364B', '#4A6F8A', '#87A4B9', '#C4D7E7', '#FFFFFF'],
                ['#1F456E', '#3A6EA5', '#6898D0', '#9FC3E7', '#FFFFFF'],
                ['#0B3954', '#087E8B', '#BFD7EA', '#FF5A5F', '#FFFFFF'],
                ['#1B4965', '#62B6CB', '#BEE9E8', '#CAE9FF', '#FFFFFF'],
                
                // Science补充配色
                ['#003459', '#00171F', '#007EA7', '#00A8E8', '#FFFFFF'],
                ['#2C5F2D', '#97BC62', '#D5F5E3', '#E8F8F5', '#FFFFFF'],
                ['#184E77', '#1E6091', '#1A759F', '#168AAD', '#FFFFFF'],
                ['#00296B', '#003F88', '#00509D', '#0066CC', '#FFFFFF'],
                ['#00043C', '#005BC5', '#8E8CD8', '#DBCBD8', '#FFFFFF']
            ],
            cool: [
                ['#4ECDC4', '#45B7D1', '#96CEB4', '#88D8B0', '#BEDCFE'],
                ['#006D77', '#83C5BE', '#EDF6F9', '#B8E1DD', '#A4C3B2'],
                ['#084C61', '#4F6D7A', '#56A3A6', '#9DC7C8', '#DBE9EE'],
                ['#BDE0FE', '#A2D2FF', '#CDB4DB', '#B8C0FF', '#98C1D9'],
                ['#48CAE4', '#90E0EF', '#ADE8F4', '#CAF0F8', '#03045E'],
                ['#8ECAE6', '#219EBC', '#023047', '#126782', '#A9D6E5'],
                ['#95B8D1', '#B8E0D2', '#D8E2DC', '#EAE4E9', '#FFF1E6'],
                ['#A4C3B2', '#CCE3DE', '#EAF4F4', '#F6FFF8', '#FCF6F5'],
                ['#E0FBFC', '#C2DFE3', '#9DB4C0', '#5C6B73', '#253237'],
                ['#CADBEA', '#B5C9D5', '#9FB7C9', '#8AA5BC', '#7593AF'],

                // 补充配色
                ['#89C2D9', '#61A5C2', '#468FAF', '#2C7DA0', '#FFFFFF'],
                ['#A9D6E5', '#89C2D9', '#61A5C2', '#2A6F97', '#FFFFFF'],
                ['#B8E1FF', '#9CCDDC', '#82B3C9', '#6C98B0', '#FFFFFF'],
                ['#012A4A', '#013A63', '#01497C', '#014F86', '#FFFFFF'],
                ['#48CAE4', '#90E0EF', '#ADE8F4', '#CAF0F8', '#FFFFFF']
            ],
            elegant: [
                ['#2D3047', '#93B7BE', '#E0CA3C', '#A799B7', '#048BA8'],
                ['#22223B', '#4A4E69', '#9A8C98', '#C9ADA7', '#F2E9E4'],
                ['#355070', '#6D597A', '#B56576', '#E56B6F', '#EAAC8B'],
                ['#3D405B', '#81B29A', '#F2CC8F', '#E07A5F', '#F4F1DE'],
                ['#594157', '#726DA8', '#7D8CC4', '#A0D2DB', '#BEE7E8'],
                ['#4A4E69', '#9A8C98', '#C9ADA7', '#F2E9E4', '#9A8C98'],
                ['#2B2D42', '#8D99AE', '#EDF2F4', '#EF233C', '#FFFFFF'],
                ['#1A1A1D', '#4E4E50', '#6F2232', '#950740', '#C3073F'],
                ['#2F4550', '#586F7C', '#B8DBD9', '#F4F4F9', '#586F7C'],
                ['#5C6B73', '#9DB4C0', '#C2DFE3', '#E0FBFC', '#253237'],

                // 补充配色
                ['#2F3E46', '#354F52', '#52796F', '#84A98C', '#FFFFFF'],
                ['#1B1B1E', '#373F51', '#58A4B0', '#A9BCD0', '#FFFFFF'],
                ['#2D3142', '#4F5D75', '#BFC0C0', '#FFFFFF', '#EF8354'],
                ['#2D3142', '#4F5D75', '#BFC0C0', '#FFFFFF', '#EF8354']
            ],
            warm: [
                ['#FF6B6B', '#FFA07A', '#FFB6C1', '#FFA500', '#FFD700'],
                ['#E76F51', '#F4A261', '#E9C46A', '#FFB4A2', '#FFCDB2'],
                ['#FF9F1C', '#FFBF69', '#FFD93D', '#FF8C42', '#FF665A'],
                ['#D4A373', '#FAEDCD', '#FEFAE0', '#E9EDC9', '#CCD5AE'],
                ['#FFB5A7', '#FCD5CE', '#F8EDEB', '#F9DCC4', '#FEC89A'],
                ['#CB997E', '#DDBEA9', '#FFE8D6', '#B7B7A4', '#A5A58D'],
                ['#E07A5F', '#F2CC8F', '#F4F1DE', '#F8EDEB', '#FEC5BB'],
                ['#FFE5D9', '#FFD7BA', '#FEC89A', '#FEC5BB', '#FFB5A7'],
                ['#FFB4A2', '#E5989B', '#B5838D', '#FFCDB2', '#FFB4A2'],
                ['#F6BD60', '#F7EDE2', '#F5CAC3', '#F28482', '#84A59D'],

                // 补充配色
                ['#FFBE0B', '#FB5607', '#FF006E', '#8338EC', '#FFFFFF'],
                ['#FF7B00', '#FF8800', '#FF9500', '#FFA200', '#FFFFFF'],
                ['#FF595E', '#FF7C65', '#FF9E6D', '#FFBF75', '#FFFFFF'],
                ['#FF6B6B', '#FF8585', '#FF9E9E', '#FFB7B7', '#FFFFFF'],
                ['#FFB4A2', '#FFCDB2', '#FFE5D9', '#FFF1E6', '#FFFFFF']
            ],
            vibrant: [
                ['#F94144', '#F3722C', '#F8961E', '#F9C74F', '#90BE6D'],
                ['#577590', '#43AA8B', '#90BE6D', '#F9C74F', '#F94144'],
                ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'],
                ['#FF0A54', '#FF477E', '#FF5C8A', '#FF7096', '#FF85A1'],
                ['#7400B8', '#6930C3', '#5E60CE', '#5390D9', '#4EA8DE'],
                ['#540B0E', '#9E2A2B', '#E09F3E', '#FFF3B0', '#335C67'],
                ['#FF0075', '#172774', '#77D970', '#FDFF00', '#0C134F'],
                ['#FF0000', '#FF8700', '#FFE400', '#00FF8C', '#00E0FF'],
                ['#FF449F', '#FF7BA2', '#FFB5A4', '#FFE5A7', '#FFF9AA'],
                ['#FF006E', '#FB5607', '#FF3357', '#8338EC', '#3A86FF'],

                // 补充配色
                ['#FF0000', '#FF8700', '#FFE400', '#00FF8C', '#FFFFFF'],
                ['#9B5DE5', '#F15BB5', '#FEE440', '#00BBF9', '#FFFFFF'],
                ['#FF006E', '#FB5607', '#FF3357', '#8338EC', '#FFFFFF'],
                ['#FF5400', '#FF6D00', '#FF8500', '#FF9E00', '#FFFFFF'],
                ['#FF0075', '#172774', '#77D970', '#FDFF00', '#FFFFFF']
            ]
        };
        
        this.currentStyle = 'all';
        this.currentFormat = 'hex';
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

        // 添加风格切换事件监听
        document.querySelectorAll('.style-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentStyle = btn.dataset.style;
                this.generatePalettes();
            });
        });

        // 修改颜色格式切换事件监听
        document.querySelectorAll('.format-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFormat = btn.dataset.format;
                this.updateColorFormats(); // 只更新颜色格式显示
            });
        });
    }
    
    convertColor(hexColor) {
        // 从HEX转换到其他格式
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        
        switch (this.currentFormat) {
            case 'rgb':
                return `rgb(${r}, ${g}, ${b})`;
            case 'hsl':
                const [h, s, l] = this.rgbToHsl(r, g, b);
                return `hsl(${Math.round(h)}°, ${Math.round(s)}%, ${Math.round(l)}%)`;
            default:
                return hexColor.toUpperCase();
        }
    }
    
    rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            
            h *= 60;
        }
        
        return [h, s * 100, l * 100];
    }
    
    generatePalettes() {
        // 固定显示9个配色方案
        const selectedPalettes = this.getRandomPalettes(9);
        
        const palettes = selectedPalettes.map(colors => {
            return `
                <div class="palette-card">
                    <div class="color-strip">
                        ${colors.map(color => `
                            <div class="color-block" style="background-color: ${color}">
                                <span class="color-value">${this.convertColor(color)}</span>
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
    
    getRandomPalettes(count) {
        let availablePalettes;
        if (this.currentStyle === 'all') {
            // 从所有分类中获取配色方案
            availablePalettes = Object.values(this.recommendedPalettes).flat();
        } else {
            availablePalettes = this.recommendedPalettes[this.currentStyle];
        }
        
        // 使用 Set 来存储已选择的配色方案的字符串表示，用于去重
        const selectedSet = new Set();
        const result = [];
        
        // Fisher-Yates 洗牌算法
        const shuffled = [...availablePalettes];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        // 选择不重复的配色方案
        for (const palette of shuffled) {
            const paletteStr = JSON.stringify(palette);
            if (!selectedSet.has(paletteStr) && result.length < count) {
                selectedSet.add(paletteStr);
                result.push(palette);
            }
        }
        
        // 如果不够数量，说明当前分类的配色方案总数不足
        if (result.length < count) {
            console.warn(`Warning: Not enough unique palettes in current style (${this.currentStyle}). 
                Available: ${availablePalettes.length}, Requested: ${count}`);
        }
        
        return result;
    }

    setupPaletteInteractions() {
        // 复制整个配色方案功能
        this.paletteContainer.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const colors = Array.from(
                    e.target.closest('.palette-card').querySelectorAll('.color-value')
                ).map(span => span.textContent);
                
                navigator.clipboard.writeText(colors.join(', ')).then(() => {
                    this.showToast('所有颜色已复制到剪贴板');
                });
            });
        });

        // 单个色块点击复制功能
        this.paletteContainer.querySelectorAll('.color-block').forEach(block => {
            block.addEventListener('click', (e) => {
                const colorValue = e.currentTarget.querySelector('.color-value').textContent;
                navigator.clipboard.writeText(colorValue).then(() => {
                    this.showToast(`颜色代码 ${colorValue} 已复制`);
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

    showToast(message) {
        // 移除现有的提示框
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // 添加动画效果
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
        
        // 自动消失
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    // 新增方法：只更新颜色格式显示
    updateColorFormats() {
        this.paletteContainer.querySelectorAll('.color-block').forEach(block => {
            const color = block.style.backgroundColor;
            const hexColor = this.rgbToHex(color);
            const colorValue = block.querySelector('.color-value');
            colorValue.textContent = this.convertColor(hexColor);
        });
    }

    // 新增方法：将 RGB 转换为 HEX
    rgbToHex(rgb) {
        // 处理 rgb(r, g, b) 格式
        const values = rgb.match(/\d+/g);
        if (!values) return '#000000';
        
        const r = parseInt(values[0]);
        const g = parseInt(values[1]);
        const b = parseInt(values[2]);
        
        const toHex = (n) => {
            const hex = n.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
}

// 初始化
function init() {
    initThemeSwitch();
    initLangSwitch();
    new PaletteGenerator();
}

document.addEventListener('DOMContentLoaded', init); 