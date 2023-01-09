import readline from 'readline'
import fs from 'fs'
import { Sequelize } from 'sequelize'


const sequelize = new Sequelize('companydb', 'root', 'password',  {
host: 'localhost',
    dialect: 'mariadb'
})

try {
    await sequelize.authenticate();
    console.log('connection established!');
} catch (error) {
    console.error('Unable to connect', error);
    
}

//establecer conexion a base de datos 
const insertUsers = async()=>{
    await sequelize.authenticate();

    //leer archivo csv
const file = readline.createInterface(fs.createReadStream('clientes.csv'))


file.on("line", async(line)=>{
    await sequelize.query({
        query: 'INSERT INTO clientes(nombre, apellido, email, telefono, domicilio) VALUES(? ,?, ?, ?, ? )',
        values: line.split(',')
    })
})
}

insertUsers();