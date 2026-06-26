import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Phone, User, MessageSquare } from 'lucide-react';
import { addEnquiry } from '../supabaseClient';

interface EnquiryFormProps {
  propertyId: string;
  propertyTitle: string;
}

export default function EnquiryForm({ propertyId, propertyTitle }: EnquiryFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(`Hi, I am interested in "${propertyTitle}". Please share more details and scheduling availability.`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await addEnquiry({
        name: name.trim(),
        phone: phone.trim(),
        message: message.trim(),
        property_id: propertyId,
        property_title: propertyTitle
      });
      setSubmitStatus('success');
      setName('');
      setPhone('');
    } catch (err) {
      console.error('Enquiry submission failed:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-md overflow-hidden">
      {/* Banner Title */}
      <div className="bg-[#FAFAF8] text-slate-800 p-5 border-b border-slate-200">
        <h3 className="font-serif font-bold text-lg text-emerald-950">Request Property Details</h3>
        <p className="text-xs text-slate-500 mt-1 font-sans">
          Receive pricing cards, floor plans, and digital brochures instantly.
        </p>
      </div>

      {/* Form Content */}
      <div className="p-6">
        {submitStatus === 'success' ? (
          <div className="bg-emerald-50 text-emerald-900 p-5 rounded-lg border border-emerald-100 flex flex-col items-center text-center space-y-3 animate-fadeIn">
            <CheckCircle className="w-10 h-10 text-emerald-600 shrink-0" />
            <h4 className="font-serif font-bold text-base">Enquiry Submitted Successfully!</h4>
            <p className="text-xs text-emerald-800 font-sans leading-relaxed">
              Thank you for contacting us. Our registered property relations expert will call you shortly on your provided contact.
            </p>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 underline mt-2"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Field 1: Name */}
            <div>
              <label className="block text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-500" />
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-950 focus:bg-white"
              />
            </div>

            {/* Field 2: Phone */}
            <div>
              <label className="block text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                Phone Number *
              </label>
              <input
                type="tel"
                required
                pattern="[0-9+ \-]{10,15}"
                placeholder="Enter 10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-950 focus:bg-white"
              />
            </div>

            {/* Field 3: Message */}
            <div>
              <label className="block text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-1.5 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                Personal Message *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Ask about floor plans, payment schedules, etc."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-950 focus:bg-white resize-none"
              />
            </div>

            {/* Error handling */}
            {submitStatus === 'error' && (
              <div className="bg-red-50 text-red-900 text-xs p-3 rounded-lg border border-red-100 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>Failed to record enquiry. Please try again.</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-emerald-950 font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <span>Submitting request...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Enquiry & Connect</span>
                </>
              )}
            </button>

          </form>
        )}
      </div>
    </div>
  );
}
