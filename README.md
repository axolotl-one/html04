# Módulo 3: Repositorio de Prácticas aplicando JavaScript

## Historial de Commits

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

### 11.1 Actividad 6: DOM para caja de comentarios

**En HTML** Se implementaron inputs de tipo text para ingresar comentarios por parte del usuario, input tipo submit para capturar los comentarios en el JS y un fieldset donde se mostraran los comentarios junto con otro nuevo input para borrar el comentario al que corresponde.

**En CSS** Se uso una fuente de texto de google fonts "Iceland" que fue aplicada para todos los elementos de la página. Se aplicó el enfoque Mobile-First con una proporción 16:9 para los videos con padding-botton, height y position. para el panel del video se aplico de manera similar con height usando la unidad vw. Para pantallas mayores a 700px se cambio el display de las section del main y se dividió la proporcion entre dos para alinear horizontalmente el video con su panel correspondiente.

**En JavaScript** Se creó la clase GetComentario de la cual se creo un objeto obtener comentario que guarda el contenido, un id generico de referencia para el parrafo del comentario y el boton de borrar que corresponde. Se uso un querySelectorAll para englobar a todos fieldset con la clase cajaComentarios que activen el evento click cuando se da click en algun boton de borrar comentario.

**Cambios externos** La eliminación de estilos nativos de safari y firefox sobre los elementos de select e input fue aplicada en la hoja de estilos _"practics.css"._ Ahora aplican para todas las páginas "practica" del repo.

### 12.1 Actividad 7: DOM para Generador de Passwords

**En HTML** Se asignaron dos etiquetas de _fieldset_ en el _main._ La primera agrupa una etiqueta _p_ para el párrafo que capturará el password generado, y una etiqueta _input_ de tipo _submit_ para guardar el password en el portapapeles; La segunda agrupa todos los criterios que el usuario pueda definir para generar el password, en su mayoría _inputs_ de tipo _checkbox._

**En CSS** Se aplicó el enfoque _Mobile-first_ de forma general con _display: block_ en pantallas pequeñas y _display: flex_ sobre el fieldset contenedor del password para pantallas más grandes. El _input_ para guardar el password en el portapapeles se le aplicó un _display: none_ para activarse cuando se genera el primer password (ejecutado desde JS).

**En JavaScript** Se utilizaron dos DOM. El primero se encarga de la generación del password, para ello obtienen los criterios definidos por el usuario en una lista de querySelectorAll sobre la clase _clausulas_ y en base a la evaluación de los criterios, se llama a una función que convierte números aleatorios entre dos rangos a caracteres basados en un éstandar utilizando el método _String.fromCharCode(numero),_ finalmente se mezclan los caracteres con el algoritmo de Fisher-Yates y se captura la string resultante en el párrafo designado; Ademas, actualiza el estado del boton _Copiar._ El segundo DOM se encarga de copiar el password en el portapapeles y se actualiza asi mismo para inhabilitarse hasta que se activa el primer DOM nuevamente.