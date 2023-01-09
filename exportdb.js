import express from "express";
import mysql from "mysql";
import fastcsv from 'fast-csv';
import fs  from 'fs';






const app = express();

//const fs= require("fs");

const ws= fs.createWriteStream("itbuddies.csv");

//Create connection

const connection=mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password: 'password',
    port: 3306,
    database: 'companydb'


});

//api

app.get("/exportcsv", (req,res)=>{
    connection.query("SELECT * FROM clientes", function(err,data){
        if(err)throw err;   

//json

const jsonData = JSON.parse(JSON.stringify(data))
console.log("jsonData", jsonData);

//csv 
fastcsv.write(jsonData, {headers: true})
.on("finish", function(){
    console.log("Write to successfully!");
})
.pipe(ws);
    });
});

//PORT

app.listen(3050, function(){
    console.log("Node is runnig");
})