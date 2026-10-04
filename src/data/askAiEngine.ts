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
      en: "**Tran Ngoc Anh** is a Chemistry student at **Hanoi–Amsterdam High School for the Gifted** (Class of 2027). She started with Chemistry and Maths, got curious about economics, and began trying projects in **finance, business and data**.",
      vi: "**Trần Ngọc Anh** đang học chuyên Hóa tại **THPT Chuyên Hà Nội – Amsterdam** (khóa 2024–2027). Từ Hóa và Toán, Ngọc Anh dần tìm sang kinh tế, rồi thử làm các dự án về **tài chính, kinh doanh và dữ liệu**."
    },
    more: {
      en: "The journal brings those interests together: science competitions, VEO, the WICO credit-risk project, FinAD and a paper on green credit. There are also pages about volunteering, music, photos and time with friends.",
      vi: "Cuốn nhật ký gom những chuyện đó lại: các kỳ thi khoa học, VEO, dự án rủi ro tín dụng ở WICO, FinAD và bài nghiên cứu tín dụng xanh. Cũng có cả chuyện tình nguyện, chơi đàn, chụp ảnh và những ngày bình thường với bạn bè nữa."
    },
    next: ['scores', 'awards', 'finad']
  },
  {
    id: 'scores',
    page: 'snapshot',
    title: { en: 'Grades & test scores', vi: 'Điểm số & chứng chỉ' },
    keywords: ['gpa', 'grade', 'grades', 'score', 'scores', 'sat', 'ielts', 'a level', 'a-level', 'alevel', 'test', 'tests', 'transcript', 'academic', 'school', 'education', 'study', 'diem', 'hoc van', 'hoc luc', 'bang diem', 'chung chi', 'truong', 'diem trung binh'],
    answer: {
      en: "Here’s a quick look at her results: **GPA 9.6 in Grade 10, 9.8 in Grade 11 and 9.7 overall**, on a 10-point scale. Her test results are **SAT 1520** (June 2026), **IELTS Academic 7.5** (July 2025) and **A-Level Mathematics: A** (Cambridge International, AS).",
      vi: "Đây là phần điểm số của Ngọc Anh: **GPA lớp 10 là 9.6, lớp 11 là 9.8, trung bình 9.7** trên thang 10. Các chứng chỉ gồm **SAT 1520** (06/2026), **IELTS Academic 7.5** (07/2025) và **A-Level Mathematics: A** (Cambridge International, AS)."
    },
    more: {
      en: "You can find these in Academic Record. Click SAT, IELTS or A-Level there to open the score report.",
      vi: "Bạn có thể xem ở phần Hồ sơ Học tập. Bấm vào SAT, IELTS hoặc A-Level là mở được bảng điểm nhé."
    },
    next: ['chemistry', 'skills', 'awards']
  },
  {
    id: 'chemistry',
    page: 'started',
    title: { en: 'Chemistry & early years', vi: 'Hóa học & khởi đầu' },
    keywords: ['chemistry', 'chemical', 'science', 'natural science', 'olympiad', 'hsg', 'national chemistry', 'started', 'beginning', 'origins', 'math', 'mathematics', 'hoa', 'hoa hoc', 'khoa hoc tu nhien', 'bat dau', 'khoi dau', 'toan', 'hoc sinh gioi'],
    answer: {
      en: "Chemistry and Maths were where she started. She won **First Prize in the Hanoi Natural Sciences Competition in Grade 9**, then **Third Prize in the National Chemistry Competition in Grade 11**.",
      vi: "Hóa và Toán là điểm bắt đầu của Ngọc Anh. Lớp 9, Ngọc Anh đạt **Giải Nhất HSG Thành phố môn Khoa học Tự nhiên**; đến lớp 11 là **Giải Ba Kỳ thi HSG Quốc gia môn Hóa học**."
    },
    more: {
      en: "Preparing for those exams meant working through problems and checking each step, even when an answer seemed right. She still uses that habit when working with financial data.",
      vi: "Ôn những kỳ thi này là làm bài rồi kiểm tra lại từng bước, kể cả lúc tưởng đã đúng rồi. Đến khi làm với số liệu tài chính, Ngọc Anh vẫn giữ thói quen đó."
    },
    next: ['economics', 'awards']
  },
  {
    id: 'economics',
    page: 'economics',
    title: { en: 'Economics & VEO', vi: 'Kinh tế & VEO' },
    keywords: ['economics', 'economic', 'econ', 'veo', 'vietnam economics olympiad', 'markets', 'incentives', 'business', 'kinh te', 'olympic kinh te', 'thi truong', 'kinh doanh'],
    answer: {
      en: "Economics was new to her, so she started with the basics, including supply and demand and opportunity cost. She went on to win **First Prize at the Vietnam Economics Olympiad (VEO 2026)** and wanted to keep studying after the competition.",
      vi: "Ban đầu, kinh tế còn mới với Ngọc Anh nên bạn ấy học từ những phần cơ bản như cung cầu và chi phí cơ hội. Sau đó, Ngọc Anh đạt **Giải Nhất Olympic Kinh tế Việt Nam (VEO 2026)** và vẫn muốn học tiếp dù cuộc thi đã kết thúc."
    },
    more: {
      en: "What she enjoyed was thinking through different choices and explaining why one made sense in a particular situation. That interest carried into her work on businesses and financial data.",
      vi: "Điều Ngọc Anh thích là cân nhắc từng lựa chọn, rồi giải thích vì sao một cách làm hợp lý trong hoàn cảnh đó. Từ đây, bạn ấy muốn thử tìm hiểu doanh nghiệp và số liệu tài chính cụ thể hơn."
    },
    next: ['wico', 'green']
  },
  {
    id: 'wico',
    page: 'wico',
    title: { en: 'WICO & credit risk', vi: 'WICO & rủi ro tín dụng' },
    keywords: ['wico', 'credit', 'credit risk', 'sme', 'smes', 'random forest', 'xgboost', 'scorecard', '5c', 'machine learning', 'ml', 'invention', 'seoul', 'korea', 'gold medal', 'tin dung', 'rui ro', 'doanh nghiep nho', 'han quoc', 'huy chuong vang'],
    answer: {
      en: "At **WICO 2026 in Seoul**, her team won a **Gold Medal** for a project on credit risk in Vietnamese small and medium-sized businesses. They combined financial analysis, the **5Cs of credit, a scorecard, and Random Forest / XGBoost** to look at several sides of a business before scoring its risk.",
      vi: "Ở **WICO 2026 tại Seoul**, nhóm Ngọc Anh đạt **Huy chương Vàng** với dự án đánh giá rủi ro tín dụng cho doanh nghiệp vừa và nhỏ ở Việt Nam. Nhóm kết hợp phân tích tài chính, **5C, bảng chấm điểm và Random Forest / XGBoost** để xem doanh nghiệp từ nhiều phía trước khi chấm điểm rủi ro."
    },
    more: {
      en: "They studied five businesses using data from **2020–2025**. One had a **Debt/Equity ratio of 228.7%**; another saw **revenue fall 75%** in one year. Those figures needed to be read alongside the rest of each company’s finances. Ngoc Anh led the six-person delegation, and you can read the paper on the WICO page.",
      vi: "Nhóm dùng dữ liệu **2020–2025** của năm doanh nghiệp. Có doanh nghiệp có **Nợ/Vốn chủ sở hữu 228.7%**, có doanh nghiệp **doanh thu giảm 75%** trong một năm. Muốn hiểu các con số này, nhóm phải xem thêm những phần khác của báo cáo. Ngọc Anh dẫn đoàn sáu người; bài nghiên cứu có ở trang WICO nhé."
    },
    next: ['finad', 'leadership', 'awards']
  },
  {
    id: 'finad',
    page: 'finad',
    title: { en: 'FinAD', vi: 'FinAD' },
    keywords: ['finad', 'fin ad', 'tool', 'app', 'website', 'product', 'build', 'built', 'project', 'projects', 'pdf', 'financial statement', 'financial statements', 'ratios', 'dashboard', 'demo', 'code', 'coding', 'programming', 'du an', 'cong cu', 'san pham', 'bao cao tai chinh', 'lap trinh'],
    answer: {
      en: "**FinAD** started with a time-consuming task: copying figures out of financial-report PDFs by hand. Ngoc Anh built it to organise data from Vietnamese financial statements, calculate ratios, compare years and add short AI-assisted observations.",
      vi: "**FinAD** bắt đầu từ việc chép số liệu trong báo cáo PDF khá mất thời gian và dễ nhầm. Ngọc Anh thử làm công cụ này để sắp xếp dữ liệu từ báo cáo tài chính Việt Nam, tính chỉ số, so sánh các năm và viết nhận xét ngắn có AI hỗ trợ."
    },
    more: {
      en: `FinAD calculates ROA, ROE, D/E, current and quick ratios, OCF and FCF. It also checks accounting identities to help catch problems in the extracted data. You can try it at ${FINAD_URL} or watch the demo on the FinAD page.`,
      vi: `FinAD tính ROA, ROE, D/E, hệ số thanh toán hiện hành và nhanh, OCF, FCF. Công cụ cũng kiểm tra các đẳng thức kế toán để hỗ trợ phát hiện lỗi trong dữ liệu lấy ra. Bạn có thể thử ở ${FINAD_URL} hoặc xem video demo trong phần FinAD nhé.`
    },
    next: ['skills', 'green', 'wico']
  },
  {
    id: 'green',
    page: 'green-credit',
    title: { en: 'Green credit research', vi: 'Nghiên cứu tín dụng xanh' },
    keywords: ['research', 'paper', 'publication', 'published', 'journal', 'green', 'green credit', 'bank', 'banks', 'banking', 'roa', 'ols', 'regression', 'empirical', 'study', 'nghien cuu', 'bai bao', 'tin dung xanh', 'ngan hang', 'tap chi'],
    answer: {
      en: "Her paper **“Green Credit and Bank Financial Performance”** appeared in the *Journal of Management Research* (Vol. 18, No. 2, 2026). She wanted to find out whether banks lending more to green projects also performed better financially.",
      vi: "Trong bài **“Green Credit and Bank Financial Performance”**, Ngọc Anh tìm hiểu xem ngân hàng cho vay nhiều hơn vào dự án xanh thì có hoạt động hiệu quả hơn không. Bài được đăng trên *Journal of Management Research* (Tập 18, Số 2, 2026)."
    },
    more: {
      en: "She used **24 observations from 8 Vietnamese banks in 2022–2024**, with **pooled OLS**. A higher **Green Credit Ratio** was linked to higher ROA, with statistical significance. The total amount of green credit didn’t show the same result, so the two measures needed to be kept distinct.",
      vi: "Dữ liệu gồm **8 ngân hàng Việt Nam, giai đoạn 2022–2024, với 24 quan sát**, dùng **pooled OLS**. **Tỷ lệ tín dụng xanh** cao hơn đi cùng ROA cao hơn, với mối liên hệ có ý nghĩa thống kê. Tổng lượng tín dụng xanh chưa cho kết quả tương tự, nên khi đọc kết luận cần phân biệt hai cách đo này."
    },
    next: ['wico', 'finad']
  },
  {
    id: 'awards',
    page: 'milestones',
    title: { en: 'Awards', vi: 'Giải thưởng' },
    keywords: ['award', 'awards', 'prize', 'prizes', 'medal', 'medals', 'honor', 'honors', 'honours', 'achievement', 'achievements', 'competition', 'competitions', 'milestone', 'milestones', 'won', 'win', 'giai', 'giai thuong', 'thanh tich', 'huy chuong', 'dau moc', 'cuoc thi'],
    answer: {
      en: "A few of her main results are **First Prize at VEO 2026**, **Gold Medal at WICO 2026**, **Third Prize in the National Chemistry Competition**, and a **Gold Award at AXGO 2026** for her analysis of DOJI.",
      vi: "Một vài kết quả nổi bật của Ngọc Anh là **Giải Nhất VEO 2026**, **Huy chương Vàng WICO 2026**, **Giải Ba HSG Quốc gia môn Hóa** và **Gold Award tại AXGO 2026** với bài phân tích DOJI."
    },
    more: {
      en: "She also took part in Chemistry and Natural Sciences competitions in Hanoi before these. You can ask about one competition at a time to hear more about what she worked on.",
      vi: "Trước đó, Ngọc Anh cũng có các giải cấp thành phố Hà Nội về Hóa và Khoa học Tự nhiên. Bạn có thể hỏi riêng từng cuộc thi để nghe thêm về phần việc bạn ấy đã làm."
    },
    next: ['economics', 'wico', 'axgo']
  },
  {
    id: 'axgo',
    page: 'milestones',
    title: { en: 'AXGO & DOJI', vi: 'AXGO & DOJI' },
    keywords: ['axgo', 'ax global', 'doji', 'fashion', 'virtual try on', 'try-on', 'corporate analysis', 'case study', 'phan tich doanh nghiep'],
    answer: {
      en: "At **AX Global Olympiad 2026**, she received a **Gold Award** for a business and market analysis of **DOJI’s AI virtual try-on feature**. The project brought together her interests in business and technology.",
      vi: "Ở **AX Global Olympiad 2026**, Ngọc Anh nhận **Gold Award** cho bài phân tích kinh doanh và thị trường về **tính năng thử đồ ảo bằng AI của DOJI**. Đây là một dự án kết hợp hai mảng bạn ấy đang quan tâm: kinh doanh và công nghệ."
    },
    more: {
      en: "Looking at DOJI meant reading the data alongside the company’s strategy and finances. It made her want to understand more about how businesses work.",
      vi: "Phân tích DOJI là dịp Ngọc Anh đặt dữ liệu cạnh chiến lược và tài chính của công ty. Càng tìm hiểu, bạn ấy càng muốn biết doanh nghiệp vận hành như thế nào."
    },
    next: ['awards', 'finad']
  },
  {
    id: 'leadership',
    page: 'beyond',
    title: { en: 'Leadership & mentoring', vi: 'Lãnh đạo & hướng dẫn' },
    keywords: ['leadership', 'leader', 'lead', 'led', 'team', 'teamwork', 'mentor', 'mentoring', 'teaching', 'teach', 'with project', 'advisor', 'entrance exam', 'collaboration', 'lanh dao', 'truong nhom', 'doi nhom', 'lam viec nhom', 'huong dan', 'day', 'co van'],
    answer: {
      en: "She led the **six-person WICO delegation** and coordinated the **Peace Village charity project**. In the journal, she talks about dividing the work, listening when people disagree and helping the group decide what to do next. It’s something she’s still learning.",
      vi: "Ngọc Anh từng dẫn **đoàn WICO sáu người** và làm trưởng ban dự án thiện nguyện **Làng Hòa Bình**. Trong portfolio, bạn ấy kể về chuyện chia việc, nghe ý kiến khác nhau và cùng nhóm tìm cách làm tiếp. Đó cũng là việc Ngọc Anh vẫn đang học."
    },
    more: {
      en: "She also helped Grade 9 students prepare for entrance exams through **Ams Advisor and WITH Project Season V**. Three students she coached over six months were admitted to specialized schools. Explaining problems sometimes helped her notice gaps in her own understanding too.",
      vi: "Ngọc Anh còn kèm các em lớp 9 ôn thi vào lớp 10 qua **Ams Advisor và WITH Project mùa 5**. Ba em được bạn ấy kèm trong sáu tháng đều đỗ trường chuyên. Có lúc giảng bài, Ngọc Anh cũng nhận ra phần chính mình cần hiểu kỹ hơn."
    },
    next: ['internship', 'community']
  },
  {
    id: 'internship',
    page: 'beyond',
    title: { en: 'GTEL internship', vi: 'Thực tập GTEL' },
    keywords: ['internship', 'intern', 'gtel', 'work experience', 'experience', 'job', 'company', 'financial planning', 'thuc tap', 'kinh nghiem', 'cong ty', 'ke hoach tai chinh'],
    answer: {
      en: "She spent **7 June to 6 August 2026** as a **Business Data Analyst intern** in **GTEL’s Financial Planning department**. It gave her a chance to see how the work she was interested in looked inside a company.",
      vi: "Từ **07/06 đến 06/08/2026**, Ngọc Anh thực tập vị trí **Business Data Analyst** tại phòng **Kế hoạch Tài chính của GTEL**. Đây là dịp để bạn ấy xem những việc mình đang quan tâm được làm thế nào trong một công ty."
    },
    more: {
      en: "She worked on collecting, cleaning and organising business data with Excel, SQL, Power BI and Tableau. She also saw how financial decisions involved conversations with several departments.",
      vi: "Ngọc Anh thu thập, làm sạch và sắp xếp dữ liệu kinh doanh bằng Excel, SQL, Power BI và Tableau. Bạn ấy cũng được thấy một quyết định tài chính cần trao đổi với nhiều phòng ban như thế nào."
    },
    next: ['skills', 'leadership']
  },
  {
    id: 'community',
    page: 'community',
    title: { en: 'Community work', vi: 'Hoạt động cộng đồng' },
    keywords: ['community', 'volunteer', 'volunteering', 'charity', 'social', 'fundraising', 'peace village', 'bach mai', 'sos', 'hai phong', 'children', 'tet', 'cong dong', 'tinh nguyen', 'thien nguyen', 'tu thien', 'lang hoa binh', 'gay quy', 'tre em'],
    answer: {
      en: "She helped with fundraising at **Peace Village – Thanh Xuan**, **Bach Mai Hospital** and **SOS Children’s Village Hai Phong**. At Peace Village, she coordinated the team and a Tet gift-giving day for children with mobility impairments. At Bach Mai, the fundraising supported families facing treatment costs.",
      vi: "Ngọc Anh tham gia gây quỹ tại **Làng Hòa Bình Thanh Xuân**, **Bệnh viện Bạch Mai** và **Làng trẻ em SOS Hải Phòng**. Ở Làng Hòa Bình, bạn ấy phụ trách nhóm và buổi trao quà Tết cho các em gặp khó khăn về vận động. Ở Bạch Mai, hoạt động gây quỹ hỗ trợ các gia đình khó khăn với chi phí điều trị."
    },
    more: {
      en: "Her role at Peace Village covered the preparations, fundraising and the day of the event. At Bach Mai and SOS Hai Phong, she joined as a volunteer alongside the rest of the group.",
      vi: "Ở Làng Hòa Bình, Ngọc Anh theo cùng nhóm từ lúc chuẩn bị, gây quỹ đến ngày trao quà. Còn ở Bạch Mai và SOS Hải Phòng, bạn ấy tham gia với vai trò tình nguyện viên, cùng mọi người góp sức."
    },
    next: ['leadership', 'hobbies']
  },
  {
    id: 'hobbies',
    page: 'outside',
    title: { en: 'Outside school', vi: 'Ngoài giờ học' },
    keywords: ['hobby', 'hobbies', 'interest', 'interests', 'free time', 'fun', 'music', 'piano', 'guitar', 'photography', 'photo', 'photos', 'life', 'personal', 'zhongsin', 'so thich', 'am nhac', 'chup anh', 'nhiep anh', 'thoi gian ranh', 'cuoc song'],
    answer: {
      en: "She likes **photography**, **music** and spending time with friends. Taking photos helps her notice things she might walk past. She also plays piano and has performed at the **Zhongsin International Music Competition**.",
      vi: "Ngọc Anh thích **chụp ảnh**, **âm nhạc** và dành thời gian với bạn bè. Chụp ảnh là một cách để bạn ấy dừng lại nhìn kỹ những thứ bình thường hay đi qua. Ngọc Anh cũng chơi piano và từng biểu diễn tại **cuộc thi âm nhạc quốc tế Zhongsin**."
    },
    more: {
      en: "In the journal, she talks about enjoying music at her own pace and keeping space for ordinary days with friends. Those memories are part of the portfolio too.",
      vi: "Trong portfolio, Ngọc Anh kể về việc chơi đàn theo nhịp của mình và những ngày bình thường với bạn bè. Bạn ấy muốn giữ một góc cho những kỷ niệm đó nữa."
    },
    next: ['community', 'about']
  },
  {
    id: 'skills',
    page: 'snapshot',
    title: { en: 'Skills & tools', vi: 'Kỹ năng & công cụ' },
    keywords: ['skill', 'skills', 'tool', 'tools', 'stack', 'python', 'sql', 'excel', 'power bi', 'tableau', 'pandas', 'language', 'languages', 'english', 'technical', 'ky nang', 'cong cu', 'ngon ngu', 'tieng anh'],
    answer: {
      en: "She uses **Python** (Pandas, Scikit-learn, XGBoost), **SQL**, **Excel**, **Power BI** and **Tableau**, and works with financial ratios. She speaks Vietnamese and English, with **IELTS 7.5**.",
      vi: "Ngọc Anh dùng **Python** (Pandas, Scikit-learn, XGBoost), **SQL**, **Excel**, **Power BI**, **Tableau** và làm việc với các chỉ số tài chính. Bạn ấy sử dụng tiếng Việt và tiếng Anh, với **IELTS 7.5**."
    },
    more: {
      en: "For examples of how she uses them, take a look at FinAD, the WICO credit-risk project or her GTEL internship.",
      vi: "Muốn xem các công cụ này được dùng vào việc gì, bạn có thể đọc phần FinAD, dự án rủi ro tín dụng WICO hoặc kỳ thực tập GTEL nhé."
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
      en: "There isn’t a downloadable CV here yet, but the journal pages cover her studies, projects and activities.",
      vi: "Hiện trang chưa có CV để tải về, nhưng bạn có thể đọc các phần về học tập, dự án và hoạt động trong portfolio nhé."
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
            ? 'Chào bạn! Mình là trợ lý của portfolio này. Bạn có thể hỏi mình về chuyện học, các dự án hay sở thích của Ngọc Anh. Bạn muốn nghe phần nào trước?'
            : 'Hi! I’m the portfolio assistant. You can ask me about Ngoc Anh’s studies, projects or life outside school. Where would you like to start?',
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
          ? 'Mình chưa hiểu rõ câu hỏi này. Bạn thử hỏi cụ thể hơn một chút nhé, chẳng hạn vì sao Ngọc Anh làm FinAD, học kinh tế từ đâu, hoặc thường làm gì lúc rảnh.'
          : 'I’m not quite sure what you mean. Could you be a little more specific? You could ask why Ngoc Anh built FinAD, how she got into economics, or what she does in her free time.',
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
