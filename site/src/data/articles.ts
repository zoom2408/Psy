// Bài viết học thuật. Tạm lưu ở đây; khi có vault sẽ đọc từ `vault/40-Research` bằng content collection.
// Trích dẫn trong đoạn văn viết dạng [^1], hiển thị thành chỉ số nhỏ nhảy tới mục Tài liệu tham khảo.
export interface Section { id: string; heading: string; paras: string[] }
export interface Article {
  slug: string; title: string; subtitle: string; abstract: string; course: string; courseTitle: string;
  tags: string[]; author: string; date: string; status: 'draft' | 'reviewed';
  sections: Section[]; references: string[];
}

export const articles: Article[] = [
  {
    slug: 'mo-hinh-de-ton-thuong-stress',
    title: 'Mô hình dễ tổn thương và stress trong tâm thần phân liệt',
    subtitle: 'Vì sao cùng một mức áp lực, mỗi người lại đi đến một kết cục khác nhau.',
    abstract: 'Mô hình dễ tổn thương và stress cho rằng một giai đoạn loạn thần xuất hiện khi mức stress vượt qua ngưỡng chịu đựng của một người. Ngưỡng này khác nhau giữa các cá nhân và chịu ảnh hưởng của yếu tố sinh học lẫn trải nghiệm sớm.',
    course: 'tam-benh-hoc', courseTitle: 'Tâm bệnh học', tags: ['Phổ loạn thần', 'Mô hình nguyên nhân'],
    author: 'Psy', date: '2026-10-18', status: 'draft',
    sections: [
      { id: 'boi-canh', heading: 'Bối cảnh', paras: [
        'Trong nhiều thập niên, các giải thích về tâm thần phân liệt thường nghiêng hẳn về một phía: hoặc là bệnh của não bộ, hoặc là hệ quả của môi trường sống. Cả hai cách nhìn đều không giải thích được vì sao những người cùng chịu một hoàn cảnh khó khăn lại có kết cục khác nhau.',
        'Zubin và Spring (1977) đề xuất một cách tiếp cận khác: coi mỗi người có một mức dễ tổn thương nhất định, và xem bệnh như kết quả của sự gặp nhau giữa mức dễ tổn thương đó với stress.[^1]'
      ] },
      { id: 'y-chinh', heading: 'Ý chính của mô hình', paras: [
        'Mức dễ tổn thương (vulnerability) là một đặc điểm tương đối bền của cá nhân, hình thành từ yếu tố di truyền, sinh học và các trải nghiệm ở giai đoạn sớm. Stress là những biến cố hoặc áp lực trong hiện tại cần cá nhân thích ứng.',
        'Một giai đoạn loạn thần xuất hiện khi stress vượt quá ngưỡng chịu đựng. Người có mức dễ tổn thương cao chỉ cần stress thấp hơn để vượt ngưỡng, còn người có mức thấp cần stress lớn hơn nhiều.',
        'Nuechterlein và Dawson (1984) mở rộng ý tưởng này thành một mô hình mô tả cả các yếu tố bảo vệ như kỹ năng đối phó và hỗ trợ xã hội, cũng như việc giai đoạn bệnh có thể đến rồi đi theo thời gian.[^2]'
      ] },
      { id: 'ham-y', heading: 'Hàm ý cho can thiệp', paras: [
        'Cách nhìn này gợi ra hai hướng can thiệp bổ sung cho nhau. Một là nâng ngưỡng chịu đựng, ví dụ bằng điều trị thuốc và rèn kỹ năng đối phó. Hai là giảm tải stress, ví dụ bằng hỗ trợ gia đình và điều chỉnh môi trường sống.',
        'Vì giai đoạn bệnh gắn với một thời điểm cụ thể, mô hình cũng giữ lại khả năng hồi phục và nhấn mạnh việc phòng ngừa tái phát.'
      ] },
      { id: 'han-che', heading: 'Hạn chế', paras: [
        'Khái niệm stress trong mô hình khá rộng và khó đo lường một cách thống nhất. Mức dễ tổn thương cũng thường chỉ được suy ra sau khi bệnh đã xuất hiện.',
        'Ngày nay, tinh thần của mô hình được kế thừa trong cách tiếp cận đa nhân tố mà bạn sẽ gặp ở chuyên đề các tiếp cận Tâm bệnh học.'
      ] }
    ],
    references: [
      'Zubin, J., & Spring, B. (1977). Vulnerability: A new view of schizophrenia. Journal of Abnormal Psychology, 86(2), 103-126.',
      'Nuechterlein, K. H., & Dawson, M. E. (1984). A heuristic vulnerability/stress model of schizophrenic episodes. Schizophrenia Bulletin, 10(2), 300-312.'
    ]
  },
  {
    slug: 'mo-hinh-nhan-thuc-hoang-loan',
    title: 'Mô hình nhận thức của cơn hoảng loạn',
    subtitle: 'Khi một cảm giác cơ thể bình thường bị đọc thành dấu hiệu của thảm họa.',
    abstract: 'Theo mô hình của Clark, cơn hoảng loạn là vòng xoáy giữa cảm giác cơ thể và cách diễn giải mang tính thảm họa về cảm giác đó. Hành vi an toàn giúp giữ niềm tin sai lệch tồn tại, vì vậy điều trị tập trung vào kiểm chứng và điều chỉnh diễn giải.',
    course: 'tam-benh-hoc', courseTitle: 'Tâm bệnh học', tags: ['Rối loạn lo âu', 'Mô hình nhận thức'],
    author: 'Psy', date: '2026-10-18', status: 'draft',
    sections: [
      { id: 'vong-xoay', heading: 'Vòng xoáy hoảng loạn', paras: [
        'Clark (1986) cho rằng cơn hoảng loạn không bắt đầu từ cảm giác cơ thể, mà từ cách người đó hiểu cảm giác ấy.[^1] Một nhịp tim nhanh hay chóng mặt thoáng qua là chuyện bình thường, nhưng nếu được diễn giải là "mình sắp lên cơn đau tim" thì nó trở thành mối đe dọa.',
        'Mối đe dọa này gây lo sợ, lo sợ làm cảm giác cơ thể mạnh lên, và cảm giác mạnh hơn lại củng cố diễn giải ban đầu. Vòng lặp tiếp diễn cho đến khi đạt đỉnh là một cơn hoảng loạn.'
      ] },
      { id: 'duy-tri', heading: 'Điều gì duy trì vấn đề', paras: [
        'Hai cơ chế thường giúp niềm tin sai lệch tồn tại lâu. Thứ nhất là chú ý chọn lọc: người bệnh liên tục theo dõi cơ thể nên dễ nhận ra những thay đổi nhỏ. Thứ hai là hành vi an toàn, như ngồi xuống, tránh vận động hay luôn mang theo thuốc.',
        'Khi không có điều tồi tệ xảy ra, người bệnh nghĩ rằng nhờ hành vi an toàn mình mới thoát nạn, nên không bao giờ kiểm chứng được diễn giải của mình.'
      ] },
      { id: 'can-thiep', heading: 'Hướng can thiệp', paras: [
        'Từ mô hình này, điều trị nhận thức hành vi tập trung vào việc chia sẻ mô hình với người bệnh, tái cấu trúc diễn giải thảm họa và thiết kế các thực nghiệm hành vi để kiểm chứng, trong đó bỏ dần hành vi an toàn.',
        'Một kỹ thuật thường dùng là cho người bệnh chủ động tạo lại cảm giác cơ thể trong điều kiện an toàn để thấy rằng chúng không dẫn đến thảm họa.'
      ] }
    ],
    references: ['Clark, D. M. (1986). A cognitive approach to panic. Behaviour Research and Therapy, 24(4), 461-470.']
  },
  {
    slug: 'bo-ba-nhan-thuc-beck',
    title: 'Bộ ba nhận thức của Beck trong trầm cảm',
    subtitle: 'Cách người trầm cảm nhìn bản thân, thế giới và tương lai.',
    abstract: 'Beck mô tả trầm cảm qua một bộ ba nhận thức tiêu cực về bản thân, thế giới và tương lai, được duy trì bởi các lược đồ và sai lệch trong xử lý thông tin. Liệu pháp nhận thức nhắm vào việc kiểm chứng các niềm tin này bằng thực nghiệm.',
    course: 'tam-benh-hoc', courseTitle: 'Tâm bệnh học', tags: ['Trầm cảm', 'Mô hình nhận thức'],
    author: 'Psy', date: '2026-10-18', status: 'draft',
    sections: [
      { id: 'bo-ba', heading: 'Bộ ba nhận thức', paras: [
        'Beck (1967) nhận thấy người trầm cảm thường có ba nhóm suy nghĩ tiêu cực xoay quanh bản thân, thế giới và tương lai.[^1] Họ thấy mình kém cỏi, thấy trải nghiệm hiện tại đầy trở ngại và tin rằng mọi thứ sẽ không khá lên.',
        'Ba nhóm suy nghĩ này tác động lẫn nhau và kéo theo khí sắc trầm, giảm động lực và rút lui khỏi hoạt động.'
      ] },
      { id: 'luoc-do', heading: 'Lược đồ và sai lệch nhận thức', paras: [
        'Các suy nghĩ tiêu cực được cho là bắt nguồn từ những lược đồ nhận thức hình thành sớm và bị kích hoạt bởi biến cố gây căng thẳng.',
        'Khi lược đồ hoạt động, việc xử lý thông tin bị lệch theo những kiểu quen thuộc như suy diễn tùy tiện, khái quát hóa quá mức, phóng đại điều xấu và thu nhỏ điều tốt.'
      ] },
      { id: 'tri-lieu', heading: 'Liệu pháp nhận thức', paras: [
        'Beck và cộng sự (1979) phát triển liệu pháp nhận thức cho trầm cảm dựa trên quan hệ hợp tác giữa nhà trị liệu và thân chủ.[^2] Hai bên cùng xem suy nghĩ như giả thuyết cần kiểm chứng thay vì sự thật hiển nhiên.',
        'Các công cụ quen thuộc gồm bảng ghi chép suy nghĩ, kích hoạt hành vi và các thực nghiệm nhỏ để thử niềm tin trong đời sống thực.'
      ] }
    ],
    references: [
      'Beck, A. T. (1967). Depression: Clinical, experimental, and theoretical aspects. New York: Harper & Row.',
      'Beck, A. T., Rush, A. J., Shaw, B. F., & Emery, G. (1979). Cognitive therapy of depression. New York: Guilford Press.'
    ]
  }
];

const wc = (a: Article) => [a.abstract, a.subtitle, ...a.sections.flatMap((s) => s.paras)].join(' ').split(/\s+/).length;
export const readingMinutes = (a: Article) => Math.max(1, Math.round(wc(a) / 200));
export const formatDate = (iso: string) => new Date(iso).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' });
export const articlesByDate = [...articles].sort((a, b) => b.date.localeCompare(a.date));
export const articlesOf = (course: string) => articlesByDate.filter((a) => a.course === course);
