import React, { useState, useRef, useEffect } from 'react';
import { PageId } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { answerQuery, STARTERS } from '../data/askAiEngine';
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
  links?: { label: string; page: PageId }[];
  followUps?: { label: string; prompt: string }[];
  topicIds?: string[];
}

// Escape first so only our own **bold** markup becomes HTML.
const renderText = (text: string) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[#292929]">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '<br/><br/>');

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

  const suggestions: SuggestionItem[] = STARTERS[language].map((st, i) => ({
    id: `starter-${i}`,
    title: st.title,
    promptText: st.prompt
  }));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isTyping]);

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
      const lastTopics = [...messages].reverse().find((m) => m.sender === 'assistant')?.topicIds ?? [];
      const reply = answerQuery(query, language, lastTopics);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: reply.text,
        timestamp: isVi ? 'Vừa xong' : 'Just now',
        links: reply.links,
        followUps: reply.followUps,
        topicIds: reply.topicIds
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 350 + Math.min(700, query.length * 8));
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
                      <p dangerouslySetInnerHTML={{ __html: renderText(msg.text) }} />
                    </div>

                    {msg.links && msg.links.length > 0 && (
                      <div className="pt-1 flex flex-wrap gap-x-5 gap-y-2">
                        {msg.links.map((l) => (
                          <button
                            key={l.page}
                            onClick={() => onNavigate(l.page)}
                            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#676749] hover:text-[#292929] underline underline-offset-4 decoration-[#676749]/40 hover:decoration-[#292929] transition-all cursor-pointer"
                          >
                            <span>{l.label}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    )}

                    {msg.followUps && msg.followUps.length > 0 && msg.id === messages[messages.length - 1]?.id && (
                      <div className="pt-1 flex flex-wrap gap-2">
                        {msg.followUps.map((f) => (
                          <button
                            key={f.label}
                            onClick={() => handleSendMessage(f.prompt)}
                            disabled={isTyping}
                            className="px-3 py-1.5 text-xs rounded-full border border-[#292929]/15 bg-white/50 text-[#292929]/80 hover:bg-white hover:border-[#676749]/50 hover:text-[#292929] transition-colors cursor-pointer disabled:opacity-50"
                          >
                            {f.label}
                          </button>
                        ))}
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
