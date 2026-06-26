import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, ShieldCheck, ChevronDown, ChevronUp, FileText, Landmark } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

export default function Contact() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [sent, setSent] = useState(false);

  const faqs: FaqItem[] = [
    {
      q: 'What is a RERA Registration, and are your listed properties compliant?',
      a: 'RERA (Real Estate Regulation and Development Act) is a mandatory government mechanism enacted to protect home-buyers and boost investments. Absolutely 100% of the projects and properties displayed on Mailam Properties are verified for RERA registration. We display registration IDs directly on each property documentation sheet.',
    },
    {
      q: 'Do you charge a brokerage commission on residential sales?',
      a: 'We operate on a transparent, flat advisory model. For our featured builder-direct collaborations, we typically charge 0% commission from the buyer. For secondary resale properties, we charge a standard industry flat fee which is fully documented beforehand with no hidden costs.',
    },
    {
      q: 'Can Mailam Properties assist with bank home loans and legal registration?',
      a: 'Yes, absolutely. We have dedicated in-house departments for legal title search and bank loan approvals. We have formal tie-ups with India\'s premier banks (including SBI, HDFC, ICICI, and Axis Bank) to guarantee rapid sanctioning at competitive interest rates.',
    },
    {
      q: 'How are secondary plots of land verified?',
      a: 'Plots undergo a multi-layered verification process by our lawyers. This includes inspecting the mother land deed, verification of Encumbrance Certificate (EC) for the past 30 years, checking zoning layout maps with municipal corporations, and checking connectivity clearances.',
    },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  const whatsappNumber = '919876543210';
  const whatsappText = encodeURIComponent('Hi Mailam Properties, I am planning to purchase a residence. Please connect me with an executive.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold font-mono text-amber-600 tracking-wider uppercase block mb-2">
            ✦ Worldwide Client Relations ✦
          </span>
          <h1 className="font-serif font-black text-3xl sm:text-4xl text-emerald-950 tracking-tight">
            Connect With Our Advisors
          </h1>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Our private client relations team operates 7 days a week to support property inquiries, physical site-tours, and real estate legal consultations.
          </p>
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-20">
          
          {/* Card 1: Headquarters & Metros */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <h3 className="font-serif font-bold text-lg text-emerald-950 border-b border-slate-100 pb-3">
              Corporate Headquarters
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-sm text-slate-600 leading-relaxed font-sans">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Bengaluru Corporate Office</strong>
                  <p className="mt-1 font-light">Level 14, Prestige Trade Tower, Palace Road, High Grounds, Bengaluru, KA - 560001</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm text-slate-600 leading-relaxed font-sans pt-2">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Mumbai Regional Office</strong>
                  <p className="mt-1 font-light">Level 4, Maker Maxity, Bandra Kurla Complex (BKC), Mumbai, MH - 400051</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Hotlines & Support Channels */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <h3 className="font-serif font-bold text-lg text-emerald-950 border-b border-slate-100 pb-3">
              Direct Channels
            </h3>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm text-slate-600 font-sans">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <strong className="text-slate-800 font-serif">Bengaluru Hub Hotline</strong>
                  <p className="mt-0.5 font-mono font-medium">+91 80 4912 3456</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-sm text-slate-600 font-sans pt-1">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <strong className="text-slate-800 font-serif">Mumbai Hub Hotline</strong>
                  <p className="mt-0.5 font-mono font-medium">+91 22 6124 5678</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-sm text-slate-600 font-sans pt-1">
                <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <strong className="text-slate-800">Email Correspondence</strong>
                  <p className="mt-0.5 font-medium text-emerald-800">enquiries@mailamproperties.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: WhatsApp Instant Help */}
          <div className="bg-[#FAFAF8] text-slate-800 rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#0A2540_1px,transparent_1px)] [background-size:16px_16px]" />
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
              Fastest Response
            </span>
            <h3 className="font-serif font-bold text-lg text-emerald-950">
              Immediate Client Support
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans font-light">
              Chat instantly on WhatsApp with our registered Relationship Managers to get digital property brochures, payment plans, and coordinate physical site visits.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 rounded-lg shadow-md transition-all text-sm cursor-pointer"
            >
              <MessageSquare className="w-4.5 h-4.5 fill-white" />
              <span>Connect via WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Dynamic FAQ Accordion */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-10">
            <h2 className="font-serif font-bold text-2xl text-emerald-950 tracking-tight">
              Frequently Asked Advisory Questions
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Read quick answers on Indian real estate regulations, brokerage percentages, and registration procedures.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex justify-between items-center gap-4 hover:bg-slate-50/60 transition-colors"
                  >
                    <span className="font-serif font-bold text-slate-800 text-sm sm:text-base">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-5 border-t border-slate-100 bg-slate-50/50 text-slate-600 text-xs sm:text-sm font-sans font-light leading-relaxed animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Simple Consultation Request Form */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-md max-w-2xl mx-auto p-6 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="font-serif font-black text-2xl text-emerald-950 tracking-tight">
              Book a Private Consultation
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-sans">
              Enter details below to schedule an online legal advisory meeting with our executives.
            </p>
          </div>

          {sent ? (
            <div className="bg-emerald-50 text-emerald-900 p-6 rounded-lg border border-emerald-100 text-center space-y-3">
              <ShieldCheck className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-serif font-bold text-base">Sanction Request Logged!</h4>
              <p className="text-xs text-emerald-800 leading-relaxed font-sans">
                Our property registrar officer has created an appointment block for you. We will email confirmation within 1 business hour.
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-xs font-semibold text-amber-600 hover:text-amber-700 underline"
              >
                Send another consultation block
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Dr. Amit Goel"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-950 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="amit@goelclinic.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-950 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-1.5">
                  How can we assist you?
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="E.g., I am interested in acquiring a luxury row house in Pune and would like title deed details."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-950 focus:bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-3 rounded-lg text-sm transition-all shadow cursor-pointer text-center"
              >
                Schedule Legal Consultation Block
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
