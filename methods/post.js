// Constante para manipular el div "contenedor".
const aplicacion = document.querySelector("#contenedor");
// Constante para manipular el formulario del documento.
const formulario = document.querySelector("#formulario");
// Constante con la URL de la API.
const API_URL = "https://jsonplaceholder.typicode.com";
// Obtiene los parámetros posteriores al carácter "?" en la URL del sitio web.
const getURL = new URLSearchParams(window.location.search);
// Obtiene los parámetros "id".
const end = getURL.get("end");

// Crea nodos "pre" y "h3" vacíos.
const pre = document.createElement("pre");
const p = document.createElement("p");
// Añade al nodo p un texto informativo.
p.appendChild(document.createTextNode("Recurso creado éxitosamente. Los datos enviados son:"));

// Función para tomar los datos del formulario HTML y convertirlos en un JSON.
const procesarTodo = (event) => {
    // Acción predeterminada del evento.
    event.preventDefault();
    // Constante de un objeto FormData.
    const datos = new FormData(event.target);
    //El método Object.fromEntries() transforma una lista de pares con [clave-valor] en un objeto JSON.
    const datosCompletos = Object.fromEntries(datos.entries());

    // Constantes con las opciones de envío a la API.
    const opciones = {
        // Método.
        method: "POST",
        // Propiedades.
        body: JSON.stringify(datosCompletos),
        // Cabecera.
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    }
    // Método que envia a la URL de la API las opciones declaradas antes.
    fetch(`${API_URL}/${end}`, opciones)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            // Convierte a texto los resultados y lo añade al nodo pre.
            pre.textContent = JSON.stringify(datos, undefined, 2)
            // Añade al DOM el nodo p.
            aplicacion.appendChild(p);
            // Añade al DOM el nodo pre.
            aplicacion.appendChild(pre)
        })
        .catch((error) => console.log(error));
}
// Agrega evento "submit" al formulario.
formulario.addEventListener("submit", procesarTodo);

