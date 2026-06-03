import { useState } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Info, 
  HelpCircle, 
  Search, 
  ChevronDown, 
  CheckSquare, 
  Printer, 
  MapPin, 
  DownloadCloud, 
  Sparkles,
  BookOpen,
  FileText,
  Activity,
  Heart
} from 'lucide-react';
import { FAQS } from '../data';
import { FAQItem } from '../types';

// BCCA Chemotherapy & Regimen drugs directory data
const BCCA_DRUGS = [
  {
    name: 'Carboplatin',
    category: 'Platinum Alkylating Chemotherapy',
    indicativeUse: 'Primary treatment for Ovarian, Fallopian Tube, and Endometrial cancers.',
    administration: 'Delivered intravenously (IV) in outpatient cycles (typically scheduled every 3 to 4 weeks for 6 cycles).',
    sideEffects: [
      'Lowered blood cell counts (increased risk of infection, mild anemia, and minor bruising)',
      'Mild to moderate nausea or occasional vomiting (preventative anti-nausea medication is prescribed)',
      'Slight changes in hearing acuity, ear ringing, or copper taste sensations',
      'General fatigue and temporary muscle weakness onset post-cycle'
    ],
    selfCareTips: 'Monitor body temperature once daily during nadir (typically 10-14 days post-infusion). Avoid raw foods and crowded indoor places if white counts are severely depressed. Sip 2-3 liters of fluids daily to support kidney health.'
  },
  {
    name: 'Paclitaxel (Taxol)',
    category: 'Taxane Chemotherapy',
    indicativeUse: 'Often co-administered with Carboplatin for Endometrial, Ovarian, and Cervical cancers.',
    administration: 'Delivered intravenously (IV) via an infusion line over 3 hours in the clinic day unit.',
    sideEffects: [
      'Symmetric numbness, pins-and-needles, or burning in hands and feet (peripheral neuropathy)',
      'Joint aches, back stiffness, and widespread muscle pain occurring 2-3 days post-treatment',
      'Temporary hair thinning or complete loss across the scalp and body',
      'Mild flushing or skin sensations during baseline infusion intervals'
    ],
    selfCareTips: 'Wear warm gloves or thick wool socks to combat cold-induced neuropathy discomfort. Talk to your care team about using standard over-the-counter pain relievers for post-treatment skeletal aches. Treat hair gently with wide-toothed wooden combs.'
  },
  {
    name: 'Cisplatin',
    category: 'Platinum Chemotherapy & Radiosensitizer',
    indicativeUse: 'Mainly used concurrently with daily Pelvic External Beam Radiation for Cervical cancer.',
    administration: 'Delivered intravenously (IV) weekly immediately preceding scheduled daily radiation cycles.',
    sideEffects: [
      'Altered kidney function (nephrotoxicity) if clinical hydration is insufficient',
      'Severe exhaustion, metallic tastes, and loss of nutritional appetite',
      'Tinnitus (high-pitched ringing in ears) or minor hearing losses of high frequencies',
      'Delayed nausea if preventative anti-emetic medications are missed'
    ],
    selfCareTips: 'Strict clinical hydration is vital. Patients will receive IV protective saline fluids immediately before and after CISplatin in the clinic. Continue sipping waters, coconut water, or broths continuously at home. Weigh yourself daily to track fluid shifts.'
  },
  {
    name: 'Pegylated Liposomal Doxorubicin (Caelyx / Doxil)',
    category: 'Liposomal Anthracycline Chemotherapy',
    indicativeUse: 'Recurrent Ovarian cancer and advanced Gynecologic sarcomas.',
    administration: 'Delivered intravenously (IV) once every 4 weeks in the clinical daycare unit.',
    sideEffects: [
      'Hand-foot syndrome (redness, painful peeling, swelling, and severe skin tenderness on palms of hands and soles of feet)',
      'Mouth ulcers, sensitive gums, and oral clinical mucositis',
      'Moderate fatigue and temporary lowering of cardiac blood volume reserves'
    ],
    selfCareTips: 'Avoid running hot water on hands and feet during therapy; bathe with lukewarm water. Wear loose socks and highly cushioned shoes to avoid friction. Protect skin from sunburn. Cleanse oral passage with alcohol-free soothing rinses.'
  },
  {
    name: 'Pembrolizumab (Keytruda)',
    category: 'Monoclonal Antibody (Immunotherapy)',
    indicativeUse: 'Advanced endometrial/uterine cancer with mismatch repair deficiency (dMMR or MSI-H).',
    administration: 'Intravenous (IV) infusion over 30 minutes, usually scheduled every 3 or 6 weeks.',
    sideEffects: [
      'Immune-mediated side effects (rash-like inflammation in lungs, colon, liver, skin, or thyroid glands)',
      'General lethargy, dry skin patches, and mild itchiness',
      'Thyroid dysfunction (either hyperthyroidism or hypothyroidism)'
    ],
    selfCareTips: 'Report any new shortness of breath, continuous dry cough, severe diarrhea, or sudden vision changes to Dr. Neveu\'s coordinator immediately. Immunotherapies require separate steroid protocols if severe inflammation occurs.'
  },
  {
    name: 'Megestrol Acetate (Megace)',
    category: 'Progestin Hormone Therapy',
    indicativeUse: 'Conservative treatment for atypical endometrial hyperplasia or low-grade endometrial cancer (often for patients wishing to preserve fertility).',
    administration: 'Daily oral tablets taken at home.',
    sideEffects: [
      'Mild fluid retention, leg swelling, and weight gain',
      'Increased appetite and hot flashes',
      'Subtle increase in blood pressure or blood sugar levels'
    ],
    selfCareTips: 'Take tablets at the same time each day. Keep a record of any sudden weight gain due to water retention, and monitor blood pressure weekly.'
  }
];

// BCCA Patient Education PDF documents matching the uploaded files
const CANCER_PDFS = [
  {
    id: 'bcca-uterine',
    title: 'Uterine / Endometrial Cancer Information Booklet',
    fileName: 'BCCA_Uterine_Endometrial_Cancer_Patient_Guide.pdf',
    size: '1.4 MB',
    pages: '10 pages',
    category: 'Uterine / Endometrial',
    source: 'BC Cancer Agency — Provincial Health Services Authority (PHSA)',
    date: 'Revised Sept 2021',
    description: 'Specialist clinical publication explaining the biology of the uterus endometrium, early detection strategies, endometrial biopsy, ultrasound findings, surgery (Total Abdominal Hysterectomy & Bilateral Salpingo-Oophorectomy), adjunct pelvic radiation (External Beam & Brachytherapy), chemotherapy cycles, hormone alternatives, and long-term recovery guidelines.',
    clinicalHighlights: [
      'Identifies unusual vaginal bleeding, including postmenopausal or heavy intermenstrual flow, as the absolute key warning sign.',
      'Outlines routine diagnostic pathways: transvaginal ultrasound, in-office endometrial biopsy, and D&C.',
      'Explains pathological staging (Figo Stage I-IV) highlighting localized muscle invasion vs regional lymph node metastasis.',
      'Details primary Hysterectomy surgery and adjuvant pelvic radiation therapy options.'
    ]
  },
  {
    id: 'bcca-ovarian',
    title: 'Ovarian Cancer Information Booklet',
    fileName: 'BCCA_Ovarian_Cancer_Patient_Guide.pdf',
    size: '1.3 MB',
    pages: '10 pages',
    category: 'Ovarian / Fallopian Tube',
    source: 'BC Cancer Agency — Provincial Health Services Authority (PHSA)',
    date: 'Revised Sept 2021',
    description: 'Detailed patient manual focusing on warning signs (persistent bloating, abdominal/pelvic pain, early satiety during eating, and urinary urgency), blood-based tumor markers (CA 125, CEA), cytology, staging laparoscopy, extensive debulking cytoreductive surgeries (Hysterectomy, BSO, Omentectomy, lymphadenectomy), and platinum-based chemotherapy administration.',
    clinicalHighlights: [
      'Emphasizes subtle warning signs: persistent abdominal pressure, flatulence, quick fullness when eating, or unexplained urinary frequency.',
      'Explores the high-correlation of fallopian tube cellular precursors in up to 90% of ovarian cancer cases.',
      'Lists physical blood test evaluations (CA-125 / CEA) and diagnostic imaging workflows.',
      'Describes cytoreductive debulking operations and post-op systemic infusion cycles.'
    ]
  },
  {
    id: 'bcca-cervical',
    title: 'Cervical Cancer Information Booklet',
    fileName: 'BCCA_Cervical_Cancer_Patient_Guide.pdf',
    size: '1.5 MB',
    pages: '11 pages',
    category: 'Cervical',
    source: 'BC Cancer Agency — Provincial Health Services Authority (PHSA)',
    date: 'Revised Sept 2021',
    description: 'Official brochure outlining cervical pathology, HPV (Human Papillomavirus) high-risk vectors, vaccine safety (Gardasil), cervical tissue screening (Pap smear, colposcopy, biopsy), radical trachelectomy (fertility-sparing option), and concurrent chemo-radiation.',
    clinicalHighlights: [
      'Links HPV (Human Papillomavirus) strains to over 99% of cervical cancers and outlines preventative vaccine guidelines.',
      'Details screening schedules (Pap tests/co-testing) and colposcopy biopsy methods.',
      'Discusses fertility-sparing Radical Trachelectomy for early-stage candidates.',
      'Highlights cisplatin-sensitized pelvic radiation as standard treatment for advanced stages.'
    ]
  },
  {
    id: 'bcca-stepbystep',
    title: 'Taking It Step by Step - A Guide for Women Diagnosed with Gynecological Cancer',
    fileName: 'BCCA_Taking_it_Step_by_Step_Gynecological_Cancer_Guide.pdf',
    size: '4.6 MB',
    pages: '39 pages',
    category: 'Comprehensive Companion',
    source: 'BC Cancer Agency — BC Cancer Foundation Handbook',
    date: 'Revised Sept 2011',
    description: 'Comprehensive patient workbook designed to support readers from initial referral through survivorship. Contains dedicated chapters on clinical referral systems, deciphering pathology results, detailed surgery prep, emotional health, dealing with chemotherapy/radiation cycles, coping with structural body changes, dietary health, home support, and lists critical questions to ask your surgical oncologist.',
    clinicalHighlights: [
      'Chapters include: Understanding Diagnosis, Treatment Pathway & Timelines, pathology sheets, getting ready.',
      'Provides practical questions to ask your doctor, surgical checklists, and appointment journals.',
      'Focuses on somatic side-effects, emotional health, pelvic changes, fatigue, and recovery pacing.',
      'Features robust clinical sections on family planning, nutrition, and home support networks.'
    ]
  },
  {
    id: 'bcca-vaginal',
    title: 'Vaginal Cancer Information Booklet',
    fileName: 'BCCA_Vaginal_Cancer_Patient_Guide.pdf',
    size: '1.1 MB',
    pages: '9 pages',
    category: 'Vaginal',
    source: 'BC Cancer Agency — Provincial Health Services Authority (PHSA)',
    date: 'Revised Sept 2021',
    description: 'Clinical leaflet outlining vaginal anatomy, primary squamous cell carcinoma risks, clinical presentation (atypical discharge, post-coital spotting, palpable pelvic mass), speculum inspection, colposcopy biopsy, surgical resection variables, and highly specific intracavitary vaginal brachytherapy applicator regimens.',
    clinicalHighlights: [
      'Focuses on vaginal birth canal tissues, highlighting that primary vaginal lesions account for <1% of gynecologic malignancies.',
      'Lists key signs: post-coital spotting, watery discharge, and palpable pelvic lumps.',
      'Details physical diagnostic criteria using speculum examinations and colposcopy.',
      'Reviews pelvic external beam radiation paired with internal radioactive applicator insertions.'
    ]
  },
  {
    id: 'bcca-vulvar',
    title: 'Vulvar Cancer Information Booklet',
    fileName: 'BCCA_Vulvar_Cancer_Patient_Guide.pdf',
    size: '1.2 MB',
    pages: '8 pages',
    category: 'Vulvar',
    source: 'BC Cancer Agency — Provincial Health Services Authority (PHSA)',
    date: 'Revised Sept 2021',
    description: 'Expert brochure on vulvar skin health, chronic pruritus (itching) signs, white skin lesions (leukoplakia), diagnosis through local punch biopsy under local anesthesia, conservative Wide Local Excision (WLE), simple or radical partial vulvectomy, sentinel groin lymph node mapping, and groin/pelvis physical rehabilitation.',
    clinicalHighlights: [
      'Addresses vulvar skin margins, highlighting persistent local burning, itching, or leukoplakia white patches as main indicators.',
      'Explains diagnostic local punch biopsy and groin Sentinel Lymph Node mapping.',
      'Discusses modern conservative surgical margins (Wide Local Excision) to preserve crucial tissues.',
      'Outlines follow-up lymphatic monitoring to detect and manage lower-limb lymphedema.'
    ]
  },
  {
    id: 'bcca-gtn',
    title: 'Gestational Trophoblastic Neoplasia (GTN) Booklet',
    fileName: 'BCCA_Gestational_Trophoblastic_Neoplasia_Patient_Guide.pdf',
    size: '0.9 MB',
    pages: '7 pages',
    category: 'Pregnancy Related / GTN',
    source: 'BC Cancer Agency — Provincial Health Services Authority (PHSA)',
    date: 'Revised Sept 2021',
    description: 'Clinical manual focusing on molar pregnancies (complete and partial hydatidiform moles), gestational trophoblastic choriocarcinoma, suction D&C evacuation procedures, stringent monitoring of serial blood Beta-HCG titers, and highly sensitive single-agent chemotherapy drug regimens (e.g., Methotrexate) for persistent gestational trophoblastic disease.',
    clinicalHighlights: [
      'Covers rare placenta-like molar pregnancies and choriocarcinomas arising from pregnancy.',
      'Highlights the absolute necessity of serial weekly blood HCG hormone monitoring post-evacuation.',
      'Details suction dilation and curettage (D&C) procedures.',
      'Discusses the exceptionally high cure rate (>98%) using targeted chemotherapy for persistent disease.'
    ]
  },
  {
    id: 'bcca-fertility',
    title: 'Fertility and Cancer Guide',
    fileName: 'BCCA_Fertility_and_Cancer_Guide.pdf',
    size: '0.6 MB',
    pages: '2 pages',
    category: 'Preservation / Endocrine',
    source: 'BC Cancer Agency — Patient Support Handouts',
    date: 'Published June 2024',
    description: 'Focuses on fertility preservation protocols for young patients facing chemotherapeutic exposure or pelvic radiation. Topics address in-vitro oocyte/embryo cryopreservation timelines, coordination with specialized fertility endocrinologists, GnRH agonist suppression (Zoladex/Lupron) for temporary ovarian hibernation, and post-treatment safe family-planning parameters.',
    clinicalHighlights: [
      'Addresses treatment-induced premature ovarian insufficiency or permanent infertility risks.',
      'Details AMH (Anti-Müllerian Hormone) testing and antral follicle counts to assess reserves.',
      'Outlines egg and embryo cryopreservation schedules prior to surgical hysterectomies.',
      'Discusses gonadotropin-releasing hormone agonists to shield ovaries during active chemotherapy.'
    ]
  }
];

export default function ResourcesTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFaqs, setSelectedFaqs] = useState<Record<string, boolean>>({});
  const [showOrganizer, setShowOrganizer] = useState(false);
  const [resourceSubTab, setResourceSubTab] = useState<'faq' | 'drugs' | 'cancers'>('faq');

  // PDF Download Center States
  const [pdfSearchQuery, setPdfSearchQuery] = useState('');
  const [pdfCategory, setPdfCategory] = useState<string>('all');

  const downloadPdfGuide = (doc: typeof CANCER_PDFS[0]) => {
    const divider = '='.repeat(80);
    const line = '-'.repeat(80);
    const fileContent = `${divider}
BRITISH COLUMBIA CANCER AGENCY (BCCA) CLINICAL PATIENT GUIDE
${doc.title.toUpperCase()}
${divider}
Download File Reference: ${doc.fileName}
Format: Adobe PDF (Digital Handout Simulation)
Document Scale: ${doc.pages} | Download Size: ${doc.size}
Last Revision Stamp: ${doc.date}
Original Issuing Body: ${doc.source}
NLHS Clinical Division Lead: Dr. Joannie Neveu
Coordinating Staff contacts: Melanie Reardon / Tayler Carroll
${line}

ABOUT THIS CLINICAL GUIDE:
${doc.description}

ESSENTIAL PATIENT TAKEAWAYS & PROTOCOLS COVERED IN THIS BROCHURE:
${doc.clinicalHighlights.map((highlight, index) => `${index + 1}. [!] ${highlight}`).join('\n')}

${line}
HOW TO USE THIS HANDOUT IN AREA D CLINICS:
1. Print or download this document on your device for active consultation preparation.
2. Underline any clinical highlights that prompt symptoms you are currently experiencing.
3. Bring this brochure directly to your clinical appointment at Floor 4, Area D, St. John's Health Sciences Centre.
4. Go over each highlight directly during your review sessions with Dr. Neveu.

${line}
ADMINISTRATIVE PHONE CONTACTS (NLHS Gynecologic Oncology):
- Contact Coordinator 1 (Melanie Reardon): 709-777-4836
- Contact Coordinator 2 (Tayler Carroll): 709-777-6564
- Emergency On-Call Clinical Line (24/7): Dial 811 (NL Health Line) or seek the nearest Emergency Dept.

DISCLAIMER:
This digital brochure acts as your direct, evidence-based BCCA clinical download companion. It contains official provincial curriculum material to support surgical treatment pathways, side-effects mitigation, and patient self-care workflows.
${divider}`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = doc.fileName.replace('.pdf', '_BCCA_Guide.pdf'); // Keep as PDF extension or format
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  };

  // Filter FAQs
  const filteredFaqs = FAQS.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    return matchesSearch && faq.category === selectedCategory;
  });

  // Filter PDFs
  const filteredCancers = CANCER_PDFS.filter(pdf => {
    const matchesSearch = pdf.title.toLowerCase().includes(pdfSearchQuery.toLowerCase()) ||
                          pdf.description.toLowerCase().includes(pdfSearchQuery.toLowerCase()) ||
                          pdf.category.toLowerCase().includes(pdfSearchQuery.toLowerCase());
    
    if (pdfCategory === 'all') return matchesSearch;
    return matchesSearch && pdf.category === pdfCategory;
  });

  const toggleFaqSelection = (faqQuestion: string) => {
    setSelectedFaqs(prev => ({
      ...prev,
      [faqQuestion]: !prev[faqQuestion]
    }));
  };

  const selectedCount = Object.values(selectedFaqs).filter(Boolean).length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-300">
            <Info size={24} />
          </div>
          <div>
            <h2 className="text-3xl tracking-tight font-serif">Patient Resources & Education Library</h2>
            <p className="text-sm text-slate-400 font-light">Explore official BC Cancer Agency guides, drug directory alerts, and customize personalized appointment checklists.</p>
          </div>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
        {[
          { id: 'faq', label: 'Clinic FAQ & Guide Organizer', icon: HelpCircle },
          { id: 'drugs', label: 'BCCA Cancer Drug Directory', icon: Activity },
          { id: 'cancers', label: 'Gynecologic Patient Guides', icon: BookOpen }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setResourceSubTab(tab.id as 'faq' | 'drugs' | 'cancers')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                resourceSubTab === tab.id
                  ? 'bg-rose-500/15 border border-rose-500/35 text-rose-200'
                  : 'bg-white/5 border border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/10'
              }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {resourceSubTab === 'faq' && (
          <motion.div
            key="faq"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-12"
          >
            {/* Organizer Tool Banner */}
            <div className="glass-card p-6 border-rose-500/20 bg-rose-500/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-xl font-light">
                <h4 className="text-xl font-serif text-rose-200 flex items-center gap-2">
                  <Sparkles size={18} /> NLHS Personalized Visit Organizer
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Select important FAQs by checking their cards below. Compile and print a personalized sheet containing St. John's clinician office contacts, parking coordinates, and custom checklists to carry to your appointments.
                </p>
              </div>
              <button
                onClick={() => setShowOrganizer(true)}
                disabled={selectedCount === 0}
                className="px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-rose-500 text-white hover:bg-rose-450 shadow-lg disabled:opacity-45 disabled:cursor-not-allowed flex items-center gap-2 self-start md:self-auto transition-all shrink-0 cursor-pointer"
              >
                <Printer size={15} /> <span>Print Guide ({selectedCount} Selected)</span>
              </button>
            </div>

            {/* Main FAQ search and listings */}
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
                {/* Search bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={17} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search health questions..."
                    className="w-full pl-10 p-3 rounded-xl bg-obsidian border border-slate-700/60 text-slate-200 text-sm focus:outline-none focus:border-rose-450 transition-colors placeholder:text-slate-600"
                  />
                </div>

                {/* FAQ Category Selection Filter */}
                <div className="flex overflow-x-auto gap-1.5 p-1 no-scrollbar shrink-0">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'surgery', label: 'Surgery' },
                    { id: 'recovery', label: 'Recovery' },
                    { id: 'contact', label: 'Contact' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-rose-500/15 border border-rose-500/35 text-rose-300'
                          : 'bg-white/5 border border-transparent text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ item loop */}
              <div className="space-y-3">
                {filteredFaqs.map((faq, idx) => {
                  const isSelected = !!selectedFaqs[faq.question];
                  return (
                    <div
                      key={faq.question}
                      className="glass-card group overflow-hidden border-white/5 hover:border-slate-800 transition-all"
                    >
                      <details className="w-full">
                        <summary className="p-5 cursor-pointer flex justify-between items-center list-none select-none">
                          <div className="flex items-center gap-3 pr-4">
                            {/* Checkbox for custom printable bundle */}
                            <div 
                              onClick={(e) => {
                                e.preventDefault();
                                toggleFaqSelection(faq.question);
                              }}
                              className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all ${
                                isSelected 
                                  ? 'bg-rose-500 border-rose-400 text-white' 
                                  : 'border-slate-700 bg-obsidian group-hover:border-rose-500/40'
                              }`}
                            >
                              {isSelected && <span className="text-[9px] font-bold">✔</span>}
                            </div>
                            <span className="text-base sm:text-lg font-serif text-slate-100 group-hover:text-rose-200 transition-colors leading-tight">
                              {faq.question}
                            </span>
                          </div>
                          <ChevronDown className="text-slate-500 transition-transform duration-300 shrink-0" size={17} />
                        </summary>
                        <div className="px-5 pb-5 pl-13 text-slate-450 font-light leading-relaxed text-sm">
                          <div className="border-t border-white/5 pt-4">
                            {faq.answer}
                          </div>
                        </div>
                      </details>
                    </div>
                  );
                })}
                {filteredFaqs.length === 0 && (
                  <div className="text-center p-12 text-slate-500 font-light">
                    No matching FAQs found. Try searching for other terms like 'work', 'incisions', or 'car'.
                  </div>
                )}
              </div>
            </div>

            {/* Facility map & Parking */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t border-slate-800/80 pt-12">
              {/* Left: Interactive Facility Map Guide */}
              <div className="glass-card p-8 space-y-6 border-white/5">
                <h3 className="text-2xl font-serif flex items-center gap-2">
                  <MapPin size={22} className="text-rose-400" /> St. John's Health Sciences Centre
                </h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed">
                  The **Gynecologic Oncology Outpatient Clinic** and the **Breast Clinic** are located on the **4th Floor of Area D** in the Health Sciences Centre (St. John's, NL).
                </p>

                {/* Visual CSS diagram representing clinic coordinates */}
                <div className="p-6 bg-obsidian border border-slate-800 rounded-xl space-y-4 font-mono text-[11px] text-slate-400">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-indigo-300">🏢 CLINIC DIRECTORY</span>
                    <span className="text-rose-300">NLHS AREA D</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 bg-white/5 rounded border border-white/5 flex justify-between">
                      <span>Floor 4 — Gynecology Outpatient Clinic</span>
                      <span className="text-rose-450 font-bold">ACTIVE WING</span>
                    </div>
                    <div className="p-2 bg-white/5 rounded border border-white/5 flex justify-between">
                      <span>Floor 4 — Clinical Breast Unit</span>
                      <span className="text-indigo-400">AREA D</span>
                    </div>
                    <div className="p-2 bg-white/5 rounded border border-white/5 flex justify-between">
                      <span>Floor 1 — Area D Clinic Entrance & Elevators</span>
                      <span className="text-slate-500">ENTRY</span>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500 italic font-sans font-light">
                    *Elevator bank D offers direct access with wheelchair ramps immediately upon entry the rotunda.
                  </div>
                </div>
              </div>

              {/* Right: Parking instructions */}
              <div className="glass-card p-8 space-y-4 border-indigo-500/10">
                <h4 className="text-xl font-serif text-indigo-400">Patient Parking & Fees</h4>
                <p className="text-slate-450 text-sm font-light leading-relaxed">
                  The main parking lot is directly in front of the Health Sciences Centre entrance. Overflow patient rates and multi-day validation passes are administered by the Security Desk located in the Main Lobby.
                </p>
                <ul className="space-y-3 pt-2 text-slate-400">
                  <li className="flex items-start gap-2 text-xs font-light">
                    <span className="w-1 h-1 rounded-full bg-indigo-400 mt-2 shrink-0" />
                    <span>Hourly Rate: $1.50 per hour.</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs font-light">
                    <span className="w-1 h-1 rounded-full bg-indigo-400 mt-2 shrink-0" />
                    <span>Multi-Day Passes: Available for 5-day and 10-day intervals, significantly reducing costs for daily radiation or chemotherapy therapies.</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs font-light">
                    <span className="w-1 h-1 rounded-full bg-indigo-400 mt-2 shrink-0" />
                    <span>Wheelchair Drop-off: A ramp and covered turnaround zone are provided adjacent to the Area D Clinician Wing entrance for immediate bedside discharge.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* BC Cancer (BCCA) Drugs Section */}
        {resourceSubTab === 'drugs' && (
          <motion.div
            key="drugs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            <div className="relative p-6 rounded-2xl border border-rose-500/10 bg-gradient-to-r from-rose-500/10 to-obsidian">
              <h3 className="text-xl font-serif text-slate-200 flex items-center gap-2">
                <Activity size={18} className="text-rose-400 animate-pulse" /> BC Cancer Agency (BCCA) Gynecologic Drug Library
              </h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed mt-1.5">
                Official clinical monographs, administration modes, common regimens, side effect profiles, and verified self-care instructions as configured for patients at NLHS. Reference BCCA guidelines prior to starting active cycles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BCCA_DRUGS.map((drug) => (
                <div key={drug.name} className="glass-card p-6 border-white/5 space-y-4 hover:border-slate-800 transition-all font-light flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between border-b border-white/5 pb-2.5">
                      <div>
                        <span className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-[9px] font-mono text-rose-300 font-bold uppercase tracking-wider block w-fit">
                          {drug.category}
                        </span>
                        <h4 className="text-lg font-serif text-slate-100 font-bold mt-1.5">{drug.name}</h4>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <strong className="text-slate-300 font-mono text-[10px] uppercase block tracking-wider">Clinical Intended Use:</strong>
                        <p className="text-slate-400 mt-0.5">{drug.indicativeUse}</p>
                      </div>

                      <div>
                        <strong className="text-slate-300 font-mono text-[10px] uppercase block tracking-wider">How Administered:</strong>
                        <p className="text-slate-400 mt-0.5">{drug.administration}</p>
                      </div>

                      <div>
                        <strong className="text-rose-300 font-mono text-[10px] uppercase block tracking-wider">Side Effects & Expected Toxicity:</strong>
                        <ul className="list-disc pl-4 space-y-1 text-slate-400 mt-1">
                          {drug.sideEffects.map((effect, index) => (
                            <li key={index}>{effect}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-850 mt-4 bg-rose-500/[0.02] p-3 rounded-lg border border-rose-500/10">
                    <strong className="text-teal-400 font-mono text-[10px] uppercase block tracking-widest">Self-Care & Patient Safety Tips:</strong>
                    <p className="text-slate-300 text-xs mt-1 leading-normal italic">
                      "{drug.selfCareTips}"
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-obsidian border border-slate-850 text-center">
              <p className="text-xs text-slate-500 font-light">
                Need more information on specialized drugs? Contact care coordinators <span className="text-rose-300 font-semibold">Melanie Reardon</span> at <span className="font-mono text-rose-300">(709) 777-4836</span> or search the full BC Cancer monograph database directly.
              </p>
            </div>
          </motion.div>
        )}

        {/* BC Cancer Patient PDF Handout Download Center */}
        {resourceSubTab === 'cancers' && (
          <motion.div
            key="cancers"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* Download Center Rationale Banner */}
            <div className="relative p-6 rounded-2xl border border-rose-500/15 bg-gradient-to-r from-rose-500/10 via-obsidian to-slate-900/40">
              <div className="space-y-1.5 max-w-2xl font-light">
                <span className="text-[10px] p-1 px-2.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded font-bold uppercase tracking-widest font-mono">
                  Official clinical publications
                </span>
                <h3 className="text-xl font-serif text-slate-100 flex items-center gap-2 mt-2">
                  <DownloadCloud size={19} className="text-rose-450 animate-bounce" /> BCCA Gynecologic Oncology Download Center
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Avoid static and truncated app summaries. Tap and download the official, full-length **British Columbia Cancer Agency (BCCA)** counseling guides directly on your mobile device or desktop computer for at-home references.
                </p>
              </div>
            </div>

            {/* Document search and category filter */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
              {/* Search input specifically for PDF handouts */}
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
                <input
                  type="text"
                  value={pdfSearchQuery}
                  onChange={(e) => setPdfSearchQuery(e.target.value)}
                  placeholder="Search PDF brochures by keyword..."
                  className="w-full pl-10 p-2.5 rounded-xl bg-obsidian border border-slate-700/60 text-slate-200 text-xs focus:outline-none focus:border-rose-450 transition-colors placeholder:text-slate-650"
                />
              </div>

              {/* Categorization filter pills */}
              <div className="flex overflow-x-auto gap-1.5 p-1 no-scrollbar shrink-0">
                {[
                  { id: 'all', label: 'All PHSA Handouts' },
                  { id: 'uterine-ovarian', label: 'Endometrial & Ovarian' },
                  { id: 'cervical-vulvar', label: 'Cervical, Vulvar & Vaginal' },
                  { id: 'companions', label: 'Companions & Support' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setPdfCategory(cat.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      pdfCategory === cat.id
                        ? 'bg-rose-500/15 border border-rose-500/35 text-rose-300 shadow-sm'
                        : 'bg-white/5 border border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* PDF Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCancers.map((pdf) => (
                <div 
                  key={pdf.id} 
                  className="glass-card p-6 border-white/5 hover:border-slate-800 transition-all font-light flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Document Header Metadata */}
                    <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 shrink-0">
                          <FileText size={18} />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono font-bold text-rose-350 uppercase tracking-widest block">
                            {pdf.category}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono italic block mt-0.5">
                            {pdf.pages} page booklet
                          </span>
                        </div>
                      </div>
                      <span className="p-1 px-2 rounded-md bg-stone-900 border border-slate-800 text-[10px] font-mono text-slate-400 font-semibold uppercase">
                        {pdf.size} PDF
                      </span>
                    </div>

                    {/* Brochure Title & Description */}
                    <div className="space-y-1.5">
                      <h4 className="text-base font-serif text-slate-100 font-semibold leading-tight">
                        {pdf.title}
                      </h4>
                      <p className="text-xs text-slate-450 leading-relaxed">
                        {pdf.description}
                      </p>
                    </div>

                    {/* Crucial contents covered checklist in this booklet */}
                    <div className="p-3.5 bg-obsidian/45 border border-slate-850/60 rounded-xl space-y-2">
                      <span className="text-[9px] font-bold text-teal-400 font-mono uppercase tracking-widest block">
                        Included Clinical Protocols & Topics:
                      </span>
                      <ul className="space-y-1.5 text-[11px] text-slate-400 leading-normal font-light">
                        {pdf.clinicalHighlights.map((highlight, index) => (
                          <li key={index} className="flex gap-2">
                            <span className="text-teal-400 font-bold shrink-0">✓</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Brochure footer and Action trigger */}
                  <div className="pt-4 border-t border-slate-850 mt-5 flex items-center justify-between gap-4">
                    <span className="text-[10px] text-slate-500/80 font-mono leading-none">
                      {pdf.date}
                    </span>
                    <button
                      onClick={() => downloadPdfGuide(pdf)}
                      className="px-4 py-2 border border-rose-500/30 bg-rose-500/15 hover:bg-rose-500/25 text-rose-200 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all shrink-0"
                    >
                      <DownloadCloud size={14} />
                      <span>Download Booklet</span>
                    </button>
                  </div>
                </div>
              ))}

              {filteredCancers.length === 0 && (
                <div className="col-span-full text-center p-12 text-slate-500 font-light bg-obsidian rounded-2xl border border-slate-850/40">
                  No brochures found matching your search. Try searching for "Endometrial", "Ovarian" or general keywords.
                </div>
              )}
            </div>

            {/* Standard footer notice regarding consultations */}
            <div className="p-4 rounded-xl bg-obsidian text-center max-w-3xl mx-auto space-y-1 bg-rose-500/[0.01] border border-rose-500/5">
              <p className="text-xs text-slate-450 font-light">
                Note: All PDF copies are curated directly from BCCA oncology directives. Verify schedules and coordinates with care coordinators <span className="text-rose-300 font-sans font-semibold">Melanie Reardon</span> or <span className="text-rose-300 font-sans font-semibold">Tayler Carroll</span> during checkout blocks.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Printable custom sheet Organizer */}
      {showOrganizer && (
        <div className="fixed inset-0 z-110 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 print:p-0 overflow-y-auto">
          <div className="bg-obsidian border border-slate-700 w-full max-w-3xl rounded-2xl overflow-hidden p-8 print:border-none print:bg-white print:text-black print:max-w-none text-slate-200 space-y-6 my-8">
            {/* Header and buttons controls */}
            <div className="flex justify-between items-center print:hidden">
              <span className="text-xs p-1 px-3 bg-rose-500/15 text-rose-300 border border-rose-500/30 rounded font-mono font-bold uppercase">Personal Clinic Sheet</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-rose-500 text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-lg cursor-pointer"
                >
                  <Printer size={13} />
                  <span>Print Sheet</span>
                </button>
                <button 
                  onClick={() => setShowOrganizer(false)}
                  className="text-slate-400 hover:text-slate-200 text-xs font-semibold cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* Print Area */}
            <div className="space-y-6 print:text-black">
              {/* Institutional Header */}
              <div className="border-b-2 border-rose-500 pb-4 text-center md:text-left">
                <h3 className="text-3xl font-serif text-slate-100 print:text-black">NLHS GYNECOLOGIC ONCOLOGY</h3>
                <p className="text-xs text-rose-300 print:text-rose-700 font-mono font-bold uppercase tracking-widest mt-1">Health Science Centre Patient Guide</p>
              </div>

              {/* Patient details block */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-white/5 p-4 rounded-xl border border-white/5 print:bg-slate-100 print:text-black print:border-black/10">
                <div>
                  <p className="text-slate-500 uppercase font-bold text-[9px]">Compiled Date</p>
                  <p className="text-slate-200 print:text-black font-semibold">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-slate-500 uppercase font-bold text-[9px]">Location</p>
                  <p className="text-slate-200 print:text-black font-semibold">Area D, Floor 4, St. John's, NL</p>
                </div>
              </div>

              {/* Administrative contacts */}
              <div className="space-y-2">
                <h4 className="text-lg font-serif text-rose-200 print:text-rose-800 border-b border-white/5 print:border-black/10 pb-1">Essential Care Coordinators</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-white/5 rounded-lg border border-transparent print:border-black/5 print:bg-slate-50">
                    <p className="font-semibold text-sm">Melanie Reardon</p>
                    <p className="text-xs text-slate-400 print:text-slate-650">Administrative Coordinator — 709-777-4836</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-transparent print:border-black/5 print:bg-slate-50">
                    <p className="font-semibold text-sm">Tayler Carroll</p>
                    <p className="text-xs text-slate-400 print:text-slate-650">Administrative Coordinator — 709-777-6564</p>
                  </div>
                </div>
              </div>

              {/* Selected FAQ items */}
              <div className="space-y-3">
                <h4 className="text-lg font-serif text-rose-200 print:text-rose-800 border-b border-white/5 print:border-black/10 pb-1">Selected Patient Guides</h4>
                <div className="space-y-4">
                  {FAQS.filter(faq => selectedFaqs[faq.question]).map((faq, i) => (
                    <div key={i} className="text-sm space-y-1">
                      <p className="font-serif font-bold text-slate-100 print:text-black">Q: {faq.question}</p>
                      <p className="text-slate-400 print:text-slate-650 leading-relaxed font-light font-sans text-xs pl-4 border-l-2 border-rose-500/20">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Printing Footer instructions */}
              <div className="pt-6 border-t border-white/5 print:border-black/10 text-[10px] text-slate-500 font-mono text-center leading-normal">
                This document was personalized by the patient via the NLHS Gynecologic Oncology Companion portal. Carry this copy to Area D, 4th Floor to coordinate schedules and consult with Dr. Neveu.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
