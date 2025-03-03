import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root'));  // Création de la racine

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
