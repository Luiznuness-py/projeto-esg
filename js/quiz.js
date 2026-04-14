/* quiz.js - lógica do quiz e renderização dinâmica */
(function () {
  const { qs, formatPercent } = window.utils;

  // Pool completo — 10 aleatórios são selecionados por sessão
  const ALL_QUESTIONS = [
    /* ── Fundamentos ESG ── */
    { q: 'O que significa a sigla ESG?', options: ['Economia, Sustentabilidade e Governança', 'Ambiental, Social e Governança', 'Estratégia, Sustentabilidade e Governança', 'Energia, Saúde e Gestão'], answer: 1 },
    { q: 'Em que ano e em qual relatório o termo ESG foi cunhado?', options: ['"Our Common Future" (1987)', '"Who Cares Wins" (2004)', '"Agenda 21" (1992)', '"Brundtland Report" (2004)'], answer: 1 },
    { q: 'Qual das opções é uma prática do pilar Ambiental (E)?', options: ['Auditoria financeira', 'Gestão de resíduos e emissões', 'Política de RH', 'Assembleia de acionistas'], answer: 1 },
    { q: 'O que o pilar Social (S) prioriza?', options: ['Estratégia tributária', 'Direitos humanos e bem-estar dos colaboradores', 'Redução de emissões de carbono', 'Política de investimentos'], answer: 1 },
    { q: 'Qual é um benefício direto da implementação de ESG?', options: ['Aumento de multas ambientais', 'Redução de riscos operacionais e atração de investidores', 'Menos transparência corporativa', 'Isolamento do mercado global'], answer: 1 },
    { q: 'Qual das opções é uma prática típica de Governança (G)?', options: ['Remuneração alinhada, canais de denúncia e conselho independente', 'Uso de veículos elétricos na frota', 'Programas de reciclagem de resíduos', 'Educação ambiental comunitária'], answer: 0 },
    { q: 'Quando o mercado de carbono foi legalizado no Brasil?', options: ['Dezembro de 2023', 'Dezembro de 2024', 'Janeiro de 2025', 'Junho de 2022'], answer: 1 },
    { q: 'Qual norma brasileira é referência de ESG?', options: ['ISO 9001', 'ABNT NBR 2030', 'CLT', 'LGPD'], answer: 1 },
    { q: 'Quantos Objetivos de Desenvolvimento Sustentável (ODS) a ONU estabeleceu?', options: ['10', '15', '17', '20'], answer: 2 },
    { q: 'Qual o valor aproximado do mercado global de ativos ESG?', options: ['US$1 trilhão', 'US$50 trilhões', 'US$500 bilhões', 'US$5 trilhões'], answer: 1 },

    /* ── Frameworks e Padrões ── */
    { q: 'Qual framework ESG é o mais utilizado globalmente, presente em 73+ países?', options: ['TCFD', 'SASB', 'GRI (Global Reporting Initiative)', 'EU Taxonomia'], answer: 2 },
    { q: 'O que é o TCFD?', options: ['Um índice de ações sustentáveis', 'Task Force on Climate-related Financial Disclosures — reporte de riscos climáticos', 'Um tipo de certificação ambiental', 'Uma norma ISO de gestão de energia'], answer: 1 },
    { q: 'O SASB foi incorporado por qual organização em 2022?', options: ['GRI', 'ONU', 'ISSB / IFRS Foundation', 'Banco Mundial'], answer: 2 },
    { q: 'O ISE B3 é o índice de sustentabilidade de qual bolsa de valores?', options: ['NYSE', 'B3 (Brasil, Bolsa, Balcão)', 'Nasdaq', 'Bolsa de Frankfurt'], answer: 1 },
    { q: 'Qual norma ISO trata de Responsabilidade Social Organizacional?', options: ['ISO 9001', 'ISO 14001', 'ISO 26000', 'ISO 50001'], answer: 2 },
    { q: 'A EU Taxonomia estabelece quantos objetivos ambientais?', options: ['3', '4', '6', '8'], answer: 2 },
    { q: 'Qual é o foco principal da norma ISO 14001?', options: ['Segurança da informação', 'Sistema de Gestão Ambiental', 'Gestão da qualidade', 'Contabilidade sustentável'], answer: 1 },
    { q: 'Qual resolução da CVM estabeleceu exigências de reporte ESG para empresas brasileiras?', options: ['Resolução 193/2023', 'Resolução 100/2021', 'Resolução 40/2019', 'Resolução 250/2024'], answer: 0 },

    /* ── KPIs e Setores ── */
    { q: 'O que significa o indicador PUE em datacenters?', options: ['Percentual de Uso de Energia', 'Power Usage Effectiveness — mede eficiência energética', 'Potência Útil Estimada', 'Protocolo de Uso de Eletricidade'], answer: 1 },
    { q: 'O que são "emissões de Escopo 3" em ESG?', options: ['Emissões diretas das caldeiras da empresa', 'Emissões da energia elétrica comprada', 'Emissões indiretas da cadeia de valor (fornecedores e clientes)', 'Emissões de veículos da frota própria'], answer: 2 },
    { q: 'O que é o TRIR no setor industrial?', options: ['Taxa de Retorno de Investimento Renovável', 'Taxa de Incidência de Lesões — acidentes por 200.000 horas trabalhadas', 'Total de Resíduos Industriais Reciclados', 'Tempo de Resposta em Incidentes de Risco'], answer: 1 },
    { q: 'No setor financeiro, o que mede a "intensidade de carbono financiado"?', options: ['O consumo de energia dos escritórios do banco', 'tCO₂e por R$1 milhão emprestado/investido', 'O número de projetos verdes aprovados', 'A área de vegetação em torno das agências'], answer: 1 },

    /* ── Greenwashing e Boas Práticas ── */
    { q: 'O que é "greenwashing"?', options: ['Lavar equipamentos com energia solar', 'Comunicar práticas ambientais de forma enganosa ou exagerada', 'Pintar instalações industriais de verde', 'Usar lavagem a seco para reduzir água'], answer: 1 },
    { q: 'O que é "greenhushing"?', options: ['Tecnologia de captura de CO₂ silenciosa', 'Empresa com boas práticas ESG que opta por não as divulgar por medo de escrutínio', 'Programa de redução de ruído ambiental', 'Filtro para emissões de gases'], answer: 1 },
    { q: 'Qual atitude evita o greenwashing?', options: ['Usar apenas linguagem positiva no relatório', 'Definir metas SMART com asseguração independente', 'Publicar somente os dados favoráveis', 'Evitar qualquer menção a impactos negativos'], answer: 1 },

    /* ── Brasil e Futuro ── */
    { q: 'Qual é o principal índice ESG da bolsa brasileira B3?', options: ['IBOVESPA', 'ISE B3', 'IGCX', 'ICO2 B3'], answer: 1 },
    { q: 'Qual ano é a meta global para neutralidade carbônica (Acordo de Paris)?', options: ['2030', '2040', '2050', '2060'], answer: 2 },
    { q: 'Dados da McKinsey indicam que empresas no quartil superior de diversidade de gênero têm quantos % a mais de probabilidade de superar a rentabilidade de concorrentes?', options: ['10%', '15%', '25%', '40%'], answer: 2 },
    { q: 'Qual é o conceito de Economia Circular no contexto ESG?', options: ['Economia que gira em torno de um único setor', 'Eliminar resíduos pelo design, manter produtos em uso e regenerar sistemas naturais', 'Ciclo de créditos de carbono negociados na bolsa', 'Modelo econômico focado em produção contínua'], answer: 1 },
  ];

  const QUIZ_SIZE = 10;

  function pickQuestions() {
    const pool = ALL_QUESTIONS.slice();
    // Fisher-Yates shuffle, then take first QUIZ_SIZE
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, QUIZ_SIZE);
  }

  let QUESTIONS = pickQuestions();

  // Configuração de feedback por faixa de pontuação
  const SCORE_LEVELS = [
    { min: 90, cls: 'excellent', title: 'Excelente',         msg: pct => `Parabéns! Você acertou ${pct} das questões.` },
    { min: 70, cls: 'verygood',  title: 'Muito bom',         msg: pct => `Muito bom! Você obteve ${pct} de acerto.` },
    { min: 50, cls: 'good',      title: 'Bom',               msg: pct => `Bom trabalho — ${pct}. Recomendamos revisar alguns tópicos.` },
    { min:  0, cls: 'low',       title: 'Continue estudando', msg: pct => `Você obteve ${pct}. Tente novamente para melhorar seu desempenho.` }
  ];

  let state = {
    index: 0,
    answers: Array(QUESTIONS.length).fill(null)
  };

  function renderQuestion(container) {
    const qObj = QUESTIONS[state.index];
    qs('#question-text', container).textContent = qObj.q;

    const optionsEl = qs('#options', container);
    optionsEl.innerHTML = '';

    qObj.options.forEach((opt, i) => {
      const id = `q${state.index}-opt${i}`;

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'question-' + state.index;
      input.id = id;
      input.value = i;
      input.setAttribute('aria-labelledby', id + '-text');
      if (state.answers[state.index] === i) input.checked = true;

      input.addEventListener('change', () => {
        state.answers[state.index] = i;
        updateProgress(container);
        updateFinalizeState(container);
        setTimeout(() => {
          if (state.index < QUESTIONS.length - 1) {
            state.index++;
            renderQuestion(container);
          } else {
            showResult(container);
          }
        }, 500);
      });

      const radio = document.createElement('span');
      radio.className = 'radio-custom';

      const spanText = document.createElement('span');
      spanText.className = 'option-text';
      spanText.id = id + '-text';
      spanText.textContent = opt;

      const label = document.createElement('label');
      label.className = 'option-label';
      label.setAttribute('for', id);
      label.append(input, radio, spanText);

      optionsEl.appendChild(label);
    });

    qs('#q-index', container).textContent = `Pergunta ${state.index + 1} de ${QUESTIONS.length}`;

    const btnPrev = qs('#btn-prev', container);
    btnPrev.disabled = state.index === 0;
    btnPrev.onclick = () => {
      if (state.index > 0) { state.index--; renderQuestion(container); }
    };

    updateProgress(container);
    updateFinalizeState(container);
  }

  function updateProgress(container) {
    const answered = state.answers.filter(a => a !== null).length;
    const percent = (answered / QUESTIONS.length) * 100;
    const bar = qs('#progress-bar', container);
    if (bar) bar.style.width = percent + '%';
    const progressEl = qs('.progress', container);
    if (progressEl) progressEl.setAttribute('aria-valuenow', Math.round(percent));
  }

  function updateFinalizeState(container) {
    const finalizeBtn = qs('#btn-finalize', container);
    if (finalizeBtn) finalizeBtn.disabled = !state.answers.every(a => a !== null);
  }

  function showResult(container) {
    const correct = state.answers.reduce((acc, ans, i) => acc + (ans === QUESTIONS[i].answer ? 1 : 0), 0);
    const pctStr = formatPercent((correct / QUESTIONS.length) * 100);
    const level = SCORE_LEVELS.find(l => (correct / QUESTIONS.length) * 100 >= l.min);

    const scoreCircle = qs('#score-circle', container);
    scoreCircle.textContent = pctStr;
    scoreCircle.className = `score-circle ${level.cls}`;

    qs('#result-title', container).textContent = level.title;
    qs('#result-message', container).textContent = level.msg(pctStr);

    qs('#question-fieldset', container).hidden = true;
    qs('.quiz-controls', container).style.display = 'none';
    qs('#result', container).hidden = false;
  }

  function resetQuiz(container) {
    QUESTIONS = pickQuestions();
    state.index = 0;
    state.answers = Array(QUESTIONS.length).fill(null);
    qs('#question-fieldset', container).hidden = false;
    qs('#result', container).hidden = true;
    qs('.quiz-controls', container).style.display = '';
    qs('#progress-bar', container).style.width = '0%';
    renderQuestion(container);
  }

  window.initQuiz = function () {
    const container = document.getElementById('quiz-page');
    if (!container) return;
    qs('#btn-finalize', container).onclick = () => showResult(container);
    qs('#btn-retry', container).onclick = () => resetQuiz(container);
    qs('#btn-back', container).onclick = () => window.navigateTo('home');
    renderQuestion(container);
  };
})();
