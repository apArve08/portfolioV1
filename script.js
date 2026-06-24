(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const STORAGE_KEY = 'portfolio-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (_) {}
  }

  const saved = (function () {
    try { return localStorage.getItem(STORAGE_KEY); } catch (_) { return null; }
  })();

  if (saved === 'light' || saved === 'dark') {
    applyTheme(saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(current);
    });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Expand / collapse for timeline items & project cards ----
  document.querySelectorAll('.expandable').forEach(function (item) {
    const trigger = item.querySelector('.expander') || item.querySelector('.project-toggle');
    if (!trigger) return;
    trigger.addEventListener('click', function (e) {
      // Don't toggle when clicking the GitHub link inside the project header
      if (e.target.closest('.project-github')) return;
      const open = item.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  // ---- Tabs (Overview / README) inside each project card ----
  document.querySelectorAll('.project-card').forEach(function (card) {
    const tabs = card.querySelectorAll('.tab-btn');
    const panels = card.querySelectorAll('.tab-panel');
    tabs.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const target = btn.getAttribute('data-tab');
        tabs.forEach(function (b) {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        panels.forEach(function (p) {
          const match = p.getAttribute('data-panel') === target;
          p.classList.toggle('is-active', match);
          if (match) p.removeAttribute('hidden'); else p.setAttribute('hidden', '');
        });
      });
    });
  });

  // ---- Image gallery lightbox ----
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCap = document.getElementById('lightbox-caption');
  const lbClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  function openLightbox(src, alt, caption) {
    if (!lightbox) return;
    lbImg.src = src;
    lbImg.alt = alt || '';
    lbCap.textContent = caption || '';
    lightbox.removeAttribute('hidden');
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.gallery-item').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      e.preventDefault();
      const img = btn.querySelector('img');
      if (!img) return;
      openLightbox(img.src, img.alt, btn.getAttribute('data-caption'));
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  // ---- Timeline: highlight item currently nearest viewport center ----
  const timelineItems = document.querySelectorAll('.timeline .timeline-item');
  if (timelineItems.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add('is-active');
        else e.target.classList.remove('is-active');
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
    timelineItems.forEach(function (i) { obs.observe(i); });
  }

  // ---- Project timeline chart: click a bar to jump to its project card ----
  document.querySelectorAll('.project-chart .chart-row').forEach(function (row) {
    var code = row.getAttribute('data-project');
    if (!code) return;
    var targetCard = null;
    document.querySelectorAll('.project-card .project-code').forEach(function (el) {
      if (el.textContent.trim() === code && !targetCard) {
        targetCard = el.closest('.project-card');
      }
    });
    if (!targetCard) return;
    row.style.cursor = 'pointer';
    row.setAttribute('role', 'button');
    row.setAttribute('tabindex', '0');
    row.setAttribute('aria-label', 'Jump to project ' + code);
    function jump() {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      var trigger = targetCard.querySelector('.project-toggle');
      if (trigger && trigger.getAttribute('aria-expanded') === 'false') {
        trigger.click();
      }
      document.querySelectorAll('.project-card.is-flash').forEach(function (c) {
        c.classList.remove('is-flash');
      });
      targetCard.classList.add('is-flash');
      setTimeout(function () { targetCard.classList.remove('is-flash'); }, 1600);
    }
    row.addEventListener('click', jump);
    row.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        jump();
      }
    });
  });

  // ---- Highlight chart row whose project is currently in view ----
  if ('IntersectionObserver' in window) {
    var cardByCode = {};
    document.querySelectorAll('.project-card').forEach(function (card) {
      var codeEl = card.querySelector('.project-code');
      if (codeEl) cardByCode[codeEl.textContent.trim()] = card;
    });
    var rowByCode = {};
    document.querySelectorAll('.project-chart .chart-row').forEach(function (row) {
      var code = row.getAttribute('data-project');
      if (code) rowByCode[code] = row;
    });
    var cardObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var codeEl = e.target.querySelector('.project-code');
        if (!codeEl) return;
        var code = codeEl.textContent.trim();
        var row = rowByCode[code];
        if (!row) return;
        if (e.isIntersecting) row.classList.add('is-highlight');
        else row.classList.remove('is-highlight');
      });
    }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 });
    Object.values(cardByCode).forEach(function (c) { cardObs.observe(c); });
  }
})();