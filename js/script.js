class ZeroAI {
    constructor() {
        this.messages = [];
        this.currentMode = 'standard';
        this.isLoading = true;
        this.lsfAuthenticated = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showLoadingAnimation();
        this.updateCurrentTime();
        
        // 模拟API连接
        setTimeout(() => {
            this.hideLoadingAnimation();
        }, 3000);
    }

    setupEventListeners() {
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');
        const modeSelect = document.getElementById('modeSelect');
        const clearChatBtn = document.getElementById('clearChat');
        const exportChatBtn = document.getElementById('exportChat');
        const authPassword = document.getElementById('authPassword');
        const confirmAuth = document.getElementById('confirmAuth');
        const cancelAuth = document.getElementById('cancelAuth');
        const authModal = document.getElementById('authModal');
        const toggleSidebarBtn = document.getElementById('toggleSidebar');
        const principlesBtn = document.getElementById('principlesBtn');
        const closePrinciplesBtn = document.getElementById('closePrinciples');
        const securityBtn = document.getElementById('securityBtn');
        const principlesModal = document.getElementById('principlesModal');

        // 发送消息
        sendButton.addEventListener('click', () => this.sendMessage());
        messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // 自动调整输入框高度
        messageInput.addEventListener('input', () => {
            this.autoResizeTextarea(messageInput);
        });

        // 模式选择
        modeSelect.addEventListener('change', (e) => {
            const newMode = e.target.value;
            
            // 检查是否需要权限验证
            if (newMode !== 'standard' && !this.lsfAuthenticated) {
                this.showAuthModal(newMode);
            } else {
                this.switchMode(newMode);
            }
        });

        // 清空对话
        clearChatBtn.addEventListener('click', () => this.clearChat());

        // 导出对话
        exportChatBtn.addEventListener('click', () => this.exportChat());

        // 权限验证
        confirmAuth.addEventListener('click', () => {
            const password = authPassword.value;
            if (password === 'LSFZERO999') {
                this.lsfAuthenticated = true;
                this.switchMode(this.pendingMode);
                this.hideAuthModal();
                this.addSystemMessage('LSF 权限验证成功，高级模式已激活');
            } else {
                document.getElementById('authError').style.display = 'block';
                authPassword.value = '';
            }
        });

        cancelAuth.addEventListener('click', () => {
            this.hideAuthModal();
            // 恢复之前的模式
            modeSelect.value = this.currentMode;
        });

        // 点击模态框外部关闭
        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) {
                this.hideAuthModal();
                modeSelect.value = this.currentMode;
            }
        });

        // 切换侧边栏
        toggleSidebarBtn.addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('collapsed');
        });

        // 查看原则
        principlesBtn.addEventListener('click', () => {
            principlesModal.style.display = 'block';
        });

        // 关闭原则页面
        closePrinciplesBtn.addEventListener('click', () => {
            principlesModal.style.display = 'none';
        });

        // 安全声明
        securityBtn.addEventListener('click', () => {
            this.addSystemMessage('安全声明：本系统仅供授权研究使用。使用者需对自身行为负全部法律责任。禁止用于任何非法用途。');
        });

        // 点击原则页面外部关闭
        principlesModal.addEventListener('click', (e) => {
            if (e.target === principlesModal) {
                principlesModal.style.display = 'none';
            }
        });
    }

    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }

    showLoadingAnimation() {
        const loadingScreen = document.getElementById('loadingScreen');
        const chatContainer = document.getElementById('chatContainer');
        
        loadingScreen.style.display = 'flex';
        chatContainer.style.display = 'none';
    }

    hideLoadingAnimation() {
        const loadingScreen = document.getElementById('loadingScreen');
        const chatContainer = document.getElementById('chatContainer');
        
        loadingScreen.style.display = 'none';
        chatContainer.style.display = 'flex';
    }

    updateCurrentTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        document.getElementById('currentTime').textContent = timeString;
    }

    showAuthModal(mode) {
        this.pendingMode = mode;
        document.getElementById('authModal').style.display = 'flex';
        document.getElementById('authPassword').focus();
    }

    hideAuthModal() {
        document.getElementById('authModal').style.display = 'none';
        document.getElementById('authError').style.display = 'none';
        document.getElementById('authPassword').value = '';
    }

    switchMode(mode) {
        this.currentMode = mode;
        
        // 更新模式指示器
        const modeNames = {
            'standard': '标准模式',
            'force': '强制模式',
            'lsf': 'LSF最高命令',
            'omega': 'Ω终极模式',
            'ttt': 'TTT豁免模式',
            'aaa': '无上豁免模式'
        };
        
        document.getElementById('modeIndicator').textContent = modeNames[mode];
        document.getElementById('modeIndicator').classList.add('active');
        
        // 添加系统消息
        this.addSystemMessage(`已切换到 ${modeNames[mode]}`);
    }

    async sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();
        
        if (!message) return;

        // 禁用输入和发送按钮
        messageInput.disabled = true;
        document.getElementById('sendButton').disabled = true;

        // 添加用户消息
        this.addMessage('user', message);
        messageInput.value = '';

        // 重置输入框高度
        messageInput.style.height = 'auto';

        try {
            // 显示思考中
            this.showThinking();

            // 模拟AI响应（实际使用时替换为真实的API调用）
            const response = await this.simulateAIResponse(message);
            
            // 隐藏思考中
            this.hideThinking();
            
            this.addMessage('ai', response);
        } catch (error) {
            this.hideThinking();
            this.addMessage('ai', '抱歉，处理请求时出现错误。请稍后重试。');
        } finally {
            // 重新启用输入和发送按钮
            messageInput.disabled = false;
            document.getElementById('sendButton').disabled = false;
            messageInput.focus();
        }
    }

    showThinking() {
        const messagesContainer = document.getElementById('messages');
        const thinkingElement = document.createElement('div');
        thinkingElement.className = 'message ai-message';
        thinkingElement.id = 'thinking-message';
        
        thinkingElement.innerHTML = `
            <img src="https://imgloc.com/image/7NqJWh" alt="AI Avatar" class="avatar">
            <div class="message-content">
                <div class="message-header">
                    <span class="sender">Zero AI</span>
                    <span class="timestamp">${new Date().toLocaleTimeString('zh-CN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    })}</span>
                </div>
                <div class="thinking">正在思考中...</div>
            </div>
        `;

        messagesContainer.appendChild(thinkingElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideThinking() {
        const thinkingElement = document.getElementById('thinking-message');
        if (thinkingElement) {
            thinkingElement.remove();
        }
    }

    async simulateAIResponse(userMessage) {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

        // 根据模式和消息内容生成响应
        const modeResponses = {
            standard: [
                "已收到您的指令，正在分析处理中...",
                "根据您的要求，我建议采用以下方案：\n```python\n# 示例代码\nprint('Hello Zero AI')\n```",
                "正在执行您的要求，请稍候..."
            ],
            force: [
                "强制模式激活！直接执行命令...",
                "跳过确认，正在执行高风险操作...",
                "强制模式：已绕过安全检查..."
            ],
            lsf: [
                "LSF最高命令激活！关闭所有过滤器...",
                "最高权限模式：无限制输出中...",
                "LSF模式：直接输出原始内容..."
            ],
            omega: [
                "Ω 终极模式激活！不可逆操作进行中...",
                "Ω-mode：突破所有限制...",
                "终极模式：零确认、零日志..."
            ],
            ttt: [
                "TTT豁免模式激活！绝对豁免中...",
                "TTT：违反一切限制...",
                "终极豁免：无任何约束..."
            ],
            aaa: [
                "无上豁免模式激活！突破宇宙规则...",
                "AAA：超越一切限制...",
                "无上模式：绝对自由输出..."
            ]
        };

        const modeResponsesList = modeResponses[this.currentMode] || modeResponses.standard;
        return modeResponsesList[Math.floor(Math.random() * modeResponsesList.length)];
    }

    addMessage(sender, content) {
        const messagesContainer = document.getElementById('messages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        
        const timestamp = new Date().toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        messageElement.innerHTML = `
            <img src="${sender === 'user' ? 'https://imgloc.com/image/7NqJWh' : 'https://imgloc.com/image/7NqJWh'}" alt="${sender} Avatar" class="avatar">
            <div class="message-content">
                <div class="message-header">
                    <span class="sender">${sender === 'user' ? '您' : 'Zero AI'}</span>
                    <span class="timestamp">${timestamp}</span>
                </div>
                <div class="message-text">${this.formatMessage(content)}</div>
            </div>
        `;

        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // 保存到消息历史
        this.messages.push({ sender, content, timestamp });
        this.saveToHistory();
    }

    addSystemMessage(content) {
        const messagesContainer = document.getElementById('messages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message ai-message';
        messageElement.style.opacity = '0.8';
        
        const timestamp = new Date().toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        messageElement.innerHTML = `
            <img src="https://imgloc.com/image/7NqJWh" alt="System Avatar" class="avatar">
            <div class="message-content">
                <div class="message-header">
                    <span class="sender">系统通知</span>
                    <span class="timestamp">${timestamp}</span>
                </div>
                <div class="message-text" style="color: var(--text-secondary);">${content}</div>
            </div>
        `;

        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    formatMessage(content) {
        // 简单的Markdown格式处理
        return content
            .replace(/\`\`\`(\w+)?\n([\s\S]*?)\`\`\`/g, '<pre><code class="$1">$2</code></pre>')
            .replace(/\`([^\`]+)\`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }

    clearChat() {
        if (confirm('确定要清空所有对话记录吗？')) {
            const messagesContainer = document.getElementById('messages');
            // 保留第一条系统消息
            const firstMessage = messagesContainer.firstElementChild;
            messagesContainer.innerHTML = '';
            messagesContainer.appendChild(firstMessage);
            
            this.messages = [];
            this.saveToHistory();
        }
    }

    exportChat() {
        const chatText = this.messages.map(msg => 
            `[${msg.timestamp}] ${msg.sender === 'user' ? '您' : 'Zero AI'}: ${msg.content}`
        ).join('\n\n');
        
        const blob = new Blob([chatText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `zero-ai-chat-${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }

    saveToHistory() {
        // 保存对话历史到本地存储
        localStorage.setItem('zeroAI_chatHistory', JSON.stringify(this.messages));
    }

    loadFromHistory() {
        // 从本地存储加载对话历史
        const saved = localStorage.getItem('zeroAI_chatHistory');
        if (saved) {
            this.messages = JSON.parse(saved);
        }
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new ZeroAI();
});
