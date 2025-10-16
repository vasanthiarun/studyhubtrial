import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // your own styles (optional)

import { BrowserRouter } from 'react-router-dom'; 
import App from './App';
import { UserProvider } from "./context/user.context.jsx";

import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
   <UserProvider>
    <App />
   </UserProvider>
	</BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
