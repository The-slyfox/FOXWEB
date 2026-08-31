/* =========================================================
   CONFIGURACIÓN DEL SITIO
   ---------------------------------------------------------
   Este es el único archivo que hay que tocar para agregar o
   mover contenido. No se edita el diseño.

   Un video se ve así:
     { id:'1234567890', t:'Nombre', ratio:'16/9' }
       id    → el número de vimeo.com/1234567890
       t     → título que se ve debajo
       ratio → '16/9' · '9/16' · '4/3' · '1.85/1' · '1/1'
       hash  → SOLO si el video es privado con link
               (vimeo.com/873832124/71d43db219 → hash:'71d43db219')
   ========================================================= */

/* ---------------------------------------------------------
   HOME — las dos puertas
   Cada puerta corre UN video en loop, silenciado, sólo
   mientras el cursor está encima. Cambiá el id y listo.
   --------------------------------------------------------- */
window.PUERTAS = {
  post: { id: '1211855320', still: 'assets/img/door-post.jpg' },  // CINE TRAVIESO REEL 2026 — still: FRAGMENTOTS
  cine: { id: '1219801764', still: 'assets/img/door-cine.jpg' }   // REEL 2025
};

/* ---------------------------------------------------------
   CINE — el reel que abre la página
   --------------------------------------------------------- */
window.REEL = { id: '1219801764', t: 'REEL 2025' };

/* ---------------------------------------------------------
   NARRATIVOS
   puerta → en qué página aparece la tarjeta:
            'cine'  = solo Cine (lo fotografiaste)
            'post'  = solo Post (lo editaste)
            'ambas' = en las dos, mismo enlace

   Dos formas de que la tarjeta sea clickable:
     pagina → navega a una página de corto propia (3a)
     video  → sin página propia: reproduce el video ahí mismo al
              hacer click en el poster (para piezas sin página 3a,
              como los videos de graduación)
   --------------------------------------------------------- */
window.CORTOS = [
  {
    slug: 'los-idiotas',
    t: 'Los Idiotas',
    poster: 'assets/img/poster-idiotas.jpg',
    pagina: 'los-idiotas.html',
    anio: '2026',
    puerta: 'ambas',
    roles: ['role.cinematografo', 'role.editor', 'role.colorista']
  },
  {
    slug: 'ximoquetza',
    t: 'Ximoquetza',
    poster: 'assets/img/poster-ximoquetza.jpg',
    pagina: 'ximoquetza.html',
    anio: '2024',
    puerta: 'post',
    roles: ['role.colorista', 'role.editor', 'role.camop']
  },
  {
    // IMDb: https://www.imdb.com/title/tt11872294/ — poster bajado de ahí,
    // crédito de Edición verificado en el full cast & crew
    slug: 'its-time-for-dinner',
    t: "It's Time for Dinner",
    poster: 'assets/img/poster-its-time-for-dinner.jpg',
    pagina: 'its-time-for-dinner.html',
    anio: '2019',
    puerta: 'post',
    roles: ['role.editor']
  },
  {
    // IMDb: https://www.imdb.com/title/tt12234048/ — poster bajado de ahí,
    // crédito de Cinematography verificado en el full cast & crew
    slug: 'no-drugs-no-dancing',
    t: 'No Drugs, No Dancing',
    poster: 'assets/img/poster-no-drugs-no-dancing.jpg',
    pagina: 'no-drugs-no-dancing.html',
    anio: '2020',
    puerta: 'ambas',
    roles: ['role.cinematografo', 'role.colorista']
  },
  {
    slug: 'their-circle',
    t: 'Their Circle',
    poster: 'assets/img/poster-their-circle.jpg',
    pagina: 'their-circle.html',
    anio: '2020',
    puerta: 'ambas',
    roles: ['role.cinematografo', 'role.colorista']
  }
];

/* ---------------------------------------------------------
   CINE — biblioteca de video
   grid:'strip' → una sola línea con scroll horizontal (como
                  Digital), sirve para que no importa cuántos
                  clips haya, siempre quedan agrupados en una fila
   edited:true  → Jose también lo editó (Post reusa esta misma
                  lista, filtrando por esta marca — no hay una
                  lista aparte que mantener sincronizada)

   "Videos de Graduación" no vive acá — es su propia lista
   (CINE_GRADUACION, más abajo), sólo en Cine, entre Digital y
   Fotografía. No aparecen en Narrativos ni en Post.
   --------------------------------------------------------- */
window.CINE_SECCIONES = [
  {
    key: 'sec.musical',
    grid: 'vgrid-3',
    videos: [
      { id: '1212155206', t: 'Pandora — Navidad',                 ratio: '16/9', edited: true },
      { id: '1113416612', t: 'Un amor de verdad — Live Session',  ratio: '16/9', edited: true },
      { id: '873832124',  t: 'Alto Voltaje — Nest Feat. Leinaad', ratio: '16/9', hash: '71d43db219', edited: true }
    ]
  },
  {
    key: 'sec.moda',
    grid: 'strip-h',
    videos: [
      { id: '1113390128', t: 'Arte postrevolucionario desde la mirada femenina', ratio: '4/3', edited: true },
      { id: '1221294286', t: 'FRAGMENTOTS - SLYFOX', ratio: '16/9', edited: true },
      { id: '1221294287', t: 'TOTCANDO PUERTAS',     ratio: '9/16', edited: true },
      { id: '1221294285', t: 'TOT & MH',             ratio: '9/16', edited: true },
      // editado por Jose pero no fotografiado/dirigido por él — sólo en Post
      { id: '1222192952', t: 'FRAGMENTOTS - Dana',   ratio: '4/3',  edited: true, onlyPost: true },
      { id: '933001376',  t: 'Alejandro Cabezut',    ratio: '16/9', edited: true, onlyPost: true }
    ]
  },
  {
    key: 'sec.comercial',
    grid: 'vgrid-3',
    videos: [
      { id: '1111130195', t: 'Rimac — Trailblazers',                       ratio: '16/9', edited: true },
      { id: '887810179',  t: 'Rivium',                                     ratio: '16/9', edited: true },
      { id: '1111189251', t: 'UIN — Evolución',                            ratio: '1.85/1', edited: true },
      { id: '1211867632', t: 'Golf in Mexico — Manifesto Launch',          ratio: '16/9', edited: true },
      { id: '1211867633', t: 'Golf in Mexico — Manifesto pt. 1',           ratio: '16/9', edited: true },
      { id: '1211867634', t: 'Golf in Mexico — Manifesto pt. 2',           ratio: '16/9', edited: true },
      { id: '1211854327', t: 'Fundación Chiara e Francesco',               ratio: '16/9', edited: true },
      { id: '873830399',  t: 'Sports World Tour Santa Fe',                 ratio: '16/9', hash: '12e9fe5d01', edited: true },
      { id: '1111141457', t: 'Quasar — Pomona',                            ratio: '16/9', edited: true },
      { id: '932991044',  t: 'Cajas y Envíos',                             ratio: '16/9', edited: true },
      { id: '1211855851', t: "Martin's Toys — You Dream It, We Make It",   ratio: '16/9', edited: true },
      { id: '887071439',  t: 'Grupo Cever',                                ratio: '16/9', hash: '1cafe0841d', edited: true },
      { id: '1111146573', t: 'Casa Mexicana de Arte',                      ratio: '16/9', edited: true }
    ]
  }
];

/* Digital · social media — vertical y cuadrado, tira horizontal */
window.CINE_DIGITAL = [
  { id: '1211857499', t: 'Madame Gourmet — Madeleines',       ratio: '9/16', edited: true },
  { id: '1211856607', t: 'Madam Gourmet — Yo Soy Madam Gourmet', ratio: '9/16', edited: true },
  { id: '1211857500', t: 'Madame Gourmet — Filete a la Pimienta', ratio: '9/16', edited: true },
  { id: '1211857997', t: 'Cambac — el lugar que necesitas',   ratio: '9/16', edited: true },
  { id: '1211857996', t: 'Cambac — Vidas Paralelas',          ratio: '9/16', edited: true },
  { id: '1211857998', t: 'Cambac — Carta de Amor a Mamá',     ratio: '9/16', edited: true },
  { id: '1113647148', t: 'Sports World — Tour Crater',                          ratio: '9/16', edited: true },
  { id: '873831255',  t: 'Sports World — Día Internacional del Deporte y Actividad Física', ratio: '9/16', edited: true },
  { id: '884625696',  t: 'Sports World — Día de las Madres',                    ratio: '9/16', edited: true },
  { id: '1114961312', t: 'Art Di Cacao — Valentines',                           ratio: '9/16', edited: true },
  { id: '1111141878', t: 'Meta Mor Magia — Tarot',                              ratio: '9/16', edited: true },
  { id: '1114962232', t: 'The Afterglow — Primera vez en TAG',                  ratio: '9/16', edited: true },
  { id: '1222195529', t: 'Cajas y Envíos — Santa Necesita Ayuda',               ratio: '9/16', edited: true },
  { id: '1222195527', t: 'Cajas y Envíos — Mundial',                           ratio: '9/16', edited: true }
];

/* Videos de Graduación — sólo Cine, va justo antes de Fotografía.
   No están en CORTOS (ya no aparecen en Narrativos) ni los ve Post. */
window.CINE_GRADUACION = [
  { id: '968014607', t: 'Cumbres Lomas 2024',     ratio: '16/9' },
  { id: '837734978', t: 'Cumbres Lomas 2023',     ratio: '16/9' },
  { id: '717712139', t: 'Irlandés de niñas 2022', ratio: '16/9' }
];

/* ---------------------------------------------------------
   POST
   --------------------------------------------------------- */

/* Pares antes/después para el slider de color.
   Formato: { antes:'assets/img/x-antes.jpg', despues:'assets/img/x-despues.jpg' }
   El carrusel de abajo siempre muestra el still "después" (con color);
   al hacer click, ese par se vuelve el slider grande de arriba.
   Mientras esté vacío se muestran recuadros punteados. */
window.POST_COLOR = [
  { antes: 'assets/img/color-11-antes.jpg', despues: 'assets/img/color-11-despues.jpg' },
  { antes: 'assets/img/color-12-antes.jpg', despues: 'assets/img/color-12-despues.jpg' },
  { antes: 'assets/img/color-10-antes.jpg', despues: 'assets/img/color-10-despues.jpg' },
  { antes: 'assets/img/color-01-antes.jpg', despues: 'assets/img/color-01-despues.jpg' },
  { antes: 'assets/img/color-02-antes.jpg', despues: 'assets/img/color-02-despues.jpg' },
  { antes: 'assets/img/color-20-antes.jpg', despues: 'assets/img/color-20-despues.jpg' },
  { antes: 'assets/img/color-21-antes.jpg', despues: 'assets/img/color-21-despues.jpg' },
  { antes: 'assets/img/color-22-antes.jpg', despues: 'assets/img/color-22-despues.jpg' },
  { antes: 'assets/img/color-13-antes.jpg', despues: 'assets/img/color-13-despues.jpg' },
  { antes: 'assets/img/color-14-antes.jpg', despues: 'assets/img/color-14-despues.jpg' },
  { antes: 'assets/img/color-15-antes.jpg', despues: 'assets/img/color-15-despues.jpg' },
  { antes: 'assets/img/color-16-antes.jpg', despues: 'assets/img/color-16-despues.jpg' },
  { antes: 'assets/img/color-18-antes.jpg', despues: 'assets/img/color-18-despues.jpg' },
  { antes: 'assets/img/color-09-antes.jpg', despues: 'assets/img/color-09-despues.jpg' },
  { antes: 'assets/img/color-06-antes.jpg', despues: 'assets/img/color-06-despues.jpg' },
  { antes: 'assets/img/color-03-antes.jpg', despues: 'assets/img/color-03-despues.jpg' },
  { antes: 'assets/img/color-05-antes.jpg', despues: 'assets/img/color-05-despues.jpg' }
];

/* Edición comercial: Post ya no tiene su propia lista — usa las
   mismas secciones que Cine (Musical·Moda, Comercial, Digital),
   mostrando sólo los videos marcados edited:true ahí arriba.
   Cumbres Lomas 2023/2024 quedan afuera: Jose sólo editó un momento
   puntual de esos dos, no la edición completa. */

/* ---------------------------------------------------------
   FOTOGRAFÍA
   cat → 'retrato' · 'producto' · 'lifestyle' · 'detras'
         null = todavía sin clasificar (aparece en "Todas")
   --------------------------------------------------------- */
window.FOTO_CATEGORIAS = [
  { key: 'retrato',   i18n: 'cat.retrato',   cover: 'assets/img/foto-retrato-1.jpg' },
  { key: 'producto',  i18n: 'cat.producto',  cover: 'assets/img/foto-producto-1.jpg' },
  { key: 'lifestyle', i18n: 'cat.lifestyle', cover: 'assets/img/foto-lifestyle-1.jpg' },
  { key: 'detras',    i18n: 'cat.detras',    cover: 'assets/img/foto-detras-1.jpg' }
];

window.FOTOS = [
  { src: 'assets/img/foto-retrato-1.jpg', alt: 'Retrato', cat: 'retrato', alto: 'tall' },
  { src: 'assets/img/foto-retrato-2.jpg', alt: 'Retrato', cat: 'retrato', alto: 'tall' },
  { src: 'assets/img/foto-retrato-3.jpg', alt: 'Retrato', cat: 'retrato', alto: 'tall' },
  { src: 'assets/img/foto-retrato-4.jpg', alt: 'Retrato', cat: 'retrato' },
  { src: 'assets/img/foto-retrato-5.jpg', alt: 'Retrato', cat: 'retrato', alto: 'tall' },
  { src: 'assets/img/foto-retrato-6.jpg', alt: 'Retrato', cat: 'retrato', alto: 'tall' },

  { src: 'assets/img/foto-producto-1.jpg',  alt: 'Producto y marca', cat: 'producto', alto: 'tall' },
  { src: 'assets/img/foto-producto-2.jpg',  alt: 'Producto y marca', cat: 'producto', alto: 'tall' },
  { src: 'assets/img/foto-producto-3.jpg',  alt: 'Producto y marca', cat: 'producto', alto: 'tall' },
  { src: 'assets/img/foto-producto-4.jpg',  alt: 'Producto y marca', cat: 'producto', alto: 'tall' },
  { src: 'assets/img/foto-producto-5.jpg',  alt: 'Producto y marca', cat: 'producto', alto: 'tall' },
  { src: 'assets/img/foto-producto-6.jpg',  alt: 'Producto y marca', cat: 'producto', alto: 'tall' },
  { src: 'assets/img/foto-producto-7.jpg',  alt: 'Producto y marca', cat: 'producto', alto: 'tall' },
  { src: 'assets/img/foto-producto-8.jpg',  alt: 'Producto y marca', cat: 'producto', alto: 'tall' },
  { src: 'assets/img/foto-producto-9.jpg',  alt: 'Producto y marca', cat: 'producto', alto: 'tall' },
  { src: 'assets/img/foto-producto-10.jpg', alt: 'Producto y marca', cat: 'producto', alto: 'tall' },
  { src: 'assets/img/foto-producto-11.jpg', alt: 'Producto y marca', cat: 'producto', alto: 'tall' },
  { src: 'assets/img/foto-producto-12.jpg', alt: 'Producto y marca', cat: 'producto', alto: 'tall' },
  { src: 'assets/img/foto-producto-13.jpg', alt: 'Producto y marca', cat: 'producto', alto: 'tall' },
  { src: 'assets/img/foto-producto-14.jpg', alt: 'Producto y marca', cat: 'producto', alto: 'tall' },
  { src: 'assets/img/foto-producto-15.jpg', alt: 'Producto y marca', cat: 'producto' },
  { src: 'assets/img/foto-producto-16.jpg', alt: 'Producto y marca', cat: 'producto' },
  { src: 'assets/img/foto-producto-17.jpg', alt: 'Producto y marca', cat: 'producto', alto: 'tall' },
  { src: 'assets/img/foto-producto-18.jpg', alt: 'Producto y marca', cat: 'producto', alto: 'tall' },
  { src: 'assets/img/foto-producto-19.jpg', alt: 'Producto y marca', cat: 'producto', alto: 'tall' },
  { src: 'assets/img/foto-producto-20.jpg', alt: 'Producto y marca', cat: 'producto', alto: 'tall' },

  { src: 'assets/img/foto-lifestyle-1.jpg',  alt: 'Lifestyle', cat: 'lifestyle', alto: 'tall' },
  { src: 'assets/img/foto-lifestyle-2.jpg',  alt: 'Lifestyle', cat: 'lifestyle', alto: 'tall' },
  { src: 'assets/img/foto-lifestyle-3.jpg',  alt: 'Lifestyle', cat: 'lifestyle', alto: 'tall' },
  { src: 'assets/img/foto-lifestyle-4.jpg',  alt: 'Lifestyle', cat: 'lifestyle', alto: 'tall' },
  { src: 'assets/img/foto-lifestyle-5.jpg',  alt: 'Lifestyle', cat: 'lifestyle', alto: 'tall' },
  { src: 'assets/img/foto-lifestyle-6.jpg',  alt: 'Lifestyle', cat: 'lifestyle', alto: 'tall' },
  { src: 'assets/img/foto-lifestyle-7.jpg',  alt: 'Lifestyle', cat: 'lifestyle', alto: 'tall' },
  { src: 'assets/img/foto-lifestyle-8.jpg',  alt: 'Lifestyle', cat: 'lifestyle', alto: 'tall' },
  { src: 'assets/img/foto-lifestyle-9.jpg',  alt: 'Lifestyle', cat: 'lifestyle' },
  { src: 'assets/img/foto-lifestyle-10.jpg', alt: 'Lifestyle', cat: 'lifestyle', alto: 'tall' },
  { src: 'assets/img/foto-lifestyle-11.jpg', alt: 'Lifestyle', cat: 'lifestyle', alto: 'tall' },
  { src: 'assets/img/foto-lifestyle-12.jpg', alt: 'Lifestyle', cat: 'lifestyle', alto: 'tall' },
  { src: 'assets/img/foto-lifestyle-13.jpg', alt: 'Lifestyle', cat: 'lifestyle', alto: 'tall' },
  { src: 'assets/img/foto-lifestyle-14.jpg', alt: 'Lifestyle', cat: 'lifestyle', alto: 'tall' },
  { src: 'assets/img/foto-lifestyle-15.jpg', alt: 'Lifestyle', cat: 'lifestyle', alto: 'tall' },
  { src: 'assets/img/foto-lifestyle-16.jpg', alt: 'Lifestyle', cat: 'lifestyle', alto: 'tall' },
  { src: 'assets/img/foto-lifestyle-17.jpg', alt: 'Lifestyle', cat: 'lifestyle', alto: 'tall' },

  { src: 'assets/img/foto-detras-1.jpg', alt: 'Detrás de cámara', cat: 'detras', alto: 'tall' },
  { src: 'assets/img/foto-detras-2.jpg', alt: 'Detrás de cámara', cat: 'detras', alto: 'tall' },
  { src: 'assets/img/foto-detras-3.jpg', alt: 'Detrás de cámara', cat: 'detras', alto: 'tall' },
  { src: 'assets/img/foto-detras-4.jpg', alt: 'Detrás de cámara', cat: 'detras' },
  { src: 'assets/img/foto-detras-5.jpg', alt: 'Detrás de cámara', cat: 'detras', alto: 'tall' },
  { src: 'assets/img/foto-detras-6.jpg', alt: 'Detrás de cámara', cat: 'detras' },
  { src: 'assets/img/foto-detras-7.jpg', alt: 'Detrás de cámara', cat: 'detras', alto: 'tall' },
  { src: 'assets/img/foto-detras-8.jpg', alt: 'Detrás de cámara', cat: 'detras', alto: 'tall' },
  { src: 'assets/img/foto-detras-9.jpg', alt: 'Detrás de cámara', cat: 'detras' }
];

/* ---------------------------------------------------------
   PÁGINAS DE CORTO (plantilla 3a)
   trailer   → { id, hash } del trailer en Vimeo, o null
   stills    → imágenes del carrusel
   laureles  → imágenes de laurel (máximo 5 arriba)
   festivales→ lista de texto: crece sin límite
   --------------------------------------------------------- */
window.PROYECTOS = {
  'los-idiotas': {
    trailer: { id: '1222028126' },
    stills: [
      'assets/img/still-1.jpg', 'assets/img/still-2.jpg', 'assets/img/still-3.jpg',
      'assets/img/still-4.jpg', 'assets/img/still-5.jpg', 'assets/img/still-6.jpg'
    ],
    laureles: [
      { src: 'assets/img/laurel-shortsmx.png', alt: 'Shorts México 21 — Official Selection' },
      { src: 'assets/img/laurel-stuffmx.png',  alt: 'Official Selection — STUFF MX Film Festival 2026' },
      { src: 'assets/img/laurel-parana.png',   alt: 'Paraná Internacional Films Festival — Competición Oficial 2026' },
      { src: 'assets/img/laurel-fict.png',     alt: 'FICT 2026' }
    ],
    festivales: [
      { nombre: 'Shorts México 21',                  seccion: 'sec.oficial', anio: '2026' },
      { nombre: 'STUFF MX Film Festival',            seccion: 'sec.oficial', anio: '2026' },
      { nombre: 'Paraná Internacional Films Festival', seccion: 'sec.competicion', anio: '2026' },
      { nombre: 'FICT',                              seccion: null,          anio: '2026' }
    ]
  },
  'ximoquetza': {
    trailer: { id: '1222032706' },
    stills: [
      'assets/img/ximoquetza-still-1.jpg', 'assets/img/ximoquetza-still-2.jpg',
      'assets/img/ximoquetza-still-3.jpg', 'assets/img/ximoquetza-still-4.jpg',
      'assets/img/ximoquetza-still-5.jpg', 'assets/img/ximoquetza-still-6.jpg'
    ],
    laureles: [],
    festivales: []
  },
  'its-time-for-dinner': {
    trailer: { id: '1222202855' },
    stills: [
      'assets/img/itfd-still-1.jpg', 'assets/img/itfd-still-2.jpg', 'assets/img/itfd-still-3.jpg',
      'assets/img/itfd-still-4.jpg', 'assets/img/itfd-still-5.jpg', 'assets/img/itfd-still-6.jpg'
    ],
    laureles: [],
    festivales: []
  },
  'no-drugs-no-dancing': {
    // está completo en YouTube, no es sólo un trailer
    watchNow: true,
    trailer: { id: 'eFhPxxI-48A', provider: 'youtube' },
    stills: [
      'assets/img/ndnd-still-1.jpg', 'assets/img/ndnd-still-2.jpg',
      'assets/img/ndnd-still-3.jpg', 'assets/img/ndnd-still-4.jpg',
      'assets/img/ndnd-still-5.jpg'
    ],
    laureles: [],
    festivales: []
  },
  'their-circle': {
    trailer: { id: '1222852542' },
    stills: [
      'assets/img/tc-still-1.jpg', 'assets/img/tc-still-2.jpg', 'assets/img/tc-still-3.jpg',
      'assets/img/tc-still-4.jpg', 'assets/img/tc-still-5.jpg', 'assets/img/tc-still-6.jpg',
      'assets/img/tc-still-7.jpg', 'assets/img/tc-still-8.jpg', 'assets/img/tc-still-9.jpg',
      'assets/img/tc-still-10.jpg'
    ],
    laureles: [],
    festivales: []
  }
};
