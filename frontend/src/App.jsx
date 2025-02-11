import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import "./App.css"
import RefreshHandler from "./RefreshHandler";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const PrivateRouter = ({element})=>(
    isAuthenticated? element: <Navigate to="/login"/>
  )
  return (
    <div className="app">
      <Router>
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<PrivateRouter  element={<Home />} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
