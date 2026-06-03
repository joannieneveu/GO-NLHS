import { useState } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wind, PlayCircle, Activity, Zap, ExternalLink } from 'lucide-react';
import { ERAS_INFORMATION } from '../data';

export default function SurgeryTab() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-300">
            <Wind size={24} />
          </div>
          <div>
            <h2 className="text-3xl tracking-tight font-serif">Peri-operative Care & ERAS</h2>
            <p className="text-sm text-slate-500">Enhanced Recovery After Surgery — designed to help you prepare and heal faster.</p>
          </div>
        </div>
      </div>

      {/* Main ERAS Content */}
      <div className="glass-card p-8 border-rose-500/20 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 space-y-8">
          <h3 className="text-4xl mb-4 font-serif">{ERAS_INFORMATION.title}</h3>
          <p className="text-lg text-slate-300 mb-6 leading-relaxed max-w-3xl italic font-light">
            "{ERAS_INFORMATION.description}"
          </p>

          {/* Interactive Step Switcher */}
          <div className="flex border-b border-white/5 gap-1 p-1 bg-obsidian rounded-xl max-w-xl">
            {ERAS_INFORMATION.sections.map((section, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`flex-1 py-3 text-center rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeStep === idx 
                    ? 'bg-rose-500/15 text-rose-300 shadow-lg' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <h4 className="text-2xl text-slate-200 font-serif">
                {ERAS_INFORMATION.sections[activeStep].title} Milestones
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ERAS_INFORMATION.sections[activeStep].points.map((point, idx) => {
                  return (
                    <div 
                      key={idx}
                      className="p-5 rounded-xl border border-white/5 bg-white/5 text-slate-300 flex items-start gap-4"
                    >
                      <div className="mt-1.5 flex items-center justify-center w-2.5 h-2.5 rounded-full bg-rose-400 shrink-0 shadow-[0_0_8px_rgba(251,113,133,0.5)]" />
                      <div className="flex-1 space-y-1">
                        <span className="font-light text-sm leading-relaxed">{point}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Auxiliary Care Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Official Video & Educational Platforms */}
        <div className="lg:col-span-7 glass-card p-8 group border-indigo-500/10 hover:border-indigo-500/20 transition-all bg-slate-900/10">
          <h3 className="text-2xl mb-4 font-serif flex items-center gap-2">
            <PlayCircle size={24} className="text-rose-455 animate-pulse" /> Official Patient Video & Educational portals
          </h3>
          <p className="text-xs text-slate-450 mb-6 leading-relaxed">
            We actively coordinate your anesthesia and recovery with modern evidence-based materials. Click on any specialized resource below to view educational videos, interactive worksheets, and factsheets compiled by leading international clinical societies:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <a 
              href="https://precare.ca/healthcare-guides/gynecological-surgery/" 
              target="_blank" 
              rel="noreferrer"
              className="p-4 rounded-xl bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/10 hover:border-indigo-500/30 transition-all flex flex-col justify-between group/link"
            >
              <div>
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-[8px] font-mono text-indigo-300 uppercase tracking-widest font-bold">precare.ca guide</span>
                <h4 className="text-sm font-semibold text-slate-200 mt-2 font-serif group-hover/link:text-indigo-200">Gynecological Surgery Videos</h4>
                <p className="text-[11px] text-slate-450 font-light mt-1.5 leading-relaxed">
                  Excellent clinical animation guiding you through bowel preps, deep breathing exercises, and step-by-step hospital admissions.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs text-indigo-300 font-mono font-semibold">
                Open Precare Video <ExternalLink size={12} />
              </div>
            </a>

            <a 
              href="https://connected.sgo.org/content/eras-patient-education-factsheet-and-video" 
              target="_blank" 
              rel="noreferrer"
              className="p-4 rounded-xl bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/10 hover:border-rose-500/30 transition-all flex flex-col justify-between group/link"
            >
              <div>
                <span className="px-2 py-0.5 rounded bg-rose-500/10 text-[8px] font-mono text-rose-300 uppercase tracking-widest font-bold">SGO Patient Portal</span>
                <h4 className="text-sm font-semibold text-slate-200 mt-2 font-serif group-hover/link:text-rose-200">SGO ERAS Patient Factsheet & Video</h4>
                <p className="text-[11px] text-slate-455 font-light mt-1.5 leading-relaxed">
                  Society of Gynecologic Oncology (SGO) official factsheet detailing pain blocks, catheter limits, and patient-centered healing targets.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs text-rose-300 font-mono font-semibold">
                View SGO Factsheet <ExternalLink size={12} />
              </div>
            </a>
          </div>

          <div className="p-4.5 rounded-xl bg-slate-950 border border-slate-900/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider block">official medical consensus</span>
              <h5 className="text-xs font-bold text-slate-200 font-serif">ERAS® Society Obstetrics & Gynaecology Guidelines</h5>
              <p className="text-[11px] text-slate-450 font-light leading-relaxed max-w-lg">
                Access the official peer-reviewed clinical guidelines published by the ERAS® Society specifying standard elements for gynaecological oncological procedures.
              </p>
            </div>
            <a 
              href="https://erassociety.org/specialty/gynaecology/" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-slate-100 rounded-lg text-xs font-mono border border-slate-800 transition-colors shrink-0"
            >
              ERAS Society Portal <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Right Column: Educational deep dives */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 bg-indigo-500/5 hover:border-indigo-500/20 transition-colors border border-indigo-500/10">
            <div className="flex items-center gap-2 text-indigo-300 font-serif mb-2">
              <Activity size={18} />
              <h4 className="text-lg">Early Mobility Importance</h4>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs font-light">
              Sitting upright, transferring to a bedside chair, and walking down ward corridors within hours after waking form the cornerstone of the ERAS framework. Maintaining mobility prevents pulmonary fluid stagnation, blocks deep-vein thrombosis (DVT) clots, and stimulates natural digestive motility to avoid opioid-induced bowel paralysis.
            </p>
          </div>

          <div className="glass-card p-6 hover:border-rose-500/20 transition-colors border border-white/5">
            <div className="flex items-center gap-2 text-rose-300 font-serif mb-2">
              <Zap size={18} />
              <h4 className="text-lg">Precare Preparation Concepts</h4>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs font-light">
              According to Precare, pre-surgical carbohydrate loading and hydration profiles minimize surgical stress, optimize muscle tissue hydration, and substantially prevent standard post-anesthetic nausea and headaches, supporting an immediate transition to a standard menu after waking.
            </p>
          </div>
        </div>
      </div>

      {/* Video Overlay Modal mock */}
      {showVideoModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="bg-obsidian border border-slate-700 w-full max-w-2xl rounded-2xl overflow-hidden p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs p-1 px-2.5 bg-rose-500/10 text-rose-300 rounded font-bold uppercase">Learning Portal</span>
              <button 
                onClick={() => setShowVideoModal(false)}
                className="text-slate-400 hover:text-slate-200 text-sm font-mono"
              >
                ✕ Close
              </button>
            </div>
            <h4 className="text-2xl font-serif mb-2">Gynecologic Surgery Preparation Guide</h4>
            <p className="text-xs text-slate-400 mb-6">Learn how pre-op drinks, pain management, and early bedside exercise protect your recovery.</p>
            
            <div className="aspect-video bg-black rounded-lg border border-white/5 flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="text-rose-400"><PlayCircle size={48} /></div>
              <p className="text-sm text-slate-300 max-w-md">Our integration portal will redirect you securely to the educational player at our sister site for immediate viewing.</p>
              <a
                href="https://www.jgh.ca/patients-visitors/gynecologic-oncology-patient-information/treatments/robotic-assisted-surgery/gynecology-surgery-guide-eras/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-500/90 text-white rounded-lg text-xs font-bold uppercase tracking-wider"
              >
                Open Official Video Player <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
