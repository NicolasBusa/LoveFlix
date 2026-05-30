// ============================================================
//  LoveFlix — Dashboard Home (home.html)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Protege a rota — sem login volta pro início
  requireAuth();

  // Ouve atualizações via postMessage
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'UPDATE_CONFIG') {
      window.COUPLE_CONFIG = event.data.config;
      renderDashboard(window.COUPLE_CONFIG);
    }
  });

  renderDashboard(COUPLE_CONFIG);

  function renderDashboard(cfg) {
    // ── Header dinâmico ──────────────────────────────────────
    const timeBadge = document.getElementById('lf-time-badge');
    if (timeBadge) {
      timeBadge.textContent = `❤️ ${calcRelationshipTime(cfg.startDate)} juntos`;
    }

    // ── Hero ─────────────────────────────────────────────────
    const heroImg = document.getElementById('lf-hero-img');
    heroImg.src = cfg.photos.hero;
    heroImg.alt = cfg.coupleTitle;
    if (cfg.photos.heroPosition) heroImg.style.objectPosition = cfg.photos.heroPosition;
    document.getElementById('lf-hero-title').textContent = cfg.coupleTitle;
    document.getElementById('lf-hero-bio').textContent   = cfg.bio;

    // Badges
    const badgeRow = document.getElementById('lf-hero-badge-row');
    badgeRow.innerHTML = ''; // Clear before re-render
    if (cfg.badges) {
      cfg.badges.forEach(b => {
        const span = document.createElement('span');
        span.className = 'lf-hero-badge';
        span.textContent = b;
        badgeRow.appendChild(span);
      });
    }

    // "Juntos desde X · Y tempo juntos"
    document.getElementById('lf-hero-together').innerHTML =
      `Juntos desde ${formatDateBR(cfg.startDate)} &nbsp;·&nbsp; ` +
      `<span>${calcRelationshipTime(cfg.startDate)}</span>`;

    // ── Lightbox (only setup once but we'll clear listeners if needed or just keep it) ──
    const lightbox    = document.getElementById('lf-lightbox');
    const lightboxImg = document.getElementById('lf-lightbox-img');

    function openLightbox(src, alt) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    // ── Renderiza Row de cards ────────────────────────────────
    function renderRow(containerId, items) {
      const row = document.getElementById(containerId);
      if (!row) return;
      row.innerHTML = ''; // Clear before re-render

      items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'lf-card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', item.title || item.label || 'Foto');

        const pos = item.objectPosition ? `style="object-position:${item.objectPosition}"` : '';
        card.innerHTML = `
          <img class="lf-card-img" src="${item.src}" alt="${item.title || ''}" loading="lazy" ${pos}>
          <div class="lf-card-overlay">
            <p class="lf-card-title">${item.title || ''}</p>
            ${item.label ? `<p class="lf-card-label">${item.label}</p>` : ''}
          </div>
        `;

        const openFn = () => openLightbox(item.src, item.title);
        card.addEventListener('click', openFn);
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') openFn();
        });

        row.appendChild(card);
      });
    }

    renderRow('lf-row-hot',     cfg.hot || []);
    renderRow('lf-row-moments', cfg.moments || []);

    // ── Popula conteúdo das abas ──────────────────────────────
    const tabsData = cfg.tabs;

    if (tabsData) {
      const pHistoria = document.getElementById('panel-historia');
      if (pHistoria) pHistoria.querySelector('.lf-tab-text').textContent = tabsData.historia?.content || '';

      const pMomentos = document.getElementById('panel-momentos');
      if (pMomentos) pMomentos.querySelector('.lf-tab-text').textContent = tabsData.momentos?.content || '';

      const pAbracos = document.getElementById('panel-abracos');
      if (pAbracos) pAbracos.querySelector('.lf-tab-text').textContent = tabsData.abracosBeijos?.content || '';

      const pCartas = document.getElementById('panel-cartas');
      if (pCartas) pCartas.querySelector('.lf-tab-text').textContent = tabsData.cartasDeAmor?.content || '';

      // Aba Detalhes — lista de itens
      const detailsList = document.getElementById('lf-details-list');
      if (detailsList && tabsData.detalhes?.items) {
        detailsList.innerHTML = ''; // Clear before re-render
        tabsData.detalhes.items.forEach(item => {
          const startDate = formatDateBR(cfg.startDate);
          // Substitui placeholder da data se necessário
          const value = item.value.replace('{{startDate}}', startDate);

          const li = document.createElement('div');
          li.className = 'lf-detail-item';
          li.innerHTML = `
            <span class="lf-detail-icon">${item.icon}</span>
            <div>
              <div class="lf-detail-label">${item.label}</div>
              <div class="lf-detail-value">${value}</div>
            </div>
          `;
          detailsList.appendChild(li);
        });
      }
    }

    // ── Nossa Linha do Tempo (row horizontal de cards) ──────────
    function renderTimelineRow(containerId, items) {
      const row = document.getElementById(containerId);
      if (!row) return;
      row.innerHTML = ''; // clear first
      if (!items.length) return;

      items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'lf-tl-card';
        card.setAttribute('role', 'listitem');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `${item.date}: ${item.title}`);

        const tlPos = item.objectPosition ? `style="object-position:${item.objectPosition}"` : '';
        card.innerHTML = `
          <div class="lf-tl-card-img-wrap">
            <img class="lf-tl-card-img"
                 src="${item.src}"
                 alt="${item.title}"
                 loading="lazy" ${tlPos}>
            <span class="lf-tl-card-icon" aria-hidden="true">${item.icon}</span>
          </div>
          <div class="lf-tl-card-info">
            <span class="lf-tl-card-date">${item.date}</span>
            <h3  class="lf-tl-card-title">${item.title}</h3>
            <p   class="lf-tl-card-desc">${item.description}</p>
          </div>
        `;

        const openFn = () => openLightbox(item.src, item.title);
        card.addEventListener('click', openFn);
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') openFn();
        });

        row.appendChild(card);
      });
    }

    renderTimelineRow('lf-row-timeline', cfg.timeline || []);
  }

  // Lightbox close listeners only need to be attached once
  const lightbox    = document.getElementById('lf-lightbox');
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  const closeBtn = document.getElementById('lf-lightbox-close');
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Header com fundo ao rolar
  const header = document.querySelector('.lf-header');
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  const signoutBtn = document.getElementById('lf-signout-btn');
  if (signoutBtn) signoutBtn.addEventListener('click', signOut);

  // Abas
  const tabs   = document.querySelectorAll('.lf-tab');
  const panels = document.querySelectorAll('.lf-tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const target = document.getElementById(`panel-${tab.dataset.tab}`);
      if (target) target.classList.add('active');
    });
  });
});
