import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Header } from "./components/Common/Header";
import { Home } from "./pages/home";
import { SigninPage } from "./pages/auth/signin";
import { SignupPage } from "./pages/auth/signup";


const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
