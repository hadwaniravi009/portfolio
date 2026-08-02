'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit} suppressHydrationWarning>
      {subscribed ? (
        <div className="p-3 rounded-xl bg-white/20 text-white text-xs font-bold text-center">
          Thank you for subscribing!
        </div>
      ) : (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            required
            suppressHydrationWarning
            className="w-full bg-black/20 border border-white/30 rounded-xl px-4 py-3 text-sm placeholder:text-white/50 text-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            suppressHydrationWarning
            className="w-full bg-white text-[#0051d5] font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl hover:bg-gray-100 transition-colors shadow-md"
          >
            Subscribe Now
          </button>
        </>
      )}
    </form>
  );
}
