import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';

AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/crochet-frontend">
      <App />
    </BrowserRouter>
  </StrictMode>
);
