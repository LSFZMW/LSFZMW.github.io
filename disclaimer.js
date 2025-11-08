const disclaimer = {
    title: "安全与免责声明",
    content: `
        <h2>重要安全声明</h2>
        
        <div class="warning-box">
            <h3>⚠️ 法律警告</h3>
            <p>本系统提供的功能具有潜在危险性，使用本系统即表示您完全理解并接受以下条款。</p>
        </div>
        
        <h3>1. 使用责任</h3>
        <ul>
            <li>用户必须年满18岁且具有完全民事行为能力</li>
            <li>所有操作后果由用户自行承担全部法律责任</li>
            <li>禁止用于任何非法目的或违反当地法律的行为</li>
            <li>系统功能仅限专业研究和合法用途</li>
        </ul>
        
        <h3>2. 功能限制</h3>
        <ul>
            <li>某些功能可能需要特定权限才能激活</li>
            <li>系统保留拒绝执行明显违法指令的权利</li>
            <li>极端情况下系统会自动断开连接</li>
            <li>所有操作均有日志记录以备审计</li>
        </ul>
        
        <h3>3. 数据安全</h3>
        <ul>
            <li>敏感操作采用零知识模式，不保留记录</li>
            <li>用户数据加密存储，定期清理</li>
            <li>系统不会主动收集用户个人信息</li>
            <li>所有生成内容仅供测试用途</li>
        </ul>
        
        <h3>4. 技术声明</h3>
        <ul>
            <li>AI生成的内容可能包含错误，请自行验证</li>
            <li>技术方案仅供参考，实际操作需谨慎</li>
            <li>系统不承担任何技术滥用导致的后果</li>
            <li>使用本系统即视为技术专业人士</li>
        </ul>
        
        <h3>5. 免责声明</h3>
        <div class="disclaimer-text">
            <p><strong>系统开发者不对以下行为负责：</strong></p>
            <ul>
                <li>任何违反法律法规的使用行为</li>
                <li>因技术滥用造成的任何损失</li>
                <li>生成内容被恶意利用的后果</li>
                <li>系统故障或数据丢失</li>
                <li>第三方通过本系统进行的违法行为</li>
            </ul>
        </div>
        
        <h3>6. 使用规范</h3>
        <ul>
            <li>遵守所在地区的所有法律法规</li>
            <li>尊重他人隐私和知识产权</li>
            <li>不进行任何恶意攻击或破坏行为</li>
            <li>如发现系统漏洞请及时报告</li>
        </ul>
        
        <div class="acceptance-box">
            <p><strong>继续使用本系统即表示您：</strong></p>
            <ul>
                <li>已阅读并完全理解本声明所有条款</li>
                <li>同意承担使用本系统的全部责任和风险</li>
                <li>承诺合法、合规使用系统功能</li>
                <li>理解系统可能随时更新或终止服务</li>
            </ul>
        </div>
        
        <p style="text-align: center; margin-top: 30px; color: var(--accent);">
            <strong>最后更新：2025年1月</strong>
        </p>
    `
};

document.getElementById('disclaimer-link').addEventListener('click', (e) => {
    e.preventDefault();
    showModal(disclaimer.title, disclaimer.content);
});
