import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './routes/index.tsx'
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-modern-drawer/dist/index.css'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
