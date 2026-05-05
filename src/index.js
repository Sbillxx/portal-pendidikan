import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import './i18n';
import { BrowserRouter } from 'react-router-dom';


const rootElement = document.getElementById('root');

const AppWithHelmet = () => (
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
    ReactDOM.hydrateRoot(rootElement, <AppWithHelmet />);
} else {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<AppWithHelmet />);
} 

if (typeof window !== 'undefined') {
    reportWebVitals();
}