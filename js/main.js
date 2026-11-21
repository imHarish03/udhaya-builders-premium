/* =========================================================================
   UDHAYA BUILDERS — interactions & animations
   Works without GSAP (content stays visible); GSAP adds premium motion.
   ========================================================================= */
(() => {
  'use strict';

  document.documentElement.classList.remove('no-js');

  const S = window.SITE || {};
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animate = hasGSAP && !reduceMotion;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const years = new Date().getFullYear() - (S.since || 2008);

  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

  /* ---------- Image helpers (Unsplash IDs or local paths) ---------- */
  const isLocal = (id) => /[./]/.test(id) && !/^\d{10,}-/.test(id);
  const imgUrl = (id, w, q = 80) => isLocal(id) ? id : `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;
  const srcset = (id, widths = [640, 960, 1280, 1920]) => isLocal(id) ? '' : widths.map((w) => `${imgUrl(id, w)} ${w}w`).join(', ');
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Site-wide details ---------- */
  const fields = {
    name: S.name, phone: S.phone, email: S.email, address: S.address, hours: S.hours,
    since: S.since, years
  };
  $$('[data-site]').forEach((el) => {
    const key = el.dataset.site;
    if (key === 'phoneLink') el.href = `tel:${(S.phone || '').replace(/\s+/g, '')}`;
    else if (key === 'emailLink') el.href = `mailto:${S.email}`;
    else if (key === 'waLink') el.href = `https://wa.me/${S.whatsapp}`;
    else if (fields[key] !== undefined) el.textContent = fields[key];
  });
  $('#year').textContent = new Date().getFullYear();

  /* ---------- Render: stats ---------- */
  $('#statsGrid').innerHTML = (S.stats || []).map((s) => {
    const val = s.value === 'years' ? years : s.value;
    return `<div class="stat"><div class="stat__num"><span data-count="${val}">${val}</span><sup>${esc(s.suffix || '')}</sup></div><p class="stat__label">${esc(s.label)}</p></div>`;
  }).join('');

  /* ---------- Render: services ---------- */
  const arrow = '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  $('#servicesGrid').innerHTML = (S.services || []).map((s, i) => `
    <a href="#contact" class="service">
      <div class="service__img"><img loading="lazy" alt="${esc(s.title)}" src="${imgUrl(s.img, 960)}" srcset="${srcset(s.img, [480, 720, 960, 1400])}" sizes="(min-width: 1024px) 33vw, (min-width: 600px) 50vw, 100vw"></div>
      <span class="service__num">${String(i + 1).padStart(2, '0')}</span>
      <span class="service__arrow">${arrow}</span>
      <h3>${esc(s.title)}</h3>
      <p><span>${esc(s.text)}</span></p>
      <div class="service__bar"></div>
    </a>`).join('');
  $('#servicesGrid').setAttribute('data-stagger', '');
  $('#footerServices').innerHTML = (S.services || []).slice(0, 5).map((s) => `<li><a href="#services">${esc(s.title)}</a></li>`).join('');

  /* ---------- Render: projects ---------- */
  const catLabel = { villas: 'Villa', apartments: 'Apartments', commercial: 'Commercial', interiors: 'Interiors' };
  const projects = S.projects || [];
  const pin = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  $('#projectsGrid').innerHTML = projects.map((p, i) => `
    <button class="project${p.size === 'tall' ? ' project--tall' : ''}" data-cat="${esc(p.category)}" data-index="${i}" aria-label="View ${esc(p.title)}">
      <img loading="lazy" alt="${esc(p.title)}" src="${imgUrl(p.img, 960)}" srcset="${srcset(p.img, [480, 720, 960, 1400, 1920])}" sizes="(min-width: 1024px) 33vw, (min-width: 600px) 50vw, 100vw">
      <span class="project__status${p.status === 'Ongoing' ? ' project__status--ongoing' : ''}">${esc(p.status)}</span>
      <span class="project__overlay">
        <span class="project__cat">${catLabel[p.category] || esc(p.category)}</span>
        <span class="project__title">${esc(p.title)}</span>
        <span class="project__loc">${pin}${esc(p.location)}</span>
      </span>
      <span class="project__view">View</span>
    </button>`).join('');
  $('#projectsGrid').setAttribute('data-stagger', '');

  /* ---------- Render: testimonials ---------- */
  const tlist = S.testimonials || [];
  $('#ttrack').innerHTML = tlist.map((t) => `
    <figure class="tcard">
      <div class="tcard__stars" aria-label="5 out of 5 stars">★★★★★</div>
      <blockquote>“${esc(t.quote)}”</blockquote>
      <figcaption><strong>${esc(t.name)}</strong><span>${esc(t.role)}</span></figcaption>
    </figure>`).join('');
  $('#tdots').innerHTML = tlist.map((_, i) => `<button aria-label="Testimonial ${i + 1}"${i === 0 ? ' class="is-active"' : ''}></button>`).join('');

  /* ---------- Render: socials ---------- */
  const icons = {
    instagram: '<path fill-rule="evenodd" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm5.5-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"/>',
    facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5Z"/>',
    linkedin: '<path d="M4 9h4v12H4V9Zm2-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm4 6h4v1.7c.6-1 1.9-2 3.8-2 3.6 0 4.2 2.3 4.2 5.4V21h-4v-5.8c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V21h-4V9Z"/>',
    youtube: '<path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5 31 31 0 0 0 .6 12a31 31 0 0 0 .4 4.5 3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-4.5 31 31 0 0 0-.4-4.5ZM9.8 15V9l5.2 3-5.2 3Z"/>'
  };
  $('#socials').innerHTML = Object.entries(S.social || {}).filter(([k]) => icons[k]).map(([k, url]) =>
    `<a href="${esc(url)}" target="_blank" rel="noopener" aria-label="${k}"><svg viewBox="0 0 24 24">${icons[k]}</svg></a>`).join('');

  /* =====================================================================
     HEADER & NAVIGATION
     ===================================================================== */
  const header = $('#header');
  const burger = $('#burger');
  const body = document.body;
  let lastY = window.scrollY;

  const setNav = (open) => {
    if (open) header.classList.remove('is-hidden');
    body.classList.toggle('nav-open', open);
    body.classList.toggle('is-locked', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  burger.addEventListener('click', () => setNav(!body.classList.contains('nav-open')));
  $$('.nav a').forEach((a) => a.addEventListener('click', () => setNav(false)));
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && body.classList.contains('nav-open')) setNav(false); });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => { if (e.matches) setNav(false); });

  const toTop = $('#toTop');
  const ring = $('#toTopProgress');
  const RING = 138.2;
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    if (!body.classList.contains('nav-open') && !body.classList.contains('is-locked')) {
      if (y > 500 && y > lastY + 6) header.classList.add('is-hidden');
      else if (y < lastY - 6 || y < 500) header.classList.remove('is-hidden');
    }
    lastY = y;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? y / max : 0;
    ring.style.strokeDashoffset = String(RING * (1 - p));
    toTop.classList.toggle('is-visible', y > window.innerHeight * 0.8);
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  // active link highlight
  const links = $$('.nav__link');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === `#${en.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach((s) => io.observe(s));

  /* =====================================================================
     HERO SLIDER (Ken Burns crossfade)
     ===================================================================== */
  const slides = $$('.hero__slide');
  const dots = $$('#heroDots button');
  const SLIDE_MS = 6500;
  let current = 0;
  let heroTimer;
  document.documentElement.style.setProperty('--slide-ms', `${SLIDE_MS}ms`);

  const goSlide = (n) => {
    if (n === current) return;
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    current = (n + slides.length) % slides.length;
    // force reflow so the progress bar & Ken Burns restart
    void slides[current].offsetWidth;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
    $('#heroIndex').textContent = String(current + 1).padStart(2, '0');
    const cap = $('#heroCaption');
    if (animate) {
      gsap.fromTo(cap, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
    }
    cap.textContent = slides[current].dataset.caption;
  };
  const startHero = () => {
    clearInterval(heroTimer);
    if (reduceMotion) return;
    heroTimer = setInterval(() => goSlide(current + 1), SLIDE_MS);
  };
  dots.forEach((d, i) => d.addEventListener('click', () => { goSlide(i); startHero(); }));
  document.addEventListener('visibilitychange', () => (document.hidden ? clearInterval(heroTimer) : startHero()));

  /* =====================================================================
     PROJECT FILTER
     ===================================================================== */
  const cards = $$('.project');
  $$('#filters button').forEach((btn) => btn.addEventListener('click', () => {
    if (btn.classList.contains('is-active')) return;
    $$('#filters button').forEach((b) => b.classList.toggle('is-active', b === btn));
    const f = btn.dataset.filter;
    const apply = () => {
      cards.forEach((c) => c.classList.toggle('is-hidden', f !== 'all' && c.dataset.cat !== f));
      if (hasGSAP) ScrollTrigger.refresh();
    };
    if (!animate) return apply();
    const visible = cards.filter((c) => !c.classList.contains('is-hidden'));
    gsap.to(visible, {
      opacity: 0, scale: 0.96, duration: 0.3, ease: 'power2.in', stagger: 0.02,
      onComplete: () => {
        apply();
        const shown = cards.filter((c) => !c.classList.contains('is-hidden'));
        gsap.fromTo(shown, { opacity: 0, y: 30, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.06, clearProps: 'transform' });
      }
    });
  }));

  /* =====================================================================
     PROJECT MODAL / LIGHTBOX
     ===================================================================== */
  const modal = $('#modal');
  const panel = $('.modal__panel', modal);
  let list = [];
  let mIndex = 0;
  let lastFocus = null;

  const fillModal = (dir = 0) => {
    const p = projects[list[mIndex]];
    const img = $('#modalImg');
    const set = () => {
      img.src = imgUrl(p.img, 1600);
      img.srcset = srcset(p.img, [800, 1200, 1600, 2400]);
      img.sizes = '(min-width: 900px) 62vw, 100vw';
      img.alt = p.title;
      $('#modalCat').textContent = `${catLabel[p.category] || p.category} · ${p.status}`;
      $('#modalTitle').textContent = p.title;
      $('#modalText').textContent = p.text;
      $('#modalLoc').textContent = p.location;
      $('#modalArea').textContent = p.area;
      $('#modalYear').textContent = p.year;
      $('#modalStatus').textContent = p.status;
      $('#modalCount').textContent = `${String(mIndex + 1).padStart(2, '0')} / ${String(list.length).padStart(2, '0')}`;
    };
    if (animate && dir) {
      const parts = [img, ...$$('.modal__body > *', modal)];
      gsap.killTweensOf(parts);
      gsap.to(parts, {
        opacity: 0, x: -20 * dir, duration: 0.25, ease: 'power2.in',
        onComplete: () => {
          set();
          gsap.fromTo(parts, { opacity: 0, x: 24 * dir }, { opacity: 1, x: 0, duration: 0.55, ease: 'power3.out', stagger: 0.03 });
        }
      });
    } else set();
  };
  const openModal = (index) => {
    list = cards.filter((c) => !c.classList.contains('is-hidden')).map((c) => Number(c.dataset.index));
    mIndex = Math.max(0, list.indexOf(index));
    lastFocus = document.activeElement;
    fillModal();
    modal.hidden = false;
    body.classList.add('is-locked');
    $('.modal__close', modal).focus();
    if (animate) {
      gsap.fromTo('.modal__backdrop', { opacity: 0 }, { opacity: 1, duration: 0.4 });
      gsap.fromTo(panel, { opacity: 0, y: 40, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power4.out' });
    }
  };
  const closeModal = () => {
    body.classList.remove('is-locked');
    const done = () => { modal.hidden = true; if (lastFocus) lastFocus.focus({ preventScroll: true }); };
    if (animate) {
      gsap.to('.modal__backdrop', { opacity: 0, duration: 0.3 });
      gsap.to(panel, { opacity: 0, y: 30, duration: 0.3, ease: 'power2.in', onComplete: done });
    } else done();
  };
  const step = (d) => { mIndex = (mIndex + d + list.length) % list.length; fillModal(d); };

  cards.forEach((c) => c.addEventListener('click', () => openModal(Number(c.dataset.index))));
  $$('[data-close]', modal).forEach((el) => el.addEventListener('click', closeModal));
  $('#modalPrev').addEventListener('click', () => step(-1));
  $('#modalNext').addEventListener('click', () => step(1));
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'Tab') {
      const f = $$('button, a[href]', modal).filter((el) => el.offsetParent !== null);
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
  // swipe between projects on touch
  let mx = null;
  $('.modal__media', modal).addEventListener('touchstart', (e) => { mx = e.touches[0].clientX; }, { passive: true });
  $('.modal__media', modal).addEventListener('touchend', (e) => {
    if (mx === null) return;
    const dx = e.changedTouches[0].clientX - mx;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    mx = null;
  });

  /* =====================================================================
     TESTIMONIAL SLIDER
     ===================================================================== */
  const track = $('#ttrack');
  const tdots = $$('#tdots button');
  let tIndex = 0;
  let tTimer;
  const goT = (n) => {
    tIndex = (n + tlist.length) % tlist.length;
    track.style.transform = `translateX(-${tIndex * 100}%)`;
    tdots.forEach((d, i) => d.classList.toggle('is-active', i === tIndex));
  };
  const autoT = () => { clearInterval(tTimer); if (!reduceMotion) tTimer = setInterval(() => goT(tIndex + 1), 7000); };
  $('#tprev').addEventListener('click', () => { goT(tIndex - 1); autoT(); });
  $('#tnext').addEventListener('click', () => { goT(tIndex + 1); autoT(); });
  tdots.forEach((d, i) => d.addEventListener('click', () => { goT(i); autoT(); }));
  const tslider = $('#tslider');
  tslider.addEventListener('mouseenter', () => clearInterval(tTimer));
  tslider.addEventListener('mouseleave', autoT);
  let tx = null;
  const vp = $('.tslider__viewport');
  vp.addEventListener('pointerdown', (e) => { tx = e.clientX; });
  vp.addEventListener('pointerup', (e) => {
    if (tx === null) return;
    const dx = e.clientX - tx;
    if (Math.abs(dx) > 50) { goT(tIndex + (dx < 0 ? 1 : -1)); autoT(); }
    tx = null;
  });
  autoT();

  /* =====================================================================
     CONTACT FORM → WhatsApp
     ===================================================================== */
  const form = $('#contactForm');
  const status = $('#formStatus');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const errors = [];
    const mark = (name, bad) => form.elements[name].closest('.field').classList.toggle('is-invalid', bad);
    mark('name', !d.name || d.name.trim().length < 2); if (!d.name || d.name.trim().length < 2) errors.push('name');
    const digits = (d.phone || '').replace(/\D/g, '');
    mark('phone', digits.length < 10); if (digits.length < 10) errors.push('phone');
    mark('type', !d.type); if (!d.type) errors.push('project type');
    if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) { mark('email', true); errors.push('email'); } else mark('email', false);

    if (errors.length) {
      status.className = 'form__status is-error';
      status.textContent = `Please check your ${errors.join(', ')}.`;
      if (animate) gsap.fromTo(form, { x: -8 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      return;
    }
    const msg = [
      `Hello ${S.name}, I would like a free consultation.`,
      '',
      `Name: ${d.name.trim()}`,
      `Phone: ${d.phone.trim()}`,
      d.email ? `Email: ${d.email.trim()}` : null,
      `Project: ${d.type}`,
      d.message ? `Details: ${d.message.trim()}` : null
    ].filter((l) => l !== null).join('\n');
    window.open(`https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    status.className = 'form__status is-ok';
    status.textContent = 'Thank you! WhatsApp is opening with your details — just press send.';
    form.reset();
  });

  /* =====================================================================
     MOTION (GSAP)
     ===================================================================== */
  const preloader = $('#preloader');
  const bar = $('#preloaderBar');

  const splitWords = (el) => {
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span');
            w.className = 'w';
            const i = document.createElement('span');
            i.className = 'wi';
            i.textContent = part;
            w.appendChild(i);
            frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    walk(el);
    return $$('.wi', el);
  };

  let introDone = false;
  const heroIntro = () => {
    if (introDone) return;
    introDone = true;
    startHero();
    if (!animate) return;
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.from(header, { opacity: 0, duration: 1.2, ease: 'power2.out', clearProps: 'opacity' }, 0)
      .to('.hero__title .line > span', { yPercent: 0, duration: 1.4, stagger: 0.12 }, 0.05)
      .to('.hero__eyebrow, .hero__lead, .hero__actions', { y: 0, opacity: 1, duration: 1.1, stagger: 0.1 }, 0.35)
      .to('.hero__bottom', { opacity: 1, duration: 1 }, 0.8);
  };

  const setupScroll = () => {
    if (!animate) {
      $$('[data-count]').forEach((el) => { el.textContent = el.dataset.count; });
      return;
    }

    // split headings
    $$('[data-split]').forEach((el) => {
      const words = splitWords(el);
      gsap.from(words, {
        yPercent: 115, duration: 1.2, ease: 'power4.out', stagger: 0.045,
        scrollTrigger: { trigger: el, start: 'top 86%' }
      });
    });

    // fade-up reveals
    $$('[data-reveal]:not([data-reveal="clip"])').forEach((el) => {
      gsap.from(el, { y: 44, opacity: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
    });

    // image curtain reveals
    $$('[data-reveal="clip"]').forEach((el) => {
      gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'power4.inOut', clearProps: 'clipPath',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });

    // staggered groups
    $$('[data-stagger]').forEach((group) => {
      gsap.from(group.children, {
        y: 50, opacity: 0, duration: 1.1, ease: 'power3.out', stagger: 0.09,
        scrollTrigger: { trigger: group, start: 'top 85%' }
      });
    });

    // parallax images
    $$('[data-parallax]').forEach((img) => {
      gsap.fromTo(img, { yPercent: -7 }, {
        yPercent: 7, ease: 'none',
        scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    // hero content drifts away on scroll
    gsap.to('.hero__content', {
      yPercent: 18, opacity: 0.15, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });

    // counters
    $$('[data-count]').forEach((el) => {
      const target = Number(el.dataset.count);
      el.textContent = '0';
      ScrollTrigger.create({
        trigger: el, start: 'top 88%', once: true,
        onEnter: () => {
          const o = { v: 0 };
          gsap.to(o, { v: target, duration: 2.2, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(o.v); } });
        }
      });
    });

    // process line draws as you scroll
    const wrap = $('#processWrap');
    ScrollTrigger.create({
      trigger: wrap, start: 'top 75%', end: 'bottom 55%', scrub: true,
      onUpdate: (self) => wrap.style.setProperty('--p', self.progress.toFixed(3))
    });
  };

  // magnetic buttons (desktop only)
  if (animate && finePointer) {
    $$('[data-magnetic]').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.6, ease: 'power3.out' });
      });
      el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' }));
    });
  }

  // initial hero state (hidden behind preloader)
  if (animate) {
    gsap.set('.hero__title .line > span', { yPercent: 110 });
    gsap.set('.hero__eyebrow, .hero__lead, .hero__actions', { y: 30, opacity: 0 });
    gsap.set('.hero__bottom', { opacity: 0 });
  }
  setupScroll();

  /* ---------- Preloader ---------- */
  const heroImg = $('.hero__slide.is-active img');
  const started = performance.now();
  let progress = 0;
  const fake = setInterval(() => { progress = Math.min(progress + Math.random() * 18, 88); bar.style.width = `${progress}%`; }, 160);

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    clearInterval(fake);
    bar.style.width = '100%';
    const wait = Math.max(0, 1100 - (performance.now() - started)); // let the logo draw
    setTimeout(() => {
      if (animate) {
        gsap.to(preloader, {
          yPercent: -100, duration: 1.1, ease: 'power4.inOut',
          onComplete: () => { preloader.remove(); ScrollTrigger.refresh(); }
        });
        gsap.delayedCall(0.55, heroIntro);
        // safety net: if animation frames are throttled (battery saver, background tab),
        // never leave the visitor stuck behind the preloader
        setTimeout(() => {
          if (!preloader.isConnected) return;
          gsap.killTweensOf(preloader);
          preloader.remove();
          heroIntro();
          gsap.set('.hero__title .line > span', { yPercent: 0 });
          gsap.set('.hero__eyebrow, .hero__lead, .hero__actions, .hero__bottom', { y: 0, opacity: 1 });
          ScrollTrigger.refresh();
        }, 2500);
      } else {
        preloader.remove();
        heroIntro();
      }
    }, wait);
  };
  if (heroImg.complete) finish();
  else {
    heroImg.addEventListener('load', finish, { once: true });
    heroImg.addEventListener('error', finish, { once: true });
  }
  setTimeout(finish, 3500); // never block the visitor for long
})();
