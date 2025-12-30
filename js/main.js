/* main.js - navegação entre páginas e inicialização */
(async function(){
  const app = document.getElementById('app');
  const navButtons = document.querySelectorAll('.nav-btn');

  async function loadPage(page){
    const path = `pages/${page}.html`;
    const html = await window.utils.fetchPage(path);
    app.innerHTML = html;
    app.focus();
    // Se página é quiz, inicializar o quiz
    if(page === 'quiz' && typeof window.initQuiz === 'function'){
      window.initQuiz();
    }
  }

  function setActive(page){
    navButtons.forEach(btn=>{
      const is = btn.dataset.page === page;
      btn.classList.toggle('active', is);
      btn.setAttribute('aria-pressed', is ? 'true' : 'false');
    });
  }

  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('.nav-btn');
    if(btn){
      const page = btn.dataset.page;
      setActive(page);
      loadPage(page);
    }
    // Handlers para ações dentro do app
    const back = e.target.closest('#btn-back');
    if(back){
      setActive('home');
      loadPage('home');
    }
  });

  // Keyboard nav: numbers 1 and 2 to switch
  document.addEventListener('keydown', (e)=>{
    if(e.key === '1'){ setActive('home'); loadPage('home') }
    if(e.key === '2'){ setActive('quiz'); loadPage('quiz') }
  });

  // Carregar home por padrão
  setActive('home');
  await loadPage('home');

  // Expor função para navegação por outros scripts
  window.navigateTo = async function(page){ setActive(page); await loadPage(page) }
})();