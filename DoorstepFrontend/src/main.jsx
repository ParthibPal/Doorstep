import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ Add this
import App from './App.jsx';
import './index.css';
import Context from './Components/CartOperations/Context.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* ✅ Wrap your app in the router */}
      <Context>
        <App />
      </Context>
    </BrowserRouter>
  </StrictMode>
);
