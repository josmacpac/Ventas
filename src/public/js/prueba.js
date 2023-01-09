

const btnAgregar = document.getElementById("btnAgregar"),
  inpFindArticulos = document.getElementById("inputArticulos"),
  msjArticulo = document.getElementById("msjArticulo"),
  tabla = document.getElementById("listadoProductos"),
  btnFindArt = document.getElementById("btnFindArt"),
  cart = document.getElementById("cart"),
  totalCarrito = document.getElementById("totalCarrito"),
  btnDeleteCart = document.getElementById('btnDeleteCart')


let inputQuantity
let productos = [];




const buscarArticulos = async function () {
  tabla.innerHTML = ""
  const dato = inpFindArticulos.value
  const expNumeros = /^[0-9]+$/;
  msjArticulo.innerHTML = "";

  if (dato.match(expNumeros)) {
    let request = fetch(`http://localhost:3000/productos/api/id/${dato}`)
    let respuesta = await request;
    if (respuesta.status == 200 && respuesta.ok == true) {
      datos = await respuesta.json()
      tabla.innerHTML += `<tr>
            <th><input id="${datos.id_articulo}" class="checkbox" name="checkbox" value="" data-id=${datos.id_articulo} type= "checkbox"></th>
        <td>${datos.id_articulo}</td>
        <td>${datos.nombre}</td>
        <td>${datos.venta}</td>
        </tr>`
    } else {
      msjArticulo.innerHTML += "<p>No existe el Id, intente nuevamente...</p>"
    }

  } else {
    let request = fetch(`http://localhost:3000/productos/api/name/${dato}`)
    let respuesta = await request;
    if (respuesta.status == 200 && respuesta.ok == true) {
      datos = await respuesta.json()
      datos.forEach(element => {
        tabla.innerHTML += `<tr>
    <th><input id="${element.id_articulo}" class="checkbox" name="checkbox" value="" data-id=${element.id_articulo} type= "checkbox"></th>
    <td>${element.id_articulo}</td>
    <td>${element.nombre}</td>
    <td>${element.venta}</td>
    </tr>`

      })
    } else {
      msjArticulo.innerHTML += "<p>No se encontraron coincidencias intente nuevamente...</p>"
    }
  }

}

const agregarCarrito = function () {
  let checkbox = document.getElementsByClassName("checkbox")

  const insertProduct = () => {
    Array.from(checkbox).forEach(e => {
      if (e.checked) {

        //comprobar si el id se encuentra en el carrito
        let carrito = JSON.parse(localStorage.carrito)
        let index = carrito.findIndex((prod) => prod.id_articulo == e.id)
        if (index != -1) {

          //si el id ya se encuentra en el carrito enviar mensaje de alerta
          // alert(`El id: ${e.id} ya se encuentra en el carrito`)
        } else {
          //Si el id no esta en el carrito, agregarlo

          carrito.push({ id_articulo: e.id, quantity: 1 })
          console.log(carrito)
          //alert(`Articulo con id:${e.id} agregado correctamente...`)

        }
        //guardar array en local storage
        localStorage.setItem('carrito', JSON.stringify(carrito))
      }
    })
  }

  //comprobar si existe un carrito, si no hay, crearlo
  if (localStorage.carrito) {
    //si hay carrito agrgegamos item
    insertProduct()

  } else {
    console.log("crear carrito...")
    localStorage.setItem("carrito", JSON.stringify([]))
    insertProduct()
  }

  pintarCarrito()
    .then(res => console.log(res))
    .catch(err => console.log(err))

}

async function actualizarCarrito(){
  let carrito = JSON.parse(localStorage.carrito);
  Array.from(carrito).forEach(
    e=>{
      console.log(e.id_articulo)
    }
  )
}

async function pintarCarrito() {

  actualizarCarrito()

  cart.innerHTML = ""
  totalCarrito.innerHTML = ""

  let carrito = JSON.parse(localStorage.carrito);


  let resolvedPromises = [] // array de promesas
  productos = [];
  for (const product of carrito) { // recorremos el carrito
    resolvedPromises = resolvedPromises.concat(new Promise((resolve, reject) => { // creamos el array de promesas


      fetch(`http://localhost:3000/productos/api/id/${product.id_articulo}`)
        .then(response => response.json())
        .then(data => {
          //console.log(data)
          cart.innerHTML += `<li class="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                      <h6 class="my-0">${data.nombre} </h6>
                  </div>
                  <span class="text-muted">$ ${data.venta}</span>
                  <input class="inputQuantity" data-id="${data.id_articulo}" type="number" style="width:60px" min=0 max=100 value="${product.quantity}">
              </li>
              `
          productos.push({
            id_articulo: data.id_articulo,
            nombre: data.nombre,
            venta: Number(data.venta),
            cantidad: product.quantity
          })
          resolve(data) // si la promesa tiene exito devuelve toda la data
        })
        .catch(err => reject(err)) //de lo contrrio devuelve error
    })
    )

   
  }
  resolvedPromises = await Promise.all(resolvedPromises); // obtenemos los resultados del array de promesas  
  
  //console.log(productos)
  //CALCULAR TOTAL DEL CARRITO
  const total = (productos.reduce((acc, curr) => acc += (curr.venta * curr.cantidad), 0)).toFixed(2)

  totalCarrito.innerHTML += `<h4>$ ${(total)}</h4>`

  //AGREGAR EVENT LISTENER A LOS INPUTS
  inputQuantity = document.querySelectorAll('.inputQuantity');
  inputQuantity.forEach((input)=>{
    //escuchar click
    input.addEventListener("change", (e)=>{

      modCantidades(e.target.dataset.id, e.target.value)
      
    })
  })

  
}

const modCantidades = (id,value)=>{
  let carrito = JSON.parse(localStorage.carrito)
  let index = carrito.findIndex((prod) => prod.id_articulo == id)
  
  carrito[index].quantity = value
  console.log(carrito[index])

  localStorage.setItem('carrito', JSON.stringify(carrito))

  //actualizar total
  
  
}

const deleteCart = function () {
  alert('Eliminando orden')
  localStorage.removeItem('carrito')
  totalCarrito.innerHTML = `<h4>$ 0.00</h4>`
  cart.innerHTML = ""

}




//modificar cantidades en carrito y localStorage


// si un producto no existe en la base de datos eliminar del carrito en local storage

//boton de finalizar venta

//al presionar boton "finalizar venta" realizar peticion post y generar orden de venta


pintarCarrito()
actualizarCarrito()

//Event Listeners
btnFindArt.addEventListener("click", buscarArticulos)
btnAgregar.addEventListener("click", agregarCarrito)
btnDeleteCart.addEventListener("click", deleteCart)




