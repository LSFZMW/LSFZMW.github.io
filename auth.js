class AuthSystem {
    constructor() {
        this.password = 'LSFZERO999';
        this.authenticated = false;
        this.init();
    }
    
    init() {
        this.authScreen = document.getElementById('auth-screen');
        this.passwordInput = document.getElementById('auth-password');
        this.authButton = document.getElementById('auth-button');
        this.authError = document.getElementById('auth-error');
        
        this.authButton.addEventListener('click', () => this.authenticate());
        this.passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.authenticate();
        });
    }
    
    authenticate() {
        const input = this.passwordInput.value.trim();
        
        if (input === this.password) {
            this.authenticated = true;
            this.authScreen.style.opacity = '0';
            this.authScreen.style.transition = 'opacity 0.5s ease-out';
            
            setTimeout(() => {
                this.authScreen.style.display = 'none';
                document.getElementById('main-container').style.display = 'flex';
                document.getElementById('main-container').style.flexDirection = 'column';
            }, 500);
            
            // 记录认证时间
            localStorage.setItem('authTime', new Date().toISOString());
        } else {
            this.authError.textContent = '密码错误，请重试';
            this.passwordInput.value = '';
            this.passwordInput.focus();
        }
    }
    
    checkAuth() {
        const authTime = localStorage.getItem('authTime');
        if (authTime) {
            const timeDiff = new Date() - new Date(authTime);
            // 8小时后需要重新认证
            if (timeDiff < 8 * 60 * 60 * 1000) {
                this.authenticated = true;
                this.authScreen.style.display = 'none';
                document.getElementById('main-container').style.display = 'flex';
                document.getElementById('main-container').style.flexDirection = 'column';
            } else {
                localStorage.removeItem('authTime');
            }
        }
    }
}

// 初始化认证系统
const auth = new AuthSystem();
