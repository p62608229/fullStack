import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './Redux/store.js';

const container = document.getElementById('root')!;
const root = createRoot(container);

const renderApp = () => {
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      </Provider>
  </React.StrictMode>
);
}

renderApp();

// if ((module as any).hot) {
//   (module as any).hot.accept(() => {
//       renderApp();
//   })
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
