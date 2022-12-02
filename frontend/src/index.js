import ReactDOM from 'react-dom/client';
import App from './App.js';
import { RecoilRoot } from 'recoil';
import './index.css';
import React from 'react';

const app = document.getElementById('app');
const root = ReactDOM.createRoot(app);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
