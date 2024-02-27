import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import RegistrationForm from "./components/Register";
import LoginForm from "./components/Login";
import Home from "./components/Home";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    setIsLogin(localStorage.getItem("token") ? true : false);
  });

  return (
    <Container maxWidth="lg" style={{ marginTop: "40px" }}>
      <Routes>
        {isLogin ? (
          <Route path="/home" element={<Home setIsLogin={setIsLogin} />} />
        ) : (
          <Route
            path="/"
            element={
              isLoginPage ? (
                <LoginForm
                  onLoginClick={setIsLoginPage}
                  setIsLogin={setIsLogin}
                />
              ) : (
                <RegistrationForm
                  onLoginClick={setIsLoginPage}
                  setIsLogin={setIsLogin}
                />
              )
            }
          />
        )}
      </Routes>
    </Container>
  );
}

export default App;
