document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 30) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('mobile-open'));
    });
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('mobile-open') && !navLinks.contains(e.target) && e.target !== menuToggle) {
        navLinks.classList.remove('mobile-open');
      }
    });
  }

  const pageLinks = document.querySelectorAll('a[href$=".html"]');
  const transitionOverlay = document.querySelector('.page-transition-overlay');
  pageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetUrl = link.getAttribute('href');
      if (!targetUrl || targetUrl.startsWith('#')) return;
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const targetPath = targetUrl.split('/').pop();
      if (currentPath === targetPath) return;
      e.preventDefault();
      if (transitionOverlay) {
        document.body.classList.remove('page-loaded');
        setTimeout(() => { window.location.href = targetUrl; }, 420);
      } else {
        window.location.href = targetUrl;
      }
    });
  });

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('#c-name')?.value || 'there';
      alert(`Thanks ${name}! Your message is on its way — we usually reply within 1-2 business days. 🥨`);
      contactForm.reset();
    });
  }

  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    if (form.dataset.bound) return;
    form.dataset.bound = '1';
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (input && input.value) {
        alert('Thanks! You are on the list — check your inbox soon 🥨');
        input.value = '';
      }
    });
  });

  // Robust video playback: if any source 404s, step through the global
  // fallback pool. If every option is exhausted, hide the element so its
  // poster / Ken Burns layer or ambient overlay carries the visual.
  const videoPool = (window.VIDEO_FALLBACKS || []).filter(Boolean);
  document.querySelectorAll('.hero-video, .ambient-video').forEach(video => {
    if (video.dataset.robust) return;
    video.dataset.robust = '1';
    const used = new Set([...video.querySelectorAll('source')].map(s => s.getAttribute('src')).filter(Boolean));
    const tryPlay = () => {
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
    };
    video.addEventListener('loadeddata', tryPlay, { once: true });
    video.addEventListener('error', () => {
      const next = videoPool.find(u => !used.has(u));
      if (next) {
        used.add(next);
        video.querySelectorAll('source').forEach(s => s.remove());
        const src = document.createElement('source');
        src.src = next;
        src.type = next.endsWith('.webm') ? 'video/webm' : 'video/mp4';
        video.appendChild(src);
        video.load();
        tryPlay();
      } else {
        video.style.display = 'none';
        if (video.parentElement) video.parentElement.classList.add('media-failed');
      }
    }, true);
    if (video.readyState > 0) tryPlay();
  });

  // Hero brand video: once the brand's own YouTube spot (Macy & Tailor - 30)
  // actually starts playing, fade it in over the native pretzel footage so
  // the hero always shows brand-related motion.
  const brandPlayerHost = document.getElementById('hero-brand-player');
  if (brandPlayerHost) {
    const BRAND_VIDEO_ID = 'KE98_ARRMFw';
    let brandReady = false;
    const showBrandVideo = () => {
      if (brandReady) return;
      brandReady = true;
      brandPlayerHost.classList.add('playing');
    };
    const fitIframe = () => {
      const iframe = brandPlayerHost.querySelector('iframe');
      if (!iframe) return;
      const r = brandPlayerHost.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      if (r.width / r.height > 16 / 9) {
        iframe.style.width = '100%';
        iframe.style.height = `${(r.width * 9) / 16}px`;
      } else {
        iframe.style.height = '100%';
        iframe.style.width = `${(r.height * 16) / 9}px`;
      }
    };
    const createBrandPlayer = () => {
      // YT.Player replaces its target element with the iframe, so create it on
      // the inner div — the outer wrapper keeps the fade-in CSS and styling.
      if (!window.YT || !window.YT.Player || brandPlayerHost.querySelector('iframe')) return;
      new window.YT.Player('hero-brand-player-inner', {
        videoId: BRAND_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: BRAND_VIDEO_ID,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0
        },
        events: {
          onReady: (e) => {
            try { e.target.mute(); e.target.playVideo(); } catch (_) {}
          },
          onStateChange: (e) => {
            if (e.data === 1) showBrandVideo();
            if (e.data === 0) { try { e.target.playVideo(); } catch (_) {} }
          },
          onError: () => {}
        }
      });
      fitIframe();
    };
    window.onYouTubeIframeAPIReady = createBrandPlayer;
    if (window.YT && window.YT.Player) {
      createBrandPlayer();
    } else {
      const ytTag = document.createElement('script');
      ytTag.src = 'https://www.youtube.com/iframe_api';
      ytTag.async = true;
      document.head.appendChild(ytTag);
    }
    window.addEventListener('resize', fitIframe);
    setTimeout(fitIframe, 1200);
  }

  const heroTilt = document.getElementById('hero-tilt');
  if (heroTilt) {
    let rafId = null;
    let targetX = 0, targetY = 0, curX = 0, curY = 0;
    const maxTilt = 6;
    const rect = heroTilt.getBoundingClientRect();
    const onMove = (e) => {
      const r = heroTilt.getBoundingClientRect();
      const cx = e.clientX - r.left;
      const cy = e.clientY - r.top;
      const px = (cx / r.width) - 0.5;
      const py = (cy / r.height) - 0.5;
      targetX = (-py) * maxTilt * 2;
      targetY = px * maxTilt * 2;
      if (!rafId) loop();
    };
    const onLeave = () => { targetX = 0; targetY = 0; };
    const loop = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      heroTilt.style.transform = `perspective(1000px) rotateX(${curX.toFixed(2)}deg) rotateY(${curY.toFixed(2)}deg) translateY(-4px)`;
      if (Math.abs(targetX - curX) > 0.02 || Math.abs(targetY - curY) > 0.02) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = null;
      }
    };
    heroTilt.addEventListener('mousemove', onMove);
    heroTilt.addEventListener('mouseleave', onLeave);
  }
});
