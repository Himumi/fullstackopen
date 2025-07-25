import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClientProvider from './ApolloClientProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloClientProvider>
      <Router>
        <App />
      </Router>
    </ApolloClientProvider>
  </React.StrictMode>,
);
