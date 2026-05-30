// ============================================================
//  LoveFlix — Dashboard Home (home.html)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Protege a rota — sem login volta pro início
  requireAuth();

  const cfg = COUPLE_CONFIG;

  // ── Header dinâmico ──────────────────────────────────────
  const timeBadge = document.getElementById('lf-time-badge');
  if (timeBadge) {
    timeBadge.textContent = `❤️ ${calcRelationshipTime(cfg.startDate)} juntos`;
  }

  document.getElementById('lf-signout-btn')
    .addEventListener('click', signOut);

  // Header com fundo ao rolar
  const header = document.querySelector('.lf-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // ── Hero ─────────────────────────────────────────────────
  document.getElementById('lf-hero-img').src       = cfg.photos.hero;
  document.getElementById('lf-hero-img').alt       = cfg.coupleTitle;
  document.getElementById('lf-hero-title').textContent = cfg.coupleTitle;
  document.getElementById('lf-hero-bio').textContent   = cfg.bio;

  // Badges
  const badgeRow = document.getElementById('lf-hero-badge-row');
  cfg.badges.forEach(b => {
    const span = document.createElement('span');
    span.className = 'lf-hero-badge';
    span.textContent = b;
    badgeRow.appendChild(span);
  });

  // "Juntos desde X · Y tempo juntos"
  document.getElementById('lf-hero-together').innerHTML =
    `Juntos desde ${formatDateBR(cfg.startDate)} &nbsp;·&nbsp; ` +
    `<span>${calcRelationshipTime(cfg.startDate)}</span>`;

  // ── Lightbox ─────────────────────────────────────────────
  const lightbox    = document.getElementById('lf-lightbox');
  const lightboxImg = document.getElementById('lf-lightbox-img');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('lf-lightbox-close')
    .addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ── Renderiza Row de cards ────────────────────────────────
  function renderRow(containerId, items) {
    const row = document.getElementById(containerId);
    if (!row) return;

    items.forEach(item => {
      if (!item.src || item.src.trim() === '') return;

      const card = document.createElement('div');
      card.className = 'lf-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', item.title || item.label || 'Foto');

      card.innerHTML = `
        <img class="lf-card-img" src="${item.src}" alt="${item.title || ''}" loading="lazy">
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

  renderRow('lf-row-hot',     cfg.hot);
  renderRow('lf-row-moments', cfg.moments);

  // ── Abas ─────────────────────────────────────────────────
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

  // ── Popula conteúdo das abas ──────────────────────────────
  const tabsData = cfg.tabs;

  // Restaura a aba História com texto da configuração
  document.getElementById('panel-historia').querySelector('.lf-tab-text').textContent =
    tabsData.historia.content;

  // ── Nossa Linha do Tempo (row horizontal de cards) ──────────
  renderTimelineRow('lf-row-timeline', cfg.timeline || []);

  function renderTimelineRow(containerId, items) {
    const row = document.getElementById(containerId);
    if (!row || !items.length) return;

    items.forEach(item => {
      if (!item.src || item.src.trim() === '') return;

      const card = document.createElement('div');
      card.className = 'lf-tl-card';
      card.setAttribute('role', 'listitem');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `${item.date}: ${item.title}`);

      card.innerHTML = `
        <div class="lf-tl-card-img-wrap">
          <img class="lf-tl-card-img"
               src="${item.src}"
               alt="${item.title}"
               loading="lazy">
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

  document.getElementById('panel-momentos').querySelector('.lf-tab-text').textContent =
    tabsData.momentos.content;

  document.getElementById('panel-abracos').querySelector('.lf-tab-text').textContent =
    tabsData.abracosBeijos.content;

  document.getElementById('panel-cartas').querySelector('.lf-tab-text').textContent =
    tabsData.cartasDeAmor.content;

  // Aba Detalhes — lista de itens
  const detailsList = document.getElementById('lf-details-list');
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

  // ── Scroll Horizontal Botões ──────────────────────────────
  const wrappers = document.querySelectorAll('.lf-row-wrapper');
  wrappers.forEach(wrapper => {
    const row = wrapper.querySelector('.lf-row');
    const leftBtn = wrapper.querySelector('.lf-scroll-left');
    const rightBtn = wrapper.querySelector('.lf-scroll-right');
    
    if (!row || !leftBtn || !rightBtn) return;
    
    leftBtn.addEventListener('click', () => {
      // Valor de scroll, aproximadamente 1,5 cards
      row.scrollBy({ left: -320, behavior: 'smooth' });
    });
    
    rightBtn.addEventListener('click', () => {
      row.scrollBy({ left: 320, behavior: 'smooth' });
    });
  });
});
