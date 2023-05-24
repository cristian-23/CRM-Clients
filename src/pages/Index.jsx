import React from "react";
import Cliente from "../components/Cliente";
import { useLoaderData } from "react-router-dom";
import { obtenerClientes } from "../data/clientes";

export const loader = () => {
  const clientes = obtenerClientes()
  return clientes;
};

const Index = () => {
  const clientes = useLoaderData();
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900"> CLIENTES</h1>
      <p className="mt-3">Administra Tus Clientes</p>
      {clientes.length ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Clientes</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((cliente) => (
              <Cliente cliente={cliente} key={cliente.id}/>
            ))}
          </tbody>
        </table>

      ) : (
        <p className="text-center mt-10">No hay clientes aun</p>
      )}
    </>
  );
};

export default Index;
