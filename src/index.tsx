import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App.tsx';
import './index.css';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
