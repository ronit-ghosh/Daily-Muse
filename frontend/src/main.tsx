import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './app.css'
import { RecoilRoot } from 'recoil'

createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
)
