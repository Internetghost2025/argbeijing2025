// 等待整个页面资源加载完毕
window.addEventListener('load', () => {
    const mainTitle = document.getElementById('main-title');
    const surroundingTexts = document.querySelectorAll('.lang-text');
    const revealButton = document.getElementById('reveal-button');
    const clueText = document.getElementById('clue-text');
    const clue = 'MUHAIYIN'; // 你提供的线索

    // 1. 主要标题动画通过CSS自动播放 (基于animation-delay)

    // 2. 延迟一段时间后，让周围的文字慢慢浮现
    setTimeout(() => {
        surroundingTexts.forEach((text, index) => {
            // 可以为每个文本添加不同的延迟，实现错落效果
            // 这里简单处理，让它们一起出现，但可以调整
            setTimeout(() => {
                text.classList.add('surrounding-visible');
            }, index * 100); // 每个延迟100ms，形成一点点先后顺序
        });
    }, 1500); // 主标题动画开始后1秒 (0.5s delay + 0.8s duration 约等于 1.3s, 留点空隙)

    // 3. 再延迟一段时间后，让红色按钮浮现
    setTimeout(() => {
        revealButton.classList.add('visible');
    }, 2800); // 等周围文字开始浮现后再出现按钮 (1500ms + 1300ms)

    // 4. 给按钮添加点击事件监听器
    revealButton.addEventListener('click', () => {
        // 显示线索文本
        clueText.textContent = clue;
        clueText.classList.add('visible');

        // 可选：隐藏按钮，或者禁用按钮
        revealButton.style.opacity = '0'; // 让按钮消失
        revealButton.style.pointerEvents = 'none'; // 禁止再次点击
        // 或者 revealButton.disabled = true;
    });
});