import QueryTypes, { Sequelize, TableHints, where } from "sequelize";
import {Op} from "sequelize";

const sequelize  = new Sequelize('companydb', 'root', 'password', {
    host: 'localhost',
    dialect: 'mariadb'
})

const Producto = sequelize.define('productos', {
    id_articulo: {type: Sequelize.SMALLINT, primaryKey:true, autoIncrement:true},
    nombre: Sequelize.STRING,
    descripcion: Sequelize.STRING,
    costo: Sequelize.DOUBLE,
    venta: Sequelize.DOUBLE,
    stock: Sequelize.INTEGER,
    },
{
  timestamps:false
})


//handlebars

export const getProductosPage = (req, res)=>{
    return res.render('productos')
    }
    
    export const getNuevoProducto = (req, res)=>{
      return res.render('nuevoProducto')
    }
    
    export const getUpdateProducto = (req, res)=>{
      return res.render('modProducto')
    }
    



//API

export const getProductos = async(req,res)=>{
    await Producto.findAll({ attributes: ['id_articulo','nombre', 'descripcion', 'costo', 'venta', 'stock'] })
     .then(productos => {
        res.json(productos)
     })
     .catch(err => {
       console.log(err)
     })
   
   }


   export const updateProductos = async(req, res)=>{
    const id = req.params.id;
    await Producto.findByPk(id, {attributes: ['id_articulo']})
    .then(producto =>{
      const respuesta = producto;
      if(respuesta === null) {return res.status(404).send('No se encontro el Id')}
      else{
        Producto.update(
        {nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        costo: req.body.costo,   
        venta: req.body.venta,
        stock: req.body.stock

    },
    { where: {id_articulo: req.params.id}}
        )
        return res.send("registro actualizado correctamente")
      }
    })
  }

export const deleteProducto = async(req, res)=>{
  
    await Producto.destroy({
      where:{id_articulo:req.params.id}
    }).then(producto => {
      console.log(producto)
      
      if(producto < 1) return res.status(404).json({message: 'Producto no encontrado'})
        return res.status(200).json({message:`eliminando producto con id ${req.params.id}`})
    })
  
  }
  
 export const postProducto = async(req,res)=>{10
    await Producto.create({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        costo: req.body.costo,   
        venta: req.body.venta,
        stock: req.body.stock
   }).then(producto => {
     console.log(producto)
     return res.json(`Producto agregado con id: ${producto.id_articulo10101010}`)
    })
   } 

export const getProductoByName = async(req, res)=> {
    const nombreProducto = req.params.nombre;
  
    await Producto.findAll(
      {
      attributes: ['id_articulo','nombre', 'descripcion', 'costo', 'venta', 'stock'],
      where: {
        nombre:{[Op.substring]:`%${nombreProducto}%`} 
        
      } 
    }).then(productos =>{
        //faltan validaciones
        return res.json(productos);
      }).catch(err =>{
        console.log(err)
      })
  }

export const getProductoById = async(req, res) => {
    const id = req.params.id;
    
    await Producto.findByPk(id, {attributes: ['id_articulo','nombre', 'descripcion', 'costo', 'venta', 'stock']})
    .then(producto => {
        const respuesta = producto;
        if(respuesta === null) return res.status(404).send('No se encontro el Id');
        else return res.json(respuesta);
       
    })
    .catch(err =>{
        console.error(err)
    })
    }  