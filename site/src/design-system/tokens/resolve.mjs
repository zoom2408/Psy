// Giải tham chiếu token dạng {color.cream.50}. Dùng chung cho script sinh CSS và trang catalog.
export function lookup(tokens, path) {
  return path.split('.').reduce((o, k) => (o == null ? o : o[k]), tokens);
}

export function resolve(tokens, value) {
  if (typeof value !== 'string') return value;
  return value.replace(/\{([^}]+)\}/g, (_, p) => {
    const v = lookup(tokens, p);
    if (v == null || typeof v === 'object') throw new Error(`Token không tồn tại: {${p}}`);
    return resolve(tokens, v);
  });
}
