import { initThemeSwitch, initLangSwitch } from './shared.js';
import { colorPalettes } from './config.js';
import { createPaletteElement, showColorCode } from './palette.js';

function init() {
    renderPalettes();
    setupEventListeners();
    initThemeSwitch();
    initLangSwitch();
}

function renderPalettes() {
    const container = document.querySelector('.palette-container');
    if (!container) return;

    colorPalettes.forEach(palette => {
        const paletteElement = createPaletteElement(palette);
        container.appendChild(paletteElement);
    });
}

function setupEventListeners() {
    document.addEventListener('mouseover', e => {
        if (e.target.classList.contains('color-bar')) {
            const color = e.target.dataset.color;
            showColorCode(e.target, color);
        }
    });
}

document.addEventListener('DOMContentLoaded', init); 