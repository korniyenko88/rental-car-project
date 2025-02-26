import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import styles from'./index.module.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div className={styles.container}>
        <App />
      </div>
    </BrowserRouter>
  </StrictMode>
);
