import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { makeServer } from './server';
import { store } from './store';
import { Provider } from 'react-redux';

// Call make Server
makeServer();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
