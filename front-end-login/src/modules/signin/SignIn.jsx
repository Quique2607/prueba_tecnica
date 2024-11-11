import { UserOutlined, UnlockOutlined } from "@ant-design/icons";
import { Input, Checkbox, Button } from "antd";
import SocialMedia from "./components/SocialMedia";
import sign_in from "/sign_in.svg";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router";

const SignIn = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error);
      } else {
        alert(result.message);
        setTimeout(()=>{
            navigate("/")
        },1000)
      }
    } catch (error) {
      console.log("Fallo en el servidor", error.message);
    }
  };

  console.log(errors);
  return (
    <>
      <div className="h-[100vh] flex items-center">
        <div className="grid grid-cols-1  md:grid-cols-2 items-center my-auto p-5 md:p-[60px] w-full gap-3 md:gap-10">
          <div className=" h-[250px] md:h-[600px] flex items-center justify-center">
            <img
              src={sign_in}
              alt="sign_in"
              className="object-contain h-full p-2"
            />
          </div>

          <div className="  h-full md:h-[600px] flex flex-col justify-center border-[2px] border-dashed border-black rounded-2xl ">
            <h1 className="text-5xl font-extrabold p-3">Sign in</h1>

            <div className="mt-5">
              <form
                className="p-3 flex flex-col gap-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Controller
                  name="correo"
                  control={control}
                  rules={{ required: "Este campo es requerido" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      size="large"
                      placeholder="Nombre Usuario"
                      prefix={<UserOutlined />}
                    />
                  )}
                />
                {errors.correo && (
                  <span className="text-red-500">{errors.correo.message}</span>
                )}

                <Controller
                  name="contrasena"
                  control={control}
                  rules={{ required: "Este campo es obligatorio" }}
                  render={({ field }) => (
                    <Input.Password
                      {...field}
                      size="large"
                      placeholder="Password"
                      prefix={<UnlockOutlined />}
                    />
                  )}
                />

                <Checkbox>Recuerdame</Checkbox>

                <div>
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                </div>
              </form>
            </div>

            <div className="p-3">
              <h2 className="text-center">or login with</h2>

              <SocialMedia />
            </div>

            <div className="mt-5 text-center">
              <Link to={"/signUp"}>
                <h2>Crea tu cuenta</h2>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
