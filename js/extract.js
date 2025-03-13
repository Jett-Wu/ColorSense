import { initThemeSwitch, initLangSwitch } from './settings.js';

class ColorExtractor {
    constructor() {
        this.uploadArea = document.getElementById('uploadArea');
        this.imageInput = document.getElementById('imageInput');
        this.resultSection = document.querySelector('.result-section');
        this.previewImage = document.getElementById('previewImage');
        this.extractedColors = document.querySelector('.extracted-colors');
        this.pickedColorPreview = document.querySelector('.picked-color-preview');
        this.pickedColorValue = document.querySelector('.picked-color-value');
        
        this.minColorDifference = 25; // 最小颜色差异阈值
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // 点击上传
        this.uploadArea.addEventListener('click', () => {
            this.imageInput.click();
        });
        
        // 文件选择变化
        this.imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleImage(file);
            }
        });
        
        // 拖拽事件
        this.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('drag-over');
        });
        
        this.uploadArea.addEventListener('dragleave', () => {
            this.uploadArea.classList.remove('drag-over');
        });
        
        this.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('drag-over');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                this.handleImage(file);
            }
        });
        
        // 复制颜色
        document.querySelector('.copy-all-btn').addEventListener('click', () => {
            const colors = Array.from(this.extractedColors.children)
                .map(block => block.getAttribute('data-color'));
            navigator.clipboard.writeText(colors.join(', '))
                .then(() => this.showToast('所有颜色已复制到剪贴板'));
        });
        
        // 添加取色器功能
        this.previewImage.addEventListener('click', (e) => {
            const color = this.getPixelColor(e);
            this.updatePickedColor(color);
        });
    }
    
    handleImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.previewImage.src = e.target.result;
                this.resultSection.style.display = 'grid';
                this.extractColors(img);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    
    extractColors(img) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // 增加采样尺寸以提高准确性
        const maxSize = 200;
        const scale = Math.min(maxSize / img.width, maxSize / img.height);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        
        // 收集像素并进行预处理
        const pixels = [];
        const weights = [];
        
        for (let i = 0; i < imageData.length; i += 4) {
            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];
            const a = imageData[i + 3];
            
            if (a < 128) continue;
            
            // 计算HSL以评估颜色重要性
            const hsl = this.rgbToHsl(r, g, b);
            const lab = this.rgbToLab(r, g, b);
            
            // 计算颜色权重
            const saturationWeight = hsl.s; // 饱和度权重
            const luminanceWeight = this.getLuminanceWeight(hsl.l); // 亮度权重
            const weight = saturationWeight * luminanceWeight;
            
            if (weight > 0.1) { // 忽略权重太低的颜色
                pixels.push(lab);
                weights.push(weight);
            }
        }

        // 使用加权K-means聚类
        const k = 8; // 先提取更多颜色
        const colors = this.weightedKMeansClustering(pixels, weights, k);
        
        // 后处理：合并相似颜色并保持多样性
        const processedColors = this.postProcessColors(colors);
        
        // 转换回RGB并按HSL排序
        const rgbColors = processedColors
            .map(lab => this.labToRgb(lab))
            .sort((a, b) => {
                const hslA = this.rgbToHsl(a.r, a.g, a.b);
                const hslB = this.rgbToHsl(b.r, b.g, b.b);
                return hslB.h - hslA.h || hslB.s - hslA.s;
            });
        
        // 转换为HEX并显示
        const hexColors = rgbColors.map(({r, g, b}) => this.rgbToHex(r, g, b));
        this.displayColors(hexColors.slice(0, 5)); // 只显示最好的5个颜色
    }
    
    weightedKMeansClustering(pixels, weights, k) {
        // 选择权重最高的点作为初始中心
        let centroids = this.selectInitialCentroids(pixels, weights, k);
        let oldCentroids = [];
        let iterations = 0;
        const maxIterations = 30;

        while (iterations < maxIterations) {
            const clusters = new Array(k).fill().map(() => ({
                points: [],
                weights: []
            }));
            
            // 分配像素到最近的中心点
            pixels.forEach((pixel, index) => {
                let minDist = Infinity;
                let closestCentroid = 0;
                
                centroids.forEach((centroid, i) => {
                    const dist = this.getLabDistance(pixel, centroid);
                    if (dist < minDist) {
                        minDist = dist;
                        closestCentroid = i;
                    }
                });
                
                clusters[closestCentroid].points.push(pixel);
                clusters[closestCentroid].weights.push(weights[index]);
            });
            
            // 更新中心点
            oldCentroids = [...centroids];
            clusters.forEach((cluster, i) => {
                if (cluster.points.length > 0) {
                    centroids[i] = this.calculateWeightedCentroid(
                        cluster.points,
                        cluster.weights
                    );
                }
            });
            
            if (this.checkConvergence(oldCentroids, centroids)) {
                break;
            }
            
            iterations++;
        }
        
        return centroids;
    }
    
    selectInitialCentroids(pixels, weights, k) {
        // 使用k-means++算法选择初始中心点
        const centroids = [];
        const n = pixels.length;
        
        // 选择第一个中心点（权重最高的点）
        const firstIndex = weights.indexOf(Math.max(...weights));
        centroids.push(pixels[firstIndex]);
        
        // 选择剩余的中心点
        for (let i = 1; i < k; i++) {
            const distances = pixels.map(pixel => {
                const minDist = Math.min(...centroids.map(
                    centroid => this.getLabDistance(pixel, centroid)
                ));
                return minDist * minDist;
            });
            
            const sum = distances.reduce((a, b) => a + b, 0);
            let rand = Math.random() * sum;
            
            for (let j = 0; j < n; j++) {
                rand -= distances[j];
                if (rand <= 0) {
                    centroids.push(pixels[j]);
                    break;
                }
            }
        }
        
        return centroids;
    }
    
    calculateWeightedCentroid(points, weights) {
        const totalWeight = weights.reduce((a, b) => a + b, 0);
        const weightedSum = points.reduce((acc, point, i) => ({
            l: acc.l + point.l * weights[i],
            a: acc.a + point.a * weights[i],
            b: acc.b + point.b * weights[i]
        }), {l: 0, a: 0, b: 0});
        
        return {
            l: weightedSum.l / totalWeight,
            a: weightedSum.a / totalWeight,
            b: weightedSum.b / totalWeight
        };
    }
    
    postProcessColors(colors) {
        // 合并相似颜色并确保多样性
        const processed = [];
        
        for (const color of colors) {
            // 检查是否与已处理的颜色太相似
            const isTooSimilar = processed.some(
                existing => this.getLabDistance(color, existing) < this.minColorDifference
            );
            
            if (!isTooSimilar) {
                processed.push(color);
            }
        }
        
        return processed;
    }
    
    getLuminanceWeight(l) {
        // 给中等亮度的颜色更高的权重
        const mid = 50;
        const spread = 30;
        return Math.exp(-Math.pow(l - mid, 2) / (2 * spread * spread));
    }
    
    rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            
            h /= 6;
        }

        return { h: h * 360, s: s * 100, l: l * 100 };
    }
    
    getLabDistance(lab1, lab2) {
        // 计算Lab颜色空间中的Delta E (CIE76)
        const deltaL = lab1.l - lab2.l;
        const deltaA = lab1.a - lab2.a;
        const deltaB = lab1.b - lab2.b;
        return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);
    }
    
    checkConvergence(oldCentroids, newCentroids) {
        const threshold = 0.1;
        return oldCentroids.every((old, i) => 
            this.getLabDistance(old, newCentroids[i]) < threshold
        );
    }
    
    rgbToLab(r, g, b) {
        // RGB到XYZ的转换
        let x, y, z;
        r = r / 255;
        g = g / 255;
        b = b / 255;

        r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
        g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
        b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

        x = (r * 0.4124 + g * 0.3576 + b * 0.1805) * 100;
        y = (r * 0.2126 + g * 0.7152 + b * 0.0722) * 100;
        z = (r * 0.0193 + g * 0.1192 + b * 0.9505) * 100;

        // XYZ到Lab的转换
        x = x / 95.047;
        y = y / 100;
        z = z / 108.883;

        x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
        y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
        z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;

        return {
            l: (116 * y) - 16,
            a: 500 * (x - y),
            b: 200 * (y - z)
        };
    }
    
    labToRgb(lab) {
        let y = (lab.l + 16) / 116;
        let x = lab.a / 500 + y;
        let z = y - lab.b / 200;

        x = 0.95047 * ((x * x * x > 0.008856) ? x * x * x : (x - 16/116) / 7.787);
        y = 1.00000 * ((y * y * y > 0.008856) ? y * y * y : (y - 16/116) / 7.787);
        z = 1.08883 * ((z * z * z > 0.008856) ? z * z * z : (z - 16/116) / 7.787);

        let r = x *  3.2406 + y * -1.5372 + z * -0.4986;
        let g = x * -0.9689 + y *  1.8758 + z *  0.0415;
        let b = x *  0.0557 + y * -0.2040 + z *  1.0570;

        r = r > 0.0031308 ? 1.055 * Math.pow(r, 1/2.4) - 0.055 : 12.92 * r;
        g = g > 0.0031308 ? 1.055 * Math.pow(g, 1/2.4) - 0.055 : 12.92 * g;
        b = b > 0.0031308 ? 1.055 * Math.pow(b, 1/2.4) - 0.055 : 12.92 * b;

        return {
            r: Math.max(0, Math.min(255, Math.round(r * 255))),
            g: Math.max(0, Math.min(255, Math.round(g * 255))),
            b: Math.max(0, Math.min(255, Math.round(b * 255)))
        };
    }
    
    getLuminance(rgb) {
        return 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
    }
    
    displayColors(colors) {
        this.extractedColors.innerHTML = colors.map(color => `
            <div class="color-block" 
                 style="background-color: ${color}"
                 data-color="${color}">
                <span class="color-value">${color}</span>
            </div>
        `).join('');
        
        // 添加点击复制功能
        this.extractedColors.querySelectorAll('.color-block').forEach(block => {
            block.addEventListener('click', () => {
                const color = block.getAttribute('data-color');
                navigator.clipboard.writeText(color)
                    .then(() => this.showToast(`颜色代码 ${color} 已复制`));
            });
        });
    }
    
    rgbToHex(r, g, b) {
        const toHex = (n) => {
            const hex = n.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
    }
    
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
    
    getPixelColor(event) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const rect = this.previewImage.getBoundingClientRect();
        
        // 设置canvas大小为图片实际显示大小
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        // 在canvas上绘制图片
        ctx.drawImage(this.previewImage, 0, 0, canvas.width, canvas.height);
        
        // 获取点击位置相对于图片的坐标
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // 获取像素颜色
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        return this.rgbToHex(pixel[0], pixel[1], pixel[2]);
    }
    
    updatePickedColor(color) {
        this.pickedColorPreview.style.backgroundColor = color;
        this.pickedColorValue.textContent = color;
        
        // 添加点击复制功能
        this.pickedColorPreview.onclick = () => {
            navigator.clipboard.writeText(color)
                .then(() => this.showToast(`颜色代码 ${color} 已复制`));
        };
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitch();
    initLangSwitch();
    new ColorExtractor();
}); 