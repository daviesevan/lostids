import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages imports
import LandingPage from "./pages/landingpage";
import Navbar from "./components/navbar";
const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
