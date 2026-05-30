// ============================================================
//  LoveFlix — Share Feature
//  Dropdown menu → QR modal + Canvas Stories generator
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const cfg = COUPLE_CONFIG;

  // ── Elementos ─────────────────────────────────────────────
  const shareBtn    = document.getElementById('lf-share-btn');
  const shareMenu   = document.getElementById('lf-share-menu');
  const qrBtn       = document.getElementById('lf-share-qr-btn');
  const storiesBtn  = document.getElementById('lf-share-stories-btn');
  const storiesLbl  = document.getElementById('lf-stories-label');
  const qrModal     = document.getElementById('lf-qr-modal');
  const qrClose     = document.getElementById('lf-qr-modal-close');
  const qrImg       = document.getElementById('lf-qr-modal-qr');
  const qrUrlEl     = document.getElementById('lf-qr-modal-url');
  const qrCopy      = document.getElementById('lf-qr-modal-copy');
  const partnerName = document.getElementById('lf-qr-partner-name');

  if (!shareBtn || !shareMenu) return;

  // URL base para compartilhar (origin + raiz)
  const shareUrl = window.location.protocol + '//' + window.location.host + '/';

  // ──────────────────────────────────────────────────────────
  // 1. MENU DROPDOWN
  // ──────────────────────────────────────────────────────────

  shareBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = shareMenu.classList.toggle('open');
    shareBtn.setAttribute('aria-expanded', String(isOpen));
    shareMenu.setAttribute('aria-hidden', String(!isOpen));
  });

  // Fecha ao clicar fora
  document.addEventListener('click', () => {
    shareMenu.classList.remove('open');
    shareBtn.setAttribute('aria-expanded', 'false');
    shareMenu.setAttribute('aria-hidden', 'true');
  });

  // Fecha com Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && shareMenu.classList.contains('open')) {
      shareMenu.classList.remove('open');
      shareBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // ──────────────────────────────────────────────────────────
  // 2. MODAL QR CODE
  // ──────────────────────────────────────────────────────────

  qrBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openQrModal();
  });

  function openQrModal() {
    shareMenu.classList.remove('open');

    // Nome do parceiro: person2 (quem recebe o link)
    if (partnerName) partnerName.textContent = cfg.names.person2;

    // Gera o QR via API pública
    const encoded = encodeURIComponent(shareUrl);
    qrImg.src =
      `https://api.qrserver.com/v1/create-qr-code/` +
      `?size=320x320&data=${encoded}&color=141414&bgcolor=ffffff&margin=10`;

    // Mostra URL
    if (qrUrlEl) qrUrlEl.textContent = shareUrl;

    qrModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeQrModal() {
    qrModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  qrClose.addEventListener('click', closeQrModal);
  qrModal.addEventListener('click', (e) => {
    if (e.target === qrModal) closeQrModal();
  });

  // Copiar link
  qrCopy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // Fallback para navegadores sem Clipboard API
      const ta = document.createElement('textarea');
      ta.value = shareUrl;
      ta.style.position = 'fixed';
      ta.style.opacity  = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    qrCopy.textContent = '✅ Link copiado!';
    qrCopy.classList.add('copied');
    setTimeout(() => {
      qrCopy.innerHTML = '📋 Copiar Link';
      qrCopy.classList.remove('copied');
    }, 2500);
  });

  // ──────────────────────────────────────────────────────────
  // 3. STORIES — Canvas 9:16 generator
  // ──────────────────────────────────────────────────────────

  storiesBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    handleStories();
  });

  async function handleStories() {
    const original = storiesLbl ? storiesLbl.textContent : 'Compartilhar nos Stories';
    shareMenu.classList.remove('open');

    if (storiesLbl) storiesLbl.textContent = 'Gerando imagem…';
    storiesBtn.disabled = true;

    try {
      const blob = await generateStoryBlob();
      const file = new File([blob], 'loveflix-story.png', { type: 'image/png' });

      // Mobile com Web Share API (iOS Safari 15+, Android Chrome)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${cfg.coupleTitle} ❤️`,
          text:  'Nossa história de amor — LoveFlix'
        });
      } else {
        // Desktop / sem suporte: faz download
        downloadBlob(blob, 'loveflix-story.png');
        showToast('📸 Imagem salva! Envie para o Instagram para compartilhar nos Stories.');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('[LoveFlix] Erro ao gerar story:', err);
        showToast('Não foi possível gerar a imagem. Tente novamente.');
      }
    } finally {
      if (storiesLbl) storiesLbl.textContent = original;
      storiesBtn.disabled = false;
    }
  }

  // ── Canvas generator ───────────────────────────────────────
  async function generateStoryBlob() {
    // Aguarda fontes CSS carregadas
    await document.fonts.ready;

    const W = 1080;
    const H = 1920;
    const canvas = document.createElement('canvas');
    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    // 1. Fundo: hero photo em cover-fit
    await drawCoverImage(ctx, cfg.photos.hero, W, H);

    // 2. Gradientes escuros
    const topGrad = ctx.createLinearGradient(0, 0, 0, H * 0.38);
    topGrad.addColorStop(0,   'rgba(0,0,0,0.88)');
    topGrad.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, W, H * 0.38);

    const botGrad = ctx.createLinearGradient(0, H * 0.42, 0, H);
    botGrad.addColorStop(0,    'rgba(0,0,0,0)');
    botGrad.addColorStop(0.28, 'rgba(0,0,0,0.72)');
    botGrad.addColorStop(1,    'rgba(0,0,0,0.97)');
    ctx.fillStyle = botGrad;
    ctx.fillRect(0, H * 0.42, W, H * 0.58);

    // 3. LOVEFLIX — topo esquerdo
    ctx.save();
    ctx.textAlign  = 'left';
    ctx.fillStyle  = '#e50914';
    ctx.font       = "bold 78px 'Bebas Neue', 'Arial Black', sans-serif";
    ctx.letterSpacing = '6px';
    ctx.fillText('LOVEFLIX', 80, 138);
    ctx.restore();

    // 4. Bloco inferior
    const BY = H * 0.71;          // base y do bloco de texto

    // Ícone de coração
    ctx.textAlign = 'center';
    ctx.font      = '90px serif';
    ctx.fillText('❤️', W / 2, BY);

    // Título do casal
    ctx.fillStyle = '#ffffff';
    ctx.font      = "bold 108px 'Bebas Neue', 'Arial Black', sans-serif";
    ctx.fillText(cfg.coupleTitle, W / 2, BY + 148);

    // Badge de duração
    const duration  = calcRelationshipTime(cfg.startDate);
    const badgeText = `${duration} juntos`;
    ctx.font        = "bold 50px 'Inter', Arial, sans-serif";
    const badgeW    = ctx.measureText(badgeText).width + 80;
    const badgeH    = 80;
    const badgePY   = BY + 176;
    const badgeX    = (W - badgeW) / 2;
    drawRoundRect(ctx, badgeX, badgePY, badgeW, badgeH, 40);
    ctx.fillStyle   = 'rgba(229,9,20,0.88)';
    ctx.fill();
    ctx.fillStyle   = '#ffffff';
    ctx.fillText(badgeText, W / 2, badgePY + 57);

    // CTA principal
    ctx.font      = "52px 'Inter', Arial, sans-serif";
    ctx.fillStyle = 'rgba(255,255,255,0.80)';
    ctx.fillText('Descubra nossa história ❤️', W / 2, BY + 330);

    // Hint sutil
    ctx.font      = "38px 'Inter', Arial, sans-serif";
    ctx.fillStyle = 'rgba(255,255,255,0.40)';
    ctx.fillText('🔒 Apenas para nós dois', W / 2, BY + 400);

    return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  }

  // Desenha imagem com comportamento "cover"
  function drawCoverImage(ctx, src, W, H) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
        const dw = img.naturalWidth  * scale;
        const dh = img.naturalHeight * scale;
        const dx = (W - dw) / 2;
        const dy = (H - dh) / 2;
        ctx.drawImage(img, dx, dy, dw, dh);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  // Rect arredondado (fallback cross-browser)
  function drawRoundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y,     x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h,     x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y,         x + r, y);
    ctx.closePath();
  }

  // Download genérico de blob
  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a   = document.createElement('a');
    a.href     = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  // Toast de feedback
  function showToast(msg) {
    const t = document.createElement('div');
    t.className = 'lf-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('visible'));
    setTimeout(() => {
      t.classList.remove('visible');
      setTimeout(() => t.remove(), 400);
    }, 4000);
  }

});
