import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
