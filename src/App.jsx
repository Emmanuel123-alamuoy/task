import React, { useState, useEffect } from 'react'
import './styles.css'

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [description, setDescription] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (windowWidth > 768 && isMenuOpen) setIsMenuOpen(false)
  }, [windowWidth, isMenuOpen])

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile?.type.match('image.*')) {
      setFile(selectedFile)
    } else {
      alert('Please upload an image file (JPG, PNG, SVG)')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!file) return alert('Please upload a design file')
    if (!description.trim()) return alert('Please add a description')
    setIsModalOpen(true)
    console.log('Submitting:', { file: file.name, description })
  }

  return (
    <div className="app">
      {/* Header/Navigation */}
      <header className="header">
        <div className="logo"><i className="fas fa-crown"></i> SWIFTZE</div>
        
        <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span><span></span><span></span>
        </button>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#collections">Collections</a></li>
            <li><a href="#designers">Designers</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <button className="upload-btn" onClick={() => document.getElementById('fileInput').click()}>
            UPLOAD DESIGN
          </button>
          <input type="file" id="fileInput" onChange={handleFileChange} hidden />
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="heading">MALE FASHION</h1>

        <div className={`upload-container ${file ? 'has-file' : ''}`} onClick={() => document.getElementById('fileInput').click()}>
          <i className="fas fa-cloud-upload-alt upload-icon"></i>
          <p className="upload-text">Drag & Drop your design file here</p>
          <p className="file-info">{file ? file.name : 'or click to browse files (JPG, PNG, SVG)'}</p>
        </div>

        <form onSubmit={handleSubmit} className="form-container">
          <div className="description-container">
            <label htmlFor="description" className="description-label">DESIGN DESCRIPTION</label>
            <textarea
              id="description"
              className="description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your design..."
              required
            />
          </div>
          <button type="submit" className="add-to-cart"><i className="fas fa-shopping-cart"></i> ADD TO CART</button>
        </form>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="newsletter">
          <h3>JOIN OUR NEWSLETTER</h3>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email" required className="newsletter-input" />
            <button type="submit" className="newsletter-btn">SUBSCRIBE</button>
          </form>
        </div>
        <div className="social-links">
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-facebook"></i></a>
        </div>
        <p className="copyright">© {new Date().getFullYear()} LUXE MALE FASHION</p>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setIsModalOpen(false)}>&times;</button>
            <h3>DESIGN PREVIEW</h3>
            {file && <img src={URL.createObjectURL(file)} alt="Preview" className="modal-image" />}
            <p className="modal-description">{description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App