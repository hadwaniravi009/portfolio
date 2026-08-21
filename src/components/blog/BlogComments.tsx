'use client';

import { useState } from 'react';
import { MessageSquare, Send, CornerDownRight, CheckCircle2, User } from 'lucide-react';

interface CommentItem {
  id: string;
  author: string;
  date: string;
  avatarColor: string;
  content: string;
  replyTo?: string;
}

const INITIAL_COMMENTS: CommentItem[] = [
  {
    id: '1',
    author: 'Alex Morgan',
    date: '2 days ago',
    avatarColor: 'from-blue-600 to-indigo-600',
    content:
      'Great breakdown of token architecture! How do you handle dark mode variant tokens across multi-brand enterprise setups?',
  },
  {
    id: '2',
    author: 'Ravi Hadwani',
    date: '1 day ago',
    avatarColor: 'from-[#0051d5] to-cyan-500',
    replyTo: 'Alex Morgan',
    content:
      'Thanks Alex! We recommend semantic aliases mapped to CSS custom variables at the root theme level so theme toggles swap variables without mutating component props.',
  },
];

export default function BlogComments({ postTitle }: { postTitle: string }) {
  const [comments, setComments] = useState<CommentItem[]>(INITIAL_COMMENTS);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newComment: CommentItem = {
        id: Date.now().toString(),
        author: name.trim(),
        date: 'Just now',
        avatarColor: 'from-emerald-500 to-teal-600',
        content: commentText.trim(),
        replyTo: replyingTo || undefined,
      };

      setComments((prev) => [...prev, newComment]);
      setName('');
      setEmail('');
      setCommentText('');
      setReplyingTo(null);
      setIsSubmitting(false);
      setSubmitted(true);

      setTimeout(() => setSubmitted(false), 4000);
    }, 600);
  };

  return (
    <section className="bg-[#0f1218]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-xl my-12">
      {/* Comments Header */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0051d5]/20 border border-[#0051d5]/40 flex items-center justify-center text-[#0051d5]">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">Discussion & Feedback</h3>
            <p className="text-xs text-gray-400">
              {comments.length} {comments.length === 1 ? 'Thought' : 'Thoughts'} on this insight
            </p>
          </div>
        </div>
      </div>

      {/* Comments Thread List */}
      <div className="space-y-5 mb-10">
        {comments.map((item) => {
          const isAuthor = item.author.toLowerCase().includes('ravi');
          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all ${
                item.replyTo ? 'ml-6 sm:ml-12 border-[#0051d5]/30 bg-[#0051d5]/[0.03]' : 'border-white/10 bg-white/[0.02]'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.avatarColor} flex items-center justify-center font-bold text-white text-xs shadow-md`}
                  >
                    {item.author.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{item.author}</h4>
                      {isAuthor && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase bg-[#0051d5] text-white">
                          Author
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-500">{item.date}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setReplyingTo(item.author);
                    const formEl = document.getElementById('comment-form');
                    formEl?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-[#0051d5] hover:text-white flex items-center gap-1 transition-colors"
                >
                  <CornerDownRight className="w-3.5 h-3.5" />
                  <span>Reply</span>
                </button>
              </div>

              {item.replyTo && (
                <div className="text-[11px] font-semibold text-[#0051d5] mb-2 flex items-center gap-1.5 bg-[#0051d5]/10 px-2.5 py-1 rounded-md w-fit">
                  <span>Replying to</span>
                  <span className="font-bold">@{item.replyTo}</span>
                </div>
              )}

              <p className="text-sm text-gray-300 leading-relaxed">{item.content}</p>
            </div>
          );
        })}
      </div>

      {/* Leave a Reply Form */}
      <div id="comment-form" className="pt-6 border-t border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base font-extrabold text-white">
            {replyingTo ? `Leave a Reply to @${replyingTo}` : 'Leave a Comment'}
          </h4>
          {replyingTo && (
            <button
              onClick={() => setReplyingTo(null)}
              className="text-xs text-gray-400 hover:text-white underline"
            >
              Cancel Reply
            </button>
          )}
        </div>

        {submitted && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>Thank you! Your comment has been posted successfully.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                Your Name <span className="text-[#0051d5]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ravi Hadwani"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/15 focus:border-[#0051d5] rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#0051d5] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                Email Address <span className="text-gray-500">(Will not be published)</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/15 focus:border-[#0051d5] rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#0051d5] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">
              Your Comment <span className="text-[#0051d5]">*</span>
            </label>
            <textarea
              required
              rows={4}
              placeholder="Share your thoughts, architecture tips, or questions..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full bg-white/5 border border-white/15 focus:border-[#0051d5] rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#0051d5] transition-all resize-y"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0051d5] hover:bg-white hover:text-black text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Posting Comment...' : 'Post Comment'}</span>
          </button>
        </form>
      </div>
    </section>
  );
}
