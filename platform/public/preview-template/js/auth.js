// ============================================================
//  LoveFlix — Lógica de Autenticação (login.html)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const isPreview = window.location.search.includes('preview=1');

  // Se já autenticado, vai direto pro home (exceto em preview)
  if (!isPreview && sessionStorage.getItem('lf_auth')) {
    window.location.replace('home.html');
    return;
  }

  // --- Popula elementos com config do casal ---
  const avatarImg = document.getElementById('login-avatar-img');
  const cardTitle = document.getElementById('login-card-title');
  const cardSubtitle = document.getElementById('login-card-subtitle');

  if (avatarImg)  avatarImg.src = COUPLE_CONFIG.photos.profile;
  if (avatarImg)  avatarImg.alt = COUPLE_CONFIG.coupleTitle;
  if (cardTitle)  cardTitle.textContent = COUPLE_CONFIG.coupleTitle;
  if (cardSubtitle) {
    cardSubtitle.textContent =
      `Juntos desde ${formatDateBR(COUPLE_CONFIG.startDate)} 💑`;
  }

  // --- Input de data com máscara automática ---
  const input      = document.getElementById('login-date-input');
  const errorEl    = document.getElementById('login-error');
  const form       = document.getElementById('login-form');
  const loginPage  = document.querySelector('.login-page');

  input.addEventListener('input', applyDateMask);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleLogin();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleLogin();
  });

  function applyDateMask(e) {
    let v = e.target.value.replace(/\D/g, '');

    if (v.length > 8) v = v.slice(0, 8);

    if (v.length >= 5) {
      v = v.slice(0,2) + '/' + v.slice(2,4) + '/' + v.slice(4);
    } else if (v.length >= 3) {
      v = v.slice(0,2) + '/' + v.slice(2);
    }

    e.target.value = v;

    // Remove state de erro ao digitar
    input.classList.remove('error');
    errorEl.classList.remove('visible');
  }

  function handleLogin() {
    const value = input.value.trim(); // formato: DD/MM/AAAA

    if (value.length < 10) {
      showError('Insira a data completa (DD/MM/AAAA)');
      return;
    }

    // Converte DD/MM/AAAA → AAAA-MM-DD para comparação
    const [day, month, year] = value.split('/');
    const inputISO = `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}`;

    if (inputISO === (window.COUPLE_CONFIG || COUPLE_CONFIG).startDate) {
      // ✅ Sucesso
      setAuth();
      loginPage.classList.add('success-exit');
      setTimeout(() => window.location.replace('home.html'), 500);
    } else {
      // ❌ Erro
      showError('Data incorreta. Tente de novo ❤️');
    }
  }

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.classList.add('visible');
    input.classList.add('error');
    input.focus();
    // Remove a classe de animação para poder reaplicar
    setTimeout(() => input.classList.remove('error'), 600);
  }
});
