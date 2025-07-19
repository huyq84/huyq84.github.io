import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 添加调试信息到页面
function addDebugInfo(message: string, type: 'info' | 'error' | 'success' = 'info') {
  const debugDiv = document.getElementById('debug-info') || (() => {
    const div = document.createElement('div')
    div.id = 'debug-info'
    div.style.cssText = `
      position: fixed;
      top: 10px;
      left: 10px;
      right: 10px;
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-family: monospace;
      font-size: 12px;
      z-index: 9999;
      max-height: 200px;
      overflow-y: auto;
    `
    document.body.appendChild(div)
    return div
  })()
  
  const color = type === 'error' ? '#ff6b6b' : type === 'success' ? '#51cf66' : '#74c0fc'
  const time = new Date().toLocaleTimeString()
  debugDiv.innerHTML += `<div style="color: ${color}">[${time}] ${message}</div>`
}

// 检测网络状态
function checkNetworkStatus() {
  if (!navigator.onLine) {
    addDebugInfo('网络连接已断开', 'error')
    return false
  }
  addDebugInfo('网络连接正常', 'success')
  return true
}

// 检测资源加载
function checkResourceLoading() {
  const scripts = document.querySelectorAll('script[src]')
  const links = document.querySelectorAll('link[href]')
  
  addDebugInfo(`检测到 ${scripts.length} 个脚本文件`, 'info')
  addDebugInfo(`检测到 ${links.length} 个样式文件`, 'info')
  
  scripts.forEach((script, index) => {
    const src = script.getAttribute('src')
    addDebugInfo(`脚本 ${index + 1}: ${src}`, 'info')
  })
  
  links.forEach((link, index) => {
    const href = link.getAttribute('href')
    addDebugInfo(`样式 ${index + 1}: ${href}`, 'info')
  })
}

// 添加调试信息
addDebugInfo('React应用开始加载...', 'info')
addDebugInfo(`页面URL: ${window.location.href}`, 'info')
addDebugInfo(`用户代理: ${navigator.userAgent}`, 'info')

// 检查网络状态
checkNetworkStatus()

// 检查资源加载
checkResourceLoading()

try {
  const rootElement = document.getElementById('root')
  if (!rootElement) {
    throw new Error('找不到root元素')
  }
  
  addDebugInfo('找到root元素，开始渲染React应用...', 'info')
  
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  
  addDebugInfo('React应用渲染完成', 'success')
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : String(error)
  addDebugInfo(`React应用加载失败: ${errorMessage}`, 'error')
  console.error('React应用加载失败:', error)
  
  // 在页面上显示错误信息
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif; background: #f8f9fa; min-height: 100vh;">
      <h1 style="color: #dc3545;">应用加载失败</h1>
      <p><strong>错误信息:</strong> ${errorMessage}</p>
      <p>请检查网络连接或刷新页面重试。</p>
      <button onclick="location.reload()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">刷新页面</button>
    </div>
  `
}
