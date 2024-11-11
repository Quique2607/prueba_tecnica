import { useState } from "react";
import "./App.css";
import SignIn from "./modules/signin/SignIn";
import SignUp from "./modules/signup/SignUp";
import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./routes/MyRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyRoutes/>
      </BrowserRouter>
    </>
  );
}

export default App;
