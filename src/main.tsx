import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 添加调试信息
console.log('React应用开始加载...')

try {
  const rootElement = document.getElementById('root')
  if (!rootElement) {
    throw new Error('找不到root元素')
  }
  
  console.log('找到root元素，开始渲染React应用...')
  
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  
  console.log('React应用渲染完成')
} catch (error) {
  console.error('React应用加载失败:', error)
  // 在页面上显示错误信息
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h1>应用加载失败</h1>
      <p>错误信息: ${error instanceof Error ? error.message : String(error)}</p>
      <p>请检查浏览器控制台获取更多信息。</p>
    </div>
  `
}
