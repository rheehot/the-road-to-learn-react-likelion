import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import Welcome from "./components/Welcome";
import * as serviceWorker from './serviceWorker';

/* 
const element = <h1>Hello, world!</h1>;
ReactDOM.render(element, document.getElementById('root'));
*/

/*
const tick = () => {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById("root"));
};

setInterval(tick, 1000);
*/

/*
const element = <Welcome name="Lion" />;
ReactDOM.render(element, document.getElementById("root"));
*/

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
