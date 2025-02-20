import { initThemeSwitch, initLangSwitch } from './shared.js';

function init() {
    initThemeSwitch();
    initLangSwitch();
}

document.addEventListener('DOMContentLoaded', init);

// 单色配色演示
function setupMonochromaticDemo() {
    const baseColorInput = document.querySelector('.base-color');
    const variations = document.querySelector('.color-variations');

    function updateVariations(baseColor) {
        const hsl = hexToHSL(baseColor);
        variations.innerHTML = '';

        // 生成5个不同亮度的变体
        for (let i = 0; i < 5; i++) {
            const lightness = 20 + (i * 15);
            const color = `hsl(${hsl.h}, ${hsl.s}%, ${lightness}%)`;
            const box = document.createElement('div');
            box.className = 'color-box';
            box.style.backgroundColor = color;
            box.title = color;
            variations.appendChild(box);
        }
    }

    baseColorInput.addEventListener('input', (e) => {
        updateVariations(e.target.value);
    });

    // 初始化
    updateVariations(baseColorInput.value);
}

// 色轮交互增强
class ColorWheelInteraction {
    constructor(type) {
        this.type = type;
        // 修改选择器以适应基础色轮
        if (type === 'basic') {
            this.wheel = document.querySelector('.theory-section:first-child .color-wheel');
        } else {
            this.wheel = document.querySelector(`.${type}-demo .color-wheel`);
        }
        
        this.currentAngle = 0;
        this.isLocked = false;
        this.colorPoints = [];
        
        if (type === 'basic') {
            this.setupBasicColorWheel();
        } else {
            this.setupWheel();
        }
    }
    
    setupWheel() {
        this.wheel.innerHTML = '';
        
        if (this.type === 'complementary') {
            this.addComplementaryIndicators();
        } else {
            this.addTriadicIndicators();
        }
        
        this.wheel.addEventListener('mousemove', (e) => {
            if (!this.isLocked) {
                this.handleMouseMove(e);
            }
        });
        
        this.wheel.addEventListener('click', (e) => {
            if (this.isLocked) {
                this.isLocked = false;
                this.handleMouseMove(e);
            } else {
                this.isLocked = true;
                this.updateColors(this.currentAngle);
            }
        });
    }
    
    addComplementaryIndicators() {
        // 基础指示线
        const line = document.createElement('div');
        line.className = 'indicator-line';
        this.wheel.appendChild(line);
        
        // 互补色指示线
        const complementLine = document.createElement('div');
        complementLine.className = 'indicator-line complement-line';
        this.wheel.appendChild(complementLine);
        
        // 选中点
        const point = document.createElement('div');
        point.className = 'selected-point';
        this.wheel.appendChild(point);
    }
    
    addTriadicIndicators() {
        // 添加三条指示线
        for (let i = 0; i < 3; i++) {
            const line = document.createElement('div');
            line.className = 'indicator-line';
            this.wheel.appendChild(line);
        }
        
        // 添加选中点
        const point = document.createElement('div');
        point.className = 'selected-point';
        this.wheel.appendChild(point);
    }
    
    handleMouseMove(e) {
        const rect = this.wheel.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        angle = (angle + 90) % 360;
        if (angle < 0) angle += 360;
        
        this.currentAngle = angle;
        
        this.updateIndicators(angle);
        this.updateColors(angle);
    }
    
    updateIndicators(angle) {
        if (this.type === 'complementary') {
            this.updateComplementaryIndicators(angle);
        } else {
            this.updateTriadicIndicators(angle);
        }
        
        const radius = this.wheel.offsetWidth / 2 - 5;
        const radian = (angle - 90) * Math.PI / 180;
        const point = this.wheel.querySelector('.selected-point');
        point.style.left = `${this.wheel.offsetWidth/2 + radius * Math.cos(radian)}px`;
        point.style.top = `${this.wheel.offsetHeight/2 + radius * Math.sin(radian)}px`;
    }
    
    addColorPoint(angle, isMain = false) {
        const radius = this.wheel.offsetWidth / 2 - 5;
        const radian = (angle - 90) * Math.PI / 180;
        const x = this.wheel.offsetWidth/2 + radius * Math.cos(radian);
        const y = this.wheel.offsetHeight/2 + radius * Math.sin(radian);
        
        const point = document.createElement('div');
        point.className = `color-point ${isMain ? 'main-point' : 'complement-point'}`;
        point.style.left = `${x}px`;
        point.style.top = `${y}px`;
        
        // 计算对应的颜色
        const color = `hsl(${angle}, 70%, 50%)`;
        point.style.backgroundColor = color;
        
        this.wheel.appendChild(point);
        this.colorPoints.push(point);
    }
    
    clearColorPoints() {
        this.colorPoints.forEach(point => point.remove());
        this.colorPoints = [];
    }
    
    updateComplementaryIndicators(angle) {
        if (this.isLocked) {
            // 清除现有的点
            this.clearColorPoints();
            
            // 添加主色点和互补色点
            this.addColorPoint(angle, true);
            this.addColorPoint((angle + 180) % 360, false);
            
            // 更新连线
            this.updateLines([angle, (angle + 180) % 360]);
        } else {
            // 移动预览模式
            const line = this.wheel.querySelector('.indicator-line');
            line.style.transform = `rotate(${angle}deg)`;
        }
    }
    
    updateTriadicIndicators(angle) {
        if (this.isLocked) {
            // 清除现有的点
            this.clearColorPoints();
            
            // 添加三个颜色点
            this.addColorPoint(angle, true);
            this.addColorPoint((angle + 120) % 360, false);
            this.addColorPoint((angle + 240) % 360, false);
            
            // 更新连线
            this.updateLines([angle, (angle + 120) % 360, (angle + 240) % 360]);
        } else {
            // 移动预览模式
            const lines = this.wheel.querySelectorAll('.indicator-line');
            lines.forEach((line, i) => {
                const lineAngle = (angle + i * 120) % 360;
                line.style.transform = `rotate(${lineAngle}deg)`;
            });
        }
    }
    
    updateLines(angles) {
        // 清除现有的线
        this.wheel.querySelectorAll('.indicator-line').forEach(line => line.remove());
        
        // 为每个角度创建新的线
        angles.forEach(angle => {
            const line = document.createElement('div');
            line.className = 'indicator-line';
            line.style.transform = `rotate(${angle}deg)`;
            this.wheel.appendChild(line);
        });
    }
    
    updateColors(angle) {
        if (this.type === 'complementary') {
            this.updateComplementaryColors(angle);
        } else {
            this.updateTriadicColors(angle);
        }
    }
    
    updateComplementaryColors(angle) {
        // 直接使用角度作为色相值
        const baseHue = angle;
        const complementHue = (baseHue + 180) % 360;
        
        const baseColor = `hsl(${baseHue}, 70%, 50%)`;
        const complementColor = `hsl(${complementHue}, 70%, 50%)`;
        
        this.updateColorPreviews([baseColor, complementColor]);
    }
    
    updateTriadicColors(angle) {
        // 计算三个等距的色相值
        const colors = [
            `hsl(${angle}, 70%, 50%)`,
            `hsl(${(angle + 120) % 360}, 70%, 50%)`,
            `hsl(${(angle + 240) % 360}, 70%, 50%)`
        ];
        
        this.updateColorPreviews(colors);
    }
    
    updateColorPreviews(colors) {
        // 根据类型选择正确的容器
        const container = this.type === 'complementary' 
            ? document.querySelector(`.${this.type}-demo .selected-colors`)
            : document.querySelector(`.${this.type}-demo .triadic-colors`);
            
        container.innerHTML = colors.map(color => `
            <div class="color-preview" style="background-color: ${color}" title="${color}">
                <span class="color-value">${color}</span>
            </div>
        `).join('');
    }
    
    setupBasicColorWheel() {
        // 添加选中点指示器
        const point = document.createElement('div');
        point.className = 'selected-point';
        this.wheel.appendChild(point);
        
        this.wheel.addEventListener('mousemove', (e) => {
            const angle = this.calculateAngle(e);
            this.updateBasicColorInfo(angle);
            this.updateBasicIndicator(angle);
        });
        
        this.wheel.addEventListener('click', (e) => {
            const angle = this.calculateAngle(e);
            this.updateBasicColorInfo(angle, true);
            this.updateBasicIndicator(angle);
        });
    }
    
    calculateAngle(e) {
        const rect = this.wheel.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        angle = (angle + 90) % 360;
        if (angle < 0) angle += 360;
        
        return angle;
    }
    
    updateBasicIndicator(angle) {
        const radius = this.wheel.offsetWidth / 2 - 5;
        const radian = (angle - 90) * Math.PI / 180;
        const point = this.wheel.querySelector('.selected-point');
        
        point.style.left = `${this.wheel.offsetWidth/2 + radius * Math.cos(radian)}px`;
        point.style.top = `${this.wheel.offsetHeight/2 + radius * Math.sin(radian)}px`;
        point.style.display = 'block'; // 确保点是可见的
    }
    
    updateBasicColorInfo(angle, isClicked = false) {
        const preview = document.querySelector('.selected-color-preview');
        const hueValue = document.querySelector('.hue-value');
        const saturationValue = document.querySelector('.saturation-value');
        const brightnessValue = document.querySelector('.brightness-value');
        
        // 固定饱和度和明度的默认值
        const saturation = 70;
        const brightness = 50;
        
        const color = `hsl(${angle}, ${saturation}%, ${brightness}%)`;
        preview.style.backgroundColor = color;
        
        hueValue.textContent = `${Math.round(angle)}°`;
        saturationValue.textContent = `${saturation}%`;
        brightnessValue.textContent = `${brightness}%`;
        
        if (isClicked) {
            preview.style.transform = 'scale(1.05)';
            setTimeout(() => {
                preview.style.transform = 'scale(1)';
            }, 200);
        }
    }
}

// 初始化所有色轮
document.addEventListener('DOMContentLoaded', () => {
    // 初始化基础色轮
    new ColorWheelInteraction('basic');
    // 初始化其他色轮
    new ColorWheelInteraction('complementary');
    new ColorWheelInteraction('triadic');
});

// 辅助函数
function hexToHSL(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }

    return { h, s: s * 100, l: l * 100 };
}

// 初始化所有演示
document.addEventListener('DOMContentLoaded', () => {
    setupMonochromaticDemo();
    setupComplementaryDemo();
    setupTriadicDemo();
});

// 添加样式指示锁定状态
const style = document.createElement('style');
style.textContent = `
    .color-wheel.locked {
        cursor: pointer;
    }
    .color-wheel.locked::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.8);
        pointer-events: none;
    }
`;
document.head.appendChild(style); 