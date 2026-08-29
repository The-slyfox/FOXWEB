/* =========================================================
   Jose Gutierrez-Moyano — comportamiento
   Home (1b) · Cine (4a) · Post (4a) · Corto (3a)
   ========================================================= */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var t  = function (k) { return window.i18n.t(k); };
  var esc = function (x) {
    return String(x).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var renderers = [];  /* se vuelven a correr al cambiar de idioma */

  var PLAY =
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="11" fill="rgba(0,0,0,.3)" stroke="#fff" stroke-width="1.3"></circle>' +
    '<path d="M10 8.3l6.2 3.7-6.2 3.7V8.3z" fill="#fff"></path></svg>';

  function isYouTube(v) { return !!v && v.provider === 'youtube'; }
  function vimeoUrl(v) { return 'https://vimeo.com/' + v.id + (v.hash ? '/' + v.hash : ''); }

  function playerSrc(v, opts) {
    opts = opts || '';
    if (isYouTube(v)) {
      var yq = 'autoplay=1&rel=0&modestbranding=1&playsinline=1';
      if (opts.indexOf('muted=1') > -1) yq += '&mute=1';
      if (opts.indexOf('loop=1') > -1) yq += '&loop=1&playlist=' + encodeURIComponent(v.id);
      if (opts.indexOf('background=1') > -1) yq += '&controls=0';
      return 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.id) + '?' + yq;
    }
    var p = 'title=0&byline=0&portrait=0&badge=0&autopause=0' +
            (v.hash ? '&h=' + encodeURIComponent(v.hash) : '') + opts;
    return 'https://player.vimeo.com/video/' + encodeURIComponent(v.id) + '?' + p;
  }

  /* miniatura: oEmbed de Vimeo, o el thumbnail directo de YouTube */
  function loadThumb(v, img) {
    if (isYouTube(v)) {
      img.onload = function () { img.classList.add('is-loaded'); };
      img.src = 'https://img.youtube.com/vi/' + encodeURIComponent(v.id) + '/hqdefault.jpg';
      return;
    }
    fetch('https://vimeo.com/api/oembed.json?url=' + encodeURIComponent(vimeoUrl(v)) + '&width=960')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (d && d.thumbnail_url) {
          img.onload = function () { img.classList.add('is-loaded'); };
          img.src = d.thumbnail_url;
        }
      })
      .catch(function () { /* sin miniatura */ });
  }

  /* abre el reproductor grande con `v` al hacer click */
  function embedOnClick(el, v, onClick) {
    el.addEventListener('click', function (e) {
      if (onClick) onClick(e);
      openVideoLightbox(v);
    });
  }

  /* ------------------------------------------------------
     Tarjeta de video: miniatura + play, iframe recién al click
     ------------------------------------------------------ */
  function videoCard(v, extraClass) {
    var el = document.createElement('button');
    el.type = 'button';
    el.className = 'vcard' + (extraClass ? ' ' + extraClass : '');
    if (v.ratio) el.style.aspectRatio = v.ratio;
    el.setAttribute('aria-label', v.t);
    el.innerHTML =
      '<img class="vthumb" alt="" aria-hidden="true">' +
      '<span class="vplay">' + PLAY + '</span>' +
      '<span class="vcap">' + esc(v.t) + '</span>';

    loadThumb(v, $('.vthumb', el));
    embedOnClick(el, v);

    return el;
  }

  /* tarjeta de "otro corto" para Otros trabajos narrativos — mismo
     poster completo que usa Narrativos, más en qué sección(es) del
     sitio aparece (Cine / Post / las dos) */
  function otroCortoCard(c) {
    var el = document.createElement('a');
    el.className = 'short';
    el.href = c.pagina;
    var donde = c.puerta === 'ambas' ? (t('nav.cine') + ' · ' + t('nav.post'))
              : c.puerta === 'cine' ? t('nav.cine') : t('nav.post');
    el.innerHTML =
      '<span class="short-art">' +
        (c.poster ? '<img loading="lazy" src="' + esc(c.poster) + '" alt="' + esc(c.t) + '">'
                  : '<span class="pending-box" style="height:100%">' + esc(t('p.poster')) + '</span>') +
      '</span>' +
      '<span class="short-name">' + esc(c.t) + '</span>' +
      '<span class="short-role">' + esc(donde) + '</span>';
    return el;
  }

  function pendingBox(key, cls) {
    var d = document.createElement('div');
    d.className = 'pending-box' + (cls ? ' ' + cls : '');
    d.textContent = t(key);
    return d;
  }

  /* ------------------------------------------------------
     NAV — menú móvil, idioma, fondo sólido al bajar
     ------------------------------------------------------ */
  function initNav() {
    var nav = $('.site-nav');
    if (!nav) return;

    var toggle = $('.nav-toggle', nav);
    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(open));
      });
    }

    $$('.lang button', nav).forEach(function (b) {
      b.addEventListener('click', function () { window.i18n.set(b.dataset.lang); });
    });

    if (nav.classList.contains('on-dark')) {
      var onScroll = function () { nav.classList.toggle('is-solid', window.scrollY > 60); };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  /* ------------------------------------------------------
     HOME (1b) — dos puertas, sin scroll
     En reposo no hay video. El cursor abre un lado y arranca
     SU video; el otro se cierra y vuelve a fondo plano.
     ------------------------------------------------------ */
  function initDoors() {
    var doors = $('#doors');
    if (!doors || !window.PUERTAS) return;

    var post = $('.door-post', doors);
    var cine = $('.door-cine', doors);
    var REST = '50%', OPEN = '82%';
    var mobile = window.matchMedia('(max-width:820px)');
    var current = null;

    /* fondo fijo de cada puerta — el video lo tapa al abrir, no hace falta crossfade */
    var postStill = $('.door-still', post), cineStill = $('.door-still', cine);
    if (postStill && window.PUERTAS.post.still) postStill.src = window.PUERTAS.post.still;
    if (cineStill && window.PUERTAS.cine.still) cineStill.src = window.PUERTAS.cine.still;

    /* el rol del centro cambia según el lado que está abierto */
    var roleEl = $('.door-mark .role', doors);
    function setRole(side) {
      if (!roleEl) return;
      roleEl.setAttribute('data-i18n', side ? 'home.role.' + side : 'foot.role');
      window.i18n.apply(roleEl.parentElement);
    }

    function mount(door, cfg) {
      if ($('iframe', door)) return;
      var holder = $('.door-video', door);
      holder.innerHTML =
        '<iframe src="' + playerSrc(cfg, '&background=1&autoplay=1&loop=1&muted=1') +
        '" tabindex="-1" aria-hidden="true" allow="autoplay" frameborder="0"></iframe>';
    }
    function unmount(door) { $('.door-video', door).innerHTML = ''; }

    function open(side) {
      if (current === side) return;
      current = side;
      var on  = side === 'post' ? post : cine;
      var off = side === 'post' ? cine : post;
      doors.style.setProperty('--split', side === 'post' ? OPEN : (100 - parseFloat(OPEN)) + '%');
      on.classList.add('is-open');   on.classList.remove('is-closed');
      off.classList.remove('is-open'); off.classList.add('is-closed');
      mount(on, window.PUERTAS[side]);
      unmount(off);
      setRole(side);
    }

    function rest() {
      current = null;
      doors.style.setProperty('--split', REST);
      [post, cine].forEach(function (d) {
        d.classList.remove('is-open', 'is-closed');
        unmount(d);
      });
      setRole(null);
    }

    /* escritorio: manda el cursor */
    [['post', post], ['cine', cine]].forEach(function (pair) {
      pair[1].addEventListener('mouseenter', function () {
        if (!mobile.matches) open(pair[0]);
      });
      pair[1].addEventListener('focusin', function () {
        if (!mobile.matches) open(pair[0]);
      });
    });
    doors.addEventListener('mouseleave', function () { if (!mobile.matches) rest(); });

    /* móvil: no hay cursor — corre el video de la mitad que entra en pantalla */
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (!mobile.matches) return;
        entries.forEach(function (e) {
          var side = e.target === post ? 'post' : 'cine';
          if (e.isIntersecting && e.intersectionRatio > 0.55) {
            e.target.classList.add('is-open');
            mount(e.target, window.PUERTAS[side]);
          } else {
            e.target.classList.remove('is-open');
            unmount(e.target);
          }
        });
      }, { threshold: [0, 0.55, 1] });
      io.observe(post); io.observe(cine);
    }

    mobile.addEventListener('change', rest);
    rest();
  }

  /* ------------------------------------------------------
     CINE — reel de apertura + pausa/mute
     ------------------------------------------------------ */
  function initReel() {
    var host = $('#reel');
    if (!host || !window.REEL) return;
    host.insertAdjacentHTML('afterbegin',
      '<iframe src="' + playerSrc(window.REEL, '&background=1&autoplay=1&loop=1&muted=1') +
      '" title="' + esc(window.REEL.t) + '" allow="autoplay; fullscreen"></iframe>');
    initReelControls(host);
  }

  function initReelControls(host) {
    var iframe = $('iframe', host);
    var playBtn = $('#reelPlayToggle', host);
    var muteBtn = $('#reelMuteToggle', host);
    if (!iframe || !playBtn || !muteBtn || !window.Vimeo) return;

    var player = new window.Vimeo.Player(iframe);
    var playing = true, muted = true;  // coincide con autoplay=1&muted=1 del iframe

    function syncPlay() { playBtn.setAttribute('data-i18n-label', playing ? 'reel.pause' : 'reel.play'); window.i18n.apply(playBtn.parentElement); }
    function syncMute() { muteBtn.setAttribute('data-i18n-label', muted ? 'reel.unmute' : 'reel.mute'); window.i18n.apply(muteBtn.parentElement); }
    syncPlay(); syncMute();

    playBtn.addEventListener('click', function () {
      playing = !playing;
      (playing ? player.play() : player.pause()).catch(function () {});
      syncPlay();
    });
    muteBtn.addEventListener('click', function () {
      muted = !muted;
      player.setMuted(muted).catch(function () {});
      syncMute();
    });
  }

  /* ------------------------------------------------------
     Cortometrajes (tarjeta poster + título + rol)
     ------------------------------------------------------ */
  function shortCard(c, puerta) {
    var isVideo = !c.pagina && c.video;
    var tag = document.createElement(c.pagina ? 'a' : (isVideo ? 'button' : 'div'));
    tag.className = 'short';
    if (c.pagina) tag.href = c.pagina;
    if (isVideo) tag.type = 'button';

    var meta = [];
    if (c.anio) meta.push(esc(c.anio));
    if (c.roles && c.roles.length) meta.push(c.roles.map(function (k) { return esc(t(k)); }).join(', '));
    var also = (c.puerta === 'ambas')
      ? ' <span class="also">· ' + esc(t(puerta === 'cine' ? 'nav.post' : 'nav.cine')) + ' →</span>'
      : '';

    tag.innerHTML =
      '<span class="short-art">' +
        (c.poster ? '<img loading="lazy" src="' + esc(c.poster) + '" alt="' + esc(c.t) + '">'
                  : '<span class="pending-box" style="height:100%">' + esc(t('p.poster')) + '</span>') +
      '</span>' +
      '<span class="short-name">' + esc(c.t) + '</span>' +
      '<span class="short-role">' + (meta.join(' · ') || esc(t('p.pendiente'))) + also + '</span>';

    /* sin página propia — el poster reproduce el video ahí mismo */
    if (isVideo) embedOnClick($('.short-art', tag), c.video, function (e) { e.preventDefault(); });

    return tag;
  }

  function renderShorts(hostSel, puerta) {
    var host = $(hostSel);
    if (!host || !window.CORTOS) return;
    host.innerHTML = '';
    window.CORTOS
      .filter(function (c) { return c.puerta === puerta || c.puerta === 'ambas'; })
      .forEach(function (c) { host.appendChild(shortCard(c, puerta)); });
  }

  /* ------------------------------------------------------
     Secciones de video (Musical / Moda / Comercial) — compartido
     entre Cine (todo) y Post (sólo lo que Jose editó).
     grid:'strip' → una sola línea con scroll horizontal.
     ------------------------------------------------------ */
  function renderVideoSections(hostSel, sections, filterFn) {
    var host = $(hostSel);
    if (!host || !sections) return;
    host.innerHTML = '';
    sections.forEach(function (s) {
      var videos = s.videos.filter(filterFn);
      if (!videos.length) return;
      var sec = document.createElement('section');
      sec.className = 'sec';
      var h = document.createElement('h2');
      h.className = 'sec-title';
      h.textContent = t(s.key);
      sec.appendChild(h);
      var grid = document.createElement('div');
      grid.className = s.grid === 'strip' ? 'strip'
                      : s.grid === 'strip-h' ? 'strip strip-h'
                      : ('vgrid ' + s.grid);
      videos.forEach(function (v) { grid.appendChild(videoCard(v)); });
      sec.appendChild(grid);
      host.appendChild(sec);
    });
  }

  function renderDigitalStrip(hostSel, filterFn) {
    var strip = $(hostSel);
    if (!strip || !window.CINE_DIGITAL) return;
    strip.innerHTML = '';
    var videos = window.CINE_DIGITAL.filter(filterFn);
    videos.forEach(function (v) { strip.appendChild(videoCard(v)); });
    if (!videos.length) strip.appendChild(pendingBox('p.digital'));
  }

  var showAll = function () { return true; };
  var wasEdited = function (v) { return v.edited === true; };
  /* onlyPost:true → editado por Jose pero nunca lo fotografió/dirigió,
     así que en Cine no aparece, sólo en Post */
  var showInCine = function (v) { return !v.onlyPost; };

  /* ------------------------------------------------------
     CINE — Musical/Moda/Comercial, tira digital, y Graduación
     (esta última en su propio contenedor, antes de Fotografía)
     ------------------------------------------------------ */
  function renderCine() {
    renderVideoSections('#cineSecciones', window.CINE_SECCIONES, showInCine);
    renderDigitalStrip('#cineDigital', showInCine);
    renderVideoSections('#cineGraduacion',
      [{ key: 'sec.graduacion', grid: 'vgrid-3', videos: window.CINE_GRADUACION || [] }],
      showAll);
  }

  /* ------------------------------------------------------
     Categorías de fotografía (tarjetas dentro de Cine)
     ------------------------------------------------------ */
  function renderCats() {
    var host = $('#fotoCats');
    if (!host || !window.FOTO_CATEGORIAS) return;
    host.innerHTML = '';
    window.FOTO_CATEGORIAS.forEach(function (c) {
      var n = (window.FOTOS || []).filter(function (f) { return f.cat === c.key; }).length;
      var a = document.createElement('a');
      a.className = 'cat';
      a.href = 'fotografia.html?cat=' + encodeURIComponent(c.key);
      a.innerHTML =
        '<img loading="lazy" src="' + esc(c.cover) + '" alt="">' +
        '<span class="cat-label">' + esc(t(c.i18n)) +
          '<span class="cat-count">' + (n ? n + ' ' + esc(t('p.fotos')) : esc(t('p.nofotos'))) + '</span>' +
        '</span>';
      host.appendChild(a);
    });
  }

  /* ------------------------------------------------------
     POST — slider antes/después + clips de edición
     ------------------------------------------------------ */
  function baSlider(pair) {
    var el = document.createElement('div');
    el.className = 'ba';
    el.innerHTML =
      '<img class="before" src="' + esc(pair.antes) + '" alt="">' +
      '<img class="after" src="' + esc(pair.despues) + '" alt="">' +
      '<span class="ba-tag l" data-i18n="ba.antes">' + esc(t('ba.antes')) + '</span>' +
      '<span class="ba-tag r" data-i18n="ba.despues">' + esc(t('ba.despues')) + '</span>' +
      '<span class="ba-handle" role="separator" aria-label="' + esc(t('ba.antes')) + ' / ' + esc(t('ba.despues')) + '"></span>';

    var move = function (clientX) {
      var b = el.getBoundingClientRect();
      var pct = Math.min(100, Math.max(0, ((clientX - b.left) / b.width) * 100));
      el.style.setProperty('--x', pct + '%');
    };
    var down = false;
    el.addEventListener('pointerdown', function (e) { down = true; move(e.clientX); el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointermove', function (e) { if (down) move(e.clientX); });
    el.addEventListener('pointerup',   function () { down = false; });
    el.addEventListener('pointercancel', function () { down = false; });
    return el;
  }

  /* el par activo se mantiene aunque se vuelva a renderizar (cambio de idioma) */
  var colorActive = 0;

  function renderColorBig() {
    var big = $('#postColorBig');
    if (!big) return;
    big.innerHTML = '';
    var list = window.POST_COLOR || [];
    if (list.length) {
      big.appendChild(baSlider(list[colorActive] || list[0]));
    } else {
      var ph = document.createElement('div');
      ph.className = 'ba is-placeholder';
      ph.innerHTML =
        '<span class="ba-handle" aria-hidden="true"></span>' +
        '<span class="ba-tag l">' + esc(t('ba.antes')) + '</span>' +
        '<span class="ba-tag r">' + esc(t('ba.despues')) + '</span>' +
        '<span class="pending" style="position:absolute;left:50%;top:26%;transform:translateX(-50%)">' +
          esc(t('p.color')) + '</span>';
      big.appendChild(ph);
    }
  }

  /* carrusel de miniaturas — siempre muestran el still "después" (con
     color); al hacer click, ese par se vuelve el slider grande de arriba */
  function renderColorCarousel() {
    var row = $('#postColorRow');
    if (!row) return;
    row.innerHTML = '';
    var list = window.POST_COLOR || [];
    if (!list.length) {
      for (var i = 0; i < 3; i++) {
        var b = pendingBox('p.color');
        b.style.aspectRatio = '16/9';
        row.appendChild(b);
      }
      return;
    }
    list.forEach(function (pair, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'color-thumb' + (i === colorActive ? ' is-active' : '');
      btn.setAttribute('aria-label', t('ba.despues') + ' ' + (i + 1));
      btn.innerHTML = '<img loading="lazy" src="' + esc(pair.despues) + '" alt="">';
      btn.addEventListener('click', function () {
        if (colorActive === i) return;
        colorActive = i;
        renderColorBig();
        $$('.color-thumb', row).forEach(function (th, ti) { th.classList.toggle('is-active', ti === i); });
      });
      row.appendChild(btn);
    });
  }

  function renderPost() {
    renderColorBig();
    renderColorCarousel();

    /* mismas secciones que Cine (Musical, Moda, Comercial, Digital —
       sin Graduación, que es sólo de Cine), mostrando sólo lo que
       Jose editó — una sola fuente de verdad en CINE_SECCIONES/
       CINE_DIGITAL (campo `edited`) */
    renderVideoSections('#postSecciones', window.CINE_SECCIONES, wasEdited);
    renderDigitalStrip('#postDigital', wasEdited);
  }

  /* ------------------------------------------------------
     FOTOGRAFÍA — chips + mosaico
     ------------------------------------------------------ */
  function renderFoto() {
    var chipHost = $('#fotoChips');
    var grid = $('#fotoMosaico');
    if (!grid || !window.FOTOS) return;

    var params = new URLSearchParams(location.search);
    var active = params.get('cat') || 'todas';

    function counts(key) {
      if (key === 'todas') return window.FOTOS.length;
      if (key === 'sin') return window.FOTOS.filter(function (f) { return !f.cat; }).length;
      return window.FOTOS.filter(function (f) { return f.cat === key; }).length;
    }

    if (chipHost) {
      chipHost.innerHTML = '';
      var list = [{ key: 'todas', i18n: 'cat.todas' }]
        .concat(window.FOTO_CATEGORIAS)
        .concat([{ key: 'sin', i18n: 'cat.sinclasificar' }]);
      list.forEach(function (c) {
        var n = counts(c.key);
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'chip' + (n === 0 ? ' is-empty' : '');
        b.textContent = t(c.i18n) + (n ? ' (' + n + ')' : '');
        b.setAttribute('aria-pressed', String(c.key === active));
        b.addEventListener('click', function () {
          active = c.key;
          history.replaceState(null, '', c.key === 'todas' ? location.pathname : '?cat=' + c.key);
          renderFoto();
        });
        chipHost.appendChild(b);
      });
    }

    var shown = window.FOTOS.filter(function (f) {
      if (active === 'todas') return true;
      if (active === 'sin') return !f.cat;
      return f.cat === active;
    });

    grid.innerHTML = '';
    shown.forEach(function (f) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'mo' + (f.alto === 'tall' ? ' tall' : '');
      b.innerHTML = '<img loading="lazy" src="' + esc(f.src) + '" alt="' + esc(f.alt) + '">';
      b.addEventListener('click', function () { openLightbox(f.src, f.alt); });
      grid.appendChild(b);
    });

    var note = $('#fotoNota');
    if (note) note.textContent = window.FOTOS.some(function (f) { return f.cat; }) ? '' : t('p.cats');
  }

  /* ------------------------------------------------------
     CORTO (3a) — laureles, carrusel, festivales
     ------------------------------------------------------ */
  function renderProyecto() {
    var root = $('#proj');
    if (!root || !window.PROYECTOS) return;
    var p = window.PROYECTOS[root.dataset.slug];
    if (!p) return;

    /* mis créditos en este corto — mismo dato que usan las tarjetas
       de Narrativos, para no tener que repetirlo a mano por página */
    var credit = $('#projCredit');
    if (credit) {
      var corto = (window.CORTOS || []).filter(function (c) { return c.slug === root.dataset.slug; })[0];
      credit.textContent = (corto && corto.roles && corto.roles.length)
        ? corto.roles.map(function (k) { return t(k); }).join(' · ')
        : '';
    }

    /* laureles: máximo 5 arriba, la fila envuelve */
    var lr = $('#laureles');
    if (lr) {
      lr.innerHTML = '';
      p.laureles.slice(0, 5).forEach(function (l) {
        lr.insertAdjacentHTML('beforeend',
          '<img loading="lazy" src="' + esc(l.src) + '" alt="' + esc(l.alt) + '">');
      });
      lr.insertAdjacentHTML('beforeend',
        '<span class="laurel-more">' + esc(t('laurel.more')) + '</span>');
    }

    /* botón "ver trailer" pegado al título — activo sólo si hay trailer.
       Si el corto ya está completo (no sólo un adelanto), dice "ver ahora". */
    var trailerLink = $('.proj-trailer-link');
    if (trailerLink) {
      trailerLink.classList.toggle('soon', !p.trailer);
      var watchKey = p.watchNow ? 'proj.watch' : 'proj.trailer';
      trailerLink.setAttribute('data-i18n', watchKey);
      trailerLink.textContent = t(watchKey);
    }

    /* carrusel del hero: trailer + stills juntos, como siempre —
       esto es lo que ve desktop. En mobile, un CSS aparte oculta acá
       las stills (deja sólo el trailer) porque ahí se muestran en su
       propia sección más abajo, después de festivales. */
    var car = $('#carrusel');
    if (car) {
      car.innerHTML = '';
      if (p.trailer) {
        var tr = document.createElement('button');
        tr.type = 'button';
        tr.className = 'ccard is-trailer';
        tr.innerHTML =
          '<img class="vthumb" alt="" aria-hidden="true">' +
          '<span class="big-play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7V5z" fill="currentColor"/></svg></span>' +
          '<span class="ccard-tag"><span class="rule"></span><span class="t">' + esc(t(p.watchNow ? 'proj.watch' : 'proj.card.trailer')) + '</span>' +
          '<span class="s">' + esc(root.dataset.name || '') + '</span></span>';
        loadThumb(p.trailer, $('.vthumb', tr));
        $('.vthumb', tr).classList.add('is-loaded');
        var playTrailer = function () { openVideoLightbox(p.trailer); };
        tr.addEventListener('click', playTrailer);
        car.appendChild(tr);

        if (trailerLink) {
          trailerLink.addEventListener('click', function (e) {
            e.preventDefault();
            playTrailer();
          });
        }
      } else {
        var ph = document.createElement('div');
        ph.className = 'ccard is-trailer is-pending';
        ph.textContent = t('p.trailer');
        car.appendChild(ph);
      }

      if (p.stills.length) {
        p.stills.forEach(function (src) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'ccard ccard-still';
          b.innerHTML = '<img loading="lazy" src="' + esc(src) + '" alt="">';
          b.addEventListener('click', function () { openLightbox(src, ''); });
          car.appendChild(b);
        });
      } else {
        var s = document.createElement('div');
        s.className = 'ccard ccard-still is-pending';
        s.textContent = t('p.stills');
        car.appendChild(s);
      }
    }

    /* flechas del hero */
    $$('#projNav button').forEach(function (b) {
      b.addEventListener('click', function () {
        var card = $('.ccard', car);
        var step = card ? card.getBoundingClientRect().width + 14 : 280;
        car.scrollBy({ left: b.dataset.dir === 'next' ? step : -step, behavior: 'smooth' });
      });
    });

    /* misma lista de stills, de nuevo, para la sección propia que
       sólo se ve en mobile (después de festivales) — .has-stills
       controla si esa sección se muestra ahí; en desktop queda
       oculta siempre por CSS, sin importar esta clase */
    var stillsSec = $('#stillsSec');
    var stillsCar = $('#stillsCarrusel');
    if (stillsCar) {
      stillsCar.innerHTML = '';
      if (p.stills.length) {
        if (stillsSec) stillsSec.classList.add('has-stills');
        p.stills.forEach(function (src) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'ccard';
          b.innerHTML = '<img loading="lazy" src="' + esc(src) + '" alt="">';
          b.addEventListener('click', function () { openLightbox(src, ''); });
          stillsCar.appendChild(b);
        });
        $$('#stillsNav button').forEach(function (b) {
          b.addEventListener('click', function () {
            var card = $('.ccard', stillsCar);
            var step = card ? card.getBoundingClientRect().width + 14 : 280;
            stillsCar.scrollBy({ left: b.dataset.dir === 'next' ? step : -step, behavior: 'smooth' });
          });
        });
      } else if (stillsSec) {
        stillsSec.classList.remove('has-stills');
      }
    }

    /* festivales: lista de texto, crece sin límite — si no hay
       recorrido todavía, se quita la sección entera (nada de
       placeholder acá: no todos los cortos van a festivales) */
    var fh = $('#festivales');
    if (fh) {
      var fSec = fh.closest('.sec');
      if (!p.festivales.length) {
        if (fSec) fSec.style.display = 'none';
      } else {
        if (fSec) fSec.style.display = '';
        fh.innerHTML = '';
        p.festivales.forEach(function (f) {
          fh.insertAdjacentHTML('beforeend',
            '<div class="fest"><span class="f-name">' + esc(f.nombre) + '</span>' +
            '<span class="f-sec">' + (f.seccion ? esc(t(f.seccion)) : '') + '</span>' +
            '<span class="f-year">' + esc(f.anio || '') + '</span></div>');
        });
      }
    }

    /* otros trabajos narrativos — sólo los demás cortos, con su
       poster completo y en qué sección(es) del sitio aparecen */
    var otros = $('#otros');
    if (otros) {
      otros.innerHTML = '';
      (window.CORTOS || [])
        .filter(function (c) { return c.pagina && c.slug !== root.dataset.slug; })
        .forEach(function (c) { otros.appendChild(otroCortoCard(c)); });
    }
  }

  /* ------------------------------------------------------
     Lightbox
     ------------------------------------------------------ */
  var lb, lbImg;
  function openLightbox(src, alt) {
    if (!lb) {
      lb = document.createElement('div');
      lb.className = 'lightbox';
      lb.innerHTML = '<button class="lightbox-close" aria-label="Cerrar">&times;</button><img alt="">';
      document.body.appendChild(lb);
      lbImg = $('img', lb);
      lb.addEventListener('click', function (e) {
        if (e.target === lb || e.target.classList.contains('lightbox-close')) closeLightbox();
      });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });
    }
    lbImg.src = src; lbImg.alt = alt || '';
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lb) return;
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  /* reproductor grande — se abre al hacer click en cualquier video del sitio */
  var vlb, vlbFrame;
  function openVideoLightbox(v) {
    if (!v) return;
    if (!vlb) {
      vlb = document.createElement('div');
      vlb.className = 'lightbox lightbox-video';
      vlb.innerHTML = '<button class="lightbox-close" aria-label="Cerrar">&times;</button><div class="lightbox-video-frame"></div>';
      document.body.appendChild(vlb);
      vlbFrame = $('.lightbox-video-frame', vlb);
      vlb.addEventListener('click', function (e) {
        if (e.target === vlb || e.target.classList.contains('lightbox-close')) closeVideoLightbox();
      });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeVideoLightbox(); });
    }
    vlbFrame.innerHTML = '<iframe src="' + playerSrc(v, '&autoplay=1') + '" title="' + esc(v.t || '') +
                         '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    vlb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeVideoLightbox() {
    if (!vlb) return;
    vlb.classList.remove('is-open');
    vlbFrame.innerHTML = '';  // corta la reproducción
    document.body.style.overflow = '';
  }

  /* ------------------------------------------------------ */
  function renderAll() {
    renderShorts('#cineCortos', 'cine');
    renderShorts('#postCortos', 'post');
    renderCine();
    renderCats();
    renderPost();
    renderFoto();
    renderProyecto();
  }

  /* ------------------------------------------------------
     Carrusel de miniaturas de Color (Post) — flechas para moverlo,
     porque el scrollbar nativo va oculto (sin arrastre con mouse:
     eso competía con el click de las miniaturas y lo bloqueaba)
     ------------------------------------------------------ */
  function initColorCarousel() {
    var row = $('#postColorRow');
    var nav = $('#colorNav');
    if (!row || !nav) return;
    $$('button', nav).forEach(function (b) {
      b.addEventListener('click', function () {
        var card = $('.color-thumb', row);
        var step = card ? card.getBoundingClientRect().width + 12 : 160;
        row.scrollBy({ left: b.dataset.dir === 'next' ? step : -step, behavior: 'smooth' });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    window.i18n.apply();
    initNav();
    initDoors();
    initReel();
    renderAll();
    initColorCarousel();
  });

  document.addEventListener('langchange', function () {
    renderAll();
    window.i18n.apply();
  });
})();
