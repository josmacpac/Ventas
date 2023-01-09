import { Router } from "express";
import express from "express";
import { getProductosPage, getUpdateProducto, getNuevoProducto, deleteProducto, getProductoById, getProductoByName, getProductos, postProducto, updateProductos} from "../controllers/productos.controllers.js";


const router = Router()
router.use(express.text());
router.use(express.json())
router.use(express.urlencoded({extended:false}))

/*Handlebars*/

router.get('/productos', getProductosPage)
router.get('/productos/nuevo', getNuevoProducto)
router.get('/productos/update/?', getUpdateProducto)




/* API */

//mostrar todos los producto registrados
router.get('/productos/api/all', getProductos)

//buscar producto por id
router.get('/productos/api/id/:id', getProductoById)

//buscar producto por nombre, o apellido
router.get('/productos/api/name/:nombre', getProductoByName)


//agregar un producto
router.post('/productos/api/nuevoproducto', postProducto)


//eliminar un producto 
router.delete('/productos/api/:id', deleteProducto)


//Actualizar un producto
router.patch('/productos/api/:id', updateProductos)





export default router