class GradientGenerator {
    constructor() {
        this.currentType = 'linear';
        this.angle = 90;
        this.colorStops = [
            { color: '#6366f1', position: 0 },
            { color: '#a855f7', position: 100 }
        ];
        this.position = 'center';
        
        // 创建颜色选择器
        this.colorPicker = document.createElement('input');
        this.colorPicker.type = 'color';
        this.colorPicker.style.cssText = `
            position: fixed;
            opacity: 0;
            pointer-events: none;
        `;
        document.body.appendChild(this.colorPicker);
        
        this.initElements();
        this.initEventListeners();
        this.updateGradient();
        this.currentColorUpdateHandler = null;
        this.initPresets();
    }

    initElements() {
        // 获取DOM元素
        this.preview = document.querySelector('.gradient-preview');
        this.codeElement = document.getElementById('gradientCode');
        this.typeButtons = document.querySelectorAll('.type-buttons button');
        this.angleSlider = document.getElementById('angleSlider');
        this.angleValue = document.querySelector('.angle-value');
        this.colorStopSlider = document.querySelector('.color-stop-slider');
        this.addColorStopBtn = document.querySelector('.add-color-stop');
        this.copyCodeBtn = document.querySelector('.copy-code-btn');
        this.angleGroup = document.getElementById('angleGroup');
        this.positionGroup = document.getElementById('positionGroup');
        this.positionSelect = document.getElementById('positionSelect');
        
        // 初始化颜色节点
        this.renderColorStops();
    }

    initEventListeners() {
        // 渐变类型切换
        this.typeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.typeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.currentType = button.dataset.type;
                
                // 显示/隐藏相关选项
                if (this.currentType === 'radial') {
                    this.angleGroup.style.display = 'none';
                    this.positionGroup.style.display = 'flex';
                } else {
                    this.angleGroup.style.display = 'flex';
                    this.positionGroup.style.display = 'none';
                }
                
                this.updateGradient();
            });
        });

        // 角度调整
        this.angleSlider.addEventListener('input', (e) => {
            this.angle = e.target.value;
            this.angleValue.textContent = `${this.angle}°`;
            this.updateGradient();
        });

        // 位置选择
        this.positionSelect.addEventListener('change', (e) => {
            this.position = e.target.value;
            this.updateGradient();
        });

        // 添加颜色节点
        this.addColorStopBtn.addEventListener('click', () => {
            const newColor = this.generateRandomColor();
            // 计算新颜色的位置，使其均匀分布
            const position = this.calculateNewStopPosition();
            this.colorStops.push({
                color: newColor,
                position: position
            });
            this.renderColorStops();
            this.updateGradient();
        });

        // 复制CSS代码
        this.copyCodeBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(this.codeElement.textContent)
                .then(() => {
                    const originalText = this.copyCodeBtn.innerHTML;
                    this.copyCodeBtn.innerHTML = '<i class="fas fa-check"></i>已复制';
                    setTimeout(() => {
                        this.copyCodeBtn.innerHTML = originalText;
                    }, 2000);
                });
        });
    }

    renderColorStops() {
        this.colorStopSlider.innerHTML = '';
        
        this.colorStops.forEach((stop, index) => {
            const stopElement = document.createElement('div');
            stopElement.className = 'color-stop';
            if (this.colorStops.length > 2) {
                stopElement.classList.add('deletable');
            }
            
            stopElement.style.cssText = `
                position: absolute;
                left: ${stop.position}%;
                transform: translateX(-50%);
                width: 20px;
                height: 20px;
                background: ${stop.color};
                border: 2px solid white;
                border-radius: 50%;
                cursor: move;
                top: 10px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            `;

            this.makeStopDraggable(stopElement, index);

            // 修改颜色选择器的点击处理
            stopElement.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // 清理之前的事件监听器
                if (this.currentColorUpdateHandler) {
                    this.colorPicker.removeEventListener('input', this.currentColorUpdateHandler);
                }
                
                // 设置颜色选择器的位置为点击位置
                const rect = e.target.getBoundingClientRect();
                this.colorPicker.style.left = `${rect.left}px`;
                this.colorPicker.style.top = `${rect.top}px`;
                
                this.colorPicker.value = stop.color;
                
                // 创建新的更新处理器
                this.currentColorUpdateHandler = (e) => {
                    stop.color = e.target.value;
                    stopElement.style.background = e.target.value;
                    this.updateGradient();
                };
                
                // 添加新的处理器
                this.colorPicker.addEventListener('input', this.currentColorUpdateHandler);
                
                // 当颜色选择完成时移除处理器
                const onColorChangeComplete = () => {
                    this.colorPicker.removeEventListener('input', this.currentColorUpdateHandler);
                    this.colorPicker.removeEventListener('change', onColorChangeComplete);
                    this.currentColorUpdateHandler = null;
                };
                
                this.colorPicker.addEventListener('change', onColorChangeComplete);
                
                requestAnimationFrame(() => {
                    this.colorPicker.click();
                });
            });

            if (this.colorStops.length > 2) {
                stopElement.title = '双击删除此颜色节点';
                stopElement.addEventListener('dblclick', (e) => {
                    e.stopPropagation();
                    this.colorStops.splice(index, 1);
                    this.renderColorStops();
                    this.updateGradient();
                });
            }

            this.colorStopSlider.appendChild(stopElement);
        });
    }

    makeStopDraggable(element, index) {
        let isDragging = false;
        let startX;
        let startLeft;

        const startDragging = (clientX) => {
            isDragging = true;
            startX = clientX;
            startLeft = this.colorStops[index].position;
            element.style.zIndex = '1000';
            element.style.transform = 'translateX(-50%) scale(1.1)';
            document.body.style.cursor = 'move';
        };

        const doDrag = (clientX) => {
            if (!isDragging) return;

            const deltaX = clientX - startX;
            const sliderRect = this.colorStopSlider.getBoundingClientRect();
            const newPosition = startLeft + (deltaX / sliderRect.width) * 100;
            
            // 限制在0-100范围内
            const position = Math.max(0, Math.min(100, newPosition));
            this.colorStops[index].position = position;
            element.style.left = `${position}%`;
            
            // 实时更新渐变
            this.updateGradient();
        };

        const stopDragging = () => {
            if (!isDragging) return;
            isDragging = false;
            element.style.zIndex = '';
            element.style.transform = 'translateX(-50%)';
            document.body.style.cursor = '';
            
            // 确保颜色节点按位置排序
            this.colorStops.sort((a, b) => a.position - b.position);
            this.renderColorStops();
        };

        // 鼠标事件
        element.addEventListener('mousedown', (e) => {
            e.preventDefault();
            startDragging(e.clientX);
        });

        document.addEventListener('mousemove', (e) => {
            doDrag(e.clientX);
        });

        document.addEventListener('mouseup', stopDragging);

        // 触摸事件
        element.addEventListener('touchstart', (e) => {
            e.preventDefault();
            startDragging(e.touches[0].clientX);
        });

        document.addEventListener('touchmove', (e) => {
            doDrag(e.touches[0].clientX);
        });

        document.addEventListener('touchend', stopDragging);
    }

    generateRandomColor() {
        return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    }

    updateGradient() {
        let gradientString;
        const sortedStops = [...this.colorStops].sort((a, b) => a.position - b.position);
        const colorStopsString = sortedStops
            .map(stop => `${stop.color} ${stop.position}%`)
            .join(', ');

        switch (this.currentType) {
            case 'linear':
                gradientString = `linear-gradient(${this.angle}deg, ${colorStopsString})`;
                break;
            case 'radial':
                gradientString = `radial-gradient(circle at ${this.position}, ${colorStopsString})`;
                break;
            case 'conic':
                gradientString = `conic-gradient(from ${this.angle}deg at center, ${colorStopsString})`;
                break;
        }

        this.preview.style.background = gradientString;
        this.codeElement.textContent = `background: ${gradientString};`;
    }

    calculateNewStopPosition() {
        if (this.colorStops.length === 0) return 0;
        
        // 找到现有颜色节点之间最大的间隔
        const positions = this.colorStops.map(stop => stop.position).sort((a, b) => a - b);
        let maxGap = 0;
        let gapStart = 0;
        
        // 如果第一个位置不是0，考虑起始间隔
        if (positions[0] > maxGap) {
            maxGap = positions[0];
            gapStart = 0;
        }
        
        // 查找最大间隔
        for (let i = 0; i < positions.length - 1; i++) {
            const gap = positions[i + 1] - positions[i];
            if (gap > maxGap) {
                maxGap = gap;
                gapStart = positions[i];
            }
        }
        
        // 如果最后一个位置到100的间隔最大
        const endGap = 100 - positions[positions.length - 1];
        if (endGap > maxGap) {
            return 100;
        }
        
        // 返回最大间隔的中点
        return gapStart + maxGap / 2;
    }

    initPresets() {
        const presetItems = document.querySelectorAll('.preset-item');
        presetItems.forEach(item => {
            // 设置预览
            const preview = item.querySelector('.preset-preview');
            preview.style.background = item.dataset.gradient;

            // 点击应用预设
            item.addEventListener('click', () => {
                const gradient = item.dataset.gradient;
                this.applyPreset(gradient);
            });
        });
    }

    applyPreset(gradientString) {
        // 解析渐变字符串
        const match = gradientString.match(/(\w+)-gradient\(([\d.]+)deg,\s*(.*)\)/);
        if (!match) return;

        const [, type, angle, colorsStr] = match;

        // 设置渐变类型
        this.typeButtons.forEach(btn => {
            if (btn.dataset.type === type) {
                btn.click();
            }
        });

        // 设置角度
        this.angle = parseFloat(angle);
        this.angleSlider.value = this.angle;
        this.angleValue.textContent = `${this.angle}°`;

        // 解析颜色
        const colors = colorsStr.split(',').map(part => part.trim());
        this.colorStops = colors.map((color, index) => ({
            color: color,
            position: index * (100 / (colors.length - 1))
        }));

        this.renderColorStops();
        this.updateGradient();
    }
}

// 初始化渐变生成器
document.addEventListener('DOMContentLoaded', () => {
    new GradientGenerator();
}); 