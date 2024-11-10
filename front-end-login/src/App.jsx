import { useState } from "react";
import "./App.css";
import SignIn from "./modules/signin/SignIn";

function App() {
  return (
    <>
      {/* <div className='w-full bg-red-400'>
        <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
      </div> */}

      

      <SignIn/>
    </>
  );
}

export default App;
