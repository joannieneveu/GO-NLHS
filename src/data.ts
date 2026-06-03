/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TeamMember, AdminContact, Diagnosis, ClinicalTrial, StoryOfHope, FAQItem } from './types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Dr. Joannie Neveu",
    role: "Division Head - Gynecologic Oncology, NLHS, MIGS - Advanced Laparoscopy",
    image: "dr_Joannie_Neveu.png",
    bio: "Passionate about providing top-tier oncological and advanced minimally invasive care with concrete support and empathy for patients and their families.",
    category: "medical",
  },
  {
    name: "Dr. Patti Power",
    role: "Gynecologic Oncologist, Clinical Chief Cancer Centre",
    image: "dr_patti_power.png",
    bio: "Focused on clinical leadership, high-grade gynecological cancer treatment pathways, and patient advocacy throughout NL.",
    category: "medical",
  },
  {
    name: "Dr. Hesham Sait",
    role: "Gynecologic Oncologist",
    image: "dr_hesham_sait.png",
    bio: "Specializing in advanced surgical techniques and compassionate patient care during active treatment.",
    category: "medical",
  },
  {
    name: "Dr. Carla Saldanha",
    role: "GP Oncology",
    image: "dr_carla_saldanha.png",
    bio: "Dedicated to comprehensive clinical follow-up, symptom control, and primary support integration.",
    category: "medical",
  },
  {
    name: "Dr. Claire Elliott",
    role: "Gynecologist & Genetic Care Specialist",
    image: "dr_claire_elliott.png",
    bio: "Focused on comprehensive gynecological care and advanced Cancer Genetic Risk Assessment. Certified by the preeminent City of Hope, she translates genetic screenings into preventive and clinical oncology pathways.",
    category: "medical",
  },
  {
    name: "Nadine Glynn",
    role: "Pharmacist",
    image: "nadine_glynn.png",
    bio: "Expert oncology clinical pharmacy counseling to guide patient understanding of medication safe-use.",
    phone: "709-777-2488",
    category: "pharmacy",
  },
  {
    name: "Amy Moore",
    role: "Nurse",
    image: "amy_moore.png",
    bio: "Clinical care coordinator assisting patients step-by-step through their active care cycles and schedules.",
    phone: "709-777-2488",
    category: "nurse",
  },
];

export const ADMIN_CONTACTS: AdminContact[] = [
  { name: "Melanie Reardon", role: "Administrative Assistant", phone: "709-777-4836" },
  { name: "Tayler Carroll", role: "Administrative Assistant", phone: "709-777-6564" },
];

export const DIAGNOSES: Diagnosis[] = [
  {
    id: "ovarian",
    title: "Ovarian Cancer",
    subtitle: "High Grade Serous (HGSOC)",
    description: "High-grade serous carcinoma is the most common type of ovarian cancer. It is highly sensitive to standard systemic therapeutics and is managed with a concerted multi-disciplinary routine of surgery, recovery, and medical care.",
    management: [
      "Cytoreductive Debulking Surgery: Specialized surgical procedures aiming to remove all visible tumor mass from the abdomen.",
      "Chemotherapy: Systemic treatment, typically standard platinum-based medicational infusions (such as Carboplatin and Paclitaxel).",
      "Maintenance: Either a PARP inhibitor (such as Olaparib or Niraparib) based on genetic and somatic biomarkers, or Bevacizumab (based on high-risk characteristics).",
    ],
    recovery: "It really depends on the extent of the surgery. It can be as short as 3 days or as long as 7 to 10 days. This is then followed by a gradual home recovery over 6-8 weeks. You will see your doctor at around 4 weeks to discuss the results of the pathology and start the plan forward. We usually aim to get on chemotherapy within 42 days.",
  },
  {
    id: "endometrial",
    title: "Endometrial Cancer",
    subtitle: "Uterine Cancer",
    description: "An atypical growth beginning in the inner lining of the uterus (the endometrium). It is most frequently detected in early phases due to recognizable warnings such as post-menopausal spotting or abnormal/irregular bleeding.",
    management: [
      "**Staging Hysterectomy**: Removal of uterus, fallopian tubes and ovaries with targeted lymph node staging (sentinel lymph nodes).",
      "**Minimally Invasive Surgery**: 85% of our surgeries are done on the DaVinci robotic platform or with advanced laparoscopy.",
      "**Optional adjuvant treatment**: Certain patients will require post-operative pelvic radiation, brachytherapy, or systemic treatment (chemotherapy or immunotherapy).",
    ],
    recovery: "When robotic-assisted or laparoscopic approaches are utilized, recovery is swift. Most patients return home the same day and resume activity within 2 weeks. If you have a laparotomy, the recovery time is more 4 to 6 weeks.",
  },
  {
    id: "cervical",
    title: "Cervical Cancer",
    subtitle: "Clinical Care & Management",
    description: "When cervical cancer is diagnosed, a highly customized clinical pathway of surgery and radiation therapy is designed to treat the pathology while preserving physical health and function.",
    management: [
      "Diagnostic/Excision Loops: LEEP or Cone biopsies designed for pre-malignant changes or very early-stage.",
      "Advanced Radical Hysterectomy: Intense surgical excision tailored for certain stages of cancer. (Not all cervical cancers are candidates for surgery.)",
      "Combined Chemoradiation (without surgery): Concurrent platinum-based care and localized radiation designed for advanced stage cancer.",
    ],
    recovery: "Recovery is customized to the procedure's scale. Nerve-preserving surgical methods are prioritized to ensure quick return of baseline pelvic and bladder functions.",
  },
  {
    id: "vulvar",
    title: "Vulvar Cancer",
    subtitle: "External Genital Care",
    description: "A rare type of gynecological cancer affecting the vulva (the external female genitalia). It is most commonly diagnosed in older adults, though it can occur at any age, and is often linked to localized skin conditions (e.g., lichen sclerosus) or HPV infection.",
    management: [
      "Vulvectomy: Precise removal of the lesion with healthy margins to safeguard tissue.",
      "Lymph Node Assessment: We offer sentinel node mapping of the groin lymph nodes to guide optimal staging and systemic care. If you are not a candidate, we do complete lymphadenectomy.",
      "Targeted Adjuvant Therapy: Specialized radiation if margins require extra safety or lymph nodes are positive.",
    ],
    recovery: "Recovery is highly centred on careful local hygiene and physical comfort. Healing is slow and can take several weeks, during which sitting on pressure-relieving cushions and gentle rinsing are recommended. 40% of patients will have wound breakdown; this is fairly common, and we recommend keeping an eye out for infection and slowly letting it heal by secondary intention. Specialist-guided local hygiene, cool-air drying routines, and patient comfort accessories are recommended to facilitate rapid tissue mending.",
  },
];

export const CLINICAL_TRIALS: ClinicalTrial[] = [
  {
    name: "BNT 323 (BNT323-01)",
    trialNumber: "BNT323-01 (ENGOT-EN25, GOG-3105)",
    phase: "Phase III",
    status: "Active",
    description: "A Phase III, randomized, multi-site, open-label trial comparing BNT323 / DB-1303 to investigator's choice of standard chemotherapy in previously treated patients with HER2-expressing recurrent endometrial cancer.",
    briefLayTitle: "A clinical study of the anti-cancer effects of an investigational therapy or chemotherapy in patients with recurring uterine cancer",
    indication: "Endometrial cancer",
    details: "An advanced global study evaluating the next generation of antibody-drug conjugates (ADCs). Enrolling participants with HER2 IHC scores of 1+, 2+, or 3+ as confirmed by central testing.",
    targetDiagnosis: ["endometrial"],
    inclusionCriteria: [
      "Female adult aged 18 years or older",
      "Histologically confirmed endometrial cancer (including uterine carcinosarcoma) that is recurrent",
      "HER2 immunohistochemistry (IHC) score of 1+, 2+, or 3+ determined by central laboratory testing",
      "Has had at least one prior line of platinum-based chemotherapy (up to three lines of prior therapy allowed)",
      "Measurable disease as defined by RECIST v1.1 guidelines",
      "ECOG performance status score of 0, 1, or 2",
      "Estimated life expectancy of 12 weeks or greater at screening"
    ],
    exclusionCriteria: [
      "Ineligible for or contraindicated to both options in the chemotherapy comparison arm (doxorubicin and paclitaxel)",
      "Prior treatment with topoisomerase I inhibitors, including antibody-drug conjugates (ADCs) containing exatecans",
      "History of non-infectious interstitial lung disease (ILD) or pneumonitis requiring steroids, current active ILD, or suspected ILD that cannot be ruled out by imaging",
      "Clinically uncontrolled pleural effusion, ascites, or pericardial effusion requiring drainage within 2 weeks prior to randomization",
      "History of small bowel obstruction requiring hospitalization within the past 3 months",
      "Left ventricular ejection fraction (LVEF) of <55% within 28 days before randomization",
      "Use of immunosuppressive medication within 14 days prior to first dose (except stable low-dose corticosteroids)",
      "Uncontrolled infection requiring systemic antibiotics, antivirals, or antifungals within 2 weeks prior to randomization"
    ],
    studyScheme: {
      arms: [
        {
          name: "Experimental Group: BNT323 Monotherapy",
          description: "BNT323 (trastuzumab pamirtecan) administered as an intravenous (IV) infusion once every 21 days until disease progression or intolerable side effects.",
          ratio: "2:1",
          text: "2/3 of enrolled patients (N = 336)"
        },
        {
          name: "Comparison Group: Investigator's Choice of Chemotherapy",
          description: "Single-agent chemotherapy, receiving either Doxorubicin (IV once every 21 days) or Paclitaxel (IV on Days 1, 8, and 15 of a 28-day cycle) based on physician determination.",
          ratio: "2:1",
          text: "1/3 of enrolled patients (N = 168)"
        }
      ],
      stratification: [
        "HER2 Expression Level (IHC 1+ vs. IHC 2+ vs. IHC 3+)",
        "Number of prior lines of chemotherapy (1 lines vs. 2+ lines)",
        "Prior immunotherapy treatment (prior ICI yes vs. no)"
      ],
      endpoints: [
        "Primary Endpoint: Progression-free survival (PFS) by Blinded Independent Central Review (BICR) in the endometrial cancer population with prior ICI treatment.",
        "Key Secondary Endpoint: Progression-free survival (PFS) by BICR in all randomized participants regardless of prior ICI treatment.",
        "Other Secondary Endpoints: Overall survival (OS), Objective Response Rate (ORR), Duration of Response (DoR), and safety/tolerability."
      ],
      details: "Screening period is up to 28 days to verify HER2 status and clinical baseline. Active therapy cycles average 6 months, after which long-term follow-up and survival checkups occur every 3 months for up to 55 months."
    },
    simpleExplanation: {
      whatIsIt: "BNT323 is a new, smart medicine designed to deliver treatment specifically to cancer cells.",
      howItWorksText: "Endometrial cancer cells often have special chemical markers on their surface that acts like a cellular lock. BNT323 uses a highly customized key to unlock and enter only those cells:",
      bulletSteps: [
        "Special Lock on Cancer Cells: The tumor cells produce a specific protein lock called HER2.",
        "The Key (The Antibody): BNT323 acts as a highly specialized key molded specifically for that HER2 lock, traveling through your blood, completely ignoring healthy cells that do not have the lock.",
        "Entering the Cell: Once the key matches the lock, the tumor cell pulls the medicine inside its borders, thinking it is just a routine delivery.",
        "Releasing the Treatment: Once inside, special natural enzymes dissolve the safety link. This instantly releases a powerful treatment directly inside, destroying the cancer cell from within without harming surrounding healthy body cells!"
      ]
    }
  },
  {
    name: "TroFuse-033 (MK-2870)",
    trialNumber: "MK-2870-033 (TroFuse-033, GOG-3119, ENGOT-en29)",
    phase: "Phase III",
    status: "Active",
    description: "A randomized, open-label, Phase III study evaluating Sacituzumab Tirumotecan (Sac-TMT) in combination with Pembrolizumab versus Pembrolizumab alone as maintenance therapy following standard induction chemoradiation in patients with pMMR advanced or recurrent endometrial cancer.",
    briefLayTitle: "A clinical study of sac-TMT plus Pembrolizumab as first-line maintenance treatment in patients with recurring uterine cancer",
    indication: "Endometrial cancer (pMMR)",
    details: "A dual-stage global clinical study combining a standard induction phase with a highly advanced TROP2-targeted maintenance program for patients with mismatch repair proficient (pMMR) uterine carcinoma.",
    targetDiagnosis: ["endometrial"],
    inclusionCriteria: [
      "Female adult aged 18 years or older",
      "Histologically confirmed advanced or recurrent endometrial carcinoma determined as pMMR (mismatch repair proficient) by central testing",
      "No prior systemic chemotherapy in the first-line setting for advanced or metastatic disease (prior radiation/hormones allowed)",
      "Measurable disease as defined by RECIST v1.1 standards (Stage III, IV, or recurrent)",
      "ECOG performance status score of 0 or 1",
      "Adequate organ function (absolute neutrophil count ≥1500/µL, platelets ≥100,000/µL, hemoglobin ≥9g/dL, creatinine clearance ≥30mL/min)"
    ],
    exclusionCriteria: [
      "Carcinosarcoma, neuroendocrine tumors, or endometrial sarcoma histological variants",
      "Known POLE gene mutation (excellent natural prognosis, not eligible)",
      "Prior treatment with any TROP2-targeted antibody-drug conjugate (ADC) or topoisomerase I inhibitor ADC",
      "History of non-infectious interstitial lung disease (ILD) or pneumonitis requiring steroid treatment",
      "Grade 2 or greater peripheral neuropathy at screening",
      "Uncontrolled cardiovascular disease, congestive heart failure (NYHA Class III/IV), or myocardial infarction within 6 months before study induction"
    ],
    studyScheme: {
      arms: [
        {
          name: "Enrolled Cohort: Induction Phase (All Enrolled Patients, N ~ 1123)",
          description: "All participants receive up to 6 cycles of Paclitaxel (175 mg/m²), Carboplatin (AUC 5) and Pembrolizumab (200 mg) intravenously once every 21 days.",
          ratio: "All",
          text: "100% of enrolled patients receive induction first."
        },
        {
          name: "Maintenance Arm A: Sac-TMT + Pembrolizumab",
          description: "Sac-TMT (4 mg/kg IV on Days 1, 15, and 29) combined with Pembrolizumab (400 mg IV on Day 1) in 6-week cycles for up to 14 cycles (approx. 1.5 years) or until disease progression.",
          ratio: "1:1",
          text: "50% of responsive patients randomized (N ~ 421)"
        },
        {
          name: "Maintenance Arm B: Pembrolizumab Monotherapy",
          description: "Pembrolizumab alone (400 mg IV on Day 1) in 6-week cycles for up to 14 cycles (approx. 1.5 years) or until disease progression.",
          ratio: "1:1",
          text: "50% of responsive patients randomized (N ~ 421)"
        }
      ],
      stratification: [
        "Prior Induction Response (Complete/Partial Response vs Stable Disease)",
        "TROP2 Expression level of primary tumor (very low vs low vs medium-high)",
        "Molecular mutation subtype status (p53 abnormal vs p53 wild-type)",
        "Geographical region (North America, Europe, Asia Pacific, Rest of World)"
      ],
      endpoints: [
        "Primary Endpoint: Progression-free survival (PFS) by BICR in the subgroup with medium/high TROP2 expressing cancer, and in all randomized participants.",
        "Primary Endpoint 2: Overall survival (OS) of the study population under maintenance regimens.",
        "Secondary Endpoints: Quality of Life scores (EORTC QLQ-C30 checklist, tracking physical, emotional and role functioning stability), safety, and drug-toxicity tolerance."
      ],
      details: "Screening period is up to 28 days. Induction chemotherapy is up to 18 weeks. Maintenance cycles take place over 1.5 years. Scans performed every 9 weeks until Week 54, then every 12 weeks to monitor long-term cancer defense."
    },
    simpleExplanation: {
      whatIsIt: "TroFuse-033 is a dual-stage treatment trial that uses a 'smart delivery vehicle' combined with an 'immune trainer'.",
      howItWorksText: "Endometrial cancer cells often produce an abundant surface protein called TROP2 which acts like a special shipping dock. This treatment works in four carefully coordinated stages:",
      bulletSteps: [
        "Stage 1: Clearing the Way (Induction): First, standard chemotherapy is given alongside standard Keytruda immunotherapy to shrink tumor masses and prime the native immune cells.",
        "Stage 2: Precision Target Lock: Responsive patients transition to the maintenance phase. The smart medicine (Sac-TMT) acts as a specialized cargo vehicle tailored specifically to search out TROP2 shipping docks.",
        "Stage 3: Cell Entry: Upon docking with TROP2, the cancer cell pulls the entire smart container inside, thinking it is standard chemical nutrients.",
        "Stage 4: Core Elimination (Payload Release): Once inside, natural enzymes open the safety lock, releasing a high concentration of cancer-killing medicine right at the cell's center, while Keytruda helps your immune system eliminate any remaining cells!"
      ]
    }
  },
  {
    name: "Coordinated Bariatric-Hysterectomy Research Initiative",
    trialNumber: "HREB-2023-BariHyst-NL",
    phase: "Prospective Cohort Study (Version 5.0)",
    status: "Enrolling",
    description: "A prospective cohort study examining the safety, clinical feasibility, and long-term metabolic and oncology effectiveness of combining Laparoscopic Vertical Sleeve Gastrectomy with Minimally Invasive Hysterectomy / bilateral salpingo-oophorectomy (BSO) in patients with severe obesity and low-grade endometrial cancer or hyperplasia with atypia.",
    briefLayTitle: "Combined Laparoscopic Gastric Sleeve & Hysterectomy Study for Women with Weight-Related Uterine Lesions (BMI ≥ 35)",
    indication: "Low-Risk Endometrial Cancer (Grade 1/2, ER+, MMR proficient) or atypical hyperplasia",
    details: "Principal Investigator: Dr. Joannie Neveu (Gynecologic Oncology) | Co-investigator: Dr. David Pace (General & Bariatric Surgery). Collaborative study co-authored by resident investigator Dr. Emma Goddard, clinical researcher Dr. Laurie Twells, and Dena Salehipour in St. John's, NL.",
    targetDiagnosis: ["endometrial"],
    bmiConstraint: true,
    inclusionCriteria: [
      "Female aged 18 years or older with full capacity to give informed consent",
      "Tissue diagnosis of low-risk endometrial cancer (Grade 1 or Grade 2, ER+, MMR proficient) or endometrial hyperplasia with atypia",
      "Body Mass Index (BMI) between 35 and 60 (Class 2 or 3 Severe Obesity)",
      "Completed professional pre-operative Sleep Study",
      "Minimum Grade 6 reading level to complete patient reported questionnaires (BQL Index)"
    ],
    exclusionCriteria: [
      "Deemed not an appropriate major abdominal surgical candidate by anesthesia",
      "Prior history of bariatric surgery (gastric bypass, vertical sleeve, or gastric banding)",
      "Inability or refusal to participate in remote webinars or complete food journaling phases",
      "High-grade, deep myometrial invasion, or metastatic uterine cancer requiring immediate chemo-radiation over primary surgery"
    ],
    studyScheme: {
      arms: [
        {
          name: "Arm A: Sleeve gastrectomy and Staging hysterectomy",
          description: "Patient undergoes combined laparoscopic vertical sleeve gastrectomy and state-of-the-art active staging hysterectomy/BSO in a single coordinated surgical session with Dr. Joannie Neveu and Dr. David Pace.",
          ratio: "Patient Choice",
          text: "Integrated surgical weight loss + gynecologic oncology pathway."
        },
        {
          name: "Arm B: Staging Hysterectomy and clinical management of obesity",
          description: "Patient undergoes minimally invasive laparoscopic staging hysterectomy for uterine cancer/hyperplasia alone, followed by standard non-surgical clinical management of obesity (dietary plans, physical activity guidance, standard medical therapy, and outpatient clinical oversight).",
          ratio: "Patient Choice",
          text: "Standard cancer control + active clinical obesity care pathway."
        }
      ],
      stratification: [
        "Patient Self-Selection (Combined Surgery vs Standard Hysterectomy)",
        "Pre-operative Obesity Severity (BMI 35.0-39.9 vs ≥ 40.0)",
        "Oncological Indication (Uterine Atypical Hyperplasia vs Grade 1-2 Carcinoma)",
        "Pre-existing Metabolic Baseline (Type II Diabetes / Hypertension status)"
      ],
      endpoints: [
        "Primary Endpoint: Malaga recurrence, tissue relapse, or uterine cancer disease recurrence rates at 5 years.",
        "Primary Endpoint 2: Complete surgical safety as measured by 30-day post-operative complication rate (target Clavien-Dindo Grade 3-4 under 5%) and operating room time.",
        "Secondary Endpoints: Track blood pressure, HbA1c (diabetic markers), lipids, liver enzymes, and overall nutritional status for 5 years.",
        "Secondary Endpoints 2: Assess excess weight loss (%EWL) and physical / emotional quality of life using Bariatric Quality of Life (BQL) and EQ-5D indicators."
      ],
      details: "Surgical co-scheduling ensures coordinated surgery is performed, with both Dr. Neveu and Dr. Pace operating sequentially. Patients are admitted to the hospital for 1 to 3 days for recovery. Long-term follow-up spans 5 years with regular clinical touchpoints."
    },
    simpleExplanation: {
      whatIsIt: "A specialized project that combines your cancer hysterectomy and a weight-loss sleeve surgery into a single combined operation under one anesthetic.",
      howItWorksText: "Endometrial cancer risk increases significantly with high body weight because fat tissues produce natural estrogen which over-stimulates the uterine lining. This combined surgery aims to cure the cancer and treat the metabolic trigger together:",
      bulletSteps: [
        "Specialist Dual Teams: Dr. Joannie Neveu (the cancer specialist) and Dr. David Pace (the bariatric specialist) work as co-leads to review your case and ensure safe procedural planning.",
        "Lifestyle & Mind Prep: You complete two educational webinars from the Bariatric Clinic and keep a 2-week food journal to guide successful dietary habits prior to surgery.",
        "Single Surgery Day: On the day of surgery, Dr. Neveu performs the minimally invasive laparoscopy to cure the uterine lesion. Immediately after, while you are sleeping, Dr. David Pace performs the sleeve gastrectomy, shaping the stomach to limit food volume.",
        "Comprehensive 5-Year Care: Following a brief 1-to-3 day recovery stay, both clinics monitor your recovery closely, checking cancer immunity and metabolic biomarkers (blood pressure, blood sugar, lipids) and quality of life."
      ]
    }
  },
];

export const ERAS_INFORMATION = {
  title: "ERAS (Enhanced Recovery After Surgery)",
  description: "By integrating the official guidelines from the ERAS® Society and Precare.ca, our specialized Gynecologic Oncology pathway accelerates healing, curbs postoperative complications, minimizes nausea, and facilitates earlier home discharge.",
  sections: [
    {
      title: "Before Surgery",
      points: [
        "Patient Education & Counseling: Pre-surgical education (including webinars and online videos) sets clear recovery expectations, lowers baseline anxiety, and empowers active patient participation.",
        "Pre-operative Carbohydrate Loading: Eating solid food is allowed up to 6 hours before surgery. Drinking clear liquids and a clear complex carbohydrate-rich drink is indicated up to 2 hours before anesthesia to curb post-op insulin resistance and nausea.",
        "Bowel Preparation (Non-Routine): Depending on the extent of the surgery that is planned, your surgeon may recommend a bowel preparation WITH pre-operative antibiotics. This is not done routinely.",
        "Pre-surgical Antiseptic Cleansing: Taking a Chlorhexidine Gluconate (CHG) shower or using sanitizing wipes the night before and the morning of your surgery suppresses skin bacteria to prevent surgical site infections.",
        "Venous Thromboembolism (VTE) Prophylaxis: Standard application of sequential compression devices (SCDs/compression socks) and receiving a pre-op injection of blood thinners to protect blood flow and avoid deep-vein blood clots."
      ]
    },
    {
      title: "During Surgery",
      points: [
        "Minimally Invasive Surgery: We favor a minimally invasive surgery with robotic console (DaVinci) or advanced laparoscopic surgery when indicated.",
        "Temperature & Fluid Management: During the surgery, the team works together to do active thermal warming and keep your body at normal temperature and to give you just the right amount of fluid.",
        "Post-Operative Pain Planning: The anesthesiologist will discuss with you pain management for the post-operative period and may place intraoperatively regional nerve blocks or an epidural."
      ]
    },
    {
      title: "After Surgery",
      points: [
        "Immediate Early Mobilization: Getting out of bed, sitting upright, and walking in the hallway. We recommend aiming for 1000 steps on post-op day 1 to support dynamic blood circulation, expand lung capacity, and activate healthy bowel motility.",
        "Immediate Early Oral Resumption: Offering clear liquids and a standard light diet within hours of leaving the PACU (Post-Anesthesia Care Unit) to kickstart your gastrointestinal tract.",
        "Scheduled Non-Opioid Multimodal Analgesia: Prescribing round-the-clock alternating non-opioids (such as Acetaminophen and scheduled NSAIDs, tailored carefully to avoid stomach irritation if on a gastric sleeve pathway) to prevent pain proactively.",
        "Targeted Nausea & Vomiting (PONV) Blockade: Consistently administering dual/triple anti-emetic medications (e.g. Ondansetron and Dexamethasone) before and after surgery to support effortless feeding without nausea.",
        "Early Urinary Catheter Removal: Discontinuing the bladder catheter on Post-Operative Day 1 (except in certain circumstances like a radical hysterectomy) to significantly slash the incidence of urinary tract infections (UTIs) and make early walking comfortable."
      ]
    }
  ]
};

export const STORIES_OF_HOPE: StoryOfHope[] = [
  {
    id: 1,
    title: "Finding Resilience",
    text: "After my diagnosis, I focused on the small wins every day. The team at NLHS supported me through every step of my surgery and recovery. Today, I'm back to gardening and enjoying my family.",
    author: "Anonymized Patient",
    flowersCount: 24,
    date: "2026-03-12",
    diagnosis: "ovarian"
  },
  {
    id: 2,
    title: "A New Perspective",
    text: "Treatment was challenging, but the hope shared by Dr. Neveu and the nurses kept me going. Recovery takes time, but there is light at the end of the tunnel.",
    author: "Anonymized Patient",
    flowersCount: 18,
    date: "2026-04-05",
    diagnosis: "endometrial"
  },
];

export const FAQS: FAQItem[] = [
  {
    question: "What should I bring to my surgery?",
    answer: "Comfortable, loose-fitting clothes (ideally button-down tops), a small pillow to place between your abdomen and seatbelt for the car ride home, and any specific home medications you take regularly in their original containers.",
    category: "surgery"
  },
  {
    question: "When can I return to work?",
    answer: "This depends on your specific surgery. Robot-assisted or laparoscopic surgeries usually allow return to light work in 3 to 4 weeks. Open vertical midline incisions generally require 6 to 8 weeks of convalescence.",
    category: "recovery"
  },
  {
    question: "How do I contact the clinical team after hours?",
    answer: "For immediate medical emergencies, please present directly to the nearest Emergency Department. For urgent care-related questions, you can contact our 24/7 nursing line, or for non-urgent administrative matters, leave a voice message on our administrative assistants' direct line.",
    category: "contact" as any
  },
  {
    question: "What is an ERAS carbohydrate drink?",
    answer: "It is a clear, specifically formulated carbohydrate drink consumed up to 2 hours before anesthesia. It prevents insulin resistance associated with fasting, maintains energy, and helps you feel stronger and less nauseous after waking up.",
    category: "surgery"
  },
  {
    question: "How do I care for my surgical incisions after robotic surgery?",
    answer: "Keep the dressings dry and intact for the first 48 hours. Afterward, you can shower and let warm, soapy water gently run over the incisions. Do not scrub or soak in tubs/pools, and gently pat dry with a clean towel.",
    category: "recovery"
  },
  {
    question: "Can I participate in clinical trials at NLHS?",
    answer: "Absolutely. All patients undergoing care in Gynecologic Oncology are routinely screened for ongoing research studies. Speak directly with your clinical oncologist (e.g., Dr. Neveu or Dr. Power) to check if you qualify for active trials like BNT 323 or TroFuse-033.",
    category: "general" as any
  }
];
