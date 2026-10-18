export interface Module { id: string; n: string; title: string; short: string; lead: string; topics: string[]; tip: string; meta: string[] }
export interface QuizItem { question: string; options: { text: string; correct?: boolean }[]; explanation: string }
export interface Card { label: string; front: string; back: string }
export interface Course {
  slug: string; code: string; title: string; description: string; lessons?: number;
  ready: boolean; eyebrow?: string; lead?: string; modules?: Module[]; cards?: Card[]; quiz?: QuizItem[];
  stats?: { label: string; value: number }[];
}

// Chuyên đề Tâm bệnh học. Tên chuyên đề và mục lấy từ các bài học hiện có.
const tbhModules: Module[] = [
  {
    id: 'tiep-can', n: '01', title: 'Các tiếp cận Tâm bệnh học', short: 'Các tiếp cận',
    lead: 'Cùng một biểu hiện, mỗi trường phái giải thích khác nhau. Nắm 6 lăng kính trước khi học từng rối loạn.',
    topics: ['Sinh học', 'Phân tâm / tâm động', 'Nhận thức / hành vi', 'Nhân văn / hiện sinh', 'Văn hóa / xã hội', 'Đa nhân tố'],
    tip: 'Tâm bệnh học hiện đại hiếm khi dùng một lăng kính duy nhất. Mô hình đa nhân tố ghép cả yếu tố sinh học, tâm lý và xã hội.',
    meta: ['Tổng quan 6 tiếp cận', 'Có kiểm tra kiến thức']
  },
  {
    id: 'loan-than', n: '02', title: 'Phổ loạn thần', short: 'Loạn thần',
    lead: 'Từ triệu chứng dương tính và âm tính đến mô hình nguyên nhân, điều trị và tiên lượng của tâm thần phân liệt.',
    topics: ['Triệu chứng dương tính', 'Triệu chứng âm tính', 'Phổ loạn thần', 'Nguyên nhân đa mô hình', 'Điều trị', 'Dịch tễ và tiên lượng'],
    tip: 'Triệu chứng dương tính là thứ xuất hiện thêm (hoang tưởng, ảo giác). Âm tính là thứ mất đi (ý chí, cảm xúc, lời nói).',
    meta: ['Mini quiz 10 câu', 'Bộ ca lâm sàng']
  },
  {
    id: 'luong-cuc', n: '03', title: 'Phổ lưỡng cực', short: 'Lưỡng cực',
    lead: 'Sức khỏe tâm thần là một phổ rộng. Học cách phân loại các dạng lưỡng cực, tiêu chuẩn DSM-5 và diễn tiến.',
    topics: ['Phân loại', 'Tiêu chuẩn DSM-5', 'Dịch tễ học', 'Nguyên nhân', 'Tiên lượng', 'Điều trị'],
    tip: 'Phân biệt hưng cảm (kéo dài ít nhất 1 tuần) và hưng cảm nhẹ (ít nhất 4 ngày, không gây suy giảm chức năng nặng).',
    meta: ['Bản đồ 5 phút', 'Bộ ca lâm sàng']
  },
  {
    id: 'tram-cam', n: '04', title: 'Trầm cảm chủ yếu', short: 'Trầm cảm',
    lead: 'Chín triệu chứng, tiêu chí chẩn đoán DSM-5-TR, yếu tố tâm lý đóng góp và trầm cảm dai dẳng.',
    topics: ['Bức tranh nhanh', '9 triệu chứng', 'Tiêu chí DSM-5-TR', 'Yếu tố tâm lý', 'Trầm cảm dai dẳng'],
    tip: 'Cần ít nhất 5 trong 9 triệu chứng trong 2 tuần, trong đó phải có khí sắc trầm hoặc mất hứng thú.',
    meta: ['Tài liệu tương tác', 'Bộ ca lâm sàng']
  },
  {
    id: 'lo-au', n: '05', title: 'Các rối loạn lo âu', short: 'Lo âu',
    lead: 'Phân biệt sợ và lo, mạng lưới não liên quan, mô hình hoảng loạn của Clark và quản lý GAD.',
    topics: ['Sợ và lo', 'Hoảng loạn (Clark)', 'GAD', 'Bảng so sánh nhanh', 'Mức độ nghiêm trọng', 'Điều trị'],
    tip: 'Sợ là phản ứng với mối đe dọa hiện tại. Lo là dự đoán về mối đe dọa trong tương lai.',
    meta: ['Bài thực hành 15 câu', 'Bộ ca lâm sàng']
  },
  {
    id: 'ocd', n: '06', title: 'OCD và các rối loạn liên quan', short: 'OCD',
    lead: 'Chín rối loạn trong cùng nhóm, giải phẫu não, và liệu pháp ERP kết hợp thuốc.',
    topics: ['Tổng quan', '9 rối loạn trong nhóm', 'OCD chi tiết', 'Giải phẫu não', 'ERP và thuốc'],
    tip: 'ERP (tiếp xúc và ngăn đáp ứng) cho người bệnh đối diện nỗi sợ mà không thực hiện nghi thức giải tỏa.',
    meta: ['5 ca điển hình', 'So sánh nhanh']
  }
];

const tbhQuiz: QuizItem[] = [
  {
    question: 'Chẩn đoán trầm cảm chủ yếu cần ít nhất bao nhiêu triệu chứng trong 2 tuần?',
    options: [{ text: '3 triệu chứng' }, { text: '5 triệu chứng, gồm khí sắc trầm hoặc mất hứng thú', correct: true }, { text: '9 triệu chứng' }],
    explanation: 'DSM-5-TR yêu cầu từ 5 trong 9 triệu chứng, và ít nhất một là khí sắc trầm hoặc mất hứng thú.'
  },
  {
    question: 'Ảo giác và hoang tưởng thuộc nhóm triệu chứng nào của loạn thần?',
    options: [{ text: 'Dương tính', correct: true }, { text: 'Âm tính' }, { text: 'Nhận thức' }],
    explanation: 'Dương tính là những biểu hiện xuất hiện thêm so với bình thường, như ảo giác và hoang tưởng.'
  },
  {
    question: 'Điểm khác biệt chính giữa sợ và lo là gì?',
    options: [{ text: 'Sợ hướng về tương lai, lo hướng về hiện tại' }, { text: 'Sợ phản ứng với mối đe dọa hiện tại, lo dự đoán mối đe dọa sắp tới', correct: true }, { text: 'Hai khái niệm này giống nhau hoàn toàn' }],
    explanation: 'Sợ gắn với mối đe dọa đang có mặt. Lo là sự chuẩn bị cho mối đe dọa có thể xảy ra.'
  }
];

export const courses: Course[] = [
  {
    slug: 'tam-benh-hoc', code: 'Tâm bệnh học', title: 'Tâm bệnh học', ready: true, lessons: 6,
    description: 'Sáu chuyên đề từ các tiếp cận đến từng nhóm rối loạn.',
    eyebrow: 'Môn học',
    lead: 'Đi từ các tiếp cận lý thuyết đến từng nhóm rối loạn: loạn thần, lưỡng cực, trầm cảm, lo âu và OCD. Mỗi chuyên đề có tóm tắt, flashcard, quiz và ca lâm sàng.',
    modules: tbhModules,
    stats: [{ label: 'Chuyên đề', value: 6 }, { label: 'Câu trong bài thi tổng hợp', value: 40 }, { label: 'Bộ ca lâm sàng', value: 6 }],
    cards: [
      { label: 'Trầm cảm dai dẳng', front: 'Trầm cảm dai dẳng cần kéo dài tối thiểu bao lâu ở người lớn?', back: 'Ít nhất 2 năm.' },
      { label: 'Hưng cảm nhẹ', front: 'Hưng cảm nhẹ khác hưng cảm ở điểm nào?', back: 'Ngắn hơn (ít nhất 4 ngày so với 1 tuần) và không gây suy giảm chức năng nặng.' },
      { label: 'Thời gian GAD', front: 'Rối loạn lo âu lan tỏa (GAD) cần lo âu quá mức trong bao lâu?', back: 'Ít nhất 6 tháng.' }
    ],
    quiz: tbhQuiz
  },
  { slug: 'nhan-cach', code: 'Nhân cách', title: 'Tâm lý học nhân cách', description: 'Các thuyết nhân cách và cách đo lường.', ready: false },
  { slug: 'nhan-thuc', code: 'Nhận thức', title: 'Tâm lý học nhận thức', description: 'Chú ý, trí nhớ, ngôn ngữ và tư duy.', ready: false },
  { slug: 'phat-trien', code: 'Phát triển', title: 'Tâm bệnh học phát triển', description: 'Rối loạn ở trẻ em và thanh thiếu niên.', ready: false },
  { slug: 'thong-ke', code: 'Thống kê', title: 'Thống kê trong tâm lý', description: 'Mô tả, suy luận và đọc nghiên cứu.', ready: false },
  { slug: 'chanh-niem', code: 'Mindfulness', title: 'Chánh niệm', description: 'Nền tảng và thực hành trong lâm sàng.', ready: false }
];
