import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TransactionProvider } from './context/TransactionContext.jsx';
import { UniswapProvider } from './context/UniswapContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <TransactionProvider>
    <UniswapProvider>
      <React.StrictMode>

        <App />

      </React.StrictMode>
      </UniswapProvider>
  </TransactionProvider>
)