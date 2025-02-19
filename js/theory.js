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

// 互补色演示
function setupComplementaryDemo() {
    const wheel = document.querySelector('.complementary-demo .color-wheel');
    const baseDisplay = document.querySelector('.base-color-display');
    const complementDisplay = document.querySelector('.complement-color-display');

    wheel.addEventListener('click', (e) => {
        const rect = wheel.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const angle = Math.atan2(y, x) * (180 / Math.PI);
        const hue = (angle + 360) % 360;

        const baseColor = `hsl(${hue}, 70%, 50%)`;
        const complementHue = (hue + 180) % 360;
        const complementColor = `hsl(${complementHue}, 70%, 50%)`;

        baseDisplay.style.backgroundColor = baseColor;
        complementDisplay.style.backgroundColor = complementColor;
    });
}

// 三角配色演示
function setupTriadicDemo() {
    const wheel = document.querySelector('.triadic-demo .color-wheel');
    const colors = document.querySelectorAll('.triadic-colors > div');

    wheel.addEventListener('click', (e) => {
        const rect = wheel.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const angle = Math.atan2(y, x) * (180 / Math.PI);
        const baseHue = (angle + 360) % 360;

        colors[0].style.backgroundColor = `hsl(${baseHue}, 70%, 50%)`;
        colors[1].style.backgroundColor = `hsl(${(baseHue + 120) % 360}, 70%, 50%)`;
        colors[2].style.backgroundColor = `hsl(${(baseHue + 240) % 360}, 70%, 50%)`;
    });
}

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