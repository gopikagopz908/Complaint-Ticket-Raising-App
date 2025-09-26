import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
<Toaster
  position="bottom-right"
  reverseOrder={false}
  toastOptions={{
    style: {
      fontSize: "16px",
      padding: "12px",
      color: "#fff",
    },
    success: {
      style: {
        background: "green",
        color: "#fff",
      },
    },
    error: {
      style: {
        background: "red",
        color: "#fff",
      },
    },
  }}
/>
  </StrictMode>,
)
