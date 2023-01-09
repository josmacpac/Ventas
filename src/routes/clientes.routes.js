import { Router } from "express";
import express from "express";
import { getClienteByName, updateClientes, getClienteById, getClientes, deleteCliente, postCliente, getClientespage, getNuevoCliente, getUpdateCliente } from "../controllers/clientes.controllers.js";


const router = Router()
router.use(express.text());
router.use(express.json())
router.use(express.urlencoded({extended:false}))

//mostrar pagina principal clientes
router.get('/clientes', getClientespage)
router.get('/clientes/nuevo', getNuevoCliente)
router.get('/clientes/update/?', getUpdateCliente)





/* API */

//mostrar todos los clientes registrados
router.get('/clientes/api/all', getClientes)

//buscar cliente por id
router.get('/clientes/api/id/:id', getClienteById)

//buscar cliente por nombre, o apellido
router.get('/clientes/api/name/:nombre', getClienteByName)


//agregar un cliente
router.post('/clientes/api/nuevocliente', postCliente)


//eliminar un cliente 
router.delete('/clientes/api/:id', deleteCliente)


//Actualizar un cliente
router.patch('/clientes/api/:id', updateClientes)



export default router