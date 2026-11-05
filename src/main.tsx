import React from 'react'
import ReactDOM from 'react-dom/client'
// Global styles first, so component stylesheets can override them.
import './styles.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
