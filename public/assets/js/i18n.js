/* =========================================================
   ES | EN
   ---------------------------------------------------------
   Todo lo que se ve en pantalla sale de acá. En el HTML,
   un elemento con data-i18n="clave" toma su texto de este
   diccionario. El idioma queda guardado en el navegador.

   Los nombres propios (títulos de corto, nombres de personas,
   clientes) NO se traducen: van igual en los dos idiomas.
   ========================================================= */

window.I18N = {
  es: {
    /* --- nav / pie --- */
    'nav.home':      'Home',
    'nav.cine':      'Cine',
    'nav.post':      'Post',
    'nav.foto':      'Fotografía',
    'nav.sobre':     'Sobre mí',
    'nav.contacto':  'Contacto',
    'nav.volver':    '← Home',
    'foto.volver':   '← Cine',
    'nav.menu':      'Menú',
    'foot.role':     'Cinematógrafo · Fotógrafo · Editor · Colorista',
    'home.role.rest.mobile': 'Cinematografía · Editor · Colorista',

    /* --- sobre mí --- */
    'about.title':   'Sobre mí',
    'about.intro':   'Detrás de cámara y en la sala de edición — la misma mirada, dos momentos del mismo proceso.',
    'about.p1':      'Soy cinematógrafo y editor con más de seis años de experiencia en cine narrativo, publicidad y producción audiovisual. Egresado de Vancouver Film School, mi formación conecta el trabajo en set detrás de cámara con la posproducción de alto nivel.',
    'about.p2':      'Después de moverme constantemente entre la cámara y la sala de edición —colaborando con productoras como Cine Travieso, Violeta Films y Mainstream Media— abordo la cinematografía desde una mirada editorial: construyo encuadres con intención y un instinto claro para el ritmo, el movimiento y cómo cada toma sirve al corte final.',
    'about.base':    'Con base en Ciudad de México · Disponible para proyectos en cualquier parte del mundo.',
    'sec.perfil':    'Perfil',
    'f.rol':          'Rol',
    'f.educacion':    'Educación',
    'f.colaboraciones':'Colaboraciones',
    'f.base':         'Base',
    'f.disponibilidad':'Disponibilidad',
    'about.rolval':   'Cinematógrafo · Editor',
    'about.baseval':  'Ciudad de México',
    'about.dispval':  'Proyectos en cualquier parte del mundo',

    /* --- home --- */
    'home.post':      'Post',
    'home.post.sub':  'Color & Edición',
    'home.cine':      'Cine',
    'home.cine.sub':  'Cinematografía & Fotografía',
    'home.hint':      'Pasá el cursor sobre un lado',
    'home.hint.mobile': 'Arrastrá el logo para ver cada lado',
    'home.role.post': 'Colorista y Editor',
    'home.role.cine': 'Cinematógrafo',

    /* --- cine --- */
    'cine.title':     'Cinematografía',
    'cine.intro':     'Composición, luz y movimiento pensados para servir a la historia.',
    'sec.cortos':     'Narrativos',
    'sec.musical':    'Musical',
    'sec.moda':       'Moda',
    'sec.graduacion': 'Videos de Graduación',
    'sec.comercial':  'Comercial',
    'sec.digital':    'Digital · social media',
    'sec.foto':       'Fotografía',
    'cine.digital.note': 'Formato vertical y cuadrado: reels, TikTok, campañas de marca.',
    'cine.cortos.note':  'Sólo poster y título. El detalle vive dentro de la página del corto.',

    /* --- post --- */
    'post.title':     'Postproducción',
    'post.intro':     'Montaje, ritmo y color grading con precisión técnica y narrativa.',
    'sec.color':      'Color',
    'sec.edicion':    'Edición comercial',
    'sec.creditos':   'Créditos de post',
    'post.cortos.note': 'Los Idiotas aparece también en Cine, con crédito de fotografía. El enlace va a la misma página.',
    'ba.antes':       'Antes',
    'ba.despues':     'Después',

    /* --- fotografía --- */
    'foto.title':     'Fotografía',
    'foto.intro':     'Retrato, producto y marca, lifestyle y detrás de cámara.',
    'cat.todas':      'Todas',
    'cat.retrato':    'Retrato',
    'cat.producto':   'Producto y marca',
    'cat.lifestyle':  'Lifestyle',
    'cat.detras':     'Detrás de cámara',
    'cat.sinclasificar': 'Sin clasificar',

    /* --- corto (3a) --- */
    'proj.kicker':    'Cortometraje',
    'proj.trailer':   'ver trailer',
    'proj.watch':     'ver ahora',
    'proj.card.trailer': 'Trailer',
    'proj.card.still':   'Still',
    'sec.sinopsis':   'Sinopsis',
    'sec.ficha':      'Ficha técnica',
    'sec.festivales': 'Recorrido en festivales',
    'sec.stills':     'Stills',
    'sec.otros':      'Otros trabajos narrativos',
    'sec.oficial':    'Selección oficial',
    'sec.competicion':'Competición oficial',
    'laurel.more':    '+ los que caigan →',

    /* --- ficha técnica --- */
    'f.direccion':    'Guion, Producción y Dirección',
    'f.foto':         'Cinematografía y Edición',
    'f.arte':         'Diseño de Producción',
    'f.sonido':       'Diseño Sonoro',
    'f.anio':         'Año',
    'f.duracion':     'Duración',
    'f.reparto':      'Reparto',
    'f.presenta':     'Presenta Cine Travieso — Distribución Zul Films',
    'f.director':     'Dirección',
    'f.guion':        'Guion',
    'f.pais':         'País',
    'f.genero':       'Género',
    'f.produccion':   'Producción',
    'f.fotocolor':    'Fotografía y Color',
    'f.ayudantedir':  '1er Asistente de Dirección',

    /* --- roles de corto --- */
    'role.foto':      'Fotografía',
    'role.edicion':   'Edición',
    'role.cinematografo': 'Cinematógrafo',
    'role.editor':         'Editor',
    'role.colorista':      'Colorista',
    'role.camop':          'Cam Op',

    /* --- It's Time for Dinner --- */
    'itfd.sinopsis':  'Una madre recién divorciada intenta criar a su hija adolescente deprimida mientras ella misma atraviesa los cambios de su nueva vida y su propia salud mental. Lamentablemente, los monstruos en sus cabezas son muy reales.',

    /* --- No Drugs, No Dancing --- */
    'ndnd.sinopsis':  'Ambientada en un futuro distópico donde los humanos son mascotas de robots. Wallace desafía al sistema y se rebela contra su amo robot, Rupert, a través del baile y el consumo de drogas.',
    'idiotas.sinopsis': 'Sebastián Barragán, un hombre poderoso obsesionado por la culpa, reflexiona sobre el error que lo llevó a la caída: contratar a dos delincuentes incompetentes para robar un negocio local. Lo que comienza como un trabajo aparentemente sencillo se convierte rápidamente en una persecución absurda, un arresto inesperado y el colapso público de un hombre que ya no puede escapar a las consecuencias de su corrupción ni a los fantasmas de su pasado.',
    'ximoquetza.sinopsis': 'Julián, un soldado español durante la caída de Tenochtitlan, logra escapar de una emboscada por parte de guerreros aztecas. Topilli, un anciano curandero del área, rescata a Julián. Él le enseñará a cuestionar todo lo que alguna vez creyó ser verdad y a aprender a fundirse con la naturaleza para evitar ser rastreado por los guerreros que lo buscan para matarlo.',

    /* --- Their Circle --- */
    'circle.sinopsis': 'Cuando la realidad se vuelve insostenible, la mente es el único escape. Tras cruzar una línea sin retorno contra quien lo excluía, un joven revive sus últimos momentos en un viaje interno, eligiendo el encierro de sus pensamientos sobre el peso irreversible de la verdad.',

    /* --- llamadas --- */
    'cta.contacto':   'Contacto',
    'cta.ver':        'Ver',
    'cta.volver':     '← Volver al portfolio',

    /* --- contacto --- */
    'contact.title':       'Contacto',
    'contact.intro':       'Contame de tu proyecto — cinematografía, edición o color. Te respondo por mail.',
    'contact.nombre':      'Nombre',
    'contact.email':       'Email',
    'contact.tipo':        'Tipo de proyecto',
    'contact.tipo.cine':   'Cinematografía / fotografía',
    'contact.tipo.edicion':'Edición',
    'contact.tipo.color':  'Color',
    'contact.tipo.otro':   'Otro',
    'contact.mensaje':     'Contame de tu proyecto',
    'contact.enviar':      'Enviar',
    'contact.ok':          '¡Gracias! Te respondo pronto.',
    'contact.directo':     'Escribime directo',

    /* --- pendientes (siempre marcados como tales) --- */
    'p.pendiente':    'Pendiente',
    'p.sinopsis':     'Falta la sinopsis. Mandámela y la meto acá.',
    'p.trailer':      'Trailer pendiente — subilo a Vimeo y pasame el ID',
    'p.stills':       'Stills pendientes',
    'p.poster':       'Poster pendiente',
    'p.corto':        'El siguiente entra acá',
    'p.color':        'Par antes / después pendiente',
    'p.edicion':      'Clip de edición pendiente',
    'p.creditos':     'Créditos de post pendientes',
    'p.cats':         'Las fotos todavía no están repartidas en categorías. Decime cuál va en cuál y las acomodo.',
    'p.digital':      'Vertical o cuadrado pendiente',
    'p.otros':        'Otros trabajos pendientes',
    'p.intro':        'Texto de presentación pendiente',
    'p.fotos':        'fotos',
    'p.nofotos':      'sin clasificar todavía',

    /* --- controles del reel --- */
    'reel.pause':     'Pausar',
    'reel.play':      'Reproducir',
    'reel.mute':      'Silenciar',
    'reel.unmute':    'Activar sonido',
    'reel.fullscreen': 'Pantalla completa',
    'reel.exitfullscreen': 'Salir de pantalla completa'
  },

  en: {
    'nav.home':      'Home',
    'nav.cine':      'Film',
    'nav.post':      'Post',
    'nav.foto':      'Photography',
    'nav.sobre':     'About',
    'nav.contacto':  'Contact',
    'nav.volver':    '← Home',
    'foto.volver':   '← Film',
    'nav.menu':      'Menu',
    'foot.role':     'Cinematographer · Photographer · Editor · Colorist',
    'home.role.rest.mobile': 'Cinematography · Editor · Colorist',

    /* --- about --- */
    'about.title':   'About',
    'about.intro':   'Behind the camera and in the edit suite — one eye, two stages of the same process.',
    'about.p1':      'I\'m a cinematographer and editor with over six years of experience across narrative film, commercial, and audiovisual productions. A graduate of the Vancouver Film School, my background bridges both on-set camera work and high-end post-production.',
    'about.p2':      'Having worked extensively behind the camera and in the edit suite—collaborating with production companies like Cine Travieso, Violeta Films, and Mainstream Media—I approach cinematography through an editorial lens: crafting intentional frames with a sharp instinct for pacing, movement, and how every shot serves the final cut.',
    'about.base':    'Based in Mexico City · Available for worldwide projects.',
    'sec.perfil':    'Profile',
    'f.rol':          'Role',
    'f.educacion':    'Education',
    'f.colaboraciones':'Collaborations',
    'f.base':         'Based in',
    'f.disponibilidad':'Availability',
    'about.rolval':   'Cinematographer · Editor',
    'about.baseval':  'Mexico City',
    'about.dispval':  'Worldwide projects',

    'home.post':      'Post',
    'home.post.sub':  'Color & Editing',
    'home.cine':      'Film',
    'home.cine.sub':  'Cinematography & Photography',
    'home.hint':      'Hover over one side',
    'home.hint.mobile': 'Drag the logo to see each side',
    'home.role.post': 'Colorist and Editor',
    'home.role.cine': 'Cinematographer',

    'cine.title':     'Cinematography',
    'cine.intro':     'Composition, light, and movement crafted in service of the story.',
    'sec.cortos':     'Narrative',
    'sec.musical':    'Music',
    'sec.moda':       'Fashion',
    'sec.graduacion': 'Graduation Videos',
    'sec.comercial':  'Commercial',
    'sec.digital':    'Digital · social media',
    'sec.foto':       'Photography',
    'cine.digital.note': 'Vertical and square formats: reels, TikTok, brand campaigns.',
    'cine.cortos.note':  'Poster and title only. The detail lives inside the film page.',

    'post.title':     'Post-production',
    'post.intro':     'Editing, pacing, and color grading with technical and narrative precision.',
    'sec.color':      'Color',
    'sec.edicion':    'Commercial editing',
    'sec.creditos':   'Post credits',
    'post.cortos.note': 'Los Idiotas also appears under Film, credited for cinematography. Both links go to the same page.',
    'ba.antes':       'Before',
    'ba.despues':     'After',

    'foto.title':     'Photography',
    'foto.intro':     'Portrait, product and brand, lifestyle and behind the scenes.',
    'cat.todas':      'All',
    'cat.retrato':    'Portrait',
    'cat.producto':   'Product & brand',
    'cat.lifestyle':  'Lifestyle',
    'cat.detras':     'Behind the scenes',
    'cat.sinclasificar': 'Unsorted',

    'proj.kicker':    'Short film',
    'proj.trailer':   'watch trailer',
    'proj.card.trailer': 'Trailer',
    'proj.card.still':   'Still',
    'sec.sinopsis':   'Synopsis',
    'sec.ficha':      'Credits',
    'sec.festivales': 'Festival run',
    'sec.stills':     'Stills',
    'sec.otros':      'Other narrative work',
    'sec.oficial':    'Official selection',
    'sec.competicion':'Official competition',
    'laurel.more':    '+ more to come →',

    'f.direccion':    'Written, Produced and Directed by',
    'f.foto':         'Cinematography and Editing',
    'f.arte':         'Production Design',
    'f.sonido':       'Sound Design',
    'f.anio':         'Year',
    'f.duracion':     'Runtime',
    'f.reparto':      'Cast',
    'f.presenta':     'Presented by Cine Travieso — Distributed by Zul Films',
    'f.director':     'Director',
    'f.guion':        'Writer',
    'f.pais':         'Country',
    'f.genero':       'Genre',
    'f.produccion':   'Produced by',
    'f.fotocolor':    'Cinematography and Color',
    'f.ayudantedir':  '1st Assistant Director',

    'role.foto':      'Cinematography',
    'role.edicion':   'Editing',
    'role.cinematografo': 'Cinematographer',
    'role.editor':         'Editor',
    'role.colorista':      'Colorist',
    'role.camop':          'Cam Op',

    'itfd.sinopsis':  'A newly divorced mother struggles to raise her depressed teenage daughter while coping with the changes in her own life and mental state. Unfortunately, the monsters in their heads are very much real.',

    'ndnd.sinopsis':  'Set in a dystopian future, in which humans are pets to robots. Wallace defies the establishment and rebels against his robot overlord Rupert through the act of dance and the consumption of drugs.',
    'idiotas.sinopsis': 'Sebastián Barragán, a powerful man consumed by guilt, reflects on the mistake that led to his downfall: hiring two incompetent criminals to rob a local business. What begins as a seemingly simple job quickly spirals into an absurd chase, an unexpected arrest, and the public collapse of a man who can no longer escape the consequences of his corruption or the ghosts of his past.',
    'ximoquetza.sinopsis': 'Julian, a Spanish soldier during the fall of Tenochtitlan, manages to escape from an ambush by Aztec warriors. Topilli, an old healer from the area, rescues Julian. He will teach him to question everything he once believed to be true and to learn to blend in with nature to avoid being tracked by the warriors seeking to kill him.',
    'circle.sinopsis': "When reality becomes unbearable, the mind is the only escape. After crossing a point of no return against the one who excluded him, a young man relives his final moments in an inward journey, choosing the confinement of his thoughts over the irreversible weight of the truth.",

    'cta.contacto':   'Contact',
    'cta.ver':        'View',
    'cta.volver':     '← Back to portfolio',

    'contact.title':       'Contact',
    'contact.intro':       'Tell me about your project — cinematography, editing, or color. I\'ll reply by email.',
    'contact.nombre':      'Name',
    'contact.email':       'Email',
    'contact.tipo':        'Project type',
    'contact.tipo.cine':   'Cinematography / photography',
    'contact.tipo.edicion':'Editing',
    'contact.tipo.color':  'Color',
    'contact.tipo.otro':   'Other',
    'contact.mensaje':     'Tell me about your project',
    'contact.enviar':      'Send',
    'contact.ok':          'Thanks! I\'ll get back to you soon.',
    'contact.directo':     'Email me directly',

    'p.pendiente':    'Pending',
    'p.sinopsis':     'Synopsis still missing.',
    'p.trailer':      'Trailer pending — upload it to Vimeo and send me the ID',
    'p.stills':       'Stills pending',
    'p.poster':       'Poster pending',
    'p.corto':        'Next one goes here',
    'p.color':        'Before / after pair pending',
    'p.edicion':      'Editing clip pending',
    'p.creditos':     'Post credits pending',
    'p.cats':         'Photos are not sorted into categories yet.',
    'p.digital':      'Vertical or square pending',
    'p.otros':        'Other work pending',
    'p.intro':        'Intro text pending',
    'p.fotos':        'photos',
    'p.nofotos':      'not sorted yet',

    'reel.pause':     'Pause',
    'reel.play':      'Play',
    'reel.mute':      'Mute',
    'reel.unmute':    'Unmute',
    'reel.fullscreen': 'Fullscreen',
    'reel.exitfullscreen': 'Exit fullscreen'
  }
};

/* --------------------------------------------------------- */
window.i18n = (function () {
  var LANG_KEY = 'jgm-lang';
  var lang = 'es';

  try {
    var saved = localStorage.getItem(LANG_KEY);
    if (saved === 'es' || saved === 'en') lang = saved;
  } catch (e) { /* navegación privada: se queda en español */ }

  function t(key) {
    var d = window.I18N[lang] || window.I18N.es;
    if (key in d) return d[key];
    return window.I18N.es[key] !== undefined ? window.I18N.es[key] : key;
  }

  function apply(root) {
    var scope = root || document;
    Array.prototype.forEach.call(scope.querySelectorAll('[data-i18n]'), function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    Array.prototype.forEach.call(scope.querySelectorAll('[data-i18n-label]'), function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-label')));
    });
    if (!root) {
      document.documentElement.setAttribute('lang', lang);
      Array.prototype.forEach.call(document.querySelectorAll('.lang button'), function (b) {
        b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
      });
    }
  }

  function set(next) {
    if (next !== 'es' && next !== 'en') return;
    lang = next;
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* nada */ }
    apply();
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  return { t: t, apply: apply, set: set, get: function () { return lang; } };
})();
