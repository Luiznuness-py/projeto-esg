/* utils.js - Funções utilitárias */
function qs(sel, ctx = document){ return ctx.querySelector(sel) }
function qsa(sel, ctx = document){ return Array.from(ctx.querySelectorAll(sel)) }

async function fetchPage(path){
  try{
    const res = await fetch(path);
    if(!res.ok) throw new Error('Falha ao carregar: '+path);
    return await res.text();
  } catch(e){ console.error(e); return `<p>Erro ao carregar conteúdo.</p>` }
}

function formatPercent(num){ return Math.round(num) + '%' }

// Expor utilitário para navegação
window.utils = { qs, qsa, fetchPage, formatPercent };
