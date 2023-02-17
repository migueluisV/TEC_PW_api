// Constante para manipular el div "contenedor".
const aplicacion = document.querySelector("#contenedor");
// Constante con la URL de la API.
const API_URL = "https://jsonplaceholder.typicode.com";
// Obtiene los parámetros posteriores al carácter "?" en la URL del sitio web.
const getURL = new URLSearchParams(window.location.search);
// Obtiene los parámetros "id" y metodo".
const end = getURL.get("end");
const metodo = getURL.get("metodo");
// Crea la ruta de la API para obtener sus recursos.
let ruta = `${API_URL}/${end}`;
// Termina de definir la ruta si existe el parámetro "id".
ruta += getURL.has("id") ? `/${getURL.get("id")}` : "";

// Crea nodos "pre" y "h3" vacíos.
const pre = document.createElement("pre");
const h3 = document.createElement("h3");
// Añade al nodo h3 un texto informativo.
h3.appendChild(document.createTextNode(`Los recursos del Endpoint "${end}" son:`));
// Añade al DOM el nodo h3.
aplicacion.appendChild(h3);

// Método que obtiene los resultados del Endpoint.

fetch(ruta)
    .then((respuesta) => { return respuesta.json() })
    .then((datos) => {
       // Convierte a texto los resultados y lo añade al nodo pre.
       pre.textContent = JSON.stringify(datos, undefined, 2)
        //Añade al DOM el nodo pre
       aplicacion.appendChild(pre)
       aplicacion.forEach((datos) => {
     
    });
   })
   .catch((error) => console.log(error));


         
