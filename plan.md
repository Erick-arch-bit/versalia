# Versalia — plan de diseño e implementación

## Dirección creativa

- **Design Movement:** Romanticismo editorial contemporáneo con ecos de una revista de arte nocturna: refinado, íntimo y ligeramente surreal.
- **Core Principles:** 1) El poema manda: cada composición crea un marco propio para leer. 2) Contraste entre precisión editorial y gestos manuales. 3) Descubrimiento lento: la interfaz invita a explorar, no a consumir una cuadrícula. 4) Romanticismo adulto, sin clichés de corazones ni degradados genéricos.
- **Color Philosophy:** Una base tinta casi negra transmite silencio y profundidad; el marfil cálido hace que los textos se sientan impresos; el rojo lacre funciona como gesto de firma y pulso emocional; un azul ultramar muy tenue introduce una extrañeza nocturna.
- **Layout Paradigm:** Portada asimétrica tipo cubierta editorial, seguida por una cinta horizontal de poemas con tarjetas inclinadas y alturas variables. La lectura se desplaza a una escena vertical de una sola columna, con margen generoso y anotaciones laterales.
- **Signature Elements:** 1) Sello circular «para ti» como marca de regalo. 2) Línea orbital fina que conecta navegación, numeración y estados hover. 3) Pequeñas etiquetas manuscritas y cortes de papel que hacen que cada poema parezca una pieza encontrada.
- **Interaction Philosophy:** Las interacciones deben sentirse como levantar una página o descubrir una nota. Hover con desplazamiento mínimo, lectura con foco y controles claros; nada rebota ni compite con el texto.
- **Animation:** Entrada en capas (fondo, sello, titular y poemas) con fade + desplazamiento corto; órbitas giran muy lentamente; tarjetas responden con tilt suave; al abrir un poema, la escena se expande y el resto se atenúa. Respetar `prefers-reduced-motion`.
- **Typography System:** Display serif `Cormorant Garamond` para titulares y poemas; sans `DM Sans` para navegación, metadatos y botones; etiquetas manuscritas en `Caveat` solo como acento. Jerarquía basada en escala fluida y amplios interlineados.
- **Brand Essence:** Un rincón secreto hecho por mí para mi amor, donde las páginas no son solo cartas: reúnen todo lo que crece y siento por ella. No se presenta como un producto ni como una colección pública: se siente como entrar a algo que solo pertenece a los dos. Personal, tierno, cómplice.
- **Brand Voice:** Habla en primera persona, con afecto directo y pequeñas referencias a una historia compartida; nunca usa lenguaje de servicio, catálogo o plantilla. Ejemplos: «Te hice este lugar para cuando un mensaje se quede corto.» / «Lee esto despacio, como te miro cuando creo que no te das cuenta.»
- **Wordmark & Logo:** «Versalia» en serif de alto contraste, con la V extendida como una línea orbital que rodea discretamente el nombre; el sello circular aparece como sub-marca.
- **Signature Brand Color:** Rojo lacre `#C94B5A`, usado en pequeñas dosis para que se sienta como una firma propia.

## Implementación

- Proyecto web estático en React + Vite, servido en el puerto 3000.
- `src/main.jsx` contiene la experiencia de una sola página y el estado del poema seleccionado.
- `src/contentLoader.js` descubre todos los `.md` de `content/`, interpreta frontmatter y secciones de texto, y entrega el mismo modelo visual para poemas y cartas.
- `content/README.md` documenta la plantilla que se debe copiar para agregar nuevos contenidos sin tocar React.
- `src/styles.css` contiene tokens, composición editorial, responsive y motion.
- `public/manus-routes.json` declara la ruta `/`.
- `app.config.ts` contiene un `logoUrl` literal con un favicon SVG durable en `public/`.
- No se habilitan servidor ni base de datos en esta primera entrega: el contenido de muestra vive en el frontend para validar la dirección visual. La interfaz usa lenguaje privado —«lo nuestro», «de mí para ti», «solo tú y yo»— en lugar de navegación o mensajes de producto.

## Contenido de muestra

Se incluyen cuatro contenidos de muestra dentro de `content/`: tres poemas y una carta. El foco de esta fase es validar que el sitio se sienta como un regalo personal; a partir de ahora se pueden agregar recuerdos y poemas reales creando nuevos `.md` con la plantilla documentada.
