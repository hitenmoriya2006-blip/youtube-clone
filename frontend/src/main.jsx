import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Toaster
      position="top-left"
      visibleToasts={3}
      toastOptions={{
        style: {
          background: "#2A2A2A",
          color: "#ECECEC",
          border: "1px solid rgba(255,80,80,.35)",
          borderRadius: "20px",
          padding: "14px 16px",
          width:'260px',
          fontSize: "14px",
          fontWeight: 400,
          boxShadow: "0 15px 40px rgba(0,0,0,.35)",
        },
      }}
    />
    <App />
  </Provider>
)
