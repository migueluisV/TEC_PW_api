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
const ruta = `${API_URL}/${end}/${id}`

const caption = document.createElement("caption");
const table = document.createElement("table");

caption.appendChild(document.createTextNode(end));
table.appendChild(caption);

fetch(ruta)
    .then((respusta) => respusta.json())
    .then((datos) => {
        const tr_h = document.createElement("tr")
        for (let prop in datos) {
            if (prop == "address") {
                for (let prop_a in datos.address) {
                    if (prop_a == "geo") {
                        for (let prop_g in datos.address.geo) {
                            const th_g = document.createElement("th")
                            th_g.appendChild(document.createTextNode(prop_g))
                            tr_h.appendChild(th_g)
                        }
                    }
                    else {
                        const th_a = document.createElement("th")
                        th_a.appendChild(document.createTextNode(prop_a))
                        tr_h.appendChild(th_a)
                    }
                }
            }
            else if (prop == "company") {
                for (let prop_c in datos.company) {
                    const th_c = document.createElement("th")
                    th_c.appendChild(document.createTextNode(prop_c))
                    tr_h.appendChild(th_c)
                }
            }
            else {
                const th = document.createElement("th")
                th.appendChild(document.createTextNode(prop))
                tr_h.appendChild(th)
            }
        }
        table.appendChild(tr_h)
        aplicacion.appendChild(table)


        const tr_b = document.createElement("tr")
        for (let prop in datos) {
            if (prop == "address") {
                for (let prop_a in datos.address) {
                    if (prop_a == "geo") {
                        for (let prop_g in datos.address.geo) {
                            const td_g = document.createElement("td")
                            td_g.appendChild(document.createTextNode(datos.address.geo[prop_g]))
                            tr_b.appendChild(td_g)
                        }
                    }
                    else {
                        const td_a = document.createElement("td")
                        td_a.appendChild(document.createTextNode(datos.address[prop_a]))
                        tr_b.appendChild(td_a)
                    }
                }
            }
            else if (prop == "company") {
                for (let prop_c in datos.company) {
                    const td_c = document.createElement("td")
                    td_c.appendChild(document.createTextNode(datos.company[prop_c]))
                    tr_b.appendChild(td_c)
                }
            }
            else {
                const td = document.createElement("td")
                td.appendChild(document.createTextNode(datos[prop]))
                tr_b.appendChild(td)
            }
        }
        table.appendChild(tr_b)
        aplicacion.appendChild(table)
    })
    .catch((error) => console.log(error));