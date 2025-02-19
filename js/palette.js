// 调色板相关功能
export function createPaletteElement(palette) {
    const div = document.createElement('div');
    div.className = 'palette-card';
    
    const colorsHtml = palette.colors.map(color => `
        <div class="color-bar" 
             style="background-color: ${color}"
             data-color="${color.toUpperCase()}"
        >
           <span class="color-tooltip">${color.toUpperCase()}</span>
        </div>
    `).join('');

    div.innerHTML = `
        <div class="color-bars">
            ${colorsHtml}
        </div>
    `;

    console.log('Created palette element:', div.innerHTML);
    return div;
}

export function showColorCode(element, color) {
    console.log('Showing color code:', color);
    const tooltip = document.createElement('div');
    tooltip.className = 'color-tooltip';
    tooltip.textContent = color.toUpperCase();
    element.appendChild(tooltip);

    element.addEventListener('mouseleave', () => {
        console.log('Removing tooltip');
        tooltip.remove();
    });
} 