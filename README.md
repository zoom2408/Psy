# Psy

Wiki các môn học cử nhân Tâm lý, viết bằng Obsidian, xuất bản thành website bằng Astro.

```
Psy/
├── vault/      # Obsidian vault (markdown). Chỉ viết nội dung ở đây
├── site/       # Website Astro + design system (token, component)
├── LOG.md      # Nhật ký yêu cầu và lý do
└── CLAUDE.md   # Quy ước làm việc với Claude Code
```

Luồng làm việc: **viết trong Obsidian → commit → build Astro → đưa thư mục `site/dist` lên host.**

---

## Phần A0. Quy trình xuất bản (iCloud → repo → domain)

Nội dung viết trong vault Obsidian ở iCloud (`~/Library/Mobile Documents/iCloud~md~obsidian/Documents/Psy`). Cấu trúc thư mục trong vault giống `vault/` của repo. Ghi chú cũ nằm ở `Archive/` và không được đồng bộ.

```bash
cd ~/Psy/site
npm run sync-vault     # iCloud -> ~/Psy/vault (rsync một chiều, bỏ Archive và .obsidian)
npm run dev            # xem thử
git add -A && git commit && git push   # Actions build và deploy lên psy.mindmirror.quest
```

- Nguồn gốc nội dung là vault iCloud. Đừng sửa trực tiếp `~/Psy/vault`, lần sync sau sẽ ghi đè.
- Mỗi ghi chú cần `slug` trong frontmatter (đường dẫn trang). Website đọc các note có `type: lecture | case-set | exam | cheatsheet` trong `10-Courses/<môn>/`.
- Cú pháp được dịch: `[[wikilink]]`, callout `> [!type]` (thêm `-` để gập), khối ` ```quiz `. Plugin ở `site/plugins/obsidian.mjs`.

---

## Phần A. Tạo Obsidian vault

1. Mở Obsidian → **Open folder as vault** → chọn thư mục `Psy/vault`.
   - Nếu `vault/` chưa tồn tại: tạo bằng `mkdir -p Psy/vault` rồi mở lại.
2. Vào **Settings → Files and links**:
   - `New link format`: **Relative path to file**
   - `Use [[Wikilinks]]`: **bật**
   - `Default location for new attachments`: **In subfolder under current folder** → `attachments`
3. Tạo cấu trúc thư mục:
   ```
   vault/
   ├── 00-Index/
   ├── 10-Courses/
   ├── 20-Concepts/
   ├── 30-People/
   ├── 40-Research/
   ├── 50-Sources/
   └── 90-Templates/
   ```
4. **Settings → Core plugins → Templates**: bật, đặt `Template folder location` = `90-Templates`.
5. Tạo template trong `90-Templates/` (mẫu dưới đây), dùng bằng lệnh *Insert template*.

### Frontmatter chuẩn (website đọc các trường này)

**Bài học** (`10-Courses/<mã môn>/Lectures/`)
```yaml
---
type: lecture
course: PSY-nhan-cach
title: Sigmund Freud và Phân tâm học
order: 2
tags: [nhan-cach, phan-tam]
status: draft        # draft | reviewed
---
```

**Khái niệm** (`20-Concepts/`)
```yaml
---
type: concept
title: Cơ chế phòng vệ
aliases: [Defense mechanisms]
tags: [nhan-cach]
---
```

**Môn học** (`10-Courses/<mã môn>/_Course.md`)
```yaml
---
type: course
title: Tâm lý học nhân cách
code: PSY-nhan-cach
year: 3
accent: violet        # màu nhấn của môn, xem tokens
prerequisites: []
---
```

Loại khác: `type: person` (30-People), `type: source` (50-Sources).

### Cú pháp đặc biệt trong note

| Viết | Hiển thị trên web |
|---|---|
| `[[Cơ chế phòng vệ]]` | Link tới trang khái niệm |
| `> [!definition] Tiêu đề` | Khối định nghĩa |
| `> [!example]`, `> [!experiment]`, `> [!case]`, `> [!note]` | Ví dụ, thí nghiệm, ca, ghi chú |
| Khối ` ```quiz ` | Quiz tương tác (định dạng bên dưới) |
| `![[hinh.png]]` | Ảnh |

**Quiz**
````
```quiz
Q: Cấu trúc nhân cách ba ngôi của Freud gồm những gì?
- [ ] Ego, Id, Persona
- [x] Id, Ego, Superego
- [ ] Self, Shadow, Anima
Giải thích: Freud chia nhân cách thành Id, Ego, Superego.
```
````

### Quy ước
- Tên file bài: `02 - Freud và Phân tâm học.md`; khái niệm: tên thuần (`Cơ chế phòng vệ.md`).
- Mỗi khái niệm 1 note, các môn khác nhau cùng link tới.
- Không để file PDF/giáo trình có bản quyền trong vault nếu repo public.
- `.gitignore` cần có: `vault/.obsidian/workspace*.json`, `.DS_Store`, `node_modules`, `site/dist`.

---

## Phần B. Dựng website bằng Astro (step by step)

### 1. Chuẩn bị
- Cần **Node.js 22.22 trở lên** (Astro 7). Repo có `.nvmrc` = 24.
  ```bash
  nvm install 24   # nếu chưa có
  nvm use          # đọc .nvmrc ở thư mục gốc
  node -v          # phải >= 22.22
  ```
  Máy mặc định đang là Node 18, nên **mỗi terminal mới phải chạy `nvm use`** trước khi dùng `npm`.
- Cài git, đã đăng nhập GitHub (`gh auth status`).

### 2. Tạo project (đã làm sẵn, ghi lại để biết nguồn gốc)
```bash
cd ~/Psy
npm create astro@latest site -- --template minimal --no-git
```
Thư mục `site/` đã được dựng. Chỉ cần cài thư viện khi clone repo về máy mới:
```bash
cd site && npm install
```

### 3. Chạy thử
```bash
cd site
npm run dev
```
Mở http://localhost:4321 (trang chủ) và http://localhost:4321/design-system/ (catalog token và component). Sửa file là trang tự cập nhật.

### 4. Hiểu cấu trúc `site/`
```
site/
├── astro.config.mjs     # cấu hình (base path, plugin markdown)
├── src/
│   ├── pages/           # mỗi file = 1 trang (route)
│   ├── layouts/         # khung trang (3 cột, header)
│   ├── components/      # Callout, Quiz, Sidebar, TOC...
│   ├── styles/          # tokens.css, base.css
│   └── content.config.ts# khai báo nguồn nội dung = ../vault
└── package.json
```

### 5. Cho Astro đọc vault
Trong `src/content.config.ts`, khai báo collection dùng `glob` trỏ tới `../vault` (chỉ lấy `**/*.md`, bỏ `90-Templates`, `.obsidian`). Mỗi loại `type` (lecture, concept, person...) có schema frontmatter riêng để build báo lỗi nếu thiếu trường.

### 6. Dịch cú pháp Obsidian
Thêm plugin remark/rehype vào `astro.config.mjs`:
- wikilink `[[...]]` → link nội bộ
- callout `> [!type]` → component Callout
- khối ` ```quiz ` → component Quiz

(Phần này sẽ được dựng sẵn trong `site/plugins/`.)

### 7. Tạo trang động
- `src/pages/[...slug].astro`: sinh trang cho mọi note.
- Trang môn, trang khái niệm, trang chủ đọc từ collection và dựng danh sách, backlinks.

### 8. Build
```bash
npm run build      # ra thư mục site/dist (HTML tĩnh)
npm run preview    # xem bản build
```

---

## Phần C. Đóng gói và đưa lên host

Output `site/dist` là file tĩnh nên đặt được ở bất kỳ host static nào.

**Nếu đặt dưới đường dẫn con** (vd GitHub Pages `https://zoom2408.github.io/Psy/`), trong `astro.config.mjs`:
```js
export default defineConfig({
  site: 'https://zoom2408.github.io',
  base: '/Psy',
});
```
Nếu dùng domain riêng hoặc gốc domain, bỏ `base`.

**Cách deploy** (chọn một):
1. **GitHub Pages**: bật *Settings → Pages → Source: GitHub Actions*, thêm workflow build `site/` và upload `site/dist`.
2. **Host khác** (Netlify, Cloudflare Pages, Vercel...): trỏ vào repo, build command `cd site && npm ci && npm run build`, publish directory `site/dist`.
3. **Thủ công**: nén `site/dist` rồi upload qua FTP/dashboard của host.

Không cần chạy server, không cần database.

---

### Đóng gói thủ công
```bash
cd site
npm run pack      # build + nén site/dist thành site/psy-site.zip
```
File zip chứa toàn bộ website tĩnh (kể cả font), giải nén lên host nào cũng chạy. Nếu host đặt site ở đường dẫn con, build với `BASE_PATH`:
```bash
SITE_URL=https://zoom2408.github.io BASE_PATH=/Psy npm run build
```

---

## Phần E. Design system

Nằm ở `site/src/design-system/`, tách riêng khỏi nội dung để tái sử dụng hoặc đóng gói sau này.
Xem catalog sống tại `/design-system/` (token, component, đủ trạng thái, thử tương tác trực tiếp).

```
design-system/
├── tokens/tokens.json     # nguồn token duy nhất (sửa ở đây)
├── tokens/tokens.css      # sinh tự động bởi `npm run tokens`, không sửa tay
├── styles/                # base.css (reset), prose.css (kiểu chữ nội dung)
├── components/            # Button, Tag, Callout, Quiz, QuizSet, Flashcard, CourseCard,
│                          # CourseTree, Toc, Breadcrumb, PrevNext, Backlinks, SearchBox,
│                          # ThemeToggle, ReadingProgress, Header, Icon
└── docs/                  # chỉ dùng cho trang catalog
```

- **Đổi giao diện:** sửa `tokens.json` rồi `npm run tokens` (chạy tự động trước `dev` và `build`). Mọi component dùng biến CSS nên đổi một chỗ là cập nhật toàn site.
- **Màu nhấn theo môn:** `data-accent="violet"` (teal, violet, amber, rose, blue, green) trên phần tử bao ngoài, hoặc `accent` ở `BaseLayout`.
- **Dark mode:** tự theo hệ thống, nút ThemeToggle chuyển Tự động, Sáng, Tối. Dùng CSS `light-dark()` (Chrome 123+, Safari 17.5+, Firefox 120+).
- **Giảm chuyển động:** tôn trọng `prefers-reduced-motion`; nội dung vẫn hiển thị khi tắt JavaScript.
- **Thêm component:** tạo `components/Ten.astro`, chỉ dùng biến token, làm đủ trạng thái (default, hover, focus-visible, active, disabled, loading, empty khi áp dụng), rồi thêm mẫu vào `src/pages/design-system/index.astro`.
- **Đóng gói thành package sau này:** copy `design-system/` sang repo riêng, thêm `package.json` với `exports` trỏ tới `tokens.css`, `styles/*.css` và `components/*.astro`.
- **Font:** tự host qua `@fontsource` (Source Serif 4, Be Vietnam Pro, có bộ tiếng Việt), không phụ thuộc Google Fonts.

---

## Phần D. Quy trình hằng ngày
1. Mở vault trong Obsidian, viết/sửa note.
2. `cd site && npm run dev` để xem trên web.
3. Commit theo môn: `PSY-nhan-cach: thêm bài Freud`.
4. Push → (nếu đã cấu hình) tự build và deploy.
