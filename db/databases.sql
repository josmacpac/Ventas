CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

CREATE TABLE clientes(
    idcliente INT PRIMARY KEY NOT NULL,
    nombre varchar(50) NOT NULL,
    apellido varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    telefono varchar(20)
);


CREATE TABLE productos(
    id_articulo INT PRIMARY KEY NOT NULL,
    nombre varchar(30) NOT NULL,
    descripcion varchar(50) NULL,
    costo decimal(5,2) NOT NULL,
    venta decimal(6,2) NOT NULL,
    stock INT NOT NULL,
    imagen varchar(20) NULL
);

CREATE TABLE ventas(
    id_venta INT PRIMARY KEY NOT NULL,
    idcliente INT NOT NULL,
    fecha datetime NOT NULL,
    total decimal(6,2) NOT NULL
);


CREATE TABLE detalle_venta(
    id_detalle INT PRIMARY KEY NOT NULL,
    id_venta INT NOT NULL,
    id_articulo INT NOT NULL,
    cantidad INT NOT NULL,
    precio_venta decimal(6,2) NOT NULL
);

CREATE TABLE usuario(
    id_usuario INT PRIMARY KEY NOT NULL,
    nombre varchar(50) NOT NULL,
    apellido varchar(50) NOT NULL,
    email varchar(30) NOT NULL,
    telefono varchar(20),
    constrasena varchar(20)
);


ALTER TABLE clientes MODIFY idcliente INT NOT NULL AUTO_INCREMENT;
ALTER TABLE productos MODIFY id_articulo INT NOT NULL AUTO_INCREMENT;
ALTER TABLE ventas MODIFY id_venta INT NOT NULL AUTO_INCREMENT;
ALTER TABLE detalle_venta MODIFY id_detalle INT NOT NULL AUTO_INCREMENT;


ALTER TABLE ventas ADD CONSTRAINT fk_idcliente FOREIGN KEY (idcliente) REFERENCES clientes (idcliente);

ALTER TABLE detalle_venta ADD CONSTRAINT fk_venta FOREIGN KEY (id_venta) REFERENCES ventas (id_venta);
ALTER TABLE detalle_venta ADD CONSTRAINT fk_articulo FOREIGN KEY (id_articulo) REFERENCES productos (id_articulo);