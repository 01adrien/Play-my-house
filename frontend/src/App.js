import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./pages/User";
import InstrumentFamily from "./pages/InstrumentFamily";
import InstrumentType from "./pages/InstrumentType";
import Instrument from "./pages/Instrument";
import AllInstruments from "./pages/AllInstruments";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { user } from "./store/user";
import { useRecoilValue } from "recoil";

function ProtectedRoute({ profile, children }) {
  if (!profile?.name) return <Navigate to={"/login"} replace={true} />;
  return children;
}

function ProtectedAdminRoute({ user, children }) {
  if (!user?.role === "dmin") return <Navigate to={"/login"} replace={true} />;
  return children;
}

export default function App() {
  const profile = useRecoilValue(user);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/user"
            element={
              <ProtectedRoute profile={profile}>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instrument-family/:family"
            element={<InstrumentFamily />}
          />
          <Route path="/instrument-type/:type" element={<InstrumentType />} />
          <Route path="/instrument/:id" element={<Instrument />} />
          <Route path="/instrument-all" element={<AllInstruments />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
