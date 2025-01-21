import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthForm from './Components/AuthForm.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthForm />
  </StrictMode>,
)
