import QueryTypes, { Sequelize, TableHints, where } from "sequelize";
import {Op} from "sequelize";


const sequelize  = new Sequelize('companydb', 'root', 'password', {
    host: 'localhost',
    dialect: 'mariadb'
})

const Cliente = sequelize.define('clientes', {
    idcliente: {type: Sequelize.SMALLINT, primaryKey:true, autoIncrement:true},
    nombre: Sequelize.STRING,
    apellido: Sequelize.STRING,
    email: Sequelize.STRING,
    telefono: Sequelize.STRING,
    domicilio: Sequelize.STRING,
},
{
  timestamps:false
})

//render

export const getClientespage = (req, res)=>{
return res.render('clientes')
}

export const getNuevoCliente = (req, res)=>{
  return res.render('nuevoCliente')
}

export const getUpdateCliente = (req, res)=>{
  return res.render('modCliente')
}



//API
export const updateClientes = async(req, res)=>{
    const id = req.params.id;
    await Cliente.findByPk(id, {attributes: ['idcliente']})
    .then(cliente =>{
      const respuesta = cliente;
      if(respuesta === null) {return res.status(404).send('No se encontro el Id')}
      else{
        Cliente.update(
        {nombre: req.body.nombre,
        apellido: req.body.apellido,
        domicilio: req.body.domicilio,   
        email: req.body.email,
        telefono: req.body.telefono

    },
    { where: {idcliente: req.params.id}}
        )
        return res.send("registro actualizado correctamente")
      }
    })
  }

export const deleteCliente = async(req, res)=>{
  
    await Cliente.destroy({
      where:{idcliente:req.params.id}
    }).then(cliente => {
      console.log(cliente)
      
      if(cliente < 1) return res.status(404).json({message: 'Cliente no encontrado'})
        return res.status(200).json({message:`eliminando cliente con id ${req.params.id}`})
    })
  
  }
  
 export const postCliente = async(req,res)=>{
    await Cliente.create({
     nombre: req.body.nombre,
     apellido: req.body.apellido,
     email: req.body.email,
     domicilio: req.body.domicilio,
     telefono: req.body.telefono
   }).then(cliente => {
     console.log(cliente)
     return res.json(`Cliente agregado con id: ${cliente.idcliente}`)
    })
   } 

export const getClienteByName = async(req, res)=> {
    const nombreCliente = req.params.nombre;
  
    await Cliente.findAll(
      {
      attributes: ['idcliente','nombre', 'apellido', 'email', 'domicilio', 'telefono'],
      where: {
        nombre:{[Op.substring]:`%${nombreCliente}%`} 
        
      } 
    }).then(clientes =>{
        //faltan validaciones
        return res.json(clientes);
      }).catch(err =>{
        console.log(err)
      })
  }

export const getClienteById = async(req, res) => {
    const id = req.params.id;
    
    await Cliente.findByPk(id, {attributes: ['idcliente','nombre', 'apellido', 'email', 'domicilio', 'telefono']})
    .then(cliente => {
        const respuesta = cliente;
        if(respuesta === null) return res.status(404).send('No se encontro el Id');
        else return res.json(respuesta);
       
    })
    .catch(err =>{
        console.error(err)
    })
    }    
export const getClientes = async(req,res)=>{
    await Cliente.findAll({ attributes: ['idcliente','nombre', 'apellido', 'email', 'domicilio', 'telefono'] })
     .then(clientes => {
        res.json(clientes)
     })
     .catch(err => {
       console.log(err)
     })
   
   }