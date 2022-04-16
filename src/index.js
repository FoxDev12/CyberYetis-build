import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BlockchainContextProvider } from "./store/BlockchainContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <BlockchainContextProvider>
    <App />
    <ToastContainer />
  </BlockchainContextProvider>,
  document.getElementById('root')
);

