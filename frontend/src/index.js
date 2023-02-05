import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './assets/css/dropdown.css'
import 'font-awesome/css/font-awesome.min.css';

// client_id = 349496532252-j24sr9vmftp6nb246460c7crqd6l1lb8.apps.googleusercontent.com
// client_secret = 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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="349496532252-j24sr9vmftp6nb246460c7crqd6l1lb8.apps.googleusercontent.com">
      <Router>
      <App />
    </Router>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
