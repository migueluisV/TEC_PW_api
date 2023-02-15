## Estudiando APIs con [JSONPlaceholder](https://jsonplaceholder.typicode.com/)


El objetivo de este pequeño trabajo de sitio web es estudiar y comprender el uso de las APIs: cómo es que se obtiene, envía, modifica o elimina la información que esta contiene. Se pretende crear un sitio web con las funciones que se acaban de describir.


La API de JSONPlaceholder contiene los **métodos**:
 - GET,
 - POST,
 - PUT,
 - PATCH y
 - DELETE.


Y las **rutas**:
 - /posts,
 - /comments,
 - /albums,
 - /photos,
 - /todos y
 - /users.


Las herramientas utilizadas fueron:

|Tecnología|Logo|
|--|--|
|JavaScript|<img src="https://www.sparklabs.com.mx/wagner/wp-content/uploads/2019/09/javascript@3x.png" width="100px"></img>|
|HTML|<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/100px-HTML5_logo_and_wordmark.svg.png"></img>|
|Visual Studio Code|<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/90px-Visual_Studio_Code_1.35_icon.svg.png"></img>|
|Live Server. Extensión de VSCode|<img src="https://i.pinimg.com/originals/a8/b0/52/a8b05283f8049173e74ca810b56d5c81.png" width="100px"></img>|


Buscamos que el usuario seleccione el método que desee ejecutar, seguido a esto, seleccione la ruta a la cual aplicar el método, en caso de que se busque actualizar o eliminar un recurso en específico, podrá seleccionarlo mediante una lista.


El **directorio** del proyecto consta de:
- la carpeta **methods**: contiene los archivos *.js* con el código para ejecutar los métodos de la API.
- la carpeta **resultados**: contiene los archivos *.html* con el DOM básico para cargar en el sitio web.
- el archivo **index.html**, es la página inicial del sitio, aquí seleccionamos el método a ejecutar, una vez seleccionado, se nos redirecciona al siguiente archivo.
- el archivo **selecciona_un_endpoint.html**, es la página del sitio donde seleccionamos uno de los Endpoints disponibles en la API, si seleccionamos un Endpoint distinto a *GET*, se nos redirecciona al siguiente archivo.
- el archivo **selecciona_un_dato.html**, es la página del sitio donde seleccionamos un dato del Endpoint

En cuanto a la obtención de datos de la API (*GET*), el archivo **get.js** toma los parámetros de la URL para poder recolectar los recursos del Endpoint que seleccionamos previamente. Al contar con Endpoints con distintos campos (propiedades), si buscamos crear o actualizar un recurso, nos encontraremos con el problema de tener que recuperar los datos para crear o actualizar, para solucionar esto, utilizamos los *forms* de HTML, estos formularios son creados en distintos archivos HTML para mayor fácibilidad de mantenimiento, lo mismo ocurre con los formularios para el método *PUT*, *post.js*, *post_user.js*, *put.js* y *put_users.js* se encargan de recuperar los datos de los formularios, convertirlos a JSON y enviarlos a la API.