// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    const mainTitle = document.getElementById('main-title');
    const surroundingTexts = document.querySelectorAll('.lang-text');
    const revealButton = document.getElementById('reveal-button');
    const clueTextElement = document.getElementById('clue-text');
    // const clue = 'MUHAIYIN'; // 不再需要这行，因为直接显示链接
    const preloaderDuration = 1500; // Preloader显示时间 (毫秒)

    // --- 1. 初始化 tsParticles ---
    tsParticles.load("tsparticles", {
        background: {
            color: {
                value: "#000000" // 确保背景是黑色
            }
        },
        fpsLimit: 60, // 帧率限制
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "grab" // 鼠标悬停时抓住粒子连线
                },
                onClick: {
                    enable: true,
                    mode: "push" // 点击时推开粒子
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: { // tsParticles 2.x 使用 links
                        opacity: 1
                    }
                },
                push: {
                    quantity: 4 // 点击时推出4个粒子
                }
            }
        },
        particles: {
            color: {
                value: "#ffffff" // 粒子颜色
            },
            links: { // 注意: v1叫line_linked, v2叫links
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.1, // 降低连接线透明度，更微妙
                width: 1
            },
            collisions: { // 粒子碰撞
                 enable: false // 关闭碰撞，减少性能消耗
            },
            move: {
                direction: "none",
                enable: true,
                outModes: { // 粒子移出画布模式
                    default: "bounce" // 碰到边缘反弹
                },
                random: false,
                speed: 0.5, // 降低粒子速度
                straight: false
            },
            number: {
                density: {
                    enable: true,
                    value_area: 800 // 粒子密度
                },
                value: 50 // 粒子数量减少一些
            },
            opacity: {
                value: 0.3 // 降低粒子透明度
            },
            shape: {
                type: "circle" // 粒子形状
            },
            size: {
                random: true, // v1叫random, v2可能需要一个对象 { enable: true, minimumValue: 1 }
                value: { min: 1, max: 3 }, // 粒子大小范围 (v2格式)
            }
        },
        detectRetina: true // 高清屏幕优化
    });

    // --- 2. Preloader 逻辑 ---
    setTimeout(() => {
        preloader.style.opacity = '0'; // 开始渐隐
        preloader.addEventListener('transitionend', () => { // 等待渐隐动画结束
            preloader.classList.add('hidden'); // 彻底隐藏
        });

        // 显示主内容区域
        mainContent.classList.remove('hidden');

        // --- 3. 内容动画序列 (在主内容可见后开始) ---
        startContentAnimation();

    }, preloaderDuration);


    // --- 4. 内容动画函数 ---
    function startContentAnimation() {
        // 主要标题动画 (CSS 动画会自动播放, 但我们需要知道何时开始其他动画)
        // CSS中设置了0.5s延迟，所以相对于main-content出现0.5s后标题动画开始
        const titleAnimationDuration = 800; // CSS动画时长
        const titleDelay = 500; // CSS动画延迟

        // 周围文字浮现 (标题动画开始后一段时间)
        setTimeout(() => {
            surroundingTexts.forEach((text, index) => {
                setTimeout(() => {
                    text.classList.add('surrounding-visible');
                }, index * 100); // 错落效果
            });
        }, titleDelay + titleAnimationDuration / 2); // 标题动画进行到一半时开始

        // 按钮浮现 (周围文字开始浮现后一段时间)
        setTimeout(() => {
            revealButton.classList.add('visible');
        }, titleDelay + titleAnimationDuration + 500); // 标题动画结束后0.5秒
    }

    // --- 5. 打字机效果函数 (此版本中不再需要，但保留定义无害) ---
    function typeWriter(element, text, speed, callback) {
        // (内容省略，因为此版本不使用它)
    }

    // --- 6. 按钮点击事件 (无打字机效果版本) ---
    revealButton.addEventListener('click', () => {
        // ==============================================================
        // ！！非常重要：请将下面的 "你的百度地图链接URL" 替换成你真实的百度地图链接！！
        const baiduMapUrl = "https://map.baidu.com/poi/Seesaw%20Coffee(%E5%8C%97%E4%BA%AC%E4%B8%89%E9%87%8C%E5%B1%AF%E6%9C%BA%E7%94%B5%E9%99%A2%E5%BA%97)/@12964768.54,4829252.59,14z?uid=7af7f0efb073834d02294f2e&ugc_type=3&ugc_ver=1&device_ratio=1&compat=1&pcevaname=pc4.1&querytype=detailConInfo&da_src=shareurl"; 
        // ==============================================================

        // 设置链接文本（用户看到的文字）
        const linkText = "查看下一个坐标"; // 你可以改成“秘密地点”、“最终目的地”等

        // 清理可能存在的打字机样式残留 (重要！)
        clueTextElement.classList.remove('typing-effect'); // 移除可能存在的类
        clueTextElement.classList.remove('typing-done');   // 移除可能存在的类
        clueTextElement.style.borderRight = 'none';        // 强制移除光标边框
        clueTextElement.style.animation = 'none';          // 强制停止闪烁动画
        clueTextElement.textContent = '';                  // 清空任何残留文本

        // 使用 innerHTML 在 <p> 标签内直接创建 <a> 链接标签
        clueTextElement.innerHTML = `<a href="${baiduMapUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;

        // 让包含链接的 <p> 元素通过透明度变化渐显
        clueTextElement.style.opacity = '1'; 

        // 隐藏按钮 (保持不变)
        revealButton.style.opacity = '0';
        revealButton.style.pointerEvents = 'none';
    });
});