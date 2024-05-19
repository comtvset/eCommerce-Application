import { createRoot } from 'react-dom/client';
import React from 'react';
import { App } from 'src/App.tsx';
import 'src/styles/style.css';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
