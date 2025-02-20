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
        'generate': {
            'styles': {
                'all': '全部',
                'academic': '学术',
                'cool': '清新',
                'elegant': '优雅',
                'warm': '温暖',
                'vibrant': '活力'
            },
            'refresh': '刷新配色',
            'copy': {
                'button': '复制色值',
                'all': '所有颜色已复制到剪贴板',
                'single': '颜色代码 {color} 已复制'
            },
            'favorite': '收藏'
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
            },
            'colorInfo': {
                'hue': '色相 (H)',
                'saturation': '饱和度 (S)',
                'brightness': '明度 (B)'
            },
            'colorWheel': {
                'title': '色轮',
                'description': '点击色轮选择颜色'
            }
        },
        'index': {
            'title': 'ColorSense',
            'subtitle': '智能配色助手',
            'cta': {
                'start': '一键配色',
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
            },
            'footer': '© 2024 ColorSense'
        }
    },
    'en': {
        'nav': {
            'generate': 'Generate',
            'theory': 'Theory'
        },
        'generate': {
            'styles': {
                'all': 'All',
                'academic': 'Academic',
                'cool': 'Cool',
                'elegant': 'Elegant',
                'warm': 'Warm',
                'vibrant': 'Vibrant'
            },
            'refresh': 'Refresh',
            'copy': {
                'button': 'Copy',
                'all': 'All colors copied to clipboard',
                'single': 'Color code {color} copied'
            },
            'favorite': 'Favorite'
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
            },
            'colorInfo': {
                'hue': 'Hue (H)',
                'saturation': 'Saturation (S)',
                'brightness': 'Brightness (B)'
            },
            'colorWheel': {
                'title': 'Color Wheel',
                'description': 'Click on the wheel to select a color'
            }
        },
        'index': {
            'title': 'ColorSense',
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
            },
            'footer': '© 2024 ColorSense'
        }
    }
};

// 语言切换功能
export function initLangSwitch() {
    const langSwitch = document.querySelector('.lang-switch-input');
    
    // 从 localStorage 读取语言状态
    const currentLang = localStorage.getItem('language') || 'zh';
    langSwitch.checked = currentLang === 'en';
    
    langSwitch.addEventListener('change', (e) => {
        const newLang = e.target.checked ? 'en' : 'zh';
        localStorage.setItem('language', newLang);
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
        case 'generate':
            updateGeneratePage(lang);
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
    
    // 更新动态生成的内容
    updateDynamicContent(lang);
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
    
    // 更新页面标题
    document.title = `${t.title} - ColorSense`;
    
    // 更新所有section标题
    document.querySelectorAll('.theory-section h2').forEach(h2 => {
        if (h2.textContent.includes('色彩基础')) {
            h2.textContent = t.basics.title;
        } else if (h2.textContent.includes('色彩搭配')) {
            h2.textContent = t.schemes.title;
        }
    });
    
    // 更新基础理论部分
    const basics = document.querySelector('.theory-text');
    if (basics) {
        basics.querySelector('h3').textContent = t.basics.subtitle;
        basics.querySelector('[data-i18n="theory.basics.description.hue"]').textContent = t.basics.description.hue;
        basics.querySelector('[data-i18n="theory.basics.description.saturation"]').textContent = t.basics.description.saturation;
        basics.querySelector('[data-i18n="theory.basics.description.brightness"]').textContent = t.basics.description.brightness;
    }
    
    // 更新配色方案部分
    document.querySelectorAll('.color-scheme').forEach(scheme => {
        const type = scheme.classList[1]?.replace('-scheme', '');
        if (type && t.schemes[type]) {
            scheme.querySelector('h3').textContent = t.schemes[type].title;
            scheme.querySelector('p').textContent = t.schemes[type].description;
            
            // 更新颜色选择器标签
            const colorPicker = scheme.querySelector('.color-picker label');
            if (colorPicker && type === 'monochromatic') {
                colorPicker.textContent = t.schemes.monochromatic.baseColor;
            }
        }
    });
    
    // 更新颜色信息标签
    document.querySelectorAll('.value-item .label').forEach(label => {
        if (label.textContent.includes('色相')) {
            label.textContent = t.colorInfo.hue + ':';
        } else if (label.textContent.includes('饱和度')) {
            label.textContent = t.colorInfo.saturation + ':';
        } else if (label.textContent.includes('明度')) {
            label.textContent = t.colorInfo.brightness + ':';
        }
    });

    // 更新色轮标题和描述
    const colorWheel = document.querySelector('.color-wheel');
    if (colorWheel) {
        colorWheel.setAttribute('title', t.colorWheel.description);
    }
}

function updateIndexPage(lang) {
    const t = translations[lang].index;
    
    // 更新标题
    document.querySelector('.hero h2').textContent = t.title;
    
    // 更新副标题
    document.querySelector('.hero-subtitle').textContent = t.subtitle;
    
    // 更新按钮文本
    document.querySelectorAll('.hero-actions .cta-button').forEach(btn => {
        if (btn.href.includes('generate')) {
            btn.textContent = t.cta.start;
        } else if (btn.href.includes('theory')) {
            btn.textContent = t.cta.theory;
        }
    });
    
    // 更新特性卡片
    const features = document.querySelectorAll('.feature-card');
    const types = ['smart', 'flexible', 'guide'];
    
    features.forEach((card, index) => {
        const type = types[index];
        card.querySelector('h3').textContent = t.features[type].title;
        card.querySelector('p').textContent = t.features[type].desc;
    });

    // 更新页脚
    document.querySelector('.footer p').textContent = t.footer;
}

// 更新页面特定内容的函数
function updateGeneratePage(lang) {
    const t = translations[lang].generate;
    
    // 更新风格按钮文本
    document.querySelectorAll('.style-btn').forEach(btn => {
        const style = btn.dataset.style;
        if (t.styles[style]) {
            btn.textContent = t.styles[style];
        }
    });
    
    // 更新刷新按钮文本
    const refreshBtn = document.querySelector('.refresh-btn');
    if (refreshBtn) {
        refreshBtn.innerHTML = `
            <i class="fas fa-sync-alt"></i>
            ${t.refresh}
        `;
    }
    
    // 更新复制和收藏按钮的title属性
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.title = t.copy.button;
    });
    
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.title = t.favorite;
    });
}

// 更新动态生成的内容的翻译
function updateDynamicContent(lang) {
    const t = translations[lang];
    
    // 更新所有动态生成的文本内容
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = key.split('.').reduce((obj, key) => obj[key], t);
        if (translation) {
            element.textContent = translation;
        }
    });
}

// 导出翻译对象供其他模块使用
export const getTranslations = () => translations; 