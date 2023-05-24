import React from 'react'
import { Form, useNavigate, useLoaderData, redirect, useActionData } from 'react-router-dom';
import { obtenerCliente, actualizarCliente } from '../data/clientes';
import Formulario from '../components/Formulario';
import Error from '../components/Error';

export const loader = async({ params})=>{
const cliente = await obtenerCliente(params.clienteId)
if (Object.values(cliente).length === 0) {
    throw new Response("",{
        status:404,
        statusText:"El cliente no fue encontrado"
    })
}

return cliente
}
export const action = async({ request, params})=>{
    const formData= await request.formData()
    const datos = Object.fromEntries(formData)
    const email = formData.get("email")
    const errores= []
    if (Object.values(datos).includes("")) {
     errores.push("Todos los campos son obligatorios")
    }
   
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
   
    if (!regex.test(email)) {
     errores.push("El email no es valido")
     
    }
   
    if (Object.keys(errores).length) {
     return errores
    }
    //Actualizar cliente
    await actualizarCliente(params.clienteId, datos)
   return redirect("/")
}

const EditarCliente = () => {
    const navigate= useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()
  return (
    <>
    <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
    <p className="mt-3">A continuación podrás modificar los datos de un cliente</p>
    <div className="flex justify-end">
      <button
        onClick={() => navigate("/")}
        className=" bg-blue-800 text-white px-3 py-1 font-bold uppercase"
      >
        Volver
      </button>
    </div>
    <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10">
      {errores?.length && errores.map((error, i)=> <Error key={i}>{error}</Error>)}
      <Form method="post" noValidate>
        <Formulario cliente={cliente}/>
        <input
          type="submit"
          className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
        />
      </Form>
    </div>
  </>
  )
}

export default EditarCliente