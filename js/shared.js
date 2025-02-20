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
            'generate': '一键配色',
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
                'description': {
                    'hue': '色相（Hue）是色彩在光谱中的位置，以角度表示（0°-360°），如红色0°、黄色60°、绿色120°、青色180°、蓝色240°、紫色300°。',
                    'saturation': '饱和度（Saturation）表示色彩的纯度，即色彩中纯色的含量。值越高色彩越纯净鲜艳，越低则越接近灰色。',
                    'brightness': '明度（Brightness）指色彩的明暗程度。值越高越接近白色越明亮，越低则越接近黑色越暗沉。'
                }
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
        },
        'index': {
            'subtitle': '智能配色助手',
            'cta': {
                'start': '开始配色',
                'theory': '色彩理论'
            },
            'features': {
                'smart': {
                    'title': '智能推荐',
                    'desc': '基于专业色彩理论，一键生成优雅和谐的配色方案'
                },
                'flexible': {
                    'title': '灵活配色',
                    'desc': '支持单色、互补色、三角配色等多种专业配色模式'
                },
                'guide': {
                    'title': '理论指南',
                    'desc': '提供交互式色彩理论学习，轻松掌握配色技巧'
                }
            }
        }
    },
    'en': {
        'nav': {
            'generate': 'Generate Colors',
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
                'description': {
                    'hue': 'Hue is the position of a color in the spectrum, represented in degrees (0°-360°), such as red at 0°, yellow at 60°, green at 120°, cyan at 180°, blue at 240°, and purple at 300°.',
                    'saturation': 'Saturation represents color purity, or the amount of pure color present. Higher values result in more vivid colors, while lower values appear more gray.',
                    'brightness': 'Brightness indicates how light or dark a color is. Higher values appear closer to white and brighter, while lower values appear closer to black and darker.'
                }
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
        },
        'index': {
            'subtitle': 'Smart Color Assistant',
            'cta': {
                'start': 'Get Started',
                'theory': 'Color Theory'
            },
            'features': {
                'smart': {
                    'title': 'Smart Recommendations',
                    'desc': 'Generate elegant and harmonious color schemes based on professional color theory'
                },
                'flexible': {
                    'title': 'Flexible Palettes',
                    'desc': 'Support multiple professional modes including monochromatic, complementary, and triadic'
                },
                'guide': {
                    'title': 'Theory Guide',
                    'desc': 'Interactive color theory learning for easy mastery of color matching skills'
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
        case 'index':
        case '':
            updateIndexPage(lang);
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
    
    // 更新三个描述段落
    document.querySelector('[data-i18n="theory.basics.description.hue"]').textContent = t.basics.description.hue;
    document.querySelector('[data-i18n="theory.basics.description.saturation"]').textContent = t.basics.description.saturation;
    document.querySelector('[data-i18n="theory.basics.description.brightness"]').textContent = t.basics.description.brightness;
    
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

function updateIndexPage(lang) {
    const t = translations[lang].index;
    
    // 更新副标题
    document.querySelector('.hero-subtitle').textContent = t.subtitle;
    
    // 更新按钮文本
    const [startBtn, theoryBtn] = document.querySelectorAll('.hero-actions .cta-button');
    startBtn.textContent = t.cta.start;
    theoryBtn.textContent = t.cta.theory;
    
    // 更新特性卡片
    const features = document.querySelectorAll('.feature-card');
    const types = ['smart', 'flexible', 'guide'];
    
    features.forEach((card, index) => {
        const type = types[index];
        card.querySelector('h3').textContent = t.features[type].title;
        card.querySelector('p').textContent = t.features[type].desc;
    });
}

// 导出翻译对象供其他模块使用
export const getTranslations = () => translations; 