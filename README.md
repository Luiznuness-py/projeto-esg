# Projeto ESG — Aplicação Web Educacional

Aplicação web educacional sobre **ESG** (Ambiental, Social e Governança) desenvolvida como APS para a UNIP — Universidade Paulista (RA: G957AD3).

---

## Funcionalidades

### Página "O que é ESG"
- Diagrama de Venn interativo com os três pilares (E, S, G)
- Strip de estatísticas animadas (US$ 50T, 17 ODS, mercado de carbono)
- Cards dos três pilares com descrições detalhadas
- Benefícios e panorama do ESG no Brasil (milestones)
- Seção de Desafios e Oportunidades com listas visuais
- Timeline do futuro do ESG (2025 → 2030 → 2050)
- Ilustração SVG de **arquitetura sustentável** (edifício com painéis solares e jardim vertical)
- Ilustração SVG de **equipe diversa** (DEI — Diversidade, Equidade e Inclusão)

### Frameworks e Padrões ESG (abas interativas)
Seis abas com conteúdo completo sobre cada framework:
- **GRI** — Global Reporting Initiative (padrão mais adotado mundialmente)
- **SASB / ISSB** — IFRS S1 e S2 (materialidade financeira)
- **TCFD** — Task Force on Climate-related Financial Disclosures (4 pilares)
- **EU Taxonomia** — 6 objetivos ambientais, Regulamento UE 2020/852
- **ISE B3** — Índice de Sustentabilidade Empresarial (4º índice ESG do mundo, 2005), ICO2 B3, IGCX, 7 dimensões avaliadas
- **ISO** — ISO 26000, ISO 14001, ISO 45001, ISO 50001 e ABNT NBR 2030

### KPIs ESG por Setor (abas interativas)
Indicadores-chave de desempenho para 5 setores:
- Financeiro, Industrial, Tecnologia, Energia, Setor Público

### Outras seções
- **Processo de Reporte ESG** — 6 etapas (Diagnóstico → Materialidade → Coleta → Análise → Publicação → Verificação)
- **Riscos de Greenwashing e Greenhushing** — sinais de alerta e como evitar
- **Checklist interativo** — 14 itens com barra de progresso em tempo real
- **Ferramentas ESG** — SoftExpert, Workiva, IBM Envizi, Greenly, Power BI, TOTVS

### Quiz Interativo
- Banco de **30 questões** cobrindo fundamentos, frameworks, KPIs, greenwashing e cenário brasileiro
- **10 questões sorteadas aleatoriamente** por sessão (algoritmo Fisher-Yates)
- Navegação bidirecional (avançar / retroceder)
- Barra de progresso com atualização em tempo real
- Tela de resultado com 4 faixas de desempenho e feedback personalizado

---

## Como Usar

1. Abra `index.html` no navegador (funciona offline, sem servidor necessário).
2. Navegue entre **"O que é ESG"** e **"Quiz"** pela barra de navegação.
3. Use as teclas **1** e **2** para alternar entre as páginas pelo teclado.
4. Nas seções de Frameworks e KPIs, clique nas abas ou use as teclas ← → para navegar.
5. No Checklist, marque os itens concluídos para acompanhar o progresso.
6. No Quiz, responda as 10 questões sorteadas e veja seu resultado.

---

## Estrutura de Arquivos

```
projeto-esg/
├── index.html          # Shell da SPA (cabeçalho, área principal, rodapé)
├── documentacao.html   # Documentação ABNT completa (15 páginas, formato A4)
├── README.md
├── pages/
│   ├── home.html       # Página informativa ESG (carregada via Fetch API)
│   └── quiz.html       # Quiz interativo (carregado via Fetch API)
├── css/
│   ├── style.css       # Variáveis globais, tipografia, componentes base
│   ├── home.css        # Estilos da página home (tabs, checklist, tools, etc.)
│   └── quiz.css        # Estilos do quiz e radio buttons customizados
├── js/
│   ├── utils.js        # Funções utilitárias (qs, qsa, fetchPage, formatPercent)
│   ├── main.js         # Controlador de navegação SPA (Fetch API + teclado)
│   ├── home.js         # Interatividade da home (tabs, checklist, contadores animados)
│   └── quiz.js         # Lógica do quiz (30 questões, randomização, estado, resultado)
└── assets/             # Recursos estáticos
```

---

## Arquitetura

A aplicação segue o padrão **SPA (Single Page Application)** sem frameworks externos:

- `main.js` intercepta cliques na navegação e carrega o HTML de cada página via **Fetch API**, injetando no `<main id="app">` — sem recarregamento de página.
- Após carregar a `home`, invoca `window.initHome()` (definido em `home.js`) para inicializar tabs, checklist e contadores animados.
- Após carregar o `quiz`, invoca `window.initQuiz()` (definido em `quiz.js`) para iniciar o quiz com questões sorteadas.
- `utils.js` expõe helpers via `window.utils` para evitar duplicação entre módulos.

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 semântico | Estrutura e acessibilidade (`<article>`, `<section>`, ARIA) |
| CSS3 | Grid, Flexbox, Custom Properties, Media Queries, animações |
| JavaScript ES6+ | Fetch API, async/await, IIFE, IntersectionObserver, Fisher-Yates |
| SVG inline | Ilustrações vetoriais (Venn diagram, edifício sustentável, equipe DEI) |

---

## Acessibilidade (WCAG 2.1)

- Atributos ARIA em todos os componentes interativos (`aria-pressed`, `aria-selected`, `aria-controls`, `aria-valuenow`, `role="tab"`, `role="progressbar"`)
- Navegação por teclado: setas ← → nas abas, teclas 1/2 entre páginas
- Contraste mínimo 4,5:1 (critério WCAG 1.4.3)
- Elementos semânticos em toda a estrutura
- Labels associados a todos os inputs de formulário

---

## Paleta de Cores

| Variável | Hex | Uso |
|---|---|---|
| `--primary` | `#1a5f4a` | Verde escuro — Pilar Ambiental, destaques principais |
| `--secondary` | `#2d9b7e` | Verde médio — gradientes, barras de progresso |
| `--highlight` | `#f39c12` | Âmbar — Pilar Social, alertas |
| `--bg` | `#ecf0f1` | Cinza claro — fundo da aplicação |
| `--text` | `#2c3e50` | Cinza escuro — texto principal |

---

## Licença

Projeto educacional — livre para adaptar e estudar.

---

2026 · UNIP · Luiz Gustavo Nunes de Souza · RA G957AD3
