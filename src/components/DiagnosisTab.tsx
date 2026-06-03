import { useState } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Stethoscope, CheckCircle2, Heart, HelpCircle, Sparkles } from 'lucide-react';
import { DIAGNOSES } from '../data';

export default function DiagnosisTab() {
  const [selectedId, setSelectedId] = useState<string>('ovarian');

  const currentDx = DIAGNOSES.find(d => d.id === selectedId) || DIAGNOSES[0];

  // Visual pathways based on cancer type
  const pathwayStepsByDx: Record<string, { title: string; desc: string; links?: { text: string; url: string }[] }[]> = {
    ovarian: [
      { 
        title: "Phase One: Diagnostic Workup", 
        desc: "CT-scan, initial bloodwork with tumor markers, such as CA 125; occasionally, a pelvic MRI is necessary." 
      },
      { 
        title: "Phase Two: Treatment Planning", 
        desc: "Expert assessment for primary cytoreductive surgery vs. neoadjuvant chemotherapy." 
      },
      { 
        title: "Phase Three: Adjuvant Chemotherapy", 
        desc: "Combining precise surgery with modern platinum-based chemotherapy to target microscopic areas." 
      },
      { 
        title: "Phase Four: Maintenance and Recovery", 
        desc: "Recovery from the fatigue of this journey can take 6 months to a year." 
      },
      { 
        title: "Phase Five: Living & Healing", 
        desc: "Learning to live with this chapter in our life, the fear of the cancer coming back, and the impact it has on our relationships with friends, kids, partners, parents, etc.",
        links: [
          { text: "Between Two Kingdoms (Link to Amazon)", url: "https://www.amazon.ca/Between-Two-Kingdoms-Memoir-Interrupted/dp/0593236998/" },
          { text: "Picking Up the Pieces: Moving Forward after Surviving Cancer (Link to Amazon)", url: "https://www.amazon.ca/Picking-Up-Pieces-Forward-Surviving/dp/0813540364/" }
        ]
      }
    ],
    endometrial: [
      { 
        title: "Phase One: Confirm Diagnosis", 
        desc: "Your diagnosis will be confirmed on pathology with an endometrial biopsy done by your gynecologist. You will then need imaging and bloodwork." 
      },
      { 
        title: "Phase Two: Surgery & Sentinel Node Mapping", 
        desc: "85% are done by robotic or laparoscopy. Hysterectomy and bilateral salpingo-oophorectomy (tubes and ovaries) performed using narrow camera-guided precision arms. Advanced fluorescent green or blue sentinel lymph node imaging (SLN) is integrated directly into the surgery to map lymph pathways and reduce post-operative complications." 
      },
      { 
        title: "Phase Three: Adjuvant Treatment", 
        desc: "You will meet with a physician at 4 weeks post-operatively to review the findings and decide if you need adjuvant treatment (radiation or systemic treatment)." 
      },
      { 
        title: "Phase Four: Survivorship & Recovery", 
        desc: "You will have regular follow-up. It is important to address menopausal symptoms, sexual dysfunction, weight management, etc." 
      }
    ],
    cervical: [
      { title: "Phase One: Direct Colposcopy", desc: "Staining and microscopic confirmation of target areas to assess scope with depth diagnostics." },
      { title: "Phase Two: Oncological Staging", desc: "Detailed MRI and/or PET scanning to check lymph structures and map a highly customized regional therapy route." },
      { title: "Phase Three: Treatment", desc: "Advanced surgical options (such as radical hysterectomy) for eligible stages, or parallel cisplatin-based chemotherapy coupled with localized radiation." },
      { title: "Phase Four: Surveillance", desc: "Regular clinical checks and continuous patient support pathways to sustain recovery confidence." }
    ],
    vulvar: [
      { 
        title: "Phase One: Diagnostic Mapping", 
        desc: "Local assessment and superficial biopsy to establish cell grade and margin boundaries with accuracy. Physical examination of the groin lymph nodes (LN) and imaging." 
      },
      { 
        title: "Phase Two: Surgery & Lymph Node Assessment", 
        desc: "Expert conservative local excision designed to preserve healthy regional tissues and maximize physical function while aiming to obtain a negative margin. Groin sentinel lymph node biopsy is offered to protect limb drainage if possible; otherwise, a complete lymphadenectomy is completed." 
      },
      { 
        title: "Phase Three: Adjuvant Therapy", 
        desc: "If surgical margins are close or positive, we will either attempt to resect again or offer vulvar radiation therapy. If groin lymph nodes are positive on pathology, you may be offered further groin dissection or pelvic radiation." 
      },
      { 
        title: "Phase Four: Surveillance", 
        desc: "There is a risk of recurrence, especially if there is an underlying skin condition (such as lichen sclerosus) or HPV infection. You will be followed closely every 3 months with a physical examination." 
      }
    ]
  };

  const steps = pathwayStepsByDx[selectedId] || pathwayStepsByDx.ovarian;

  return (
    <div className="space-y-12">
      {/* Tab Selector Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-300">
            <Stethoscope size={24} />
          </div>
          <div>
            <h2 className="text-3xl tracking-tight font-serif">Diagnosis & Care Pathway</h2>
            <p className="text-sm text-slate-500">Select a diagnosis to explore treatment steps, post-care pathways, and prepare your questions.</p>
          </div>
        </div>

        {/* Diagnosis tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-4">
          {DIAGNOSES.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedId(d.id)}
              className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                selectedId === d.id
                  ? 'bg-rose-500/10 border-rose-500/40 text-rose-200 shadow-xl shadow-rose-950/10'
                  : 'bg-white/5 border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/25 hover:bg-white/10'
              }`}
            >
              {selectedId === d.id && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 to-indigo-400" />
              )}
              <div className="font-serif text-lg leading-tight mb-1">{d.title}</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{d.subtitle}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedId}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Left Column: Diagnosis details */}
          <div className="lg:col-span-12 space-y-6">
            <div className="glass-card p-8 border-rose-500/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl" />
              <span className="text-xs font-bold uppercase tracking-widest text-rose-400/80">{currentDx.subtitle}</span>
              <h3 className="text-3xl mt-1 mb-4 font-serif">{currentDx.title} Overview</h3>
              <p className="text-slate-300 leading-relaxed text-lg font-light mb-6">
                {currentDx.description}
              </p>

              {/* Ovarian cancer facts card */}
              {selectedId === 'ovarian' && (
                <div className="mb-6 p-5 bg-gradient-to-br from-indigo-950/20 to-rose-950/20 border border-indigo-500/10 rounded-xl space-y-4">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-rose-300 flex items-center gap-2">
                    📊 Important Ovarian Cancer Facts
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5 shadow-inner">
                      <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 block mb-1.5">Histological Subtypes</span>
                      <p className="text-[11px] text-slate-300 leading-relaxed font-light font-sans">
                        There are various distinct biological subtypes of ovarian cancer, each with unique clinical behaviors and personalized treatment approaches. <span className="text-slate-100 font-medium">Ask your physician which specific subtype is identified in your pathology report.</span>
                      </p>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5 shadow-inner">
                      <span className="text-xs font-semibold uppercase tracking-wider text-rose-300 block mb-1.5">Clinical 80% General Stats</span>
                      <ul className="text-[11px] text-slate-300 space-y-1 font-light leading-relaxed font-sans">
                        <li className="flex items-start gap-1">
                          <span className="text-rose-450 mt-0.5">•</span>
                          <span><strong className="text-rose-300 font-medium">80%</strong> of patients present with high-grade serous carcinoma (most common).</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <span className="text-rose-450 mt-0.5">•</span>
                          <span><strong className="text-rose-300 font-medium">80%</strong> of patients present with advanced disease (Stage III or IV).</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <span className="text-rose-450 mt-0.5">•</span>
                          <span><strong className="text-rose-300 font-medium">80%</strong> of patients are highly responsive to initial platinum chemotherapy.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5 shadow-inner">
                      <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 block mb-1.5">Genetic Screening</span>
                      <p className="text-[11px] text-slate-300 leading-relaxed font-light font-sans">
                        Up to <strong className="text-indigo-200 font-medium">20%</strong> of ovarian cancers are linked to inherited genetic variants (e.g., BRCA1/BRCA2). Every patient diagnosed with epithelial ovarian cancer will be offered comprehensive <span className="text-indigo-300 font-medium">genetic screening</span>.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Endometrial cancer anatomy card */}
              {selectedId === 'endometrial' && (
                <div className="mb-6 p-5 bg-gradient-to-br from-rose-950/20 to-indigo-950/20 border border-rose-500/10 rounded-xl space-y-4">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-rose-300 flex items-center gap-2">
                    📂 Endometrial Anatomy & Inner Lining
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-5 flex justify-center bg-slate-950/60 p-4 rounded-xl border border-white/5 select-none overflow-hidden shrink-0">
                      {/* Real generated high-quality illustration representing Uterus & Endometrium */}
                      <img 
                        src="/uterus_diagram.png" 
                        alt="Endometrial Anatomy & Inner Lining" 
                        referrerPolicy="no-referrer"
                        className="w-full max-w-[150px] h-auto rounded-lg border border-white/10 shadow-md shadow-rose-950/40 hover:scale-[1.03] transition-transform duration-300"
                      />
                    </div>
                    <div className="md:col-span-7 space-y-2">
                      <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-widest block">Anatomical Insight</span>
                      <h5 className="text-sm font-bold text-slate-100 font-serif font-semibold">What is the Endometrium?</h5>
                      <p className="text-[12px] text-slate-300 leading-relaxed font-light">
                        The <strong className="text-rose-300 font-medium">endometrium</strong> is the inner mucous membrane lining of the uterus. Each month, it grows and thickens to prepare for potential pregnancy, shedding during menstruation if pregnancy does not occur.
                      </p>
                      <p className="text-[12px] text-slate-300 leading-relaxed font-light">
                        Uterine or endometrial cancers begin directly inside this fragile active lining due to atypical cellular changes, resulting in early alerts like post-menopausal spotting or bleeding.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t border-white/5 pt-6 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-rose-300 mb-4 flex items-center gap-2">
                    <CheckCircle2 size={16} /> Management & Care Program
                  </h4>
                  {selectedId === 'ovarian' ? (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-3.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                        <div>
                          <strong className="text-emerald-400 font-serif text-base tracking-tight block mb-1">Cytoreductive Debulking Surgery</strong>
                          <p className="text-xs text-slate-300 font-light leading-relaxed">Specialized surgical procedures aiming to remove all visible tumor mass from the abdomen and pelvis to achieve optimal cytoreduction.</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex items-start gap-3.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
                        <div>
                          <strong className="text-indigo-400 font-serif text-base tracking-tight block mb-1">Chemotherapy</strong>
                          <p className="text-xs text-slate-300 font-light leading-relaxed">Systemic treatment, typically standard platinum-based combinations (such as Carboplatin and Paclitaxel) to eradicate microscopic cancer cells.</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-3.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                        <div>
                          <strong className="text-amber-400 font-serif text-base tracking-tight block mb-1">Maintenance</strong>
                          <p className="text-xs text-slate-300 font-light leading-relaxed">
                            Either a <strong className="text-amber-300 font-semibold">PARP inhibitor</strong> (such as Olaparib or Niraparib) based on genetic and somatic biomarkers, or <strong className="text-amber-300 font-semibold">Bevacizumab</strong> (based on high-risk characteristics).
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : selectedId === 'cervical' ? (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex items-start gap-3.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                        <div>
                          <strong className="text-indigo-300 font-serif text-base tracking-tight block mb-1">Diagnostic/Excision Loops</strong>
                          <p className="text-xs text-slate-300 font-light leading-relaxed">LEEP or Cone biopsies designed for pre-malignant changes or very early-stage.</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-3.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.15)]" />
                        <div>
                          <strong className="text-emerald-400 font-serif text-base tracking-tight block mb-1">Advanced Radical Hysterectomy</strong>
                          <p className="text-xs text-slate-300 font-light leading-relaxed">
                            <strong className="text-slate-100 font-semibold">Precise surgical excision tailored for specific stages of cancer.</strong> Not all cervical cancer are candidate for surgery.
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 flex items-start gap-3.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                        <div>
                          <strong className="text-purple-300 font-serif text-base tracking-tight block mb-1">Combined Chemoradiation (without surgery)</strong>
                          <p className="text-xs text-slate-300 font-light leading-relaxed">Parallel platinum-based care and localized radiation designed for advanced stage cancer.</p>
                        </div>
                      </div>

                      <div className="p-4 bg-amber-500/5 border border-amber-500/15 rounded-xl text-xs text-amber-300 font-light leading-relaxed flex items-start gap-2.5 shadow-[0_0_12px_rgba(245,158,11,0.05)] mt-4">
                        <span className="text-lg leading-none select-none">⚠️</span>
                        <span><strong>Warning box:</strong> We try to avoid requiring both surgery and radiation as they increase complications without improving outcomes. If we anticipate the need for radiation, we will offer chemo/radiation upfront.</span>
                      </div>
                    </div>
                  ) : selectedId === 'vulvar' ? (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-3.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.15)]" />
                        <div>
                          <strong className="text-emerald-405 font-serif text-base tracking-tight block mb-1 text-emerald-400">Vulvectomy</strong>
                          <p className="text-xs text-slate-300 font-light leading-relaxed">Precise surgical removal of the vulvar lesion along with healthy surrounding tissue margins to save healthy regional tissues and safeguard physical functions.</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex items-start gap-3.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
                        <div>
                          <strong className="text-indigo-300 font-serif text-base tracking-tight block mb-1">Lymph Node Assessment</strong>
                          <p className="text-xs text-slate-300 font-light leading-relaxed">
                            We offer <strong className="text-slate-100 font-semibold">sentinel lymph node mapping</strong> of the groin nodes to guide optimal staging and protect limb drainage. If you are not a candidate for mapping, a complete groin lymphadenectomy is completed.
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 flex items-start gap-3.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                        <div>
                          <strong className="text-purple-300 font-serif text-base tracking-tight block mb-1">Targeted Adjuvant Therapy</strong>
                          <p className="text-xs text-slate-300 font-light leading-relaxed">Specialized radiation is offered if surgical margins require extra safety or if groin lymph nodes are found positive on pathology.</p>
                        </div>
                      </div>

                      <div className="p-4 bg-rose-500/5 border border-rose-500/15 rounded-xl text-xs text-rose-300 font-light leading-relaxed flex items-start gap-2.5 shadow-[0_0_12px_rgba(244,63,94,0.05)] mt-4">
                        <span className="text-lg leading-none select-none">ℹ️</span>
                        <span><strong>Wound Care & Secondary Intention Advice:</strong> Healing after surgery takes time. Approximately <strong>40% of patients experience partial wound breakdown</strong>, which is a fairly common and manageable part of recovery. We recommend keeping a close eye out for signs of infection (fever, redness, warmth, or drainage) and letting the wounds slowly mend by secondary intention (natural healing from the inside out) with warm water washes and cool air-drying.</span>
                      </div>
                    </div>
                  ) : selectedId === 'endometrial' ? (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-3.5 shadow-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                        <div>
                          <strong className="text-emerald-400 font-serif text-base tracking-tight block mb-1">Staging Hysterectomy</strong>
                          <p className="text-xs text-slate-300 font-light leading-relaxed">Removal of uterus, fallopian tubes and ovaries with targeted lymph node staging (sentinel lymph nodes).</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex items-start gap-3.5 shadow-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-300 mt-2 shrink-0 shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
                        <div>
                          <strong className="text-indigo-300 font-serif text-base tracking-tight block mb-1">Minimally Invasive Surgery</strong>
                          <p className="text-xs text-slate-300 font-light leading-relaxed">85% of our surgeries are done on the DaVinci robotic platform or with advanced laparoscopy.</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 flex items-start gap-3.5 shadow-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                        <div>
                          <strong className="text-purple-300 font-serif text-base tracking-tight block mb-1">Optional Adjuvant Treatment</strong>
                          <p className="text-xs text-slate-300 font-light leading-relaxed">Certain patients will require post-operative pelvic radiation, brachytherapy, or systemic treatment (chemotherapy or immunotherapy).</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {currentDx.management.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2.5 shrink-0" />
                          <p className="leading-relaxed font-light">{item}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="border-t border-white/5 pt-6">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-indigo-300 mb-3 flex items-center gap-2">
                    <Heart size={16} /> Recovery Journey & Expectations
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed font-light pl-6 border-l-2 border-indigo-500/20 italic">
                    {currentDx.recovery}
                  </p>
                </div>

                {/* Primary vs. Interval pathways diagram for ovarian cancer */}
                {selectedId === 'ovarian' && (
                  <div className="mt-8 border-t border-white/5 pt-6 space-y-5">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-rose-300 flex items-center gap-2">
                      🗺️ Primary vs. Interval Treatment Schemes (Equivalent Pathways)
                    </h4>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      Both pathways can offer equivalent therapeutic efficacy. Your surgical team will evaluate which strategy is safest and most effective for your precise clinical staging:
                    </p>

                    {/* Highly Professional Equivalence Ribbon */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-rose-500/15 justify-between">
                      <div className="flex items-center gap-2.5 text-left">
                        <span className="text-xl">📊</span>
                        <div>
                          <h5 className="text-xs font-semibold text-slate-100 font-sans">Equivalence of Pathways</h5>
                          <p className="text-[10px] text-slate-400 font-light leading-relaxed">Both options provide medically comparable outcomes and overall survival rates. Choice depends on patient safety and tumor boundaries.</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono px-2.5 py-1 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 uppercase tracking-widest font-bold shrink-0">
                        Physician Guided Pathways
                      </span>
                    </div>

                    {/* Grid Comparison */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                      
                      {/* Option 1 Card */}
                      <div className="p-5 bg-slate-950/50 rounded-2xl border border-white/5 flex flex-col justify-between space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-sans font-semibold text-emerald-400 uppercase tracking-widest">
                              Pathway Option #1
                            </span>
                            <span className="text-[9px] font-mono text-slate-500">Traditional Order</span>
                          </div>
                          
                          <h5 className="font-sans font-semibold text-sm text-slate-100 tracking-wide mb-1">Primary Surgery Route</h5>
                          <p className="text-[10px] text-slate-400 font-light leading-normal mb-5">Initial surgical clearance followed by complete systemic treatment.</p>

                          {/* Vertical Flow Steps */}
                          <div className="relative border-l-2 border-emerald-500/15 pl-6 ml-3 space-y-6">
                            {/* Step 1 */}
                            <div className="relative">
                              <span className="absolute -left-[33px] top-0.5 w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center justify-center text-xs">
                                1
                              </span>
                              <div>
                                <h6 className="text-xs font-semibold text-slate-250 font-sans mb-0.5">Primary Surgery</h6>
                                <p className="text-[10px] text-slate-400 leading-relaxed font-light">Oncological resection to remove all visible tumor masses safely prior to drug therapy.</p>
                              </div>
                            </div>

                            {/* Step 2 */}
                            <div className="relative">
                              <span className="absolute -left-[33px] top-0.5 w-6 h-6 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-355 font-semibold flex items-center justify-center text-xs">
                                2
                              </span>
                              <div>
                                <h6 className="text-xs font-semibold text-slate-250 font-sans mb-0.5">Chemotherapy (x6 cycles)</h6>
                                <p className="text-[10px] text-slate-400 leading-relaxed font-light font-sans">Full systemic adjuvant course using standard platinum-based schedules.</p>
                              </div>
                            </div>

                            {/* Step 3 */}
                            <div className="relative">
                              <span className="absolute -left-[33px] top-0.5 w-6 h-6 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-semibold flex items-center justify-center text-xs">
                                3
                              </span>
                              <div>
                                <h6 className="text-xs font-semibold text-slate-250 font-sans mb-0.5">+/- Maintenance Therapy</h6>
                                <p className="text-[10px] text-slate-400 leading-relaxed font-light">Targeted molecular maintenance (PARP inhibitors relative to genetic indications).</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Option 2 Card */}
                      <div className="p-5 bg-slate-950/50 rounded-2xl border border-white/5 flex flex-col justify-between space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="px-2 py-0.5 rounded bg-purple-500/15 border border-purple-500/20 text-[10px] font-sans font-semibold text-purple-300 uppercase tracking-widest">
                              Pathway Option #2
                            </span>
                            <span className="text-[9px] font-mono text-slate-500">Neoadjuvant Approach</span>
                          </div>

                          <h5 className="font-sans font-semibold text-sm text-slate-100 tracking-wide mb-1">Interval Surgery Route</h5>
                          <p className="text-[10px] text-slate-400 font-light leading-normal mb-5">Initial drug cycles to reduce tumor burden, then surgery and further cycles.</p>

                          {/* Vertical Flow Steps */}
                          <div className="relative border-l-2 border-purple-500/15 pl-6 ml-3 space-y-6">
                            {/* Step 1 */}
                            <div className="relative">
                              <span className="absolute -left-[33px] top-0.5 w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-semibold flex items-center justify-center text-xs">
                                1
                              </span>
                              <div>
                                <h6 className="text-xs font-semibold text-slate-250 font-sans mb-0.5">Chemotherapy (x3-4 cycles)</h6>
                                <p className="text-[10px] text-slate-400 leading-relaxed font-light">Initial neoadjuvant cycles intended to shrink tumor bulk and improve patient safety.</p>
                              </div>
                            </div>

                            {/* Step 2 */}
                            <div className="relative">
                              <span className="absolute -left-[33px] top-0.5 w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center justify-center text-xs">
                                2
                              </span>
                              <div>
                                <h6 className="text-xs font-semibold text-slate-250 font-sans mb-0.5">Interval Debulking Surgery</h6>
                                <p className="text-[10px] text-slate-400 leading-relaxed font-light">Mid-course surgical excision targeting remaining visual tumors.</p>
                              </div>
                            </div>

                            {/* Step 3 */}
                            <div className="relative">
                              <span className="absolute -left-[33px] top-0.5 w-6 h-6 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-semibold flex items-center justify-center text-xs">
                                3
                              </span>
                              <div>
                                <h6 className="text-xs font-semibold text-slate-250 font-sans mb-0.5">Chemotherapy</h6>
                                <span className="block text-[10px] text-indigo-300 font-mono font-bold mt-0.5">x3 cycles</span>
                                <p className="text-[10px] text-slate-400 leading-relaxed font-light mt-1.5">Concluding rounds of chemotherapy to eliminate lingering microscopic active cells.</p>
                              </div>
                            </div>

                            {/* Step 4 */}
                            <div className="relative">
                              <span className="absolute -left-[33px] top-0.5 w-6 h-6 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-semibold flex items-center justify-center text-xs">
                                4
                              </span>
                              <div>
                                <h6 className="text-xs font-semibold text-slate-250 font-sans mb-0.5">+/- Maintenance Therapy</h6>
                                <p className="text-[10px] text-slate-400 leading-relaxed font-light">Targeted agents configured to genetic markers for ongoing disease-free protection.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    
                    <div className="p-4 bg-amber-500/5 border border-amber-500/15 rounded-xl text-xs text-amber-300 font-light leading-relaxed flex items-start gap-2 shadow-[0_0_12px_rgba(245,158,11,0.05)] mt-4">
                      <span className="text-amber-400 font-semibold">⚠️ Path Confirmation Requirement:</span>
                      <span>If Option #2 is chosen, the ovarian cancer diagnosis must first be confirmed, ideally by a tissue diagnosis (<strong className="text-slate-100 font-bold">ultrasound-guided biopsy</strong> or <strong className="text-slate-100 font-bold">diagnostic laparoscopy</strong>), before starting neoadjuvant chemotherapy.</span>
                    </div>
                  </div>
                )}

                {/* Intraperitoneal Chemotherapy Option section */}
                {selectedId === 'ovarian' && (
                  <div className="mt-8 border-t border-white/5 pt-6 space-y-4">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-teal-300 flex items-center gap-2">
                      💉 Intraperitoneal (IP) Chemotherapy Option
                    </h4>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      In certain clinical circumstances, standard intravenous (IV) chemotherapy may be augmented by delivering drugs directly into the abdominal cavity (intraperitoneal chemotherapy). This concentrates therapeutic doses precisely where cancer cells are most likely to reside:
                    </p>
                    
                    <div className="p-5 bg-teal-500/5 rounded-xl border border-teal-500/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                      <div className="lg:col-span-5 flex justify-center bg-slate-950/60 p-4 rounded-xl border border-white/5 overflow-hidden shrink-0">
                        {/* Real generated high-quality illustration representing Dual IV + IP Chemotherapy */}
                        <img 
                          src="/ip_chemo.png" 
                          alt="Dual IV + IP Chemotherapy Delivery" 
                          referrerPolicy="no-referrer"
                          className="w-full max-w-[170px] h-auto rounded-lg border border-white/10 shadow-md shadow-teal-950/40 hover:scale-[1.03] transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="lg:col-span-7 space-y-3">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-widest block">Combined Infusion Method</span>
                          <h5 className="text-xs font-bold text-slate-100 font-serif">Dual Delivery: IV + IP Chemotherapy</h5>
                        </div>
                        <p className="text-[11px] text-slate-350 leading-relaxed font-light">
                          A small, round device called a <strong>peritoneal access port</strong> is surgically placed just under your skin, connected to a thin <strong>catheter</strong> that directs medicine into your <strong>peritoneal (abdominal) space</strong>. 
                        </p>
                        <p className="text-[11px] text-slate-355 leading-relaxed font-light">
                          During sessions, you receive chemotherapy both intravenously (into your bloodstream through your arm or chest port) and intraperitoneally (warm medication infused into the abdomen via the peritoneal port). The liquid stays in contact with abdominal surfaces to eradicate lingering cells directly.
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/25 text-[11px] font-sans text-teal-200">
                          <span className="text-sm select-none">ℹ️</span>
                          <span className="font-light">Talk to your surgeon to see if IP chemo is a suitable candidate for your treatment plan.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step-by-Step Pathway Accordion/Timeline */}
            <div className="glass-card p-8 border-white/5">
              <h4 className="text-xl mb-6 font-serif flex items-center gap-2 text-slate-100">
                <Sparkles size={20} className="text-indigo-300" /> Phase-by-Phase Treatment Timeline
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {steps.map((step, idx) => (
                  <div key={idx} className="p-5 bg-white/5 rounded-xl border border-white/5 hover:border-indigo-500/10 transition-colors relative group flex flex-col justify-between">
                    <div>
                      <div className="absolute top-4 right-4 text-xs font-mono font-bold text-slate-500 px-2 py-0.5 bg-white/5 rounded-full">
                        PHASE {idx + 1}
                      </div>
                      <h5 className="font-serif text-lg text-rose-200 mb-2 mr-16">{step.title}</h5>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">{step.desc}</p>
                    </div>
                    {step.links && step.links.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
                        <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Recommended Reading:</span>
                        {step.links.map((link, lIdx) => (
                          <a 
                            key={lIdx} 
                            href={link.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="block text-xs text-indigo-300 hover:text-indigo-200 underline font-light leading-snug"
                          >
                            {link.text}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
