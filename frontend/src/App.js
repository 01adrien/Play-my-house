import React, { useState } from "react";
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
  const [user, setUser] = useState({});
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home setUser={setUser} user={user} />} />
          <Route
            path="/login"
            element={<Login setUser={setUser} user={user} />}
          />
          <Route
            path="/user"
            element={<User setUser={setUser} user={user} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
