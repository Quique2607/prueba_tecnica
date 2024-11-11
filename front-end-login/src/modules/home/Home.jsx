import bienvenido from "/bienvenidos.png";
import TableComponent from "./components/Table";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <>
      <div className="p-10">
        <div>
          <div className=" mb-5 flex justify-between p-2">
            <img
              src={bienvenido}
              alt="bienvenidos"
              className="object-contain h-[50px]"
            />
            {isAuthenticated && (
            <button className=" bg-blue-500 p-2 rounded-xl text-white" onClick={logout}>
              Cerrar sesión
            </button>
          )}
          </div>
          
        </div>
        <TableComponent />
      </div>
    </>
  );
};

export default Home;
