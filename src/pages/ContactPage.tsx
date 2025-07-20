export default function ContactPage() {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">联系我</h1>
        <div className="contact-section">
          <div className="contact-info">
            <h2>联系方式</h2>
            <div className="contact-item">
              <span className="contact-label">邮箱：</span>
              <a href="mailto:411807438@qq.com" className="contact-link">
                411807438@qq.com
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-label">GitHub：</span>
              <a 
                href="https://github.com/huyq84" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-link"
              >
                github.com/huyq84
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-label">微信：</span>
              <span className="contact-text">huyq_dev</span>
            </div>
          </div>
          
          <div className="contact-form">
            <h2>发送消息</h2>
            <form className="form">
              <div className="form-group">
                <label htmlFor="name">姓名</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="form-input"
                  placeholder="请输入您的姓名"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">邮箱</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="form-input"
                  placeholder="请输入您的邮箱"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">主题</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  className="form-input"
                  placeholder="请输入消息主题"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">消息</label>
                <textarea 
                  id="message" 
                  name="message" 
                  className="form-textarea"
                  rows={5}
                  placeholder="请输入您的消息内容"
                ></textarea>
              </div>
              
              <button type="submit" className="form-button">
                发送消息
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}