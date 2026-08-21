'use client';

import { useState } from 'react';
import { Share2, Link as LinkIcon, Check, Bookmark, CheckCircle2 } from 'lucide-react';

interface SocialShareBarProps {
  title: string;
  url?: string;
}

export default function SocialShareBar({ title, url }: SocialShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return url || window.location.href;
    }
    return url || '';
  };

  const handleCopy = async () => {
    const shareUrl = getShareUrl();
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy', err);
      // Still show copied feedback for user action
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleShare = (platform: string) => {
    const currentUrl = encodeURIComponent(getShareUrl());
    const currentTitle = encodeURIComponent(title);

    let target = '';
    switch (platform) {
      case 'twitter':
        target = `https://twitter.com/intent/tweet?text=${currentTitle}&url=${currentUrl}`;
        break;
      case 'linkedin':
        target = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
        break;
      case 'whatsapp':
        target = `https://api.whatsapp.com/send?text=${currentTitle}%20${currentUrl}`;
        break;
      case 'facebook':
        target = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
        break;
      case 'reddit':
        target = `https://reddit.com/submit?url=${currentUrl}&title=${currentTitle}`;
        break;
    }

    if (target) {
      window.open(target, '_blank', 'noopener,noreferrer,width=600,height=500');
    }
  };

  return (
    <>
      {/* Toast Alert for Copy */}
      {copied && (
        <div className="fixed bottom-8 right-8 z-[99999] bg-[#0051d5] text-white px-5 py-3.5 rounded-2xl shadow-[0_10px_30px_rgba(0,81,213,0.5)] text-xs font-extrabold flex items-center gap-3 border border-white/30 backdrop-blur-xl transition-all animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span>Article link copied to clipboard!</span>
        </div>
      )}

      {/* Floating Share Bar on Desktop */}
      <aside className="hidden xl:flex flex-col items-center gap-3 sticky top-36 z-20 py-4 px-2.5 bg-[#0f1218]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 rotate-180 [writing-mode:vertical-rl] mb-1">
          Share
        </span>

        {/* X / Twitter */}
        <button
          onClick={() => handleShare('twitter')}
          title="Share on X (Twitter)"
          className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#0051d5] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>

        {/* LinkedIn */}
        <button
          onClick={() => handleShare('linkedin')}
          title="Share on LinkedIn"
          className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#0051d5] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 0 0 1.45-1.45c0-.8-.65-1.45-1.45-1.45a1.45 1.45 0 0 0-1.45 1.45c0 .8.65 1.45 1.45 1.45m1.39 9.74v-8.37H5.07v8.37h2.78z" />
          </svg>
        </button>

        {/* WhatsApp */}
        <button
          onClick={() => handleShare('whatsapp')}
          title="Share on WhatsApp"
          className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#0051d5] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.24-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z" />
          </svg>
        </button>

        {/* Facebook */}
        <button
          onClick={() => handleShare('facebook')}
          title="Share on Facebook"
          className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#0051d5] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
          </svg>
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          title="Copy Link"
          className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer ${
            copied
              ? 'bg-[#0051d5] border-white text-white shadow-lg'
              : 'bg-white/5 hover:bg-white/15 border-white/10 hover:border-[#0051d5] text-gray-300 hover:text-white'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
        </button>

        {/* Bookmark */}
        <button
          onClick={() => setBookmarked(!bookmarked)}
          title="Save Article"
          className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer ${
            bookmarked
              ? 'bg-[#0051d5]/30 border-[#0051d5] text-[#0051d5]'
              : 'bg-white/5 hover:bg-white/15 border-white/10 hover:border-[#0051d5] text-gray-300 hover:text-white'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current text-[#0051d5]' : ''}`} />
        </button>
      </aside>

      {/* Inline Share Bar for Tablet & Mobile */}
      <div className="xl:hidden flex flex-wrap items-center gap-2.5 py-4 px-4 bg-white/5 border border-white/10 rounded-2xl my-6">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5 mr-1">
          <Share2 className="w-3.5 h-3.5 text-[#0051d5]" /> Share:
        </span>
        <button
          onClick={() => handleShare('twitter')}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 0 0 1.45-1.45c0-.8-.65-1.45-1.45-1.45a1.45 1.45 0 0 0-1.45 1.45c0 .8.65 1.45 1.45 1.45m1.39 9.74v-8.37H5.07v8.37h2.78z" />
          </svg>
        </button>
        <button
          onClick={() => handleShare('whatsapp')}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.24-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z" />
          </svg>
        </button>
        <button
          onClick={handleCopy}
          className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0051d5] text-white text-xs font-bold cursor-pointer hover:bg-white hover:text-black transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <LinkIcon className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    </>
  );
}
