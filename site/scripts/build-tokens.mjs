// Sinh src/design-system/tokens/tokens.css từ tokens.json
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from '../src/design-system/tokens/resolve.mjs';

const root = new URL('../src/design-system/tokens/', import.meta.url);
const t = JSON.parse(readFileSync(new URL('tokens.json', root), 'utf8'));
const r = (v) => resolve(t, v);

const out = [];
const decl = (name, value) => `  --${name}: ${value};`;

// 1. Primitive color
const prim = [];
for (const [name, val] of Object.entries(t.color)) {
  if (typeof val === 'string') prim.push(decl(`color-${name}`, val));
  else for (const [step, hex] of Object.entries(val)) prim.push(decl(`color-${name}-${step}`, hex));
}

// 2. Semantic color: light-dark(light, dark)
const sem = Object.entries(t.semantic).map(([name, [l, d]]) => decl(`color-${name}`, `light-dark(${r(l)}, ${r(d)})`));

// 3. Ramp -> role tokens (mỗi màu đều có bộ vai trò như nhau)
const roles = (c) => {
  const v = (n) => t.color[c][n];
  return {
    tint: `light-dark(${v(50)}, color-mix(in srgb, ${v(300)} 14%, transparent))`,
    'tint-strong': `light-dark(${v(100)}, color-mix(in srgb, ${v(300)} 26%, transparent))`,
    border: `light-dark(color-mix(in srgb, ${v(500)} 40%, transparent), color-mix(in srgb, ${v(300)} 42%, transparent))`,
    solid: `light-dark(${v(600)}, ${v(300)})`,
    'solid-hover': `light-dark(${v(700)}, color-mix(in srgb, ${v(300)} 82%, white))`,
    'on-solid': `light-dark(${t.color.white}, ${t.color.night[950]})`,
    text: `light-dark(${v(700)}, ${v(300)})`
  };
};
const ramps = t.accents.list.map((c) => decl_ramp(c));
function decl_ramp(c) {
  return Object.entries(roles(c)).map(([k, val]) => decl(`c-${c}-${k}`, val)).join('\n');
}
const alias = (prefix, c) => Object.keys(roles(c)).map((k) => decl(`${prefix}-${k}`, `var(--c-${c}-${k})`)).join('\n');

const status = Object.entries(t.accents.status).map(([name, c]) => alias(name, c)).join('\n');

// 4. Non-color
const group = (prefix, obj) => Object.entries(obj).map(([k, v]) => decl(`${prefix}-${k}`, r(v)));
const misc = [
  ...group('font', t.font),
  ...group('text', t.text),
  ...group('leading', t.leading),
  ...group('weight', t.weight),
  ...group('tracking', t.tracking),
  ...group('space', t.space),
  ...group('radius', t.radius),
  ...group('shadow', t.shadow),
  ...group('duration', t.duration),
  ...group('ease', t.ease),
  ...group('layout', t.layout),
  ...group('z', t.z)
];

out.push('/* GENERATED bởi scripts/build-tokens.mjs từ tokens.json. Đừng sửa tay. */');
out.push(':root {\n  color-scheme: light dark;\n' + [...prim, ...sem, '', ...ramps, '', alias('accent', t.accents.default), '', status, '', ...misc].join('\n') + '\n}');
out.push('[data-theme="light"] { color-scheme: light; }');
out.push('[data-theme="dark"] { color-scheme: dark; }');
for (const c of t.accents.list) out.push(`[data-accent="${c}"] {\n${alias('accent', c)}\n}`);

writeFileSync(new URL('tokens.css', root), out.join('\n\n') + '\n');
console.log('tokens.css đã sinh:', out.join('').length, 'ký tự');
