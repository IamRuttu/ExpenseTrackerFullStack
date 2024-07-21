import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Routes/Login";
import Dashboard from "./Routes/Dashboard";
import Signup from "./Routes/Signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            Component={Login}
          />
          <Route
            path="/login"
            Component={Login}
          />
          <Route
            path="/signup"
            Component={Signup}
          />
          <Route
            path="/dashboard"
            Component={Dashboard}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
