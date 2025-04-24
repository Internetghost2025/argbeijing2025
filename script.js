// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    const mainTitle = document.getElementById('main-title');
    const surroundingTexts = document.querySelectorAll('.lang-text');
    const revealButton = document.getElementById('reveal-button');
    const clueTextElement = document.getElementById('clue-text');
    const clue = 'MUHAIYIN'; // 你的线索
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


    // --- 5. 打字机效果函数 ---
    function typeWriter(element, text, speed) {
        element.textContent = ''; // 清空文本
        element.style.opacity = '1'; // 确保元素可见
        element.classList.remove('typing-done'); // 确保光标显示

        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.add('typing-done'); // 打完字，移除光标
            }
        }
        type(); // 启动打字
    }

    // --- 6. 按钮点击事件 ---
    revealButton.addEventListener('click', () => {
        // 开始播放打字机效果
        typeWriter(clueTextElement, clue, 100); // 100ms 打一个字

        // 隐藏按钮
        revealButton.style.opacity = '0';
        revealButton.style.pointerEvents = 'none';
    });
});