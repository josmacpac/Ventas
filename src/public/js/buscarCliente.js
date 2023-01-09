
const inpFindClient = document.getElementById("inpFindClient"),
  btnFindClient = document.getElementById("btnFindClient"),
  ulDatos = document.getElementById("datosCliente")
  
let datos;
let datosCompra = {
  idCliente: "",
  nombre: "",
  apellido: "",
  articulos: {
    id: ""
  }

}
//cargar en HTML datos de cliente desde Local Storage
const imprimirDatos = function () {
  ulDatos.innerHTML += ` <p>Cliente:${datos.idcliente} ${datos.nombre} ${datos.apellido}</p>`

}
//cambios
const guardar_LocalStorage = function () {
  datosCompra['idCliente'] = datos.idcliente;
  datosCompra['nombre'] = datos.nombre;
  datosCompra['apellido'] = datos.apellido;

  console.log(datosCompra)

  localStorage.setItem("datosCompra", JSON.stringify(datosCompra))
}

const buscarClientePorId = async function getClientById(dato) {
  let request = fetch(`http://localhost:3000/clientes/api/id/${dato}`)

  let respuesta = await request;

  if (respuesta.status == 200 && respuesta.ok == true) {
    datos = await respuesta.json()
    imprimirDatos(datos)
    guardar_LocalStorage(datos)
  } else {
    ulDatos.innerHTML += "<p>No existe el Id, intente nuevamente...</p>"
  }

}


const buscar = function (e) {

  e.preventDefault();
  const dato = inpFindClient.value
  const expNumeros = /^[0-9]+$/;
  console.log(dato)
  ulDatos.innerHTML = "";

  if (dato.match(expNumeros)) {
    buscarClientePorId(dato)
  } else {
    alert("No es un dato valido, ingrese ID cliente")
  }

}


btnFindClient.addEventListener("click", buscar);

