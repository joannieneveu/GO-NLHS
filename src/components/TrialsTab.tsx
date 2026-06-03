import { useState, useEffect } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FlaskConical, Search, CheckCircle2, ChevronRight, HelpCircle, Users, Activity, Sparkles, Scale, Percent, ArrowRight, Shuffle, ShieldCheck, Dna, Layers, HeartPulse, Download, FileText, BookOpen } from 'lucide-react';
import { CLINICAL_TRIALS } from '../data';
import { ClinicalTrial } from '../types';

export default function TrialsTab() {
  const [selectedDx, setSelectedDx] = useState<string>('all');
  const [isRecurrent, setIsRecurrent] = useState<string>('no');
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [matchedTrials, setMatchedTrials] = useState<ClinicalTrial[]>([]);
  const [activeSubTabs, setActiveSubTabs] = useState<Record<string, string>>({});

  // Interactive BMI Calculator States
  const [bmiInputType, setBmiInputType] = useState<'quick' | 'calculator'>('quick');
  const [hasHighBmi, setHasHighBmi] = useState<string>('no');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>(''); // cm for metric
  const [heightFt, setHeightFt] = useState<string>(''); // ft for imperial
  const [heightIn, setHeightIn] = useState<string>(''); // in for imperial
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('imperial');
  const [calculatedBmi, setCalculatedBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>('');

  // Dynamically calculate BMI and adjust trial match constraints
  useEffect(() => {
    if (bmiInputType === 'calculator') {
      let bmiVal: number | null = null;
      if (unitSystem === 'metric') {
        const wKg = parseFloat(weight);
        const hCm = parseFloat(height);
        if (wKg > 0 && hCm > 0) {
          const hM = hCm / 100;
          bmiVal = parseFloat((wKg / (hM * hM)).toFixed(1));
        }
      } else {
        const wLbs = parseFloat(weight);
        const ft = parseFloat(heightFt) || 0;
        const inch = parseFloat(heightIn) || 0;
        const hInches = (ft * 12) + inch;
        if (wLbs > 0 && hInches > 0) {
          bmiVal = parseFloat(((wLbs / (hInches * hInches)) * 703).toFixed(1));
        }
      }

      setCalculatedBmi(bmiVal);
      if (bmiVal !== null) {
        if (bmiVal < 18.5) setBmiCategory('Underweight');
        else if (bmiVal < 25) setBmiCategory('Healthy range');
        else if (bmiVal < 30) setBmiCategory('Overweight');
        else if (bmiVal < 35) setBmiCategory('Obesity Class I');
        else if (bmiVal < 40) setBmiCategory('Obesity Class II');
        else setBmiCategory('Obesity Class III');

        if (bmiVal >= 35) {
          setHasHighBmi('yes');
        } else {
          setHasHighBmi('no');
        }
      } else {
        setBmiCategory('');
        setHasHighBmi('no');
      }
    }
  }, [weight, height, heightFt, heightIn, unitSystem, bmiInputType]);

  const runMatcher = () => {
    const matched = CLINICAL_TRIALS.filter(trial => {
      // 1. Check diagnosis matching
      if (selectedDx !== 'all' && !trial.targetDiagnosis.includes(selectedDx)) {
        return false;
      }
      // 2. Check BMI constraints (The Bariatric Project requires high BMI >= 30)
      if (trial.bmiConstraint && hasHighBmi === 'no') {
        return false;
      }
      return true;
    });
    setMatchedTrials(matched);
    setHasSearched(true);
  };

  const selectQuickBmi = (val: string) => {
    setHasHighBmi(val);
    setCalculatedBmi(null);
    setBmiCategory('');
  };

  const downloadBariatricProtocol = () => {
    const articleContent = `================================================================================
ACCEPTED MANUSCRIPT: INTERNATIONAL JOURNAL OF GYNECOLOGICAL CANCER (IJGC)
================================================================================
TITLE:
  Laparoscopic Bariatric Surgery with Hysterectomy for Endometrial 
  Cancer to Improve Long-term Outcomes: A Review Article

AUTHORS:
  Dr. Emma Goddard, MD (Discipline of Obstetrics & Gynecology, MUN)
  Dr. David Pace, MD, FRCSC (Discipline of Surgery, General & Bariatric, MUN)
  Dr. Laurie Twells, PhD (Division of Population Health & Applied Health Sciences, MUN)
  Dr. Joannie Neveu, MD, FRCSC (Gynecologic Oncology, Memorial University of Newfoundland)

CORRESPONDING AUTHOR:
  Dr. Emma Goddard (egoddard@mun.ca | 135B Casey St, St. John’s, NL, A1C4X9)

STATUS:
  Accepted for Publication / Narrative Review Article 

--------------------------------------------------------------------------------
ABSTRACT
--------------------------------------------------------------------------------
Endometrial cancer remains the most common gynecologic malignant disease in Canada,
with a rising incidence strongly correlated with elevated body mass index (BMI).
Women diagnosed with endometrial cancer frequently present with several obesity-related
comorbidities, including type II diabetes, hypertension, and cardiovascular disease.
Epidemiological studies indicate that patients with early-stage endometrial cancer 
possess a higher potential to die from these obesity-related comorbidities than from 
cancer recurrence itself. 

While intensive lifestyle modifications and pharmacotherapy frequently fail to achieve
sustainable weight-loss outcomes, bariatric surgery has established itself as the 
only treatment modality capable of producing profound and durable weight reduction. 
Recent clinical trials and pilot series suggest that combining bariatric surgery,
specifically Laparoscopic Vertical Sleeve Gastrectomy (VSG), with minimally invasive 
staging hysterectomy during a single anesthetic booking is feasible, safe, and highly
therapeutic. This combined approach addresses both the gynecologic malignancy and 
its primary metabolic driver, bypasses long Canadian bariatric surgery waitlists 
(which often exceed five years), and yields significant long-term health improvements.

This narrative review examines the physiologic link between endometrial cancer and 
obesity, current individual therapeutic strategies, and the clinical rationale,
safety profile, and future directions of combined surgical treatments.

--------------------------------------------------------------------------------
INTRODUCTION
--------------------------------------------------------------------------------
Endometrial cancer poses a substantial public health threat as the most prevalent
gynecologic malignancy in Canada, accounting for thousands of new diagnoses annually.
Obesity is recognized as its most significant modifiable risk factor. Because early-stage
uterine cancer frequently manifests with high-sensitivity symptoms like postmenopausal
bleeding, most cases are caught early, resulting in high 5-year survival metrics.
However, survivors of early-stage uterine lesions experience disproportionately high
rates of cardiovascular, endocrine, and metabolic disease, often leading to premature
mortality that eclipses cancer-specific mortality.

To curb this trend, innovative full-scope care programs are required. In patients presenting
with severe obesity and low-grade uterine neoplasms, combining Laparoscopic Vertical
Sleeve Gastrectomy with Staging Hysterectomy inside a single operative setting represents
a highly powerful strategy to maximize health-related quality of life, maintain strict
cancer surveillance, and achieve systematic metabolic recovery.

--------------------------------------------------------------------------------
ENDOMETRIAL CANCER & OBESITY: THE PATHOPHYSIOLOGIC LINK
--------------------------------------------------------------------------------
The human endometrium is highly responsive to hormonal shifts. Estrogen exposure 
drives tissue proliferation, whereas progesterone acts as an opposing force, promoting
healthy cell differentiation and regular sloughing. When estrogen levels are elevated
with little to no progesterone opposition, a state of hyperproliferation is induced. This
accelerated cell cycle state increases cellular mutations and DNA mismatch faults,
subsequently driving atypical hyperplasia and low-grade endometrioid adenocarcinomas.

In women with severe obesity, this hyperestrogenic environment is primarily fueled 
by adipose tissue. Excess adipocytes express high levels of the aromatase enzyme,
which converts circulating adrenal androgens into estrone. This constant peripheral
production of estrogen, combined with ovulation disruption (anovulation) commonly 
observed in metabolic syndromes like Polycystic Ovary Syndrome (PCOS), results in
chronic, un-opposed estrogen exposure on the delicate uterine lining.

--------------------------------------------------------------------------------
OBESITY IN CANADA & RECENT EXPENDITURES
--------------------------------------------------------------------------------
Canada is currently experiencing a historic obesity epidemic, with severe obesity (BMI &ge; 40)
representing the fastest-growing cohort. The direct healthcare cost of obesity in
Canada has risen dramatically over the last three decades, growing from $1.8 billion
in 1997 to current direct expenditure estimates exceeding $6.0 billion annually. The three
most significant drivers of these expenditures are obesity-related chronic diseases:
hypertension, coronary artery disease, and type II diabetes. These costs highlight
the critical necessity of implementing effective, durable weight-reduction interventions.

--------------------------------------------------------------------------------
TREATMENT OF OBESITY
--------------------------------------------------------------------------------
A. LIFESTYLE INTERVENTIONS
Lifestyle modifications (dietary counseling, increased physical exercise, and behavior
therapy) remain the foundation of obesity management. However, long-term clinical data
indicates that weight loss achieved through lifestyle changes alone remains moderate, with 
the vast majority of patients eventually regaining weight due to strong biological,
neurohormonal feedback loops.

B. PHARMACOTHERAPY
Pharmacotherapies (e.g., Liraglutide, Naltrexone-Bupropion, and newer GLP-1 agonists
like Semaglutide) have demonstrated enhanced short-term weight loss. Nevertheless,
cessation of medical therapy is consistently followed by a rapid, complete weight regain,
demonstrating that ongoing, costly pharmacotherapy may be required indefinitely.

C. SURGICAL TREATMENT
Bariatric surgery represents the most effective long-term treatment for severe obesity.
Current standard approaches include Roux-en-Y Gastric Bypass (RYGB) and Laparoscopic
Vertical Sleeve Gastrectomy (VSG). VSG involves the surgical resection of the lateral 
portion of the stomach (approximately 80-85%), creating a slim stomach tube. Both 
procedures are proven to achieve substantial excess weight loss (%EWL), stabilize
insulin levels, resolve type II diabetes, lower systemic blood pressure, and improve
overall long-term survival rates.

--------------------------------------------------------------------------------
TREATMENT OF ENDOMETRIAL CANCER: STANDARD OF CARE
--------------------------------------------------------------------------------
For patients with early-stage, low-grade (Grade 1/2, ER+) endometrioid carcinoma,
the standard curative procedure is total laparoscopic or robot-assisted hysterectomy,
bilateral salpingo-oophorectomy (TLH-BSO), and sentinel lymph node staging. When
performed as a minimally invasive operation, recovery is swift. However, standard oncologic
procedures fail to address the metabolic comorbidities or the peripheral estrogenic
adipose tissues, leaving the patient at elevated risk of cardiovascular events.

--------------------------------------------------------------------------------
FEASIBILITY & CLINICAL VALUE OF COMBINED SURGICAL INTERVENTION
--------------------------------5--------------------------------
Surgical co-scheduling, where a gynecologic oncologist and a bariatric surgeon operate
sequentially during the same operative room booking under one anesthetic, represents
an important therapeutic innovation. 

This model offers major logistical and clinical advantages:
1. Bypassing Waitlists: Wait times for bariatric surgery in Canada are notoriously long,
   frequently exceeding five years. In contrast, low-risk endometrial cancer surgeries
   are routinely scheduled within 12 weeks of diagnosis. Placing the combined procedure
   on the oncology scheduling path eliminates years of waiting for metabolic surgery.
2. Anesthesia Risk Mitigation: Severe obesity and undiagnosed sleep apnea present 
   elevated airway risks during anesthesia induction. Undergoing a single combined 
   surgical session reduces cumulative cardiovascular and perioperative risks 
   associated with separate operations.
3. Systemic Recurrence Reduction: Decreasing visceral and peripheral adipose tissue
   directly curtails peripheral aromatization, reducing the circulation of active 
   estrogenic compounds that could stimulate residual endometrial cancer receptors.

--------------------------------------------------------------------------------
SAFETY PROFILE AND EXPERIMENTAL DATA
--------------------------------------------------------------------------------
Clinical data demonstrates that bariatric surgery has an outstanding safety record,
possessing a lower 30-day postoperative mortality rate than laparoscopic cholecystectomy
(0.3% vs. 0.7%) and a complication rate comparable to laparoscopic hysterectomy (3.4% vs. 3.5%).
The addition of Laparoscopic Vertical Sleeve Gastrectomy extends operative time by a moderate 
duration (reported range: 49 to 143 minutes), which has been well-tolerated across
published medical series without increasing 30-day major morbidity markers.

--------------------------------------------------------------------------------
FUTURE DIRECTIONS & THE NLHS COHORT STUDY
--------------------------------------------------------------------------------
To establish a high-quality clinical evidence base, researchers at Memorial University of
Newfoundland and Eastern Health in St. John's, NL, have launched a prospective cohort
study (approved by the Newfoundland & Labrador Health Research Ethics Board - HREB).
Led by Dr. Joannie Neveu and Dr. David Pace, the study recruits women aged 18 or older
with severe obesity (BMI &ge; 35) and low-grade endometrial lesions. 

Patients select between:
  - Arm A: Sleeve gastrectomy and Staging hysterectomy (Combined Route)
  - Arm B: Staging Hysterectomy and clinical management of obesity (Standard Route)

In addition to monitoring oncologic disease-free survival over five years, the study
measures absolute weight loss, HbA1c normalization, resolution of hypertension, and
patient-reported life satisfaction using the validated Bariatric Quality of Life (BQL)
Index and EQ-5D surveys.

--------------------------------------------------------------------------------
CONCLUSION
--------------------------------------------------------------------------------
The integration of specialized bariatric surgery with gynecologic oncologic care
represents a major clinical paradigm shift. By proactively targeting the physiological
origins of endometrial cellular hyperplasia alongside the surgical eradication of early-stage
uterine malignancies, clinicians can achieve simultaneous cancer control and metabolic
rejuvenation, resulting in substantially enhanced life expectancy and well-being for patients.
================================================================================
`;

    const blob = new Blob([articleContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'IJGC_Laparoscopic_Bariatric_Surgery_with_Hysterectomy_for_Endometrial_Cancer_Review_Article.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-300">
          <FlaskConical size={24} />
        </div>
        <div>
          <h2 className="text-3xl tracking-tight font-serif">Clinical Trials & Innovation</h2>
          <p className="text-sm text-slate-500">Explore cutting-edge therapeutic projects and find trials customized to your care plan.</p>
        </div>
      </div>

      {/* Trial Screener / Matcher tool */}
      <div className="glass-card p-8 border-indigo-500/20 bg-indigo-500/5 relative">
        <div className="absolute top-0 right-0 p-6 opacity-5">
          <FlaskConical size={100} className="text-indigo-400" />
        </div>
        
        <h3 className="text-2xl font-serif text-indigo-100 flex items-center gap-2 mb-3">
          <Sparkles size={22} className="text-indigo-300" /> Interactive Suitability Screener
        </h3>
        <p className="text-sm text-slate-400 mb-8 max-w-2xl leading-relaxed">
          Our oncologists routinely sync with national networks to check eligibility for cutting-edge programs. Use this selector to filter trials active at NLHS matching your specific profile.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Main Clinical Factors - 5 Column block */}
          <div className="lg:col-span-5 space-y-6 border-r border-white/5 pr-0 lg:pr-8">
            <h4 className="text-xs uppercase tracking-wider text-indigo-300 font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Clinical parameters
            </h4>
            
            {/* Diagnostic Question */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">1. Primary Diagnosis</label>
              <select
                value={selectedDx}
                onChange={(e) => setSelectedDx(e.target.value)}
                className="w-full p-3 rounded-xl bg-obsidian border border-slate-700/60 text-slate-200 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/20"
              >
                <option value="all">All Diagnoses</option>
                <option value="ovarian">Ovarian Cancer</option>
                <option value="endometrial">Endometrial Cancer</option>
                <option value="cervical">Cervical Cancer</option>
                <option value="vulvar">Vulvar Cancer</option>
              </select>
            </div>

            {/* Recurrence Question */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">2. Clinical Status</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsRecurrent('no')}
                  className={`py-3 rounded-xl border text-xs font-semibold transition-all ${
                    isRecurrent === 'no'
                      ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-200'
                      : 'bg-obsidian border-slate-800 text-slate-400 hover:text-slate-300'
                  }`}
                >
                  Primary / New Referral
                </button>
                <button
                  type="button"
                  onClick={() => setIsRecurrent('yes')}
                  className={`py-3 rounded-xl border text-xs font-semibold transition-all ${
                    isRecurrent === 'yes'
                      ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-200 shadow-indigo-950/20'
                      : 'bg-obsidian border-slate-800 text-slate-400 hover:text-slate-300'
                  }`}
                >
                  Recurrent / Advanced
                </button>
              </div>
            </div>
          </div>

          {/* BMI Calculator Selector Fact Box - 7 Column Block */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-xs uppercase tracking-wider text-indigo-300 font-bold flex items-center gap-2">
                <Scale size={14} className="text-indigo-400" /> 3. Body Mass Index (BMI) assessment
              </h4>
              
              {/* Selector for calculator mode vs quick selector */}
              <div className="flex bg-obsidian p-1 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setBmiInputType('calculator')}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
                    bmiInputType === 'calculator'
                      ? 'bg-indigo-500/20 text-indigo-200'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Calculated BMI
                </button>
                <button
                  type="button"
                  onClick={() => setBmiInputType('quick')}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
                    bmiInputType === 'quick'
                      ? 'bg-indigo-500/20 text-indigo-200'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Quick Selector
                </button>
              </div>
            </div>

            {bmiInputType === 'calculator' ? (
              <div className="space-y-4 p-5 rounded-2xl bg-obsidian border border-slate-800">
                {/* Metric/Imperial tabs */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-xs text-slate-400 font-light">Input height & weight for live clinical validation:</span>
                  <div className="flex bg-slate-800/40 p-0.5 rounded-md">
                    <button
                      type="button"
                      onClick={() => { setUnitSystem('imperial'); setWeight(''); setHeight(''); setHeightFt(''); setHeightIn(''); }}
                      className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider transition-all ${
                        unitSystem === 'imperial' ? 'bg-indigo-500/30 text-indigo-200' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      Imperial
                    </button>
                    <button
                      type="button"
                      onClick={() => { setUnitSystem('metric'); setWeight(''); setHeight(''); setHeightFt(''); setHeightIn(''); }}
                      className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider transition-all ${
                        unitSystem === 'metric' ? 'bg-indigo-500/30 text-indigo-200' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      Metric
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Height Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] tracking-wider text-slate-500 uppercase font-bold">
                      Height {unitSystem === 'metric' ? '(cm)' : '(ft / in)'}
                    </label>
                    {unitSystem === 'metric' ? (
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="e.g. 165"
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700/60 text-slate-200 focus:outline-none focus:border-indigo-400 text-sm"
                      />
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          value={heightFt}
                          onChange={(e) => setHeightFt(e.target.value)}
                          placeholder="ft"
                          className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700/60 text-slate-200 focus:outline-none focus:border-indigo-400 text-sm text-center"
                        />
                        <input
                          type="number"
                          value={heightIn}
                          onChange={(e) => setHeightIn(e.target.value)}
                          placeholder="in"
                          className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700/60 text-slate-200 focus:outline-none focus:border-indigo-400 text-sm text-center"
                        />
                      </div>
                    )}
                  </div>

                  {/* Weight Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] tracking-wider text-slate-500 uppercase font-bold">
                      Weight {unitSystem === 'metric' ? '(kg)' : '(lbs)'}
                    </label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder={unitSystem === 'metric' ? 'e.g. 72' : 'e.g. 160'}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700/60 text-slate-200 focus:outline-none focus:border-indigo-400 text-sm"
                    />
                  </div>
                </div>

                {/* BMI Calculation Results Display */}
                {calculatedBmi !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3.5 rounded-xl border border-indigo-500/20 bg-indigo-500/5 mt-3 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Calculated BMI Index</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-serif text-indigo-300 tracking-tight">{calculatedBmi}</span>
                        <span className="text-xs text-slate-500 tracking-wider">kg/m²</span>
                      </div>
                    </div>                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-mono mb-1">Clinical Classification</div>
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        calculatedBmi >= 35 
                          ? 'bg-rose-500/10 text-rose-300 border border-rose-500/25' 
                          : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/25'
                      }`}>
                        {bmiCategory}
                      </span>
                    </div>
                  </motion.div>
                )}
 
                {/* Dynamic eligibility helper based on study owner Dr Joannie Neveu */}
                {calculatedBmi !== null && selectedDx === 'endometrial' && (
                  <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                    calculatedBmi >= 35
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
                      : 'bg-amber-500/10 border border-amber-500/20 text-amber-200'
                  }`}>
                    {calculatedBmi >= 35 ? (
                      <div>
                        <strong>✨ Eligibility Match:</strong> Your calculated index meets the <strong>BMI &ge; 35 weight protocol</strong> required for enrollments in Dr. Joannie Neveu's active bariatric-gynecological study project.
                      </div>
                    ) : (
                      <div>
                        <strong>ℹ️ Pathway Note:</strong> The active Bariatric Sleeve Hysterectomy protocol requires a BMI of 35 or greater. Standard surgical recovery programs will apply.
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4 p-5 rounded-2xl bg-obsidian border border-slate-800">
                <span className="text-xs text-slate-400 font-light block">Select based on prior clinical assessment if height/weight are unavailable:</span>
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => selectQuickBmi('no')}
                    className={`py-4 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all ${
                      hasHighBmi === 'no'
                        ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-200'
                        : 'bg-obsidian border-slate-800 text-slate-400 hover:text-slate-300 hover:bg-slate-900/40'
                    }`}
                  >
                    BMI &lt; 35
                    <span className="block text-[9px] font-normal text-slate-500 lowercase mt-1">Primary surgical routes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => selectQuickBmi('yes')}
                    className={`py-4 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all ${
                      hasHighBmi === 'yes'
                        ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-200'
                        : 'bg-obsidian border-slate-800 text-slate-400 hover:text-slate-300 hover:bg-slate-900/40'
                    }`}
                  >
                    Severe Obesity (BMI &ge; 35 kg/m2)
                    <span className="block text-[9px] font-normal text-indigo-400 lowercase mt-1">Bariatric project eligible</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between flex-wrap gap-4">
          <p className="text-xs text-slate-500">
            * This calculator performs standard mathematical assessments. Final trial eligibility is verified strictly by clinical staff.
          </p>
          <button
            type="button"
            onClick={runMatcher}
            className="px-6 py-3 bg-indigo-500 text-white rounded-xl text-sm font-semibold hover:bg-indigo-400 transition-colors shadow-lg shadow-indigo-950/20 flex items-center gap-2"
          >
            <Search size={16} /> Check Matching Projects
          </button>
        </div>
      </div>

      {/* Screen results & Persistent Trial Directory */}
      <div className="space-y-8">
        <AnimatePresence mode="wait">
          {hasSearched && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 shadow-xl shadow-indigo-950/10"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-serif text-slate-200 flex items-center gap-2">
                    <Sparkles size={18} className="text-indigo-400" /> Screening Assessment Complete
                  </h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed max-w-2xl">
                    Using your inputs (Diagnosis: <strong className="text-indigo-300">{selectedDx === 'all' ? 'All' : selectedDx.toUpperCase()}</strong>, Status: <strong className="text-indigo-300">{isRecurrent === 'yes' ? 'Recurrent/Advanced' : 'Primary'}</strong>, BMI: <strong className="text-indigo-300">{calculatedBmi !== null ? `${calculatedBmi} (${bmiCategory})` : (hasHighBmi === 'yes' ? '≥ 35' : '< 35')}</strong>), we have marked active trial requirements below.
                  </p>
                </div>
                <div className="self-stretch md:self-auto flex items-center justify-center bg-indigo-500/15 border border-indigo-500/30 px-4 py-2 rounded-xl text-xs font-bold text-indigo-300 uppercase shrink-0">
                  {CLINICAL_TRIALS.filter(t => {
                    const matchesDx = selectedDx === 'all' || t.targetDiagnosis.includes(selectedDx);
                    const matchesBmi = !t.bmiConstraint || hasHighBmi === 'yes';
                    return matchesDx && matchesBmi;
                  }).length} eligible of {CLINICAL_TRIALS.length} active
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="border-b border-slate-800/80 pb-3 flex items-center justify-between">
          <div>
            <h4 id="active-protocols" className="text-2xl font-serif text-slate-100">Browse Active Clinical Protocols</h4>
            <p className="text-xs text-slate-500 mt-1">NLHS supports multiple research programs. Feel free to click and expand any project below.</p>
          </div>
          <span className="text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-350 border border-indigo-500/20 rounded-md px-2.5 py-1 uppercase tracking-wider shrink-0">
            {CLINICAL_TRIALS.length} protocols online
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {CLINICAL_TRIALS.map((trial, i) => {
            // Check compatibility dynamically
            const matchesDx = selectedDx === 'all' || trial.targetDiagnosis.includes(selectedDx);
            const matchesBmi = !trial.bmiConstraint || hasHighBmi === 'yes';
            const isFullMatch = matchesDx && matchesBmi;

            return (
              <div key={i} className="glass-card p-6 border-indigo-500/15 relative bg-slate-900/10 hover:border-indigo-500/25 transition-all">
                <div className="absolute top-0 right-0 p-4 flex flex-wrap gap-2 justify-end">
                  {hasSearched ? (
                    isFullMatch ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                        ✓ Strong Profile Match
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/30 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                        ⚠ Under Review
                      </span>
                    )
                  ) : null}
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 text-[10px] font-bold uppercase tracking-wider">
                    {trial.status}
                  </span>
                </div>
                
                <h5 className="text-2xl text-emerald-400 font-serif font-bold mb-2 pr-40 tracking-tight">{trial.name}</h5>
                <p className="text-slate-350 leading-relaxed max-w-4xl font-light text-sm mb-5">
                  {trial.description}
                </p>

                {trial.inclusionCriteria ? (
                  <div className="mt-5 border-t border-white/5 pt-5 space-y-4">
                    {/* Inner Tab bar */}
                    <div className="flex border-b border-white/5 pb-2 overflow-x-auto no-scrollbar gap-2">
                      {[
                        { id: 'glance', label: 'Study Overview' },
                        { id: 'simple', label: 'Smart Delivery (Simplified Explanation)' },
                        { id: 'scheme', label: 'Study Scheme & Arms' },
                        { id: 'eligibility', label: 'Who Can Join (Criteria)' }
                      ].map(t => {
                        const isActive = (activeSubTabs[trial.name] || 'glance') === t.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setActiveSubTabs(prev => ({ ...prev, [trial.name]: t.id }))}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                              isActive
                                ? 'bg-indigo-500/15 border border-indigo-500/30 text-indigo-200'
                                : 'bg-white/5 border border-transparent text-slate-500 hover:text-slate-200 hover:bg-white/10'
                            }`}
                          >
                            {t.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Content render based on selected sub-tab */}
                    <div className="min-h-[140px] p-5 rounded-2xl bg-obsidian border border-slate-800/80">
                      {(activeSubTabs[trial.name] || 'glance') === 'glance' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Trial Protocol Number</span>
                              <p className="text-sm font-mono text-slate-300 font-light">{trial.trialNumber || 'N/A'}</p>
                            </div>
                            <div>
                              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Study Phase & Design</span>
                              <p className="text-sm text-slate-300 font-light">{trial.phase} — {trial.briefLayTitle}</p>
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Clinic Coordinator Notes</span>
                            <p className="text-xs text-slate-400 leading-relaxed font-light">{trial.details}</p>
                          </div>
                        </div>
                      )}

                      {(activeSubTabs[trial.name] || 'glance') === 'simple' && trial.simpleExplanation && (
                        <div className="space-y-4">
                          <div className="p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-350 flex items-center justify-center text-lg shrink-0">🎓</div>
                            <div>
                              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Simplifying Clinical Science</div>
                              <h5 className="text-xs font-semibold text-indigo-200">The smart "Guided Missile" explanation in plain terms</h5>
                            </div>
                          </div>
                          <p className="text-xs text-indigo-200 leading-normal italic font-serif bg-indigo-500/5 p-3 rounded-xl border border-indigo-500/10">
                            "{trial.simpleExplanation.whatIsIt}"
                          </p>
                          <div className="space-y-3 pt-2">
                            <p className="text-xs text-slate-450 font-light leading-relaxed">
                              {trial.simpleExplanation.howItWorksText}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                              {trial.simpleExplanation.bulletSteps.map((step, idx) => {
                                const stepIcons = ["🎯", "🔒", "📦", "💥"];
                                const stepColors = [
                                  "border-indigo-500/10 bg-indigo-500/5",
                                  "border-pink-500/10 bg-pink-500/5",
                                  "border-teal-500/10 bg-teal-500/5",
                                  "border-emerald-500/10 bg-emerald-500/5"
                                ];
                                return (
                                  <div key={idx} className={`p-4 rounded-xl border ${stepColors[idx] || 'border-slate-850 bg-slate-900/30'} flex gap-3`}>
                                    <span className="text-lg shrink-0 mt-0.5">{stepIcons[idx]}</span>
                                    <div className="space-y-1">
                                      <span className="text-[9px] uppercase font-bold tracking-wider text-slate-450">Step {idx + 1}</span>
                                      <p className="text-xs text-slate-300 leading-relaxed font-light">{step}</p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                      {(activeSubTabs[trial.name] || 'glance') === 'scheme' && trial.studyScheme && (
                        <div className="space-y-5">
                          {/* Visual patient flowchart figure */}
                          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-4">
                            <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
                              <span className="w-2 h-2 rounded-full bg-indigo-400" />
                              <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">Patient-Friendly Flow Diagram</span>
                            </div>

                            {trial.name.includes("BNT 323") ? (
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                                  {/* Step 1 */}
                                  <div className="md:col-span-3 p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">1</div>
                                    <div>
                                      <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Screening</p>
                                      <p className="text-xs font-semibold text-slate-200 leading-tight">HER2 Tissue Check</p>
                                      <p className="text-[8px] text-slate-500 font-light mt-0.5">IHC Score 1+, 2+ or 3+</p>
                                    </div>
                                  </div>

                                  <div className="hidden md:flex md:col-span-1 justify-center text-slate-600 shrink-0">
                                    <ArrowRight size={16} />
                                  </div>

                                  {/* Step 2 */}
                                  <div className="md:col-span-3 p-3.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold shrink-0">
                                      <Shuffle size={14} />
                                    </div>
                                    <div>
                                      <p className="text-[9px] uppercase font-bold text-indigo-300 tracking-wider">Randomization</p>
                                      <p className="text-xs font-semibold text-indigo-200 leading-tight">2:1 Ratio Split</p>
                                      <p className="text-[8px] text-indigo-400 font-light mt-0.5">Assigned by lottery</p>
                                    </div>
                                  </div>

                                  <div className="hidden md:flex md:col-span-1 justify-center text-slate-600 shrink-0">
                                    <ArrowRight size={16} />
                                  </div>

                                  {/* Step 3 */}
                                  <div className="md:col-span-4 space-y-2">
                                    <div className="p-3 bg-indigo-500/20 border border-indigo-500/30 rounded-xl relative">
                                      <span className="absolute top-1 right-2 text-[8px] bg-emerald-500/20 text-emerald-300 px-1.5 rounded font-mono font-bold uppercase">67% chance</span>
                                      <p className="text-xs font-bold text-indigo-250 leading-tight uppercase">Arm A: Experimental</p>
                                      <p className="text-[10px] text-slate-300 font-light mt-0.5">BNT323 Monotherapy q3w</p>
                                    </div>
                                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl relative">
                                      <span className="absolute top-1 right-2 text-[8px] bg-slate-700/60 text-slate-400 px-1.5 rounded font-mono font-bold uppercase">33% chance</span>
                                      <p className="text-xs font-bold text-slate-400 leading-tight uppercase">Arm B: Standard Chemo</p>
                                      <p className="text-[10px] text-slate-500 font-light mt-0.5">Doxorubicin or Paclitaxel</p>
                                    </div>
                                  </div>
                                </div>
                                <p className="text-[10px] text-slate-500 font-light italic leading-relaxed pt-1">
                                  * Randomization ensures 2 out of 3 patients can access the innovative ADC therapy, while verifying safety against standard treatments.
                                </p>
                              </div>
                            ) : trial.name.includes("TroFuse") ? (
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
                                  {/* Phase 1 */}
                                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex flex-col justify-between">
                                    <div>
                                      <span className="text-[8.5px] uppercase font-bold text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block mb-2">Phase 1</span>
                                      <h6 className="text-xs font-bold text-slate-200">Biomarker & Tissue Screening</h6>
                                      <p className="text-[10px] text-slate-500 font-light leading-relaxed mt-1">
                                        Endometrial cancer verified as pMMR (proficient) and TROP2 markers exist.
                                      </p>
                                    </div>
                                  </div>

                                  {/* Phase 2 */}
                                  <div className="p-3 bg-indigo-500/5 border border-indigo-500/15 rounded-xl flex flex-col justify-between relative">
                                    <div className="hidden md:block absolute -right-2 top-10 z-10 bg-slate-950 border border-slate-800 text-slate-400 rounded-full p-0.5">
                                      <ArrowRight size={10} />
                                    </div>
                                    <div>
                                      <span className="text-[8.5px] uppercase font-bold text-indigo-300 font-mono bg-indigo-500/10 px-2 py-0.5 rounded-full inline-block mb-2">Phase 2</span>
                                      <h6 className="text-xs font-bold text-indigo-150">Tumor Induction (All Patients)</h6>
                                      <p className="text-[10px] text-slate-400 font-light leading-relaxed mt-1">
                                        Standard 3-drug combo (Carboplatin + Paclitaxel + Pembrolizumab) to shrink active masses.
                                      </p>
                                    </div>
                                  </div>

                                  {/* Phase 3 */}
                                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex flex-col justify-between relative">
                                    <div className="hidden md:block absolute -right-2 top-10 z-10 bg-slate-950 border border-slate-800 text-slate-400 rounded-full p-0.5">
                                      <ArrowRight size={10} />
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-1.5 mb-2">
                                        <span className="text-[8.5px] uppercase font-bold text-indigo-300 font-mono bg-indigo-500/20 px-2 py-0.5 rounded-full inline-block">Phase 3</span>
                                        <Shuffle size={11} className="text-indigo-400" />
                                      </div>
                                      <h6 className="text-xs font-bold text-indigo-150">Randomization (50/50 Split)</h6>
                                      <p className="text-[10px] text-slate-400 font-light leading-relaxed mt-1">
                                        If active masses shrink, patients are randomized 1:1 to maintenance programs.
                                      </p>
                                    </div>
                                  </div>

                                  {/* Phase 4 */}
                                  <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col gap-2 justify-center">
                                    <div className="p-2 bg-indigo-500/20 border border-indigo-500/30 rounded-lg">
                                      <p className="text-[10px] font-bold text-indigo-200 uppercase leading-none">Arm A (50% probability)</p>
                                      <p className="text-[9px] text-slate-450 mt-0.5 font-light">Sac-TMT + Pembrolizumab maintenance</p>
                                    </div>
                                    <div className="p-2 bg-slate-950 border border-slate-850 rounded-lg">
                                      <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Arm B (50% probability)</p>
                                      <p className="text-[9px] text-slate-500 mt-0.5 font-light">Pembrolizumab alone maintenance</p>
                                    </div>
                                  </div>
                                </div>

                                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-2.5">
                                  <span className="text-base">✨</span>
                                  <div>
                                    <span className="text-[9px] uppercase font-bold text-emerald-355 tracking-wider block">Unlocking Tumor Crossover Protection (Stage 5)</span>
                                    <p className="text-[10.5px] text-slate-350 leading-relaxed font-light mt-0.5">
                                      If the tumor begins growing again during maintenance, patients receive immediate crossover protection. Arm B participants will automatically add the TROP2 smart-drug (Sac-TMT) so everyone benefits from the tumor-seeking drug at critical periods.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : trial.name.toLowerCase().includes("bariatric") ? (
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
                                  {/* Step 1 */}
                                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex flex-col justify-between">
                                    <div>
                                      <span className="text-[8.5px] uppercase font-bold text-amber-500 font-mono bg-amber-500/10 px-2 py-0.5 rounded-full inline-block mb-2">Step 1</span>
                                      <h6 className="text-xs font-bold text-slate-200">Joint Assessment</h6>
                                      <p className="text-[10px] text-slate-500 font-light leading-relaxed mt-1">
                                        Oncology consultation with Dr. Neveu & surgical screening by Dr. Pace. Remote education webinars.
                                      </p>
                                    </div>
                                  </div>

                                  {/* Step 2 */}
                                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex flex-col justify-between relative">
                                    <div className="hidden md:block absolute -right-2 top-10 z-10 bg-slate-950 border border-slate-800 text-slate-400 rounded-full p-0.5">
                                      <ArrowRight size={10} />
                                    </div>
                                    <div>
                                      <span className="text-[8.5px] uppercase font-bold text-teal-400 font-mono bg-teal-500/10 px-2 py-0.5 rounded-full inline-block mb-2">Step 2</span>
                                      <h6 className="text-xs font-bold text-teal-150">Lifestyle Prep</h6>
                                      <p className="text-[10px] text-slate-400 font-light leading-relaxed mt-1">
                                        Keep a 2-week dual food journal and complete physical & psychiatric readiness checkups.
                                      </p>
                                    </div>
                                  </div>

                                  {/* Step 3 */}
                                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex flex-col justify-between relative">
                                    <div className="hidden md:block absolute -right-2 top-10 z-10 bg-slate-950 border border-slate-800 text-slate-400 rounded-full p-0.5">
                                      <ArrowRight size={10} />
                                    </div>
                                    <div>
                                      <span className="text-[8.5px] uppercase font-bold text-indigo-300 font-mono bg-indigo-500/20 px-2 py-0.5 rounded-full inline-block mb-2">Step 3</span>
                                      <h6 className="text-xs font-bold text-indigo-150">Dual Surgical Step</h6>
                                      <p className="text-[10px] text-slate-400 font-light leading-relaxed mt-1">
                                        Single OR loop: Hysterectomy (Dr. Neveu) followed immediately by Gastric Sleeve (Dr. Pace).
                                      </p>
                                    </div>
                                  </div>

                                  {/* Step 4 */}
                                  <div className="p-3 bg-emerald-500/5 border border-emerald-500/15 rounded-xl flex flex-col justify-between">
                                    <div>
                                      <span className="text-[8.5px] uppercase font-bold text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block mb-2">Step 4</span>
                                      <h6 className="text-xs font-bold text-emerald-150">5-Year Follow-Up</h6>
                                      <p className="text-[10px] text-slate-400 font-light leading-relaxed mt-1">
                                        Frequent clinical loops with both specialists to track weight, blood biomarkers, and prevent cancer recurrence.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                                  <div className="flex items-start gap-3">
                                    <span className="text-2xl shrink-0">📄</span>
                                    <div>
                                      <span className="text-xs font-bold text-indigo-300 tracking-wider block font-serif">Download IJGC Accepted Review Article</span>
                                      <p className="text-xs text-slate-400 leading-normal font-light mt-0.5">
                                        Download the accepted manuscript: "Laparoscopic Bariatric Surgery with Hysterectomy for Endometrial Cancer to Improve Long-term Outcomes: A Review Article", co-authored by Dr. Emma Goddard, Dr. David Pace, Dr. Laurie Twells, and Dr. Joannie Neveu.
                                      </p>
                                    </div>
                                  </div>
                                  <a
                                    href="https://www.international-journal-of-gynecological-cancer.com/article/S1048-891X(24)01981-9/fulltext"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 border border-indigo-500/35 bg-indigo-500/25 text-indigo-200 rounded-xl hover:bg-indigo-500/35 text-xs font-semibold flex items-center gap-2 whitespace-nowrap active:scale-95 transition-all text-center self-stretch sm:self-center justify-center cursor-pointer"
                                  >
                                    <BookOpen size={14} /> Read IJGC Article (Full Text)
                                  </a>
                                </div>
                              </div>
                            ) : null}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {trial.studyScheme.arms.map((arm, idx) => (
                              <div key={idx} className="p-4 rounded-xl border border-indigo-500/10 bg-indigo-500/5 relative">
                                <span className="absolute top-2 right-2 text-[9px] font-mono uppercase bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">
                                  Cohort Ratio: {arm.ratio}
                                </span>
                                <span className="text-xs font-bold text-indigo-200 block mb-1">{arm.name}</span>
                                <p className="text-xs text-slate-400 font-light leading-relaxed mb-2">{arm.description}</p>
                                <span className="text-[9px] font-mono text-slate-500 block uppercase font-bold">{arm.text}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-4">
                            <div>
                              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1.5">Stratification Factors</span>
                              <ul className="space-y-1">
                                {trial.studyScheme.stratification?.map((strat, idx) => (
                                  <li key={idx} className="text-xs text-slate-400 font-light flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-indigo-400" /> {strat}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1.5">Scientific Endpoints</span>
                              <ul className="space-y-1">
                                {trial.studyScheme.endpoints.map((endp, idx) => (
                                  <li key={idx} className="text-xs text-slate-400 font-light flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1" /> <span>{endp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="bg-slate-900/50 p-3 rounded-lg border border-white/5 mt-2">
                            <p className="text-[10px] text-slate-500 font-light leading-relaxed">
                              <strong>Calendar Protocol:</strong> {trial.studyScheme.details}
                            </p>
                          </div>
                        </div>
                      )}

                      {(activeSubTabs[trial.name] || 'glance') === 'eligibility' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <span className="text-[10px] uppercase tracking-wider text-emerald-400 border-b border-emerald-500/10 pb-1 font-bold block">Inclusion Criteria (Qualifying)</span>
                            <ul className="space-y-2">
                              {trial.inclusionCriteria?.map((inc, idx) => (
                                <li key={idx} className="text-xs text-slate-300 font-light flex items-start gap-2 leading-relaxed">
                                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                                  <span>{inc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-3">
                            <span className="text-[10px] uppercase tracking-wider text-rose-400 border-b border-rose-500/10 pb-1 font-bold block">Exclusion Criteria (Overriding)</span>
                            <ul className="space-y-2">
                              {trial.exclusionCriteria?.map((exc, idx) => (
                                <li key={idx} className="text-xs text-slate-300 font-light flex items-start gap-2 leading-relaxed">
                                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">✗</span>
                                  <span>{exc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  trial.details && (
                    <div className="p-4 bg-obsidian rounded-xl border border-slate-800/80 text-xs text-slate-400 leading-relaxed font-light mt-4">
                      <span className="font-semibold text-indigo-300 uppercase tracking-wide block mb-1">Study Protocols & Coordinator Notes:</span>
                      {trial.details}
                    </div>
                  )
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Trial General Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-12">
        <div className="space-y-4">
          <h4 className="text-2xl font-serif flex items-center gap-2">
            <Users size={20} className="text-rose-400" /> Patients as Partners
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed font-light">
            In gynecologic oncology, clinical trials are the sole mechanism enabling safer, more effective treatments. Our St. John's network partners with international groups (such as GOG, COG, and BioNTech) to offer therapies years before they are widely available. Participating is completely optional and will never affect your overall grade or the timeliness of your care.
          </p>
        </div>

        <div className="space-y-4 bg-indigo-500/5 p-6 rounded-2xl border border-indigo-500/10 flex flex-col justify-between">
          <div>
            <h4 className="text-2xl font-serif flex items-center gap-2">
              <Activity size={20} className="text-indigo-400" /> Bariatric Research Integration
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed font-light mt-3">
              The ongoing <span className="text-rose-300 font-semibold">Coordinated Bariatric-Hysterectomy Research Initiative</span>, supervised by <span className="text-rose-300 font-semibold">Dr. Joannie Neveu</span> alongside co-investigator <span className="text-rose-300 font-semibold">Dr. David Pace</span>, represents a unique clinical paradigm. By combining tumour excision with weight-loss sleeve surgery in a single operation, we actively target the biological root causes of endometrial tissue changes to protect patients against recurrence and simultaneously reduce severe metabolic comorbidities.
            </p>
          </div>
          <a
            href="https://www.international-journal-of-gynecological-cancer.com/article/S1048-891X(24)01981-9/fulltext"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 self-start px-4.5 py-2 border border-indigo-500/30 bg-indigo-500/15 text-indigo-200 rounded-xl hover:bg-indigo-500/25 text-xs font-semibold flex items-center gap-2 focus:ring-1 focus:ring-indigo-400/20 cursor-pointer active:scale-95 transition-all"
          >
            <BookOpen size={14} /> Read IJGC Article (Full Text)
          </a>
        </div>
      </div>
    </div>
  );
}
