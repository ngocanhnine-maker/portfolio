import React, { useState, useRef, useEffect } from 'react';
import { PageId } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface AskAIPageProps {
  onNavigate: (page: PageId) => void;
  onOpenCaseStudy?: (projectId: string) => void;
  onOpenResearchModal?: (paperId: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionLink?: {
    label: string;
    targetPage: PageId;
    projectId?: string;
  };
}

interface SuggestionItem {
  id: string;
  title: string;
  promptText: string;
}

export const AskAIPage: React.FC<AskAIPageProps> = ({ onNavigate }) => {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language];

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions: SuggestionItem[] = isVi
    ? [
        {
          id: 'education',
          title: 'Học vấn & Điểm số',
          promptText: 'Thông tin về học vấn, điểm trung bình GPA và các chứng chỉ chuẩn hóa?'
        },
        {
          id: 'honors',
          title: 'Giải thưởng & Huy chương',
          promptText: 'Các thành tích, giải thưởng quốc tế và quốc gia nổi bật?'
        },
        {
          id: 'research',
          title: 'Nghiên cứu học thuật',
          promptText: 'Thông tin về các bài báo nghiên cứu định lượng và kinh tế học?'
        },
        {
          id: 'projects',
          title: 'Dự án & Nền tảng',
          promptText: 'Những dự án công nghệ, phân tích dữ liệu và thiết kế chính?'
        },
        {
          id: 'activities',
          title: 'Hoạt động & Tình nguyện',
          promptText: 'Các hoạt động ngoại khóa, cố vấn học thuật và thiện nguyện cộng đồng?'
        },
        {
          id: 'about',
          title: 'Giới thiệu bản thân',
          promptText: 'Tổng quan về định hướng, kỹ năng và thông tin liên hệ?'
        }
      ]
    : [
        {
          id: 'education',
          title: 'Education',
          promptText: 'What is the academic background, GPA, and standardized test scores?'
        },
        {
          id: 'honors',
          title: 'Honors & Awards',
          promptText: 'What are the top international and national Olympiad achievements?'
        },
        {
          id: 'research',
          title: 'Research',
          promptText: 'Tell me about the quantitative analysis and empirical research papers.'
        },
        {
          id: 'projects',
          title: 'Projects',
          promptText: 'What key technical and design projects are highlighted in the portfolio?'
        },
        {
          id: 'activities',
          title: 'Activities & Volunteering',
          promptText: 'What leadership roles, community initiatives, and mentoring activities are featured?'
        },
        {
          id: 'about',
          title: 'About me',
          promptText: 'Give me a brief overview of background, skills, and contact information.'
        }
      ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isTyping]);

  const generateAnswer = (query: string): { text: string; actionLink?: { label: string; targetPage: PageId; projectId?: string } } => {
    const lower = query.toLowerCase();

    if (
      lower.includes('education') ||
      lower.includes('school') ||
      lower.includes('amsterdam') ||
      lower.includes('gpa') ||
      lower.includes('sat') ||
      lower.includes('ielts') ||
      lower.includes('a-level') ||
      lower.includes('chemistry') ||
      lower.includes('score') ||
      lower.includes('học vấn') ||
      lower.includes('điểm') ||
      lower.includes('trường') ||
      lower.includes('hóa học')
    ) {
      return isVi
        ? {
            text: 'Trần Ngọc Anh theo học tại **THPT Chuyên Hà Nội – Amsterdam**, chuyên Hóa học (09/2024 – 06/2027). Thành tích học tập nổi bật bao gồm **ĐTB Lớp 10: 9.6**, **ĐTB Lớp 11: 9.8**, **SAT: 1520** (06/2026), **IELTS Academic: 7.5** (07/2025), và **A-Level Mathematics: A** (Cambridge AS Level). Bảng điểm và chứng chỉ gốc có thể xem trực tiếp trong mục Học vấn.',
            actionLink: {
              label: 'Xem mục Học vấn →',
              targetPage: 'education'
            }
          }
        : {
            text: 'Tran Ngoc Anh attends **Hanoi–Amsterdam High School for the Gifted** majoring in Chemistry (Sep 2024 – June 2027). Academic record highlights include **Grade 10 GPA: 9.6**, **Grade 11 GPA: 9.8**, **SAT: 1520** (June 2026), **IELTS Academic: 7.5** (July 2025), and **A-Level Mathematics: A** (Cambridge International AS Level). Verified score reports are viewable in the Education section.',
            actionLink: {
              label: 'View Education Section →',
              targetPage: 'education'
            }
          };
    }

    if (
      lower.includes('project') ||
      lower.includes('alpha') ||
      lower.includes('beta') ||
      lower.includes('gamma') ||
      lower.includes('build') ||
      lower.includes('work') ||
      lower.includes('dự án') ||
      lower.includes('nền tảng')
    ) {
      return isVi
        ? {
            text: 'Danh mục dự án nổi bật gồm 3 hệ thống chính: **Project Alpha** (ứng dụng web hiệu năng cao), **Project Beta** (bộ công cụ phân tích dữ liệu & định lượng kinh tế), và **Project Gamma** (hệ thống thiết kế đồ họa & kiến trúc thành phần). Tất cả đều chú trọng tính chính xác, giao diện tinh giản và khả năng mở rộng.',
            actionLink: {
              label: 'Xem Dự án →',
              targetPage: 'projects'
            }
          }
        : {
            text: 'The portfolio highlights three core systems: **Project Alpha** (a high-performance web application), **Project Beta** (a quantitative data and analytics suite), and **Project Gamma** (an accessible design system and component architecture). Each emphasizes sub-second latency, clean interfaces, and scalable engineering.',
            actionLink: {
              label: 'View Projects →',
              targetPage: 'projects'
            }
          };
    }

    if (
      lower.includes('research') ||
      lower.includes('paper') ||
      lower.includes('academic') ||
      lower.includes('model') ||
      lower.includes('empirical') ||
      lower.includes('green credit') ||
      lower.includes('banking') ||
      lower.includes('nghiên cứu') ||
      lower.includes('bài báo') ||
      lower.includes('tín dụng xanh') ||
      lower.includes('ngân hàng')
    ) {
      return isVi
        ? {
            text: 'Bài nghiên cứu thực nghiệm được công bố về **Tín dụng Xanh và Hiệu quả Tài chính Ngân hàng Thương mại Việt Nam** (2022–2024), đăng trên *Tạp chí Nghiên cứu Quản lý* (Tập 18, Số 2, 2026). Kết quả chỉ ra rằng tỷ lệ tín dụng xanh tác động tích cực và có ý nghĩa thống kê đến tỷ suất sinh lời trên tài sản (ROA).',
            actionLink: {
              label: 'Khám phá Nghiên cứu →',
              targetPage: 'research'
            }
          }
        : {
            text: 'Published empirical research explores **Green Credit and Bank Financial Performance** across eight Vietnamese commercial banks (2022–2024), published in the *Journal of Management Research* (Vol. 18, No. 2, 2026). Key findings demonstrate that green lending intensity (Green Credit Ratio) is positively associated with ROA.',
            actionLink: {
              label: 'Explore Research Papers →',
              targetPage: 'research'
            }
          };
    }

    if (
      lower.includes('activity') ||
      lower.includes('activities') ||
      lower.includes('volunteer') ||
      lower.includes('community') ||
      lower.includes('charity') ||
      lower.includes('làng hoà bình') ||
      lower.includes('hoạt động') ||
      lower.includes('từ thiện') ||
      lower.includes('tình nguyện')
    ) {
      return isVi
        ? {
            text: 'Các hoạt động ngoại khóa tiêu biểu gồm **Hoạt động Thiện nguyện & Trải nghiệm Y tế tại Làng Hòa Bình Thanh Xuân** (chăm sóc trẻ em nhiễm chất độc da cam), Thực tập Phân tích Dữ liệu, Cố vấn Học thuật (Advisor–Advisee), Dự án WITH Mùa 5, Tình nguyện tại Bệnh viện Bạch Mai và Làng Trẻ em SOS Hải Phòng.',
            actionLink: {
              label: 'Xem Hoạt động Ngoại khóa →',
              targetPage: 'activities'
            }
          }
        : {
            text: 'Featured activities include the **Medical Volunteering & Youth Development Program at Peace Village Thanh Xuan** (supporting children affected by Agent Orange), Data Analytics Internship, Advisor–Advisee Mentoring, WITH Project Season V, Volunteering at Bach Mai Hospital, and SOS Children’s Village Hai Phong.',
            actionLink: {
              label: 'View Activities →',
              targetPage: 'activities'
            }
          };
    }

    if (
      lower.includes('honor') ||
      lower.includes('award') ||
      lower.includes('olympiad') ||
      lower.includes('competition') ||
      lower.includes('wico') ||
      lower.includes('veo') ||
      lower.includes('medal') ||
      lower.includes('prize') ||
      lower.includes('giải thưởng') ||
      lower.includes('thành tích') ||
      lower.includes('huy chương')
    ) {
      return isVi
        ? {
            text: 'Trần Ngọc Anh đã đạt nhiều giải thưởng xuất sắc: **Huy chương Vàng** Olympic Sáng tạo & Phát minh Thế giới (WICO 2026 tại Hàn Quốc), **Giải Nhất Quốc gia** Olympic Kinh tế Việt Nam (VEO 2026), **Giải Ba Quốc gia** Học sinh Giỏi môn Hóa học (2025–2026), **Huy chương Vàng** Olympic Toàn cầu AX (2026), cùng nhiều Giải Nhất & Nhì cấp Thành phố.',
            actionLink: {
              label: 'Xem Giải thưởng & Danh hiệu →',
              targetPage: 'honors'
            }
          }
        : {
            text: 'Tran Ngoc Anh has earned top distinctions including Gold Medal at the 15th World Invention Creativity Olympics (WICO 2026), National First Prize at the Vietnam Economics Olympiad (2026), National Third Prize at the National Chemistry Olympiad (2025–2026), Gold Medal at AX Global Olympiad (2026), and multiple City-level First and Second Prizes.',
            actionLink: {
              label: 'View Honors & Awards →',
              targetPage: 'honors'
            }
          };
    }

    if (
      lower.includes('about') ||
      lower.includes('who') ||
      lower.includes('background') ||
      lower.includes('bio') ||
      lower.includes('tran ngoc anh') ||
      lower.includes('giới thiệu') ||
      lower.includes('bản thân')
    ) {
      return isVi
        ? {
            text: `Trần Ngọc Anh theo đuổi sự giao thoa giữa kinh tế học định lượng, công nghệ dữ liệu và hóa học chuyên sâu, hướng tới các giải pháp có tác động xã hội bền vững. Email liên hệ: ${PERSONAL_INFO.email}.`,
            actionLink: {
              label: 'Về bản thân →',
              targetPage: 'about'
            }
          }
        : {
            text: `Tran Ngoc Anh works across strategy, design, engineering, and empirical research with a focus on building minimal, high-impact systems. Contact is available via ${PERSONAL_INFO.email}.`,
            actionLink: {
              label: 'About Overview →',
              targetPage: 'about'
            }
          };
    }

    if (
      lower.includes('resume') ||
      lower.includes('cv') ||
      lower.includes('skill') ||
      lower.includes('contact') ||
      lower.includes('email') ||
      lower.includes('kỹ năng') ||
      lower.includes('liên hệ')
    ) {
      return isVi
        ? {
            text: `Bộ kỹ năng bao gồm TypeScript, React, Python, SQL, và mô hình hóa định lượng. Bạn có thể xem phần giới thiệu hoặc liên hệ qua email ${PERSONAL_INFO.email}.`,
            actionLink: {
              label: 'Về bản thân & Liên hệ →',
              targetPage: 'about'
            }
          }
        : {
            text: `The skillset spans TypeScript, React, Python, SQL, and quantitative modeling. You can review the About section or reach out directly at ${PERSONAL_INFO.email}.`,
            actionLink: {
              label: 'About & Contact →',
              targetPage: 'about'
            }
          };
    }

    return isVi
      ? {
          text: `Dựa trên hồ sơ của Trần Ngọc Anh, câu hỏi của bạn liên quan đến các lĩnh vực học thuật, nghiên cứu định lượng, dự án công nghệ và hoạt động cộng đồng. Bạn có thể khám phá chi tiết tại các mục tương ứng trong danh mục hồ sơ.`,
          actionLink: {
            label: 'Khám phá Danh mục →',
            targetPage: 'about'
          }
        }
      : {
          text: `Based on Tran Ngoc Anh's portfolio, this relates to core areas of design, quantitative engineering, and cross-functional leadership. You can explore selected case studies and documentation across the respective sections.`,
          actionLink: {
            label: 'Explore Portfolio →',
            targetPage: 'projects'
          }
        };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: isVi ? 'Vừa xong' : 'Just now'
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAnswer(query);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: response.text,
        timestamp: isVi ? 'Vừa xong' : 'Just now',
        actionLink: response.actionLink
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 400);
  };

  const handleResetChat = () => {
    setMessages([]);
    setInputValue('');
    setIsTyping(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const isConversationActive = messages.length > 0;

  return (
    <div
      id="ask-ai"
      className="min-h-[calc(100vh-3.5rem)] lg:min-h-screen flex flex-col justify-between relative select-none w-full"
    >
      {/* Top Bar during Conversation Mode */}
      <AnimatePresence>
        {isConversationActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="sticky top-0 z-20 backdrop-blur-md bg-[#F2EBDD]/90 border-b border-[#292929]/10 px-4 sm:px-8 py-3 flex items-center justify-between max-w-3xl mx-auto w-full"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-[#676749]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isVi ? 'HỘI THOẠI TRỢ LÝ AI' : 'PORTFOLIO AI CONVERSATION'}</span>
            </div>

            <button
              onClick={handleResetChat}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-[#292929]/70 hover:text-[#292929] hover:bg-white/50 rounded-xs transition-colors cursor-pointer"
              title={isVi ? 'Bắt đầu cuộc trò chuyện mới' : 'Start a new chat'}
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t.askAi.newChat}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Area */}
      <div className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full px-4 sm:px-8 py-6 sm:py-8">
        {!isConversationActive ? (
          /* Initial Centered Screen */
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="my-auto w-full flex flex-col items-center space-y-8 py-12"
          >
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight text-[#292929] sm:text-3xl md:text-4xl">
                {t.askAi.heroTitle}
              </h1>
            </div>

            <div className="w-full max-w-2xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="relative flex items-center bg-white/70 hover:bg-white/90 focus-within:bg-white border border-[#292929]/15 focus-within:border-[#676749] focus-within:ring-1 focus-within:ring-[#676749]/30 rounded-2xl p-2 sm:p-2.5 transition-all duration-300 shadow-xs"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t.askAi.placeholder}
                  className="flex-1 bg-transparent px-3 py-2 text-sm sm:text-base text-[#292929] placeholder-[#292929]/40 focus:outline-none"
                  id="ai-search-input-empty"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className={`p-2.5 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
                    inputValue.trim()
                      ? 'bg-[#292929] text-[#F2EBDD] hover:bg-[#676749]'
                      : 'bg-[#292929]/10 text-[#292929]/30 cursor-not-allowed'
                  }`}
                  aria-label="Submit query"
                >
                  <ArrowUp className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
                </button>
              </form>
            </div>

            {/* Suggestions */}
            <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2">
              {suggestions.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => handleSendMessage(item.promptText)}
                  id={`ai-suggestion-${item.id}`}
                  className={`p-3.5 bg-white/40 hover:bg-white/80 border border-[#292929]/10 hover:border-[#676749]/40 rounded-xl text-left transition-all duration-200 group cursor-pointer flex flex-col justify-between ${
                    idx === 0 || idx === 1 ? 'sm:col-span-1' : ''
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm font-semibold text-[#292929] group-hover:text-[#676749] transition-colors">
                      {item.title}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#292929]/30 group-hover:text-[#676749] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <span className="text-[11px] text-[#292929]/60 line-clamp-1 mt-1 font-mono">
                    {isVi ? 'Hỏi ngay →' : 'Ask →'}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Ongoing Conversation View */
          <div className="flex-1 flex flex-col space-y-6 pb-28 pt-2">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {msg.sender === 'user' ? (
                  <div className="max-w-[85%] sm:max-w-[75%] bg-[#292929] text-[#F2EBDD] px-4 py-3 rounded-2xl rounded-tr-sm text-sm sm:text-base shadow-xs leading-relaxed">
                    {msg.text}
                  </div>
                ) : (
                  <div className="max-w-full sm:max-w-[92%] space-y-3 pt-1">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#676749]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#676749]" />
                      <span>{isVi ? 'TRỢ LÝ AI' : 'AI ASSISTANT'}</span>
                    </div>

                    <div className="text-[#292929] text-sm sm:text-base leading-relaxed space-y-2">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[#292929]">$1</strong>')
                        }}
                      />
                    </div>

                    {msg.actionLink && (
                      <div className="pt-1">
                        <button
                          onClick={() => onNavigate(msg.actionLink!.targetPage)}
                          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#676749] hover:text-[#292929] underline underline-offset-4 decoration-[#676749]/40 hover:decoration-[#292929] transition-all cursor-pointer"
                        >
                          <span>{msg.actionLink.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-xs font-mono text-[#676749] pt-2"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#676749] animate-pulse" />
                <span>{t.askAi.thinking}</span>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Sticky Bottom Input Bar */}
      {isConversationActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="sticky bottom-0 z-20 backdrop-blur-md bg-[#F2EBDD]/90 border-t border-[#292929]/10 px-4 sm:px-8 py-3.5"
        >
          <div className="max-w-3xl mx-auto w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center bg-white/80 hover:bg-white/95 focus-within:bg-white border border-[#292929]/15 focus-within:border-[#676749] focus-within:ring-1 focus-within:ring-[#676749]/30 rounded-2xl p-1.5 sm:p-2 transition-all duration-300 shadow-xs"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t.askAi.followUpPlaceholder}
                className="flex-1 bg-transparent px-3.5 py-2 text-sm sm:text-base text-[#292929] placeholder-[#292929]/40 focus:outline-none"
                id="ai-search-input-conversation"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className={`p-2 sm:p-2.5 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
                  inputValue.trim() && !isTyping
                    ? 'bg-[#292929] text-[#F2EBDD] hover:bg-[#676749]'
                    : 'bg-[#292929]/10 text-[#292929]/30 cursor-not-allowed'
                }`}
                aria-label="Send message"
              >
                <ArrowUp className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
};
