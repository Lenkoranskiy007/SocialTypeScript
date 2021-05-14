import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter} from "react-router-dom";
import App from "./App";
import './index.css';
import store from "./redux/redux-store";
import {Provider} from "react-redux";

;


let rerenderEntireTree = () => {
    ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <App  />
        </Provider>

    </HashRouter>,
    document.getElementById('root'));}

rerenderEntireTree(store.getState())

store.subscribe(() => {
    let state = store.getState()
    rerenderEntireTree(state)
})