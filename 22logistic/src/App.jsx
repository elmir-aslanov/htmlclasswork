import './App.css'

function App() {
  return (
    <div className="page">
      <header className="meta">
        <div className="meta-item">
          <span className="meta-label">Project:</span>
          <span className="meta-value">Supply Link</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Services:</span>
          <span className="meta-value">Brand Identity</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Field:</span>
          <span className="meta-value">Logistics Company</span>
        </div>
      </header>

      <main className="scene">
        <div className="scene-background" />
        <div className="truck">
          <div className="truck-container">
            <div className="container-gradient" />

            <div className="container-content">
              <div className="brand">
                <div className="brand-mark">
                  <span className="brand-icon">∞</span>
                  <span className="brand-name">Supply Link</span>
                </div>
                <span className="brand-tagline">
                  Logistics and Supply Chain Management
                </span>
              </div>

              <div className="copy">
                <div className="copy-left">
                  <span className="copy-label">Powered by AI</span>
                  <h1 className="copy-title">
                    Smart logistics
                    <br />
                    for your business
                  </h1>
                </div>

                <div className="copy-right">
                  <span className="copy-subtitle">
                    Logistics and Supply
                    <br />
                    Chain Management
                  </span>
                  <div className="qr-placeholder">
                    <span className="qr-text">QR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="truck-bottom">
            <div className="truck-rail">
              <div className="truck-hooks">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div key={index} className="hook" />
                ))}
              </div>
            </div>

            <div className="truck-chassis">
              <div className="wheel large">
                <div className="wheel-inner" />
              </div>
              <div className="wheel small">
                <div className="wheel-inner" />
              </div>
            </div>

            <div className="truck-cabin">
              <div className="cabin-top" />
              <div className="cabin-body">
                <div className="cabin-window" />
              </div>
            </div>
          </div>
        </div>
        <div className="scene-reflection" />
      </main>
    </div>
  )
}

export default App
