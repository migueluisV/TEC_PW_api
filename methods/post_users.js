// Constante para manipular el div "contenedor".
const aplicacion = document.querySelector("#contenedor");
// Constante para manipular el formulario del documento.
const formulario = document.querySelector("#formulario");
// Constante con la URL de la API.
const API_URL = "https://jsonplaceholder.typicode.com";

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
    const valores = new FormData(event.target);

    /**
        El objeto "users" posee más objetos dentro de sí mismo (JSON anidados), el método "fromEntries()"
        no es capaz de construir el JSON anidado correctamente, por lo que se utilizan las estructuras de datos
        Map, la cual funciona mediante entradas de llaves y sus valores exclusivos, lo que serían las propiedades 
        los valores del objeto JSON.

        El objeto anidado "geo", "address" y "company" son transformados a mapas con su respectivo nombre, 
        mientras que el resto de datos del objeto son agregados a un mapa extra nombrado "datos", a este 
        mapa, se le agregan los otros mapas anidados, construyendo mediante esta estructura el objeto JSON 
        completo, para finalmente convertirlo a una cadena con el método "fromEntries()".
    */

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
    const datosCompletos = Object.fromEntries(datos);

    // Constantes con las opciones de envío a la API.
    const opciones = {
        // Método.
        method: "POST",
        // Propiedades: convierte la cadena-mapa a JSON.
        body: JSON.stringify(datosCompletos),
        // Cabecera.
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    }
    // Método que envia a la URL de la API las opciones declaradas antes.
    fetch(`${API_URL}/users`, opciones)
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
formulario.addEventListener("submit", procesarTodo);

