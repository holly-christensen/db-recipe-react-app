import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Main from './Main';
// import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';

// Render App.js
// ReactDOM.render(<App />, document.getElementById('root'));

// Render Main.js
ReactDOM.render(
  <Main/>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
