import { useState } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Phone, Heart, Shield, HelpCircle, Star } from 'lucide-react';
import { TEAM_MEMBERS, ADMIN_CONTACTS } from '../data';
import { TeamMember } from '../types';

export default function TeamTab() {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (name: string) => {
    setImageErrors(prev => ({ ...prev, [name]: true }));
  };

  const getInitials = (name: string) => {
    return name
      .replace('Dr. ', '')
      .split(' ')
      .map(part => part[0])
      .join('');
  };

  // --- Clinical Subgroups Filtering based on user requirements ---
  const surgeonsOncologists = TEAM_MEMBERS.filter(m => 
    m.name === "Dr. Joannie Neveu" || m.name === "Dr. Patti Power" || m.name === "Dr. Hesham Sait"
  );
  const gynecologists = TEAM_MEMBERS.filter(m => 
    m.name === "Dr. Claire Elliott"
  );
  const gpOncology = TEAM_MEMBERS.filter(m => 
    m.name === "Dr. Carla Saldanha"
  );
  const rns = TEAM_MEMBERS.filter(m => 
    m.name === "Amy Moore"
  );
  const pharmacists = TEAM_MEMBERS.filter(m => 
    m.name === "Nadine Glynn"
  );

  const groups = [
    {
      sectionTitle: "Medical Team",
      logo: "🩺",
      showIf: filterCategory === 'all' || filterCategory === 'doctors',
      subsections: [
        {
          groupLabel: "Surgeon / Oncologist",
          members: surgeonsOncologists,
          themeBadge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
        },
        {
          groupLabel: "Gynecologist",
          members: gynecologists,
          themeBadge: "bg-pink-500/10 text-pink-300 border-pink-500/20"
        },
        {
          groupLabel: "GP oncology",
          members: gpOncology,
          themeBadge: "bg-amber-500/10 text-amber-300 border-amber-500/20"
        }
      ]
    },
    {
      sectionTitle: "Health Allied",
      logo: "🤝",
      showIf: filterCategory === 'all' || filterCategory === 'clinical_support',
      subsections: [
        {
          groupLabel: "RN - Amy",
          members: rns,
          themeBadge: "bg-teal-500/10 text-teal-300 border-teal-500/20"
        },
        {
          groupLabel: "Pharmacist - Nadine Glynn",
          members: pharmacists,
          themeBadge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
        }
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-300">
            <Users size={24} />
          </div>
          <div>
            <h2 className="text-3xl tracking-tight font-serif">Meet Your Care Team</h2>
            <p className="text-sm text-slate-500">A structured clinical multidisciplinary family co-managing your active recovery and oncology goals.</p>
          </div>
        </div>

        {/* Categories Selector */}
        <div className="flex border border-white/10 rounded-xl p-1 bg-obsidian max-w-sm shrink-0">
          {[
            { id: 'all', label: 'All Team' },
            { id: 'doctors', label: 'Medical Team' },
            { id: 'clinical_support', label: 'Health Allied' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-rose-500/20 text-rose-300'
                  : 'text-slate-500 hover:text-slate-350 hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Structured Rendering of Subgroups */}
      <div className="space-y-16">
        {groups.map((sect, sectIdx) => {
          if (!sect.showIf) return null;
          return (
            <div key={sectIdx} className="space-y-10 border-t border-white/5 pt-10 first:border-0 first:pt-0">
              {/* Section Header */}
              <div className="flex items-center gap-2">
                <span className="text-2xl">{sect.logo}</span>
                <h3 className="text-3xl font-serif text-slate-200 tracking-tight">{sect.sectionTitle}</h3>
              </div>

              {/* Subsections */}
              <div className="space-y-12">
                {sect.subsections.map((sub, subIdx) => {
                  if (sub.members.length === 0) return null;
                  return (
                    <div key={subIdx} className="space-y-6">
                      <div className="flex items-center gap-3">
                        <h4 className="text-lg font-mono font-bold uppercase tracking-wider text-slate-200">{sub.groupLabel}</h4>
                        {!(sub.groupLabel.toLowerCase().includes("gp") || sub.groupLabel.toLowerCase().includes("rn") || sub.groupLabel.toLowerCase().includes("pharmacist") || sub.groupLabel.toLowerCase().includes("gyn")) && (
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase border ${sub.themeBadge}`}>
                            Protocol Role Group
                          </span>
                        )}
                      </div>

                      {/* Members Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                          {sub.members.map((m, mIdx) => {
                            const hasError = !!imageErrors[m.name];
                            return (
                              <motion.div
                                key={m.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, delay: mIdx * 0.05 }}
                                className="glass-card group overflow-hidden border-white/5 hover:border-rose-500/35 transition-all duration-300 flex flex-col h-full hover:shadow-2xl hover:shadow-rose-950/5 bg-slate-900/10"
                              >
                                {/* Photo frame */}
                                <div className="aspect-[3/4] relative overflow-hidden bg-slate-800">
                                  {!hasError && (
                                    <img 
                                      src={m.image.startsWith('http') ? m.image : `/${m.image}`} 
                                      alt={m.name} 
                                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                      onError={() => handleImageError(m.name)}
                                      referrerPolicy="no-referrer"
                                    />
                                  )}
                                  {hasError && (
                                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-gradient-to-br from-slate-900 to-slate-950">
                                      <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-300 font-serif text-2xl border border-rose-500/20 shadow-lg shadow-rose-950/20">
                                        {getInitials(m.name)}
                                      </div>
                                      <p className="text-xs text-slate-400 font-medium">Care Professional</p>
                                    </div>
                                  )}
                                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-65" />
                                </div>

                                {/* Info block */}
                                <div className="p-6 flex flex-col flex-1">
                                  <h4 className="text-2xl font-serif mb-1 group-hover:text-rose-150 transition-colors">{m.name}</h4>
                                  <p className="text-rose-455 text-[10px] font-bold uppercase tracking-wider mb-3 leading-snug">{m.role}</p>
                                  
                                  {m.bio && (
                                    <p className="text-xs text-slate-400 font-light leading-relaxed italic mb-5 flex-1">
                                      "{m.bio}"
                                    </p>
                                  )}
                                  
                                  {m.phone && (
                                    <div className="border-t border-white/5 pt-4 flex items-center gap-2 text-indigo-350 text-xs">
                                      <Phone size={13} /> 
                                      <span className="font-mono font-medium">{m.phone}</span>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Admin and Clinic Access */}
      <div className="mt-16 glass-card p-8 border-indigo-500/10 relative overflow-hidden bg-gradient-to-br from-slate-900/40 to-slate-950/40">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="flex items-center gap-3 mb-6 relative">
          <Phone size={24} className="text-indigo-400" />
          <h3 className="text-2xl font-serif">Clinical Support & Scheduling Coordination</h3>
        </div>
        <p className="text-sm text-slate-400 font-light max-w-3xl leading-relaxed mb-8">
          Melanie and Tayler manage all appointment bookings, referrals, and diagnostic results coordinates. For rescheduling, follow-up queues, or routine administrative questions, call their direct offices below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {ADMIN_CONTACTS.map((admin, idx) => (
            <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all group hover:border-indigo-500/20">
              <div>
                <p className="font-serif text-2xl text-slate-200 mb-1">{admin.name}</p>
                <p className="text-xs text-rose-400 uppercase tracking-widest font-bold">{admin.role}</p>
              </div>
              <a 
                href={`tel:${admin.phone}`} 
                className="mt-4 md:mt-0 px-4 py-2 bg-indigo-500/15 border border-indigo-500/30 rounded-xl text-indigo-200 hover:bg-indigo-500/25 transition-colors text-sm hover:text-indigo-100 flex items-center gap-2"
              >
                <Phone size={16} className="group-hover:animate-pulse shrink-0" />
                <span className="font-mono">{admin.phone}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Multidisciplinary Approach Note */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-white/5 text-center md:text-left">
        <div className="p-5 space-y-2 bg-white/5 rounded-xl border border-transparent hover:border-white/5 transition-colors">
          <Shield size={24} className="text-rose-400 mx-auto md:mx-0" />
          <h5 className="font-serif text-lg">Integrated Tumor Board</h5>
          <p className="text-xs text-slate-500 leading-relaxed font-light">Every high-grade or recurrent cancer case is presented in a weekly board of surgeons, radiotherapists, pathologists, and nurses to establish custom guidelines.</p>
        </div>

        <div className="p-5 space-y-2 bg-white/5 rounded-xl border border-transparent hover:border-white/5 transition-colors">
          <Heart size={24} className="text-indigo-400 mx-auto md:mx-0" />
          <h5 className="font-serif text-lg">Dedicated GP Care</h5>
          <p className="text-xs text-slate-500 leading-relaxed font-light">Dr. Carla Saldanha and Dr. Claire Elliott provide primary follow-up loops so patients always have accessible contacts between active treatments.</p>
        </div>

        <div className="p-5 space-y-2 bg-white/5 rounded-xl border border-transparent hover:border-white/5 transition-colors">
          <Star size={24} className="text-yellow-400/80 mx-auto md:mx-0" />
          <h5 className="font-serif text-lg">Oncology Pharmacists</h5>
          <p className="text-xs text-slate-500 leading-relaxed font-light">Nadine Glynn provides specialized drug interaction support, clinical grade assessments, and side effect control plans directly in our clinic environment.</p>
        </div>
      </div>
    </div>
  );
}
