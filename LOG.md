# LOG

Ghi lại mọi yêu cầu và lý do khi làm việc trong repo này. Mới nhất ở trên cùng.

Mỗi entry: ngày, yêu cầu, lý do, việc đã làm, ghi chú/giả định.

---

## 2026-10-17

### #013 Thêm phần Bài viết học thuật kiểu Medium
- **Yêu cầu:** Thêm phần bài viết học thuật vào site, cấu trúc như articles của Medium.
- **Lý do:** Ngoài mục lục môn học, cần chỗ đọc sâu một khái niệm hoặc mô hình, có trích dẫn và tài liệu tham khảo, gắn với môn tương ứng.
- **Đã làm:** Dữ liệu `src/data/articles.ts` (tiêu đề, phụ đề, tóm tắt, tác giả, ngày, thời gian đọc, mục, tài liệu tham khảo). Component mới `ArticleCard` (row và featured) và `Footer`; `Tag` nhận thêm thuộc tính; `Header` có menu Môn học / Bài viết. Trang `/bai-viet/` (danh sách, lọc theo môn, nhớ bộ lọc qua #hash) và `/bai-viet/<slug>/` (breadcrumb, tiêu đề lớn, byline, nút Hữu ích và Chép link, khung Tóm tắt, trích dẫn [^1] thành chỉ số nhảy tới mục Tài liệu tham khảo, mục lục bên phải, "Đọc tiếp"). Trang chủ có mục Bài viết; trang môn có mục Bài viết học thuật và nhóm "Bài viết học thuật" ở sidebar. Catalog thêm ArticleCard.
- **Kiểm thử:** Chrome: lọc, mở bài, Hữu ích (lưu localStorage), Chép link (clipboard đúng), nhảy tới tài liệu tham khảo, sidebar môn, không tràn ngang mobile, không lỗi console.
- **Ghi chú:** [Assumed: bài viết ở cấp site, mỗi bài gắn một môn.] 3 bài mẫu do mình soạn là BẢN NHÁP, trích dẫn chỉ gồm các nguồn kinh điển (Zubin và Spring 1977; Nuechterlein và Dawson 1984; Clark 1986; Beck 1967; Beck và cộng sự 1979) cần bạn đối chiếu trước khi dùng. Sau này đọc bài từ `vault/40-Research` thay vì file dữ liệu. Chưa commit.

### #012 Bỏ màu riêng từng môn, trang môn theo kiểu GitBook
- **Yêu cầu:** Không đổi màu theo từng course, dùng một bộ màu ở landing page. Cấu trúc course theo kiểu GitBook.
- **Lý do:** Giao diện thống nhất một nhận diện; môn học đọc như một cuốn sách có mục lục, dễ mở rộng khi thêm bài.
- **Đã làm:** Bỏ `accent` khỏi dữ liệu môn/chuyên đề, landing và trang môn đều dùng màu mặc định (teal). Bỏ explorer tab. Trang môn thành khung GitBook (`layouts/CourseLayout.astro` + `styles/course-doc.css`): sidebar mục lục (Bắt đầu / Chuyên đề / Ôn tập, mục hiện tại sáng), nội dung giữa, "Trên trang này" bên phải, breadcrumb, Trước/Sau, drawer trên mobile. Route: `/tam-benh-hoc/` (giới thiệu), `/tam-benh-hoc/<chuyen-de>/` (6 trang), `/tam-benh-hoc/on-tap/` (flashcard + quiz). Hàm `coursePages()` trong `data/courses.ts` sinh danh sách trang.
- **Kiểm thử:** Chrome: không còn data-accent trên trang môn, mục hiện tại đúng, Trước/Sau, TOC, drawer mobile, không tràn ngang, không lỗi console.
- **Ghi chú:** Trang chuyên đề hiện là khung (nội dung chính, điểm cần nhớ, tài liệu), chưa có bài chi tiết cho đến khi chuyển từ `vault/`. Mục sidebar hiện 2 cấp; khi có bài chi tiết sẽ thêm cấp trang con. Màu nhấn theo môn vẫn còn trong design system (token) nhưng không dùng. Chưa commit.

### #011 Tách landing: trang chủ hệ thống + trang riêng cho từng môn
- **Yêu cầu:** Không gộp chung. Cần một landing page riêng, từ đó vào landing của từng course riêng.
- **Lý do:** Trang chủ giới thiệu hệ thống và danh sách môn; mỗi môn có trang giới thiệu riêng, màu nhấn riêng, thêm môn mới không phải viết lại trang.
- **Đã làm:** `pages/index.astro` còn: hero hệ thống, lưới môn học (môn có nội dung link vào trang môn, môn chưa có ghi "Sắp có"), cách hoạt động + demo Obsidian/web, CTA. Thêm route động `pages/[course]/index.astro` (landing từng môn: breadcrumb, hero, explorer chuyên đề, flashcard, quiz, môn khác); hiện có `/tam-benh-hoc/`. Dữ liệu môn nằm ở `src/data/courses.ts` (đặt `ready: true` và điền modules/cards/quiz là có trang). CSS tách ra `styles/landing.css`, JS ra `scripts/landing.ts`. Link `/tam-benh-hoc/#loan-than` mở sẵn đúng chuyên đề.
- **Kiểm thử:** Chrome: card từ trang chủ vào trang môn, tab, phím mũi tên, chip, hash, lật thẻ đều đạt; không tràn ngang mobile; không lỗi console; build sạch.
- **Ghi chú:** Chưa commit. Nội dung chuyên đề vẫn là bản tóm tắt tạm, sẽ thay bằng nội dung từ `vault/` khi chuyển môn.

### #010 Landing page giới thiệu hệ thống + môn Tâm bệnh học
- **Yêu cầu:** Dùng design system dựng layout landing page giới thiệu hệ thống web và chi tiết môn Tâm bệnh học. Làm landing page trước, dạng interactive, hấp dẫn.
- **Lý do:** Có trang chủ thật làm mặt tiền và kiểm chứng design system trên một trang hoàn chỉnh, trước khi chuyển nội dung.
- **Đã làm:** Viết lại `site/src/pages/index.astro`. Các phần: hero (vệt sáng theo con trỏ, chip chuyên đề, số đếm lên), cách hoạt động (3 bước, nút chuyển "ghi chú Obsidian / trang web"), explorer 6 chuyên đề Tâm bệnh học (tab dọc, mỗi chuyên đề một màu nhấn, hỗ trợ phím mũi tên), 3 flashcard, QuizSet 3 câu, lưới các môn (1 có, 5 "Sắp có"), CTA, footer. Chỉ dùng component có sẵn.
- **Kiểm thử:** Chrome: tab, phím mũi tên, chuyển demo, chip nhảy tới chuyên đề, lật thẻ đều chạy; không tràn ngang ở 390px; không lỗi console; có chụp bản sáng, tối, mobile.
- **Ghi chú:** [Assumed: 6 chuyên đề = 6 bộ bài trong repo TamBenhHoc; "40 câu" = bài thi tổng hợp 20 kiến thức + 20 ca; "6 bộ ca" = 5 theo chuyên đề + 1 tổng hợp.] Nội dung tóm tắt và 3 flashcard/quiz là mình soạn theo DSM-5, cần bạn rà. Ba môn khác ngoài Tâm bệnh học là tên giả định. Chip trôi liên tục đã bỏ vì làm đích bấm di chuyển. Chưa commit.

### #009 Build design system (style A + B, micro-interaction, đủ state)
- **Yêu cầu:** Chọn style A và B. Thêm micro-interaction tạo cảm giác hứng thú. Các state phải đủ.
- **Lý do:** Có nền tảng token + component dùng chung trước khi chuyển nội dung các môn; dễ đóng gói và đưa lên host sau này.
- **Đã làm:** Dựng `site/` (Astro 7). Token trong `tokens.json` sinh `tokens.css` (primitive, semantic sáng/tối bằng `light-dark()`, 6 màu nhấn theo môn). 16 component + trang catalog `/design-system/` (mọi state, thử tương tác). A = bề mặt đọc (serif, kem, cột 680px); B = bề mặt tương tác (sans, bo lớn, bóng mềm). Micro-interaction: nhấn thu nhỏ/bật lại, quiz đúng (vẽ dấu tick, pháo hoa nhỏ) và sai (lắc), điểm đếm lên, flashcard lật 3D, thanh tiến độ đọc, chỉ báo TOC trượt, theme icon xoay, link/arrow trượt, skeleton shimmer, view transition giữa các trang. Thêm `npm run pack` (zip dist), `.gitignore`, cập nhật README (Phần B, C, E).
- **Kiểm thử:** build sạch; toàn bộ kiểm tra tương tác trên Chrome đạt (quiz, flashcard, search, theme, drawer mobile, bàn phím, reduced-motion, tắt JS, không tràn ngang mobile); tương phản >= 4.5 cả sáng/tối. Lỗi đã sửa trong lúc test: nút Kiểm tra không bật lại, Escape xóa luôn ô tìm kiếm, state sai của quiz bị đè màu, amber 4.44 (đổi #A06400), loading ghost button.
- **Ghi chú:** Astro mới nhất cần Node >= 22.22; máy mặc định Node 18 nên dùng `nvm use` (đã có `.nvmrc` = 24). SearchBox mới có UI và API (`setResults`), dữ liệu thật (Pagefind) làm sau. Chưa commit. Telemetry của Astro đang bật mặc định. Chưa chuyển nội dung môn nào (bước kế tiếp: TLH_NhanCach).

### #008 README, design system, 3 phương án style
- **Yêu cầu:** (1) README hướng dẫn Astro step by step + cách tạo Obsidian vault. (2) Xây design system với token chuẩn và component cho repo, sau này đóng gói và đưa lên host. (3) Gợi ý 3 phương án design style trước khi build.
- **Lý do:** Hạ tầng đồng bộ (token + component) để mọi môn dùng chung; static output để chuyển host linh hoạt.
- **Đã làm:** Viết `README.md` (Phần A vault, B Astro, C đóng gói/host, D quy trình). Đưa 3 phương án style, chưa build gì.
- **Ghi chú:** Máy đang Node 18.20.8, README khuyên nâng lên Node 20+ (chưa kiểm chứng yêu cầu Node chính xác của bản Astro mới nhất). Chờ user chọn style.

### #007 Hỏi: Astro là gì
- **Yêu cầu:** Giải thích Astro.
- **Lý do:** Cần hiểu công cụ được đề xuất trước khi duyệt hướng.
- **Đã làm:** Giải thích ngắn trong chat, không đổi file.

### #006 Gợi ý layout/style và cấu trúc website đọc từ wiki
- **Yêu cầu:** Làm trước 1 môn; nhưng trước đó gợi ý style layout thiết kế và cấu trúc website gọi content từ wiki ra.
- **Lý do:** Chốt kiến trúc và giao diện trước để khi chuyển nội dung 1 môn thì dùng làm mẫu cho các môn sau.
- **Đã làm:** Đề xuất: vault markdown (`vault/`) tách khỏi website (`site/`, Astro, deploy GitHub Pages); layout 3 cột; callout Obsidian map sang component; quiz lưu trong markdown. Chưa tạo file nào.
- **Ghi chú:** [Assumed: môn làm thử = TLH_NhanCach; website do Astro build; nội dung tiếng Việt.] Chờ user duyệt hướng.

### #005 Đọc nội dung từng repo môn học
- **Yêu cầu:** `strengthfinder` không phải môn, loại ra. Đọc nội dung từng repo còn lại.
- **Lý do:** Nắm nội dung thật để quyết định cách chuyển vào vault Psy.
- **Đã làm:** Clone nông 7 repo vào scratchpad (không nằm trong Psy), đọc README, tiêu đề, các mục h2. Repo: TLH_NhanThuc, TLH_NhanCach, TLH_HK4, TamBenhHoc, TBH_Phat_trien, ThongKe, mindfulness.
- **Ghi chú:** Tất cả là web tĩnh HTML (có quiz tương tác), không có file markdown gốc. Chuyển sang Obsidian cần trích lại nội dung từ HTML. TLH_HK4 chứa PDF 21MB nguồn bản quyền (giáo trình Vũ Dũng).

### #004 Liệt kê các repo môn học đã có
- **Yêu cầu:** Liệt kê các repo trong GitHub hiện tại là môn học đã làm trong quá trình học.
- **Lý do:** Biết đã có nội dung nào để gom/chuyển vào vault Psy thay vì làm lại.
- **Đã làm:** Quét `gh repo list zoom2408` + thư mục local. Nhóm môn học: TLH_NhanThuc, TLH_NhanCach, TLH_HK4, TamBenhHoc, TBH_Phat_trien, ThongKe, mindfulness, strengthfinder (liên quan); psych-assess-toolkit (công cụ, không phải môn).
- **Ghi chú:** Chưa mở nội dung từng repo; phân loại theo tên + mô tả. [Assumed: TLH = Tâm lý học, TBH = Tâm bệnh học.]

### #003 Hệ thống kiến thức các môn cử nhân Tâm lý
- **Yêu cầu:** Tạo hệ thống các môn học trong chương trình cử nhân tâm lý; gợi ý cách build bằng GitHub repo + Obsidian.
- **Lý do:** Có một knowledge base có cấu trúc, liên kết được giữa các môn, version-control bằng git.
- **Đã làm:** Đề xuất cấu trúc vault (chưa tạo file nào ngoài log).
- **Ghi chú:** [Assumed: ghi chú tiếng Việt, dùng cho tự học, chương trình theo khung cử nhân 4 năm chung (chưa theo trường cụ thể).] Chờ user chốt cấu trúc và chương trình cụ thể.

### #002 Tạo log-note
- **Yêu cầu:** Tạo log-note trong repo để keep track mọi yêu cầu và lý do.
- **Lý do:** Theo dõi được lịch sử quyết định, tránh mất ngữ cảnh giữa các phiên làm việc.
- **Đã làm:** Tạo `LOG.md` (file này) và `CLAUDE.md` nhắc cập nhật log sau mỗi yêu cầu.
- **Ghi chú:** [Assumed: log dùng tiếng Việt, được commit vào repo (không gitignore).]

### #001 Chuyển sang repo Psy
- **Yêu cầu:** Đóng repo EnglishLearning tạm thời, chuyển sang làm việc với repo Psy.
- **Lý do:** Chưa nêu. Mục tiêu của repo Psy chưa được xác định.
- **Đã làm:** Kiểm tra `~/Psy` và `zoom2408/Psy`: repo rỗng, chưa có commit. EnglishLearning đã commit và push hết (`main` == `origin/main`, `4256e3f`).
- **Ghi chú:** Mục tiêu, ngôn ngữ, dạng sản phẩm của Psy vẫn chờ xác nhận.
