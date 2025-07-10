import React, { useEffect } from 'react';
import './App.css'; // 样式文件单独存放

// 导航链接类型定义
interface NavLink {
  id: string;
  label: string;
}

// 作品类型定义
interface Project {
  id: number;
  name: string;
}

const App: React.FC = () => {
  // 导航数据
  const navLinks: NavLink[] = [
    { id: 'about', label: '关于我' },
    { id: 'portfolio', label: '作品集' },
    { id: 'contact', label: '联系方式' }
  ];

  // 作品数据
  const projects: Project[] = [
    { id: 1, name: '响应式企业官网' },
    { id: 2, name: '数据可视化仪表盘' }
  ];

  // 平滑滚动效果
  useEffect(() => {
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.slice(1);
        if (targetId) {
          const element = document.getElementById(targetId);
          element?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const nav = document.querySelector('nav');
    nav?.addEventListener('click', handleNavClick);

    return () => {
      nav?.removeEventListener('click', handleNavClick);
    };
  }, []);

  return (
    <div className="app">
      <header>
        <h1>huyq 的个人网站</h1>
        <p>前端开发者 & 技术爱好者</p>
      </header>

      <nav>
        <ul>
          {navLinks.map(link => (
            <li key={link.id}>
              <a href={`#${link.id}`}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container">
        <section id="about">
          <h2>关于我</h2>
          <p>一名热爱前端开发的技术爱好者，专注于构建用户体验优秀的Web应用。</p>
        </section>

        <section id="portfolio">
          <h2>作品展示</h2>
          {projects.map(project => (
            <p key={project.id}>项目{project.id}：{project.name}</p>
          ))}
        </section>

        <section id="contact">
          <h2>联系我</h2>
          <p>邮箱：<a href="mailto:example@domain.com">example@domain.com</a></p>
          <p>GitHub：<a href="https://github.com/username" target="_blank" rel="noopener noreferrer">github.com/username</a></p>
        </section>
      </div>

      <footer>
        <p>© 2025 huyq 的个人网站. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;

