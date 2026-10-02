# Cómo agregar poemas y cartas

La web lee automáticamente todos los archivos `.md` que pongas directamente dentro de esta carpeta. Después de crear o editar un archivo, reinicia el servidor de desarrollo si está abierto. En una versión publicada, el archivo debe quedar incluido en el proyecto antes de volver a construirlo.

## Plantilla mínima

Copia esta estructura en un archivo nuevo, por ejemplo `content/05-tu-recuerdo.md`:

```md
---
id: tu-recuerdo
number: "05"
type: poema
collection: lo que guardo de ti
title: Un título bonito
subtitle: una frase corta debajo del título
year: una tarde de nosotros
mood: para leerte despacio
accent: "#C94B5A"
className: rose
note: Una pequeña nota que aparece al lado del texto.
---

## Extracto

Una o dos líneas que aparecerán en la tarjeta de la galería.

## Texto

Primera línea del poema o de la carta.
Segunda línea.

Este espacio en blanco separa estrofas o párrafos.
Otra línea para continuar.
```

## Campos disponibles

| Campo | Obligatorio | Para qué sirve |
| --- | --- | --- |
| `id` | No | Identificador único. Si falta, se usa el nombre del archivo. Usa minúsculas y guiones. |
| `number` | Sí recomendado | Orden visual de la tarjeta: `01`, `02`, `03`… |
| `type` | No | `poema` o `carta`; solo documenta el tipo y no cambia el diseño. |
| `collection` | No | Texto pequeño de la parte superior de la tarjeta. |
| `title` | Sí recomendado | Título grande de la tarjeta y de la lectura. |
| `subtitle` | No | Frase manuscrita debajo del título. |
| `year` | No | Fecha, momento o frase corta. Puede ser `un domingo contigo`. |
| `mood` | No | Pequeña etiqueta encima del título. |
| `accent` | No | Color hexadecimal del poema, por ejemplo `#6F8A9A`. |
| `className` | No | Estilo de tarjeta: `rose`, `amber`, `blue` o `plum`. |
| `note` | No | Nota lateral que aparece al abrir la lectura. |

## Reglas del contenido

- El bloque de campos debe estar al principio y encerrado entre dos líneas `---`.
- Usa exactamente los encabezados `## Extracto` y `## Texto` (también se aceptan `## Resumen`, `## Poema` y `## Carta`).
- Conserva los saltos de línea en `## Texto`: una línea vacía crea una separación entre estrofas o párrafos.
- El orden de las tarjetas depende de `number`, no del nombre del archivo.
- Para una carta puedes usar `type: carta` y `## Carta`; se mostrará con la misma lectura íntima que un poema.
- No pongas HTML ni JavaScript dentro del Markdown.

## Ejemplo de carta

```md
---
id: carta-de-domingo
number: "05"
type: carta
collection: cosas que quería decirte
title: Carta de domingo
subtitle: para abrir cuando me extrañes
year: domingo, 8:42 p. m.
mood: una carta para ti
accent: "#D19B62"
className: amber
note: Esta no necesita respuesta; solo quería que la tuvieras.
---

## Carta

Amor, hoy pensé en ti mientras hacía algo completamente normal.

Y me dieron ganas de guardar este momento para nosotros.
```

> Importante: en el ejemplo anterior `title` debe comenzar al inicio de la línea, sin espacios delante.
