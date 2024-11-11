import { Route, Routes } from "react-router-dom";
import SignIn from "../modules/signin/SignIn";
import SignUp from "../modules/signup/SignUp";
import Home from "../modules/home/Home";
const MyRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signIn' element={<SignIn/>} />
        <Route path='/signUp' element={<SignUp/>} />
      </Routes>
    </>
  );
};

export default MyRoutes