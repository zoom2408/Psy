// Remark plugin dịch cú pháp Obsidian sang HTML của design system:
//   [[Tên|Hiển thị]]     -> liên kết nội bộ (hoặc .is-missing nếu chưa có trang)
//   > [!type] Tiêu đề    -> callout (thêm - sau ] để gập sẵn)
//   ```quiz              -> câu hỏi trắc nghiệm tương tác (markup khớp component Quiz)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const VAULT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../vault');
const COURSES = path.join(VAULT, '10-Courses');

const ICONS = {
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'book-open': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  lightbulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  flask: '<path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/>',
  'file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'
};
const icon = (n, s = 16, cls = '') => `<svg class="${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[n]}</svg>`;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const CALLOUTS = {
  definition: { label: 'Định nghĩa', icon: 'book-open', color: 'accent' },
  example: { label: 'Ví dụ', icon: 'lightbulb', color: 'success' },
  experiment: { label: 'Thí nghiệm', icon: 'flask', color: 'warning' },
  case: { label: 'Ca / Tình huống', icon: 'file-text', color: 'danger' },
  note: { label: 'Ghi chú', icon: 'info', color: 'info' },
  answer: { label: 'Gợi ý', icon: 'lightbulb', color: 'success' }
};

// Chỉ mục tên note -> URL, quét một lần khi nạp cấu hình.
function buildIndex(base) {
  const idx = new Map();
  if (!fs.existsSync(COURSES)) return idx;
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : e.name.endsWith('.md') ? [path.join(dir, e.name)] : []));
  for (const f of walk(COURSES)) {
    const course = path.relative(COURSES, f).split(path.sep)[0];
    const name = path.basename(f, '.md');
    const src = fs.readFileSync(f, 'utf8');
    const fmText = /^---\n([\s\S]*?)\n---/.exec(src)?.[1] ?? '';
    const slug = /^slug:\s*(.+)$/m.exec(fmText)?.[1].trim();
    const title = /^title:\s*(.+)$/m.exec(fmText)?.[1].trim();
    const url = name === '_Course' ? `${base}/${course}/` : slug ? `${base}/${course}/${slug}/` : null;
    if (!url) continue;
    idx.set(name.toLowerCase(), url);
    if (title && name !== '_Course') idx.set(title.toLowerCase(), url);
  }
  return idx;
}

function quizHtml(code, n) {
  let q = '', exp = '';
  const opts = [];
  for (const line of code.split('\n')) {
    let m;
    if ((m = /^Q:\s*(.*)$/.exec(line))) q = m[1];
    else if ((m = /^-\s*\[( |x|X)\]\s*(.*)$/.exec(line))) opts.push({ text: m[2], correct: m[1] !== ' ' });
    else if ((m = /^Giải thích:\s*(.*)$/.exec(line))) exp = m[1];
  }
  const name = `vq-${n}`;
  const options = opts.map((o, i) => `<label class="quiz__opt"><input type="radio" name="${name}" value="${i}" data-correct="${o.correct}"/><span class="quiz__marker" aria-hidden="true"><span class="quiz__dot"></span></span><span class="quiz__text">${esc(o.text)}</span><span class="quiz__verdict" aria-hidden="true"><span class="quiz__ico quiz__ico--ok">${icon('check')}</span><span class="quiz__ico quiz__ico--no">${icon('x')}</span></span></label>`).join('');
  return `<psy-quiz class="quiz" data-state="idle"><fieldset class="quiz__fieldset"><legend class="quiz__q"><span>${esc(q)}</span></legend><div class="quiz__options">${options}</div></fieldset><div class="quiz__bar"><button type="button" class="btn btn--primary btn--sm is-disabled" disabled aria-disabled="true" data-quiz-check><span class="btn__spinner" aria-hidden="true"></span><span class="btn__icon btn__icon--start"></span><span class="btn__label">Kiểm tra</span><span class="btn__icon btn__icon--end"></span></button><p class="quiz__feedback" role="status" aria-live="polite"></p></div>${exp ? `<div class="quiz__explain" data-open="false"><div class="quiz__explain-inner"><p><strong>Giải thích.</strong> ${esc(exp)}</p></div></div>` : ''}</psy-quiz>`;
}

export default function remarkObsidian(options = {}) {
  const base = (options.base ?? '').replace(/\/$/, '');
  const index = buildIndex(base);
  let counter = 0;

  const WIKI = /\[\[([^\]|#]+?)(?:#[^\]|]*)?(?:\|([^\]]+))?\]\]/g;
  function wikiNodes(value) {
    const out = []; let last = 0, m;
    WIKI.lastIndex = 0;
    while ((m = WIKI.exec(value))) {
      if (m.index > last) out.push({ type: 'text', value: value.slice(last, m.index) });
      const target = m[1].trim(), label = (m[2] ?? m[1]).trim();
      const url = index.get(target.toLowerCase());
      out.push(url
        ? { type: 'link', url, children: [{ type: 'text', value: label }], data: { hProperties: { className: ['wikilink'] } } }
        : { type: 'text', value: label, data: {} , _missing: true });
      last = m.index + m[0].length;
    }
    if (!out.length) return null;
    if (last < value.length) out.push({ type: 'text', value: value.slice(last) });
    return out.map((n) => n._missing
      ? { type: 'emphasis', data: { hName: 'span', hProperties: { className: ['wikilink', 'is-missing'], title: 'Chưa có trang' } }, children: [{ type: 'text', value: n.value }] }
      : n);
  }

  function callout(node) {
    const p = node.children[0];
    if (p?.type !== 'paragraph' || p.children[0]?.type !== 'text') return null;
    const m = /^\[!(\w+)\]([-+]?)[ \t]*([^\n]*)\n?/.exec(p.children[0].value);
    if (!m) return null;
    const cfg = CALLOUTS[m[1].toLowerCase()] ?? CALLOUTS.note;
    const fold = m[2] !== '';
    p.children[0].value = p.children[0].value.slice(m[0].length);
    if (!p.children[0].value) p.children.shift();
    const rest = p.children.length ? [p, ...node.children.slice(1)] : node.children.slice(1);
    const head = `<span class="callout__icon">${icon(cfg.icon)}</span><span class="callout__titles"><span class="callout__kind">${cfg.label}</span>${m[3] ? `<span class="callout__title">${esc(m[3])}</span>` : ''}</span>${fold ? icon('chevron-down', 18, 'callout__chev') : ''}`;
    return {
      type: 'callout', data: { hName: fold ? 'details' : 'div', hProperties: { className: ['callout', `callout--${cfg.color}`], 'data-callout': m[1].toLowerCase() } },
      children: [
        { type: 'html', value: `<${fold ? 'summary' : 'div'} class="callout__head">${head}</${fold ? 'summary' : 'div'}>` },
        { type: 'calloutBody', data: { hName: 'div', hProperties: { className: ['callout__body'] } }, children: rest }
      ]
    };
  }

  function visit(node) {
    if (!node.children) return;
    for (let i = 0; i < node.children.length; i++) {
      const c = node.children[i];
      if (c.type === 'code' && c.lang === 'quiz') { node.children[i] = { type: 'html', value: quizHtml(c.value, ++counter) }; continue; }
      if (c.type === 'blockquote') { const k = callout(c); if (k) { node.children[i] = k; visit(k); continue; } }
      if (c.type === 'text') {
        const w = wikiNodes(c.value);
        if (w) { node.children.splice(i, 1, ...w); i += w.length - 1; }
        continue;
      }
      if (c.type === 'code' || c.type === 'inlineCode' || c.type === 'html') continue;
      visit(c);
    }
  }
  return (tree) => {
    // Trang tự hiển thị h1 từ frontmatter, bỏ h1 đầu tiên trong note để khỏi trùng.
    const h1 = tree.children.findIndex((n) => n.type === 'heading' && n.depth === 1);
    if (h1 >= 0) tree.children.splice(h1, 1);
    visit(tree);
  };
}
