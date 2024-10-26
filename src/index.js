import React from 'react';
import App from 'App';
import 'index.css';
import ReactDOM from 'react-dom/client';
import GlobalStyle from 'styles/GlobalStyled';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
