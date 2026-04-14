/* home.js – interatividade da página home */
(function () {

  /* ── TABS ─────────────────────────────────────────────────────── */
  function initTabs(wrapper) {
    const buttons = Array.from(wrapper.querySelectorAll('.tab-btn'));
    const panels  = Array.from(wrapper.querySelectorAll('.tab-panel'));

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        buttons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const panel = wrapper.querySelector('#tab-' + target);
        if (panel) panel.classList.add('active');
      });
    });

    // Keyboard arrow navigation inside tab-nav
    const nav = wrapper.querySelector('.tab-nav');
    if (nav) {
      nav.addEventListener('keydown', e => {
        const cur = nav.querySelector('.tab-btn.active');
        if (!cur) return;
        const idx = buttons.indexOf(cur);
        let next = -1;
        if (e.key === 'ArrowRight') next = (idx + 1) % buttons.length;
        if (e.key === 'ArrowLeft')  next = (idx - 1 + buttons.length) % buttons.length;
        if (next >= 0) { buttons[next].click(); buttons[next].focus(); e.preventDefault(); }
      });
    }
  }

  /* ── CHECKLIST ────────────────────────────────────────────────── */
  function initChecklist() {
    const checklist = document.getElementById('esg-checklist');
    if (!checklist) return;
    const checkboxes = Array.from(checklist.querySelectorAll('input[type="checkbox"]'));
    const bar   = document.getElementById('checklist-bar');
    const count = document.getElementById('checklist-count');
    const total = checkboxes.length;
    const barWrap = bar && bar.closest('[role="progressbar"]');

    function update() {
      const done = checkboxes.filter(cb => cb.checked).length;
      const pct  = total ? (done / total) * 100 : 0;
      if (bar) bar.style.width = pct + '%';
      if (barWrap) barWrap.setAttribute('aria-valuenow', Math.round(pct));
      if (count) count.textContent = `${done} / ${total} itens concluídos`;
      // toggle .done class on parent <li>
      checkboxes.forEach(cb => {
        const li = cb.closest('li');
        if (li) li.classList.toggle('done', cb.checked);
      });
    }

    checkboxes.forEach(cb => cb.addEventListener('change', update));
    update(); // initialise
  }

  /* ── ANIMATED COUNTERS (IntersectionObserver) ─────────────────── */
  function initCounters() {
    const els = Array.from(document.querySelectorAll('[data-counter]'));
    if (!els.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el      = entry.target;
        const target  = parseFloat(el.dataset.counter);
        const suffix  = el.dataset.suffix || '';
        const prefix  = el.dataset.prefix || '';
        const dur     = 1400;
        const start   = performance.now();

        (function tick(now) {
          const t   = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - t, 3); // cubic ease-out
          const val  = target * ease;
          el.textContent = prefix + (Number.isInteger(target) ? Math.round(val) : val.toFixed(1)) + suffix;
          if (t < 1) requestAnimationFrame(tick);
          else el.textContent = prefix + target + suffix;
        })(start);

        observer.unobserve(el);
      });
    }, { threshold: 0.4 });

    els.forEach(el => observer.observe(el));
  }

  /* ── ACCORDION ────────────────────────────────────────────────── */
  function initAccordion() {
    document.querySelectorAll('.accordion-item').forEach(item => {
      const btn   = item.querySelector('.accordion-btn');
      const panel = item.querySelector('.accordion-panel');
      if (!btn || !panel) return;
      btn.addEventListener('click', () => {
        const open = item.classList.contains('open');
        document.querySelectorAll('.accordion-item').forEach(i => {
          i.classList.remove('open');
          const b = i.querySelector('.accordion-btn');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!open) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
      });
    });
  }

  /* ── PUBLIC INIT ──────────────────────────────────────────────── */
  window.initHome = function () {
    document.querySelectorAll('[data-tabs]').forEach(initTabs);
    initChecklist();
    initCounters();
    initAccordion();
  };
})();
