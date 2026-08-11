(function () {
  const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

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
    const heroImg = document.getElementById('hero-img');
    if (!heroContent && !heroImg) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 700) {
          if (heroContent) {
            heroContent.style.transform = `translate3d(0, ${y * 0.06}px, 0)`;
            heroContent.style.opacity = Math.max(0.2, 1 - (y / 520)).toFixed(3);
          }
          if (heroImg) {
            heroImg.style.transform = `translate3d(0, ${y * -0.04}px, 0) scale(1.02)`;
          }
        }
        ticking = false;
      });
    }, { passive: true });
  }
})();
