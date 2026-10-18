  class PsyQuiz extends HTMLElement {
    connectedCallback() {
      if (this.dataset.ready) return;
      this.dataset.ready = '1';
      this.btn = this.querySelector('[data-quiz-check]');
      this.fs = this.querySelector('fieldset');
      this.fb = this.querySelector('.quiz__feedback');
      this.explain = this.querySelector('.quiz__explain');
      this.addEventListener('change', () => this.setState('selected'));
      this.btn.addEventListener('click', () => (this.dataset.state === 'correct' || this.dataset.state === 'wrong' ? this.reset() : this.check()));
      this.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && this.dataset.state === 'selected') { e.preventDefault(); this.check(); }
      });
    }
    enable(on) {
      this.btn.disabled = !on;
      this.btn.classList.toggle('is-disabled', !on);
      if (on) this.btn.removeAttribute('aria-disabled'); else this.btn.setAttribute('aria-disabled', 'true');
    }
    setState(s) {
      this.dataset.state = s;
      if (s === 'selected') this.enable(true);
    }
    check() {
      const picked = this.querySelector('input:checked');
      if (!picked) return;
      const ok = picked.dataset.correct === 'true';
      this.querySelectorAll('.quiz__opt').forEach((l) => {
        const inp = l.querySelector('input');
        l.classList.toggle('is-correct', inp.dataset.correct === 'true');
        l.classList.toggle('is-wrong', inp === picked && !ok);
      });
      this.fs.disabled = true;
      this.setState(ok ? 'correct' : 'wrong');
      this.fb.textContent = ok ? 'Chính xác!' : 'Chưa đúng. Đáp án đúng được tô màu xanh.';
      this.btn.querySelector('.btn__label').textContent = 'Làm lại';
      if (this.explain) this.explain.dataset.open = 'true';
      if (ok) this.burst(picked.closest('label'));
      else { this.classList.remove('is-shaking'); void this.offsetWidth; this.classList.add('is-shaking'); }
      this.dispatchEvent(new CustomEvent('quiz:answered', { bubbles: true, detail: { correct: ok } }));
    }
    reset() {
      this.querySelectorAll('input').forEach((i) => (i.checked = false));
      this.querySelectorAll('.quiz__opt').forEach((l) => l.classList.remove('is-correct', 'is-wrong'));
      this.fs.disabled = false;
      this.fb.textContent = '';
      this.enable(false);
      this.btn.querySelector('.btn__label').textContent = 'Kiểm tra';
      if (this.explain) this.explain.dataset.open = 'false';
      this.classList.remove('is-shaking');
      this.setState('idle');
      this.dispatchEvent(new CustomEvent('quiz:reset', { bubbles: true }));
    }
    burst(label) {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches || !label) return;
      const box = this.getBoundingClientRect();
      const r = label.getBoundingClientRect();
      const colors = ['--success-solid', '--accent-solid', '--warning-solid', '--info-solid'];
      for (let i = 0; i < 10; i++) {
        const d = document.createElement('span');
        const a = (Math.PI * 2 * i) / 10 + Math.random() * 0.4;
        const dist = 36 + Math.random() * 28;
        d.className = 'quiz__burst';
        d.style.left = r.right - box.left - 28 + 'px';
        d.style.top = r.top - box.top + r.height / 2 - 4 + 'px';
        d.style.setProperty('--dx', Math.cos(a) * dist + 'px');
        d.style.setProperty('--dy', Math.sin(a) * dist + 'px');
        d.style.setProperty('--c', `var(${colors[i % colors.length]})`);
        d.addEventListener('animationend', () => d.remove());
        this.appendChild(d);
      }
    }
  }
  if (!customElements.get('psy-quiz')) customElements.define('psy-quiz', PsyQuiz);
