import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import register from "/register.png";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
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
        navigate("/signIn")
      }
    } catch (error) {
      console.log(error.message);
      alert("Hubo un error al conectar con el servidor");
    }
  };

  return (
    <>
      <div className="h-[100vh] flex items-center p-10">
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5 items-center  h-full md:mx-[60px]">
          <div className="flex justify-end">
            <img src={register} alt="register" className="drop-shadow-xl" />
          </div>
          <form
            className="flex flex-col gap-5 border-[2px] border-dashed rounded-3xl p-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-4xl font-bold">Registrate</h1>
            <div className="flex gap-3">
              {/* Username */}
              <div className="w-full">
                <Controller
                  name="usuario"
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
                {errors.usuario && (
                  <span className="text-red-500">{errors.usuario.message}</span>
                )}
              </div>

              {/* Email */}
              <div className="w-full">
                <Controller
                  name="correo"
                  control={control}
                  rules={{
                    required: "Este campo es requerido",
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Formato de correo no válido",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      size="large"
                      placeholder="Correo"
                      prefix={<MailOutlined />}
                    />
                  )}
                />
                {errors.correo && (
                  <span className="text-red-500">{errors.correo.message}</span>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              {/* Nombre */}
              <div>
                <Controller
                  name="nombre"
                  control={control}
                  rules={{ required: "Este campo es requerido" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      size="large"
                      placeholder="Nombre"
                      prefix={<UserOutlined />}
                    />
                  )}
                />
                {errors.nombre && (
                  <span className="text-red-500">{errors.nombre.message}</span>
                )}
              </div>

              {/* Apellido Paterno */}
              <div>
                <Controller
                  name="apell_paterno"
                  control={control}
                  rules={{ required: "Este campo es requerido" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      size="large"
                      placeholder="Apellido Paterno"
                      prefix={<UserOutlined />}
                    />
                  )}
                />
                {errors.apell_paterno && (
                  <span className="text-red-500">
                    {errors.apell_paterno.message}
                  </span>
                )}
              </div>

              {/* Apellido Materno */}
              <div>
                <Controller
                  name="apell_materno"
                  control={control}
                  rules={{ required: "Este campo es requerido" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      size="large"
                      placeholder="Apellido Materno"
                      prefix={<UserOutlined />}
                    />
                  )}
                />
                {errors.apell_materno && (
                  <span className="text-red-500">
                    {errors.apell_materno.message}
                  </span>
                )}
              </div>
            </div>

            {/* Contraseña */}
            <Controller
              name="contrasena"
              control={control}
              rules={{
                required: "Este campo es requerido",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  placeholder="Contraseña"
                  prefix={<LockOutlined />}
                />
              )}
            />
            {errors.contrasena && (
              <span className="text-red-500">{errors.contrasena.message}</span>
            )}

            {/* Tipo Usuario */}
            <Controller
              name="tipo_usuario"
              control={control}
              rules={{ required: "Este campo es requerido" }}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  placeholder="Tipo Usuario"
                  prefix={<UserOutlined />}
                />
              )}
            />
            {errors.tipo_usuario && (
              <span className="text-red-500">
                {errors.tipo_usuario.message}
              </span>
            )}

            {/* Botón de envío */}
            <Button type="primary" htmlType="submit" className="mt-5">
              Registrarse
            </Button>
            <div className="mt-5 text-center">
              <Link to={"/signIn"}>
                <h2 className="text-gray-500 font-bold">
                  ¿Ya tienes una cuenta?
                </h2>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
