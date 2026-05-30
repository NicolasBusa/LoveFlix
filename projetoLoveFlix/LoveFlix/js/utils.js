// ============================================================
//  LoveFlix — Utilitários Compartilhados
// ============================================================

/**
 * Calcula o tempo de relacionamento a partir da data de início.
 * @param {string} startDateStr - "AAAA-MM-DD"
 * @returns {string} ex: "6 anos e 1 mês"
 */
function calcRelationshipTime(startDateStr) {
  const start = new Date(startDateStr);
  const now   = new Date();

  let years  = now.getFullYear() - start.getFullYear();
  let months = now.getMonth()    - start.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  const yearStr  = years  === 1 ? "1 ano"       : `${years} anos`;
  const monthStr = months === 1 ? "1 mês"       : `${months} meses`;

  if (years === 0)  return monthStr;
  if (months === 0) return yearStr;
  return `${yearStr} e ${monthStr}`;
}

/**
 * Formata "AAAA-MM-DD" → "DD de Mês de AAAA"
 */
function formatDateBR(isoDate) {
  const months = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
  ];
  const [y, m, d] = isoDate.split('-').map(Number);
  return `${d} de ${months[m - 1]} de ${y}`;
}

/**
 * Verifica se o usuário está autenticado (sessionStorage).
 * Se não estiver, redireciona para index.html.
 */
function requireAuth() {
  if (!sessionStorage.getItem('lf_auth')) {
    window.location.replace('index.html');
  }
}

/**
 * Faz login — salva flag no sessionStorage.
 */
function setAuth() {
  sessionStorage.setItem('lf_auth', '1');
}

/**
 * Faz logout — remove flag e redireciona.
 */
function signOut() {
  sessionStorage.removeItem('lf_auth');
  window.location.replace('index.html');
}
