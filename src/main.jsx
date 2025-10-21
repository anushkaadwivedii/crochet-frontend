import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { HashRouter } from 'react-router-dom';  // use HashRouter
import 'aos/dist/aos.css';
import AOS from 'aos';

AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
