import { useEffect, useState } from "react";
import "./App.css";
import getEstadosSucursales from "./services/getSucursalesEstados";
import MaterialReactTable from 'material-react-table';



function App() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const getFetch = () => {
    console.log("dentro de getFetch");
    getEstadosSucursales().then(values => {
      console.log(values)
      setColumns(values.columnsTitles[0]), 
      setData(values.datas[0])
    })   
  };
  useEffect(() => {
    console.log("efecto ejecutado");
    getFetch();
    console.log("title:", columns);
    console.log("data:", data);
  }, []);

  return (
    <>
      <div className="App">
        <h1>Practicando useState y UseEffect</h1>

      </div>
      <MaterialReactTable columns={columns} data={data} />
    </>
  );
}

export default App;
