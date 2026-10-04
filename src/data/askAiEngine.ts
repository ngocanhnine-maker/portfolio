import type { PageId } from '../types';

/**
 * Local "Ask AI" engine: no API. Each topic carries bilingual keywords, a short
 * answer, a longer follow-up, and the journal page it lives on. A query is
 * normalised (lower-case, Vietnamese diacritics stripped), scored against every
 * topic, and the best one or two topics are combined into the reply.
 * Facts here mirror the journal pages; keep them in sync when content changes.
 */

type Lang = 'en' | 'vi';
type Bi = { en: string; vi: string };

export interface Topic {
  id: string;
  page: PageId;
  title: Bi;
  /** Plain keywords/phrases, written without diacritics. Multi-word phrases score higher. */
  keywords: string[];
  answer: Bi;
  more: Bi;
  /** Follow-up topic ids to suggest after this answer. */
  next: string[];
}

export interface EngineReply {
  text: string;
  links: { label: string; page: PageId }[];
  followUps: { label: string; prompt: string }[];
  topicIds: string[];
}

const EMAIL = 'ngocanh.nine@gmail.com';
const FINAD_URL = 'financial-statement-analysis-versio.vercel.app';

export const TOPICS: Topic[] = [
  {
    id: 'about',
    page: 'about',
    title: { en: 'Who she is', vi: 'Giới thiệu' },
    keywords: ['who', 'who is', 'about her', 'about you', 'introduce', 'introduction', 'overview', 'summary', 'background', 'bio', 'tran ngoc anh', 'ngoc anh', 'yourself', 'herself', 'gioi thieu', 'tong quan', 'la ai', 'ban than', 'tom tat'],
    answer: {
      en: '**Tran Ngoc Anh** is a Chemistry-major student at **Hanoi–Amsterdam High School for the Gifted** (Class of 2027). She started out in Chemistry and Mathematics, moved into economics, and now works where **finance, business and data** meet.',
      vi: '**Trần Ngọc Anh** là học sinh chuyên Hóa tại **THPT Chuyên Hà Nội – Amsterdam** (khóa 2024–2027). Bạn bắt đầu từ Hóa học và Toán, rẽ sang kinh tế, và hiện làm việc ở giao điểm của **tài chính, kinh doanh và dữ liệu**.'
    },
    more: {
      en: 'The journal follows that path in order: early Chemistry competitions, a First Prize in the Vietnam Economics Olympiad, a WICO Gold Medal for an AI credit-risk project, the FinAD tool, and a published green-credit paper.',
      vi: 'Cuốn nhật ký đi theo đúng hành trình đó: các kỳ thi Hóa học, Giải Nhất Olympic Kinh tế Việt Nam, Huy chương Vàng WICO với dự án AI đánh giá rủi ro tín dụng, công cụ FinAD, và một bài báo về tín dụng xanh.'
    },
    next: ['scores', 'awards', 'finad']
  },
  {
    id: 'scores',
    page: 'snapshot',
    title: { en: 'Grades & test scores', vi: 'Điểm số & chứng chỉ' },
    keywords: ['gpa', 'grade', 'grades', 'score', 'scores', 'sat', 'ielts', 'a level', 'a-level', 'alevel', 'test', 'tests', 'transcript', 'academic', 'school', 'education', 'study', 'diem', 'hoc van', 'hoc luc', 'bang diem', 'chung chi', 'truong', 'diem trung binh'],
    answer: {
      en: 'GPA: **9.6** (Grade 10), **9.8** (Grade 11), **9.7** cumulative, on a 10-point scale. Tests: **SAT 1520** (June 2026), **IELTS Academic 7.5** (July 2025) and **A-Level Mathematics: A** (Cambridge International, AS).',
      vi: 'GPA: **9.6** (lớp 10), **9.8** (lớp 11), trung bình **9.7** trên thang 10. Chứng chỉ: **SAT 1520** (06/2026), **IELTS Academic 7.5** (07/2025) và **A-Level Mathematics: A** (Cambridge International, AS).'
    },
    more: {
      en: 'On the Academic Snapshot page you can click SAT, IELTS or A-Level to open the official score report.',
      vi: 'Ở trang Tóm tắt Học thuật, bạn có thể bấm vào SAT, IELTS hoặc A-Level để mở bảng điểm chính thức.'
    },
    next: ['chemistry', 'skills', 'awards']
  },
  {
    id: 'chemistry',
    page: 'started',
    title: { en: 'Chemistry & early years', vi: 'Hóa học & khởi đầu' },
    keywords: ['chemistry', 'chemical', 'science', 'natural science', 'olympiad', 'hsg', 'national chemistry', 'started', 'beginning', 'origins', 'math', 'mathematics', 'hoa', 'hoa hoc', 'khoa hoc tu nhien', 'bat dau', 'khoi dau', 'toan', 'hoc sinh gioi'],
    answer: {
      en: 'It started with Chemistry and Mathematics. She won **Third Prize in the National Chemistry Competition** (Grade 11) and, before that, **First Prize in the Hanoi Natural Sciences Competition** (Grade 9).',
      vi: 'Mọi thứ bắt đầu từ Hóa học và Toán. Bạn đạt **Giải Ba Kỳ thi HSG Quốc gia môn Hóa học** (lớp 11) và trước đó là **Giải Nhất HSG Thành phố môn Khoa học Tự nhiên** (lớp 9).'
    },
    more: {
      en: 'Those years taught her to work carefully, test assumptions and stay with hard problems until they became clearer. That habit is what she later carried into economics.',
      vi: 'Những năm ấy dạy bạn làm việc cẩn thận, kiểm chứng giả định và kiên nhẫn với bài toán khó cho đến khi nó sáng rõ. Đó cũng là thói quen bạn mang sang kinh tế.'
    },
    next: ['economics', 'awards']
  },
  {
    id: 'economics',
    page: 'economics',
    title: { en: 'Economics & VEO', vi: 'Kinh tế & VEO' },
    keywords: ['economics', 'economic', 'econ', 'veo', 'vietnam economics olympiad', 'markets', 'incentives', 'business', 'kinh te', 'olympic kinh te', 'thi truong', 'kinh doanh'],
    answer: {
      en: 'She came to economics with no formal background, started from the basics, and went on to win **First Prize at the Vietnam Economics Olympiad (VEO 2026)**.',
      vi: 'Bạn đến với kinh tế khi chưa có nền tảng chính thức, bắt đầu từ những điều cơ bản, và sau đó đạt **Giải Nhất Olympic Kinh tế Việt Nam (VEO 2026)**.'
    },
    more: {
      en: 'What stayed with her was that economic questions rarely have one right answer: context matters and every choice is a trade-off. That is when numbers started to feel like evidence rather than answers.',
      vi: 'Điều đọng lại là câu hỏi kinh tế hiếm khi có một đáp án đúng: bối cảnh quan trọng và mỗi lựa chọn đều là đánh đổi. Từ đó, con số bắt đầu giống bằng chứng hơn là đáp án.'
    },
    next: ['wico', 'green']
  },
  {
    id: 'wico',
    page: 'wico',
    title: { en: 'WICO & credit risk', vi: 'WICO & rủi ro tín dụng' },
    keywords: ['wico', 'credit', 'credit risk', 'sme', 'smes', 'random forest', 'xgboost', 'scorecard', '5c', 'machine learning', 'ml', 'invention', 'seoul', 'korea', 'gold medal', 'tin dung', 'rui ro', 'doanh nghiep nho', 'han quoc', 'huy chuong vang'],
    answer: {
      en: 'At **WICO 2026** in Seoul her team won a **Gold Medal** for an AI credit-risk framework for Vietnamese SMEs. It combined financial analysis with the **5Cs of credit, a scorecard, and Random Forest / XGBoost** models.',
      vi: 'Tại **WICO 2026** ở Seoul, nhóm của bạn đạt **Huy chương Vàng** với khung đánh giá rủi ro tín dụng bằng AI cho SME Việt Nam, kết hợp phân tích tài chính với **5C, scorecard và mô hình Random Forest / XGBoost**.'
    },
    more: {
      en: 'The case study covered five SMEs (2020–2025). One firm had a **Debt/Equity of 228.7%**, another saw **revenue fall 75%** in a single year, which is why no single ratio was enough. She led the six-person delegation, and the research paper can be opened from the WICO page.',
      vi: 'Case study gồm năm SME (2020–2025). Một doanh nghiệp có **Nợ/Vốn chủ 228.7%**, một doanh nghiệp khác **doanh thu giảm 75%** chỉ trong một năm, nên không một chỉ số riêng lẻ nào đủ. Bạn dẫn dắt đoàn sáu người, và bài nghiên cứu có thể mở ngay ở trang WICO.'
    },
    next: ['finad', 'leadership', 'awards']
  },
  {
    id: 'finad',
    page: 'finad',
    title: { en: 'FinAD', vi: 'FinAD' },
    keywords: ['finad', 'fin ad', 'tool', 'app', 'website', 'product', 'build', 'built', 'project', 'projects', 'pdf', 'financial statement', 'financial statements', 'ratios', 'dashboard', 'demo', 'code', 'coding', 'programming', 'du an', 'cong cu', 'san pham', 'bao cao tai chinh', 'lap trinh'],
    answer: {
      en: '**FinAD** turns Vietnamese financial-statement PDFs into structured data: **PDF → structured statements → ratios → multi-year trends → AI-assisted insights**. It started as a workaround for re-typing messy reports by hand.',
      vi: '**FinAD** chuyển PDF báo cáo tài chính Việt Nam thành dữ liệu có cấu trúc: **PDF → báo cáo chuẩn hóa → chỉ số → xu hướng nhiều năm → nhận định có hỗ trợ AI**. Nó bắt đầu từ việc phải gõ lại thủ công những báo cáo lộn xộn.'
    },
    more: {
      en: `It calculates ratios such as ROA, ROE, D/E, current and quick ratio, OCF and FCF, and checks accounting identities so extraction is not trusted blindly. It is live at ${FINAD_URL}, and the FinAD page has a demo video.`,
      vi: `FinAD tính các chỉ số như ROA, ROE, D/E, thanh toán hiện hành và nhanh, OCF, FCF, và kiểm tra các đẳng thức kế toán để không tin mù quáng vào dữ liệu trích xuất. Trang web đang chạy tại ${FINAD_URL}, và trang FinAD có video demo.`
    },
    next: ['skills', 'green', 'wico']
  },
  {
    id: 'green',
    page: 'green-credit',
    title: { en: 'Green credit research', vi: 'Nghiên cứu tín dụng xanh' },
    keywords: ['research', 'paper', 'publication', 'published', 'journal', 'green', 'green credit', 'bank', 'banks', 'banking', 'roa', 'ols', 'regression', 'empirical', 'study', 'nghien cuu', 'bai bao', 'tin dung xanh', 'ngan hang', 'tap chi'],
    answer: {
      en: 'Her paper **"Green Credit and Bank Financial Performance"** was published in the *Journal of Management Research* (Vol. 18, No. 2, 2026). It asks whether green lending improves bank performance.',
      vi: 'Bài báo **"Green Credit and Bank Financial Performance"** được đăng trên *Journal of Management Research* (Tập 18, Số 2, 2026), với câu hỏi: tín dụng xanh có cải thiện hiệu quả ngân hàng không?'
    },
    more: {
      en: 'Data: **8 Vietnamese banks, 2022–2024, 24 observations, pooled OLS**. The **Green Credit Ratio** had a positive, statistically significant link with ROA; the absolute volume of green credit did not.',
      vi: 'Dữ liệu: **8 ngân hàng Việt Nam, 2022–2024, 24 quan sát, pooled OLS**. **Tỷ lệ tín dụng xanh** có quan hệ dương và có ý nghĩa thống kê với ROA; quy mô tuyệt đối thì không.'
    },
    next: ['wico', 'finad']
  },
  {
    id: 'awards',
    page: 'milestones',
    title: { en: 'Awards', vi: 'Giải thưởng' },
    keywords: ['award', 'awards', 'prize', 'prizes', 'medal', 'medals', 'honor', 'honors', 'honours', 'achievement', 'achievements', 'competition', 'competitions', 'milestone', 'milestones', 'won', 'win', 'giai', 'giai thuong', 'thanh tich', 'huy chuong', 'dau moc', 'cuoc thi'],
    answer: {
      en: 'Main milestones: **VEO 2026 – First Prize**, **WICO 2026 – Gold Medal**, **National Chemistry Competition – Third Prize**, and **AXGO 2026 – Gold Award** for a corporate analysis of DOJI.',
      vi: 'Các dấu mốc chính: **VEO 2026 – Giải Nhất**, **WICO 2026 – Huy chương Vàng**, **HSG Quốc gia môn Hóa – Giải Ba**, và **AXGO 2026 – Gold Award** với dự án phân tích doanh nghiệp DOJI.'
    },
    more: {
      en: 'Earlier, she also won city-level prizes in Chemistry and Natural Sciences in Hanoi. Ask about any one of them for the story behind it.',
      vi: 'Trước đó bạn còn có các giải cấp thành phố Hà Nội về Hóa học và Khoa học Tự nhiên. Bạn có thể hỏi riêng về từng giải để nghe câu chuyện phía sau.'
    },
    next: ['economics', 'wico', 'axgo']
  },
  {
    id: 'axgo',
    page: 'milestones',
    title: { en: 'AXGO & DOJI', vi: 'AXGO & DOJI' },
    keywords: ['axgo', 'ax global', 'doji', 'fashion', 'virtual try on', 'try-on', 'corporate analysis', 'case study', 'phan tich doanh nghiep'],
    answer: {
      en: 'At **AX Global Olympiad 2026** she received a **Gold Award** for a business and market analysis of **DOJI**’s AI virtual try-on, a case study in AI and fashion tech.',
      vi: 'Tại **AX Global Olympiad 2026**, bạn nhận **Gold Award** cho bài phân tích kinh doanh và thị trường về tính năng thử đồ ảo bằng AI của **DOJI**, một case study về AI và công nghệ thời trang.'
    },
    more: {
      en: 'It made her more interested in how business performance can be read through data, strategy and financial thinking together.',
      vi: 'Dự án khiến bạn quan tâm hơn đến cách đọc hiệu quả kinh doanh qua dữ liệu, chiến lược và tư duy tài chính cùng lúc.'
    },
    next: ['awards', 'finad']
  },
  {
    id: 'leadership',
    page: 'beyond',
    title: { en: 'Leadership & mentoring', vi: 'Lãnh đạo & hướng dẫn' },
    keywords: ['leadership', 'leader', 'lead', 'led', 'team', 'teamwork', 'mentor', 'mentoring', 'teaching', 'teach', 'with project', 'advisor', 'entrance exam', 'collaboration', 'lanh dao', 'truong nhom', 'doi nhom', 'lam viec nhom', 'huong dan', 'day', 'co van'],
    answer: {
      en: 'Her leadership is mostly about the work in between: splitting a project into parts people can own, listening when the team disagrees, and pulling views into one direction. She led the **six-person WICO delegation** and chaired the **Peace Village** charity project.',
      vi: 'Lãnh đạo với bạn chủ yếu là những việc ở giữa: chia dự án thành phần mỗi người đảm nhận được, lắng nghe khi nhóm bất đồng, và gom các góc nhìn về một hướng. Bạn dẫn dắt **đoàn WICO sáu người** và làm trưởng ban dự án thiện nguyện **Làng Hòa Bình**.'
    },
    more: {
      en: 'She also mentors younger students: three Grade 9 students she coached through a six-month exam run-up were all admitted to specialized schools. She also mentored students for the entrance exam through WITH Project Season V.',
      vi: 'Bạn cũng hướng dẫn các em nhỏ hơn: ba học sinh lớp 9 bạn kèm suốt sáu tháng ôn thi đều đỗ trường chuyên. Bạn cũng hướng dẫn các em ôn thi vào lớp 10 qua WITH Project mùa 5.'
    },
    next: ['internship', 'community']
  },
  {
    id: 'internship',
    page: 'beyond',
    title: { en: 'GTEL internship', vi: 'Thực tập GTEL' },
    keywords: ['internship', 'intern', 'gtel', 'work experience', 'experience', 'job', 'company', 'financial planning', 'thuc tap', 'kinh nghiem', 'cong ty', 'ke hoach tai chinh'],
    answer: {
      en: 'From **7 June to 6 August 2026** she interned as a **Business Data Analyst** in the **Financial Planning** department of **GTEL** (Global Technology – Telecommunication Corporation).',
      vi: 'Từ **07/06 đến 06/08/2026**, bạn thực tập vị trí **Business Data Analyst** tại phòng **Kế hoạch Tài chính** của **GTEL** (Tổng công ty Công nghệ – Viễn thông Toàn cầu).'
    },
    more: {
      en: 'She collected, cleaned and standardised business data using Excel, SQL, Power BI and Tableau, and saw how financial decisions are coordinated with other parts of a company rather than made by finance alone.',
      vi: 'Bạn thu thập, làm sạch và chuẩn hóa dữ liệu kinh doanh bằng Excel, SQL, Power BI và Tableau, và thấy các quyết định tài chính được phối hợp với các bộ phận khác chứ không chỉ do phòng tài chính quyết.'
    },
    next: ['skills', 'leadership']
  },
  {
    id: 'community',
    page: 'community',
    title: { en: 'Community work', vi: 'Hoạt động cộng đồng' },
    keywords: ['community', 'volunteer', 'volunteering', 'charity', 'social', 'fundraising', 'peace village', 'bach mai', 'sos', 'hai phong', 'children', 'tet', 'cong dong', 'tinh nguyen', 'thien nguyen', 'tu thien', 'lang hoa binh', 'gay quy', 'tre em'],
    answer: {
      en: 'Three community projects: **Peace Village – Thanh Xuan** (Chairperson; fundraising and a Tet gift-giving event for children with mobility impairments), **Bach Mai Hospital** (fundraising for families facing treatment costs) and **SOS Children’s Village Hai Phong**.',
      vi: 'Ba hoạt động cộng đồng: **Làng Hòa Bình Thanh Xuân** (trưởng ban; gây quỹ và trao quà Tết cho các em suy giảm vận động), **Bệnh viện Bạch Mai** (gây quỹ cho gia đình khó khăn khi điều trị) và **Làng trẻ em SOS Hải Phòng**.'
    },
    more: {
      en: 'Peace Village is where her leadership role was clearest: she coordinated the team from fundraising to the day of the event.',
      vi: 'Làng Hòa Bình là nơi vai trò lãnh đạo của bạn rõ nhất: bạn điều phối nhóm từ khâu gây quỹ đến ngày tổ chức.'
    },
    next: ['leadership', 'hobbies']
  },
  {
    id: 'hobbies',
    page: 'outside',
    title: { en: 'Outside school', vi: 'Ngoài giờ học' },
    keywords: ['hobby', 'hobbies', 'interest', 'interests', 'free time', 'fun', 'music', 'piano', 'guitar', 'photography', 'photo', 'photos', 'life', 'personal', 'zhongsin', 'so thich', 'am nhac', 'chup anh', 'nhiep anh', 'thoi gian ranh', 'cuoc song'],
    answer: {
      en: 'Outside the ledger: **photography** (a reason to slow down and notice details), **music** (she performed piano at the Zhongsin International Music Competition), and the small moments with friends outside school.',
      vi: 'Ngoài sổ sách: **nhiếp ảnh** (lý do để chậm lại và để ý chi tiết), **âm nhạc** (bạn từng biểu diễn piano tại cuộc thi Zhongsin International Music Competition), và những khoảnh khắc nhỏ cùng bạn bè ngoài trường học.'
    },
    more: {
      en: 'Music is where she steps away from structure and learns at a different pace.',
      vi: 'Âm nhạc là nơi bạn tạm rời khỏi khuôn khổ và học theo một nhịp khác.'
    },
    next: ['community', 'about']
  },
  {
    id: 'skills',
    page: 'snapshot',
    title: { en: 'Skills & tools', vi: 'Kỹ năng & công cụ' },
    keywords: ['skill', 'skills', 'tool', 'tools', 'stack', 'python', 'sql', 'excel', 'power bi', 'tableau', 'pandas', 'language', 'languages', 'english', 'technical', 'ky nang', 'cong cu', 'ngon ngu', 'tieng anh'],
    answer: {
      en: 'Tools she works with: **Python** (Pandas, Scikit-learn, XGBoost), **SQL**, **Excel**, **Power BI** and **Tableau**, plus financial-ratio analysis. Languages: Vietnamese and English (**IELTS 7.5**).',
      vi: 'Công cụ bạn dùng: **Python** (Pandas, Scikit-learn, XGBoost), **SQL**, **Excel**, **Power BI** và **Tableau**, cùng phân tích chỉ số tài chính. Ngôn ngữ: tiếng Việt và tiếng Anh (**IELTS 7.5**).'
    },
    more: {
      en: 'You can see them in use in FinAD, the WICO credit-risk models and the GTEL internship.',
      vi: 'Bạn có thể thấy các công cụ này được dùng trong FinAD, mô hình rủi ro tín dụng WICO và kỳ thực tập GTEL.'
    },
    next: ['finad', 'internship']
  },
  {
    id: 'contact',
    page: 'closing',
    title: { en: 'Contact', vi: 'Liên hệ' },
    keywords: ['contact', 'email', 'mail', 'reach', 'get in touch', 'cv', 'resume', 'linkedin', 'lien he', 'thu', 'ho so'],
    answer: {
      en: `You can reach Tran Ngoc Anh at **${EMAIL}**. FinAD is live at ${FINAD_URL}.`,
      vi: `Bạn có thể liên hệ Trần Ngọc Anh qua **${EMAIL}**. FinAD đang chạy tại ${FINAD_URL}.`
    },
    more: {
      en: 'A downloadable CV is not on the site yet.',
      vi: 'CV để tải về hiện chưa có trên trang.'
    },
    next: ['about']
  }
];

const SMALL_TALK = {
  greeting: ['hi', 'hello', 'hey', 'chao', 'xin chao', 'alo', 'yo'],
  thanks: ['thanks', 'thank you', 'thank', 'cam on', 'thanks a lot', 'ty'],
  more: ['more', 'tell me more', 'go on', 'continue', 'details', 'detail', 'why', 'elaborate', 'more about', 'chi tiet', 'noi them', 'ke them', 'tiep', 'tai sao', 'the nao', 'nua']
};

/** Lower-case, strip Vietnamese diacritics, keep letters/digits/spaces. */
export const normalise = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9%/\- ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const hasPhrase = (text: string, phrase: string) => ` ${text} `.includes(` ${phrase} `);

// A topic's own titles (used on follow-up chips) always match it strongly.
const titleBoost = (q: string, topic: Topic) =>
  [topic.title.en, topic.title.vi].some((t) => normalise(t) === q) ? 10 : 0;

const scoreTopic = (q: string, topic: Topic) =>
  titleBoost(q, topic) +
  topic.keywords.reduce((sum, k) => (hasPhrase(q, k) ? sum + (k.includes(' ') ? 3 : k.length <= 3 ? 1.5 : 2) : sum), 0);

const followUpsFor = (ids: string[], lang: Lang, exclude: string[]) => {
  const seen = new Set(exclude);
  const out: EngineReply['followUps'] = [];
  for (const id of ids.flatMap((i) => TOPICS.find((t) => t.id === i)?.next ?? [])) {
    if (seen.has(id)) continue;
    seen.add(id);
    const t = TOPICS.find((x) => x.id === id);
    if (t) out.push({ label: t.title[lang], prompt: t.title[lang] });
    if (out.length === 3) break;
  }
  return out;
};

const linkFor = (t: Topic, lang: Lang) => ({
  label: lang === 'vi' ? `Mở trang ${t.title.vi}` : `Open ${t.title.en}`,
  page: t.page
});

/**
 * @param query       the user's message
 * @param lang        reply language
 * @param lastTopics  topic ids from the previous assistant reply (for "tell me more")
 */
export function answerQuery(query: string, lang: Lang, lastTopics: string[] = []): EngineReply {
  const q = normalise(query);
  const words = q.split(' ').filter(Boolean);
  const wantsMore = SMALL_TALK.more.some((m) => hasPhrase(q, m));

  const scored = TOPICS.map((t) => ({ t, s: scoreTopic(q, t) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);

  // Small talk only when nothing topical matched
  if (!scored.length) {
    if (words.length <= 4 && SMALL_TALK.greeting.some((g) => hasPhrase(q, g))) {
      return {
        text:
          lang === 'vi'
            ? 'Chào bạn! Mình có thể kể về hành trình học tập, giải thưởng, FinAD, nghiên cứu, hoạt động hay sở thích của Ngọc Anh. Bạn muốn bắt đầu từ đâu?'
            : 'Hi! I can tell you about Ngoc Anh’s path, awards, FinAD, research, activities or life outside school. Where would you like to start?',
        links: [],
        followUps: followUpsFor(['about'], lang, []).concat(
          TOPICS.filter((t) => t.id === 'about').map((t) => ({ label: t.title[lang], prompt: t.title[lang] }))
        ),
        topicIds: []
      };
    }
    if (SMALL_TALK.thanks.some((g) => hasPhrase(q, g))) {
      return {
        text: lang === 'vi' ? 'Không có gì! Bạn còn muốn hỏi gì nữa không?' : 'You’re welcome! Anything else you’d like to know?',
        links: [],
        followUps: followUpsFor(lastTopics.length ? lastTopics : ['about'], lang, lastTopics),
        topicIds: lastTopics
      };
    }
    // "Tell me more" style follow-up on the previous topic
    if (lastTopics.length && wantsMore) {
      const topics = lastTopics.map((id) => TOPICS.find((t) => t.id === id)!).filter(Boolean);
      return {
        text: topics.map((t) => t.more[lang]).join('\n\n'),
        links: topics.slice(0, 1).map((t) => linkFor(t, lang)),
        followUps: followUpsFor(lastTopics, lang, lastTopics),
        topicIds: lastTopics
      };
    }
    return {
      text:
        lang === 'vi'
          ? 'Mình chưa chắc đã hiểu đúng câu hỏi. Mình trả lời tốt nhất về: học vấn & điểm số, giải thưởng, kinh tế & VEO, WICO, FinAD, nghiên cứu tín dụng xanh, lãnh đạo & thực tập, hoạt động cộng đồng, sở thích và thông tin liên hệ.'
          : 'I’m not sure I caught that. I can best answer about: grades & test scores, awards, economics & VEO, WICO, FinAD, the green-credit paper, leadership & internship, community work, hobbies and contact details.',
      links: [],
      followUps: ['about', 'awards', 'finad'].map((id) => {
        const t = TOPICS.find((x) => x.id === id)!;
        return { label: t.title[lang], prompt: t.title[lang] };
      }),
      topicIds: []
    };
  }

  // Asking again about the same topic → go deeper instead of repeating
  const top = scored[0];
  // Several clearly-named topics ("WICO and FinAD") are answered together, up to three.
  const picked = scored.filter((x, i) => i === 0 || (i < 4 && x.s >= top.s * 0.6)).slice(0, 3);
  const ids = picked.map((x) => x.t.id);
  const repeat = wantsMore && ids.length === 1 && lastTopics.includes(ids[0]);

  const text = picked
    .map(({ t }) => (repeat ? t.more[lang] : t.answer[lang]))
    .join('\n\n');

  return {
    text,
    links: picked.map(({ t }) => linkFor(t, lang)).filter((l, i, arr) => arr.findIndex((x) => x.page === l.page) === i),
    followUps: followUpsFor(ids, lang, ids),
    topicIds: ids
  };
}

/** Starter questions shown on the empty screen. */
export const STARTERS: Record<Lang, { title: string; prompt: string }[]> = {
  en: [
    { title: 'Who is Ngoc Anh?', prompt: 'Who is Tran Ngoc Anh?' },
    { title: 'Grades & test scores', prompt: 'What are her GPA, SAT and IELTS scores?' },
    { title: 'Biggest awards', prompt: 'What are her main awards?' },
    { title: 'What is FinAD?', prompt: 'What is FinAD and how does it work?' },
    { title: 'Research', prompt: 'Tell me about her green credit research paper.' },
    { title: 'Leadership & community', prompt: 'What leadership and community work has she done?' }
  ],
  vi: [
    { title: 'Ngọc Anh là ai?', prompt: 'Trần Ngọc Anh là ai?' },
    { title: 'Điểm số & chứng chỉ', prompt: 'GPA, SAT và IELTS của bạn ấy thế nào?' },
    { title: 'Giải thưởng nổi bật', prompt: 'Những giải thưởng chính là gì?' },
    { title: 'FinAD là gì?', prompt: 'FinAD là gì và hoạt động thế nào?' },
    { title: 'Nghiên cứu', prompt: 'Kể về bài nghiên cứu tín dụng xanh.' },
    { title: 'Lãnh đạo & cộng đồng', prompt: 'Bạn ấy đã làm những hoạt động lãnh đạo và cộng đồng nào?' }
  ]
};
