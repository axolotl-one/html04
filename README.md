# Módulo 3: Repositorio de Prácticas aplicando JavaScript

## Historial de Commits de Rama Master

### 1-4 Actividades de reforzamiento sobre Git y GitHub

### 5.1 Actividad 1: Tipos de Datos

### 5.2 Creación del index.html para el menú de páginas

### 6 Actividad 2: Estructuras de Selección

### 7 Practica 1: Piedra, Papel o Tijeras plus

Simular el juego clasico subiendo de nivel a dos manos y quitar una, ***Piedra, Papel o Tijeras Menos Una***. Esta versión solo cuenta con el modo _Computer vs Computer._

### 8.1 Actividad 3: Arreglos y Ciclos

Se selecciona una fruta de las que se muestran en pantalla y con el botón _Mostrar Lista_ mostrará una alerta que devuelva el arreglo de todas las frutas que fueron seleccionadas.

### 8.2 Práctica 2: Simulador del Sistema de Vacunación

Solicita la CURP que tiene los datos de nacimiento y género con la que se permiten seleccionar a los usuarios que cumplen con alguno de los requisitos disponibles.

### 8.3 Reencarpetado

### 9.1 Actividad 4: Funciones

Muestra una colección personalizada sobre libros. Se trabaja por primera vez con input type="text" que captura el título del libro y con select se captura uno de los géneros disponibles. Se crea un arreglo a partir de las capturas y junto el select permite mostrar el libro relacionado con el género.

### 9.2 _Update 2.0: Friendly_ (Piedra Papel o Tijeras Menos Una)

Se añade el modo _Player vs Computer,_ una barra de navegación para la configuración y un reinicio automático tras una partida finalizada. Se sustituye el archivo script y se mejora la interfaz para dispositivos moviles.

### 10.1 Actividad 5: Objetos Literales, Objetos Object y Objetos Clase

Muestra una página mejorada del _pract04.html_ con nuevos valores para registrar como propiedades de un libro. Se usaron tres inputs para la ejecución en la creación del objeto libro con las sintaxis de objeto literal, objeto object y objeto clase respectivamente. Usa una script propia de la página y comparte hoja de estilos CSS con _pract04.html_ y fue adaptada

### 10.2 Incorporación del grid a hoja de estilos

Cambio del display: inline-block a grid en el nav de _pract04-05.css_ y prueba de kill a estilos nativos de safari y firefox sobre los elementos de select e input.

## Historial de Commits de Rama proyectATM: Simulador de Cajero Electronico

### 1.1 (11.0) Creación del Login y Menu de Usuario

**En HTML,** el _index.html_ se incorporo el ancla hacia la pagina del proyecto. Para la página del proyecto, se incorporo un _header_ para el logotipo del proyecto y el nombre; un _main_ donde tiene tres secciones, una para el _login,_ otra para el _signup_ y otra para el _menú principal_ previamente ocultado con _display: none_ desde CSS mientras no se inicie sesión en el _login._

El _login_ solicita el usuario y contraseña usando inputs correspondientes con validación propia de html que en el momento no se ejecutaba correctamente por falta de una etiqueta _form_ que los asociara. El _signup_ permanece como interfaz estática y oculta. El _menú_ muestra un banner vacío para el estatus que será llenado desde JS, y otro banner estático de botones para las operaciones.

**En CSS,** se centrann los elementos con text-align y justify-self. Los elementos _#login, #blocked, #bannerStatus y #bannerAcciones_ son banners del cajero y se configuran con display: flex con flex-direccion: column, un tamaño de proporcion 70vw x 70vh, un espaciado interno gap: 10px, un color de fondo gris-plata y una sobra ligera con el contraste azul del body. Después se reconfiguran el _#signup y #menu_ con display: none.

**En JavaScript,** Se crea la clase _Usuario_ que obtiene las propiedades de id, nombre, apellido, nip y apertura, no contiene métodos de momento. Posterior a la declaración, se crea un arreglo que almacena los usuarios y recibe nombre de _ListaUsuarios_ y se llenan con tres usuarios predefinidos de prueba. Posterior a ello, se obtienen los elementos del DOM considerados "banners".

Se usa un listener que actua al clickear el boton de "Iniciar Sesión" del _login_ que dirige a la funcion _Validate_ encargada de activar el display del _menu_ al coincidir el usuario y el NIP, y dirige a la funcion _blocked_ si se excede en intentos. Al activar el menu, se crean dos elementos que capturan el saludo: _Hola de nuevo user.name_ y el saldo: _Tu saldo actual: user.saldo,_ y los agrega al banner estatus.

La funcion blocked oculta el login (el unico visible al iniciar sesión) y crea una nueva section junto con otro elemento que muestra la leyenda _Se ha bloqueado la página por exceso de intentos._ Se le adjunta un id para que se asocie con los banners estilizados en el CSS.

### 2.1 (12.0) Creación de transiciones al cambiar de sección

**En el HTML,** se introducen etiquetas _label_ al final de las secciones para mostrar advertencias al usuario si falla en alguna validación. Tambien se modifican las validaciones nativas de html sobre los inputs y se descarta el uso de la etiqueta _form_ por falta de regulación en su ejecución. Se crea un pie de página para colocar la leyenda de la versión.

**En el CSS,** se asigna un logo para la seccion de bloqueo, se asocia el _#signup_ como otro banner. Se crean estilizados personalizados para _#login, #signup, #menu_ donde se aginan las propiedades de opacity: 0 y una transition: all 1s ease-in-out que muestran el cambio sobre todas las propiedades. Estos elementos tienen otra asociacion a parte cuando obtienen la clase _active_ donde opacity cambia a 1 y crea un traslate sobre el eje Y de -2vh.

**En JavaScript,** se agrega la propiedad fails a la clase Usuario y se elimina el let intentos, esto para contabilizar los intentos pos usuario relacionado, se agregan listener globales para abrir el menu, el signup y la opcion de depositar. Se crea la funcion _warningBlocked_ para asignar mensajes de error al usuario al fallar alguna validación que se muestra desde el _labelwarning_ del login creado en el HTML. Se agrega la lógica de la transición al cambiar de login a signup, de login a menu y de menu a login, todas las transiciones aún sin englobar a una función concreta.

La lógica para las transiciones consiste en eliminar la clase _active_ que existe en el banner actual a cerrar, lo que provoca el cambio del opacity de 1 a 0 y el traslateY de 2vh a 0 especificado en el CSS al perder el selector asociado a la clase _.active_ que existe para cada elemento. Se adjunta un listener para el banner a cerrar de tipo _transitionend_ que espera el fin la transición para ejecutar su contenido y se agrega un _{ once: true }_ para especificar que solo se activará una vez el listener ya que se genera un nuevo listener cada vez que se ejecuta la funcion donde se encuentra.

Dentro del contenido de este listener al terminar la transición, el elemento a cerrar se oculta cambiando su display a none, y se agrega la función setTimeout con tiempo de cero donde dentro de ella continúa el código, esto evita entrar en conficto al cambiar el display a flex de la seccion a mostrar y no perder la animación de transición al agregarle la clase _active._

### 3.1 (13.0) Implementación del Signup y el uso de _form_

**En el HTML,** se implementan las etiquetas form que asocian los imputs de la sección login y signup respectivamente, y se ajustan los criterios de validación nativas de los inputs. En el CSS, se desactiva la apariencia nativa en los navegadores de safari y firefox para los inputs, buttons y selects. Tambien se desactiva el marcado del borde de los inputs sobre la pseudo-clase _focus._

**En JavaScript,** se ajusta el listener para el login que inicia sesión, sustituyendo el elemento _btnLogin_ de tipo _click_ al elemento _loginform_ de tipo _submit,_ dentro del listener se agrega el evento "e" que evita redireccionaientos nativos del form con la función _preventDefault()._ De manera similar se creo otro listener para el signup aplicando para el elemento _signupform._ Adicional a ello, se crearon diferentes funciones asociadas para el _signup_ para validar los criterios para cada campo del form. Además de otra funcion _warningSignup_ similar a _warningBlocked_ que muestra los mensajes de error exclusivos para Signup.

### 4.1 (14.0) Implementación de las operaciones de Depósito y Retiro del ATM

**En el HTML,** se asigna la clase _banners_ para todos los elementos asociados, usualmente a etiquetas section. Se crean nuevos elementos _section_ para los nuevos banners para saldo, deposito, retiro y historial de transacciones. Para el deposito y el retiro se adjuntan un form y un label para mostrar advertencias como en los banners anteriores. El form solicita una cantidad para operar, un submit para enviar y un reset para cancelar. En el CSS, se sustituyen los id de los elementos considerados _banners_ por la clase _.baner_ reduciendo así su grado de especificidad.

**En JavaScript,** se crea la función _OpenMovs(user)_ que se ejecuta dentro de la función _OpenMenu_ al abrir el Menú Principal. Esta función obtiene los elementos de las section _consultarSaldo, depositar, retirar_ y crea un listener para cada uno respectivamente. Cada listener hace llamado a la nueva función _OpenSection(sectionOpen, sectionClose),_ solicitando la section de apertura y la section de cierre que realiza las transiciones creadas anteriormente; y la funcion propia del listener.

Las nuevas funciones _actDeposito_ y _actRetiro_ solicitan el objeto del usuario y la section a cerrar, dentro de ellas se crean otros listeners que se ejecutan con el submit cuando se intenta enviar la cantidad y con el reset cuando se decide cancelar la operación, ambos casos conducen a cerrar el panel y abrir el menú principal si cumplen con las validaciones en el caso del submit; tambien si se cumplen, realizan la modificación a la propiedad del saldo del usuario sumando o restando la cantidad segun sea el caso.

Se crea la nueva funcion _warningCase_ que solicita el id del label donde mostrará el mensaje, -el número de la section, y el número del error que se asocia internamente con el mensaje del error a mostrar. Las nuevas funciones mencionadas de _warningCase, OpenSection_ están previstas para reciclar código sobre las funciones _warningBlocked, warningSignup_ y las transiciones creadas con anterioridad respectivamente, esto en la próxima versión para mantener la estabilidad de esta versión.

### 5.1 (15.0) Don't repeat yourself (DRY). Simplificación de Código

**En HTML,** se ajustan las propiedades de algunos inputs y se anexan los elementos de _h1 saludo_ y _section blocked_ junto con sus elementos internos que originalmente se creaban desde el DOM en JavaScript. En CSS se adjuntan todos los elementos que tenían reglas propias relacionadas con la transición a una sola declaracion donde se engloban a todos los selectores de id (#element) y otra declaración que engloba a todos los selectores id con la clase active (#element.active).

**Primer DRY en JavaScript:** las funciones _warningblocked y warningSignup,_ que mostraban los errores del login y signup respectivamente sobre su label correspondiente, se remplazan por la función _warningCase_ creada anteriormente para el banner de deposito y retiro que muestran errores cuando no la cantidad ingresada no cumple la validación. Esta función solicita el id del label y el id del mensaje de error que se encuentra dentro de la funcion utilizando operadores ternarios para relacionar el id, de esta forma la función se adapta para cualquier banner que requiera mostrar un mensaje de alerta.

**Segundo DRY en JavaScript:** las transiciones creadas con anterioridad para los cambios entre secciones de login-menu menu-login y login-signup son remplazadas por la función _OpenSection_ creada en la versión pasada para abrir el banner de deposito y de retiro. Esta función conserva la lógica de las transiciones originales, que elimina la clase _active_ de la sección a cerrar para realizar la transicion a opacity cero y déspues ocultar con display: none una vez concluida la transición y con ella anexa la clase _active_ sobre la sección a abrir realizando la misma transición, pero inversa; la función solicita la sección a abrir y la sección a cerrar como parametros lo que la hace accesible para todos los cambios entre secciones incluyendo las primeras mencionadas.

**Tercer DRY en JavaScript:** los patrones entre las funciones actDeposito y actRetiro son semejantes variando unicamente en la operación realizada sobre la actualización del saldo y los mensajes que arroja en su label por invalidación. Por lo que se remplazan por una función que valida la operación con relación al id del formulario que recibe. De esta forma se puede adaptar a otros movimientos más como la transferencia o el pago de algún servicio.

### 6.1 (16.0) Implementacion del Historial de Transacciones

**En el HTML,** se agrega un título para cada panel de operacion, en la section _transacc,_ que había permanecido estática, ahora posee una lista desordenada _ul_ donde se adjuntarán las transacciones usando elementos _li._ En CSS no se realizó ningún cambio en esta versión.

**En JavaScript,** se implemento la clase _Transaccion_ que recibe como parametros para el constructor el id, tipo de transacción realizada y el monto recibido que se guardaran como propiedades, además generará una propiedad a partir de la clase Date() que recibirá la fecha y hora en la que se creo el objeto de transacción. Cada transacción pertenecerá a un único usuario por lo que la clase usuario necesitará una propiedad que almacene sus transacciones, esto se llevará mediante un arreglo de objetos de tipo Transaccion.

Por lo que la clase Usuario se crea la propiedad _listTransacc = []_ donde se almacenarán las transacciones y se elimina el parámetro de _apertura_ del constructor, ya que esta se considera una transacción, por lo tanto el saldo ahora se inicializa con cero. Tambien se agregan los métodos deposito(monto), retiro(monto) y apertura(monto) que actualizan el saldo internamente y crean un objeto de transaccion que se agrega al principio del arreglo _listTransacc._

Esta modificación también aplica sobre el signup que generaba un usuario nuevo al registrarse con un saldo inicial de $ 100, ahora utiliza el método apertura(100) que crea el objeto transacción de la apertura; igualmente, en la función _actTransacc_ se actualiza el cambio al actualizar el saldo directo desde la propiedad a utilizar el método deposito y retiro según sea el caso. Al generar los tres usuarios del sistema, ahora utilizan el metodo _apertura._ Se crea una función para mostrar el historial al abrir el panel, esta recorre la lista de transacciones del usuario con foreach donde para cada uno crea un elemento _li_ donde captura el nombre del usuario, el id, la fecha, el tipo de transacción, el monto y finalmente lo agrega como elemento hijo del elemento _ul._

### 7.1 (17.0) Centralización y Control de Listeners

**Problema con entrelazado de usuarios:** El programa hasta la versión anterior presentaba errores al iniciar sesión por segunda ocación con un usuario distinto. Esto se debe a la descentralización de listeners que se creaban cada vez que se realizaba una operación dentro del menu principal, como un depósito por ejemplo, estos listeners permanecían activos debido a que no se cerraban correctamente, y mantenían la referencia al usuario donde se crearon, esto aún cerrando sesión e iniciando con otro usuario, provocando una _fuga de información._

**Solución:** Se crearon dos nuevas funciones para concentrar todos los listeners creados en un arreglo global llamado _ListaListeners._ La primera función _addListenerLocal_ obtiene el elemento donde se generará, el tipo de activación y la función que realizará; Internamente creará el listener y guardará el objeto.

Por ejemplo: _addListenerLocal(formRetiro,"submit",hacerRetiro)_
Creará el listener: _formRetiro.addEventListener("submit",hacerRetiro);_
y guardará el objeto: _ListaListeners.push({formRetiro, "submit, hacerRetiro})_

De esta forma se llama al método _addListenerLocal_ para cada listener creado dentro de la función _OpenMenu_ y se llamará a la segunda función llamada _removerListenerLocales()_ donde aplica la función removeEventListener para remover cada listener que se encuentra en la lista usando la función foreach.

Dentro de la función _OpenMenu_ se removieron todos los listeners que se encuentran en otras funciones a las que se les hace el llamado desde esta función y se colocaron en esta función utlizando la función _addListenerLocal_ para mantener la centralización efectiva y evitar posibles duplicaciones de listeners por cada llamado a su funcion de origen.

**Otros Cambios.** Los usuarios del sistema ahora se generan y guardan en la lista de usuarios mediante una función que se llama desde el listener global del login antes de validar el usuario. Se fusionan las funciones _OpenMenu, OpenStatus, OpenMovs_ que pertenecen al mismo contexto. Ahora las funciones que ejecutaban las operaciones para deposito, retiro e historial de transacciones unicamente conservan la lógica ejecutada dentro del listener que contenían; estas funciones ahora se pasan como parámetro a la función _addListenerLocal_ con respecto al listener que contenían.

### 8.1 (18.0) Mejoras de código limpio

Se renombraron los id de las secciones de operaciones a _panel_ junto con la operación correspondiente, por ejemplo, _panelRegistro._ Los id de los inputs submit y reset se renombraron al tipo de input correspondiente mas el nombre de la sección a la que refieren, por ejemplo, _submitLogin._ La funcion _warningCase_ ahora recibe como parámetro el id del label y el mensaje a mostrar descartando el registro de mensajes de error interno de la función referenciadas por el parámetro idWarningCase. Si _warningCase_ no recibe un mensaje para mostrar, éste limpia el label. La función _disabledElementTemp_ que inhabilita por dos segundos el boton de acceso a una sección una vez activado para evitar posibles duplicaciones de ejecución ahora hace el llamado dentro de la función _OpenMenu_ solicitando un nuevo parámetro para el id del botón o input a bloquear y aplicando para todas las secciones.

### 9.1 (19.0) Documetación del proyecto y posibles cambios a futuro

**Posibles Cambios**
1. Corregir la transición de traslateY(-2vh). Al activar la transición, esta queda desfasada de su localización de origen, se plantea intercambiar los valores entre las reglas para que quede en cero al activar la transición sin perder el efecto. Eliminar el margin que "compensa" ese desfase.
2. Implementar nuevas operaciones como la operación de transferencia, la operación de inversión/suscripción, la operación de +puntos recompensas y la operación de pago en linea.
3. Implementar @media-queries para interfaces desktop, recordando que este proyecto aplica el enfoque mobile-first. Posible cambio de flex a grid sobre los paneles para desktops.