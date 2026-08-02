'use client';

import { useState } from 'react';
import { sendContactMessage } from '@/lib/wordpress';
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Full Website Build',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setResponseMsg('Please fill in all required fields.');
      return;
    }

    setStatus('submitting');
    try {
      const res = await sendContactMessage(formData);
      if (res.success) {
        setStatus('success');
        setResponseMsg(res.message || 'Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', projectType: 'Full Website Build', message: '' });
      } else {
        setStatus('error');
        setResponseMsg(res.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setResponseMsg('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white" id="contact">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column Info */}
        <div className="lg:col-span-5">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-[#0051d5] mb-2 block">
            Get In Touch
          </span>
          <h2 className="text-2xl xs:text-3xl md:text-5xl font-extrabold tracking-tight text-[#000000] mb-4 sm:mb-6 leading-tight">
            Let's build your next digital masterpiece.
          </h2>
          <p className="text-base sm:text-lg text-[#444748] mb-8 sm:mb-10 leading-relaxed font-normal">
            Have a project in mind or need assistance with frontend development, UI design, or headless WordPress architecture? Reach out and let's talk.
          </p>

          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3 sm:gap-4 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#f2f4f6] flex items-center justify-center text-[#0051d5] group-hover:bg-[#0051d5] group-hover:text-white transition-colors shrink-0">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-gray-400">Direct Email</p>
                <a href="mailto:hadwaniravi009@gmail.com" className="text-sm sm:text-lg font-bold text-[#000000] hover:text-[#0051d5] transition-colors truncate block">
                  hadwaniravi009@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#f2f4f6] flex items-center justify-center text-[#0051d5] group-hover:bg-[#0051d5] group-hover:text-white transition-colors shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-gray-400">Location</p>
                <p className="text-base sm:text-lg font-bold text-[#000000]">India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Form */}
        <div className="lg:col-span-7 bg-[#f8f9fb] p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-[#c4c7c7]/40 shadow-sm">
          {status === 'success' && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="text-sm font-medium">{responseMsg}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <p className="text-sm font-medium">{responseMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" suppressHydrationWarning>
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#444748]">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ravi Hadwani"
                required
                suppressHydrationWarning
                className="w-full bg-white border border-[#c4c7c7]/60 p-3.5 sm:p-4 rounded-xl focus:ring-2 focus:ring-[#0051d5] focus:border-transparent outline-none transition-all text-base sm:text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#444748]">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ravi@example.com"
                required
                suppressHydrationWarning
                className="w-full bg-white border border-[#c4c7c7]/60 p-3.5 sm:p-4 rounded-xl focus:ring-2 focus:ring-[#0051d5] focus:border-transparent outline-none transition-all text-base sm:text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2 md:col-span-2">
              <label className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#444748]">
                Project Type
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                suppressHydrationWarning
                className="w-full bg-white border border-[#c4c7c7]/60 p-3.5 sm:p-4 rounded-xl focus:ring-2 focus:ring-[#0051d5] focus:border-transparent outline-none transition-all text-base sm:text-sm appearance-none cursor-pointer"
              >
                <option value="Full Website Build">Full Website Build (Next.js + WordPress)</option>
                <option value="Frontend Development">Frontend Development (Next.js / React)</option>
                <option value="WordPress Development">Custom WordPress Theme / Plugin</option>
                <option value="UI/UX Design">UI/UX Design & Prototyping</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2 md:col-span-2">
              <label className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#444748]">
                Message *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your project goals, scope, and timeline..."
                rows={4}
                required
                suppressHydrationWarning
                className="w-full bg-white border border-[#c4c7c7]/60 p-3.5 sm:p-4 rounded-xl focus:ring-2 focus:ring-[#0051d5] focus:border-transparent outline-none transition-all text-base sm:text-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              suppressHydrationWarning
              className="md:col-span-2 bg-[#000000] text-white py-3.5 sm:py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#0051d5] transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-xs"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Let's Build Your Website</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
