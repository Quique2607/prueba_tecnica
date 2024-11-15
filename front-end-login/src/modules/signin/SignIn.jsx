import { UserOutlined, UnlockOutlined } from "@ant-design/icons";
import { Input, Checkbox, Button } from "antd";
import SocialMedia from "./components/SocialMedia";
import login from "/login.png";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router";
import { useAuth } from "../../context/AuthContext";

const SignIn = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { setIsAuthenticated } = useAuth();

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await res.json();

      if(res.ok && result.success){
         setIsAuthenticated(true);
         navigate("/")
      }else{
        alert(result.error || "Error al iniciar sesión");
      }
    } catch (error) {
      console.log("Fallo en el servidor", error.message);
      alert("Hubo un problema al iniciar sesión");
    }
  };
  return (
    <>
      <div className="h-[100vh] flex items-center justify-center">
        <div className="grid grid-cols-1  md:grid-cols-2 items-center my-auto p-5 md:p-[60px] gap-3 md:gap-10">
          <div className=" h-[250px] md:h-[600px] flex items-center justify-center">
            <img
              src={login}
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
                <h2 className="text-gray-500 font-bold">Crea tu cuenta</h2>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
