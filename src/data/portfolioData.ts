import { ProjectItem, ResearchItem, LeadershipStory, AchievementItem, ActivityItem, InterestItem } from '../types';
import { Language } from '../context/LanguageContext';

export const PERSONAL_INFO = {
  name: 'Tran Ngoc Anh',
  nameVi: 'Trần Ngọc Ánh',
  shortName: 'Tran Ngoc Anh',
  title: 'Academic & Research Portfolio',
  titleVi: 'Hồ sơ Học thuật & Nghiên cứu',
  tagline: 'Empirical Research · Quantitative Strategy · Impact',
  taglineVi: 'Nghiên cứu Thực nghiệm · Chiến lược Định lượng · Tác động',
  email: 'Ngocanh.nine@gmail.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  location: 'Hanoi, Vietnam',
  locationVi: 'Hà Nội, Việt Nam',
};

export const getPersonalInfo = (lang: Language = 'en') => ({
  ...PERSONAL_INFO,
  name: lang === 'vi' ? PERSONAL_INFO.nameVi : PERSONAL_INFO.name,
  title: lang === 'vi' ? PERSONAL_INFO.titleVi : PERSONAL_INFO.title,
  tagline: lang === 'vi' ? PERSONAL_INFO.taglineVi : PERSONAL_INFO.tagline,
  location: lang === 'vi' ? PERSONAL_INFO.locationVi : PERSONAL_INFO.location,
});

export const EDUCATION_DATA_EN = {
  institution: 'Hanoi–Amsterdam High School for the Gifted',
  specialization: 'Chemistry Major',
  location: 'Hanoi, Vietnam',
  period: 'Sep 2024 — June 2027',
  gpa: [
    { grade: 'Grade 10', score: '9.6', scale: '10' },
    { grade: 'Grade 11', score: '9.8', scale: '10' },
    { grade: 'Cumulative GPA', score: '9.7', scale: '10' }
  ],
  standardizedTests: [
    {
      id: 'sat',
      test: 'SAT',
      score: '1520',
      date: 'June 2026',
      descriptor: 'Evidence-Based Reading, Writing & Mathematics',
      pdfUrl: '/certificates/sat-score-report.pdf',
      previewImage: '/certificates/sat-preview.jpg'
    },
    {
      id: 'ielts',
      test: 'IELTS Academic',
      score: '7.5',
      date: 'July 2025',
      descriptor: 'Overall Band Score',
      pdfUrl: '/certificates/ielts-certificate.pdf',
      previewImage: '/certificates/ielts-preview.jpg'
    },
    {
      id: 'alevel',
      test: 'A-Level Mathematics',
      score: 'A',
      date: 'Cambridge International',
      descriptor: 'Pure Mathematics & Mechanics (AS Level)',
      pdfUrl: '/certificates/as-score-report.pdf',
      previewImage: '/certificates/as-preview.jpg'
    }
  ]
};

export const EDUCATION_DATA_VI = {
  institution: 'Trường THPT Chuyên Hà Nội – Amsterdam',
  specialization: 'Chuyên Hóa học',
  location: 'Hà Nội, Việt Nam',
  period: '09/2024 — 06/2027',
  gpa: [
    { grade: 'Lớp 10', score: '9.6', scale: '10' },
    { grade: 'Lớp 11', score: '9.8', scale: '10' },
    { grade: 'Điểm TBM', score: '9.7', scale: '10' }
  ],
  standardizedTests: [
    {
      id: 'sat',
      test: 'SAT',
      score: '1520',
      date: 'Tháng 6/2026',
      descriptor: 'Đọc hiểu, Viết & Toán học dựa trên dẫn chứng',
      pdfUrl: '/certificates/sat-score-report.pdf',
      previewImage: '/certificates/sat-preview.jpg'
    },
    {
      id: 'ielts',
      test: 'IELTS Academic',
      score: '7.5',
      date: 'Tháng 7/2025',
      descriptor: 'Điểm tổng quát (Overall Band Score)',
      pdfUrl: '/certificates/ielts-certificate.pdf',
      previewImage: '/certificates/ielts-preview.jpg'
    },
    {
      id: 'alevel',
      test: 'A-Level Mathematics',
      score: 'A',
      date: 'Cambridge International',
      descriptor: 'Toán thuần túy & Cơ học (Cấp độ AS Level)',
      pdfUrl: '/certificates/as-score-report.pdf',
      previewImage: '/certificates/as-preview.jpg'
    }
  ]
};

export const getEducationData = (lang: Language = 'en') =>
  lang === 'vi' ? EDUCATION_DATA_VI : EDUCATION_DATA_EN;

export const EDUCATION_DATA = EDUCATION_DATA_EN;

export const CORE_KEYWORDS = [
  'RESEARCH',
  'ECONOMICS',
  'QUANTITATIVE',
  'DATA',
  'LEADERSHIP',
  'INNOVATION',
];

export const PROJECTS_EN: ProjectItem[] = [
  {
    id: 'project-01',
    number: '01',
    name: 'SME Financial Distress Forecaster',
    role: 'Lead Researcher & Modeler',
    tools: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas'],
    year: '2026',
    tag: 'Financial AI Platform',
    metrics: [
      { label: 'Accuracy', value: '94.2%' },
      { label: 'Latency', value: '< 120ms' },
      { label: 'Features', value: '18 Factors' }
    ],
    caseStudy: {
      overview: 'Machine learning framework predicting credit distress in Vietnamese SMEs using multi-year accounting metrics.',
      problem: 'Collateral-heavy lending models penalize viable SMEs lacking traditional physical assets.',
      solution: 'Dual-layer ensemble analyzing cash flow velocity and interest coverage to assess insolvency risk.',
      results: [
        'Improved early default risk detection recall by 28%',
        'Decreased false credit rejection for liquid small enterprises',
        'Presented and awarded Gold at WICO 2026'
      ]
    }
  },
  {
    id: 'project-02',
    number: '02',
    name: 'Green Lending Econometric Suite',
    role: 'Quantitative Analyst',
    tools: ['Stata', 'R', 'Panel Econometrics', 'LaTeX'],
    year: '2026',
    tag: 'Econometric Analytics',
    metrics: [
      { label: 'Sample', value: '8 Banks' },
      { label: 'Panel Obs', value: '24 Bank-Years' },
      { label: 'Significance', value: 'p < 0.05' }
    ],
    caseStudy: {
      overview: 'Empirical estimation suite investigating green credit ratios versus bank profitability across Vietnamese commercial lenders.',
      problem: 'Limited empirical evidence on whether ESG credit allocation enhances bank financial performance in Vietnam.',
      solution: 'Pooled OLS model with robust standard errors evaluating return on assets against green credit intensity.',
      results: [
        'Demonstrated that green lending intensity significantly correlates with higher ROA',
        'Published in Journal of Management Research (Vol. 18, No. 2, 2026)',
        'Delivered actionable policy recommendations for commercial credit officers'
      ]
    }
  },
  {
    id: 'project-03',
    number: '03',
    name: 'Telecommunications Financial Planning System',
    role: 'Business Data Analyst Intern',
    tools: ['SQL', 'Power BI', 'Excel VBA', 'Tableau'],
    year: '2026',
    tag: 'Operational Intelligence',
    metrics: [
      { label: 'Reporting', value: 'Automated' },
      { label: 'Cycle Time', value: '-35%' },
      { label: 'Data Points', value: '100k+' }
    ],
    caseStudy: {
      overview: 'Automated financial tracking and cost-efficiency analytics dashboard for telecom operations at GTEL.',
      problem: 'Disparate operational logs causing delays in quarterly budgetary forecasting and cost analysis.',
      solution: 'Consolidated SQL pipeline feeding interactive Power BI dashboards for real-time cost-variance tracking.',
      results: [
        'Reduced manual financial reconciliation cycle time by 35%',
        'Streamlined departmental budget visibility across key regional nodes',
        'Commended by senior leadership in Financial Planning'
      ]
    }
  }
];

export const PROJECTS_VI: ProjectItem[] = [
  {
    id: 'project-01',
    number: '01',
    name: 'Hệ thống Dự báo Rủi ro Tài chính DNNVV',
    role: 'Trưởng nhóm Nghiên cứu & Xây dựng Mô hình',
    tools: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas'],
    year: '2026',
    tag: 'Nền tảng AI Tài chính',
    metrics: [
      { label: 'Độ chính xác', value: '94.2%' },
      { label: 'Độ trễ', value: '< 120ms' },
      { label: 'Chỉ số', value: '18 Yếu tố' }
    ],
    caseStudy: {
      overview: 'Khung mô hình máy học dự báo rủi ro kiệt quệ tài chính cho các DNNVV tại Việt Nam dựa trên chỉ số kế toán nhiều kỳ.',
      problem: 'Cơ chế cho vay phụ thuộc tài sản đảm bảo cố định tạo rào cản lớn cho các DNNVV có dòng tiền tốt.',
      solution: 'Mô hình ensemble phân tích tốc độ luân chuyển dòng tiền và khả năng chi trả lãi vay để đánh giá rủi ro.',
      results: [
        'Nâng cao khả năng phát hiện sớm rủi ro mất khả năng thanh toán thêm 28%',
        'Giảm tỷ lệ từ chối tín dụng sai lệch cho các doanh nghiệp lành mạnh',
        'Thuyết trình và đạt Huy chương Vàng tại WICO 2026'
      ]
    }
  },
  {
    id: 'project-02',
    number: '02',
    name: 'Bộ Phân tích Kinh tế lượng Tín dụng Xanh',
    role: 'Nhà phân tích Định lượng',
    tools: ['Stata', 'R', 'Kinh tế lượng', 'LaTeX'],
    year: '2026',
    tag: 'Phân tích Kinh tế lượng',
    metrics: [
      { label: 'Mẫu nghiên cứu', value: '8 Ngân hàng' },
      { label: 'Quan sát', value: '24 Năm-Ngân hàng' },
      { label: 'Mức ý nghĩa', value: 'p < 0.05' }
    ],
    caseStudy: {
      overview: 'Bộ ước lượng thực nghiệm phân tích tác động của tỷ trọng tín dụng xanh lên tỷ suất sinh lời của các ngân hàng thương mại Việt Nam.',
      problem: 'Thiếu hụt bằng chứng thực nghiệm rõ ràng về tác động của tín dụng ESG lên hiệu quả tài chính ngân hàng tại Việt Nam.',
      solution: 'Mô hình hồi quy OLS dữ liệu bảng với sai số chuẩn vững đánh giá ROA theo cường độ cho vay xanh.',
      results: [
        'Chứng minh tỷ trọng tín dụng xanh có tương quan thuận và có ý nghĩa thống kê với ROA',
        'Xuất bản trên Journal of Management Research (Tập 18, Số 2, 2026)',
        'Đưa ra khuyến nghị chính sách cụ thể cho các tổ chức tín dụng'
      ]
    }
  },
  {
    id: 'project-03',
    number: '03',
    name: 'Hệ thống Kế hoạch Tài chính Viễn thông GTEL',
    role: 'Thực tập sinh Phân tích Dữ liệu',
    tools: ['SQL', 'Power BI', 'Excel VBA', 'Tableau'],
    year: '2026',
    tag: 'Phân tích Vận hành',
    metrics: [
      { label: 'Báo cáo', value: 'Tự động hóa' },
      { label: 'Thời gian xử lý', value: '-35%' },
      { label: 'Dữ liệu', value: '100k+ bản ghi' }
    ],
    caseStudy: {
      overview: 'Bảng điều khiển tự động theo dõi tài chính và phân tích hiệu quả chi phí vận hành viễn thông tại GTEL.',
      problem: 'Dữ liệu vận hành phân tán làm chậm quá trình lập dự báo ngân sách quý và phân tích chi phí.',
      solution: 'Xây dựng pipeline SQL tổng hợp cấp dữ liệu trực quan cho dashboard Power BI phục vụ theo dõi biến động chi phí.',
      results: [
        'Rút ngắn 35% chu kỳ đối soát và báo cáo tài chính định kỳ',
        'Tăng cường khả năng theo dõi ngân sách minh bạch giữa các chi nhánh',
        'Được ban lãnh đạo phòng Kế hoạch Tài chính đánh giá cao'
      ]
    }
  }
];

export const getProjects = (lang: Language = 'en') =>
  lang === 'vi' ? PROJECTS_VI : PROJECTS_EN;

export const PROJECTS = PROJECTS_EN;

export const RESEARCH_PAPERS_EN: ResearchItem[] = [
  {
    id: 'research-01',
    number: '01',
    year: '2026',
    badge: 'PUBLISHED · JOURNAL OF MANAGEMENT RESEARCH',
    researchType: 'published_paper',
    title: 'Green Credit and Bank Financial Performance: Exploratory Evidence from Eight Vietnamese Commercial Banks, 2022–2024',
    mainTitle: 'Green Credit and Bank Financial Performance',
    subtitle: 'Exploratory Evidence from Eight Vietnamese Commercial Banks, 2022–2024',
    tags: ['Green Finance', 'Banking', 'Panel Data', 'Vietnam'],
    shortDescription: 'Exploring how green lending intensity relates to the financial performance of Vietnamese commercial banks.',
    snapshot: [
      { value: '8', label: 'Banks' },
      { value: '24', label: 'Bank-year observations' },
      { value: '2022–24', label: 'Study period' },
      { value: 'OLS', label: 'Method' }
    ],
    inlineMetrics: ['8 Banks', '24 Observations', '2022–24', 'Pooled OLS'],
    equation: 'ROA_{it} = \\beta_0 + \\beta_1 GCR_{it} + \\text{controls} + \\varepsilon_{it}',
    equationNote: 'Model Specification',
    publishedIn: 'Journal of Management Research · Vol. 18, No. 2 · 2026',
    doi: '10.5296/jmr.v18i2.23952',
    doiUrl: 'https://doi.org/10.5296/jmr.v18i2.23952',
    paperUrl: '/papers/green-credit-banking-2026.pdf',
    pdfUrl: '/papers/green-credit-banking-2026.pdf',
    previewImage: '/papers/green-credit-page1.jpg',
    overview: 'Examines how green credit relates to bank financial performance across eight Vietnamese commercial banks from 2022 to 2024. Utilizing a balanced panel dataset, the study analyzes the financial implications of green lending intensity versus absolute loan volume.',
    researchProblem: 'While green finance is prioritized by policy mandates in Vietnam, empirical evidence on whether commercial banks reap tangible financial performance from green credit expansion has remained limited and fragmented.',
    researchQuestions: [
      'Does green credit allocation enhance or dilute commercial bank profitability in Vietnam?',
      'Is financial performance driven by relative green lending intensity or merely absolute loan scale?'
    ],
    detailSnapshot: [
      '8 Vietnamese commercial banks',
      '24 observations',
      '2022–2024',
      'Balanced panel',
      'Pooled OLS'
    ],
    methodologyFlow: [
      'Bank Reports',
      'Green Credit Variables',
      'Panel Dataset',
      'OLS Regression',
      'ROA'
    ],
    keyFindingHeadline: 'Green lending intensity matters more than absolute green loan volume.',
    keyFindingDetail: 'Green Credit Ratio (GCR) is positively and significantly associated with ROA, while the absolute volume of green credit does not show a statistically significant effect.',
    publicationDetails: {
      journal: 'Journal of Management Research',
      issue: 'Vol. 18, No. 2',
      year: '2026'
    }
  },
  {
    id: 'research-02',
    number: '02',
    year: '2026',
    badge: 'RESEARCH PROJECT · PRESENTED AT WICO 2026',
    researchType: 'research_project',
    title: 'AI-Powered Credit Risk Assessment for Vietnamese SMEs',
    mainTitle: 'Application of Artificial Intelligence to Mitigate Credit Barriers for Small and Medium Enterprises (SMEs) in Vietnam',
    subtitle: 'Investigating SME Credit Constraints and Proposing Machine Learning Risk Frameworks',
    tags: ['Finance', 'Machine Learning', 'Credit Risk', 'SME'],
    paperUrl: '/papers/wico-research-paper.pdf',
    pdfUrl: '/papers/wico-research-paper.pdf',
    previewImage: '/papers/wico-page1.jpg',
    shortDescription: 'Investigating financial drivers of SME credit constraints and proposing an AI-driven credit risk assessment framework.',
    snapshot: [
      { value: '5', label: 'SMEs analyzed' },
      { value: '2020–25', label: 'Financial data' },
      { value: 'RF / XGB', label: 'AI models' },
      { value: 'WICO 2026', label: 'Presented' }
    ],
    inlineMetrics: ['5 SMEs Analyzed', '2020–2025 Financial Data', 'Logistic, RF & XGBoost', 'SME Default Risk'],
    equation: 'P(\\text{Default}_i) = \\sigma\\big(\\mathbf{w}^T \\mathbf{x}_i^{\\text{financial}} + \\mathbf{\\theta}^T \\mathbf{z}_i^{\\text{operational}}\\big)',
    equationNote: 'Supervised ML Risk Architecture',
    publishedIn: 'Research Project · Presented at WICO 2026',
    overview: 'Investigating financial drivers of SME credit constraints in Vietnam and proposing an AI-driven credit risk assessment framework. The project models borrower default probabilities by synthesizing multi-period accounting metrics with machine learning algorithms.',
    researchProblem: 'Over 97% of Vietnamese enterprises are SMEs, yet up to 70% face persistent credit rationing. Traditional commercial lending models demand 100–150% fixed-asset collateral, penalizing viable small enterprises with limited physical assets or informal reporting history.',
    researchQuestions: [
      'What quantitative financial ratios and operational factors most reliably predict liquidity distress in Vietnamese SMEs?',
      'Can non-linear machine learning ensembles (Random Forest & XGBoost) significantly improve credit scoring accuracy over standard univariate linear models?',
      'How can an interpretable AI credit scoring system reduce physical collateral dependency without increasing bank loan loss provisions?'
    ],
    detailSnapshot: [
      '5 SMEs analyzed',
      'Financial data: 2020–2025',
      'Methods: ratio analysis, logistic regression, Random Forest & XGBoost',
      'Focus: SME credit accessibility and default risk'
    ],
    dataSample: [
      '5 representative Vietnamese SMEs across manufacturing, trade, and logistics with audited financial statements (2020–2025).',
      'Multi-year balance sheet and income statement metrics: Current Ratio, Quick Ratio, Debt-to-Equity, Interest Coverage Ratio (ICR), Cash Flow from Operations to Debt, and Inventory Turnover.'
    ],
    methodologyFlow: [
      'Financial Ratio Extraction',
      'Feature Engineering & Selection',
      'Baseline Logistic Regression',
      'Random Forest & XGBoost Ensemble',
      'Credit Risk Scoring Index'
    ],
    keyFindingHeadline: 'Cash flow velocity and short-term debt coverage are higher-fidelity indicators than fixed collateral value.',
    keyFindingDetail: 'Empirical analysis indicates that operational cash flow velocity and interest coverage provide earlier and more reliable solvency warnings than static asset appraisal. The machine learning ensemble demonstrated higher recall for early distress signs while reducing false credit rejection for healthy SMEs.',
    proposedAiModel: {
      headline: 'Dual-Layer Supervised Ensemble (Random Forest + XGBoost with Feature Attribution)',
      description: 'A modular risk-scoring architecture that ingests 18 financial and operational features, normalizes variance across multi-year cycles, and computes default probabilities with explainable decision boundaries.',
      highlights: [
        'Multi-algorithm comparison: Logistic Regression baseline vs. Random Forest & XGBoost',
        'Feature importance ranking prioritizing operating cash flow and working capital efficiency',
        'Designed to augment underwriting without replacing human oversight'
      ]
    },
    myContribution: [
      'Led the research problem formulation, literature review on SME financing barriers in emerging markets, and overall research design.',
      'Extracted, cleaned, and standardized multi-year financial statement data (2020–2025) across 5 Vietnamese SME case studies.',
      'Conducted financial ratio benchmarking and collaborated on feature selection and model evaluation pipelines.',
      'Co-authored the academic research report and prepared technical presentation materials presented to the international jury at WICO 2026.'
    ],
    researchMaterials: [
      {
        title: 'Full Research Report & Framework (PDF)',
        subtitle: 'Complete empirical paper: AI & SME Credit Risk Assessment in Vietnam',
        type: 'report',
        url: '/papers/wico-research-paper.pdf',
        actionLabel: 'Read Research Report ↗'
      },
      {
        title: 'WICO 2026 Research & Award Documentation',
        subtitle: 'Official competition presentation, research poster & award verification',
        type: 'report',
        url: '/certificates/wico-2026.pdf',
        actionLabel: 'View Certificate & Poster ↗'
      }
    ],
    crossReference: {
      label: 'View WICO Gold Medal',
      targetPage: 'honors',
      targetId: 'wico-2026'
    }
  }
];

export const RESEARCH_PAPERS_VI: ResearchItem[] = [
  {
    id: 'research-01',
    number: '01',
    year: '2026',
    badge: 'ĐÃ XUẤT BẢN · JOURNAL OF MANAGEMENT RESEARCH',
    researchType: 'published_paper',
    title: 'Tín dụng Xanh và Hiệu quả Tài chính Ngân hàng: Bằng chứng Thực nghiệm từ 8 Ngân hàng Thương mại Việt Nam, 2022–2024',
    mainTitle: 'Tín dụng Xanh và Hiệu quả Tài chính Ngân hàng',
    subtitle: 'Bằng chứng Thực nghiệm từ 8 Ngân hàng Thương mại Việt Nam, 2022–2024',
    tags: ['Tài chính Xanh', 'Ngân hàng', 'Dữ liệu Bảng', 'Việt Nam'],
    shortDescription: 'Nghiên cứu mối quan hệ giữa tỷ trọng tín dụng xanh và hiệu quả tài chính của các ngân hàng thương mại Việt Nam.',
    snapshot: [
      { value: '8', label: 'Ngân hàng' },
      { value: '24', label: 'Quan sát năm-ngân hàng' },
      { value: '2022–24', label: 'Giai đoạn' },
      { value: 'OLS', label: 'Phương pháp' }
    ],
    inlineMetrics: ['8 Ngân hàng', '24 Quan sát', '2022–24', 'Pooled OLS'],
    equation: 'ROA_{it} = \\beta_0 + \\beta_1 GCR_{it} + \\text{controls} + \\varepsilon_{it}',
    equationNote: 'Đặc tả Mô hình Hồi quy',
    publishedIn: 'Journal of Management Research · Tập 18, Số 2 · 2026',
    doi: '10.5296/jmr.v18i2.23952',
    doiUrl: 'https://doi.org/10.5296/jmr.v18i2.23952',
    paperUrl: '/papers/green-credit-banking-2026.pdf',
    pdfUrl: '/papers/green-credit-banking-2026.pdf',
    previewImage: '/papers/green-credit-page1.jpg',
    overview: 'Nghiên cứu xem xét mối quan hệ giữa tín dụng xanh và hiệu quả tài chính tại 8 ngân hàng thương mại Việt Nam giai đoạn 2022–2024. Sử dụng bộ dữ liệu bảng cân bằng, nghiên cứu phân tích tác động tài chính của tỷ trọng tín dụng xanh so với quy mô cho vay tuyệt đối.',
    researchProblem: 'Mặc dù tài chính xanh được định hướng ưu tiên trong chính sách tiền tệ tại Việt Nam, các bằng chứng thực nghiệm về việc mở rộng tín dụng xanh có mang lại lợi ích tài chính rõ rệt cho ngân hàng hay không vẫn còn hạn chế và phân tán.',
    researchQuestions: [
      'Việc phân bổ tín dụng xanh nâng cao hay làm suy giảm khả năng sinh lời của các ngân hàng thương mại tại Việt Nam?',
      'Hiệu quả tài chính chịu tác động bởi tỷ trọng tín dụng xanh tương đối hay chỉ đơn thuần là quy mô cho vay tuyệt đối?'
    ],
    detailSnapshot: [
      '8 ngân hàng thương mại Việt Nam',
      '24 quan sát dữ liệu',
      'Giai đoạn 2022–2024',
      'Bộ dữ liệu bảng cân bằng',
      'Hồi quy OLS gộp (Pooled OLS)'
    ],
    methodologyFlow: [
      'Báo cáo Tài chính',
      'Biến Tín dụng Xanh',
      'Bộ Dữ liệu Bảng',
      'Hồi quy OLS',
      'Chỉ số ROA'
    ],
    keyFindingHeadline: 'Tỷ trọng cho vay xanh có ý nghĩa quan trọng hơn quy mô tuyệt đối của khoản vay.',
    keyFindingDetail: 'Tỷ lệ Tín dụng Xanh (GCR) có mối tương quan thuận và có ý nghĩa thống kê với ROA, trong khi khối lượng tín dụng xanh tuyệt đối không cho thấy tác động có ý nghĩa thống kê rõ rệt.',
    publicationDetails: {
      journal: 'Journal of Management Research',
      issue: 'Tập 18, Số 2',
      year: '2026'
    }
  },
  {
    id: 'research-02',
    number: '02',
    year: '2026',
    badge: 'ĐỀ TÀI NGHIÊN CỨU · BÁO CÁO TẠI WICO 2026',
    researchType: 'research_project',
    title: 'Ứng dụng Trí tuệ Nhân tạo Đánh giá Rủi ro Tín dụng cho Doanh nghiệp Nhỏ và Vừa tại Việt Nam',
    mainTitle: 'Ứng dụng Trí tuệ Nhân tạo Nhằm Giảm thiểu Rào cản Tín dụng cho Doanh nghiệp Nhỏ và Vừa (DNNVV) tại Việt Nam',
    subtitle: 'Nghiên cứu các rào cản tín dụng của DNNVV và đề xuất khung đánh giá rủi ro ứng dụng Machine Learning',
    tags: ['Tài chính', 'Machine Learning', 'Rủi ro Tín dụng', 'DNNVV'],
    paperUrl: '/papers/wico-research-paper.pdf',
    pdfUrl: '/papers/wico-research-paper.pdf',
    previewImage: '/papers/wico-page1.jpg',
    shortDescription: 'Nghiên cứu nguyên nhân tài chính gây rào cản tín dụng cho DNNVV và đề xuất khung đánh giá rủi ro tín dụng ứng dụng AI.',
    snapshot: [
      { value: '5', label: 'DNNVV phân tích' },
      { value: '2020–25', label: 'Dữ liệu tài chính' },
      { value: 'RF / XGB', label: 'Mô hình AI' },
      { value: 'WICO 2026', label: 'Báo cáo' }
    ],
    inlineMetrics: ['5 DNNVV Phân tích', 'Dữ liệu Tài chính 2020–2025', 'Logistic, RF & XGBoost', 'Rủi ro Vỡ nợ DNNVV'],
    equation: 'P(\\text{Default}_i) = \\sigma\\big(\\mathbf{w}^T \\mathbf{x}_i^{\\text{financial}} + \\mathbf{\\theta}^T \\mathbf{z}_i^{\\text{operational}}\\big)',
    equationNote: 'Kiến trúc Mô hình Rủi ro Máy học Học có Giám sát',
    publishedIn: 'Đề tài Nghiên cứu · Thuyết trình tại WICO 2026',
    overview: 'Nghiên cứu các yếu tố tài chính gây nên rào cản tín dụng đối với doanh nghiệp nhỏ và vừa tại Việt Nam và đề xuất khung đánh giá rủi ro tín dụng ứng dụng AI. Đề tài mô hình hóa xác suất vỡ nợ của bên vay bằng cách kết hợp các chỉ số kế toán nhiều kỳ với các thuật toán máy học.',
    researchProblem: 'Hơn 97% doanh nghiệp tại Việt Nam là DNNVV, nhưng có tới 70% gặp rào cản tiếp cận vốn tín dụng. Mô hình cấp tín dụng truyền thống đòi hỏi 100–150% tài sản thế chấp cố định, gây bất lợi lớn cho các doanh nghiệp có năng lực kinh doanh tốt nhưng hạn chế về tài sản vật chất.',
    researchQuestions: [
      'Những tỷ số tài chính định lượng và yếu tố vận hành nào dự báo đáng tin cậy nhất về căng thẳng thanh khoản của DNNVV Việt Nam?',
      'Mô hình kết hợp phi tuyến (Random Forest & XGBoost) có cải thiện vượt trội độ chính xác chấm điểm tín dụng so với mô hình tuyến tính đơn biến?',
      'Làm thế nào để hệ thống chấm điểm tín dụng AI có tính giải thích cao giúp giảm bớt sự phụ thuộc vào tài sản thế chấp mà không làm tăng nợ xấu của ngân hàng?'
    ],
    detailSnapshot: [
      '5 DNNVV điển hình được phân tích',
      'Dữ liệu tài chính: 2020–2025',
      'Phương pháp: phân tích tỷ số, hồi quy logistic, Random Forest & XGBoost',
      'Trọng tâm: khả năng tiếp cận tín dụng và rủi ro mất khả năng thanh toán'
    ],
    dataSample: [
      '5 DNNVV tiêu biểu tại Việt Nam thuộc các ngành sản xuất, thương mại và logistics có báo cáo tài chính đã kiểm toán (2020–2025).',
      'Các chỉ số bảng cân đối kế toán và báo cáo kết quả kinh doanh nhiều năm: Khả năng thanh toán hiện hành, Khả năng thanh toán nhanh, Nợ/Vốn chủ sở hữu, Hệ số chi trả lãi vay (ICR), Dòng tiền hoạt động/Nợ và Vòng quay hàng tồn kho.'
    ],
    methodologyFlow: [
      'Trích xuất Chỉ số Tài chính',
      'Kỹ thuật & Lựa chọn Đặc trưng',
      'Mô hình Cơ sở Logistic',
      'Mô hình Ensemble RF & XGBoost',
      'Chỉ số Chấm điểm Rủi ro'
    ],
    keyFindingHeadline: 'Tốc độ luân chuyển dòng tiền và khả năng chi trả nợ ngắn hạn là các chỉ báo có độ chính xác cao hơn giá trị tài sản thế chấp cố định.',
    keyFindingDetail: 'Phân tích thực nghiệm chỉ ra rằng tốc độ dòng tiền hoạt động và hệ số chi trả lãi vay đưa ra cảnh báo sớm và tin cậy hơn về khả năng thanh toán so với định giá tài sản tĩnh. Mô hình máy học cho thấy độ nhạy cao hơn trong việc phát hiện dấu hiệu kiệt quệ sớm, đồng thời giảm tỷ lệ từ chối tín dụng không chính xác đối với các doanh nghiệp lành mạnh.',
    proposedAiModel: {
      headline: 'Mô hình Kết hợp Hai tầng Có giám sát (Random Forest + XGBoost với Phân bổ Đóng góp Đặc trưng)',
      description: 'Kiến trúc chấm điểm rủi ro dạng module tiếp nhận 18 đặc trưng tài chính và vận hành, chuẩn hóa phương sai qua các chu kỳ kinh doanh nhiều năm và tính toán xác suất vỡ nợ với ranh giới quyết định minh bạch.',
      highlights: [
        'So sánh đa thuật toán: Hồi quy Logistic cơ sở đối chiếu với Random Forest & XGBoost',
        'Xếp hạng tầm quan trọng đặc trưng ưu tiên dòng tiền hoạt động và hiệu quả vốn lưu động',
        'Được thiết kế để hỗ trợ thẩm định tín dụng mà không thay thế sự giám sát của con người'
      ]
    },
    myContribution: [
      'Chủ trì định hình bài toán nghiên cứu, tổng quan y văn về các rào cản tài chính của DNNVV tại các thị trường mới nổi và thiết kế toàn diện khung nghiên cứu.',
      'Trích xuất, làm sạch và chuẩn hóa dữ liệu báo cáo tài chính nhiều năm (2020–2025) từ 5 nghiên cứu tình huống DNNVV Việt Nam.',
      'Thực hiện đối chuẩn tỷ số tài chính và phối hợp xây dựng quy trình lựa chọn đặc trưng và đánh giá mô hình.',
      'Đồng tác giả báo cáo nghiên cứu học thuật và chuẩn bị tài liệu thuyết trình kỹ thuật trình bày trước hội đồng giám khảo quốc tế tại WICO 2026.'
    ],
    researchMaterials: [
      {
        title: 'Báo cáo Nghiên cứu Toàn văn & Khung Mô hình (PDF)',
        subtitle: 'Toàn văn bài nghiên cứu thực nghiệm: AI & Đánh giá Rủi ro Tín dụng DNNVV tại Việt Nam',
        type: 'report',
        url: '/papers/wico-research-paper.pdf',
        actionLabel: 'Đọc Báo cáo Nghiên cứu ↗'
      },
      {
        title: 'Hồ sơ Nghiên cứu & Giải thưởng WICO 2026',
        subtitle: 'Tài liệu thuyết trình, poster nghiên cứu & xác nhận giải thưởng chính thức',
        type: 'report',
        url: '/certificates/wico-2026.pdf',
        actionLabel: 'Xem Chứng nhận & Poster ↗'
      }
    ],
    crossReference: {
      label: 'Xem Huy chương Vàng WICO',
      targetPage: 'honors',
      targetId: 'wico-2026'
    }
  }
];

export const getResearchPapers = (lang: Language = 'en') =>
  lang === 'vi' ? RESEARCH_PAPERS_VI : RESEARCH_PAPERS_EN;

export const RESEARCH_PAPERS = RESEARCH_PAPERS_EN;

export const LEADERSHIP_STORIES_EN: LeadershipStory[] = [
  {
    id: 'lead-01',
    roleTitle: 'Project Lead',
    organization: 'AI Credit Risk Research Delegation',
    period: '2026',
    metrics: ['Team of 6', 'Gold Medal', 'WICO 2026'],
    highlight: 'Coordinated cross-functional research milestones, supervised financial data aggregation, and spearheaded team presentation rehearsals for the international jury in Seoul.'
  },
  {
    id: 'lead-02',
    roleTitle: 'Charity Organizing Chairperson',
    organization: 'Peace Village - Thanh Xuan Volunteer Campaign',
    period: '2026',
    metrics: ['100% Goal Met', 'Fundraising', 'Community Impact'],
    highlight: 'Directed fundraising campaigns, coordinated logistics for Tet gift distribution, and organized cultural engagement activities supporting children with disabilities.'
  },
  {
    id: 'lead-03',
    roleTitle: 'Academic Mentor & Cohort Lead',
    organization: 'Ams Advisor Club · Hanoi-Amsterdam High School',
    period: '2025',
    metrics: ['3 Mentees', '100% Admitted', 'Specialized High School'],
    highlight: 'Designed tailored entrance examination study strategies, mentored Grade 9 students, and successfully guided all mentees into top specialized high schools in Hanoi.'
  }
];

export const LEADERSHIP_STORIES_VI: LeadershipStory[] = [
  {
    id: 'lead-01',
    roleTitle: 'Trưởng nhóm Đề tài Nghiên cứu',
    organization: 'Đoàn Nghiên cứu Đề tài AI & Rủi ro Tín dụng',
    period: '2026',
    metrics: ['Đội ngũ 6 thành viên', 'Huy chương Vàng', 'WICO 2026'],
    highlight: 'Điều phối các mốc tiến độ nghiên cứu liên chức năng, giám sát quá trình tổng hợp dữ liệu tài chính và chủ trì các buổi tập dượt thuyết trình trước hội đồng giám khảo quốc tế tại Seoul.'
  },
  {
    id: 'lead-02',
    roleTitle: 'Trưởng Ban Tổ chức Chương trình Thiện nguyện',
    organization: 'Chiến dịch Thiện nguyện Làng Hòa Bình - Thanh Xuân',
    period: '2026',
    metrics: ['Đạt 100% Mục tiêu', 'Gây quỹ thiện nguyện', 'Tác động Cộng đồng'],
    highlight: 'Chỉ đạo các chiến dịch gây quỹ, điều phối công tác hậu cần trao quà Tết và tổ chức các hoạt động giao lưu văn hóa hỗ trợ các em nhỏ khuyết tật vận động.'
  },
  {
    id: 'lead-03',
    roleTitle: 'Cố vấn Học tập & Trưởng nhóm Cố vấn',
    organization: 'CLB Ams Advisor · THPT Chuyên Hà Nội - Amsterdam',
    period: '2025',
    metrics: ['3 Học sinh cố vấn', '100% Trúng tuyển', 'Trường Chuyên'],
    highlight: 'Xây dựng chiến lược ôn luyện thi vào lớp 10 chuyên biệt, kèm cặp học sinh lớp 9 và hướng dẫn thành công 100% học sinh trúng tuyển vào các trường THPT chuyên hàng đầu tại Hà Nội.'
  }
];

export const getLeadershipStories = (lang: Language = 'en') =>
  lang === 'vi' ? LEADERSHIP_STORIES_VI : LEADERSHIP_STORIES_EN;

export const LEADERSHIP_STORIES = LEADERSHIP_STORIES_EN;

export const ACHIEVEMENTS_EN: AchievementItem[] = [
  {
    id: 'wico-2026',
    year: '2026',
    award: 'Gold Medal',
    competition: '15th World Invention Creativity Olympics (WICO)',
    level: 'national_international',
    categoryLabel: 'International',
    imageUrl: '/certificates/wico-2026.jpg',
    imageAspect: 'portrait',
    pdfUrl: '/certificates/wico-2026.pdf',
    aboutCompetition: 'WICO is an international invention and innovation competition held annually in Seoul, bringing together participants from around the world to present projects in science, technology, and entrepreneurship.',
    levelScope: 'International · Seoul, South Korea',
    datesLocation: 'July 16–18, 2026',
    result: 'Gold Medal · Best Presentation, Outstanding Creativity & Innovation',
    projectTopic: 'Reducing credit barriers for Vietnamese SMEs through an AI-powered financial risk assessment model.',
    websiteUrl: 'https://www.wicokorea.com/',
    teamMembers: [
      'Nguyen Tung Chi',
      'To Thanh Tung',
      'Nguyen Tran Mai Huong',
      'Tran Ngoc Anh',
      'Huynh Khanh Ngoc',
      'Nguyen Ngoc Dan Linh'
    ],
    galleryTitle: 'Moments from WICO',
    gallery: [
      {
        id: 'wico-photo-ceremony',
        url: '/gallery/wico/wico-photo-ceremony.jpg',
        caption: 'WICO 2026 Grand Award Ceremony on Stage',
        tag: 'Ceremony',
        aspect: 'landscape',
        description: 'Official stage honors and award presentation at the 15th World Invention Creativity Olympic in Seoul, South Korea.'
      },
      {
        id: 'wico-photo-stage-1',
        url: '/gallery/wico/wico-photo-stage-1.jpg',
        caption: 'Gold Medalists Presentation & Recognition',
        tag: 'Stage Honors',
        aspect: 'landscape',
        description: 'Conferral of the Gold Medal and Best Presentation honors on the international stage.'
      },
      {
        id: 'wico-photo-award-1',
        url: '/gallery/wico/wico-photo-award-1.jpg',
        caption: 'Gold Award & Official Plaque Presentation',
        tag: 'Official Award',
        aspect: 'landscape',
        description: 'Receiving the official 15th WICO Gold Medal, certificate, and commemorative trophy from the judging committee.'
      },
      {
        id: 'wico-photo-award-2',
        url: '/gallery/wico/wico-photo-award-2.jpg',
        caption: 'Commemorative Moment with Organizing Committee',
        tag: 'Award Moment',
        aspect: 'landscape',
        description: 'Celebratory moment with international delegates and the WICO executive committee in Seoul.'
      },
      {
        id: 'wico-photo-team',
        url: '/gallery/wico/wico-photo-team.jpg',
        caption: 'Team Delegation with Medals & Certificates',
        tag: 'Team Delegation',
        aspect: 'landscape',
        description: 'Vietnam research delegation celebrating the Gold Award and international honors in Seoul.'
      }
    ]
  },
  {
    id: 'city-chem-2025-2026',
    year: '2025–2026',
    award: 'City-level Second Prize',
    competition: 'Hanoi Chemistry Olympiad (High School)',
    level: 'city',
    categoryLabel: 'City-level',
    imageUrl: '/certificates/city-chem-2025-2026.jpg',
    pdfUrl: '/certificates/city-chem-2025-2026.pdf',
    aboutCompetition: 'Hanoi City High School Excellence Competition in Chemistry organized by the Hanoi Department of Education and Training.',
    levelScope: 'Hanoi City Olympiad · High School Division',
    result: 'City-level Second Prize — Chemistry',
    organizationDetails: 'Hanoi Department of Education and Training',
    datesLocation: 'Academic Year 2025–2026 · Hanoi, Vietnam'
  },
  {
    id: 'nco-2025-2026',
    year: '2025–2026',
    award: 'National Third Prize',
    competition: 'National Chemistry Olympiad',
    level: 'national_international',
    categoryLabel: 'National',
    imageUrl: '/certificates/national-chemistry-2025-2026.jpg',
    pdfUrl: '/certificates/national-chemistry-2025-2026.pdf',
    aboutCompetition: 'National Excellence Examination in Chemistry organized annually by the Ministry of Education and Training (MOET), gathering top gifted students from specialized high schools across Vietnam.',
    levelScope: 'National Olympiad · High School Division',
    result: 'National Third Prize — Chemistry',
    organizationDetails: 'Ministry of Education and Training, Vietnam',
    datesLocation: 'Academic Year 2025–2026 · Hanoi, Vietnam',
    galleryTitle: 'Moments from National Chemistry Olympiad',
    gallery: [
      {
        id: 'nco-photo-team-1',
        url: '/gallery/national-chem/national-chem-team-1.jpg',
        caption: 'Hanoi Chemistry National Team Delegation',
        tag: 'National Team',
        aspect: 'landscape',
        description: 'Hanoi–Amsterdam National Chemistry Team delegation at the National Olympiad 2025–2026.'
      },
      {
        id: 'nco-photo-team-2',
        url: '/gallery/national-chem/national-chem-team-2.jpg',
        caption: 'National Chemistry Team & Mentors',
        tag: 'Team & Mentors',
        aspect: 'landscape',
        description: 'Celebratory moment with supervising mentors and national team members participating in the Olympiad.'
      }
    ]
  },
  {
    id: 'veo-2026',
    year: '2026',
    award: 'National First Prize',
    competition: 'Vietnam Economics Olympiad (VEO)',
    level: 'national_international',
    categoryLabel: 'National',
    imageUrl: '/certificates/veo-2026.jpg',
    pdfUrl: '/certificates/veo-2026.pdf',
    aboutCompetition: 'The Vietnam Economics Olympiad (VEO) is the premier national competition in economics, finance, and business logic for gifted high school students in Vietnam, organized under the academic patronage of the Vietnam Institute of Educational Sciences (VNIES).',
    websiteUrl: 'https://veo.edu.vn/',
    levelScope: 'National Olympiad · High School Division',
    result: 'National First Prize — Decision No. 330/QD-VKHGDVN',
    projectTopic: 'High School Division Economics Olympiad — Advanced Economics, Quantitative Financial Modeling & Macroeconomic Policy Analysis',
    organizationDetails: 'Vietnam Institute of Educational Sciences (VNIES)',
    datesLocation: 'June 29, 2026 · Hanoi, Vietnam',
    additionalNotes: 'Conferred by the Director General of the Vietnam Institute of Educational Sciences via Decision 330/QD-VKHGDVN.'
  },
  {
    id: 'axgo-2026',
    year: '2026',
    award: 'Gold Medal',
    competition: 'AX Global Olympiad (AXGO)',
    level: 'national_international',
    categoryLabel: 'International',
    imageUrl: '/certificates/axgo-2026.jpg',
    pdfUrl: '/certificates/axgo-2026.pdf',
    aboutCompetition: 'AX Global Olympiad (AXGO) is an international multidisciplinary creativity and invention Olympiad celebrating breakthrough ideas and practical research applications globally.',
    websiteUrl: 'https://axgo.org/',
    levelScope: 'International Olympiad',
    result: 'Gold Medal & Certificate of Excellence',
    organizationDetails: 'AX Global Olympiad Organizing Committee',
    datesLocation: '2026',
    galleryTitle: 'Moments from AXGO',
    gallery: [
      {
        id: 'axgo-photo-4',
        url: '/gallery/axgo/axgo-photo-4.jpg',
        caption: 'AXGO International Competition & Research Presentation',
        tag: 'Competition Day',
        aspect: 'landscape',
        description: 'Presentation of research project and scientific creativity in the international division of AX Global Olympiad.'
      },
      {
        id: 'axgo-photo-5',
        url: '/gallery/axgo/axgo-photo-5.jpg',
        caption: 'Gold Medal Award Presentation & Honors',
        tag: 'Award Moment',
        aspect: 'landscape',
        description: 'Conferral of the Gold Medal and Certificate of Excellence at AX Global Olympiad 2026.'
      },
      {
        id: 'axgo-photo-6',
        url: '/gallery/axgo/axgo-photo-6.jpg',
        caption: 'International Delegates & Celebration',
        tag: 'International Honors',
        aspect: 'landscape',
        description: 'Celebratory moment with global participants, jury members, and innovation delegates.'
      }
    ]
  },
  {
    id: 'city-chem-2023-2024',
    year: '2023–2024',
    award: 'City-level Second Prize',
    competition: 'Chemistry Olympiad (Grade 9)',
    level: 'city',
    categoryLabel: 'City-level',
    imageUrl: '/certificates/city-chem-2023-2024.jpg',
    pdfUrl: '/certificates/city-chem-2023-2024.pdf',
    aboutCompetition: 'Hanoi City Excellence Examination in Chemistry for Grade 9 students organized by the Hanoi Department of Education and Training.',
    levelScope: 'Hanoi City Olympiad · Secondary School Division (Grade 9)',
    result: 'City-level Second Prize — Chemistry',
    organizationDetails: 'Hanoi Department of Education and Training',
    datesLocation: 'Academic Year 2023–2024 · Hanoi, Vietnam'
  },
  {
    id: 'city-ns-2023-2024',
    year: '2023–2024',
    award: 'City-level First Prize',
    competition: 'Natural Sciences Olympiad (Grade 9)',
    level: 'city',
    categoryLabel: 'City-level',
    imageUrl: '/certificates/city-ns-2023-2024.jpg',
    pdfUrl: '/certificates/city-ns-2023-2024.pdf',
    aboutCompetition: 'Hanoi City Excellence Examination in Integrated Natural Sciences for Grade 9 students organized by the Hanoi Department of Education and Training.',
    levelScope: 'Hanoi City Olympiad · Secondary School Division (Grade 9)',
    result: 'City-level First Prize — Natural Sciences',
    organizationDetails: 'Hanoi Department of Education and Training',
    datesLocation: 'Academic Year 2023–2024 · Hanoi, Vietnam'
  }
];

export const ACHIEVEMENTS_VI: AchievementItem[] = [
  {
    id: 'wico-2026',
    year: '2026',
    award: 'Huy chương Vàng',
    competition: 'Olympic Sáng chế & Sáng tạo Thế giới lần thứ 15 (WICO)',
    level: 'national_international',
    categoryLabel: 'Quốc tế',
    imageUrl: '/certificates/wico-2026.jpg',
    imageAspect: 'portrait',
    pdfUrl: '/certificates/wico-2026.pdf',
    aboutCompetition: 'WICO là cuộc thi sáng chế và đổi mới sáng tạo quốc tế được tổ chức thường niên tại Seoul, quy tụ các nhà sáng tạo trẻ toàn cầu trình bày các dự án khoa học, công nghệ và khởi nghiệp.',
    levelScope: 'Quốc tế · Seoul, Hàn Quốc',
    datesLocation: '16–18 Tháng 7, 2026',
    result: 'Huy chương Vàng · Giải Thuyết trình xuất sắc & Sáng tạo nổi bật',
    projectTopic: 'Giảm thiểu rào cản tín dụng cho các doanh nghiệp vừa và nhỏ tại Việt Nam thông qua mô hình đánh giá rủi ro tài chính ứng dụng Trí tuệ nhân tạo (AI).',
    websiteUrl: 'https://www.wicokorea.com/',
    teamMembers: [
      'Nguyễn Tùng Chi',
      'Tô Thanh Tùng',
      'Nguyễn Trần Mai Hương',
      'Trần Ngọc Ánh',
      'Huỳnh Khánh Ngọc',
      'Nguyễn Ngọc Đan Linh'
    ],
    galleryTitle: 'Hình ảnh tiêu biểu từ WICO',
    gallery: [
      {
        id: 'wico-photo-ceremony',
        url: '/gallery/wico/wico-photo-ceremony.jpg',
        caption: 'Lễ Trao giải WICO 2026 trên Sân khấu Lớn',
        tag: 'Lễ Trao giải',
        aspect: 'landscape',
        description: 'Vinh danh chính thức và nhận giải thưởng trên sân khấu Olympic Sáng chế Sáng tạo Thế giới lần thứ 15 tại Seoul, Hàn Quốc.'
      },
      {
        id: 'wico-photo-stage-1',
        url: '/gallery/wico/wico-photo-stage-1.jpg',
        caption: 'Thuyết trình & Vinh danh Huy chương Vàng',
        tag: 'Vinh danh Sân khấu',
        aspect: 'landscape',
        description: 'Khoảnh khắc trao tặng Huy chương Vàng và giải Thuyết trình xuất sắc trên đấu trường quốc tế.'
      },
      {
        id: 'wico-photo-award-1',
        url: '/gallery/wico/wico-photo-award-1.jpg',
        caption: 'Nhận Kỷ niệm chương & Giấy chứng nhận Chính thức',
        tag: 'Giải thưởng Chính thức',
        aspect: 'landscape',
        description: 'Nhận Huy chương Vàng, chứng nhận danh dự và kỷ niệm chương từ ban giám khảo WICO lần thứ 15.'
      },
      {
        id: 'wico-photo-award-2',
        url: '/gallery/wico/wico-photo-award-2.jpg',
        caption: 'Khoảnh khắc Kỷ niệm cùng Ban Tổ chức',
        tag: 'Lưu niệm Ban Tổ chức',
        aspect: 'landscape',
        description: 'Khoảnh khắc chúc mừng cùng các đại biểu quốc tế và ban điều hành WICO tại Seoul.'
      },
      {
        id: 'wico-photo-team',
        url: '/gallery/wico/wico-photo-team.jpg',
        caption: 'Đoàn Nghiên cứu cùng Huy chương & Bằng khen',
        tag: 'Đoàn Đội tuyển',
        aspect: 'landscape',
        description: 'Đoàn nghiên cứu Việt Nam kỷ niệm thành tích Huy chương Vàng và giải thưởng quốc tế tại Seoul.'
      }
    ]
  },
  {
    id: 'city-chem-2025-2026',
    year: '2025–2026',
    award: 'Giải Nhì Thành phố',
    competition: 'Kỳ thi Học sinh giỏi Thành phố môn Hóa học THPT',
    level: 'city',
    categoryLabel: 'Thành phố',
    imageUrl: '/certificates/city-chem-2025-2026.jpg',
    pdfUrl: '/certificates/city-chem-2025-2026.pdf',
    aboutCompetition: 'Kỳ thi chọn Học sinh giỏi Thành phố Hà Nội môn Hóa học cấp THPT do Sở Giáo dục và Đào tạo Hà Nội tổ chức.',
    levelScope: 'HSG Thành phố Hà Nội · Cấp THPT',
    result: 'Giải Nhì Học sinh giỏi Thành phố — Môn Hóa học',
    organizationDetails: 'Sở Giáo dục và Đào tạo Thành phố Hà Nội',
    datesLocation: 'Năm học 2025 – 2026 · Hà Nội, Việt Nam'
  },
  {
    id: 'nco-2025-2026',
    year: '2025–2026',
    award: 'Giải Ba Quốc gia',
    competition: 'Kỳ thi chọn Học sinh giỏi Quốc gia môn Hóa học',
    level: 'national_international',
    categoryLabel: 'Quốc gia',
    imageUrl: '/certificates/national-chemistry-2025-2026.jpg',
    pdfUrl: '/certificates/national-chemistry-2025-2026.pdf',
    aboutCompetition: 'Kỳ thi chọn Học sinh giỏi Quốc gia môn Hóa học do Bộ Giáo dục và Đào tạo tổ chức hàng năm, quy tụ những học sinh xuất sắc nhất từ các trường chuyên trên cả nước.',
    levelScope: 'Kỳ thi Chọn HSG Quốc Gia Cấp THPT',
    result: 'Giải Ba Quốc gia — Môn Hóa học',
    organizationDetails: 'Bộ Giáo dục và Đào tạo Việt Nam',
    datesLocation: 'Năm học 2025 – 2026 · Hà Nội, Việt Nam',
    galleryTitle: 'Hình ảnh từ Kỳ thi HSG Quốc gia môn Hóa học',
    gallery: [
      {
        id: 'nco-photo-team-1',
        url: '/gallery/national-chem/national-chem-team-1.jpg',
        caption: 'Đội tuyển Học sinh giỏi Quốc gia môn Hóa học Hà Nội',
        tag: 'Đội tuyển HSG QG',
        aspect: 'landscape',
        description: 'Đội tuyển Học sinh giỏi Quốc gia môn Hóa học Hà Nội – Amsterdam tại kỳ thi HSG Quốc gia năm học 2025–2026.'
      },
      {
        id: 'nco-photo-team-2',
        url: '/gallery/national-chem/national-chem-team-2.jpg',
        caption: 'Đội tuyển Hóa học & Thầy cô Hướng dẫn',
        tag: 'Đội tuyển & Thầy cô',
        aspect: 'landscape',
        description: 'Khoảnh khắc kỷ niệm cùng thầy cô hướng dẫn và các thành viên đội tuyển Hóa học tham dự kỳ thi cấp Quốc gia.'
      }
    ]
  },
  {
    id: 'veo-2026',
    year: '2026',
    award: 'Giải Nhất Toàn quốc',
    competition: 'Olympic Kinh tế Việt Nam (VEO)',
    level: 'national_international',
    categoryLabel: 'Quốc gia',
    imageUrl: '/certificates/veo-2026.jpg',
    pdfUrl: '/certificates/veo-2026.pdf',
    aboutCompetition: 'Olympic Kinh tế Việt Nam (VEO) là cuộc thi quốc gia hàng đầu về kinh tế, tài chính và tư duy kinh doanh dành cho học sinh THPT chuyên, được tổ chức dưới sự bảo trợ học thuật của Viện Khoa học Giáo dục Việt Nam (VNIES).',
    websiteUrl: 'https://veo.edu.vn/',
    levelScope: 'Olympic Quốc gia · Bảng thi Cấp THPT',
    result: 'Giải Nhất Toàn quốc — Quyết định số 330/QĐ-VKHGDVN',
    projectTopic: 'Bảng thi THPT — Kinh tế học nâng cao, Mô hình hóa tài chính định lượng & Phân tích chính sách kinh tế vĩ mô',
    organizationDetails: 'Viện Khoa học Giáo dục Việt Nam (VNIES) · Viện trưởng: PGS. TS. Lê Anh Vinh',
    datesLocation: '29 Tháng 6, 2026 · Hà Nội, Việt Nam',
    additionalNotes: 'Trao thưởng theo Quyết định số 330/QĐ-VKHGDVN của Viện trưởng Viện Khoa học Giáo dục Việt Nam.'
  },
  {
    id: 'axgo-2026',
    year: '2026',
    award: 'Huy chương Vàng',
    competition: 'Olympic Toàn cầu AX (AXGO)',
    level: 'national_international',
    categoryLabel: 'Quốc tế',
    imageUrl: '/certificates/axgo-2026.jpg',
    pdfUrl: '/certificates/axgo-2026.pdf',
    aboutCompetition: 'AX Global Olympiad (AXGO) là kỳ thi Olympic quốc tế đa ngành tôn vinh các ý tưởng sáng tạo đột phá và ứng dụng nghiên cứu thực tiễn trên toàn cầu.',
    websiteUrl: 'https://axgo.org/',
    levelScope: 'Olympic Quốc tế',
    result: 'Huy chương Vàng & Chứng nhận Xuất sắc',
    organizationDetails: 'Ban Tổ chức AX Global Olympiad',
    datesLocation: '2026',
    galleryTitle: 'Hình ảnh tiêu biểu từ AXGO',
    gallery: [
      {
        id: 'axgo-photo-4',
        url: '/gallery/axgo/axgo-photo-4.jpg',
        caption: 'Báo cáo Đề tài Nghiên cứu tại AXGO Quốc tế',
        tag: 'Ngày Thuyết trình',
        aspect: 'landscape',
        description: 'Trình bày đề tài nghiên cứu khoa học và giải pháp sáng tạo tại bảng thi quốc tế AX Global Olympiad.'
      },
      {
        id: 'axgo-photo-5',
        url: '/gallery/axgo/axgo-photo-5.jpg',
        caption: 'Lễ Trao thưởng & Vinh danh Huy chương Vàng',
        tag: 'Trao thưởng',
        aspect: 'landscape',
        description: 'Vinh danh nhận Huy chương Vàng và Chứng nhận Xuất sắc tại AX Global Olympiad 2026.'
      },
      {
        id: 'axgo-photo-6',
        url: '/gallery/axgo/axgo-photo-6.jpg',
        caption: 'Đại biểu Quốc tế & Khoảnh khắc Vinh danh',
        tag: 'Vinh danh Quốc tế',
        aspect: 'landscape',
        description: 'Khoảnh khắc chúc mừng cùng các thí sinh quốc tế, ban giám khảo và các chuyên gia sáng tạo.'
      }
    ]
  },
  {
    id: 'city-chem-2023-2024',
    year: '2023–2024',
    award: 'Giải Nhì Thành phố',
    competition: 'Kỳ thi Học sinh giỏi Thành phố môn Hóa học (Lớp 9)',
    level: 'city',
    categoryLabel: 'Thành phố',
    imageUrl: '/certificates/city-chem-2023-2024.jpg',
    pdfUrl: '/certificates/city-chem-2023-2024.pdf',
    aboutCompetition: 'Kỳ thi Học sinh giỏi Thành phố Hà Nội môn Hóa học lớp 9 THCS do Sở Giáo dục và Đào tạo Hà Nội tổ chức.',
    levelScope: 'HSG Thành phố Hà Nội · Cấp THCS (Lớp 9)',
    result: 'Giải Nhì Học sinh giỏi Thành phố — Môn Hóa học',
    organizationDetails: 'Sở Giáo dục và Đào tạo Thành phố Hà Nội',
    datesLocation: 'Năm học 2023 – 2024 · Hà Nội, Việt Nam'
  },
  {
    id: 'city-ns-2023-2024',
    year: '2023–2024',
    award: 'Giải Nhất Thành phố',
    competition: 'Kỳ thi Học sinh giỏi Thành phố môn Khoa học tự nhiên (Lớp 9)',
    level: 'city',
    categoryLabel: 'Thành phố',
    imageUrl: '/certificates/city-ns-2023-2024.jpg',
    pdfUrl: '/certificates/city-ns-2023-2024.pdf',
    aboutCompetition: 'Kỳ thi Học sinh giỏi Thành phố Hà Nội các môn Khoa học tự nhiên lớp 9 THCS do Sở Giáo dục và Đào tạo Hà Nội tổ chức.',
    levelScope: 'HSG Thành phố Hà Nội · Cấp THCS (Lớp 9)',
    result: 'Giải Nhất Học sinh giỏi Thành phố — Môn Khoa học tự nhiên',
    organizationDetails: 'Sở Giáo dục và Đào tạo Thành phố Hà Nội',
    datesLocation: 'Năm học 2023 – 2024 · Hà Nội, Việt Nam'
  }
];

export const getAchievements = (lang: Language = 'en') =>
  lang === 'vi' ? ACHIEVEMENTS_VI : ACHIEVEMENTS_EN;

export const getHonorsAndAwards = getAchievements;

export const ACHIEVEMENTS = ACHIEVEMENTS_EN;
export const HONORS_AND_AWARDS = ACHIEVEMENTS;

export const ACTIVITIES_EN: ActivityItem[] = [
  {
    id: 'act-01',
    title: 'Administration Intern – GTEL',
    role: 'Business Data Analyst Intern (Financial Planning)',
    organization: 'Global Technology - Telecommunication Corporation (GTEL)',
    period: 'June 2026 – August 2026',
    category: 'Internship & Industry',
    categoryGroup: 'featured',
    tags: ['Financial Planning', 'Data Analytics', 'SQL & Power BI', 'Telecommunications'],
    description: 'Completed a 2-month internship as a Business Data Analyst in the Financial Planning department of a telecommunications company, analyzing revenue, cost, and operational data using Excel, SQL, Power BI, and Tableau. This experience strengthened my technical and analytical skills while deepening my understanding of data-driven financial decision-making.',
    heroImage: '',
    heroCaption: 'GTEL Headquarters & Financial Planning Department',
    supportingImage: '',
    supportingCaption: 'Data Analytics & Operational Reporting Workspace',
    gallery: []
  },
  {
    id: 'act-02',
    title: 'Volunteering in Peace Village - Thanh Xuan',
    role: 'Chairperson',
    organization: 'Peace Village - Thanh Xuan',
    period: 'February 2026',
    category: 'Community Leadership',
    categoryGroup: 'featured',
    tags: ['Community Service', 'Charity Leadership', 'Event Planning', 'Youth Support'],
    description: 'Led a team organizing a charity initiative at Hoa Binh Thanh Xuan Village, coordinating fundraising efforts and a Tet gift-giving event for children with mobility impairments. Organized cultural exchange activities to foster connection, strengthening my leadership, empathy, and event-planning skills while deepening my commitment to community service.',
    heroImage: '/gallery/peace-village/peace-village-2.jpg',
    heroCaption: 'Community Interaction & Cultural Exchange at Hoa Binh Thanh Xuan Village',
    supportingImage: '/gallery/peace-village/peace-village-1.jpg',
    supportingCaption: 'Tet Charity & Gift-Giving Event at Hoa Binh Thanh Xuan Village',
    documentUrl: '/documents/tu-thien-lang-hoa-binh-thanh-xuan.pdf',
    documentTitle: 'Official Certificate & Charity Report - Peace Village Thanh Xuan (PDF)',
    gallery: [
      {
        id: 'peace-village-g2',
        url: '/gallery/peace-village/peace-village-2.jpg',
        caption: 'Community Interaction & Cultural Exchange',
        tag: 'Cultural Exchange',
        aspect: 'landscape',
        description: 'Interactive cultural exchange and warm engagement with children at Peace Village Thanh Xuan.'
      },
      {
        id: 'peace-village-g1',
        url: '/gallery/peace-village/peace-village-1.jpg',
        caption: 'Tet Charity Initiative at Hoa Binh Thanh Xuan Village',
        tag: 'Community Service',
        aspect: 'portrait',
        description: 'Presenting meaningful Tet gifts and sharing joyful moments with children at Peace Village.'
      },
      {
        id: 'peace-village-g3',
        url: '/gallery/peace-village/peace-village-3.jpg',
        caption: 'Volunteer Team Coordination & Preparation',
        tag: 'Coordination',
        aspect: 'landscape',
        description: 'Organizing committee preparing gift packages and coordinating logistics prior to the event.'
      },
      {
        id: 'peace-village-g4',
        url: '/gallery/peace-village/peace-village-4.jpg',
        caption: 'Gift-giving & Warm Moments with Children',
        tag: 'Gift Giving',
        aspect: 'landscape',
        description: 'Delivering warm gifts and sincere New Year wishes directly to disadvantaged children.'
      },
      {
        id: 'peace-village-g5',
        url: '/gallery/peace-village/peace-village-5.jpg',
        caption: 'Memorable Group Photo & Celebration',
        tag: 'Group Memorial',
        aspect: 'landscape',
        description: 'Commemorative group photo with volunteer delegates, teachers, and children at Peace Village.'
      }
    ]
  }
];

export const ACTIVITIES_VI: ActivityItem[] = [
  {
    id: 'act-01',
    title: 'Thực tập sinh Quản trị & Phân tích Dữ liệu – GTEL',
    role: 'Thực tập sinh Phân tích Dữ liệu Kinh doanh (Kế hoạch Tài chính)',
    organization: 'Tổng công ty Công nghệ - Viễn thông Toàn cầu (GTEL)',
    period: '06/2026 – 08/2026',
    category: 'Thực tập & Doanh nghiệp',
    categoryGroup: 'featured',
    tags: ['Kế hoạch Tài chính', 'Phân tích Dữ liệu', 'SQL & Power BI', 'Viễn thông'],
    description: 'Hoàn thành kỳ thực tập 2 tháng với vai trò Chuyên viên Phân tích Dữ liệu Kinh doanh tại phòng Kế hoạch Tài chính của doanh nghiệp viễn thông, xử lý dữ liệu doanh thu, chi phí và vận hành bằng Excel, SQL, Power BI và Tableau. Kỳ thực tập củng cố kỹ năng phân tích định lượng và hiểu biết sâu sắc về ra quyết định tài chính dựa trên dữ liệu.',
    heroImage: '',
    heroCaption: 'Trụ sở GTEL & Phòng Kế hoạch Tài chính',
    supportingImage: '',
    supportingCaption: 'Không gian làm việc & Báo cáo Dữ liệu Tài chính',
    gallery: []
  },
  {
    id: 'act-02',
    title: 'Hoạt động Thiện nguyện tại Làng Hòa Bình - Thanh Xuân',
    role: 'Trưởng Ban Tổ chức',
    organization: 'Làng Hòa Bình - Thanh Xuân',
    period: '02/2026',
    category: 'Lãnh đạo Cộng đồng',
    categoryGroup: 'featured',
    tags: ['Cống hiến Xã hội', 'Trưởng Ban Thiện nguyện', 'Tổ chức Sự kiện', 'Hỗ trợ Trẻ em'],
    description: 'Chủ trì tổ chức chương trình thiện nguyện tại Làng Hòa Bình Thanh Xuân, điều phối gây quỹ và trao quà Tết cho các em nhỏ khuyết tật vận động. Tổ chức các hoạt động giao lưu văn hóa nghệ thuật, bồi dưỡng năng lực lãnh đạo, sự đồng cảm và trách nhiệm phụng sự cộng đồng.',
    heroImage: '/gallery/peace-village/peace-village-2.jpg',
    heroCaption: 'Giao lưu văn hóa nghệ thuật và động viên các em nhỏ tại Làng Hòa Bình Thanh Xuân',
    supportingImage: '/gallery/peace-village/peace-village-1.jpg',
    supportingCaption: 'Trao quà Tết và chương trình thiện nguyện tại Làng Hòa Bình Thanh Xuân',
    documentUrl: '/documents/tu-thien-lang-hoa-binh-thanh-xuan.pdf',
    documentTitle: 'Báo cáo & Giấy xác nhận thiện nguyện Làng Hòa Bình Thanh Xuân (PDF)',
    gallery: [
      {
        id: 'peace-village-g2',
        url: '/gallery/peace-village/peace-village-2.jpg',
        caption: 'Giao lưu & Tương tác Cộng đồng',
        tag: 'Giao lưu Văn hóa',
        aspect: 'landscape',
        description: 'Hoạt động giao lưu, động viên và gắn kết cùng các em nhỏ tại Làng Hòa Bình Thanh Xuân.'
      },
      {
        id: 'peace-village-g1',
        url: '/gallery/peace-village/peace-village-1.jpg',
        caption: 'Chương trình Thiện nguyện Trao quà Tết',
        tag: 'Thiện nguyện',
        aspect: 'portrait',
        description: 'Khoảnh khắc trao quà Tết và hoạt động thiện nguyện cùng các em nhỏ tại Làng Hòa Bình Thanh Xuân.'
      },
      {
        id: 'peace-village-g3',
        url: '/gallery/peace-village/peace-village-3.jpg',
        caption: 'Điều phối & Chuẩn bị Quà tặng Ban Tổ chức',
        tag: 'Hậu cần & Điều phối',
        aspect: 'landscape',
        description: 'Công tác chuẩn bị quà tặng và điều phối hoạt động của ban tổ chức trước giờ giao lưu.'
      },
      {
        id: 'peace-village-g4',
        url: '/gallery/peace-village/peace-village-4.jpg',
        caption: 'Khoảnh khắc Trao Quà Ấm áp tới Các Em Nhỏ',
        tag: 'Trao quà',
        aspect: 'landscape',
        description: 'Tận tay trao những phần quà ý nghĩa và gửi lời chúc Tết ấm áp đến các em nhỏ có hoàn cảnh khó khăn.'
      },
      {
        id: 'peace-village-g5',
        url: '/gallery/peace-village/peace-village-5.jpg',
        caption: 'Ảnh Kỷ niệm Tập thể đầy Ý nghĩa',
        tag: 'Ảnh Lưu niệm',
        aspect: 'landscape',
        description: 'Khoảnh khắc kỷ niệm đầy ý nghĩa giữa đoàn tình nguyện viên và các thầy cô, em nhỏ tại Làng Hòa Bình.'
      }
    ]
  }
];

export const getActivities = (lang: Language = 'en') =>
  lang === 'vi' ? ACTIVITIES_VI : ACTIVITIES_EN;

export const ACTIVITIES = ACTIVITIES_EN;

export const SECONDARY_ACTIVITIES_EN: ActivityItem[] = [
  {
    id: 'sec-act-01',
    title: 'Advisor–Advisee',
    role: 'Mentor',
    organization: 'Ams Advisor Club — Hanoi–Amsterdam High School for the Gifted',
    period: 'Feb 2025 – Jul 2025',
    category: 'Mentoring & Academic Coaching',
    categoryGroup: 'mentoring',
    tags: ['Academic Mentorship', 'Specialized High School', 'Exam Strategy'],
    description: 'Mentored three students through high-school entrance exam preparation, helping them develop study strategies and successfully gain admission to specialized high schools in Hanoi.',
    heroImage: '',
    heroCaption: 'Ams Advisor Mentoring Session & Study Cohort',
    gallery: []
  },
  {
    id: 'sec-act-02',
    title: 'WITH Project Season V — Phase 2',
    role: 'Mentor',
    organization: 'HOLA Academy',
    period: 'Jan 2025 – Jul 2025',
    category: 'Educational Development',
    categoryGroup: 'mentoring',
    tags: ['Curriculum Design', 'Exam Prep', 'Student Support'],
    description: 'Mentored students preparing for high-school entrance exams, developed study materials, and supported the organization of educational activities.',
    heroImage: '',
    heroCaption: 'HOLA Academy WITH Project Educational Workshop',
    gallery: []
  },
  {
    id: 'sec-act-03',
    title: 'Volunteering at Bach Mai Hospital',
    role: 'Volunteer',
    organization: 'Bach Mai Hospital',
    period: 'Apr 2026',
    category: 'Community Healthcare Support',
    categoryGroup: 'volunteering',
    tags: ['Patient Support', 'Community Service', 'Fundraising'],
    description: 'Supported a fundraising initiative for families facing financial difficulties related to medical treatment.',
    heroImage: '',
    heroCaption: 'Bach Mai Hospital Community Support Initiative',
    gallery: []
  },
  {
    id: 'sec-act-04',
    title: 'Volunteering at SOS Children’s Village Hai Phong',
    role: 'Volunteer',
    organization: 'SOS Children’s Village Hai Phong',
    period: 'Jun 2026',
    category: 'Child Welfare & Social Action',
    categoryGroup: 'volunteering',
    tags: ['Child Welfare', 'Community Initiative', 'Youth Engagement'],
    description: 'Participated in a community fundraising initiative supporting underprivileged children and contributing to their welfare.',
    heroImage: '',
    heroCaption: 'SOS Children’s Village Community Engagement',
    gallery: []
  }
];

export const SECONDARY_ACTIVITIES_VI: ActivityItem[] = [
  {
    id: 'sec-act-01',
    title: 'Dự án Cố vấn Học tập Advisor–Advisee',
    role: 'Cố vấn Học tập (Mentor)',
    organization: 'CLB Ams Advisor — Trường THPT Chuyên Hà Nội – Amsterdam',
    period: '02/2025 – 07/2025',
    category: 'Cố vấn & Huấn luyện Học thuật',
    categoryGroup: 'mentoring',
    tags: ['Cố vấn Học thuật', 'THPT Chuyên', 'Chiến lược Thi cử'],
    description: 'Kèm cặp và hướng dẫn trực tiếp 3 học sinh lớp 9 trong quá trình ôn thi vào lớp 10 chuyên, hỗ trợ xây dựng lộ trình học tập và giúp 100% học sinh trúng tuyển vào các trường THPT chuyên tại Hà Nội.',
    heroImage: '',
    heroCaption: 'Buổi Cố vấn Học tập & Kèm cặp Học sinh CLB Ams Advisor',
    gallery: []
  },
  {
    id: 'sec-act-02',
    title: 'Dự án Giáo dục WITH Season V — Giai đoạn 2',
    role: 'Cố vấn Học thuật',
    organization: 'Học viện HOLA Academy',
    period: '01/2025 – 07/2025',
    category: 'Phát triển Giáo dục',
    categoryGroup: 'mentoring',
    tags: ['Biên soạn Tài liệu', 'Luyện thi Chuyên', 'Hỗ trợ Học sinh'],
    description: 'Đồng hành cố vấn cho các học sinh chuẩn bị bước vào kỳ thi tuyển sinh THPT, tham gia xây dựng ngân hàng đề và tài liệu học tập, hỗ trợ tổ chức các hoạt động giáo dục định hướng.',
    heroImage: '',
    heroCaption: 'Hội thảo Học thuật & Phát triển Kỹ năng Dự án WITH',
    gallery: []
  },
  {
    id: 'sec-act-03',
    title: 'Hoạt động Tình nguyện tại Bệnh viện Bạch Mai',
    role: 'Tình nguyện viên',
    organization: 'Bệnh viện Bạch Mai',
    period: '04/2026',
    category: 'Hỗ trợ Y tế & Cộng đồng',
    categoryGroup: 'volunteering',
    tags: ['Hỗ trợ Bệnh nhân', 'Hoạt động Xã hội', 'Gây quỹ Viện phí'],
    description: 'Tham gia hỗ trợ sáng kiến gây quỹ và chia sẻ cùng các gia đình bệnh nhân có hoàn cảnh khó khăn đang điều trị tại bệnh viện.',
    heroImage: '',
    heroCaption: 'Chương trình Hỗ trợ Bệnh nhân Bệnh viện Bạch Mai',
    gallery: []
  },
  {
    id: 'sec-act-04',
    title: 'Hoạt động Tình nguyện tại Làng Trẻ em SOS Hải Phòng',
    role: 'Tình nguyện viên',
    organization: 'Làng Trẻ em SOS Hải Phòng',
    period: '06/2026',
    category: 'Bảo trợ Trẻ em & Hành động Xã hội',
    categoryGroup: 'volunteering',
    tags: ['Phúc lợi Trẻ em', 'Sáng kiến Xã hội', 'Gắn kết Thanh thiếu niên'],
    description: 'Tham gia sáng kiến gây quỹ cộng đồng nhằm hỗ trợ chăm sóc các trẻ em có hoàn cảnh khó khăn và đóng góp vào các chương trình phúc lợi của làng trẻ.',
    heroImage: '',
    heroCaption: 'Hoạt động Gắn kết & Thiện nguyện Làng Trẻ em SOS',
    gallery: []
  }
];

export const getSecondaryActivities = (lang: Language = 'en') =>
  lang === 'vi' ? SECONDARY_ACTIVITIES_VI : SECONDARY_ACTIVITIES_EN;

export const SECONDARY_ACTIVITIES = SECONDARY_ACTIVITIES_EN;

export const INTERESTS_EN: InterestItem[] = [
  {
    id: 'int-01',
    number: '01',
    category: 'MUSIC',
    title: 'Piano, Guitar & Music',
    quote: 'A space for focus, expression, and learning something slowly.',
    description: 'A space for focus, expression, and learning something slowly.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true
  },
  {
    id: 'int-02',
    number: '02',
    category: 'READING',
    title: 'Long-form Reading',
    quote: 'Economics, science, psychology, and the occasional novel.',
    description: 'Economics, science, psychology, and the occasional novel.'
  },
  {
    id: 'int-03',
    number: '03',
    category: 'VISUAL',
    title: 'Drawing & Editorial Design',
    quote: 'Illustration, typography, composition, and visual storytelling.',
    description: 'Illustration, typography, composition, and visual storytelling.'
  },
  {
    id: 'int-04',
    number: '04',
    category: 'CURIOSITY',
    title: 'Markets & Quantitative Thinking',
    quote: 'Patterns, incentives, and the stories hidden behind numbers.',
    description: 'Patterns, incentives, and the stories hidden behind numbers.'
  }
];

export const INTERESTS_VI: InterestItem[] = [
  {
    id: 'int-01',
    number: '01',
    category: 'ÂM NHẠC',
    title: 'Piano, Guitar & Âm nhạc',
    quote: 'Không gian của sự tập trung, biểu đạt cảm xúc và học hỏi một cách chậm rãi.',
    description: 'Không gian của sự tập trung, biểu đạt cảm xúc và học hỏi một cách chậm rãi.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true
  },
  {
    id: 'int-02',
    number: '02',
    category: 'ĐỌC SÁCH',
    title: 'Đọc sách Chuyên sâu',
    quote: 'Kinh tế học, khoa học, tâm lý học và những cuốn tiểu thuyết chọn lọc.',
    description: 'Kinh tế học, khoa học, tâm lý học và những cuốn tiểu thuyết chọn lọc.'
  },
  {
    id: 'int-03',
    number: '03',
    category: 'THỊ GIÁC & THIẾT KẾ',
    title: 'Hội họa & Thiết kế Ấn bản',
    quote: 'Minh họa, nghệ thuật sắp đặt chữ, bố cục và kể chuyện bằng thị giác.',
    description: 'Minh họa, nghệ thuật sắp đặt chữ, bố cục và kể chuyện bằng thị giác.'
  },
  {
    id: 'int-04',
    number: '04',
    category: 'TƯ DUY & KHÁM PHÁ',
    title: 'Thị trường & Tư duy Định lượng',
    quote: 'Những quy luật, động lực kinh tế và câu chuyện ẩn sau các con số.',
    description: 'Những quy luật, động lực kinh tế và câu chuyện ẩn sau các con số.'
  }
];

export const getInterests = (lang: Language = 'en') =>
  lang === 'vi' ? INTERESTS_VI : INTERESTS_EN;

export const INTERESTS = INTERESTS_EN;
