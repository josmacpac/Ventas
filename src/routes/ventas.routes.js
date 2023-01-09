import { Router } from "express";
import express from "express";
import {getNewSale} from "../controllers/ventas.controllers.js";


const router = Router();
router.use(express.text());
router.use(express.json())
router.use(express.urlencoded({extended:false}))


//pagina de nueva venta

router.get('/newSale', getNewSale)


export default router