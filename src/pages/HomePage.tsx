// React import removed as it's not needed in modern React

const skills = [
  '前端开发 (React, TypeScript, Vite)',
  '后端开发 (Node.js, Python)',
  '算法与数据结构',
  'AI 应用与自动化',
  '云服务与部署',
];

export default function HomePage() {
  console.log('HomePage组件开始渲染')
  
  return (
    <div className="homepage-tech-bg">
      <div className="homepage-glass">
        <h1 className="homepage-title">Hi, I am <span className="homepage-highlight">huyq</span></h1>
        <p className="homepage-desc">热爱科技，专注于前端与AI创新，追求极致体验与高效开发。</p>
        <div className="homepage-section">
          <h2>技能栈</h2>
          <ul className="homepage-skills">
            {skills.map(skill => <li key={skill}>{skill}</li>)}
          </ul>
        </div>
        <div className="homepage-section">
          <h2>联系方式</h2>
          <ul className="homepage-contact">
            <li>Email: <a href="mailto:huyq@example.com">huyq@qq.com</a></li>
            <li>GitHub: <a href="https://github.com/huyq" target="_blank" rel="noopener noreferrer">github.com/huyq</a></li>
          </ul>
        </div>
      </div>
      <div className="homepage-tech-anim" />
    </div>
  );
}
