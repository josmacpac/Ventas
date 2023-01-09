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




export const getNewSale = (req,res)=>{
  return res.render('nuevaVenta')
  
}