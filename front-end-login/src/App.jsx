import { useState } from "react";
import "./App.css";
import SignIn from "./modules/signin/SignIn";
import SignUp from "./modules/signup/SignUp";
import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./routes/MyRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
    <AuthProvider>
    
      <BrowserRouter>
        <MyRoutes/>
      </BrowserRouter>
    </AuthProvider>
    </>
  );
}

export default App;
