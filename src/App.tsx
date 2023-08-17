import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";

export default function App() {
  const [loginAlert, setLoginAlert] = useState("")
  return (
    <Routes>

      {/* Sign Up */}
      <Route path="" element={<SignUp loginAlert={loginAlert} />} />
      
      {/* Home Page */}
      <Route path="home" element={<Home setLoginAlert={setLoginAlert} />} />

    </Routes>
  );
}