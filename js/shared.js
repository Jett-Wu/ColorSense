// 主题切换功能
export function initThemeSwitch() {
    const themeSwitch = document.querySelector('.theme-switch-input');
    
    // 从 localStorage 读取主题状态
    const isDark = localStorage.getItem('theme') === 'dark';
    themeSwitch.checked = isDark;
    document.body.classList.toggle('dark-theme', isDark);
    
    themeSwitch.addEventListener('change', (e) => {
        const isDark = e.target.checked;
        document.body.classList.toggle('dark-theme', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// 语言配置
const translations = {
    'zh': {
        'nav': {
            'recommend': '推荐配色',
            'generate': '生成配色',
            'theory': '色彩理论'
        },
        'palettes': {
            'refresh': '刷新配色',
            'copied': '已复制!'
        },
        'theory': {
            'title': '色彩理论',
            'basics': {
                'title': '色彩基础',
                'subtitle': '色相、饱和度与明度',
                'description': '色相（Hue）是色彩的基本属性，如红、黄、蓝等。饱和度（Saturation）表示色彩的纯度，明度（Brightness）则表示色彩的明暗程度。'
            },
            'schemes': {
                'title': '色彩搭配原理',
                'monochromatic': {
                    'title': '单色配色',
                    'description': '使用同一色相的不同明度和饱和度变化，创造和谐统一的视觉效果。',
                    'baseColor': '选择基础色相'
                },
                'complementary': {
                    'title': '互补色配色',
                    'description': '使用色轮上相对的两种颜色，产生强烈的对比效果。'
                },
                'triadic': {
                    'title': '三角配色',
                    'description': '在色轮上选择相隔120度的三种颜色，形成平衡和谐的搭配。'
                }
            }
        }
    },
    'en': {
        'nav': {
            'recommend': 'Recommend',
            'generate': 'Generate',
            'theory': 'Theory'
        },
        'palettes': {
            'refresh': 'Refresh',
            'copied': 'Copied!'
        },
        'theory': {
            'title': 'Color Theory',
            'basics': {
                'title': 'Color Basics',
                'subtitle': 'Hue, Saturation & Brightness',
                'description': 'Hue is the basic property of color, such as red, yellow, and blue. Saturation represents color purity, while brightness indicates the lightness or darkness of a color.'
            },
            'schemes': {
                'title': 'Color Schemes',
                'monochromatic': {
                    'title': 'Monochromatic',
                    'description': 'Uses variations in lightness and saturation of a single hue, creating a cohesive and harmonious look.',
                    'baseColor': 'Select Base Color'
                },
                'complementary': {
                    'title': 'Complementary',
                    'description': 'Uses two colors opposite each other on the color wheel, creating a high-contrast and vibrant look.'
                },
                'triadic': {
                    'title': 'Triadic',
                    'description': 'Uses three colors equally spaced around the color wheel, creating a balanced and harmonious combination.'
                }
            }
        }
    }
};

// 语言切换功能
export function initLangSwitch() {
    const langSwitch = document.querySelector('.lang-switch-input');
    const currentLang = localStorage.getItem('language') || 'zh';
    
    // 初始化语言状态
    langSwitch.checked = currentLang === 'en';
    updateLanguage(currentLang);
    
    langSwitch.addEventListener('change', (e) => {
        const newLang = e.target.checked ? 'en' : 'zh';
        localStorage.setItem('language', newLang);
        updateLanguage(newLang);
    });
}

function updateLanguage(lang) {
    // 更新导航链接
    document.querySelectorAll('.nav-links a').forEach(link => {
        const key = link.getAttribute('href').replace(/[/.]/g, '');
        if (translations[lang].nav[key]) {
            link.textContent = translations[lang].nav[key];
        }
    });
    
    // 更新页面特定内容
    const pageName = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    
    switch (pageName) {
        case 'palettes':
            updatePalettesPage(lang);
            break;
        case 'theory':
            updateTheoryPage(lang);
            break;
        // 可以添加其他页面的更新逻辑
    }
}

function updatePalettesPage(lang) {
    const refreshBtn = document.querySelector('.refresh-btn');
    if (refreshBtn) {
        refreshBtn.innerHTML = `
            <i class="fas fa-sync-alt"></i>
            ${translations[lang].palettes.refresh}
        `;
    }
}

function updateTheoryPage(lang) {
    const t = translations[lang].theory;
    
    // 更新标题和描述
    document.querySelector('.theory-section h2').textContent = t.basics.title;
    document.querySelector('.theory-text h3').textContent = t.basics.subtitle;
    document.querySelector('.theory-text p').textContent = t.basics.description;
    
    // 更新配色方案部分
    document.querySelectorAll('.color-scheme').forEach(scheme => {
        const type = scheme.classList[1]?.replace('-scheme', '');
        if (type && t.schemes[type]) {
            scheme.querySelector('h3').textContent = t.schemes[type].title;
            scheme.querySelector('p').textContent = t.schemes[type].description;
        }
    });
    
    // 更新颜色选择器标签
    const colorPickerLabel = document.querySelector('.color-picker label');
    if (colorPickerLabel) {
        colorPickerLabel.textContent = t.schemes.monochromatic.baseColor;
    }
}

// 导出翻译对象供其他模块使用
export const getTranslations = () => translations; 