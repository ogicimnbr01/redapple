import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './game/engine/tickEngine'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
