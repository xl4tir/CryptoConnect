import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TransactionProvider } from './context/TransactionContext.jsx';
import { UniswapProvider } from './context/UniswapContext.jsx';
import { AuthProvider } from './context/authContext.jsx';
import { EthersConnectProvider } from './context/EthersConnectContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(

    <TransactionProvider>
      <UniswapProvider>
        <AuthProvider>
          <EthersConnectProvider>

            <React.StrictMode>

              <App />

            </React.StrictMode>

          </EthersConnectProvider>
        </AuthProvider>
      </UniswapProvider>
    </TransactionProvider>

)