(function () {
  const root = document.documentElement;

  // ============================================================
  //   PROJECTS  —  single source of truth for the journey chart
  // ============================================================
  // Edit this list to add, remove, or reorder projects.
  // Each item controls:
  //   code    : short id used by the project card (e.g. "P4")
  //   year    : date string shown under the node
  //   name    : title shown in the small floating card
  //   tag     : subtitle (e.g. company or "Personal")
  //   type    : "work" or "personal"  (changes the dot color)
  //   cx, cy  : position on the chart, in % (0–100)
  //             cx = horizontal (left → right = time)
  //             cy = vertical (top → bottom = row)
  // The line is drawn through every node in the order listed below.
  // ============================================================
  const PROJECTS = [
    { code: 'P4', year: '2023–24', name: 'Cross-Platform Mobile App',  tag: 'P4 · Freelance',          type: 'personal', cx:  8, cy:  6 },
    { code: 'P5', year: '2026',    name: 'Local AI Evaluator & RAG',   tag: 'P5 · Personal',           type: 'personal', cx: 85, cy: 20 },
    { code: 'P6', year: '2026',    name: 'Distributed Cache-Aside',    tag: 'P6 · Personal',           type: 'personal', cx: 15, cy: 34 },
    { code: 'P2', year: '2024–25', name: 'IT Request System',          tag: 'P2 · Spritzer Berhad',    type: 'work',     cx: 78, cy: 49 },
    { code: 'P7', year: '2026→',   name: 'RunTrack — Running Analytics', tag: 'P7 · Personal · AI',   type: 'personal', cx: 12, cy: 63 },
    { code: 'P1', year: '2025–26', name: 'E-Appraisal System',         tag: 'P1 · YBS International', type: 'work',     cx: 80, cy: 77 },
    { code: 'P3', year: '2025–26', name: 'IT Asset Management',        tag: 'P3 · YBS International', type: 'work',     cx: 18, cy: 92 },
  ];

  // ---- Project journey timeline: draw the connecting line + arrange nodes ----
  // viewBox matches the SVG in index.html (1000 x 1000) so 1% == 10 units.
  const VB_W = 1000;
  const VB_H = 1000;

  function toUnits(pct, axis) {
    return (pct / 100) * (axis === 'x' ? VB_W : VB_H);
  }

  // Sort by year bucket (cy) then by cx so the line reads top-to-bottom,
  // left-to-right — easy to scan.
  function buildPath(nodes) {
    const sorted = nodes.slice().sort(function (a, b) {
      if (a.cy !== b.cy) return a.cy - b.cy;
      return a.cx - b.cx;
    });

    if (!sorted.length) return '';

    // Build a stepped path: from each node, go horizontally to the next
    // node's x, then vertically to its y. This keeps segments axis-aligned
    // and never overlaps with a dot.
    let d = '';
    sorted.forEach(function (n, i) {
      const x = toUnits(n.cx, 'x');
      const y = toUnits(n.cy, 'y');
      if (i === 0) {
        d += 'M ' + x + ' ' + y;
      } else {
        const prev = sorted[i - 1];
        const prevX = toUnits(prev.cx, 'x');
        const prevY = toUnits(prev.cy, 'y');
        // Move horizontally first, then vertically — produces a clean L-step.
        d += ' L ' + x + ' ' + prevY + ' L ' + x + ' ' + y;
      }
    });
    return d;
  }

  function layoutJourney() {
    var track = document.getElementById('journey-line');
    if (!track) return;
    var nodes = Array.prototype.slice.call(track.querySelectorAll('.journey-node'));
    if (!nodes.length) return;

    // Sync the inline --cx/--cy on each node from the PROJECTS data so the
    // HTML and the JS data don't drift apart.
    nodes.forEach(function (n) {
      const code = n.getAttribute('data-project');
      const data = PROJECTS.find(function (p) { return p.code === code; });
      if (!data) return;
      n.style.setProperty('--cx', data.cx + '%');
      n.style.setProperty('--cy', data.cy + '%');
      n.setAttribute('data-side', (data.cx >= 50) ? 'above' : 'below');
    });

    // Draw the connecting path through the node positions.
    var path = document.getElementById('journey-curve');
    if (path) {
      path.setAttribute('d', buildPath(PROJECTS));
      // Reset the draw-in animation so it plays on every layout.
      path.style.animation = 'none';
      // Force reflow then re-apply the animation.
      void path.getBoundingClientRect();
      path.style.animation = '';
    }

    // Stagger animation delays in PROJECTS order.
    PROJECTS.forEach(function (p, i) {
      const n = nodes.find(function (el) { return el.getAttribute('data-project') === p.code; });
      if (n) n.style.animationDelay = (0.25 + i * 0.18) + 's';
    });
  }

  function scheduleLayout() {
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(layoutJourney);
    } else {
      layoutJourney();
    }
  }

  // Initial layout after fonts/styles settle
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleLayout);
  } else {
    scheduleLayout();
  }
  window.addEventListener('load', scheduleLayout);
  window.addEventListener('resize', scheduleLayout);
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

  // ---- Project journey timeline: hide / show toggle ----
  (function () {
    const journey = document.getElementById('journey');
    const btn = document.getElementById('journey-toggle');
    if (!journey || !btn) return;

    const label = btn.querySelector('.journey-toggle-label');
    const STORAGE_KEY = 'portfolio-journey-collapsed';

    function apply(collapsed) {
      journey.classList.toggle('is-collapsed', collapsed);
      btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      btn.setAttribute('aria-label', collapsed ? 'Show project journey' : 'Hide project journey');
      if (label) label.textContent = collapsed ? 'Show' : 'Hide';
    }

    let saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (_) {}
    apply(saved === '1');

    btn.addEventListener('click', function () {
      const collapsed = !journey.classList.contains('is-collapsed');
      apply(collapsed);
      try { localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0'); } catch (_) {}
    });
  })();

  // ---- Expand / collapse for project cards (opens as a centered modal) ----
  (function () {
    const cards = document.querySelectorAll('.project-card.expandable');
    if (!cards.length) return;

    let backdrop = null;

    function ensureCloseButton(card) {
      if (card.querySelector('.modal-close')) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'modal-close';
      btn.setAttribute('aria-label', 'Close project');
      btn.textContent = '×';
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        closeCard(card);
      });
      card.appendChild(btn);
    }

    function ensureBackdrop() {
      if (backdrop) return backdrop;
      backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop';
      backdrop.addEventListener('click', function () {
        const open = document.querySelector('.project-card.is-open');
        if (open) closeCard(open);
      });
      document.body.appendChild(backdrop);
      return backdrop;
    }

    function openCard(card) {
      ensureCloseButton(card);
      ensureBackdrop();
      // Close any other open card first
      document.querySelectorAll('.project-card.is-open').forEach(function (other) {
        if (other !== card) closeCard(other, true);
      });
      card.classList.add('is-open');
      card.scrollTop = 0;
      const toggle = card.querySelector('.project-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('has-modal-open');
    }

    function closeCard(card, silent) {
      if (!card || !card.classList.contains('is-open')) return;
      card.classList.remove('is-open');
      const toggle = card.querySelector('.project-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      // If no other card is open, remove backdrop + scroll lock
      if (!document.querySelector('.project-card.is-open')) {
        if (backdrop) backdrop.remove();
        backdrop = null;
        document.body.classList.remove('has-modal-open');
      }
      if (silent) return;
      // Refocus the toggle for keyboard users
      if (toggle) toggle.focus();
    }

    cards.forEach(function (card) {
      const trigger = card.querySelector('.project-toggle');
      if (!trigger) return;
      trigger.addEventListener('click', function (e) {
        // Don't toggle when clicking the GitHub link inside the project header
        if (e.target.closest('.project-github')) return;
        e.stopPropagation();
        e.preventDefault();
        if (card.classList.contains('is-open')) {
          closeCard(card);
        } else {
          openCard(card);
        }
      });
    });

    // Esc closes the open modal
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      const open = document.querySelector('.project-card.is-open');
      if (open) closeCard(open);
    });
  })();

  // ---- Inline expand / collapse for non-project expandables (timeline + academics) ----
  document.querySelectorAll('.expandable:not(.project-card)').forEach(function (item) {
    const trigger = item.querySelector('.expander');
    if (!trigger) return;
    trigger.addEventListener('click', function () {
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

  // ---- Project journey timeline: click a node to jump to its project card ----
  document.querySelectorAll('.journey-node').forEach(function (node) {
    var code = node.getAttribute('data-project');
    if (!code) return;
    var targetCard = null;
    document.querySelectorAll('.project-card .project-code').forEach(function (el) {
      if (el.textContent.trim() === code && !targetCard) {
        targetCard = el.closest('.project-card');
      }
    });
    if (!targetCard) return;
    node.setAttribute('role', 'button');
    node.setAttribute('tabindex', '0');
    node.setAttribute('aria-label', 'Jump to project ' + code);
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
    node.addEventListener('click', jump);
    node.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        jump();
      }
    });
  });

  // ---- Highlight journey node whose project is currently in view ----
  if ('IntersectionObserver' in window) {
    var cardByCode = {};
    document.querySelectorAll('.project-card').forEach(function (card) {
      var codeEl = card.querySelector('.project-code');
      if (codeEl) cardByCode[codeEl.textContent.trim()] = card;
    });
    var nodeByCode = {};
    document.querySelectorAll('.journey-node').forEach(function (n) {
      var code = n.getAttribute('data-project');
      if (code) nodeByCode[code] = n;
    });
    var cardObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var codeEl = e.target.querySelector('.project-code');
        if (!codeEl) return;
        var code = codeEl.textContent.trim();
        var n = nodeByCode[code];
        if (!n) return;
        if (e.isIntersecting) n.classList.add('is-active');
        else n.classList.remove('is-active');
      });
    }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 });
    Object.values(cardByCode).forEach(function (c) { cardObs.observe(c); });
  }
})();