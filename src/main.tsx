import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'pages/App';
import { ToastContainer } from 'react-toastify';

import './style/global.scss';
import './style/tailwind.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer />
    <App />
  </React.StrictMode>,
);
