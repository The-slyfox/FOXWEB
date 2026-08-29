# Sitio de Jose Gutierrez-Moyano

Construido siguiendo los wireframes **5a** de Claude Design
(*Wireframes Slyfox* → turno 5, "Estructura elegida").
HTML/CSS/JS plano: sin build, sin dependencias, sin instalar nada.

## Verlo en tu compu

```bash
python -m http.server 8777
```

y abrís `http://127.0.0.1:8777`.
(Doble click en `index.html` también funciona, pero las miniaturas de Vimeo
no cargan por restricciones del navegador con archivos locales.)

## Las cuatro plantillas

| Página | Plantilla | Qué es |
|---|---|---|
| `index.html` | **1b** | Home. **No scrollea.** Dos puertas, sin video en reposo. |
| `cine.html` | **4a** | Un solo scroll: reel → cortos → musical/moda/graduación → comercial → digital → fotografía → contacto. |
| `post.html` | **4a** | Color (slider antes/después) → cortos editados → edición comercial → créditos. |
| `fotografia.html` | — | Mosaico con filtro por categoría. |
| `los-idiotas.html` | **3a** | Página de corto, modelo 9AM. |
| `ximoquetza.html` | **3a** | Misma plantilla, casi todo pendiente. |

### Cómo funciona el home

En reposo: sólo el logo sobre fondo plano, **cero videos cargados**.
Cuando el cursor entra en un lado, ese lado se abre al 82%, arranca *su*
video (silenciado, en loop) y el otro se cierra y queda como pestaña
vertical clicable. El eje y el logo viajan con la apertura. Al salir el
cursor todo vuelve al reposo y el video se descarga del todo.
En móvil no hay cursor: las mitades se apilan y el video corre en la que
entra en pantalla.

### Cómo funciona la página de corto

Primera pantalla: still a sangre, poster pegado al título gigante
abajo-izquierda, y el carrusel flotando encima a la derecha — laureles
arriba (máximo 5, la fila envuelve), después las tarjetas: **trailer
primero, luego los stills**, cortadas por el borde derecho. Flechas abajo
a la derecha. Al hacer scroll: sinopsis + ficha técnica, recorrido en
festivales (lista de texto que crece sin límite) y otros trabajos.

## Idioma

El sitio es bilingüe. Todos los textos de interfaz salen de
`assets/js/i18n.js` — un diccionario `es` y uno `en`. El idioma elegido
queda guardado en el navegador.

Los nombres propios (títulos de corto, personas, clientes) **no** se
traducen: van igual en los dos idiomas. Lo que traduje son las etiquetas
del sitio: navegación, títulos de sección, roles, ficha técnica, avisos.
Tus textos largos (sinopsis, presentación, créditos de post) todavía no
existen en ningún idioma — están marcados como pendientes.

## Agregar contenido: `assets/js/data.js`

Es el único archivo que hay que tocar.

**Un video nuevo** — agregá una línea en el grupo que corresponda:

```js
{ id: '1234567890', t: 'Nombre del proyecto', ratio: '16/9' },
```

- `id` — el número de `vimeo.com/1234567890`
- `ratio` — `16/9` · `9/16` · `4/3` · `1.85/1` · `1/1`
- `hash` — sólo si el video es *privado con link*
  (`vimeo.com/873832124/71d43db219` → `hash:'71d43db219'`)

**Una foto** — en `FOTOS`, con su categoría:

```js
{ src:'assets/img/mi-foto.jpg', alt:'Cliente', cat:'retrato', alto:'tall' },
```

`cat` puede ser `retrato`, `producto`, `lifestyle`, `detras` o `null`.
`alto:'tall'` la hace ocupar doble alto en el mosaico.

**Un par de color antes/después** — en `POST_COLOR`:

```js
{ antes:'assets/img/x-antes.jpg', despues:'assets/img/x-despues.jpg', t:'Proyecto' },
```

El slider ya está programado: se enciende solo en cuanto haya un par.

**Un corto nuevo** — en `CORTOS`. `puerta` define dónde aparece la
tarjeta: `'cine'` (lo fotografiaste), `'post'` (lo editaste) o `'ambas'`
(las dos, mismo enlace). Si merece página 3a, copiá `los-idiotas.html`,
cambiá los textos, y agregá su entrada en `PROYECTOS`.

**Los videos de las puertas del home** — en `PUERTAS`. Elegí yo estos dos
(Cine = REEL 2025, Post = UIN — Evolución); cambialos si preferís otros.

## Pendientes reales (no son bugs)

Todo esto se ve en pantalla con recuadro punteado naranja:

- **Sinopsis** de los dos cortos, y **duración** de Los Idiotas.
- **Ximoquetza**: no tengo stills, ficha, año ni festivales. De fondo de
  la primera pantalla puse el poster, muy velado, hasta que me pases un
  frame del corto.
- **Trailers**: ninguno de los dos cortos tiene trailer en Vimeo.
- **Post → Color**: sin pares antes/después.
- **Post → Edición comercial**: vacío a propósito. No sé cuáles de los
  comerciales editaste vos y no lo voy a suponer — pasame la lista.
- **Post → Créditos** y el texto de presentación.
- **Fotografía**: las 8 fotos están sin repartir en categorías. Decime
  cuál va en cuál.
- **Digital · social media**: sólo hay 2 verticales (Madame Gourmet,
  Cambac). El wireframe pedía también cuadrados 1:1.
- **Sobre mí** y **Contacto**: en gris en el nav, sin página todavía.
- **3 videos sin miniatura** — Vimeo los devuelve como privados:
  Madame Gourmet (`1211857499`), Cambac (`1211857997`) y
  Pandora — Navidad (`1212155206`). Ponelos en *unlisted* o pasame el
  hash del link privado. Mientras tanto se ven como tarjeta negra con play.
- **IMDb / IG de cada corto**: los enlaces bajo el poster están en gris.

## Publicar (GitHub + Netlify)

Netlify no necesita configuración.

1. Crear un repo en GitHub y subir esta carpeta.
2. En Netlify: *Add new site → Import from GitHub*.
3. Build command: **vacío**. Publish directory: **`sitio`**.

Desde ahí, cada cambio que subas a GitHub se publica solo.
