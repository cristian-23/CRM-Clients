import React from "react";
import { Form, useNavigate, redirect } from "react-router-dom";
import { eliminarCliente } from "../data/clientes";

export const action = async ({ params })=>{
 await eliminarCliente(params.clienteId)
return redirect("/")
}


const Cliente = ({ cliente }) => {
  const {nombre, empresa, email, telefono, id}= cliente
  const navigate = useNavigate()
  return (
    <tr className="border-b">
      <td className="p-6 space-y-2">
        <p className="text-2xl text-gray-800">{nombre}</p>
        <p>{empresa}</p>
      </td>
      <td className="p-6">
        <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Email: </span> {email}</p>
        <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Tel: </span> {telefono}</p>
        
      </td>
      <td className="p-6 flex gap-3 ">
        <button onClick={()=> navigate(`/clientes/${id}/editar`)} className="text-blue-600 hover:text-blue-900 uppercase font-bold text-xs" type="button">Editar</button>

        <Form 
        method="POST" 
        action={`/clientes/${id}/eliminar`}
        onSubmit={(e)=>{
          if (!confirm("¿Deseas eliminar este registro ? ")) {
            e.preventDefault()
          }
        }}>
          <button 
          className="text-red-600 hover:text-red-900 uppercase font-bold text-xs" 
          type="submit">Eliminar</button>
        </Form>
        
      </td>
    </tr>
  );
};

export default Cliente;
