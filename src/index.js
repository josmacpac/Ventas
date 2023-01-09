import express from "express";
import { engine } from "express-handlebars";
import clientesRoutes from './routes/clientes.routes.js'
import mime from 'mime';
import path from 'path';
import productosRoutes from './routes/productos.routes.js'
import ventasRoutes from './routes/ventas.routes.js'
import { dirname } from "path";
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


const setHeadersOnStatic = (res, path, stat) => {
    const type = mime.getType(path);
    res.set('content-type', type);
  }
  
  const staticOptions = {
    setHeaders: setHeadersOnStatic
  }
const app = express()

//configuracion Handlebars
app.use(express.static(path.join(__dirname, 'public'), staticOptions));
app.engine('handlebars', engine())
app.set('view engine' , 'handlebars')
app.set('views', './src/views')

app.get('/', (req, res)=>{
    res.render('home')
})



////

app.use(clientesRoutes);
app.use(productosRoutes);
app.use(ventasRoutes);


app.listen(3000)

console.log("Holis..Server running on port 3000") 