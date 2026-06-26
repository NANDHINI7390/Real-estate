import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, ShieldCheck, Clock } from 'lucide-react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  // Show tooltip after 4 seconds to grab attention
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappNumber = '919876543210'; // Client's premium direct sales hotline

  const handleQuickEnquiry = (optionText: string) => {
    const text = encodeURIComponent(optionText);
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMessage.trim()) return;
    const text = encodeURIComponent(userMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
    setUserMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end">
      {/* Tooltip bubble (Shown before opening or as invitation) */}
      {showTooltip && !isOpen && (
        <div className="mb-3 bg-green-900 text-white text-xs py-2 px-4 rounded-xl shadow-2xl border border-green-500/30 flex items-center gap-2 max-w-xs animate-bounce animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
          <span className="font-medium">Have queries? Talk to our Relationship Executive</span>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-slate-300 hover:text-white ml-1 text-sm font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Main Chat Popup Panel */}
      {isOpen && (
        <div className="mb-4 w-[330px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-fadeIn flex flex-col">
          {/* Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-serif font-bold text-amber-400 border border-white/10">
                  MP
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-[#075E54] rounded-full animate-pulse" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm tracking-wide text-amber-400">Mailam Concierge</h4>
                <div className="flex items-center gap-1 text-[10px] text-green-200">
                  <Clock className="w-3 h-3" />
                  <span>Replies instantly • Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-green-200 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-slate-50 max-h-[280px] overflow-y-auto space-y-3">
            {/* Agent Greeting */}
            <div className="bg-white p-3 rounded-xl rounded-tl-none border border-slate-200/60 shadow-sm max-w-[85%]">
              <p className="text-xs text-slate-700 leading-relaxed">
                Namaste! Welcome to <strong>Mailam Properties</strong>. How can we assist you with your premium real estate portfolio today?
              </p>
            </div>

            {/* Quick Actions Title */}
            <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Tap to start chat</p>

            {/* Quick Options Button stack */}
            <div className="space-y-2">
              <button
                onClick={() => handleQuickEnquiry('Hi Mailam Properties, I am interested in viewing active residential listings.')}
                className="w-full text-left bg-white hover:bg-green-50/50 border border-slate-200 hover:border-green-500/40 p-2.5 rounded-xl transition-all text-xs text-slate-700 font-medium flex items-center justify-between cursor-pointer group"
              >
                <span>🏢 Enquire about listings</span>
                <span className="text-[10px] text-green-600 font-bold group-hover:translate-x-1 transition-transform">→</span>
              </button>

              <button
                onClick={() => handleQuickEnquiry('Hi Mailam Properties, I want to schedule a site visit to one of your listed properties.')}
                className="w-full text-left bg-white hover:bg-green-50/50 border border-slate-200 hover:border-green-500/40 p-2.5 rounded-xl transition-all text-xs text-slate-700 font-medium flex items-center justify-between cursor-pointer group"
              >
                <span>📅 Schedule a Site Visit</span>
                <span className="text-[10px] text-green-600 font-bold group-hover:translate-x-1 transition-transform">→</span>
              </button>

              <button
                onClick={() => handleQuickEnquiry('Hi Mailam Properties, I want to connect with a senior investment advisor.')}
                className="w-full text-left bg-white hover:bg-green-50/50 border border-slate-200 hover:border-green-500/40 p-2.5 rounded-xl transition-all text-xs text-slate-700 font-medium flex items-center justify-between cursor-pointer group"
              >
                <span>💼 Connect with Advisor</span>
                <span className="text-[10px] text-green-600 font-bold group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>

          {/* Security and custom text input form */}
          <div className="p-3 bg-white border-t border-slate-100">
            <form onSubmit={handleCustomSend} className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                className="flex-grow text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-green-500"
              />
              <button
                type="submit"
                disabled={!userMessage.trim()}
                className="bg-[#075E54] text-white p-2 rounded-xl hover:bg-[#128C7E] disabled:opacity-40 transition-all cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="flex items-center justify-center gap-1 mt-2.5 text-[9px] text-slate-400">
              <ShieldCheck className="w-3 h-3 text-[#25D366]" />
              <span>Secure connection • Powered by WhatsApp</span>
            </div>
          </div>
        </div>
      )}

      {/* Primary Floating Action Button with pulsing border */}
      <div className="relative">
        <span className="absolute -inset-1 rounded-full bg-green-500/40 animate-ping pointer-events-none" />
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className="relative bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl transition-all transform hover:scale-105 duration-200 flex items-center justify-center cursor-pointer border border-white"
          aria-label="Chat on WhatsApp"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <svg 
              viewBox="0 0 24 24" 
              className="w-6 h-6 fill-current text-white" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
