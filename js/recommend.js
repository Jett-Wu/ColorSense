import { initThemeSwitch, initLangSwitch } from './shared.js';
import { colorPalettes } from './config.js';
import { createPaletteElement, showColorCode } from './palette.js';

function init() {
    renderPalettes();
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

document.addEventListener('DOMContentLoaded', init); 