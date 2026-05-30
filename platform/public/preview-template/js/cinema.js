// ============================================================
//  LoveFlix — Modo Cinema
//  Slideshow fullscreen com Ken Burns, captions, dots de
//  progresso, música YouTube, swipe mobile e teclado.
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const cfg = COUPLE_CONFIG;

  // Sai se o modo cinema está desativado no couple.js
  if (!cfg.cinema || !cfg.cinema.enabled) return;

  // ── Constantes ─────────────────────────────────────────────
  const INTERVAL  = cfg.cinema.autoplayInterval || 5500;
  const MUSIC_ID  = cfg.cinema.musicVideoId || '';
  const KB_ANIMS  = ['lf-kb-1', 'lf-kb-2', 'lf-kb-3', 'lf-kb-4'];
  const SLIDES    = cfg.moments;                 // reutiliza os momentos do casal

  let currentIndex = 0;
  let timer        = null;
  let musicOn      = false;

  const cinema       = document.getElementById('lf-cinema');
  const startScreen  = document.getElementById('lf-cinema-start');
  const startBg      = document.getElementById('lf-cinema-start-bg');
  const startBtn     = document.getElementById('lf-cinema-start-btn');
  const slidesEl     = document.getElementById('lf-cinema-slides');
  const dotsEl       = document.getElementById('lf-cinema-dots');
  const captionTitle = document.getElementById('lf-cinema-caption-title');
  const captionLabel = document.getElementById('lf-cinema-caption-label');
  const closeBtn     = document.getElementById('lf-cinema-close');
  const musicBtn     = document.getElementById('lf-cinema-music-btn');
  const audioFrame   = document.getElementById('lf-cinema-audio');
  const openBtn      = document.getElementById('lf-cinema-open-btn');
  const musicHint    = document.getElementById('lf-cinema-music-hint');

  function initCinema(cfg) {
    if (!cfg.cinema || !cfg.cinema.enabled) return;
    if (!cinema || !openBtn || !cfg.moments || !cfg.moments.length) return;

    window.INTERVAL  = cfg.cinema.autoplayInterval || 5500;
    window.MUSIC_ID  = cfg.cinema.musicVideoId || '';
    window.KB_ANIMS  = ['lf-kb-1', 'lf-kb-2', 'lf-kb-3', 'lf-kb-4'];
    window.SLIDES    = cfg.moments;

    if (startBg && window.SLIDES[0]) {
      startBg.style.backgroundImage = `url('${window.SLIDES[0].src}')`;
    }

    if (!window.MUSIC_ID) {
      if (musicBtn) musicBtn.style.display = 'none';
      if (musicHint) musicHint.style.display = 'none';
    } else {
      if (musicBtn) musicBtn.style.display = 'flex';
      if (musicHint) {
        musicHint.style.display = 'block';
        musicHint.textContent = '🎵 Com música de fundo';
      }
    }

    slidesEl.innerHTML = '';
    dotsEl.innerHTML = '';

    window.SLIDES.forEach((slide, i) => {
      const slideEl = document.createElement('div');
      slideEl.className = 'lf-cinema-slide';

      const img = document.createElement('img');
      img.src     = slide.src;
      img.alt     = slide.title || `Momento ${i + 1}`;
      img.loading = i === 0 ? 'eager' : 'lazy';
      img.dataset.kbAnim = window.KB_ANIMS[i % window.KB_ANIMS.length];

      slideEl.appendChild(img);
      slidesEl.appendChild(slideEl);

      const dot = document.createElement('div');
      dot.className = 'lf-cinema-dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('tabindex', '0');
      dot.setAttribute('aria-label', `Foto ${i + 1} de ${window.SLIDES.length}`);

      const fill = document.createElement('div');
      fill.className = 'lf-cinema-dot-fill';
      dot.appendChild(fill);

      dot.addEventListener('click',   () => jumpTo(i));
      dot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') jumpTo(i);
      });

      dotsEl.appendChild(dot);
    });
  }

  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'UPDATE_CONFIG') {
      window.COUPLE_CONFIG = event.data.config;
      initCinema(window.COUPLE_CONFIG);
    }
  });

  initCinema(COUPLE_CONFIG);

  // ── Funções de controle ──────────────────────────────────────

  /**
   * Exibe o slide no índice dado, com Ken Burns reiniciado.
   */
  function showSlide(index) {
    const slideEls = slidesEl.querySelectorAll('.lf-cinema-slide');
    const dotEls   = dotsEl.querySelectorAll('.lf-cinema-dot');

    // Remove estado ativo de todos os slides
    slideEls.forEach(s => s.classList.remove('active'));

    // Atualiza os dots
    dotEls.forEach((d, i) => {
      const f = d.querySelector('.lf-cinema-dot-fill');
      // Para a animação instantaneamente
      f.style.transitionDuration = '0ms';
      f.style.width = i < index ? '100%' : '0%';
      d.classList.toggle('done', i < index);
    });

    // Ativa o slide atual
    const activeSlide = slideEls[index];
    if (!activeSlide) return;
    activeSlide.classList.add('active');

    // Reinicia o Ken Burns
    const img      = activeSlide.querySelector('img');
    const kbDur    = ((INTERVAL + 1500) / 1000).toFixed(1) + 's';
    img.style.animation = 'none';
    img.offsetHeight;                                          // force reflow
    img.style.animation = `${img.dataset.kbAnim} ${kbDur} ease-in-out forwards`;

    // Caption
    const slide = window.SLIDES[index];
    if (captionTitle) captionTitle.textContent = slide.title || '';
    if (captionLabel) captionLabel.textContent = slide.label || '';

    // Dot ativo: anima o preenchimento pelo INTERVAL
    const activeDot = dotEls[index];
    if (activeDot) {
      const fill = activeDot.querySelector('.lf-cinema-dot-fill');
      fill.style.width = '0%';
      fill.offsetHeight;                                       // force reflow
      fill.style.transitionDuration = `${window.INTERVAL}ms`;
      fill.style.width = '100%';
    }

    currentIndex = index;
  }

  function nextSlide() {
    showSlide((currentIndex + 1) % window.SLIDES.length);
  }

  function prevSlide() {
    showSlide((currentIndex - 1 + window.SLIDES.length) % window.SLIDES.length);
  }

  function jumpTo(index) {
    clearInterval(timer);
    showSlide(index);
    timer = setInterval(nextSlide, window.INTERVAL);
  }

  function startCinema() {
    // Oculta a tela de início com fade
    startScreen.classList.add('hidden');

    // Começa do primeiro slide
    showSlide(0);
    timer = setInterval(nextSlide, window.INTERVAL);

    // Carrega o YouTube (muted por padrão — respeita mobile)
    if (window.MUSIC_ID) {
      audioFrame.src =
        `https://www.youtube.com/embed/${window.MUSIC_ID}` +
        `?autoplay=1&mute=1&loop=1&playlist=${window.MUSIC_ID}` +
        `&controls=0&enablejsapi=1&rel=0`;
    }
  }

  function closeCinema() {
    cinema.classList.remove('open');
    document.body.style.overflow = '';
    clearInterval(timer);

    // Para e limpa o áudio
    audioFrame.src = '';
    musicOn = false;
    if (musicBtn) {
      musicBtn.textContent = '🔇';
      musicBtn.classList.remove('music-on');
    }

    // Reseta para o estado inicial (tela de início visível)
    currentIndex = 0;
    startScreen.classList.remove('hidden');
    slidesEl.querySelectorAll('.lf-cinema-slide').forEach(s => s.classList.remove('active'));
    dotsEl.querySelectorAll('.lf-cinema-dot-fill').forEach(f => {
      f.style.transitionDuration = '0ms';
      f.style.width = '0%';
    });
    dotsEl.querySelectorAll('.lf-cinema-dot').forEach(d => d.classList.remove('done'));
  }

  function toggleMusic() {
    if (!window.MUSIC_ID) return;
    musicOn = !musicOn;

    if (musicOn) {
      // Unmute via YouTube postMessage API
      audioFrame.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'unMute', args: [] }),
        'https://www.youtube.com'
      );
      if (musicBtn) {
        musicBtn.textContent = '🎵';
        musicBtn.classList.add('music-on');
        musicBtn.setAttribute('aria-label', 'Desligar música');
      }
    } else {
      audioFrame.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'mute', args: [] }),
        'https://www.youtube.com'
      );
      if (musicBtn) {
        musicBtn.textContent = '🔇';
        musicBtn.classList.remove('music-on');
        musicBtn.setAttribute('aria-label', 'Ligar música');
      }
    }
  }

  // ── Event Listeners ──────────────────────────────────────────

  // Abre o modal
  openBtn.addEventListener('click', () => {
    cinema.classList.add('open');
    document.body.style.overflow = 'hidden';
    openBtn.blur();
  });

  // Start / Close / Music
  startBtn.addEventListener('click', startCinema);
  closeBtn.addEventListener('click', closeCinema);
  if (musicBtn) musicBtn.addEventListener('click', toggleMusic);

  // Clique no backdrop (fora do conteúdo) fecha — apenas na start screen
  cinema.addEventListener('click', (e) => {
    if (e.target === cinema && !startScreen.classList.contains('hidden')) {
      closeCinema();
    }
  });

  // Teclado
  document.addEventListener('keydown', (e) => {
    if (!cinema.classList.contains('open')) return;

    switch (e.key) {
      case 'Escape':
        closeCinema();
        break;
      case 'ArrowRight':
        clearInterval(timer);
        nextSlide();
        timer = setInterval(nextSlide, window.INTERVAL);
        break;
      case 'ArrowLeft':
        clearInterval(timer);
        prevSlide();
        timer = setInterval(nextSlide, window.INTERVAL);
        break;
    }
  });

  // ── Swipe para mobile ────────────────────────────────────────
  let touchStartX = 0;
  let touchStartY = 0;

  cinema.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  cinema.addEventListener('touchend', (e) => {
    // Ignora se a tela de início ainda está visível
    if (!startScreen.classList.contains('hidden')) return;

    const dx = touchStartX - e.changedTouches[0].screenX;
    const dy = Math.abs(touchStartY - e.changedTouches[0].screenY);

    // Swipe horizontal com pelo menos 50px e dominante sobre o vertical
    if (Math.abs(dx) > 50 && Math.abs(dx) > dy * 1.5) {
      clearInterval(timer);
      if (dx > 0) nextSlide(); else prevSlide();
      timer = setInterval(nextSlide, window.INTERVAL);
    }
  }, { passive: true });

});
