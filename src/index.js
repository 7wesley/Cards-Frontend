/**
 * For running the app in a strict mode to measure performance
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 10/7/2021
 */

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store.js";

ReactDOM.render(
    // <React.StrictMode>
    //     <App />
    // </React.StrictMode>,
    // document.getElementById("root")

    //Provider allows React components to access Redux store
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
