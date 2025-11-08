class LoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.spans = document.querySelectorAll('.loading-span');
        this.init();
    }
    
    init() {
        // 逐字显示动画
        this.spans.forEach((span, index) => {
            span.style.animationDelay = `${index * 0.1}s`;
        });
        
        // 3秒后隐藏加载界面
        setTimeout(() => {
            this.hide();
        }, 3000);
    }
    
    hide() {
        this.loadingScreen.style.opacity = '0';
        this.loadingScreen.style.transition = 'opacity 0.5s ease-out';
        
        setTimeout(() => {
            this.loadingScreen.style.display = 'none';
            // 显示认证界面
            document.getElementById('auth-screen').style.display = 'flex';
        }, 500);
    }
}

// 初始化加载动画
document.addEventListener('DOMContentLoaded', function() {
    new LoadingScreen();
});
