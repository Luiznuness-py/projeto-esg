/* main.js - navegação entre páginas e inicialização */
(async function () {
  const app = document.getElementById('app');
  const navButtons = document.querySelectorAll('.nav-btn');

  async function loadPage(page) {
    const html = await window.utils.fetchPage(`pages/${page}.html`);
    app.innerHTML = html;
    app.focus();
    if (page === 'home' && typeof window.initHome === 'function') {
      window.initHome();
    }
    if (page === 'quiz' && typeof window.initQuiz === 'function') {
      window.initQuiz();
    }
  }

  function setActive(page) {
    navButtons.forEach(btn => {
      const active = btn.dataset.page === page;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('.nav-btn');
    if (btn) { setActive(btn.dataset.page); loadPage(btn.dataset.page); }
    if (e.target.closest('#btn-back')) { setActive('home'); loadPage('home'); }
  });

  // Teclas 1 e 2 alternam entre páginas (ignorado em campos de texto)
  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea, select')) return;
    if (e.key === '1') { setActive('home'); loadPage('home'); }
    if (e.key === '2') { setActive('quiz'); loadPage('quiz'); }
  });

  setActive('home');
  await loadPage('home');

  window.navigateTo = async function (page) { setActive(page); await loadPage(page); };
})();
