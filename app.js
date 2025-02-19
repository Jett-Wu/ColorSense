// 配色方案数据
const colorPalettes = [
    {
        name: "商务简约",
        colors: ["#2c3e50", "#34495e", "#95a5a6", "#bdc3c7", "#ecf0f1"],
        tags: ["商务", "专业", "简约"]
    },
    {
        name: "创意活力",
        colors: ["#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#3498db"],
        tags: ["创意", "活力", "明快"]
    }
    // 可以添加更多配色方案
];

// 初始化函数
function init() {
    renderPalettes();
    setupEventListeners();
}

// 渲染配色方案
function renderPalettes() {
    const container = document.querySelector('.palette-container');
    if (!container) return;

    colorPalettes.forEach(palette => {
        const paletteElement = createPaletteElement(palette);
        container.appendChild(paletteElement);
    });
}

// 创建配色方案元素
function createPaletteElement(palette) {
    const div = document.createElement('div');
    div.className = 'palette-card';
    
    const colorsHtml = palette.colors.map(color => `
        <div class="color-bar" 
             style="background-color: ${color}"
             data-color="${color}">
        </div>
    `).join('');

    div.innerHTML = `
        <h4>${palette.name}</h4>
        <div class="color-bars">
            ${colorsHtml}
        </div>
        <div class="palette-tags">
            ${palette.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
    `;

    return div;
}

// 设置事件监听器
function setupEventListeners() {
    // 色条悬停效果
    document.addEventListener('mouseover', e => {
        if (e.target.classList.contains('color-bar')) {
            const color = e.target.dataset.color;
            showColorCode(e.target, color);
        }
    });

    // 搜索功能
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', e => {
            const searchTerm = e.target.value.toLowerCase();
            filterPalettes(searchTerm);
        });
    }
}

// 显示颜色代码
function showColorCode(element, color) {
    const tooltip = document.createElement('div');
    tooltip.className = 'color-tooltip';
    tooltip.textContent = color;
    element.appendChild(tooltip);

    element.addEventListener('mouseleave', () => {
        tooltip.remove();
    });
}

// 过滤配色方案
function filterPalettes(searchTerm) {
    const palettes = document.querySelectorAll('.palette-card');
    palettes.forEach(palette => {
        const name = palette.querySelector('h4').textContent.toLowerCase();
        const tags = Array.from(palette.querySelectorAll('.tag'))
            .map(tag => tag.textContent.toLowerCase());
        
        const isMatch = name.includes(searchTerm) || 
                       tags.some(tag => tag.includes(searchTerm));
        
        palette.style.display = isMatch ? 'block' : 'none';
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init); 