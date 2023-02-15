// Constante para manipular el div "contenedor".
const aplicacion = document.querySelector("#contenedor");
// Constante para manipular el formulario del documento.
const formulario = document.querySelector("#formulario");
// Constante para manipular los "input" del formulario.
const inputs = document.getElementsByTagName("input");
// Constante con la URL de la API.
const API_URL = "https://jsonplaceholder.typicode.com";
// Obtiene los parámetros posteriores al carácter "?" en la URL del sitio web.
const getURL = new URLSearchParams(window.location.search);
// Obtiene todos los parámetros.
const end = getURL.get("end");
const metodo = getURL.get("metodo");
const id = getURL.get("id");

// Crea nodos "pre" y "p" vacíos.
const pre = document.createElement("pre");
const p = document.createElement("p");
// Añade al nodo p un texto informativo.
p.appendChild(document.createTextNode("Recurso actualizado éxitosamente. Los datos enviados son:"));

// Variable para recorrer todos los "inputs" del formulario mediante getElementByTagName().
let i = 0;

// Método utilizado para recibir los datos del recurso seleccionado y mostrarlos en el formulario.
fetch(`${API_URL}/${end}/${id}`)
    .then((respusta) => respusta.json())
    .then((datos) => {
        for (let prop in datos) {
            // Si la llave actual es "id", se salta.
            if (i != inputs.length) {
                if (prop == "id") {
                    continue
                }
                //Escribe el valor de la llave en el formulario y avanza al siguiente control.
                inputs[i].value = datos[prop]
                i++
            }
        }
        // Escribe el valor de la llave "body" en la etiqueta "textarea."
        if (document.body.contains(document.getElementsByTagName("textarea")[0])) {
            document.getElementsByTagName("textarea")[0].value = datos.body
        }
        // Marca el radiobutton 1 y 2 como verdadero y falso.
        if (inputs[2].value == "true") {
            document.getElementById("completed_t").value = true;
            document.getElementById("completed_t").checked = true;
            document.getElementById("completed_f").value = false;
            document.getElementById("completed_f").checked = false;
        // Sino, marca el radiobutton 1 y 2 como falso y verdadero.
        } else {
            document.getElementById("completed_t").value = true;
            document.getElementById("completed_t").checked = false;
            document.getElementById("completed_f").value = false;
            document.getElementById("completed_f").checked = true;
        }
    })
    .catch((error) => console.log(error));

// Función para tomar los datos del formulario HTML y convertirlos en un JSON.
const actualizar = (event) => {
    // Acción predeterminada del evento.
    event.preventDefault();
    // Constante de un objeto FormData.
    const datos = new FormData(event.target);
    //El método Object.fromEntries() transforma una lista de pares con [clave-valor] en un objeto.
    const datosCompletos = Object.fromEntries(datos.entries());

    // Constantes con las opciones de envío a la API.
    const opciones = {
        // Método.
        method: "PUT",
        // Propiedades.
        body: JSON.stringify(datosCompletos),
        // Cabecera.
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    }
    // Método que envia a la URL de la API las opciones declaradas antes.
    fetch(`${API_URL}/${end}/${id}`, opciones)
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
formulario.addEventListener("submit", actualizar);