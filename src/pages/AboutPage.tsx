export default function AboutPage() {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">关于我</h1>
        <div className="about-section">
          <div className="about-text">
            <p>
              你好！我是 huyq，一名充满热情的全栈开发者。我专注于前端技术和人工智能应用，
              致力于创造优秀的用户体验和高效的解决方案。
            </p>
            <p>
              我拥有丰富的项目经验，从个人项目到企业级应用都有涉猎。
              我喜欢学习新技术，并将其应用到实际项目中。
            </p>
          </div>
          
          <div className="about-details">
            <h2>教育背景</h2>
            <p>计算机科学与技术专业</p>
            
            <h2>工作经历</h2>
            <ul>
              <li>前端开发工程师 - 专注于 React 和 TypeScript</li>
              <li>全栈开发 - Node.js 和 Python 后端开发</li>
              <li>AI 应用开发 - 机器学习和自动化工具</li>
            </ul>
            
            <h2>兴趣爱好</h2>
            <ul>
              <li>开源项目贡献</li>
              <li>技术博客写作</li>
              <li>新技术探索</li>
              <li>健身和户外运动</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}