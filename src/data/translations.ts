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
    record: string;
    closing: string;
    started: string;
    economics: string;
    wico: string;
    finad: string;
    greenCredit: string;
    milestones: string;
    beyond: string;
    community: string;
    outside: string;
  };
  landing: {
    enter: string;
    portfolio: string;
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
    introLine: string;
    currentlyText: string;
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
      portfolioSubtitle: "My story so far",
      introScreen: 'Intro Screen',
      intro: 'Intro',
      active: 'Active',
      email: 'Email',
      record: 'Academic Record',
      closing: 'Closing Note',
      started: 'Foundations',
      economics: 'Discovering Economics',
      wico: 'Finance in Practice',
      finad: 'Building FinAD',
      greenCredit: 'Research',
      milestones: 'Milestones',
      beyond: 'Leadership & Experience',
      community: 'Community',
      outside: 'Beyond Academics'
    },
    landing: {
      enter: 'Turn the Page',
      portfolio: "My Portfolio"
    },
    about: {
      sectionNum: '01 / About Me',
      name: 'Tran Ngoc Anh',
      title: 'About Me',
      introSubtitle: 'Chemistry · Economics · Data',
      profileHeader: 'Tran Ngoc Anh',
      profileMeta: 'Hanoi–Amsterdam High School for the Gifted · Class of 2027',
      bioPlaceholder: '',
      nextSection: 'Honors & Awards'
    },
    honors: {
      sectionNum: '02 / Honors & Awards',
      title: 'Honors & Awards',
      subtitle: "A few competitions I’ve taken part in, from Chemistry to economics and research.",
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
      title: 'Education',
      subtitle: "Where I go to school, how I’ve been doing, and the exams I’ve taken along the way.",
      institution: 'Hanoi–Amsterdam High School for the Gifted',
      specialization: 'Major Specialization: Chemistry',
      focus: 'Academic Major',
      location: 'Location',
      period: 'Duration',
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
      title: 'Projects',
      subtitle: "Projects I started because there was something I wanted to figure out or try for myself.",
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
      title: 'Research',
      subtitle: "Some questions made me curious enough to keep looking for answers outside class.",
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
      title: 'Leadership',
      subtitle: "What it’s been like to lead a team while still learning how to work with everyone.",
      prevSection: 'Research',
      nextSection: 'Activities'
    },
    activities: {
      sectionNum: '07 / Activities',
      title: 'Activities',
      subtitle: "A few things I’ve been part of outside class: mentoring, volunteering and an internship.",
      featuredSection: 'Featured Activities',
      secondarySection: 'Archive & Community Cohorts',
      secondaryTitle: 'Other Activities',
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
      title: 'Interests',
      subtitle: "Music, photos and the things I make time for outside school.",
      introLine: "A little more about what I like doing in my free time.",
      currentlyText: 'CURRENTLY → learning guitar',
      prevSection: 'Activities',
      viewResume: 'View Resume',
      backToTop: 'Back to Top'
    },
    resume: {
      sectionNum: 'Curriculum Vitae',
      title: 'Resume',
      subtitle: "A shorter version of what I’ve shared in these pages.",
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
      title: "Ask about the portfolio",
      subtitle: "Curious about something in these pages? You can ask here.",
      heroTitle: "What would you like to know?",
      badge: 'Portfolio Assistant',
      placeholder: "Ask about Ngoc Anh’s projects, studies or life outside school…",
      followUpPlaceholder: "What else are you curious about?",
      send: 'Send',
      suggested: 'Suggested Topics',
      disclaimer: "Answers draw on the information in this portfolio.",
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
      portfolioSubtitle: "Câu chuyện của mình",
      introScreen: 'Màn hình mở đầu',
      intro: 'Mở đầu',
      active: 'Đang xem',
      email: 'Email',
      record: 'Hồ sơ Học tập',
      closing: 'Lời kết',
      started: 'Nền tảng',
      economics: 'Khám phá Kinh tế',
      wico: 'Tài chính trong Thực tiễn',
      finad: 'Xây dựng FinAD',
      greenCredit: 'Nghiên cứu',
      milestones: 'Dấu mốc',
      beyond: 'Lãnh đạo & Trải nghiệm',
      community: 'Cộng đồng',
      outside: 'Ngoài Học thuật'
    },
    landing: {
      enter: "Lật trang cùng mình",
      portfolio: "Portfolio của mình"
    },
    about: {
      sectionNum: '01 / Giới thiệu',
      name: 'Trần Ngọc Anh',
      title: 'Giới thiệu',
      introSubtitle: 'Hóa học · Kinh tế · Dữ liệu',
      profileHeader: 'Trần Ngọc Anh',
      profileMeta: 'THPT Chuyên Hà Nội – Amsterdam · Khóa 2024 – 2027',
      bioPlaceholder: '',
      nextSection: 'Giải thưởng & Thành tích'
    },
    honors: {
      sectionNum: '02 / Giải thưởng & Thành tích',
      title: 'Giải thưởng',
      subtitle: "Một vài cuộc thi mình đã tham gia, từ Hóa đến kinh tế và nghiên cứu.",
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
      title: 'Học vấn',
      subtitle: "Trường mình đang học, kết quả học tập và những kỳ thi mình đã tham gia.",
      institution: 'THPT Chuyên Hà Nội – Amsterdam',
      specialization: 'Chuyên ban: Hóa học',
      focus: 'Chuyên ban Học tập',
      location: 'Địa điểm',
      period: 'Thời gian học',
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
      title: 'Dự án',
      subtitle: "Những dự án bắt đầu từ một điều mình muốn hiểu hơn, hoặc muốn tự làm thử.",
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
      title: 'Nghiên cứu',
      subtitle: "Có những câu hỏi khiến mình muốn tìm hiểu tiếp, kể cả khi đã hết giờ học.",
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
      title: 'Lãnh đạo',
      subtitle: "Chuyện mình làm trưởng nhóm, và vẫn đang học cách làm việc cùng mọi người.",
      prevSection: 'Nghiên cứu',
      nextSection: 'Hoạt động'
    },
    activities: {
      sectionNum: '07 / Hoạt động',
      title: 'Hoạt động',
      subtitle: "Một vài việc mình tham gia ngoài giờ học: kèm các em, tình nguyện và thực tập.",
      featuredSection: 'Hoạt động tiêu biểu',
      secondarySection: 'Lưu trữ & Hoạt động cộng đồng',
      secondaryTitle: 'Hoạt động khác',
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
      title: 'Sở thích',
      subtitle: "Âm nhạc, chụp ảnh và những điều mình dành thời gian cho ngoài chuyện học.",
      introLine: "Kể thêm một chút về những gì mình thích làm lúc rảnh.",
      currentlyText: 'HIỆN TẠI → học guitar',
      prevSection: 'Hoạt động',
      viewResume: 'Xem Hồ sơ (CV)',
      backToTop: 'Lên đầu trang'
    },
    resume: {
      sectionNum: 'Hồ sơ năng lực',
      title: 'Hồ sơ',
      subtitle: "Bản ngắn gọn của những điều mình kể trong các trang này.",
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
      title: "Hỏi thêm về portfolio",
      subtitle: "Có điều gì trong những trang này khiến bạn tò mò không? Bạn có thể hỏi ở đây nhé.",
      heroTitle: "Bạn muốn nghe thêm chuyện gì?",
      badge: "Trợ lý portfolio",
      placeholder: "Hỏi về chuyện học, dự án hay sở thích của Ngọc Anh…",
      followUpPlaceholder: "Bạn còn tò mò điều gì nữa?",
      send: 'Gửi',
      suggested: 'Chủ đề gợi ý',
      disclaimer: "Câu trả lời dựa trên những thông tin có trong portfolio này.",
      newChat: "Bắt đầu lại",
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
