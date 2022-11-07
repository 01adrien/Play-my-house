import React, { useContext } from "react";
import { currentUserContext } from "./context/CurrentUserContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./pages/User";

function ProtectedRoute({ children }) {
  const user = true; // useContext(currentUserContext);
  // user ? children : <Navigate to={"/login"} replace />;
  children;
}

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
