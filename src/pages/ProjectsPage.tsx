const projects = [
  {
    id: 1,
    title: "个人网站",
    description: "使用 React + TypeScript + Vite 构建的现代化个人网站，支持响应式设计和多页面路由。",
    technologies: ["React", "TypeScript", "Vite", "CSS3"],
    github: "https://github.com/huyq84/huyq84.github.io",
    demo: "https://huyq84.github.io",
    image: "/project1.jpg"
  },
  {
    id: 2,
    title: "AI 聊天助手",
    description: "基于 OpenAI API 的智能聊天助手，支持多轮对话和上下文记忆。",
    technologies: ["Python", "OpenAI API", "Flask", "JavaScript"],
    github: "https://github.com/huyq84/ai-chat",
    demo: "#",
    image: "/project2.jpg"
  },
  {
    id: 3,
    title: "任务管理系统",
    description: "全栈任务管理应用，支持用户认证、任务创建、状态跟踪等功能。",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/huyq84/task-manager",
    demo: "#",
    image: "/project3.jpg"
  },
  {
    id: 4,
    title: "数据可视化仪表板",
    description: "实时数据展示仪表板，支持多种图表类型和数据源集成。",
    technologies: ["React", "D3.js", "WebSocket", "Chart.js"],
    github: "https://github.com/huyq84/dashboard",
    demo: "#",
    image: "/project4.jpg"
  }
]

export default function ProjectsPage() {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">我的项目</h1>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <div className="project-placeholder">
                  {project.title.charAt(0)}
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link github"
                  >
                    GitHub
                  </a>
                  {project.demo !== "#" && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link demo"
                    >
                      演示
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}