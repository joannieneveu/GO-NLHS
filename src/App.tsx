/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Stethoscope, 
  Users, 
  BookOpen, 
  Phone, 
  Info, 
  Wind,
  FlaskConical,
  Sparkles,
  Scale
} from 'lucide-react';
import { TEAM_MEMBERS } from './data';

// Import our interactive, modular components
import DiagnosisTab from './components/DiagnosisTab';
import SurgeryTab from './components/SurgeryTab';
import TrialsTab from './components/TrialsTab';
import TeamTab from './components/TeamTab';
import HopeTab from './components/HopeTab';
import ResourcesTab from './components/ResourcesTab';
import BariatricHubTab from './components/BariatricHubTab';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [quoteIdx, setQuoteIdx] = useState(0);

  const healingQuotes = [
    "The flower that blooms in adversity is the most rare and beautiful of all.",
    "Quiet roads lead to steady recovery. Healing is a journey of patient, small steps taken together.",
    "Your cellular resilience is supported by a care network of professionals standing beside you every minute.",
    "Hope is the anchor of the soul, steady and secure on stormy seas."
  ];

  const triggerNextQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % healingQuotes.length);
  };

  const navItems = [
    { id: 'home', label: 'Welcome', icon: Heart },
    { id: 'diagnosis', label: 'Diagnosis & Care', icon: Stethoscope },
    { id: 'surgery', label: 'Surgery & ERAS', icon: Wind },
    { id: 'trials', label: 'Clinical Trials', icon: FlaskConical },
    { id: 'bariatric', label: 'Bariatric Hub', icon: Scale },
    { id: 'team', label: 'Our Team', icon: Users },
    { id: 'hope', label: 'Stories of Hope', icon: BookOpen },
    { id: 'resources', label: 'Resources & FAQ', icon: Info },
  ];

  return (
    <div className="min-h-screen pb-32 bg-obsidian text-slate-300 selection:bg-rose-500/30">
      {/* Background Decorative Elements */}
      <div className="glow-rose top-20 left-10" />
      <div className="glow-indigo bottom-40 right-10" />
      
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 glass-card mx-4 mt-6 p-2 lg:max-w-4xl lg:mx-auto">
        <div className="flex overflow-x-auto no-scrollbar gap-1 p-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap text-sm font-medium ${
                activeTab === item.id 
                ? 'bg-rose-500/20 text-rose-200' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 mt-12 pb-24">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="space-y-12"
            >
              <header className="mb-16 text-center lg:text-left">
                <h1 className="text-5xl lg:text-7xl mb-2 leading-tight font-serif">
                  A Journey Taken <span className="text-rose-450">Together</span>
                </h1>
                <h2 className="text-xl lg:text-2xl font-serif text-slate-450 mb-6 uppercase tracking-widest leading-relaxed">
                  NLHS gynecologic oncology
                </h2>
                <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-light">
                  A comforting sanctuary for state-of-the-art information, clinical recovery guidelines, and shared courage.
                </p>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Doctor letter block */}
                <div className="lg:col-span-7 glass-card p-8 border-rose-500/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                    <Heart size={140} className="text-rose-400" />
                  </div>
                  <h3 className="text-2xl mb-4 italic font-serif text-rose-200">A Message from Dr. Neveu</h3>
                  <p className="text-lg leading-relaxed text-slate-300 italic font-light">
                    "When I see you in my clinic, I don't just see a diagnosis; I see a person with a story, a family, and a future. My philosophy is rooted in high-quality care delivered with genuine empathy. This guide is designed to be your companion, offering clarity during stressful times and a reminder that you are never alone in this journey."
                  </p>
                  <div className="mt-5 p-4 rounded-xl bg-slate-950/40 border border-white/5 space-y-1 bg-gradient-to-br from-indigo-950/5 via-slate-900/40 to-slate-950/80">
                    <h4 className="text-xs uppercase font-bold tracking-widest text-rose-350">
                      Our Clinical Practice Approach
                    </h4>
                    <p className="text-xs leading-relaxed text-slate-300 font-light font-sans">
                      As of April 2026, we have transitioned to a comprehensive team-based practice. Our <button onClick={() => setActiveTab('team')} className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-2 decoration-indigo-400/40 cursor-pointer inline-block bg-transparent border-0 p-0">multidisciplinary clinical team</button> works jointly to deliver the highest quality, evidence-based care in a timely fashion. This cohesive system avoids delays and guarantees that every professional and specialist is intimately familiar with all patient files. We regularly conduct tumor board discussions and review board rounds to consolidate our clinical insights, leaving no element of your therapeutic pathway unaddressed.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-4 border-t border-white/5 pt-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-rose-450/40">
                      <img 
                        src="/dr_Joannie_Neveu.png" 
                        alt="Dr. Neveu" 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600";
                        }}
                      />
                    </div>
                    <div>
                      <p className="font-serif text-slate-100 font-medium">{TEAM_MEMBERS[0].name}</p>
                      <p className="text-xs text-rose-450 font-semibold uppercase tracking-wider">Division Head - NLHS Gynecologic Oncology</p>
                    </div>
                  </div>
                </div>

                {/* Right side widgets sidebar */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  {/* Quotes flower block */}
                  <div className="glass-card p-6 flex flex-col justify-center border-rose-500/15 relative overflow-hidden bg-rose-500/5 min-h-[160px] group">
                    <div className="absolute top-3 right-3 text-lg opacity-40">🌸</div>
                    
                    <h4 className="text-lg mb-2 flex items-center gap-2 text-rose-200 font-serif">
                       <Wind size={18} className="text-rose-300 shrink-0" /> Healing Garden Thoughts
                    </h4>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <p className="text-slate-300 text-sm italic font-light leading-relaxed mb-4">
                        "{healingQuotes[quoteIdx]}"
                      </p>
                      <button
                        onClick={triggerNextQuote}
                        className="text-[10px] uppercase font-bold tracking-widest text-indigo-350 self-start group-hover:text-indigo-200 transition-colors"
                      >
                        Read Another Quote →
                      </button>
                    </div>
                  </div>

                  {/* Nav Card */}
                  <div 
                    onClick={() => setActiveTab('diagnosis')}
                    className="glass-card p-6 bg-gradient-to-br from-slate-900/60 to-slate-950/60 hover:from-slate-90% hover:to-slate-95% hover:bg-rose-500/10 hover:border-rose-500/20 transition-all cursor-pointer group"
                  >
                    <h4 className="text-xl mb-1 flex items-center gap-2 group-hover:text-rose-200 transition-colors font-serif">
                      Quick Pathway Guide <Sparkles size={16} className="text-indigo-300" />
                    </h4>
                    <p className="text-xs text-slate-500 mb-4 font-light">Explore specific surgical steps, rehabilitation advice, and safety criteria.</p>
                    <div className="flex flex-wrap gap-2">
                      {['Ovarian', 'Endometrial', 'Cervical', 'Vulvar'].map(t => (
                        <span key={t} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 group-hover:border-rose-500/15 text-[10px] text-rose-300 font-semibold font-sans tracking-wide">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'diagnosis' && (
            <motion.div key="diagnosis" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DiagnosisTab />
            </motion.div>
          )}

          {activeTab === 'surgery' && (
            <motion.div key="surgery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SurgeryTab />
            </motion.div>
          )}

          {activeTab === 'trials' && (
            <motion.div key="trials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <TrialsTab />
            </motion.div>
          )}

          {activeTab === 'bariatric' && (
            <motion.div key="bariatric" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <BariatricHubTab />
            </motion.div>
          )}

          {activeTab === 'team' && (
            <motion.div key="team" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <TeamTab />
            </motion.div>
          )}

          {activeTab === 'hope' && (
            <motion.div key="hope" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HopeTab />
            </motion.div>
          )}

          {activeTab === 'resources' && (
            <motion.div key="resources" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ResourcesTab />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Contact */}
      <footer className="fixed bottom-0 left-0 right-0 glass-card mx-4 mb-4 p-4 z-40 lg:max-w-4xl lg:mx-auto border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Newfoundland Health Services (NLHS)</p>
          <p className="text-xs text-rose-300 font-medium">Health Sciences Centre — St. John's, NL</p>
        </div>
        <div className="flex gap-4">
          <a href="tel:709-777-6564" className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs hover:bg-rose-500/20 transition-all font-semibold uppercase tracking-wider shrink-0">
            <Phone size={13} /> Call Reception Desk
          </a>
        </div>
      </footer>
    </div>
  );
}

