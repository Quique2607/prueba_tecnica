import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import { useForm, Controller } from "react-hook-form";

const SignUp = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json()

      if (!res.ok) {
        alert(result.error);
      }else{
        alert(result.message);
      }

    } catch (error) {
        console.log(error.message);
        alert("Hubo un error al conectar con el servidor")
    }
  };

  return (
    <div className="p-5">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
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

        {/* Email */}
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

        {/* Nombre */}
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

        {/* Apellido Paterno */}
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
          <span className="text-red-500">{errors.apell_paterno.message}</span>
        )}

        {/* Apellido Materno */}
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
          <span className="text-red-500">{errors.apell_materno.message}</span>
        )}

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
          <span className="text-red-500">{errors.tipo_usuario.message}</span>
        )}

        {/* Botón de envío */}
        <Button type="primary" htmlType="submit" className="mt-5">
          Registrarse
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
