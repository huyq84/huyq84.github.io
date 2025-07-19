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
      background: rgba(0,0,0,0.9);
      color: white;
      padding: 15px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 14px;
      z-index: 9999;
      max-height: 300px;
      overflow-y: auto;
      border: 2px solid #333;
    `
    document.body.appendChild(div)
    return div
  })()
  
  const color = type === 'error' ? '#ff6b6b' : type === 'success' ? '#51cf66' : '#74c0fc'
  const time = new Date().toLocaleTimeString()
  const logEntry = `<div style="color: ${color}; margin: 5px 0; padding: 5px; border-left: 3px solid ${color}; padding-left: 10px;">[${time}] ${message}</div>`
  debugDiv.innerHTML += logEntry
  
  // 同时输出到控制台
  console.log(`[${time}] ${message}`)
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

// 检测页面加载状态
function checkPageLoadStatus() {
  addDebugInfo(`页面加载状态: ${document.readyState}`, 'info')
  addDebugInfo(`DOM内容加载完成: ${document.readyState === 'interactive' || document.readyState === 'complete'}`, 'info')
  
  // 监听页面加载事件
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      addDebugInfo('DOM内容加载完成', 'success')
    })
  }
  
  window.addEventListener('load', () => {
    addDebugInfo('页面完全加载完成', 'success')
  })
}

// 检测浏览器兼容性
function checkBrowserCompatibility() {
  addDebugInfo(`浏览器: ${navigator.userAgent}`, 'info')
  addDebugInfo(`屏幕尺寸: ${window.screen.width}x${window.screen.height}`, 'info')
  addDebugInfo(`视口尺寸: ${window.innerWidth}x${window.innerHeight}`, 'info')
  addDebugInfo(`设备像素比: ${window.devicePixelRatio}`, 'info')
  
  // 检查ES6支持
  try {
    eval('const test = () => {}')
    addDebugInfo('ES6箭头函数支持: 是', 'success')
  } catch (e) {
    addDebugInfo('ES6箭头函数支持: 否', 'error')
  }
  
  // 检查fetch支持
  if (typeof fetch !== 'undefined') {
    addDebugInfo('Fetch API支持: 是', 'success')
  } else {
    addDebugInfo('Fetch API支持: 否', 'error')
  }
}

// 添加调试信息
addDebugInfo('=== 移动端调试模式已启动 ===', 'success')
addDebugInfo('React应用开始加载...', 'info')
addDebugInfo(`页面URL: ${window.location.href}`, 'info')

// 检查浏览器兼容性
checkBrowserCompatibility()

// 检查网络状态
checkNetworkStatus()

// 检查资源加载
checkResourceLoading()

// 检查页面加载状态
checkPageLoadStatus()

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
      <p><strong>调试提示:</strong> 查看页面左上角的调试信息</p>
      <button onclick="location.reload()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">刷新页面</button>
    </div>
  `
}
