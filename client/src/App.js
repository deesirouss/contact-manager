import React from "react";
import { Navbar } from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Router from "./Router";

const App = () => {
  return (
    <div>
      <Navbar />
      <Router />
    </div>
  );
};

export default App;
