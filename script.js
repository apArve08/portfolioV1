(function () {
  const root = document.documentElement;

  // ============================================================
//   PROJECTS  —  single source of truth for the journey chart
  // ============================================================
  // Edit this list to add, remove, or reorder projects.
  // Each item controls:
  //   code    : short id used by the project card (e.g. "P4")
  //   year    : numeric year used to position the dot on the X axis
  //   label   : text shown next to the dot
  //   name    : title shown in the floating card
  //   tag     : subtitle (e.g. company or "Personal")
  //   type    : "work" or "personal" (changes the dot color)
  //
  // The dot X position is computed from `year`. The card flips
  // above or below the line so nothing overlaps. Add a new entry
  // and it slots in automatically.
  // ============================================================
  const YEAR_MIN = 2023;
  const YEAR_MAX = 2026;

  const PROJECTS = [
    { code: 'P4', year: 2023, label: '2023–25', name: 'Cross-Platform Mobile App',     tag: 'P4 · Freelance',          type: 'personal' },
    { code: 'P2', year: 2024, label: '2025',    name: 'IT Request System',             tag: 'P2 · Spritzer Berhad',    type: 'work'     },
    { code: 'P1', year: 2025, label: '2025',    name: 'E-Appraisal System',            tag: 'P1 · YBS International',  type: 'work'     },
    { code: 'P3', year: 2025, label: '2025',    name: 'IT Asset Management',           tag: 'P3 · YBS International',  type: 'work'     },
    { code: 'P7', year: 2026, label: '2026',    name: 'RunTrack — Running Analytics',  tag: 'P7 · Personal · AI',      type: 'personal' },
    { code: 'P5', year: 2026, label: '2026',    name: 'Local AI Evaluator & RAG',      tag: 'P5 · Personal',           type: 'personal' },
    { code: 'P6', year: 2026, label: '2026',    name: 'Distributed Cache-Aside',       tag: 'P6 · Personal',           type: 'personal' },
  ];

  function yearToX(year) {
    const t = (year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN);
    return Math.max(4, Math.min(96, t * 100));
  }

  // ---- Layout the journey chart: even slots on a horizontal spine ----
  const VB_W = 1000;
  const VB_H = 360;
  const SPINE_Y = 180;

  // Group projects by year so multiple projects in the same year share a slot
  // and alternate above/below to avoid overlap.
  function groupByYear(list) {
    const groups = {};
    list.forEach(function (p) {
      if (!groups[p.year]) groups[p.year] = [];
      groups[p.year].push(p);
    });
    return groups;
  }

  function layoutJourney(filterFn) {
    var track = document.getElementById('journey-line');
    if (!track) return;
    var nodes = Array.prototype.slice.call(track.querySelectorAll('.journey-node'));
    if (!nodes.length) return;

    const filtered = typeof filterFn === 'function' ? PROJECTS.filter(filterFn) : PROJECTS.slice();
    const groups = groupByYear(filtered);
    const years = Object.keys(groups).map(Number).sort(function (a, b) { return a - b; });
    if (!years.length) return;

    // Evenly distribute year groups across the chart width with some padding.
    const padPct = 6;
    const usable = 100 - padPct * 2;
    const slotW = usable / years.length;

    const positions = {};
    years.forEach(function (y, gi) {
      const baseX = padPct + slotW * (gi + 0.5);
      const items = groups[y];
      items.forEach(function (p, idx) {
        const count = items.length;
        const cx = count > 1
          ? baseX + (idx - (count - 1) / 2) * (slotW / count) * 0.5
          : baseX;
        const side = idx % 2 === 0 ? 'above' : 'below';
        positions[p.code] = { cx: cx, cy: 50, side: side };
      });
    });

    // Apply positions to nodes, and dim the ones that aren't in the current filter.
    const visibleCodes = {};
    filtered.forEach(function (p) { visibleCodes[p.code] = true; });
    nodes.forEach(function (n) {
      const code = n.getAttribute('data-project');
      const pos = positions[code];
      if (!pos) {
        n.classList.add('is-dimmed');
        return;
      }
      n.classList.remove('is-dimmed');
      n.style.setProperty('--cx', pos.cx.toFixed(2) + '%');
      n.style.setProperty('--cy', pos.cy.toFixed(2) + '%');
      n.setAttribute('data-side', pos.side);
    });

    // Draw a single straight spine across the visible range, using the actual
    // slot positions of the first/last visible year group (not the original
    // year range — that would shrink to nothing when a single year is picked).
    var spine = document.getElementById('journey-spine');
    if (spine) {
      const firstSlot = padPct + slotW * 0.5;
      const lastSlot = padPct + slotW * (years.length - 0.5);
      spine.setAttribute('d', 'M ' + (firstSlot / 100 * VB_W).toFixed(1) + ' ' + SPINE_Y +
                            ' L ' + (lastSlot / 100 * VB_W).toFixed(1) + ' ' + SPINE_Y);
      // Replay the draw-in animation whenever the spine changes.
      spine.style.animation = 'none';
      void spine.getBoundingClientRect();
      spine.style.animation = '';
    }

    var svg = track.querySelector('.journey-svg');
    if (svg) svg.setAttribute('viewBox', '0 0 ' + VB_W + ' ' + VB_H);

    // Repaint the year axis labels above the chart for the visible years.
    var axis = document.getElementById('journey-axis');
    if (axis) {
      axis.innerHTML = '';
      years.forEach(function (y, gi) {
        const baseX = padPct + slotW * (gi + 0.5);
        const span = document.createElement('span');
        span.textContent = y;
        span.style.setProperty('--at', baseX.toFixed(2) + '%');
        axis.appendChild(span);
      });
    }

    // Stagger fade-in.
    nodes.forEach(function (n, i) {
      if (n.classList.contains('is-dimmed')) return;
      n.style.animationDelay = (0.10 + i * 0.06) + 's';
    });
  }

  // Year filter state + persistence
  let activeFilter = 'all';
  try {
    const saved = localStorage.getItem('portfolio-journey-filter');
    if (saved) activeFilter = saved;
  } catch (_) {}

  function applyFilter(filter) {
    activeFilter = filter;
    try { localStorage.setItem('portfolio-journey-filter', filter); } catch (_) {}
    document.querySelectorAll('.filter-btn').forEach(function (btn) {
      const isActive = btn.getAttribute('data-filter') === filter;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    let fn = null;
    if (filter !== 'all') {
      const y = parseInt(filter, 10);
      fn = function (p) { return p.year === y; };
    }
    layoutJourney(fn);
  }

  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyFilter(btn.getAttribute('data-filter'));
    });
  });
  applyFilter(activeFilter);

  // Re-layout on resize so the spine stays aligned with the dots.
  let resizeTimer = null;
  window.addEventListener('resize', function () {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      let fn = null;
      if (activeFilter !== 'all') {
        const y = parseInt(activeFilter, 10);
        fn = function (p) { return p.year === y; };
      }
      layoutJourney(fn);
    }, 120);
  });
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