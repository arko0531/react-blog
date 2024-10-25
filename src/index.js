import App from 'App';
import React from 'react';
import 'index.css';
import GlobalStyle from 'styles/GlobalStyled';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
