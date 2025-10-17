import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';

AOS.init();

function RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');
    if (redirect) {
      navigate(redirect, { replace: true });
    }
  }, [navigate]);

  return <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/crochet-frontend">
      <RedirectHandler />
    </BrowserRouter>
  </StrictMode>
);
