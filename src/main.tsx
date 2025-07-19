import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 彻底移除调试信息相关代码

try {
  const rootElement = document.getElementById('root')
  if (!rootElement) {
    throw new Error('找不到root元素')
  }

  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} catch (error) {
  // 在页面上显示错误信息
  const errorMessage = error instanceof Error ? error.message : String(error)
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif; background: #f8f9fa; min-height: 100vh;">
      <h1 style="color: #dc3545;">应用加载失败</h1>
      <p><strong>错误信息:</strong> ${errorMessage}</p>
      <p>请检查网络连接或刷新页面重试。</p>
      <button onclick="location.reload()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">刷新页面</button>
    </div>
  `
}
