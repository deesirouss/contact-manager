import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { combineReducers } from "redux";
import { Provider } from "react-redux";
import store from "./store/store";
import contacts from "./reducers/contactReducers";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
export default combineReducers({
  contacts,
});
