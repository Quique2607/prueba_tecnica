import { UserOutlined,UnlockOutlined } from "@ant-design/icons";
import { Input, Checkbox, Button } from "antd";
import SocialMedia from "./components/SocialMedia";
import sign_in from "/sign_in.svg";

const SignIn = () => {
  return (
    <>
      <div className="grid grid-cols-1  md:grid-cols-2 items-center p-5 md:p-[60px]  w-full h-full gap-10">
        <div className=" h-[200px] md:h-[600px] flex items-center justify-center">
          <img src={sign_in} alt="sign_in" className="object-contain h-full p-2"/>
        </div>

        <div className="  h-full md:h-[600px] flex flex-col justify-center border-[2px] border-dashed border-black rounded-2xl ">
          <h1 className="text-5xl font-extrabold p-3">Sign in</h1>

          <div className="mt-5">
            <form action="" className="p-3 flex flex-col gap-5">
              <Input
                size="large"
                placeholder="Nombre Usuario"
                prefix={<UserOutlined />}
              />

              <Input
                size="large"
                placeholder="Password"
                prefix={<UnlockOutlined />}
              />

              <Checkbox>Recuerdame</Checkbox>

              <div>
                <Button type="primary">Login</Button>
              </div>
            </form>
          </div>

          <div className="p-3">
            <h2 className="text-center">or login with</h2>

            <SocialMedia />
          </div>

          <div className="mt-5 text-center">
            <a href="#">
              <h2>Crea tu cuenta</h2>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
