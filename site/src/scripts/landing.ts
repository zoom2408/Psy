  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero: vệt sáng đi theo con trỏ
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero && !reduce) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
      hero.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
    });
  }

  // Số đếm lên khi vào khung nhìn
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    if (reduce || !('IntersectionObserver' in window)) return;
    el.textContent = '0';
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 900;
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
  });

  // Tab dùng chung: click, mũi tên, Home/End
  function tabs(list: HTMLElement, onSelect?: (tab: HTMLElement) => void) {
    const all = [...list.querySelectorAll<HTMLElement>('[role="tab"]')];
    const select = (tab: HTMLElement, focus = false) => {
      all.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        const p = document.getElementById(t.getAttribute('aria-controls') || '');
        if (p) p.hidden = !on;
      });
      if (focus) tab.focus();
      onSelect?.(tab);
    };
    all.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        const vertical = list.getAttribute('aria-orientation') === 'vertical' && !matchMedia('(max-width: 860px)').matches;
        const next = vertical ? 'ArrowDown' : 'ArrowRight', prev = vertical ? 'ArrowUp' : 'ArrowLeft';
        let j = -1;
        if (e.key === next || e.key === 'ArrowRight' && !vertical) j = (i + 1) % all.length;
        else if (e.key === prev || e.key === 'ArrowLeft' && !vertical) j = (i - 1 + all.length) % all.length;
        else if (e.key === 'Home') j = 0;
        else if (e.key === 'End') j = all.length - 1;
        if (j >= 0) { e.preventDefault(); select(all[j], true); }
      });
    });
    return { select, all };
  }

  const demo = document.querySelector<HTMLElement>('.lp-seg');
  if (demo) tabs(demo);
