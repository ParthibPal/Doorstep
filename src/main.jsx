import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LogIn from './Components/LogIn.jsx';
import Context from './Components/CartOperations/Context.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Context>
    <App />
    </Context>
  </StrictMode>
)
