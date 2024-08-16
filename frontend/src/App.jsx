import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages imports
import LandingPage from "./pages/landingpage";
import Navbar from "./components/navbar";
import SignUp from "./pages/auth/signup";
import Signin from "./pages/auth/signin";
import { AuthProvider } from "./contexts/authcontext";
import GoogleAuth from "./components/authentication/googleauth";
import VerifyEmail from "./components/authentication/verifyemail";
import Success from "./pages/success/signup";


const Register = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  return <SignUp />;
};

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signup/success" element={<Success />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/auth/callback" element={<GoogleAuth />} />
            <Route path="/email-verification/:token" element={<VerifyEmail />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
