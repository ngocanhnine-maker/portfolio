import { Language } from '../context/LanguageContext';

export interface TranslationDictionary {
  nav: {
    about: string;
    honors: string;
    education: string;
    projects: string;
    research: string;
    leadership: string;
    activities: string;
    interests: string;
    resume: string;
    askAi: string;
    sections: string;
    portfolioSubtitle: string;
    introScreen: string;
    intro: string;
    active: string;
    email: string;
  };
  landing: {
    enter: string;
    portfolio: string;
    subtitle: string;
  };
  about: {
    sectionNum: string;
    name: string;
    title: string;
    introSubtitle: string;
    profileHeader: string;
    profileMeta: string;
    bioPlaceholder: string;
    nextSection: string;
  };
  honors: {
    sectionNum: string;
    title: string;
    subtitle: string;
    viewCertificate: string;
    viewProject: string;
    competitionScope: string;
    datesLocation: string;
    result: string;
    team: string;
    officialOrg: string;
    galleryTitle: string;
    allLevels: string;
    international: string;
    national: string;
    city: string;
    filterAll: string;
    filterNational: string;
    filterCity: string;
    archiveLabel: string;
    viewArchive: string;
    seeMore: string;
    enlarge: string;
    aboutComp: string;
    levelScope: string;
    resultLabel: string;
    projectLabel: string;
    teamMembers: string;
    closePanel: string;
    prevSection: string;
    nextSection: string;
  };
  education: {
    sectionNum: string;
    title: string;
    subtitle: string;
    institution: string;
    specialization: string;
    focus: string;
    location: string;
    period: string;
    academicPerformance: string;
    scale: string;
    standardizedTests: string;
    viewCert: string;
    credentialsPreview: string;
    gpaTitle: string;
    testsTitle: string;
    viewReport: string;
    downloadPdf: string;
    openFull: string;
    prevSection: string;
    nextSection: string;
  };
  projects: {
    sectionNum: string;
    title: string;
    subtitle: string;
    viewCaseStudy: string;
    viewCase: string;
    prevSection: string;
    nextSection: string;
    overview: string;
    solution: string;
    keyResults: string;
  };
  research: {
    sectionNum: string;
    title: string;
    subtitle: string;
    publishedPaper: string;
    researchProject: string;
    viewFullPaper: string;
    viewCertificate: string;
    featuredPub: string;
    publishedIn: string;
    leadAuthor: string;
    readFullPdf: string;
    viewResearch: string;
    prevSection: string;
    nextSection: string;
    problem: string;
    questions: string;
    methodology: string;
    scope: string;
    findings: string;
    viewAward: string;
    abstract: string;
    keyFindings: string;
    myContribution: string;
    researchQuestions: string;
    sampleData: string;
    modelArchitecture: string;
  };
  leadership: {
    sectionNum: string;
    title: string;
    subtitle: string;
    prevSection: string;
    nextSection: string;
  };
  activities: {
    sectionNum: string;
    title: string;
    subtitle: string;
    featuredSection: string;
    secondarySection: string;
    secondaryTitle: string;
    secondarySubtitle: string;
    mentoringRow: string;
    volunteeringRow: string;
    row1: string;
    row1Title: string;
    row2: string;
    row2Title: string;
    seeMore: string;
    collapse: string;
    collapseArchive: string;
    hideDetails: string;
    archiveGallery: string;
    archivePhotos: string;
    clickToExpand: string;
    downloadPdf: string;
    viewDownloadPdf: string;
    pdfAttached: string;
    photos: string;
    zoom: string;
    viewFull: string;
    keyImpacts: string;
    prevSection: string;
    nextSection: string;
  };
  interests: {
    sectionNum: string;
    title: string;
    subtitle: string;
    prevSection: string;
    viewResume: string;
    backToTop: string;
  };
  resume: {
    sectionNum: string;
    title: string;
    subtitle: string;
    downloadCv: string;
    copyEmail: string;
    copiedEmail: string;
    education: string;
    experience: string;
    honors: string;
    research: string;
    activities: string;
    skills: string;
    skillsMatrix: string;
    techDev: string;
    methodsData: string;
    languages: string;
  };
  askAi: {
    title: string;
    subtitle: string;
    heroTitle: string;
    badge: string;
    placeholder: string;
    followUpPlaceholder: string;
    send: string;
    suggested: string;
    disclaimer: string;
    newChat: string;
    thinking: string;
  };
  common: {
    zoomIn: string;
    close: string;
    period: string;
    role: string;
    organization: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    nav: {
      about: 'About Me',
      honors: 'Honors & Awards',
      education: 'Education',
      projects: 'Projects',
      research: 'Research',
      leadership: 'Leadership',
      activities: 'Activities',
      interests: 'Interests',
      resume: 'Resume',
      askAi: 'Ask AI',
      sections: 'Sections',
      portfolioSubtitle: 'Curated Academic & Professional Archive',
      introScreen: 'Intro Screen',
      intro: 'Intro',
      active: 'Active',
      email: 'Email'
    },
    landing: {
      enter: 'Enter Portfolio',
      portfolio: 'Portfolio Archive',
      subtitle: 'A refined editorial dossier bridging quantitative finance, chemical research, and social impact.'
    },
    about: {
      sectionNum: '01 / About Me',
      name: 'Tran Ngoc Anh',
      title: 'About Me.',
      introSubtitle: 'A specialized dossier across quantitative economics, applied data science, and chemistry.',
      profileHeader: 'Tran Ngoc Anh',
      profileMeta: 'Hanoi–Amsterdam High School for the Gifted · Class of 2027',
      bioPlaceholder: '',
      nextSection: 'Honors & Awards'
    },
    honors: {
      sectionNum: '02 / Honors & Awards',
      title: 'Honors & Awards.',
      subtitle: 'International, national, and regional recognitions in economics, chemistry, and research innovation.',
      viewCertificate: 'View Certificate & Official Score',
      viewProject: 'View Related Project & Research',
      competitionScope: 'Scope / Level',
      datesLocation: 'Dates & Location',
      result: 'Result / Award',
      team: 'Team / Contribution',
      officialOrg: 'Organizer',
      galleryTitle: 'Official Verification Gallery',
      allLevels: 'All Levels',
      international: 'International / National',
      national: 'National Olympiad',
      city: 'City / Regional',
      filterAll: 'All Awards',
      filterNational: 'National & International',
      filterCity: 'City & Regional',
      archiveLabel: 'Official Verified Records',
      viewArchive: 'View Details',
      seeMore: 'See More & Full Certificate',
      enlarge: 'Click to Enlarge',
      aboutComp: 'About Competition',
      levelScope: 'Scope / Level',
      resultLabel: 'Result / Award',
      projectLabel: 'Research Topic / Project',
      teamMembers: 'Team Members',
      closePanel: 'Close Panel',
      prevSection: 'About Me',
      nextSection: 'Education'
    },
    education: {
      sectionNum: '03 / Education',
      title: 'Education.',
      subtitle: 'Academic background, standardized test scores, and scholastic milestones.',
      institution: 'Hanoi–Amsterdam High School for the Gifted',
      specialization: 'Major Specialization: Chemistry',
      focus: 'Academic Major',
      location: 'Location',
      period: '2024 – 2027',
      academicPerformance: 'Academic GPA Performance',
      scale: 'Standard 10.0 Scale',
      standardizedTests: 'Standardized Test Records',
      viewCert: 'View Report',
      credentialsPreview: 'Verified Credentials Preview',
      gpaTitle: 'Academic GPA Performance',
      testsTitle: 'Standardized Test Records',
      viewReport: 'View Score Report',
      downloadPdf: 'Download PDF',
      openFull: 'New Tab',
      prevSection: 'Honors & Awards',
      nextSection: 'Projects'
    },
    projects: {
      sectionNum: '04 / Projects',
      title: 'Projects.',
      subtitle: 'Selected technical builds, quantitative analytics platforms, and software architectures.',
      viewCaseStudy: 'View Case Study',
      viewCase: 'View Case',
      prevSection: 'Education',
      nextSection: 'Research',
      overview: 'Overview',
      solution: 'Solution',
      keyResults: 'Key Results'
    },
    research: {
      sectionNum: '05 / Research',
      title: 'Research.',
      subtitle: 'Empirical inquiries, econometrics, and peer-reviewed scientific publications.',
      publishedPaper: 'Published Paper',
      researchProject: 'Research Project',
      viewFullPaper: 'Read Full Publication PDF',
      viewCertificate: 'View Documentation',
      featuredPub: 'Featured Publication',
      publishedIn: 'Published In',
      leadAuthor: 'Author Role',
      readFullPdf: 'Read Full PDF',
      viewResearch: 'View Research',
      prevSection: 'Projects',
      nextSection: 'Leadership',
      problem: '01 / Research Problem',
      questions: '02 / Research Questions',
      methodology: '03 / Methodology & Framework',
      scope: 'Sample Scope',
      findings: '04 / Key Empirical Findings',
      viewAward: 'View Associated Honor',
      abstract: 'Abstract',
      keyFindings: 'Key Findings',
      myContribution: 'Contribution & Role',
      researchQuestions: 'Research Questions',
      sampleData: 'Sample & Data Scope',
      modelArchitecture: 'Model Architecture'
    },
    leadership: {
      sectionNum: '06 / Leadership',
      title: 'Leadership.',
      subtitle: 'Strategic execution, team guidance, and organization management.',
      prevSection: 'Research',
      nextSection: 'Activities'
    },
    activities: {
      sectionNum: '07 / Activities',
      title: 'Activities.',
      subtitle: 'Professional internships, practical data analytics, and organizational contributions.',
      featuredSection: 'Featured Activities',
      secondarySection: 'Archive & Community Cohorts',
      secondaryTitle: 'Secondary Activities.',
      secondarySubtitle: 'Archive & Community Cohorts',
      mentoringRow: 'Mentoring & Education',
      volunteeringRow: 'Community & Volunteering',
      row1: 'ROW 01',
      row1Title: 'Mentoring & Education',
      row2: 'ROW 02',
      row2Title: 'Community & Volunteering',
      seeMore: 'SEE MORE',
      collapse: 'COLLAPSE',
      collapseArchive: 'COLLAPSE ARCHIVE',
      hideDetails: 'HIDE DETAILS',
      archiveGallery: 'ARCHIVE GALLERY',
      archivePhotos: 'photos',
      clickToExpand: 'Click image to expand view',
      downloadPdf: 'View & Download PDF',
      viewDownloadPdf: 'View & Download PDF',
      pdfAttached: 'Official verification document & attachments',
      photos: 'photos',
      zoom: 'Zoom In',
      viewFull: 'View Full',
      keyImpacts: 'Key Impacts & Deliverables',
      prevSection: 'Leadership',
      nextSection: 'Interests'
    },
    interests: {
      sectionNum: '08 / Interests',
      title: 'Interests.',
      subtitle: 'Interdisciplinary pursuits, analytical passions, and personal exploratory domains.',
      prevSection: 'Activities',
      viewResume: 'View Resume',
      backToTop: 'Back to Top'
    },
    resume: {
      sectionNum: 'Curriculum Vitae',
      title: 'Resume.',
      subtitle: 'Comprehensive overview of qualifications, experience, and competencies.',
      downloadCv: 'Download Resume (PDF)',
      copyEmail: 'Copy Email',
      copiedEmail: 'Copied to Clipboard',
      education: 'Education',
      experience: 'Experience',
      honors: 'Honors & Awards',
      research: 'Research',
      activities: 'Activities',
      skills: 'Skills Matrix',
      skillsMatrix: 'Skills Matrix',
      techDev: 'ENGINEERING & DEVELOPMENT',
      methodsData: 'METHODS & DATA',
      languages: 'LANGUAGES'
    },
    askAi: {
      title: 'Ask AI Navigator',
      subtitle: 'Interactive conversational assistant for exploring this portfolio archive.',
      heroTitle: 'What would you like to explore?',
      badge: 'Portfolio Assistant',
      placeholder: 'Ask anything about projects, research, or experience...',
      followUpPlaceholder: 'Ask a follow-up question...',
      send: 'Send',
      suggested: 'Suggested Topics',
      disclaimer: 'AI responses are generated based on verified portfolio documentation.',
      newChat: 'New Chat',
      thinking: 'Thinking...'
    },
    common: {
      zoomIn: 'Zoom',
      close: 'Close',
      period: 'Period',
      role: 'Role',
      organization: 'Organization'
    }
  },
  vi: {
    nav: {
      about: 'Giới thiệu',
      honors: 'Giải thưởng & Thành tích',
      education: 'Học vấn',
      projects: 'Dự án',
      research: 'Nghiên cứu',
      leadership: 'Lãnh đạo',
      activities: 'Hoạt động',
      interests: 'Sở thích',
      resume: 'Hồ sơ',
      askAi: 'Hỏi AI',
      sections: 'Danh mục',
      portfolioSubtitle: 'Lưu trữ Học thuật & Hồ sơ Chuyên môn',
      introScreen: 'Màn hình mở đầu',
      intro: 'Mở đầu',
      active: 'Đang xem',
      email: 'Email'
    },
    landing: {
      enter: 'Khám phá Portfolio',
      portfolio: 'Lưu trữ Hồ sơ Năng lực',
      subtitle: 'Hồ sơ năng lực học thuật và chuyên môn kết hợp giữa kinh tế lượng định lượng, nghiên cứu hóa học và tác động xã hội.'
    },
    about: {
      sectionNum: '01 / Giới thiệu',
      name: 'Trần Ngọc Ánh',
      title: 'Giới thiệu.',
      introSubtitle: 'Hồ sơ chuyên môn kết hợp kinh tế học định lượng, khoa học dữ liệu ứng dụng và hóa học chuyên sâu.',
      profileHeader: 'Trần Ngọc Ánh',
      profileMeta: 'THPT Chuyên Hà Nội – Amsterdam · Khóa 2024 – 2027',
      bioPlaceholder: '',
      nextSection: 'Giải thưởng & Thành tích'
    },
    honors: {
      sectionNum: '02 / Giải thưởng & Thành tích',
      title: 'Giải thưởng.',
      subtitle: 'Các danh hiệu và huy chương quốc tế, quốc gia và cấp thành phố về kinh tế, hóa học và nghiên cứu sáng chế.',
      viewCertificate: 'Xem chứng nhận & điểm số chính thức',
      viewProject: 'Xem dự án & nghiên cứu liên quan',
      competitionScope: 'Quy mô / Cấp độ',
      datesLocation: 'Thời gian & Địa điểm',
      result: 'Kết quả / Giải thưởng',
      team: 'Đội thi / Đóng góp',
      officialOrg: 'Đơn vị tổ chức',
      galleryTitle: 'Bộ sưu tập chứng nhận chính thức',
      allLevels: 'Tất cả các cấp',
      international: 'Quốc tế & Quốc gia',
      national: 'Olympic Quốc gia',
      city: 'Cấp Thành phố / Khu vực',
      filterAll: 'Tất cả giải thưởng',
      filterNational: 'Quốc tế & Quốc gia',
      filterCity: 'Thành phố & Khu vực',
      archiveLabel: 'Hồ sơ Chứng nhận Chính thức',
      viewArchive: 'Xem chi tiết',
      seeMore: 'Xem thêm & Toàn văn chứng nhận',
      enlarge: 'Nhấp để phóng to',
      aboutComp: 'Thông tin cuộc thi',
      levelScope: 'Quy mô / Cấp độ',
      resultLabel: 'Kết quả / Giải thưởng',
      projectLabel: 'Đề tài nghiên cứu / Dự án',
      teamMembers: 'Thành viên đội thi',
      closePanel: 'Đóng cửa sổ',
      prevSection: 'Giới thiệu',
      nextSection: 'Học vấn'
    },
    education: {
      sectionNum: '03 / Học vấn',
      title: 'Học vấn.',
      subtitle: 'Quá trình học tập, bảng điểm học tập GPA và các chứng chỉ chuẩn hóa quốc tế.',
      institution: 'THPT Chuyên Hà Nội – Amsterdam',
      specialization: 'Chuyên ban: Hóa học',
      focus: 'Chuyên ban Học tập',
      location: 'Địa điểm',
      period: '2024 – 2027',
      academicPerformance: 'Điểm trung bình học tập (GPA)',
      scale: 'Thang điểm 10.0 tiêu chuẩn',
      standardizedTests: 'Chứng chỉ chuẩn hóa quốc tế',
      viewCert: 'Xem báo cáo điểm',
      credentialsPreview: 'Xem trước hồ sơ chứng chỉ',
      gpaTitle: 'Điểm trung bình học tập (GPA)',
      testsTitle: 'Chứng chỉ chuẩn hóa quốc tế',
      viewReport: 'Xem bảng điểm chứng nhận',
      downloadPdf: 'Tải PDF',
      openFull: 'Mở tab mới',
      prevSection: 'Giải thưởng & Thành tích',
      nextSection: 'Dự án'
    },
    projects: {
      sectionNum: '04 / Dự án',
      title: 'Dự án.',
      subtitle: 'Các sản phẩm kỹ thuật, nền tảng phân tích định lượng và kiến trúc phần mềm tiêu biểu.',
      viewCaseStudy: 'Xem Case Study chi tiết',
      viewCase: 'Xem dự án',
      prevSection: 'Học vấn',
      nextSection: 'Nghiên cứu',
      overview: 'Tổng quan',
      solution: 'Giải pháp',
      keyResults: 'Kết quả chính'
    },
    research: {
      sectionNum: '05 / Nghiên cứu',
      title: 'Nghiên cứu.',
      subtitle: 'Các công trình nghiên cứu thực nghiệm, mô hình kinh tế lượng và bài báo khoa học đã xuất bản.',
      publishedPaper: 'Bài báo đã xuất bản',
      researchProject: 'Dự án nghiên cứu',
      viewFullPaper: 'Đọc toàn văn bài báo (PDF)',
      viewCertificate: 'Xem tài liệu nghiên cứu',
      featuredPub: 'Bài báo tiêu biểu',
      publishedIn: 'Xuất bản tại',
      leadAuthor: 'Vai trò tác giả',
      readFullPdf: 'Đọc toàn văn PDF',
      viewResearch: 'Xem nghiên cứu',
      prevSection: 'Dự án',
      nextSection: 'Lãnh đạo',
      problem: '01 / Đặt vấn đề nghiên cứu',
      questions: '02 / Câu hỏi nghiên cứu',
      methodology: '03 / Phương pháp & Khung phân tích',
      scope: 'Phạm vi mẫu',
      findings: '04 / Kết quả thực nghiệm chính',
      viewAward: 'Xem giải thưởng liên quan',
      abstract: 'Tóm tắt bài báo',
      keyFindings: 'Kết quả chính',
      myContribution: 'Đóng góp & Vai trò',
      researchQuestions: 'Câu hỏi nghiên cứu',
      sampleData: 'Mẫu dữ liệu & Phạm vi',
      modelArchitecture: 'Kiến trúc mô hình'
    },
    leadership: {
      sectionNum: '06 / Lãnh đạo',
      title: 'Lãnh đạo.',
      subtitle: 'Năng lực điều hành chiến lược, dẫn dắt đội ngũ và quản lý tổ chức.',
      prevSection: 'Nghiên cứu',
      nextSection: 'Hoạt động'
    },
    activities: {
      sectionNum: '07 / Hoạt động',
      title: 'Hoạt động.',
      subtitle: 'Quá trình thực tập chuyên môn, phân tích dữ liệu thực tế và đóng góp cho cộng đồng.',
      featuredSection: 'Hoạt động tiêu biểu',
      secondarySection: 'Lưu trữ & Hoạt động cộng đồng',
      secondaryTitle: 'Hoạt động bổ trợ.',
      secondarySubtitle: 'Lưu trữ & Hoạt động cộng đồng',
      mentoringRow: 'Cố vấn & Giáo dục',
      volunteeringRow: 'Cộng đồng & Thiện nguyện',
      row1: 'NHÓM 01',
      row1Title: 'Cố vấn & Giáo dục',
      row2: 'NHÓM 02',
      row2Title: 'Cộng đồng & Thiện nguyện',
      seeMore: 'XEM THÊM',
      collapse: 'THU GỌN',
      collapseArchive: 'THU GỌN LƯU TRỮ',
      hideDetails: 'ẨN CHI TIẾT',
      archiveGallery: 'BỘ SƯU TẬP HÌNH ẢNH',
      archivePhotos: 'ảnh',
      clickToExpand: 'Nhấp vào ảnh để phóng to',
      downloadPdf: 'Xem & Tải tài liệu PDF',
      viewDownloadPdf: 'Xem & Tải PDF',
      pdfAttached: 'Tài liệu & giấy xác nhận chính thức đính kèm',
      photos: 'hình ảnh',
      zoom: 'Phóng to',
      viewFull: 'Xem chi tiết',
      keyImpacts: 'Tác động & Kết quả chính',
      prevSection: 'Lãnh đạo',
      nextSection: 'Sở thích'
    },
    interests: {
      sectionNum: '08 / Sở thích',
      title: 'Sở thích.',
      subtitle: 'Các định hướng nghiên cứu liên ngành, đam mê phân tích và sở thích cá nhân.',
      prevSection: 'Hoạt động',
      viewResume: 'Xem Hồ sơ (CV)',
      backToTop: 'Lên đầu trang'
    },
    resume: {
      sectionNum: 'Hồ sơ năng lực',
      title: 'Hồ sơ.',
      subtitle: 'Bản tóm tắt toàn diện về học vấn, kinh nghiệm, năng lực chuyên môn và kỹ năng.',
      downloadCv: 'Tải CV (PDF)',
      copyEmail: 'Sao chép Email',
      copiedEmail: 'Đã sao chép vào bộ nhớ tạm',
      education: 'Học vấn',
      experience: 'Kinh nghiệm',
      honors: 'Giải thưởng & Thành tích',
      research: 'Nghiên cứu',
      activities: 'Hoạt động',
      skills: 'Bộ kỹ năng',
      skillsMatrix: 'Bộ kỹ năng & Chuyên môn',
      techDev: 'CÔNG NGHỆ & PHÁT TRIỂN',
      methodsData: 'PHƯƠNG PHÁP & DỮ LIỆU',
      languages: 'NGÔN NGỮ'
    },
    askAi: {
      title: 'Trợ lý AI Tìm kiếm',
      subtitle: 'Trợ lý đối thoại thông minh giúp khám phá toàn bộ dữ liệu trong hồ sơ năng lực.',
      heroTitle: 'Bạn muốn tìm hiểu thông tin gì?',
      badge: 'Trợ lý Hồ sơ Năng lực',
      placeholder: 'Hỏi bất kỳ điều gì về học vấn, giải thưởng, dự án, nghiên cứu...',
      followUpPlaceholder: 'Đặt câu hỏi tiếp theo...',
      send: 'Gửi',
      suggested: 'Chủ đề gợi ý',
      disclaimer: 'Câu trả lời của AI được tổng hợp dựa trên hồ sơ và tài liệu xác thực.',
      newChat: 'Hội thoại mới',
      thinking: 'Đang suy nghĩ...'
    },
    common: {
      zoomIn: 'Phóng to',
      close: 'Đóng',
      period: 'Giai đoạn',
      role: 'Vai trò',
      organization: 'Tổ chức'
    }
  }
};
