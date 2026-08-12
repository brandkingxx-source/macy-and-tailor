(function () {
  const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  onReady(() => {
    const body = document.body;
    const html = document.documentElement;

    requestAnimationFrame(() => {
      body.classList.add('page-loaded');
    });

    if (!isTouch) {
      initCustomCursor();
    } else {
      html.classList.add('is-touch');
    }

    initHeroWordReveal();
    initRevealObserver();
    initTimelineObserver();
    initHoverToggles();
    initSubtleParallax();
    initScrollProgress();
    initCounters();
    initMagneticButtons();
    initImageParallax();
  });

  function initCustomCursor() {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX, dotY = mouseY;
    let ringX = mouseX, ringY = mouseY;
    let rafId = null;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!rafId) loop();
    }, { passive: true });

    window.addEventListener('pointerdown', () => ring.classList.add('pressing'));
    window.addEventListener('pointerup', () => ring.classList.remove('pressing'));

    function loop() {
      dotX = mouseX;
      dotY = mouseY;
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      const dx = mouseX - ringX, dy = mouseY - ringY;
      if (dx * dx + dy * dy > 0.2) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = null;
      }
    }
  }

  function initHeroWordReveal() {
    const titles = document.querySelectorAll('.hero-title');
    titles.forEach((title, tIdx) => {
      const words = title.querySelectorAll('.word');
      if (!words.length) return;
      words.forEach((w, i) => {
        const delay = (tIdx * 40) + (i * 60) + 320;
        w.style.transitionDelay = `${delay}ms`;
        requestAnimationFrame(() => {
          setTimeout(() => w.classList.add('in'), delay + 40);
        });
      });
    });
  }

  function initRevealObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    function observeAll() {
      document.querySelectorAll('.reveal:not(.active)').forEach(el => observer.observe(el));
    }
    observeAll();

    window.addEventListener('recalc-reveals', () => {
      requestAnimationFrame(observeAll);
    });
    window.addEventListener('recalc-reveals-force', () => {
      document.querySelectorAll('.reveal').forEach(el => {
        el.classList.remove('active');
        observer.observe(el);
      });
    });
  }

  function initTimelineObserver() {
    const items = document.querySelectorAll('.timeline-item');
    if (!items.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    items.forEach(it => io.observe(it));
  }

  function initHoverToggles() {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    const hoverables = 'a, button, .product-card, .value-card, .stockist-card, .recipe-card, .family-tab, .btn, .social-link, .gallery-tile, .info-item, .hero-float-badge';
    const matches = (el) => el.matches && el.matches(hoverables);
    const isChildOf = (el) => el.closest && el.closest(hoverables);
    let count = 0;

    document.addEventListener('mouseover', (e) => {
      if (matches(e.target) || isChildOf(e.target)) {
        count++;
        if (count === 1) {
          if (dot) dot.classList.add('hovering');
          if (ring) ring.classList.add('hovering');
        }
      }
    }, true);
    document.addEventListener('mouseout', (e) => {
      if (matches(e.target) || isChildOf(e.target)) {
        count = Math.max(0, count - 1);
        if (count === 0) {
          if (dot) dot.classList.remove('hovering');
          if (ring) ring.classList.remove('hovering');
        }
      }
    }, true);
  }

  function initSubtleParallax() {
    if (isTouch) return;
    const heroContent = document.getElementById('hero-content');
    if (!heroContent) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 700) {
          heroContent.style.transform = `translate3d(0, ${y * 0.06}px, 0)`;
          heroContent.style.opacity = Math.max(0.2, 1 - (y / 520)).toFixed(3);
        }
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---- Scroll progress bar (top edge) ---- */
  function initScrollProgress() {
    if (document.querySelector('.scroll-progress')) return;
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    let ticking = false;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.style.transform = `scaleX(${p.toFixed(4)})`;
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  /* ---- Count-up stats (data-target / data-decimals / data-suffix) ---- */
  function initCounters() {
    const els = document.querySelectorAll('.count-up');
    if (!els.length) return;
    const finish = (el, dec, suffix) => {
      const target = parseFloat(el.dataset.target || '0');
      el.textContent = (dec > 0 ? target.toFixed(dec) : Math.round(target).toString()) + suffix;
    };
    if (prefersReducedMotion) {
      els.forEach(el => finish(el, parseInt(el.dataset.decimals || '0', 10), el.dataset.suffix || ''));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        io.unobserve(el);
        const target = parseFloat(el.dataset.target || '0');
        const dec = parseInt(el.dataset.decimals || '0', 10);
        const suffix = el.dataset.suffix || '';
        const dur = 1500;
        const t0 = performance.now();
        const step = (t) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          if (p < 1) {
            el.textContent = (target * eased).toFixed(dec) + (dec === 0 ? '' : '');
            requestAnimationFrame(step);
          } else {
            finish(el, dec, suffix);
          }
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    els.forEach(el => io.observe(el));
  }

  /* ---- Magnetic buttons (desktop only, subtle) ---- */
  function initMagneticButtons() {
    if (isTouch || prefersReducedMotion) return;
    const strength = 8;
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
        btn.style.transform = `translate3d(${(x * strength).toFixed(1)}px, ${(y * strength).toFixed(1)}px, 0)`;
      }, { passive: true });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---- Parallax drift on story / feature imagery ---- */
  function initImageParallax() {
    if (isTouch || prefersReducedMotion) return;
    const targets = [];
    document.querySelectorAll('.story-image-wrap').forEach(wrap => {
      const img = wrap.querySelector('img');
      if (!img) return;
      img.style.transform = 'scale(1.16)';
      targets.push({ wrap, img });
    });
    if (!targets.length) return;
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      targets.forEach(({ wrap, img }) => {
        const r = wrap.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
        img.style.transform = `scale(1.16) translate3d(0, ${(p * 4.5).toFixed(2)}%, 0)`;
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }
})();
