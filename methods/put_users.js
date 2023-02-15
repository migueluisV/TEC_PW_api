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
            if (prop == "id") {
                continue
            }
            // Si la llave actual es "address", se recorre las propiedades del objeto anidado "address".
            if (prop == "address") {
                for (let prop_a in datos.address) {
                    // Si la llave actual es "geo", se recorre las propiedades del objeto anidado "geo".
                if (prop_a == "geo") {
                        for (let prop_g in datos.address.geo) {
                            inputs[i].value = datos.address.geo[prop_g]
                            i++
                        }
                    } else {
                        inputs[i].value = datos.address[prop_a]
                        i++
                    }
                }
            // Si la llave actual es "company", se recorre las propiedades del objeto anidado "company".
            } else if (prop == "company") {
                for (let prop_c in datos.company) {
                    inputs[i].value = datos.company[prop_c]
                    i++
                }
            } else {
                //Escribe el valor de la llave en el formulario y avanza al siguiente control.
                inputs[i].value = datos[prop]
                i++
            }
        }
    })
    .catch((error) => console.log(error));

    // Función para tomar los datos del formulario HTML y convertirlos en un JSON.
    const actualizar = (event) => {
        // Acción predeterminada del evento.
        event.preventDefault();
        // Constante de un objeto FormData.
        const valores = new FormData(event.target);

        // Crea colección de datos llave-valor Map para el objeto anidado "geo", mediante datos del formulario.
        const geo = new Map();
        geo.set("lat", valores.get("lat"));
        geo.set("lng", valores.get("lng"));

        // Crea colección de datos llave-valor Map para el objeto anidado "address", mediante datos del formulario.
        const address = new Map();
        address.set("street", valores.get("street"));
        address.set("suite", valores.get("suite"));
        address.set("city", valores.get("city"));
        address.set("zipcode", valores.get("zipcode"));
        // Agrega el mapa "geo" creado antes como una cadena de texto.
        address.set("geo", Object.fromEntries(geo));

        // Crea colección de datos llave-valor Map para el objeto anidado "company", mediante datos del formulario.
        const company = new Map();
        company.set("name", valores.get("company_name"));
        company.set("catchPhrase", valores.get("catchPhrase"));
        company.set("bs", valores.get("bs"));

        // Crea colección de datos llave-valor Map para el resto del JSON, mediante datos del formulario.
        const datos = new Map();
        datos.set("name", valores.get("name"));
        datos.set("username", valores.get("username"));
        datos.set("email", valores.get("email"));
        // Agrega el mapa "address" creado antes como una cadena de texto.
        datos.set("address", Object.fromEntries(address));
        datos.set("phone", valores.get("phone"));
        datos.set("website", valores.get("website"));
        // Agrega el mapa "company" creado antes como una cadena de texto.
        datos.set("company", Object.fromEntries(company));

        // Convierte el mapa "datos" a una cadena de texto
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
    // Agrega evento "submit" al formulario con la función declarada antes.
    formulario.addEventListener("submit", actualizar);