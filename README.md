# PRUEBA_ONESTIC_FRONTEND_NATALIA_FERNANDEZ

Para este proyecto he utilizado el framework Angular y he utilizado Bootstrap para dar estilos y conseguir un diseño responsive.

¿CÓMO NAVEGAR POR LA APLICACIÓN?
--------------------------------
- Veremos que la aplicación tiene un componente Display y tres vistas (List, Detail y Favorites).
- DISPLAY contiene los botones que nos permitiran cambiar de vistas y mostrarnos el contenido que deseamos. Es un componente padre que administrará el contenido de las vistas. Mediante el uso de los botones nos permitirá cambiar a modo oscuro/modo claro, así como cambiar el modo de listar los pokemons list/grid.
- LIST: Al ejecutar el proyeco se mostrará la vista List, nuestra página de portada, se nos muestran todos los pokemons de 20 en 20, veremos la páginacion debajo del listado.
- DETAIL: Dentro de las cards de list, haciendo click en el boton Detail de un Pokemon determinado, cambiaremos la vista y nos encontraremos con su información detallada. Además, a modo de carrousel con los botones Previous y Next, podremos pasar al detalle del siguiente Pokemon o al anterior (en orden de nº de id).
- Tanto en las cards de List como en las de Detail, encontraremos disponible el boton de favorito (en forma de estrella en las esquinas superiores derechas), si hacemos click se quedara marcado como favorito.
- FAVORITES: Haciendo click en este boton se muestra el listado de pokemons que hemos marcado como favoritos, el listado tambien dispone una visualización en grid o list.
- Por último, podremos cambiar el modo de la aplicación a modo oscuro y modo claro. 

MEMORIA
-------
- Empece este proyecto haciendo un esquema, un pequeño diseño de como quería que quedara visualmente el listado y el grid. Entré en la documentación de PokeApi y decidí cuáles datos más relevantes y cómo los quería sacar. Creé el proyecto en Angular y comencé con el HTML y el CSS con la ayuda de BootStrap.
- Lo segundo fue hacer las peticiones http a la Api, creando las interfaces para la respuesta a la petición. El mayor problema que tuve fue para sacar la imagen principal del pokemon. 
- Me centré en sacar los datos de la Api en List y Detail, sin pensar mucho en el enrutamiento ni en los botones, lo que luego me dio algunos problemas.
- Hice el primer intento de paginación con el Paginator de Angular Materials, que más tarde cambiaría ya que los estilos no terminaba de gustarme.
- Después hice el guardado en favoritos, esta persistencia en el lado cliente la llevé a cabo mediante el uso de LocalStorage, almacenando determinados datos que después me sirvieran en la vista Favorites.
- Posteriormente, me puse a investigar sobre la creación de un modo oscuro. Al final opté por crear eventos que cambiaran los estilos y determinadas clases CSS.
- Durante todo camino fui retocando el HTML para adaptarlo a los datos que conseguía sacar y conseguir un estilo parecido a cómo se comportaría una Pokédex.
- El mayor problema que tuve fue para emitir eventos entre los componentes, el enrutado también me dio problemas durante el proceso. Además, la paginación del listado terminé cambiándola y dejé de hacer uso de la libreria de componentes de Angular Material. 

LINKS Y DOCUMENTACIÓN DE APOYO
------------------------------
- Todos los apuntes y material de clase
- Stackoverflow
- https://angular.io/docs
- https://www.w3schools.com/
- https://developer.mozilla.org/es/
- https://getbootstrap.com/
- https://material.angular.io/
- DiscoDurodeRoer
- PildorasInformáticas