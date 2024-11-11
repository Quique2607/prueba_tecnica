import bienvenido from "/bienvenidos.png"
import TableComponent from "./components/Table";

const Home = () => {
  return (
    <>
    <div className="p-10">
      <div className="h-[100px] mb-5 flex justify-center p-2">
        <img src={bienvenido} alt="bienvenidos" className="object-contain h-full" />
      
      </div>
      <TableComponent/>
    </div>
    </>
  );
};

export default Home;
