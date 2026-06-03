import { useState, useEffect } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, Send, Heart, Calendar, Plus, MessageSquare } from 'lucide-react';
import { STORIES_OF_HOPE } from '../data';
import { StoryOfHope } from '../types';

export default function HopeTab() {
  const [stories, setStories] = useState<StoryOfHope[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newDiagnosis, setNewDiagnosis] = useState('general');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');

  // Load from local storage or baseline
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nlhs_hope_stories');
      if (saved) {
        setStories(JSON.parse(saved));
      } else {
        setStories(STORIES_OF_HOPE);
      }
    } catch (e) {
      setStories(STORIES_OF_HOPE);
    }
  }, []);

  const saveStories = (updated: StoryOfHope[]) => {
    setStories(updated);
    try {
      localStorage.setItem('nlhs_hope_stories', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleFlowerClick = (storyId: number) => {
    const updated = stories.map(s => {
      if (s.id === storyId) {
        return { ...s, flowersCount: (s.flowersCount || 0) + 1 };
      }
      return s;
    });
    saveStories(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newText.trim()) return;

    const newStory: StoryOfHope = {
      id: Date.now(),
      title: newTitle.trim(),
      text: newText.trim(),
      author: newAuthor.trim() || "Anonymized Companion",
      flowersCount: 1,
      date: new Date().toISOString().split('T')[0],
      diagnosis: newDiagnosis
    };

    const updated = [newStory, ...stories];
    saveStories(updated);

    // Reset Form
    setNewTitle('');
    setNewText('');
    setNewAuthor('');
    setNewDiagnosis('general');
    setShowForm(false);
    setMessage('Your letter of hope was added to the sanctuary. Thank you for sharing your strength.');
    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-300">
            <BookOpen size={24} />
          </div>
          <div>
            <h2 className="text-3xl tracking-tight font-serif">Stories of Hope</h2>
            <p className="text-sm text-slate-500">A comfort journal shared by patients who walked this pathway before you.</p>
          </div>
        </div>

        {/* Share Story Toggle Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 hover:bg-rose-500/20 text-xs font-semibold uppercase tracking-wider transition-all shrink-0 flex items-center gap-2"
        >
          <Plus size={16} /> <span>{showForm ? 'Close Editor' : 'Share My Story'}</span>
        </button>
      </div>

      {messagesBlock(message)}

      {/* Share Word of Hope Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="glass-card p-6 border-rose-500/20 bg-rose-500/5 space-y-4 mb-8">
              <h4 className="text-2xl font-serif text-rose-200">Share Your Strength</h4>
              <p className="text-xs text-slate-400">Write an open letter of encouragement, reassurance, or clinical tips that helped you during your treatment at NLHS.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Theme / Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g., Finding Peace in the Steps"
                    className="w-full p-3 rounded-xl bg-obsidian border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-rose-450"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">My Initials / Nom-de-plume</label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g., Patient J. or St. John's Survivor"
                    className="w-full p-3 rounded-xl bg-obsidian border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-rose-450"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">My Pathway / Diagnosis</label>
                  <select
                    value={newDiagnosis}
                    onChange={(e) => setNewDiagnosis(e.target.value)}
                    className="w-full p-3 rounded-xl bg-obsidian border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-rose-450 appearance-none font-sans"
                  >
                    <option value="general">🌸 General Reassurance</option>
                    <option value="ovarian">🌸 Ovarian Care Plan</option>
                    <option value="endometrial">🌸 Endometrial Care Plan</option>
                    <option value="cervical">🌸 Cervical Care Plan</option>
                    <option value="vulvar">🌸 Vulvar Care Plan</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">My Message to Future Patients</label>
                <textarea
                  required
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="What would you have liked to hear when you first entered the clinic? Share comforting advice, breathing loops, or general reassurance..."
                  className="w-full h-32 p-4 rounded-xl bg-obsidian border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-rose-450 font-light"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-rose-500 hover:bg-rose-400 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 shadow-lg"
              >
                <Send size={14} /> Send Letter to the Board
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visual Category Filters for Hope Stories */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
          Filter Comfort Letters by Pathway:
        </span>
        <div className="flex flex-wrap gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Letters' },
            { id: 'general', label: 'General' },
            { id: 'ovarian', label: 'Ovarian' },
            { id: 'endometrial', label: 'Endometrial' },
            { id: 'cervical', label: 'Cervical' },
            { id: 'vulvar', label: 'Vulvar' }
          ].map(pill => (
            <button
              key={pill.id}
              onClick={() => setSelectedFilter(pill.id)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedFilter === pill.id
                  ? 'bg-rose-500/20 border border-rose-500/40 text-rose-200'
                  : 'bg-white/5 border border-transparent text-slate-450 hover:text-slate-200'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stories list */}
      <div className="space-y-8 relative">
        <div className="glow-rose top-1/3 left-10 opacity-30" />
        
        {stories
          .filter(s => {
            if (selectedFilter === 'all') return true;
            return (s.diagnosis || 'general') === selectedFilter;
          })
          .map((s, idx) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="glass-card p-8 lg:p-10 relative overflow-hidden group hover:border-rose-500/20 transition-all duration-300"
            >
              {/* Quote decoration */}
              <div className="absolute top-2 right-4 text-7xl font-serif text-white/5 select-none pointer-events-none group-hover:text-rose-500/5 transition-colors">
                “
              </div>

              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl text-rose-200 italic font-serif leading-tight">{s.title}</h3>
                  <p className="text-slate-350 leading-relaxed font-light font-sans text-base">
                    {s.text}
                  </p>

                  {/* Left meta */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-t border-white/5 max-w-xl">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-slate-400 font-mono">{s.author}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    <span className="flex items-center gap-1"><Calendar size={13} /> {s.date}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-705 bg-slate-700" />
                    <span className="px-2.5 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-300 border border-rose-500/20 font-sans">
                      {s.diagnosis === 'ovarian' && 'Ovarian care'}
                      {s.diagnosis === 'endometrial' && 'Endometrial care'}
                      {s.diagnosis === 'cervical' && 'Cervical care'}
                      {s.diagnosis === 'vulvar' && 'Vulvar care'}
                      {(!s.diagnosis || s.diagnosis === 'general') && 'General comfort'}
                    </span>
                  </div>
                </div>

              {/* Interaction Panel */}
              <div className="md:border-l border-white/5 md:pl-8 flex flex-col items-center justify-center min-w-[120px] pt-4 md:pt-0 shrink-0 self-stretch">
                <button
                  onClick={() => handleFlowerClick(s.id)}
                  className="group/btn flex flex-col items-center gap-2 p-4 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/15 rounded-2xl transition-all w-full select-none"
                >
                  <motion.div
                    whileTap={{ scale: 1.3, rotate: 15 }}
                    className="text-2xl text-rose-400 group-hover/btn:text-rose-300 font-serif"
                  >
                    🌸
                  </motion.div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover/btn:text-slate-200">Plant a Flower</span>
                  <span className="text-rose-300 text-sm font-mono font-bold pt-1 border-t border-rose-500/10 w-full text-center">
                    {s.flowersCount || 0} Bloomed
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function messagesBlock(message: string) {
  if (!message) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-sm italic font-light flex items-center gap-2"
    >
      <Sparkles size={16} /> {message}
    </motion.div>
  );
}
