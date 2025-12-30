/* quiz.js - lógica do quiz e renderização dinâmica */
(function(){
  const QUESTIONS = [
    {q: 'O que significa a sigla ESG?', options: ['Economia, Sustentabilidade e Governança','Ambiental, Social e Governança','Estratégia, Sustentabilidade e Governança','Energia, Saúde e Gestão'], answer:1},
    {q: 'Em que ano o termo ESG foi cunhado?', options: ['1999','2004','2015','2008'], answer:1},
    {q: 'Qual das opções é uma prática ambiental?', options: ['Auditoria financeira','Gestão de resíduos','Política de RH','Assembleia de acionistas'], answer:1},
    {q: 'O que o pilar social prioriza?', options: ['Estratégia tributária','Direitos humanos e bem-estar dos colaboradores','Redução de emissões','Política de investimentos'], answer:1},
    {q: 'Qual é um benefício claro da implementação de ESG?', options: ['Aumento de multas','Redução de riscos operacionais','Menos transparência','Isolamento de mercado'], answer:1},
    {q: 'Qual é uma prática de governança?', options: ['Remuneração alinhada e canais de denúncia','Uso de veículos elétricos','Programas de reciclagem','Educação comunitária'], answer:0},
    {q: 'Quando o mercado de carbono foi legalizado no Brasil (mencionado no site)?', options: ['Dezembro de 2023','Dezembro de 2024','Janeiro de 2025','Junho de 2022'], answer:1},
    {q: 'Qual norma brasileira é citada relacionada a ESG?', options: ['ISO 9001','ABNT NBR 2030','CLT','Lei Geral de Proteção de Dados'], answer:1},
    {q: 'Qual é o objetivo principal dos ODS (ONU)?', options: ['Aumentar lucros a qualquer custo','Promover desenvolvimento sustentável e equidade','Regular o mercado financeiro','Diminuir exportações'], answer:1},
    {q: 'Qual o valor aproximado do mercado global ESG mencionado?', options: ['US$1 trilhão','US$50 trilhões','US$500 milhões','US$5 trilhões'], answer:1}
  ];

  // Estado do quiz
  let state = {
    index:0,
    answers: Array(QUESTIONS.length).fill(null)
  };

  function $(sel, ctx=document){ return ctx.querySelector(sel) }
  function $all(sel, ctx=document){ return Array.from(ctx.querySelectorAll(sel)) }

  function renderQuestion(container){
    const qObj = QUESTIONS[state.index];
    const qText = $('#question-text', container);
    const optionsEl = $('#options', container);
    qText.textContent = qObj.q;
    optionsEl.innerHTML = '';

    qObj.options.forEach((opt, i)=>{
      const id = `q${state.index}-opt${i}`;
      const label = document.createElement('label');
      label.className = 'option-label';
      label.setAttribute('for', id);

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'question-'+state.index;
      input.id = id;
      input.value = i;
      input.setAttribute('aria-labelledby', id+'-text');

      const radio = document.createElement('span');
      radio.className = 'radio-custom';

      const spanText = document.createElement('span');
      spanText.className = 'option-text';
      spanText.id = id+'-text';
      spanText.textContent = opt;

      // Restore selection if exists
      if(state.answers[state.index] === i) input.checked = true;

      // Handler
      input.addEventListener('change', ()=>{
        state.answers[state.index] = i;
        updateProgress();
        updateFinalizeState(container);
        // Auto-avançar
        setTimeout(()=>{
          if(state.index < QUESTIONS.length -1){
            state.index++;
            renderQuestion(container);
          } else {
            // completo: mostrar botão finalizar ativo e também auto-submeter
            showResult(container);
          }
        }, 500);
      });

      label.appendChild(input);
      label.appendChild(radio);
      label.appendChild(spanText);
      optionsEl.appendChild(label);
    });

    // Atualizar numeração
    $('#q-index', container).textContent = `Pergunta ${state.index+1} de ${QUESTIONS.length}`;

    // Prev button
    const btnPrev = $('#btn-prev', container);
    btnPrev.disabled = state.index === 0;
    btnPrev.onclick = ()=>{
      if(state.index > 0){ state.index--; renderQuestion(container) }
    }

    updateProgress();
    updateFinalizeState(container);
  }

  function updateProgress(){
    const answered = state.answers.filter(a=> a !== null).length;
    const percent = (answered / QUESTIONS.length) * 100;
    const bar = document.getElementById('progress-bar');
    if(bar) bar.style.width = percent + '%';
    const progressEl = document.querySelector('.progress');
    if(progressEl) progressEl.setAttribute('aria-valuenow', Math.round(percent));
  }

  function updateFinalizeState(container){
    const allAnswered = state.answers.every(a=> a !== null);
    const finalizeBtn = $('#btn-finalize', container);
    if(finalizeBtn) finalizeBtn.disabled = !allAnswered;
  }

  function showResult(container){
    // Calcula score
    let correct = 0;
    state.answers.forEach((ans, i)=>{ if(ans === QUESTIONS[i].answer) correct++ });
    const percent = (correct / QUESTIONS.length) * 100;

    // Atualiza UI
    const result = $('#result', container);
    const scoreCircle = $('#score-circle', container);
    const title = $('#result-title', container);
    const msg = $('#result-message', container);

    scoreCircle.textContent = Math.round(percent) + '%';
    // classes
    scoreCircle.className = 'score-circle';
    if(percent >= 90) scoreCircle.classList.add('excellent');
    else if(percent >= 70) scoreCircle.classList.add('verygood');
    else if(percent >= 50) scoreCircle.classList.add('good');
    else scoreCircle.classList.add('low');

    if(percent >= 90){ title.textContent = 'Excelente'; msg.textContent = `Parabéns! Você teve ${Math.round(percent)}% de acerto.` }
    else if(percent >= 70){ title.textContent = 'Muito bom'; msg.textContent = `Muito bom! Você obteve ${Math.round(percent)}% de acerto.` }
    else if(percent >= 50){ title.textContent = 'Bom'; msg.textContent = `Bom trabalho — ${Math.round(percent)}%. Recomendamos revisar alguns tópicos.` }
    else { title.textContent = 'Continue estudando'; msg.textContent = `Você obteve ${Math.round(percent)}%. Tente novamente para melhorar seu desempenho.` }

    // Mostrar resultado
    $('#question-fieldset').hidden = true;
    $('.quiz-controls').style.display = 'none';
    result.hidden = false;
  }

  function resetQuiz(container){
    state.index = 0; state.answers = Array(QUESTIONS.length).fill(null);
    $('#question-fieldset', container).hidden = false;
    $('#result', container).hidden = true;
    $('.quiz-controls').style.display = '';
    $('#progress-bar').style.width = '0%';
    renderQuestion(container);
  }

  // Inicializa quando a página for carregada dentro do app
  window.initQuiz = function(){
    const container = document.getElementById('quiz-page');
    if(!container) return;
    // Bind finaliza
    const finalizeBtn = $('#btn-finalize', container);
    finalizeBtn.onclick = ()=> showResult(container);

    $('#btn-retry', container).onclick = ()=> resetQuiz(container);
    $('#btn-back', container).onclick = ()=> window.navigateTo('home');

    renderQuestion(container);
  }
})();