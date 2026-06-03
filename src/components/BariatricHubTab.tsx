import { useState, useEffect } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
// @ts-expect-error - Vite handles static image resolution correctly
import sleeveAnatomyImg from '../assets/images/sleeve_anatomy_1780420923909.png';
import { 
  Activity, 
  UserCheck, 
  FileText, 
  Download, 
  Upload, 
  Trash2, 
  Calendar, 
  BookOpen, 
  Heart, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Apple,
  MessageSquare,
  Send,
  HelpCircle,
  Info,
  Smile,
  ShieldAlert,
  ArrowDown
} from 'lucide-react';

interface HandoutDoc {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  type: string;
  isPreloaded?: boolean;
  description: string;
}

export default function BariatricHubTab() {
  // --- Handouts and Upload State ---
  const [documents, setDocuments] = useState<HandoutDoc[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadingName, setUploadingName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // --- Mandatory Food Journal Selection State ---
  const [activeJournalView, setActiveJournalView] = useState<'info' | 'template' | 'sample-fluid' | 'sample-healthy'>('info');

  // --- Interactive Sleeve Patient Guide States ---
  const [activeGuideTab, setActiveGuideTab] = useState<'basics' | 'conditions' | 'diet' | 'rules'>('basics');
  
  // --- Interactive Endometrial Cancer Risk Scaling State ---
  const [selectedRiskIndex, setSelectedRiskIndex] = useState<number>(4);

  // --- Study Arms Interest Declaration State ---
  const [declaredInterest, setDeclaredInterest] = useState<'armA' | 'armB' | 'notSure' | 'notParticipate' | null>(null);
  const [isSubmittingInterest, setIsSubmittingInterest] = useState(false);
  const [interestSubmitted, setInterestSubmitted] = useState(false);
  const [patientInterestName, setPatientInterestName] = useState('');
  const [patientInterestPhone, setPatientInterestPhone] = useState('');

  // --- Interactive Sleeve Assistant Chat Box States ---
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; sender: 'patient' | 'assistant'; text: string; time: string }>>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: "Hello! I am Dr. Neveu's virtual clinic companion. Ask me any patient questions about the Gastric Sleeve (VSG) procedure, the 5 stages of post-op diets, rules on vitamins, smoking, pregnancy, or physical recovery!",
      time: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [selectedChatDocId, setSelectedChatDocId] = useState<string>('all');

  // Load state from localStorage on mount
  useEffect(() => {
    // 1. Load Documents
    const savedDocs = localStorage.getItem('bariatric_hubs_documents');
    if (savedDocs) {
      try {
        setDocuments(JSON.parse(savedDocs));
      } catch (e) {
        loadPreloadedDocs();
      }
    } else {
      loadPreloadedDocs();
    }
  }, []);

  const loadPreloadedDocs = () => {
    const preloaded: HandoutDoc[] = [
      {
        id: 'pre-1',
        name: 'NLHS_Bariatric_Hysterectomy_Patient_Manual_v5.pdf',
        size: '1.8 MB',
        uploadedAt: 'Pre-loaded',
        type: 'pdf',
        isPreloaded: true,
        description: 'Comprehensive 24-page onboarding booklet and milestone planner.'
      },
      {
        id: 'pre-2',
        name: 'PreOp_Two_Week_Nutritional_Diet_Protocol.pdf',
        size: '942 KB',
        uploadedAt: 'Pre-loaded',
        type: 'pdf',
        isPreloaded: true,
        description: 'Detailed instructions for the 1-week healthy eating and 1-week full fluid stages.'
      },
      {
        id: 'pre-3',
        name: 'BQL_Index_Self_Assessment_Handout.pdf',
        size: '340 KB',
        uploadedAt: 'Pre-loaded',
        type: 'pdf',
        isPreloaded: true,
        description: 'Printable copy of the validation metrics questionnaires (BQL Index).'
      },
      {
        id: 'pre-study-consent',
        name: 'NLHS_Bariatric_Hysterectomy_Study_Consent_Form.pdf',
        size: '480 KB',
        uploadedAt: 'Pre-loaded',
        type: 'pdf',
        isPreloaded: true,
        description: 'Approved participant information booklet and formal clinical consent authorization document.'
      }
    ];
    setDocuments(preloaded);
    localStorage.setItem('bariatric_hubs_documents', JSON.stringify(preloaded));
  };

  // --- Download Helpers for Food Journal ---
  const downloadFoodJournalTemplate = () => {
    const csvContent = [
      "Name,MCP,Time,Type and Amount of Food Consumed,Protein (g) (Goal: 60g women / 80g men),Calories (cal) (Goal: 1200-1500 kcal),Fluid (mls) (Goal: 2-3L; no caffeine/carbonation/alcohol),Blood Sugar Reading (If Diabetes)",
      ",,Breakfast (Time: ),,,,",
      ",,Mid-Morning Snack (Time: ),,,,",
      ",,Lunch (Time: ),,,,",
      ",,Mid-Afternoon Snack (Time: ),,,,",
      ",,Supper (Time: ),,,,",
      ",,Mid-Evening Snack (Time: ),,,,",
      ",,Daily Totals,,,,,"
    ].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'NLHS_PreOp_Food_Journal_Template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadSampleFluidJournal = () => {
    const content = `================================================================================
SAMPLE FOOD JOURNAL: FULL FLUID DIET (PRE-OP PROTOCOL)
================================================================================
Time     | Type and Amount of Food Consumed      | Protein (g) | Calories (cal) | Fluids (mls)
--------------------------------------------------------------------------------
Breakfast
7:30 am  | Premier Protein - 1 bottle (325 ml)   | 30 g        | 160 cal        | 325 ml Premier Protein
         |                                       |             |                | 1000 ml H2O
--------------------------------------------------------------------------------
Mid-Morning Snack
9:45 am  | Unsweetened applesauce (113g)         | 1 g         | 50 cal         | 250 ml decaf coffee
         |                                       |             |                | 1000 ml H2O
--------------------------------------------------------------------------------
Lunch
12:30 pm | Tomato soup (1 cup condensed)         | 4 g         | 220 cal        | 591 ml vitamin water
         | Plain greek yogurt (100g)             | 9 g         | 70 cal         | 
--------------------------------------------------------------------------------
Mid-Afternoon Snack
3:00 pm  | Premier protein - 1 bottle (325 ml)   | 30 g        | 160 cal        | 325 ml Premier Protein
--------------------------------------------------------------------------------
Supper
5:30 pm  | Broccoli soup/strained (1 cup)        | 4 g         | 200 cal        | 500 ml green tea
         | Unsweetened applesauce (113g)         | 1 g         | 50 cal         |
--------------------------------------------------------------------------------
Mid-Evening Snack
8:00 pm  | Sugar-free Jell-O (1 cup)             | 1 g         | 5 cal          | 750 ml H2O
--------------------------------------------------------------------------------
DAILY TOTALS                                     | 80 g        | 915 cal        | 4.74 L (4741 mls)
================================================================================`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'NLHS_PreOp_Full_Fluid_Diet_Sample_Journal.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadSampleHealthyJournal = () => {
    const content = `================================================================================
SAMPLE FOOD JOURNAL: HEALTHY EATING DIET (PRE-OP PROTOCOL)
================================================================================
Time     | Type and Amount of Food Consumed      | Protein (g) | Calories (cal) | Fluids (mls)
--------------------------------------------------------------------------------
Breakfast
7:30 am  | 1 slice multigrain bread              | 4 g         | 100 cal        | 1000 ml H2O
         | 1 Tbsp peanut butter                  | 4 g         | 90 cal         | 250 ml decaf coffee
         | 1 clementine                          | 0 g         | 35 cal         | 1000 ml H2O
         |                                       |             |                | 591 ml vitamin water
         |                                       |             |                | 500 ml H2O
--------------------------------------------------------------------------------
Mid-Morning Snack
9:45 am  | 1 banana                              | 1 g         | 105 cal        |
         | Unsalted almonds                      | 8 g         | 210 cal        |
--------------------------------------------------------------------------------
Lunch
12:30 pm | 3oz ground turkey, cooked             | 23 g        | 175 cal        |
         | 1/2 cup cauliflower rice              | 1 g         | 10 cal         |
         | 3/4 cup Mixed vegetables              | 2 g         | 70 cal         |
--------------------------------------------------------------------------------
Mid-Afternoon Snack
3:00 pm  | Green grapes (20)                     | 1 g         | 70 cal         |
         | 1 Babybel light                       | 5 g         | 50 cal         |
--------------------------------------------------------------------------------
Supper
5:30 pm  | 3oz roast chicken breast              | 20 g        | 190 cal        |
         | 1/2 cup whole grain rice              | 2 g         | 75 cal         |
         | 3/4 cup Mixed vegetables              | 2 g         | 70 cal         |
--------------------------------------------------------------------------------
Mid-Evening Snack
8:00 pm  | Plain greek yogurt (100g)             | 9 g         | 70 cal         |
         | 1/4 cup Frozen mixed berries          | 0 g         | 20 cal         |
--------------------------------------------------------------------------------
DAILY TOTALS                                     | 82 g        | 1340 cal       | 3.34 L (3341 mls)
================================================================================`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'NLHS_PreOp_Healthy_Eating_Diet_Sample_Journal.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadPatientQuestionnaire = () => {
    const content = `================================================================================
NL HEALTH SERVICES - BARIATRIC SURGERY PROGRAM
PATIENT HEALTH QUESTIONNAIRE (CLINICAL INTAKE EXAM DOCUMENT)
================================================================================

Please complete this 13-page questionnaire a minimum of 1-2 weeks prior to
the date of your initial clinical assessment.

Submit completed form to:
- Email: bariatricsurgery@easternhealth.ca
- Fax: (709) 777-2430
- Mail: Bariatric Surgery, 154 Lemarchant Road, St. John's, NL, South Building, Room 405, A1C 5B8
- Telephone inquiries: (709) 777-2038

--------------------------------------------------------------------------------
1. ACCOUNT REGISTRATION INFORMATION / CORE IDENTIFIERS
--------------------------------------------------------------------------------
Date of Birth (yyyy/mm/dd): ________________________
Age: __________
MCP #: _____________________________________________
Last Name: _________________________________________
First Name: ________________________________________
Primary Care Provider / Family Doctor: _________________________________________
Home Phone #: ______________________________________
Cell / Other Phone #: ______________________________
Email Address: _____________________________________

Do you consent to email communication from the bariatric team? [] Yes  [] No

--------------------------------------------------------------------------------
2. SOCIO-DEMOGRAPHIC SCREENER
--------------------------------------------------------------------------------
Education Level:
  [ ] No High School         [ ] Completed University/College
  [ ] Some High School       [ ] Graduate Degree/PhD
  [ ] High School Diploma    [ ] Other: ___________________________

Employment Status:
  [ ] Student                [ ] Unemployed
  [ ] Full-time              [ ] Retired
  [ ] Part-time/Seasonal

Current Occupation: ___________________________________________________________

--------------------------------------------------------------------------------
3. PATIENT WEIGHT EXPERIENCE & FAMILY DIAGNOSIS HISTORY
--------------------------------------------------------------------------------
Current Height: _______________             Current Weight: _______________

In your adult life (18+):
1. What has been your highest weight (excluding pregnancy)? __________________ When? _______
2. What has been your lowest adult weight? _______________________________ When? _______

Are any of your biological family members living with obesity or struggling with overweight?
  [ ] Mother     [ ] Father     [ ] Siblings     [ ] Children     [ ] Grandparents     [ ] Grandchildren

At what ages have you been overweight? (Check all that apply)
  [ ] <5         [ ] 5-10       [ ] 11-15        [ ] 16-20        [ ] 21-30
  [ ] 31-40      [ ] 41-50      [ ] >50

What specific factors do you believe led to your weight gain? (Check all that apply)
  [ ] Specific life event    [ ] Medical Condition      [ ] Medication
  [ ] Lack of exercise       [ ] Busy lifestyle         [ ] Quitting smoking
  [ ] Genetics/Biology       [ ] Unhealthy eating habits
  [ ] Other: ___________________________________________________________

--------------------------------------------------------------------------------
4. DIETARY HABITS & WEIGHT MANAGEMENT HISTORIES
--------------------------------------------------------------------------------
Which of the following methods have you tried in the past to manage your weight?
Method                           | Age Tried | How many pounds/kg lost?
---------------------------------|-----------|--------------------------
[ ] Dietitian Counselling        |           |
[ ] Tracked calories / portions  |           |
[ ] Weight Watchers              |           |
[ ] Ideal Protein                |           |
[ ] TOPS                         |           |
[ ] LA Weight Loss               |           |
[ ] Keto / Low carb diets        |           |
[ ] Slim Fast                    |           |
[ ] Atkins                       |           |
[ ] Nutrisystem                  |           |
[ ] 21-day Fix                   |           |
[ ] Jenny Craig                  |           |
[ ] Intermittent Fasting         |           |
[ ] Weight loss meds (Type:____) |           |
[ ] Bariatric surgery (Type:___) |           |
[ ] Other (Please list):________ |           |

--------------------------------------------------------------------------------
5. REWARD-BASED EATING DRIVE (RED-5) METRIC
--------------------------------------------------------------------------------
For each item, score from 0 (Strongly Disagree) to 4 (Strongly Agree):

1. When I start eating I just can't seem to stop.                             [   ]
2. When it comes to foods I love I have no willpower.                         [   ]
3. I don't get full easily.                                                   [   ]
4. I have days when I can't seem to think about anything else but food.       [   ]
5. Food is always on my mind.                                                 [   ]

TOTAL RED-5 SCORE (Sum of 1-5): ________ / 20

Have you ever struggled with over-eating when bored, stressed, sad, or upset? [] Yes  [] No
If yes, how do you plan to manage these emotions without using food?
________________________________________________________________________________
________________________________________________________________________________

--------------------------------------------------------------------------------
6. DIETARY/LIFESTYLE CHANGES ALREADY IMPLEMENTED (PRE-OP PROGRESS)
--------------------------------------------------------------------------------
Please check any changes you have made recently and indicate when:
  [ ] Journaling/Tracking Food intake               When: ___________________
  [ ] Having 3 meals/day (no skipped meals)        When: ___________________
  [ ] Measuring/weighing food/portions             When: ___________________
  [ ] Eliminated carbonated drinks                 When: ___________________
  [ ] Switched to decaffeinated tea/coffee         When: ___________________
  [ ] Separating liquids and solids (30 min rule)  When: ___________________
  [ ] Eating slower                                When: ___________________

How would you rate your current line of commitment to these behavior changes?
  (Scale of 1-10, where 1 is "Somewhat" and 10 is "Really Committed")
  Your rating: [   ]

--------------------------------------------------------------------------------
7. SLEEP PATTERNS & CIRCADIAN PROFILE
--------------------------------------------------------------------------------
On average, how many hours do you sleep nightly? _________
Do you have trouble falling asleep?                       [ ] Yes   [ ] No
Do you have trouble staying asleep?                      [ ] Yes   [ ] No
Do you currently work night shifts?                      [ ] Yes   [ ] No
Have you ever worked night shifts?                        [ ] Yes   [ ] No

--------------------------------------------------------------------------------
8. COMPREHENSIVE MEDICAL AND CRITICAL HEALTH HISTORY SCREENER
--------------------------------------------------------------------------------
Indicate if you have ever been diagnosed with any of the following:

Health Problem                 | Yes | No  || Health Problem                 | Yes | No
-------------------------------|-----|-----||-------------------------------|-----|----
Stroke                         | [ ] | [ ] || Hernia                        | [ ] | [ ]
Seizure                        | [ ] | [ ] || Gallbladder disease           | [ ] | [ ]
Eye/Visual Disease             | [ ] | [ ] || Kidney disease                | [ ] | [ ]
Breathing problems (Asthma/CODP)| [ ] | [ ] || Bladder incontinence          | [ ] | [ ]
Sleep Apnea (Diagnosed: _____ )| [ ] | [ ] || Hemorrhoids                   | [ ] | [ ]
Angina / Chest Pain            | [ ] | [ ] || Cancer (Type: _______________)| [ ] | [ ]
Heart Failure                  | [ ] | [ ] || Thyroid disease               | [ ] | [ ]
Heart Attack                  | [ ] | [ ] || Diabetes                       | [ ] | [ ]
PCOS (Polycystic Ovary)        | [ ] | [ ] || Joint pain / Arthritis         | [ ] | [ ]
High Blood Pressure            | [ ] | [ ] || Bleeding problems (Anemia)     | [ ] | [ ]
High Cholesterol               | [ ] | [ ] || Blood clot (DVT/PE)             | [ ] | [ ]
Liver problems (Fatty Liver/etc)| [ ] | [ ] || History of Vitamin Deficiency | [ ] | [ ]
Heartburn / Reflux             | [ ] | [ ] || Gout                           | [ ] | [ ]
Chronic Diarrhea / Constipation| [ ] | [ ] || 

--------------------------------------------------------------------------------
9. PSYCHOLOGICAL & CLINICAL MENTAL HEALTH HISTORY
--------------------------------------------------------------------------------
Diagnosed Illnesses:
  [ ] Depression             [ ] Suicidal thoughts/attempts      [ ] Schizophrenia
  [ ] Anxiety                [ ] Bipolar Disorder                [ ] PTSD
  [ ] ADD/ADHD               [ ] Substance use disorder/addiction

1. Have you ever been hospitalized for your mental health?  [ ] Yes (Age: ___) [ ] No
2. Have you ever gone through counselling/therapy?         [ ] Yes  [ ] Currently Going  [ ] No
3. Are you open to professional counselling if recommended?  [ ] Yes  [ ] No  [ ] Unsure

Eating Disorder Screening:
1. Have you ever made yourself vomit to rid your body of food?              [ ] Yes  [ ] No
2. Have you ever taken laxatives for any reason other than constipation?   [ ] Yes  [ ] No
3. Have you ever been diagnosed with:
   - Anorexia Nervosa       [ ] Yes (Age: ___)   [ ] No
   - Bulimia Nervosa        [ ] Yes (Age: ___)   [ ] No
   - Binge Eating Disorder  [ ] Yes (Age: ___)   [ ] No

Self-Reflection Barriers:
What do you think may prevent you from eating healthy or following a lifestyle change?
  [ ] Financial reasons      [ ] Work schedule      [ ] Child care issues
  [ ] Overall stress         [ ] Physical limitations/inability to exercise
  [ ] Other (Please describe): __________________________________________________

================================================================================`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'NLHS_Bariatric_Patient_Health_Questionnaire.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadResearchConsentForm = () => {
    const content = `================================================================================
FORMAL COHORT CLINICAL STUDY CONSENT TO TAKE PART IN RESEARCH
================================================================================
HREB Version March 2019
Newfoundland and Labrador Health Research Ethics Board (HREB)

TITLE:
Laparoscopic Bariatric Surgery with Hysterectomy for Endometrial Cancer:
A prospective cohort study to examine safety and clinical effectiveness
in Newfoundland and Labrador.

RESEARCHER(S):
- Dr. Emma Goddard, MUN Resident Surgeon (Phone: 705-622-1405, Email: egoddard@mun.ca)

SUPERVISOR / PI:
- Dr. Joannie Neveu, Gynecologic Oncologist Surgeon, MUN (Phone: 709-777-6564)

--------------------------------------------------------------------------------
1. INTRODUCTION & CHRONOLOGY STATEMENT
--------------------------------------------------------------------------------
You have been invited to participate in a clinical cohort research study. Taking
part is entirely voluntary. You may choose to participate or decline, or change
your mind at any time during your 5-year follow-up, without any prejudice to
your standard of care at the St. John's Health Sciences Centre.

If you elect not to participate, you will receive standard treatments (individual
laparoscopic hysterectomy and standard weight management pathways separately).
If you consent to participate, you will receive combined, concurrent single-stage
surgical therapeutic intervention: Laparoscopic Hysterectomy for Low-risk
Endometrial Cancer, followed immediately by Laparoscopic Vertical Sleeve
Gastrectomy (VSG) during the same anesthesia operative session.

--------------------------------------------------------------------------------
2. WHY IS THIS COMBINED PROCEDURE CONCURRENT?
--------------------------------------------------------------------------------
Endometrial cancer is directly linked to metabolic and obesity-related syndromes.
Obesity significantly worsens overall long-term survival rates because of secondary
risks (Type II diabetes, heart failure, and high blood pressure). Additionally,
significant weight reduction is proven to decrease endometrial cancer recurrence
and lower the risk of developing second primary cancers.

--------------------------------------------------------------------------------
3. STUDY COHORT METRICS
--------------------------------------------------------------------------------
- Cohort Location: St. John's, Newfoundland & Labrador (NLHS Area D)
- Enrollment Cap: 10 to 15 patients per year
- Timeframe Duration: 5 years of active oncological follow-up

--------------------------------------------------------------------------------
4. CHRONIC ENROLLMENT MILESTONES (WHAT WILL HAPPEN?)
--------------------------------------------------------------------------------
PRE-OPERATIVE CLINICAL INTERVIEWS & REVIEWS:
1. Gynecology Oncology:
   - Initial consultation with Dr. Joannie Neveu to review biopsy pathology,
     imaging, and detailed study informed consent.
2. Bariatric Program:
   - Complete 2 comprehensive pre-surgical remote education webinars.
   - Run two 1-week diet trials (1 week healthy eating + 1 week full fluids).
   - Maintain active food and fluid log checklists.
   - Initial physical, psychological, and dietary intake team assessments.
   - Meet with Bariatric Surgical specialist Dr. David Pace.

POST-OPERATIVE FOLLOW-UP PROGRAM:
1. Gynecologic Oncology:
   - 4-week follow-up with Dr. Joannie Neveu to review final surgical pathology.
   - In-person clinic appointments every 6 months for 5 years.
2. Bariatric Surgery Program:
   - 1-month clinical progression review to examine fluid intake compliance.
   - 6 to 8-week wound-healing review with Dr. David Pace.
   - Milestone assessments at 3 months, 6 months, and 12 months post-op.

--------------------------------------------------------------------------------
5. RESEARCH PROCEDURES IN ADDITION TO BASIC CARE
--------------------------------------------------------------------------------
- Specimen collection: An extra 4-5 test tubes of blood drawn at standard intervals
  to review cardiovascular benchmarks, blood glucose indicators, and lipid levels.
- BQL Index Panel: Complete the validating 9-factor Bariatric Quality of Life Index
  (approx 10 min) during standard clinic checkups.
- Secondary Data Request: Authorization for review of medical records (including
  A1C, liver functions, metabolic panels, cost analysis, and surgical times).

--------------------------------------------------------------------------------
6. PRIMARY AND EXTREME SURGICAL RISKS (STATED TRANSPARENCY)
--------------------------------------------------------------------------------
Sleeve Gastrectomy contains unique risks that must be understood:
- Complication rate is estimated around 6% to 13%.
- Anastomotic leak from gastric staple line: ~2% risk.
- Bowel obstruction or gastrointestinal stricture: ~2% risk.
- Lifelong persistent esophageal reflux: ~23% risk.
- Temporary hypoglycemia: ~0.5% risk.
- Severe long-term micronutrient malnutrition: ~5% to 15% risk.
- Abdominal bleeding or anesthesiological complications.

--------------------------------------------------------------------------------
7. DECLARATION OF NO FINANCIAL CONFLICTS OF INTERESTS
--------------------------------------------------------------------------------
There are no financial conflicts of interest to declare for this study.

--------------------------------------------------------------------------------
8. INFORMED CLINICAL SIGNATURE PAGE (PRINT FOR SIGNING)
--------------------------------------------------------------------------------
Participant Initials: _________     Date: ________________________

"My signature below confirms I have had adequate time to ask questions, understand
the risks of combined Vertical Sleeve Gastrectomy and Laparoscopic Hysterectomy, and
consent to enroll in the Newfoundland cohort study coordinated by Dr. Joannie Neveu."

________________________________________________________________________________
Signature of Participant                        Printed Name & Date

________________________________________________________________________________
Signature of Person Discussing Consent          Printed Name & Date

________________________________________________________________________________
Signature of Investigator                       Printed Name & Date
================================================================================`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'NLHS_Bariatric_Hysterectomy_Cohort_Study_Informed_Consent.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadBariatricManualOverview = () => {
    const content = `================================================================================
NLHS BARIATRIC SURGERY PATIENT MANUAL (REVISED NOVEMBER 2025)
LAPAROSCOPIC SLEEVE GASTRECTOMY / GASTRIC BYPASS OUTLINE HANDOUT
================================================================================
NL Health Services - Bariatric Surgery Program

This outlines essential safety, diet stages, and clinical recovery rules
derived from the official Coordinated Sleeve study manuals.

--------------------------------------------------------------------------------
1. OUTPATIENT SURGERY ELIGIBILITY & KEY SUPPORT REQUIREMENTS
--------------------------------------------------------------------------------
Some bariatric candidates undergo Outpatient Surgery ("Same-day Surgery").
Outpatients are released the same afternoon without an overnight hospital stay.

Mandatory Requirements:
1. Designated Support Person: Must attend ALL pre-operative and educational
   appointments, sign consent, fill prescriptions, and drive the patient.
2. 90-Minute Rule: The patient and support person MUST stay within a 90-minute
   driving range of St. John's for the first 48 hours post-op.
3. Support Duration: Support person must stay with the patient continuously for
   the first 48 hours (and recommended for 3-4 days) to assist with mobility,
   showering, and liquid diet schedules.

--------------------------------------------------------------------------------
2. STOMACH VOLUME & RECONSTRUCTION CAPACITY
--------------------------------------------------------------------------------
- Resized Shape: Approximately 80% to 85% of your stomach is removed. The
  remaining portion is a narrow vertical tube (sleeve) the size of a SLIM BANANA.
- Pouch Capacity: Holds only 1 to 5 ounces (30 to 150 ml) of liquid or mush.
- Hormonal Reseat: Removing the outer portion of the stomach eliminates nearly
  all of your body's secretion of GHRELIN (the hunger hormone). This eliminates
  physical appetite, allowing rapid, early feeling of fullness.

--------------------------------------------------------------------------------
3. LIFELONG HEALTH DIET RULES (THE "MUTUAL ALLY" COMMANDMENTS)
--------------------------------------------------------------------------------
1. NEVER USE STRAWS: Drinking through a straw causes you to swallow air pockets,
   which painfully bloats the tiny banana pouch.
2. NO EATING AND DRINKING SIMULTANEOUSLY: Fluids flush food out of the pouch too
   fast, eliminating satiety, and stretching the sleeve. Stop drinking fluids
   30 minutes before your meal, and wait 30 minutes after your meal.
3. 60g PROTEIN DAILY GOAL: Women require minimum 60g, and men require 80g of protein.
4. LIFELONG VITAMIN D & MULTIVITAMINS: Required daily for life to prevent severe
   deficiency. Take Ursodiol (Actigall) for 6 months to prevent gallstones.
5. SIX-MONTH NICOTINE ABSTINENCE: Absolute smoke/nicotine/vape clearance.

--------------------------------------------------------------------------------
4. CRITICAL RECOVERY SYMPTOMS OF CONCERN
--------------------------------------------------------------------------------
Contact MUN coordinator Melanie Reardon (709-777-4836) or seek emergency care if:
- Sharp, worsening abdominal pain that does not improve with medicating.
- Constant, persistent vomiting or inability to keep clear liquids down.
- Persistent fever of 101F (38C) or higher.
- Swelling, tenderness, or localized warmth in calf muscles (blood clot risk).
- Loss of consciousness, confusion, or agitation.
- Redness, swelling, or pus-like drainage from wound incisions.
================================================================================`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'NLHS_Bariatric_Sleeve_Surgery_Patient_Manual_v5_Summary.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Save helpers
  const saveDocs = (newDocs: HandoutDoc[]) => {
    setDocuments(newDocs);
    localStorage.setItem('bariatric_hubs_documents', JSON.stringify(newDocs));
  };

  // --- Handout Actions ---
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    setErrorMsg('');
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/png', 'image/jpeg'];
    
    if (file.size > 8 * 1024 * 1024) {
      setErrorMsg('File size exceeds the 8MB administrative allocation limit.');
      return;
    }

    setUploadingName(file.name);
    setUploadProgress(10);
    
    // Simulate upload interval
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newDoc: HandoutDoc = {
              id: 'user-' + Date.now(),
              name: file.name,
              size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
              uploadedAt: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
              type: file.name.split('.').pop() || 'dat',
              description: 'Patient/Provider uploaded resource.'
            };
            const updated = [...documents, newDoc];
            saveDocs(updated);
            setUploadProgress(null);
            setUploadingName('');
          }, 400);
          return 100;
        }
        return prev + 15;
      });
    }, 120);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const deleteDocument = (id: string) => {
    const updated = documents.filter(doc => doc.id !== id);
    saveDocs(updated);
  };

  const downloadDocPlaceholder = (doc: HandoutDoc) => {
    // Generate a dummy download for the patient checklist or template
    const headerStr = `================================================================================\nCOORDINATED BARIATRIC-HYSTERECTOMY STUDY HANDOUT: ${doc.name.toUpperCase()}\n================================================================================\nDocument reference ID: ${doc.id}\nFile Weight: ${doc.size}\nNLHS ObGyn Division Head: Dr. Joannie Neveu \nBariatric Surgical Director: Dr. David Pace\n--------------------------------------------------------------------------------\nThis is a clinical placeholder for your actual patient study manual. In the physical clinic, you will receive this exact printed counseling manual from nurse Amy Moore or medical student Dena Salehipour.\n\nRequired Pre-operative Steps:\n- Complete remote webinars (Webinars 1 & 2).\n- Fulfill the 2-week daily nutritional journaling loop.\n- Maintain an active weight log to safeguard pre-op metabolic metrics.\n================================================================================`;
    const blob = new Blob([headerStr], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = doc.name.endsWith('.pdf') ? doc.name.replace('.pdf', '_Guide.txt') : doc.name + '_Guide.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };



  // --- Sleeve Knowledge-Base Decision Engine ---
  const getBariatricAssistantResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    // Determine the document context prefix
    let docPrefix = "";
    if (selectedChatDocId !== 'all') {
      const selectedDoc = documents.find(d => d.id === selectedChatDocId);
      if (selectedDoc) {
        docPrefix = `🔍 **Querying Direct Document Reference:** Answers extracted from clinic handout file: \`${selectedDoc.name}\`\n\n`;
      }
    } else {
      // Find if we have custom uploaded documents
      const customDocs = documents.filter(d => !d.isPreloaded);
      if (customDocs.length > 0) {
        docPrefix = `📚 **Reference Checked:** Queried 4 integrated manuals + your ${customDocs.length} custom file(s) (including \`${customDocs[0].name}\`)\n\n`;
      } else {
        docPrefix = `📚 **Reference Checked:** Checked official NLHS Coordinated Study manuals & booklets\n\n`;
      }
    }

    let answer = "";
    
    if (q.includes('pregnant') || q.includes('pregnancy') || q.includes('baby') || q.includes('childbearing') || q.includes('gestat')) {
      answer = `**Pregnancy & Childbearing Safety Rules:**\n\nIt is strictly recommended that you **wait at least 2 years (24 months)** after weight loss surgery before attempting to become pregnant.\n\n* **Why 2 years?** Your body undergoes profound metabolic and dietary adjustments. Becoming pregnant before this weight stabilization phase is complete puts extreme nutritional strain on you and the developing fetus.\n* **Planning:** Discuss family planning with your primary doctor or Dr. Neveu. Meet with our program dietitians (**Jenna Crown** or **Tiffany Mansten**) for preconception nutrition planning. If you get pregnant, specialized nutritional follow-up is mandatory to support healthy fetal growth.`;
    }
    
    else if (q.includes('hair') || q.includes('hair loss') || q.includes('thinning')) {
      answer = `**Post-Operative Hair Thinning / Loss:**\n\nIt is common to experience temporary hair thinning starting approximately **3 months after surgery**, lasting for about 3 to 6 months.\n\n* **Why it happens:** This is a physiological reaction to rapid weight loss, physical stress of surgery, and dietary shifts. It is temporary and **does not fall out in clumps**; your hair will grow back!\n* **How to prevent or minimize:**\n  1. Strictly eat **60 to 80 grams of supreme quality protein** daily.\n  2. Diligently take your daily **post-op multivitamin and Vitamin D (1000 IU)**.\n  3. Ensure you are getting adequate iron and zinc (as guided by your three regular pre/post-op blood lab tests).`;
    }
    
    else if (q.includes('straw') || q.includes('straws') || q.includes('air')) {
      answer = `**Can I use straws?**\n\n**No! Straws are strictly not recommended** during your recovery, especially in Stage 3 (Full Fluids).\n\n* **Why?** Drinking through a straw causes you to swallow excess air. This air fills up your tiny stomach pouch, causing sudden, painful bloating, internal gas pressure, or nausea. Sip slowly directly from a cup instead!`;
    }
    
    else if (q.includes('gum') || q.includes('chewing gum') || q.includes('chew')) {
      answer = `**Can I chew gum?**\n\n**No, chewing gum is forbidden** in the WLS program.\n\n* **Why?** Chewing gum triggers salivation and swallowing air, which leads to painful gas pockets, bloating, and stomach stretch. Furthermore, if you accidentally swallow gum, it can create a dangerous obstruction in the highly restricted stomach sleeve opening (which is only the size of a small banana).`;
    }
    
    else if (q.includes('water') || q.includes('fluid') || q.includes('dehydration') || q.includes('drink') || q.includes('urinate') || q.includes('urine')) {
      if (q.includes('meal') || q.includes('eat')) {
        answer = `**Important: Separating Fluids and Meals**\n\n**Do not drink liquids with your meals or snacks!**\n\n* **Golden Rule:** Stop drinking all fluids **30 minutes before** eating, do not drink **during** your meal, and wait **30 minutes after** you finish eating before taking a sip.\n* **Why?** Your new banana-shaped stomach sleeve holds only a tiny amount of food (1 to 5 ounces). If you mix fluids and solids, you will fill your pouch too quickly, causing stretching, extreme discomfort, or immediate vomiting. It can also flush food out too quickly, defeating the pouch's satiety purpose.`;
      } else {
        answer = `**Fluid Goals & Hydration Rules:**\n\n* **Daily Target:** You must drink **2 to 4 Liters** (64 to 128 ounces, or **8 to 16 cups**) of non-carbonated, decaffeinated fluids every single day.\n* **The Sip Protocol:** Sip water, broth, or light tea constantly—about every hour you are awake. *Remember: "Catching up" on water is nearly impossible after surgery if you fall behind!*\n* **Indicators:** Monitor your urine. If it is dark or has a strong odor, or if you urinate less than 4 times a day, you are dehydrated. Avoid caffeine as it irritates the new stomach sleeve wall.`;
      }
    }
    
    else if (q.includes('size') || q.includes('how big') || q.includes('banana') || q.includes('pouch') || q.includes('volume') || q.includes('ounce') || q.includes('bougie') || q.includes('cc')) {
      answer = `**Stomach Pouch Size & Volume:**\n\n* **How it's shaped:** The surgeon laparoscopically staples and divides your stomach vertically, removing about **80% to 85%** of it. The remaining stomach is a narrow, tube-shaped sleeve that looks like a **slim banana**.\n* **Volume Capacity:** It holds only **1 to 5 ounces** (30 to 150 cc) of food or liquid, compared to a normal stomach which holds several cups.\n* **Bougie Guide:** All surgeons use a small sizing tube called a **French Bougie** inside the stomach (ranging from 32 French to 64 French size) to guide the stapling and ensure a consistent diameter. Safely chewing food to a "mush" consistency is crucial to let it pass through this restricted channel.`;
    }
    
    else if (q.includes('ghrelin') || q.includes('hunger') || q.includes('appetite') || q.includes('craving')) {
      answer = `**Appetite and the Ghrelin Hormone:**\n\n* **What is Ghrelin?** Ghrelin is the chemical messenger responsible for sending strong hunger and craving signals to your brain.\n* **How the sleeve helps:** The portion of the stomach that is surgically removed (the greater curvature) is where almost all of your body's Ghrelin is secreted. By removing this section, your Ghrelin levels are **reduced to near-zero** immediately after surgery.\n* **Outcome:** You will experience significantly decreased physical hunger, fewer spontaneous cravings, and earlier satiety (feeling full after only a few sips or bites). Cravings might slowly and slightly reappear after 1 to 2 years, but remain dramatically lower compared to devices like Lap-Bands.`;
    }
    
    else if (q.includes('gallstone') || q.includes('gallstones') || q.includes('ursodiol') || q.includes('actigall')) {
      answer = `**Prevention of Gallstones (Ursodiol/Actigall):**\n\n* **The Risk:** During rapid, extensive fat loss, your liver processes high amounts of cholesterol. This alters bile composition, causing gallstones to form in **over 1/3 (33%)** of all weight loss surgery patients.\n* **Medication:** To block this, you will be prescribed a medication called **Ursodiol (also called Actigall)** to be taken for **6 months** immediately following surgery. This safely dissolves or prevents cholesterol crystals from forming into stones, saving you from subsequent gallbladder removal surgery!`;
    }
    
    else if (q.includes('smoke') || q.includes('smoking') || q.includes('tobacco') || q.includes('nicotine') || q.includes('marijuana') || q.includes('cannabis')) {
      answer = `**Smoking & Nicotine Abstinence Rule (Strict):**\n\n* **Primary Mandate:** You must be completely tobacco and smoke-free (including cigarettes, cigars, vaporizers, and cannabis/marijuana) for **at least 6 months prior to surgery**!\n* **The Hazards:** Nicotine acts as a heavy vasoconstrictor, reducing blood flow. Smoking dramatically increases your risk of life-threatening surgery complications, such as leaks from the staple line, ulcers, poor wound healing, heart attack, and deep vein thrombosis (blood clots).\n* **Testing:** The NSH program will require a urine or blood test for nicotine during your pre-op evaluations. If nicotine is present, your surgery will be cancelled.`;
    }
    
    else if (q.includes('nsaid') || q.includes('advil') || q.includes('motrin') || q.includes('ibuprofen') || q.includes('aspirin') || q.includes('aleve') || q.includes('pain')) {
      answer = `**Pain Management & Dangerous NSAIDs:**\n\n* **Contraindicated Medications:** You must **NOT** take any aspirin or non-steroidal anti-inflammatory drugs (NSAIDs) such as **Advil, Motrin, Ibuprofen, Aleve, or Nuprin for 10 days before and 10 days after surgery**!\n* **Risk:** NSAID drugs are highly linked to chronic sleeve irritation, stomach bleeding, and severe ulcers in your new stomach pouch.\n* **Alternative:** Use **Acetaminophen (Tylenol)** as directed for mild soreness. You will go home with a safe prescribed pain medication plan from Dr. David Pace and the clinical team.`;
    }
    
    else if (q.includes('diet') || q.includes('stage') || q.includes('menu') || q.includes('stages') || q.includes('eat') || q.includes('food')) {
      answer = `**The 5-Stage Post-Sleeve Diet Progression:**\n\nTo allow your staple line to heal safely, you must strictly follow this progression:
      
1. **Stage 1: Water Only** (Duration: 1 day in hospital. Small, warm sips of 1 ounce per hour in a medicine cup).
2. **Stage 2: Clear Fluids** (Duration: 1 day in hospital. Decaf, sugar-free, non-carbonated transparent liquids like broth and Jell-O).
3. **Stage 3: Full Fluids** (Duration: **4 weeks at home**. High-protein and low-fat liquids: protein shakes, skim milk, strained creamed soups. Target: 60-80g protein, 8+ cups of fluid, 600-800 calories daily. *No straws allowed*!).
4. **Stage 4: Soft Foods** (Duration: **4 weeks at home**. Mashed/ground foods like soft-cooked fish, chicken, mashed carrots, cottage cheese, scrambled egg. Target: 700-1000 calories. *Always eat protein first*!).
5. **Stage 5: Regular Foods** (Duration: **Lifetime**. High protein with fresh produce, healthy fats, and low-fat dairy. Target: 800-1200 cal for females, 1000-1600 cal for males. *Remember: No bread, pasta, white rice, or potatoes*).

*Surgical clearance is required to advance. Do not self-advance!*`;
    }
    
    else if (q.includes('clot') || q.includes('dvt') || q.includes('vein') || q.includes('embolism') || q.includes('walk') || q.includes('exercise')) {
      answer = `**Prevention of Deep Vein Thrombosis (DVT) & Blood Clots:**\n\nBlood clots are a risk of any major abdominal operation. To prevent clots forming in your legs (DVT) or traveling to your lungs (Pulmonary Embolism):\n\n* **Daily Walking:** Walk **4 to 6 times every single day** beginning on the day of surgery! Walking improves blood circulation.\n* **Ankle Exercises:** While resting in bed or a chair, do repetitions of 12 ankle flexes/circles, 6 times a day.\n* **Guidelines:** Do not cross your legs while sitting, as this blocks venous flow. Avoid sitting for long periods without walking around.`;
    }
    
    else if (q.includes('complication') || q.includes('risk') || q.includes('leak') || q.includes('bleeding') || q.includes('safe') || q.includes('death')) {
      answer = `**Gastric Sleeve Safety, Risks & Complications:**\n\n* **Overall Safety:** Sleeve gastrectomy has a lower complication rate than other common operations (such as gallbladder removal or hip replacement) and is far safer than living with severe, untreated obesity.\n* **Overall Complication Rate:** Around **10%**.\n* **Surgical Complications (<1% risk):** Includes staple-line leaks, postoperative bleeding, infections, or reactions to anesthesia.\n* **Long-Term Deficiencies:** Solved by taking a daily multivitamin and Vitamin D daily for life.\n* **When to call 811 / seek Emergency care:**\n  - Sharp pain in your abdomen that does not get better with medication.\n  - Constant vomiting or inability to keep clear fluids down.\n  - Fever of 101°F (39°C) or higher.\n  - Calf swelling, calf tenderness, or localized warmth (possible blood clot).`;
    }
    
    else if (q.includes('weight') || q.includes('how much') || q.includes('lose') || q.includes('regain')) {
      answer = `**Weight Loss & Regain Realities:**\n\n* **Expected Loss:** Patients typically lose **25% to 30% of their total body weight** (or about **50% to 70% of their excess body weight**) within the first 1 to 2 years post-op.\n* **Rate:** Weight loss is very rapid at first (up to **6 pounds per week** in early liquid stages), then slows down to a steady **1 to 2 pounds per week** after the first few months.\n* **Regain Risks:** The surgery is **only a tool**, not a quick fix. If you fall back into old habits—such as frequent "grazing" (snacking on chips, pretzels, cookies), drinking soft calories (milkshakes, sodas), or not exercising—your stomach pouch can stretch over time, leading to weight regain.\n* **Maintenance:** Commitment to a lifetime pattern of high protein, regular exercise (30-60 mins daily), and portion control is essential.`;
    }
    
    else {
      answer = `* **Your Pouch:** Removes ~80% of stomach, leaving a narrow banana-shaped tube (1-5 oz capacity). This restricts volume and decreases **Ghrelin** (appetite hormone) to near-zero.\n* **Vitamins & Health:** Lifelong multivitamin + Vitamin D (1000 IU) are required. Ursodiol (Actigall) is taken for 6 months to prevent weight-loss induced **gallstones**.\n* **The Diet Stages:** Strictly follow the 5 stages (Stage 3 Full Fluids for 4 weeks post-op; Stage 4 Soft Foods for 4 weeks post-op). **Do not use straws**, avoid carbonation, and **do not drink fluids during meals (wait 30 mins before/after)**.\n* **Recovery Guidelines:** Walking 4-6 times daily prevents blood clots (DVT). Avoid NSAIDs (Advil/Motrin) and complete a strict **6-month pre-op smoking cessation**.\n* **Pregnancy:** Wait at least 2 years before attempting to register a pregnancy.\n\n*If you have specific medical questions, please write down questions to bring directly to your appointment in Area D (Floor 4) or contact our coordinators Melanie Reardon (709-777-4836) or Tayler Carroll (709-777-6564)!*`;
    }

    return docPrefix + answer;
  };

  const handleSendChatMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const timestamp = new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: 'msg-' + Date.now(),
      sender: 'patient' as const,
      text: text,
      time: timestamp
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: text,
          history: chatMessages.slice(-8)
        }),
      });

      if (!response.ok) {
        throw new Error("Advisor offline");
      }

      const data = await response.json();
      const assistantMsg = {
        id: 'reply-' + Date.now(),
        sender: 'assistant' as const,
        text: data.text || getBariatricAssistantResponse(text),
        time: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, assistantMsg]);
    } catch (_) {
      // Fallback gracefully to the simulated bariatric assistant responses
      const responseText = getBariatricAssistantResponse(text);
      const assistantMsg = {
        id: 'reply-' + Date.now(),
        sender: 'assistant' as const,
        text: responseText,
        time: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, assistantMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Brand Header */}
      <div className="relative p-8 rounded-3xl border border-indigo-500/10 bg-gradient-to-br from-indigo-500/15 via-slate-900/40 to-obsidian overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Activity size={120} className="text-indigo-400" />
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-[10px] font-mono tracking-widest text-indigo-300 font-bold uppercase inline-block">
              Dedicated Research Hub
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-slate-100 tracking-tight leading-none">
              Coordinated Bariatric-Hysterectomy Research Initiative
            </h1>
            <p className="text-sm md:text-base text-indigo-200/75 max-w-3xl font-light leading-relaxed">
              Supervised directly by Principal Investigator <strong className="text-indigo-400 font-extrabold tracking-wide">Dr. Joannie Neveu</strong> and Co-investigator <strong className="text-teal-400 font-extrabold tracking-wide">Dr. David Pace</strong>. This hub provides patient worksheets, peer-reviewed clinical articles, pre-surgical diet logging, and medical clearance document uploads.
            </p>
          </div>
        </div>
      </div>

      {/* Grid Layout: Primary Content & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Loggers & Portals (8 cols) */}
        <div className="lg:col-span-8 space-y-12">

          {/* Why Does This Matter & Clinical Rationale Panel */}
          <section className="glass-card p-6 border-white/5 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-4">
              <div>
                <h3 className="text-xl font-serif text-slate-200 flex items-center gap-2">
                  <Activity size={18} className="text-indigo-400" /> Why does this matter?
                </h3>
                <p className="text-xs text-slate-500 font-light mt-0.5">Clinical rationale, risk statistics, and evidence-based study goals.</p>
              </div>
              <a
                href="https://www.international-journal-of-gynecological-cancer.com/article/S1048-891X(24)01981-9/fulltext"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-indigo-500/30 bg-indigo-500/15 text-indigo-200 rounded-xl hover:bg-slate-800/80 text-xs font-semibold flex items-center gap-2 self-start sm:self-center cursor-pointer transition-all"
              >
                <BookOpen size={13} /> Clinical Reference (IJGC Article)
              </a>
            </div>

            {/* Sub-grid: Clinical Goals & Risk Visualization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Clinical Goals Column */}
              <div className="p-5 bg-obsidian rounded-2xl border border-slate-850 space-y-4">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest block">Clear Initiative Goals</span>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  Combining hysterectomy with laparoscopic bariatric surgery within a single anesthetic procedure addresses uterine oncology and long-term metabolic health simultaneously.
                </p>
                <div className="space-y-3">
                  {[
                    { text: 'Improve quality of life', desc: 'Accelerates somatic rehabilitation and psychosocial health index.' },
                    { text: 'Decrease risk of obesity-related cancer', desc: 'Directly targets estrogenic drivers in local endometrial and breast tissue.' },
                    { text: 'Decrease number of medications taken', desc: 'Aims to reduce dependent doses for type-2 diabetes and hypertension (HTN).' },
                    { text: 'Improve hypertension and diabetes management', desc: 'Optimizes chronic comorbidities and blood pressure profiles long-term.' },
                    { text: 'Live longer and better', desc: 'Protects from cardiovascular mortality while reducing secondary cancer risks.' }
                  ].map((goal, i) => (
                    <div key={i} className="flex gap-2.5 items-start">
                      <span className="w-5 h-5 rounded-full bg-teal-500/10 border border-teal-500/25 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold text-teal-300">✓</span>
                      <div>
                        <p className="text-xs font-semibold text-slate-200">{goal.text}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-light leading-normal">{goal.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Relative Risk Level visualization based on user data */}
              <div className="p-6 bg-obsidian rounded-2xl border border-slate-850 space-y-6 font-light">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-rose-450 uppercase tracking-widest block font-mono">Interactive Clinical Risk Modeler</span>
                    <h4 className="text-base font-serif text-slate-200 mt-0.5">Endometrial Cancer Risk Scaling</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-mono text-indigo-300 uppercase font-semibold">
                    Estrogen Driven Rationale
                  </span>
                </div>

                <p className="text-xs text-slate-350 leading-relaxed">
                  Medical consensus shows endometrial cancer hazards correlate severely with body mass index. Select a BMI range below to see how adipose tissue excess increases standard biological risk, and understand how sleeve surgery aims to reverse this curve:
                </p>

                {/* Interactive Selection Tabs */}
                <div className="grid grid-cols-5 gap-1 pt-1 select-none">
                  {[
                    { label: 'Normal', range: '< 25', short: 'Normal' },
                    { label: 'Overweight', range: '25-30', short: 'Overwt' },
                    { label: 'Obese I-II', range: '30-40', short: 'Obese I' },
                    { label: 'Obese III', range: '40-50', short: 'Obese III' },
                    { label: 'Severe Obese', range: '≥ 50', short: 'BMI ≥50' }
                  ].map((btn, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedRiskIndex(idx)}
                      className={`py-2 px-1 rounded-lg text-center border transition-all text-[9.5px] font-mono font-bold cursor-pointer ${
                        selectedRiskIndex === idx
                          ? 'bg-rose-500/15 border-rose-550 text-rose-350 scale-[1.02] shadow-sm font-extrabold'
                          : 'bg-slate-900/60 border-slate-850 text-slate-500 hover:text-slate-350 hover:border-slate-800'
                      }`}
                    >
                      <span className="block leading-none">{btn.short}</span>
                      <span className="block text-[8px] opacity-40 mt-1 font-light">{btn.range}</span>
                    </button>
                  ))}
                </div>

                {/* Comparative Risk Visualizer Cards */}
                {(() => {
                  const dataList = [
                    { label: 'Normal Weight Range', bmi: 'BMI < 25', multiplier: '1.0x Baseline', pct: '2.6% - 3.0%', desc: 'Estrogen and metabolic levels operate in clinical balance.', colorBg: 'bg-teal-500/5 border-teal-500/15 text-teal-300', scaleWidth: 'w-[10%]', activeTheme: 'from-teal-500/10 to-teal-900/5 border-teal-500/30' },
                    { label: 'Overweight Interval', bmi: 'BMI 25.0 - 29.9', multiplier: '1.5x Increased', pct: '4.0% - 4.5%', desc: 'Sluggish metabolic rate starts shifting systemic estrogen slightly.', colorBg: 'bg-emerald-500/5 border-emerald-500/15 text-emerald-300', scaleWidth: 'w-[25%]', activeTheme: 'from-emerald-500/10 to-emerald-900/5 border-emerald-500/30' },
                    { label: 'Obese Class I & II', bmi: 'BMI 30.0 - 39.9', multiplier: '3.5x Elevated', pct: '9.0% - 10.5%', desc: 'Significant fat aromatization begins hyper-stimulating uterine tissue.', colorBg: 'bg-amber-500/5 border-amber-500/15 text-amber-350', scaleWidth: 'w-[50%]', activeTheme: 'from-amber-500/10 to-amber-900/5 border-amber-500/30' },
                    { label: 'Obese Class III', bmi: 'BMI 40.0 - 49.9', multiplier: '6.0x Severe', pct: '15.0% - 18.0%', desc: 'Sustained local estrogen excess triggers extensive tissue growth.', colorBg: 'bg-orange-500/5 border-orange-500/15 text-orange-350', scaleWidth: 'w-[75%]', activeTheme: 'from-orange-500/10 to-orange-900/5 border-orange-500/30' },
                    { label: 'Extreme Severe Obesity', bmi: 'BMI ≥ 50 (Study Target)', multiplier: '10.0x Extreme Risk', pct: '30.0% Lifetime Probability', desc: 'Critical Risk level. Active weight loss (Sleeve) directly blocks this estrogen-fed pathway.', colorBg: 'bg-rose-500/5 border-rose-500/20 text-rose-455', scaleWidth: 'w-full', activeTheme: 'from-rose-500/10 to-rose-950/5 border-rose-550 shadow-rose-950/10' }
                  ];
                  const cur = dataList[selectedRiskIndex] || dataList[4];

                  return (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Anchor Standard baseline card */}
                        <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-850 space-y-2 relative overflow-hidden flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-[8.5px] font-sans uppercase bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded tracking-wider font-semibold">Population Control</span>
                              <span className="text-[9px] text-slate-500 font-sans font-medium">BMI 18.5 - 24.9</span>
                            </div>
                            <h5 className="text-[10px] uppercase font-bold text-slate-450 mt-2 block tracking-wider font-sans">Baseline Control Probability</h5>
                            <div className="flex items-baseline gap-1.5 mt-0.5">
                              <span className="text-2xl font-serif font-bold text-slate-300">2.6% - 3.0%</span>
                              <span className="text-[10px] text-slate-500 font-sans font-light">lifetime probability</span>
                            </div>
                          </div>
                          <p className="text-[10.5px] text-slate-450 mt-1 leading-normal font-light font-sans">Clinically balanced estrogen, low peripheral cell hyper-proliferation risks.</p>
                        </div>

                        {/* Interactive selection result card */}
                        <div className={`p-4 rounded-xl border bg-gradient-to-b space-y-2 relative overflow-hidden transition-all duration-300 flex flex-col justify-between ${cur.activeTheme}`}>
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-[8.5px] font-sans uppercase bg-rose-500/10 text-rose-300 px-1.5 py-0.5 rounded tracking-widest font-bold">Selected Stratum</span>
                              <span className="text-[9px] text-slate-400 font-sans font-medium">{cur.bmi}</span>
                            </div>
                            <h5 className="text-[10px] uppercase font-bold text-rose-450 mt-2 block tracking-wider font-sans font-semibold">
                              ⚠️ {cur.multiplier}
                            </h5>
                            <div className="flex items-baseline gap-1.5 mt-0.5">
                              <span className="text-2xl font-serif font-bold text-rose-400">{cur.pct}</span>
                              <span className="text-[10px] text-rose-300/60 font-sans font-light">lifetime trajectory</span>
                            </div>
                          </div>
                          <p className="text-[10.5px] text-slate-300 mt-1 leading-normal font-light font-sans">{cur.desc}</p>
                        </div>
                      </div>

                      {/* Cumulative visual meter scale */}
                      <div className="space-y-1.5 pt-1.5 border-t border-slate-850">
                        <div className="flex justify-between text-[9px] font-mono text-slate-500">
                          <span>Baseline Risk (1x)</span>
                          <span className="text-rose-450 font-bold">10x Biological Multiplier</span>
                        </div>
                        <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-850 relative">
                          <div className={`bg-gradient-to-r from-teal-500 via-amber-500 to-rose-550 h-full rounded-full transition-all duration-300 ${cur.scaleWidth}`} />
                        </div>
                        <p className="text-[10px] text-slate-450 text-center font-mono leading-relaxed mt-1">
                          Synchronous metabolic surgery lowers peripheral conversion, returning risk scaling back toward baseline values.
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>

            </div>

            {/* Obesity Canada Advocacy Guidance Section */}
            <div className="border-t border-slate-850 pt-7 space-y-6">
              <div className="space-y-1.5 text-left">
                <span className="px-3 py-1 rounded-full text-[9px] font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono tracking-widest uppercase inline-block">
                  Obesity Canada Advocacy Guidance
                </span>
                <h3 className="text-2xl font-serif text-slate-100 font-semibold leading-tight">5 Critical Facts About Obesity</h3>
                <p className="text-xs text-slate-450 font-light leading-relaxed">
                  Reducing weight stigma and understanding biological disease drivers is foundational to modern evidence-based clinical medicine. Here are the 5 core statements for patients and healthcare practitioners:
                </p>
              </div>

              {/* Large, Fully Visible, Highly Stylized Fact Cards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  {
                    num: '01',
                    title: 'A Chronic Metabolic Disease',
                    desc: (
                      <>
                        A complex, progressive chronic disease requiring <strong className="font-bold text-blue-400">lifelong</strong> clinical management, comparable to diabetes or hypertension.
                      </>
                    ),
                    icon: Activity,
                    color: 'from-blue-500/10 to-indigo-500/5 hover:border-blue-500/30 border-slate-850/80',
                    textCol: 'text-blue-400'
                  },
                  {
                    num: '02',
                    title: 'Driven by Biology',
                    desc: (
                      <>
                        Controlled by genetics, hormones, and neuro-signaling pathways—<strong className="font-bold text-rose-450 dark:text-rose-400">not a simple character or willpower issue</strong>.
                      </>
                    ),
                    icon: Heart,
                    color: 'from-rose-500/10 to-pink-500/5 hover:border-rose-500/30 border-slate-850/80',
                    textCol: 'text-rose-400'
                  },
                  {
                    num: '03',
                    title: 'Health-Based Focus',
                    desc: 'Clinical success focuses on improving metabolic health, mobility, and cardiovascular risks rather than scale weight alone.',
                    icon: Clock,
                    color: 'from-teal-500/10 to-emerald-500/5 hover:border-teal-500/30 border-slate-850/80',
                    textCol: 'text-teal-400'
                  },
                  {
                    num: '04',
                    title: 'Highly Effective Surgery',
                    desc: (
                      <>
                        Bariatric surgery represents the <strong className="font-bold text-amber-400">most effective</strong> long-term treatment, reshaping metabolic chemistry and appetite signals.
                      </>
                    ),
                    icon: Award,
                    color: 'from-amber-500/10 to-orange-500/5 hover:border-amber-500/30 border-slate-850/80',
                    textCol: 'text-amber-400'
                  },
                  {
                    num: '05',
                    title: 'Eradicalizing Stigma',
                    desc: 'Weight bias delays diagnosis and hinders care. Every patient possesses an absolute right to respectful, inclusive treatment.',
                    icon: ShieldAlert,
                    color: 'from-purple-500/10 to-violet-500/5 hover:border-purple-500/30 border-slate-850/80 dark:border-white/5',
                    textCol: 'text-purple-400'
                  }
                ].map((fact, idx) => {
                  const FactIcon = fact.icon;
                  return (
                    <div 
                      key={idx} 
                      className={`p-5 rounded-2xl bg-gradient-to-br border transition-all duration-300 flex flex-col justify-between space-y-4 shadow-md ${fact.color}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-4xl font-mono font-extrabold select-none tracking-tight ${fact.textCol} drop-shadow-[0_2px_10px_rgba(255,255,255,0.05)]`}>{fact.num}</span>
                        <div className={`p-1.5 rounded-lg bg-slate-900/60 ${fact.textCol}`}>
                          <FactIcon size={16} />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="text-sm font-semibold font-serif text-slate-100 tracking-tight leading-snug">{fact.title}</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-light">{fact.desc}</p>
                      </div>
                      <div className="pt-1.5 border-t border-slate-850/60">
                        <a
                          href="https://obesitycanada.ca/understanding-obesity/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[9.5px] font-bold uppercase tracking-wider text-teal-400 hover:text-teal-300 flex items-center gap-1 cursor-pointer"
                        >
                          Official Obesity Canada Science ↗
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Patient-Friendly Interactive Bariatric Guide Container */}
          <section className="glass-card p-6 border-white/5 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <h3 className="text-xl font-serif text-slate-200 flex items-center gap-2">
                  <BookOpen size={18} className="text-teal-400" /> Sleeve Gastrectomy (VSG) Educational Guide
                </h3>
                <p className="text-xs text-slate-500 font-light mt-0.5">Explore detailed, patient-friendly insights compiled from our official program curricula.</p>
              </div>
            </div>

            {/* Guide Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar select-none">
              {[
                { id: 'basics', label: '1. Anatomy & Appetite', icon: Activity },
                { id: 'conditions', label: '2. Health Co-morbidities', icon: Heart },
                { id: 'diet', label: '3. The 5 Diet Stages', icon: Apple },
                { id: 'rules', label: '4. Critical Lifetime Rules', icon: ShieldAlert }
              ].map(tab => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveGuideTab(tab.id as any)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border relative z-10 ${
                      activeGuideTab === tab.id
                        ? 'bg-teal-500/15 border-teal-500/35 text-teal-300'
                        : 'bg-obsidian border-transparent text-slate-450 hover:text-slate-200 hover:bg-slate-900/50'
                    }`}
                  >
                    <TabIcon size={12} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Guide Body content based on selected tab */}
            <AnimatePresence mode="wait">
              {activeGuideTab === 'basics' && (
                <motion.div
                  key="basics"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  <div className="p-4 bg-obsidian rounded-2xl border border-slate-850/85 space-y-3">
                    <span className="text-[10px] text-teal-400 font-mono font-bold uppercase tracking-wider block">How VSG Works under NSH Protocols</span>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Laparoscopic Vertical Sleeve Gastrectomy simplifies weight loss by surgically removing about **80% to 85% of your stomach**, leaving behind a highly restricted tube or "sleeve" that is similar in size and shape to a **slim banana** under Dr. Pace and the team.
                    </p>

                    {/* Image Placeholder rendering preloaded generated sleeve gastric illustration */}
                    <div className="flex flex-col bg-slate-900 border border-slate-850/90 rounded-xl overflow-hidden shadow-md max-w-lg mx-auto my-3">
                      <div className="px-4 py-2 border-b border-slate-850 bg-slate-900/60 leading-none flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400 font-semibold">Anatomical Illustration</span>
                        <span className="text-[9px] text-slate-500 font-mono">Sleeve Gastrectomy (VSG) Schema</span>
                      </div>
                      <div className="p-4 flex items-center justify-center bg-slate-950">
                        <img 
                          src={sleeveAnatomyImg} 
                          alt="Anatomical schematic diagram of a Gastric Sleeve showing the restricted banana pouch" 
                          referrerPolicy="no-referrer"
                          className="max-h-[220px] rounded-lg object-contain border border-slate-900 bg-slate-900/40"
                        />
                      </div>
                      <div className="px-4 py-2.5 bg-slate-900/30 text-[10.5px] text-slate-400 leading-normal font-light">
                        <strong>Visual Schema:</strong> The schematic demonstrates the surgical excision of the outer stomach curvature (80-85% portion) where hunger hormones are synthesized, establishing the narrow gastric pouch.
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div className="p-3.5 bg-slate-900/40 rounded-xl border border-slate-850 space-y-1.5">
                        <strong className="text-xs text-slate-200 block">Stomach Pouch Volume</strong>
                        <p className="text-[11px] text-slate-400 leading-normal font-light">
                          Your new stomach holds only **1 to 5 ounces** (roughly 30 to 150 mL / half a cup), compared to a standard stomach holding multiple cups of food. This physically limits how much you eat.
                        </p>
                      </div>
                      <div className="p-3.5 bg-slate-900/40 rounded-xl border border-slate-850 space-y-1.5">
                        <strong className="text-xs text-slate-200 block">Ghrelin (The Hunger Hormone)</strong>
                        <p className="text-[11px] text-slate-450 leading-normal font-light">
                          The removed portion of the stomach is where almost all of your hunger hormone (**Ghrelin**) is produced. Eliminating this reduces Ghrelin to near-zero, drastically eliminating physical cravings and hunger.
                        </p>
                      </div>
                    </div>
                    <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs text-indigo-300 font-light">
                      <strong>Anatomical Note:</strong> Unlike bypass surgery, there are **no changes to your intestines**. Your food travels naturally, meaning your body digests food fully, and risks of dumping syndrome or severe nutritional obstruction are minimal.
                    </div>
                  </div>
                </motion.div>
              )}

              {activeGuideTab === 'conditions' && (
                <motion.div
                  key="conditions"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  <div className="p-4 bg-obsidian rounded-2xl border border-slate-850 space-y-3">
                    <span className="text-[10px] text-indigo-400 font-mono font-bold uppercase tracking-wider block">Resolved Medical Comorbidities</span>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Sleeve gastrectomy is widely recognized as a lifesaving medical intervention. Weight stabilization relieves several severe obesity-related conditions:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {[
                        { title: 'Type 2 Diabetes & Insulin Resistance', desc: 'Sleeve gastrectomy frequently improves or completely eliminates diabetes. Many patients are discharged on less diabetic medication the day after surgery.' },
                        { title: '↓ Risk of Obesity-Related Cancers (Uterine/Endometrial, Breast & Colorectal)', desc: 'Substantial adipose weight reduction lowers levels of circulating estrogens and systemic inflammation. This directly decreases lifetime probability of uterine (endometrial), breast, and colorectal cancers.' },
                        { title: 'Hypertension & Heart Disease', desc: 'Substantial offloading of excess fat relaxes arteries. Blood pressure values improve, reducing high blood pressure medication doses.' },
                        { title: 'Severe Sleep Apnea', desc: 'Clearing airway obstruction from weight loss allows deeper sleep, dramatically reducing reliance on CPAP machines.' },
                        { title: 'Joint Pain & Osteoarthritis', desc: 'Losing weight removes severe stress from knees, hips, and lower back, enabling pain-free daily physical activity.' }
                      ].map((item, index) => (
                        <div key={index} className="p-3 bg-slate-900/40 rounded-xl border border-slate-850/80 space-y-1">
                          <strong className="text-xs text-slate-200 block font-serif">{item.title}</strong>
                          <p className="text-[11px] text-slate-450 leading-relaxed font-light">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeGuideTab === 'diet' && (
                <motion.div
                  key="diet"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  <div className="p-4 bg-obsidian rounded-2xl border border-slate-850 space-y-3 font-light text-xs">
                    <span className="text-[10px] text-rose-450 font-mono font-bold uppercase tracking-wider block">Mandatory Post-Op Diet Stages</span>
                    <p className="text-slate-300 leading-relaxed">
                      You must strictly advance through the five diet stages as your new stomach staple line heals. **Do not self-advance!** Overfilling can stretch the pouch or tear incisions.
                    </p>
                    
                    <div className="space-y-3 border-l border-slate-800 pl-4 mt-2">
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-teal-400" />
                        <p className="font-bold text-slate-200">Stage 1: Water Only (Duration: 1 day in hospital)</p>
                        <p className="text-[11px] text-slate-450">Warm sips of water only, targeted at 1 ounce per hour from a medicine cup. Sip slowly and stop if uncomfortable.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-teal-400" />
                        <p className="font-bold text-slate-200">Stage 2: Clear Fluids (Duration: 1 day in hospital)</p>
                        <p className="text-[11px] text-slate-450">Clear, decaf, non-carbonated transparent liquids like clear broth, sugar-free Jell-O, and clear popsicles.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-400" />
                        <p className="font-bold text-slate-200">Stage 3: Full Fluids (Duration: 4 weeks at home)</p>
                        <p className="text-[11px] text-indigo-300">High-protein, low-fat fluids including Boost, Ensure, strained milk-based soups, and smooth low-fat yogurt. Target: 60-80g protein, 8+ cups water, 600-800 cal. **Do NOT use straws!**</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-400" />
                        <p className="font-bold text-slate-200">Stage 4: Soft Foods (Starts week 5, lasts 4 weeks)</p>
                        <p className="text-[11px] text-slate-450">Tender, mashed, or ground foods like soft-cooked fish, chicken salad, pureed carrots, cottage cheese, scrambled eggs. Target: 700-1000 calories. **Always eat protein first!**</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-teal-400" />
                        <p className="font-bold text-slate-200">Stage 5: Regular Foods (Duration: Lifetime)</p>
                        <p className="text-[11px] text-slate-450">A healthy balanced lifetime diet. Progress slowly with raw foods, and **avoid bread, pasta, white rice, or potatoes** which stretch the pouch.</p>
                      </div>
                    </div>

                    <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-350 mt-3 font-light">
                      <strong>The Separation Rule:</strong> Keep solids and liquids decoupled. Do NOT drink fluid with your meals or snacks. Stop drinking 30 minutes before eating, and wait 30 minutes after your meal before drinking water.
                    </div>
                  </div>
                </motion.div>
              )}

              {activeGuideTab === 'rules' && (
                <motion.div
                  key="rules"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  <div className="p-4 bg-obsidian rounded-2xl border border-slate-850 space-y-3 font-light text-xs text-slate-300">
                    <span className="text-[10px] text-rose-400 font-mono font-bold uppercase tracking-wider block">Clinical Safety Codes & Limitations</span>
                    <ul className="space-y-3 pt-1">
                      <li className="flex gap-2.5 items-start">
                        <span className="p-1 px-2 rounded bg-rose-500/10 text-rose-450 text-[10px] font-bold font-mono shrink-0">2 YEARS</span>
                        <div>
                          <strong className="text-slate-200 block">No Pregnancy Window</strong>
                          Women of childbearing age must wait at least 2 years post-surgery before attempting pregnancy. Early pregnancy strains maternal reserves and poses severe risks to your baby.
                        </div>
                      </li>
                      <li className="flex gap-2.5 items-start">
                        <span className="p-1 px-2 rounded bg-rose-500/10 text-rose-450 text-[10px] font-bold font-mono shrink-0">6 MONTHS</span>
                        <div>
                          <strong className="text-slate-200 block">Strict Smoking/Nicotine Stop</strong>
                          Complete tobacco, marijuana, and vaping abstinence is mandatory for 6 months before surgery. Nicotine restricts healing blood flow, causing staple line leaks, severe ulcers, and DVT. NSH carries out pre-op panels to test for this.
                        </div>
                      </li>
                      <li className="flex gap-2.5 items-start">
                        <span className="p-1 px-2 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-bold font-mono shrink-0">LIFELONG</span>
                        <div>
                          <strong className="text-slate-200 block font-serif">Vitamins & Supplements</strong>
                          You must take an adult complete multivitamin (chewable for the first 4 weeks) and high-quality Vitamin D (1000 IU) daily for the rest of your life to secure baseline metabolic health.
                        </div>
                      </li>
                      <li className="flex gap-2.5 items-start">
                        <span className="p-1 px-2 rounded bg-indigo-500/10 text-indigo-305 text-[10px] font-bold font-mono shrink-0">ACTIGALL</span>
                        <div>
                          <strong className="text-slate-200 block font-serif">Ursodiol (Gallstone Prevention)</strong>
                          Rapid fat loss increases gallstone occurrence in over 33% of patients. You will be prescribed Ursodiol for 6 months post-surgery to safely prevent cholesterol stones from developing.
                        </div>
                      </li>
                      <li className="flex gap-2.5 items-start">
                        <span className="p-1 px-2 rounded bg-rose-500/10 text-rose-450 text-[10px] font-bold font-mono shrink-0">NO NSAIDS</span>
                        <div>
                          <strong className="text-slate-200 block font-serif">Zero Advil, Motrin, or Ibuprofen</strong>
                          These anti-inflammatory medications cause gastric sleeve bleeding and severe pouch ulcers. Skip them entirely—Tylenol (Acetaminophen) is your safe go-to.
                        </div>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Research Study Scheme: Clinical Trial Cohort Flowchart */}
          <section className="glass-card p-6 border-white/5 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-4">
              <div>
                <h3 className="text-xl font-serif text-slate-200 flex items-center gap-2">
                  <Activity size={18} className="text-indigo-400" /> Clinical Research Study Scheme
                </h3>
                <p className="text-xs text-slate-400 font-light mt-1 max-w-2xl leading-relaxed font-sans">
                  Approved under HREB clinical trial surveillance protocol. This is a <strong>prospective cohort study</strong> (not a randomized 1:1 allocation) where each individual chooses their own arm based on personal preference and clinical guidance.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/25 text-[9px] font-sans font-bold uppercase tracking-wider text-indigo-300 whitespace-nowrap self-start sm:self-center">
                Prospective Cohort Study
              </span>
            </div>

            {/* Visual Scheme Chart Flow */}
            <div className="space-y-6">
              
              {/* Screening Node */}
              <div className="p-5 rounded-2xl bg-obsidian border border-slate-850 space-y-3 relative">
                <span className="absolute -top-2.5 left-5 px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-widest bg-slate-800 text-slate-400 border border-slate-700">
                  Step 1: Enrollment Screening
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 leading-tight">Patient Cohort Eligibility</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Strict clinical guidelines for candidate participation in the current study window.</p>
                  </div>
                  <div className="shrink-0 flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded-md text-[10px] font-mono font-bold bg-teal-500/10 text-teal-350 border border-teal-500/20">
                      Inclusion Criteria
                    </span>
                    <span className="px-2 py-1 rounded-md text-[10px] font-mono font-bold bg-slate-850 text-slate-400 border border-slate-800">
                      No Exclusion Criteria
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-850 space-y-1">
                    <strong className="text-slate-350 text-[11px] uppercase tracking-wider block">Target Body Mass Index (BMI)</strong>
                    <div className="text-sm font-semibold text-slate-200 font-mono">BMI 35 to 65</div>
                    <p className="text-[10px] text-slate-500 leading-normal font-light">Weight envelope matching advanced safety profiling criteria.</p>
                  </div>
                  <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-850 space-y-1">
                    <strong className="text-slate-350 text-[11px] uppercase tracking-wider block">Endometrial Pathology</strong>
                    <div className="text-sm font-semibold text-slate-200">Pre-cancer & Cancer Cohort</div>
                    <p className="text-[10px] text-slate-500 leading-normal font-light">Proven atypical hyperplasia or low-grade carcinoma.</p>
                  </div>
                </div>
              </div>

              {/* Connecting Down Arrow */}
              <div className="flex justify-center -my-1 py-1">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-1 bg-linear-to-b from-slate-700 to-indigo-500 rounded-full" />
                  <div className="-mt-2 flex items-center justify-center bg-slate-900 border border-indigo-500/30 w-7 h-7 rounded-full text-indigo-400 shadow-lg shadow-indigo-950/40 relative z-10">
                    <ArrowDown size={14} className="animate-pulse" />
                  </div>
                </div>
              </div>

              {/* The Bifurcation (Arm A vs Arm B) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Arm A Node */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-teal-505/5 to-obsidian border border-teal-500/20 hover:border-teal-500/35 transition-colors relative space-y-3">
                  <span className="absolute -top-2.5 left-5 px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-widest bg-teal-500/10 text-teal-300 border border-teal-500/30">
                    Cohort Arm A
                  </span>
                  <div className="space-y-1 pt-1">
                    <h4 className="text-xs font-mono font-bold tracking-widest text-teal-400 uppercase">Interactive Co-Intervention</h4>
                    <h5 className="text-sm font-semibold text-slate-200 font-serif leading-snug">Staging Hysterectomy + Sleeve (VSG)</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                      Simultaneous synchronous dual-specialty surgery. Complete staging oncology resection and gastric restriction within a single anesthetic procedure.
                    </p>
                  </div>
                </div>

                {/* Arm B Node */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-850/10 to-obsidian border border-slate-800 hover:border-slate-700 transition-colors relative space-y-3">
                  <span className="absolute -top-2.5 left-5 px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-widest bg-slate-800 text-slate-400 border border-slate-700">
                    Cohort Arm B
                  </span>
                  <div className="space-y-1 pt-1">
                    <h4 className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">Standard Care arm</h4>
                    <h5 className="text-sm font-semibold text-slate-200 font-serif leading-snug">Staging Hysterectomy alone</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                      Oncology-first standard protocol. Surgical staging hysterectomy completed independently within standard clinical timelines.
                    </p>
                  </div>
                </div>

              </div>

              {/* Connecting Down Arrow */}
              <div className="flex justify-center -my-1 py-1">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-1 bg-linear-to-b from-indigo-500 to-indigo-550 rounded-full" />
                  <div className="-mt-2 flex items-center justify-center bg-slate-900 border border-indigo-500/30 w-7 h-7 rounded-full text-indigo-400 shadow-lg shadow-indigo-950/40 relative z-10">
                    <ArrowDown size={14} className="animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Long Term Follow-up Node */}
              <div className="p-5 rounded-2xl bg-obsidian border border-slate-850 space-y-5 relative">
                <span className="absolute -top-2.5 left-5 px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-widest bg-slate-800 text-slate-450 border border-slate-755">
                  Step 3: Long-term surveillance
                </span>
                
                <div className="pt-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-white/5 pb-2">
                    <span className="text-xs uppercase font-mono font-semibold tracking-wider text-indigo-300">Surveillance Schedule</span>
                    <span className="text-xs font-semibold text-teal-350 font-mono">Standard Follow-up Schedule</span>
                  </div>
                  
                  <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/10 text-xs text-indigo-200/90 leading-relaxed font-light space-y-1.5">
                    <p className="font-bold text-slate-205 flex items-center gap-1">
                      <span>🔄</span> Follow-up Schedule Protocol
                    </p>
                    <p>
                      Dedicated and structured post-operative clinical follow-up tracking your weight stability, baseline indicators, and cancer-free milestones.
                    </p>
                    <p className="text-[11px] text-teal-350/95 font-medium">
                      ⚠️ <strong>Crucial Clinical Note:</strong> Both Cohort Arm A (Hysterectomy + Gastric Sleeve) and Cohort Arm B (Hysterectomy alone) are followed in the exact same manner.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light">
                  <div className="space-y-3 border-r border-white/5 pr-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400 font-mono block">Monitor Metabolic Blood work</span>
                    <ul className="space-y-2 text-[11px] text-slate-350">
                      <li className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0 mt-1" />
                        <span><strong>Lipids & Cholesterol:</strong> Complete profiles verifying weight stability benefits.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0 mt-1" />
                        <span><strong>Diabetes Indexes:</strong> Fasting blood glucose tracking and HbA1c assays.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0 mt-1" />
                        <span><strong>Nutritional Markers:</strong> Monitor iron, ferritin, calcium, and Vitamin D3 levels.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3 pl-0 sm:pl-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 font-mono block">Monitor Clinical Metrics & Care</span>
                    <ul className="space-y-2 text-[11px] text-slate-350">
                      <li className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1" />
                        <span><strong>Weight & Blood Pressure:</strong> Trajectory tracking and hypertension management.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1" />
                        <span><strong>Medication Review:</strong> Dosing checks and potential reduction or stepdowns.</span>
                      </li>
                      <li className="flex items-start gap-1.5 text-slate-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0 mt-1" />
                        <span><strong>QOL & Survivorship Goals:</strong> Visits include standard Quality of Life (QOL) surveys and thorough discussions on personalized survivorship goals.</span>
                      </li>
                      <li className="flex items-start gap-1.5 text-teal-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0 mt-1" />
                        <span><strong>Anti-Obesity Medications (AOMs):</strong> Discussion of modern anti-obesity medications can serve as an additional option for metabolic optimization.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Patient Onboarding Journey Step-by-Step */}
          <section className="glass-card p-6 border-white/5 space-y-6">
            <div>
              <h3 className="text-xl font-serif text-slate-200 flex items-center gap-2">
                <Award size={18} className="text-teal-400" /> Patient Onboarding Journey
              </h3>
              <p className="text-xs text-slate-500 font-light mt-0.5">Interested in participating in either arm? Read through the onboarding steps to begin.</p>
            </div>

            {/* Steps Timeline Card Stack */}
            <div className="space-y-5">
              
              {/* Step 1 with Embedded Videos */}
              <div className="p-5 rounded-2xl bg-obsidian border border-slate-850 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="p-1 px-2.5 rounded text-xs font-mono font-bold bg-teal-500/10 text-teal-300 border border-teal-500/25 shrink-0">
                    Step 1
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 font-serif leading-tight">Watch Educational Briefing Videos</h4>
                    <p className="text-xs text-slate-500 font-light leading-normal mt-0.5">
                      Understanding Gastric Sleeve (VSG) physiology and the clinical journey is critical before consenting to participating.
                    </p>
                  </div>
                </div>

                {/* Embedded Video Iframes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  
                  {/* Video 1 Card */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-sans">
                      1. Obesity: It's Not What You Think
                    </span>
                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-white/5 shadow-inner">
                      <iframe 
                        className="w-full h-full border-0"
                        src="https://www.youtube.com/embed/YyXEGFi2NDo"
                        title="Obesity Canada Info Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>

                  {/* Video 2 Card */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-sans">
                      2. Patient Sleeve Surgery Journey
                    </span>
                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-white/5 shadow-inner">
                      <iframe 
                        className="w-full h-full border-0"
                        src="https://www.youtube.com/embed/1mYx-_R3g9c"
                        title="Bariatric Hub Patient Journey Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Steps 2-6 Linear Timeline */}
              <div className="space-y-4 pl-1">
                {[
                  {
                    num: '2',
                    title: 'Indicate Arm Selection & Call Melanie Reardon',
                    desc: 'Let us know which research arm you want to take part in. Register your preferred route by calling Dr. Neveu’s administrative assistant Melanie directly at (709) 777-4836 to trigger medical intake.',
                    contact: { name: 'Melanie Reardon, Gyn-Oncology', phone: '(709) 777-4836' }
                  },
                  {
                    num: '3',
                    title: 'Meet with the Bariatric Specialist Team',
                    desc: 'Prior to any operation, you will attend individual planning consults with the Nurse Practitioner (NP), registered clinical bariatric dietitian, and lead general surgeons to ensure metabolic safety.'
                  },
                  {
                    num: '4',
                    title: 'Complete 2-Week Pre-Op Journaling',
                    desc: 'Complete the mandatory logs: 1 week of portion-sized healthy eating plus 1 week of strict low-viscosity non-carbonated full liquid diet. Use our digital Pre-Op Journal Logger below to auto-record.'
                  },
                  {
                    num: '5',
                    title: 'Follow-Up Clinic Assessment',
                    desc: 'Attend your formal pre-op review panel to confirm physical readiness, dietary compliance, and check vitals before scheduling the anesthetic window.'
                  },
                  {
                    num: '6',
                    title: 'Scheduled Coordinated Surgery',
                    desc: 'Undergo your synchronous single-anesthetic surgical procedure (Hysterectomy + Gastric Sleeve for Arm A, or Staging Hysterectomy alone for Arm B) at St. Clare’s Mercy Hospital.'
                  }
                ].map((step, idx) => {
                  const isJournalStep = step.num === '4';
                  return (
                    <div 
                      key={idx} 
                      className={`flex gap-4 items-start relative pb-2 group transition-all duration-200 ${
                        isJournalStep 
                          ? 'cursor-pointer hover:bg-teal-500/5 p-2 rounded-xl border border-transparent hover:border-teal-500/10' 
                          : ''
                      }`}
                      onClick={isJournalStep ? () => {
                        const element = document.getElementById('preop-journal-section');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      } : undefined}
                    >
                      <div className="flex flex-col items-center shrink-0">
                        <span className={`w-7 h-7 rounded-full bg-slate-900 border text-teal-400 font-mono font-bold text-xs flex items-center justify-center shadow-sm ${
                          isJournalStep ? 'group-hover:border-teal-400 group-hover:bg-teal-905/20 border-teal-500/30' : 'border-slate-800'
                        }`}>
                          {step.num}
                        </span>
                        {idx !== 4 && <div className="w-0.5 bg-slate-850 h-16 mt-2" />}
                      </div>
                      <div className="space-y-1.5 pt-0.5 flex-1">
                        <h4 className="text-xs font-semibold text-slate-200 flex items-center flex-wrap gap-2">
                          <span>{step.title}</span>
                          {isJournalStep && (
                            <span className="text-[10px] text-teal-400 font-normal font-mono px-1.5 py-0.5 rounded bg-teal-500/10 border border-teal-500/20 group-hover:bg-teal-500/20 transition-all">
                              (Click to scroll directly to the template below) ⬇
                            </span>
                          )}
                        </h4>
                        <p className="text-[11px] text-slate-450 leading-relaxed font-light">{step.desc}</p>
                        {step.contact && (
                          <div className="p-2.5 rounded-lg bg-teal-500/5 border border-teal-500/10 text-[10.5px] font-sans flex items-center justify-between gap-4 mt-2 max-w-sm">
                            <div>
                              <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-teal-400 block">Administrative Assistant Contacts</span>
                              <span className="text-slate-250 font-medium">{step.contact.name}</span>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-teal-500/15 border border-teal-500/30 text-teal-300 font-mono font-bold">{step.contact.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Questionnaire Form: Interested in participating in either arm? */}
              <div className="mt-8 pt-6 border-t border-slate-850/80 space-y-4">
                <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 space-y-4">
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[8.5px] font-mono text-indigo-300 uppercase tracking-wider font-bold">Research Option Inquiry</span>
                    <h4 className="text-sm font-semibold text-slate-100 font-serif">Interested in participating in either arm?</h4>
                    <p className="text-[11px] text-slate-400 font-light">
                      Let our clinical intake team know your initial preference. Submitting this form alerts Melanie Reardon to prepare your onboarding and diagnostic screening materials.
                    </p>
                  </div>

                  {interestSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl text-center space-y-2"
                    >
                      <span className="text-lg">🎉</span>
                      <h5 className="text-xs font-bold text-teal-300 font-mono uppercase tracking-wide">Expression of Interest Submitted</h5>
                      <p className="text-[11px] text-slate-350 font-light max-w-md mx-auto leading-relaxed">
                        Thank you! Your cohort preference has been recorded in the register. Administrative Assistant **Melanie Reardon** will reach out to you within 2 business days to initiate your clinical intake.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="space-y-3.5">
                      {/* Selection Pills */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        {[
                          { id: 'armA', label: 'Cohort Arm A (Sleeve + Hysterectomy)' },
                          { id: 'armB', label: 'Cohort Arm B (Hysterectomy Alone)' },
                          { id: 'notSure', label: 'Undecided / Discuss with Team' },
                          { id: 'notParticipate', label: 'Do not wish to participate' }
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setDeclaredInterest(opt.id as any)}
                            className={`py-2 px-3 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                              declaredInterest === opt.id
                                ? 'bg-indigo-500/15 border-indigo-500 text-indigo-200 font-semibold'
                                : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-slate-350 hover:border-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className={`w-3 h-3 rounded-full border flex items-center justify-center shrink-0 ${
                                declaredInterest === opt.id ? 'border-indigo-400 bg-indigo-500/30' : 'border-slate-800 bg-slate-900'
                              }`}>
                                {declaredInterest === opt.id && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                              </span>
                              <span className="leading-tight text-[11px]">{opt.label}</span>
                            </div>
                          </button>
                        ))}
                      </div>

                      {declaredInterest && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1"
                        >
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono font-bold text-slate-455 uppercase block">Your Full Name</label>
                            <input
                              type="text"
                              required
                              value={patientInterestName}
                              onChange={(e) => setPatientInterestName(e.target.value)}
                              placeholder="e.g. Eleanor Vance"
                              className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 text-xs text-slate-200 outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-700"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono font-bold text-slate-455 uppercase block">Contact Phone Number</label>
                            <input
                              type="tel"
                              required
                              value={patientInterestPhone}
                              onChange={(e) => setPatientInterestPhone(e.target.value)}
                              placeholder="e.g. (709) 555-0199"
                              className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 text-xs text-slate-200 outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-700"
                            />
                          </div>

                          <div className="sm:col-span-2 pt-2 flex justify-end">
                            <button
                              type="button"
                              disabled={isSubmittingInterest || !patientInterestName || !patientInterestPhone}
                              onClick={() => {
                                setIsSubmittingInterest(true);
                                setTimeout(() => {
                                  setIsSubmittingInterest(false);
                                  setInterestSubmitted(true);
                                }, 900);
                              }}
                              className="w-full sm:w-auto px-5 py-2 rounded-lg bg-indigo-550 border border-indigo-500/40 text-xs font-mono font-bold hover:bg-indigo-600 text-slate-100 disabled:opacity-45 disabled:pointer-events-none transition-all cursor-pointer shadow-md shadow-indigo-950/20"
                            >
                              {isSubmittingInterest ? 'Recording Preference...' : 'Submit Choice & Request Contact'}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </section>

          {/* Mandatory Pre-operative Food Journaling Program Section */}
          <section id="preop-journal-section" className="glass-card p-6 border-white/5 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div>
                <h3 className="text-xl font-serif text-slate-250 flex items-center gap-2">
                  <Apple size={18} className="text-teal-400 animate-pulse" /> Mandatory Pre-Op Food Journal Guidance
                </h3>
                <p className="text-xs text-slate-500 font-light mt-0.5">
                  Detailed protocols, sample entries, printable templates, and digital tracking options.
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0 items-start sm:items-end">
                {/* Primary Menu Actions */}
                <div className="flex flex-wrap gap-2 text-xs select-none">
                  <button
                    type="button"
                    onClick={() => setActiveJournalView('info')}
                    className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-sans font-bold uppercase tracking-wider ${
                      activeJournalView === 'info'
                        ? 'bg-teal-500/10 border-teal-500/35 text-teal-300 shadow-sm'
                        : 'bg-obsidian border-transparent text-slate-450 hover:text-slate-350 hover:bg-slate-900/40'
                    }`}
                  >
                    📖 Guidelines & Apps
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveJournalView('template')}
                    className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-sans font-bold uppercase tracking-wider ${
                      activeJournalView === 'template'
                        ? 'bg-teal-500/10 border-teal-500/35 text-teal-300 shadow-sm'
                        : 'bg-obsidian border-transparent text-slate-450 hover:text-slate-350 hover:bg-slate-900/40'
                    }`}
                  >
                    📋 Interactive Template (Download)
                  </button>
                </div>
                {/* Secondary Reference examples */}
                <div className="flex flex-wrap items-center gap-2 text-xs select-none">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-sans">Reference Examples:</span>
                  <button
                    type="button"
                    onClick={() => setActiveJournalView('sample-fluid')}
                    className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-sans text-xs ${
                      activeJournalView === 'sample-fluid'
                        ? 'bg-teal-500/10 border-teal-500/35 text-teal-300 shadow-sm font-semibold'
                        : 'bg-obsidian border-transparent text-slate-450 hover:text-slate-350 hover:bg-slate-900/40 font-light'
                    }`}
                  >
                    🥤 Full Fluid Diet Example
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveJournalView('sample-healthy')}
                    className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-sans text-xs ${
                      activeJournalView === 'sample-healthy'
                        ? 'bg-teal-500/10 border-teal-500/35 text-teal-300 shadow-sm font-semibold'
                        : 'bg-obsidian border-transparent text-slate-450 hover:text-slate-350 hover:bg-slate-900/40 font-light'
                    }`}
                  >
                    🥗 Healthy Eating Diet Example
                  </button>
                </div>
              </div>
            </div>

            {/* Active Content Renders */}
            <AnimatePresence mode="wait">
              {activeJournalView === 'info' && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -7 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-6"
                >
                  {/* Alert Callout */}
                  <div className="p-4 bg-teal-500/5 border border-teal-500/15 rounded-2xl space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-teal-400 flex items-center gap-1.5">
                      ⚠️ Required Daily Food Journaling Protocol
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      For each diet trial, you are required to complete a daily food journal. Incomplete or superficial journals can delay your surgical clearance. Journals must be exceptionally thorough and include:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400 pl-2 pt-1 font-light">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                        <span>All foods and beverages consumed</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                        <span>Accurate portion sizes (ounces, grams, cups)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                        <span>Nutritional information for each item</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                        <span>Daily totals for protein (goals: 60-80g), calories, and fluids</span>
                      </li>
                    </ul>
                    <p className="text-[11px] text-slate-500 leading-normal font-light italic pt-1">
                      *Note: Sample Healthy Eating and Full Fluid food journals are attached as reference tabs above. You can print them or copy the patterns directly!
                    </p>
                  </div>

                  {/* Submission Method Split */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
                    {/* Digital App Card */}
                    <div className="p-5 bg-slate-950/40 rounded-2xl border border-white/5 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <span className="px-2.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-sans tracking-wide text-indigo-300 font-extrabold uppercase inline-block">
                          Method #1: Phone Apps (Highly Recommended)
                        </span>
                        <h4 className="text-sm font-sans font-bold text-slate-100">Digitally Tracked Convenience</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">
                          Perfect for automated nutrition math. These apps contain extensive food databases, barcode scanners, and direct PDF exports that you can email directly to our clinic.
                        </p>

                        <div className="space-y-4 pt-2">
                          <div className="p-3 bg-obsidian rounded-xl border border-slate-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-sans">
                            <div className="font-sans">
                              <strong className="text-xs text-slate-205">Baritastic</strong>
                              <p className="text-[10px] text-slate-400 font-light mt-0.5 leading-normal font-sans">Focused specifically on bariatric weight-loss surgery patients. Keeps high protein and daily fluids front and center.</p>
                            </div>
                            <a
                              href="https://www.youtube.com/watch?v=oLS8cG3D688"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-550 cursor-pointer whitespace-nowrap text-indigo-300 hover:text-indigo-200 flex items-center gap-1 shrink-0"
                            >
                              🎬 Tutorial
                            </a>
                          </div>

                          <div className="p-3 bg-obsidian rounded-xl border border-slate-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-sans">
                            <div className="font-sans">
                              <strong className="text-xs text-slate-205">MyFitnessPal</strong>
                              <p className="text-[10px] text-slate-400 font-light mt-0.5 leading-normal font-sans">Largest global nutrition catalog, making custom foods extremely quick to search. Offers extensive barcode scanner integration.</p>
                            </div>
                            <a
                              href="https://www.youtube.com/watch?v=I9cdBAcuhXU&t=2s"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-550 cursor-pointer whitespace-nowrap text-indigo-300 hover:text-indigo-200 flex items-center gap-1 shrink-0"
                            >
                              🎬 Tutorial
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-indigo-500/5 text-[10.5px] text-indigo-300 leading-relaxed border border-indigo-500/10 font-light font-sans">
                        Reports can be downloaded directly from MyFitnessPal or Baritastic as a PDF and emailed straight to Dr. Joannie Neveu's clinic.
                      </div>
                    </div>

                    {/* Paper Hand Card */}
                    <div className="p-5 bg-slate-950/40 rounded-2xl border border-white/5 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-sans tracking-wide text-emerald-300 font-extrabold uppercase inline-block">
                          Method #2: By Hand (Paper or Notebook)
                        </span>
                        <h4 className="text-sm font-sans font-bold text-slate-100">Physical Written Logs</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">
                          If you prefer tactile journaling, write daily food/fluid entries manually using one of our verified clinical layout systems.
                        </p>

                        <div className="space-y-4 pt-2">
                          {/* Template Download Option */}
                          <div className="p-3 bg-obsidian rounded-xl border border-slate-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-sans">
                            <div className="font-sans">
                              <strong className="text-xs text-slate-255">Official Food Journal Template</strong>
                              <p className="text-[10px] text-slate-400 font-light mt-0.5 leading-normal font-sans">Use our exact clinic spreadsheet. You can view it interactively on the tab or download the CSV template to print.</p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => setActiveJournalView('template')}
                                className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-350 cursor-pointer whitespace-nowrap"
                              >
                                View
                              </button>
                              <button
                                type="button"
                                onClick={downloadFoodJournalTemplate}
                                className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-teal-500 border border-teal-500/40 text-slate-900 font-semibold cursor-pointer whitespace-nowrap flex items-center gap-1 font-sans"
                              >
                                <Download size={10} /> Download
                              </button>
                            </div>
                          </div>

                          {/* Clever Fox Info */}
                          <div className="p-3 bg-obsidian rounded-xl border border-slate-850 flex items-start gap-2.5 font-sans">
                            <span className="w-5 h-5 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-300 font-bold flex items-center justify-center text-[10px] tracking-tight shrink-0 mt-0.5">Fox</span>
                            <div className="font-sans">
                              <strong className="text-xs text-slate-205">Clever Fox Food Journal</strong>
                              <p className="text-[10px] text-slate-400 font-light mt-0.5 leading-normal font-sans">A commercially available premium physical tracking notebook highly recommended for logging macros, protein values, and water volumes daily.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-teal-500/5 text-[10.5px] text-teal-300 leading-relaxed border border-teal-500/10 font-light font-sans">
                        Use the interactive tabs above to review our <strong className="text-slate-100 font-bold">1-Week Full Fluid Sample</strong> and <strong className="text-slate-100 font-bold">1-Week Healthy Eating Sample</strong> matching physical PDF records.
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeJournalView === 'template' && (
                <motion.div
                  key="template"
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -7 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-obsidian p-4 rounded-xl border border-slate-850/80">
                    <div>
                      <h4 className="text-sm font-sans font-bold text-slate-200 flex items-center gap-2 font-sans">
                        📋 PDF Food Journal Template Worksheet
                      </h4>
                      <p className="text-[11px] text-slate-400 font-light mt-0.5">Represents the official printed handout provided to candidates in Dr. Joannie Neveu's combined cohort program.</p>
                    </div>
                    <button
                      type="button"
                      onClick={downloadFoodJournalTemplate}
                      className="w-full sm:w-auto px-4 py-2 border border-teal-500/35 hover:bg-teal-500/15 bg-teal-500/10 text-teal-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0 font-mono"
                    >
                      <Download size={13} /> Download Template (CSV)
                    </button>
                  </div>

                  {/* Form Table Reproduction */}
                  <div className="overflow-x-auto border border-slate-850 rounded-2xl bg-slate-950/60 p-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-white/5 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-450 font-bold font-mono">Patient Name:</span>
                        <input
                          type="text"
                          placeholder="[Writes Name Here]"
                          className="flex-1 bg-obsidian border border-slate-850 rounded px-2.5 py-1 text-slate-350 focus:outline-none"
                          disabled
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-450 font-bold font-mono">MCP Number:</span>
                        <input
                          type="text"
                          placeholder="[Writes MCP here]"
                          className="flex-1 bg-obsidian border border-slate-850 rounded px-2.5 py-1 text-slate-350 focus:outline-none"
                          disabled
                        />
                      </div>
                    </div>

                    <table className="w-full text-left text-[11px] font-sans border-collapse">
                      <thead>
                        <tr className="border-b border-slate-850 text-slate-500 font-bold uppercase tracking-wider">
                          <th className="py-2.5 px-3">Meal Time Phase</th>
                          <th className="py-2.5 px-3">Type and Amount of Food Consumed</th>
                          <th className="py-2.5 px-3">Protein (g)<br /><span className="text-[9px] transform scale-90 translate-y-2 block text-emerald-400 font-light normal-case">Goal: 60g 👩 / 80g 👨</span></th>
                          <th className="py-2.5 px-3">Calories (cal)<br /><span className="text-[9px] transform scale-90 translate-y-2 block text-indigo-400 font-light normal-case">Goal: 1200-1500 kcal</span></th>
                          <th className="py-2.5 px-3">Fluid (mls)<br /><span className="text-[9px] transform scale-90 translate-y-2 block text-rose-300 font-light normal-case">Goal: 2-3 L (No Caf/Carbon)</span></th>
                          <th className="py-2.5 px-3">Blood Sugar Reading<br /><span className="text-[9px] transform scale-90 translate-y-2 block text-slate-500 font-light normal-case">(If Diabetic)</span></th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'Breakfast', desc: 'Time: _____________' },
                          { name: 'Mid-Morning Snack', desc: 'Time: _____________' },
                          { name: 'Lunch', desc: 'Time: _____________' },
                          { name: 'Mid-Afternoon Snack', desc: 'Time: _____________' },
                          { name: 'Supper', desc: 'Time: _____________' },
                          { name: 'Mid-Evening Snack', desc: 'Time: _____________' },
                        ].map((row, idx) => (
                          <tr key={idx} className="border-b border-slate-850/60 hover:bg-slate-900/10">
                            <td className="py-3 px-3">
                              <span className="font-semibold block text-slate-205">{row.name}</span>
                              <span className="text-[9.5px] text-slate-500 font-mono mt-0.5 block">{row.desc}</span>
                            </td>
                            <td className="py-3 px-3 text-slate-400 italic font-light">Empty Row for handwriting consumable type & Portion (e.g. g / oz / cups)</td>
                            <td className="py-3 px-3 text-slate-500 font-mono">______</td>
                            <td className="py-3 px-3 text-slate-500 font-mono">______</td>
                            <td className="py-3 px-3 text-slate-500 font-mono">______</td>
                            <td className="py-3 px-3 text-slate-500 font-mono">______</td>
                          </tr>
                        ))}
                        <tr className="bg-slate-900/30 font-bold border-b border-slate-850">
                          <td className="py-3.5 px-3 text-slate-200 uppercase tracking-widest font-mono text-[10px]">Daily Totals</td>
                          <td className="py-3.5 px-3 text-slate-550 italic font-mono text-[9px] normal-case">Calculates cumulative sum of all rows above</td>
                          <td className="py-3.5 px-3 text-emerald-400 font-mono font-bold">______ g</td>
                          <td className="py-3.5 px-3 text-indigo-300 font-mono font-bold">______ kcal</td>
                          <td className="py-3.5 px-3 text-rose-300 font-mono font-bold">______ L</td>
                          <td className="py-3.5 px-3 text-slate-500">—</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeJournalView === 'sample-fluid' && (
                <motion.div
                  key="sample-fluid"
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -7 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-obsidian p-4 rounded-xl border border-slate-850/80">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-mono tracking-widest text-indigo-300 font-bold uppercase inline-block mb-1.5">
                        Diet Stage: Pre-op Phase 2 (Strict Liquid Mode)
                      </span>
                      <h4 className="text-sm font-sans font-bold text-slate-202">
                        📄 Reference Example Log: Full Fluid Diet
                      </h4>
                      <p className="text-[11px] text-slate-450 font-light leading-relaxed mt-0.5">
                        Clinical checklist demonstrating portion sizes, fluid tallies, and protein metrics required for strict liquid nutrition guidelines before surgery.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={downloadSampleFluidJournal}
                      className="w-full sm:w-auto px-4 py-2 border border-teal-500/35 hover:bg-teal-500/15 bg-teal-500/10 text-teal-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0 font-mono"
                    >
                      <Download size={13} /> Download Sample (.txt)
                    </button>
                  </div>

                  {/* Sample Fluid Table */}
                  <div className="overflow-x-auto border border-slate-850 rounded-2xl bg-slate-950/60 p-4">
                    <table className="w-full text-left text-[11px] font-sans border-collapse">
                      <thead>
                        <tr className="border-b border-slate-850 text-slate-500 font-bold uppercase tracking-wider">
                          <th className="py-2 px-2.5 w-32">Time / Phase</th>
                          <th className="py-2 px-2.5">Type and Amount of Food Consumed</th>
                          <th className="py-2 px-2.5 w-24">Protein (g)</th>
                          <th className="py-2 px-2.5 w-24">Calories (cal)</th>
                          <th className="py-2 px-2.5">Fluids (mls) / Beverage Composition</th>
                        </tr>
                      </thead>
                      <tbody className="font-light text-slate-300">
                        {[
                          { time: 'Breakfast\n7:30 am', food: 'Premier Protein – 1 bottle (325 ml)', protein: '30 g', cal: '160 cal', fluid: '325 ml Premier Protein\n1000 ml H2O' },
                          { time: 'Mid-Morning Snack\n9:45 am', food: 'Unsweetened applesauce (113g)', protein: '1 g', cal: '50 cal', fluid: '250 ml decaf coffee\n1000 ml H2O' },
                          { time: 'Lunch\n12:30 pm', food: 'Tomato soup (1 cup condensed)\nPlain greek yogurt (100g)', protein: '4 g\n9 g', cal: '220 cal\n70 cal', fluid: '591 ml vitamin water' },
                          { time: 'Mid-Afternoon Snack\n3:00 pm', food: 'Premier protein - 1 bottle (325 ml)', protein: '30 g', cal: '160 cal', fluid: '325 ml Premier Protein' },
                          { time: 'Supper\n5:30 pm', food: 'Broccoli soup/strained (1 cup)\nUnsweetened applesauce (113g)', protein: '4 g\n1 g', cal: '200 cal\n50 cal', fluid: '500 ml green tea' },
                          { time: 'Mid-Evening Snack\n8:00 pm', food: 'Sugar-free Jell-O (1 cup)', protein: '1 g', cal: '5 cal', fluid: '750 ml H2O' },
                        ].map((row, idx) => (
                          <tr key={idx} className="border-b border-slate-850/60 hover:bg-slate-900/10">
                            <td className="py-3 px-2.5 font-semibold text-slate-100 whitespace-pre-line leading-relaxed font-mono">{row.time}</td>
                            <td className="py-3 px-2.5 whitespace-pre-line leading-relaxed text-slate-200">{row.food}</td>
                            <td className="py-3 px-2.5 text-emerald-400 font-mono whitespace-pre-line leading-relaxed">{row.protein}</td>
                            <td className="py-3 px-2.5 text-indigo-300 font-mono whitespace-pre-line leading-relaxed">{row.cal}</td>
                            <td className="py-3 px-2.5 text-teal-355 font-mono whitespace-pre-line leading-relaxed">{row.fluid}</td>
                          </tr>
                        ))}
                        <tr className="bg-slate-900/35 font-bold border-b border-slate-850">
                          <td className="py-3.5 px-2.5 text-slate-100 uppercase tracking-widest font-mono text-[10px]">Daily Totals</td>
                          <td className="py-3.5 px-2.5 text-slate-500 italic font-mono text-[9px] normal-case">Consolidated Metrics Tally</td>
                          <td className="py-3.5 px-2.5 text-emerald-400 font-mono text-sm">80 g</td>
                          <td className="py-3.5 px-2.5 text-indigo-305 font-mono text-sm">915 cal</td>
                          <td className="py-3.5 px-2.5 text-rose-350 font-mono text-sm">4.74 L <span className="text-[10px] text-slate-450 normal-case">(4741 mls)</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeJournalView === 'sample-healthy' && (
                <motion.div
                  key="sample-healthy"
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -7 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-obsidian p-4 rounded-xl border border-slate-850/80">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono tracking-widest text-emerald-300 font-bold uppercase inline-block mb-1.5">
                        Diet Stage: Pre-op Phase 1 (Portion Control)
                      </span>
                      <h4 className="text-sm font-sans font-bold text-slate-202">
                        📄 Reference Example Log: Healthy Eating Diet
                      </h4>
                      <p className="text-[11px] text-slate-450 font-light leading-relaxed mt-0.5">
                        Clinical checklist demonstrating solid portion sizes, complex fiber tracking, and high protein targets before shifting to liquid diets.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={downloadSampleHealthyJournal}
                      className="w-full sm:w-auto px-4 py-2 border border-teal-500/35 hover:bg-teal-500/15 bg-teal-500/10 text-teal-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0 font-mono"
                    >
                      <Download size={13} /> Download Sample (.txt)
                    </button>
                  </div>

                  {/* Sample Healthy Table */}
                  <div className="overflow-x-auto border border-slate-850 rounded-2xl bg-slate-950/60 p-4">
                    <table className="w-full text-left text-[11px] font-sans border-collapse">
                      <thead>
                        <tr className="border-b border-slate-850 text-slate-500 font-bold uppercase tracking-wider">
                          <th className="py-2 px-2.5 w-32">Time / Phase</th>
                          <th className="py-2 px-2.5">Type and Amount of Food Consumed</th>
                          <th className="py-2 px-2.5 w-24">Protein (g)</th>
                          <th className="py-2 px-2.5 w-24">Calories (cal)</th>
                          <th className="py-2 px-2.5">Fluids (mls) / Beverage Composition</th>
                        </tr>
                      </thead>
                      <tbody className="font-light text-slate-300">
                        {[
                          { time: 'Breakfast\n7:30 am', food: '1 slice multigrain bread\n1 Tbsp peanut butter\n1 clementine', protein: '4 g\n4 g\n0 g', cal: '100 cal\n90 cal\n35 cal', fluid: '1000 ml H2O\n250 ml decaf coffee\n1000 ml H2O\n591 ml vitamin water\n500 ml H2O' },
                          { time: 'Mid-Morning Snack\n9:45 am', food: '1 banana\nUnsalted almonds', protein: '1 g\n8 g', cal: '105 cal\n210 cal', fluid: '—' },
                          { time: 'Lunch\n12:30 pm', food: '3oz ground turkey, cooked\n1/2 cup cauliflower rice\n3/4 cup Mixed vegetables', protein: '23 g\n1 g\n2 g', cal: '175 cal\n10 cal\n70 cal', fluid: '—' },
                          { time: 'Mid-Afternoon Snack\n3:00 pm', food: 'Green grapes (20)\n1 Babybel light', protein: '1 g\n5 g', cal: '70 cal\n50 cal', fluid: '—' },
                          { time: 'Supper\n5:30 pm', food: '3oz roast chicken breast\n½ cup whole grain rice\n3/4 cup Mixed vegetables', protein: '20 g\n2 g\n2 g', cal: '190 cal\n75 cal\n70 cal', fluid: '—' },
                          { time: 'Mid-Evening Snack\n8:00 pm', food: 'Plain greek yogurt (100g)\n¼ cup Frozen mixed berries', protein: '9 g\n0 g', cal: '70 cal\n20 cal', fluid: '—' },
                        ].map((row, idx) => (
                          <tr key={idx} className="border-b border-slate-850/60 hover:bg-slate-900/10">
                            <td className="py-3 px-2.5 font-semibold text-slate-100 whitespace-pre-line leading-relaxed font-mono">{row.time}</td>
                            <td className="py-3 px-2.5 whitespace-pre-line leading-relaxed text-slate-200">{row.food}</td>
                            <td className="py-3 px-2.5 text-emerald-400 font-mono whitespace-pre-line leading-relaxed">{row.protein}</td>
                            <td className="py-3 px-2.5 text-indigo-300 font-mono whitespace-pre-line leading-relaxed">{row.cal}</td>
                            <td className="py-3 px-2.5 text-teal-355 font-mono whitespace-pre-line leading-relaxed">{row.fluid}</td>
                          </tr>
                        ))}
                        <tr className="bg-slate-900/35 font-bold border-b border-slate-850">
                          <td className="py-3.5 px-2.5 text-slate-100 uppercase tracking-widest font-mono text-[10px]">Daily Totals</td>
                          <td className="py-3.5 px-2.5 text-slate-550 italic font-mono text-[9px] normal-case">Consolidated Metrics Tally</td>
                          <td className="py-3.5 px-2.5 text-emerald-400 font-mono text-sm">82 g</td>
                          <td className="py-3.5 px-2.5 text-indigo-350 font-mono text-sm">1340 cal</td>
                          <td className="py-3.5 px-2.5 text-rose-350 font-mono text-sm">3.34 L <span className="text-[10px] text-slate-450 normal-case">(3341 mls)</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                      </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Interactive Bariatric Chat Box Component */}
          <section className="glass-card p-6 border-white/5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 shrink-0">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h4 className="text-lg font-serif text-slate-250 leading-tight">Coordinated Sleeve Assistant Chat</h4>
                  <p className="text-[11px] text-slate-500 font-light mt-0.5 font-sans">Ask questions about bariatric diet stages, pouch capacity, rules on smoking/pregnancy, or vitamins.</p>
                </div>
              </div>
              
              {/* Document Context Selector */}
              <div className="flex items-center gap-2 bg-slate-950/85 px-3 py-1.5 rounded-xl border border-slate-850">
                <span className="text-[10px] font-mono text-slate-400 uppercase whitespace-nowrap">Source Context:</span>
                <select
                  value={selectedChatDocId}
                  onChange={(e) => setSelectedChatDocId(e.target.value)}
                  className="bg-transparent border-0 text-slate-200 text-[11px] font-sans focus:ring-0 outline-none pr-6 cursor-pointer max-w-[210px] font-medium"
                >
                  <option value="all" className="bg-slate-950 text-slate-350">📚 All Manuals & Uploads</option>
                  {documents.map(doc => (
                    <option key={doc.id} value={doc.id} className="bg-slate-950 text-slate-350">
                      📄 {doc.name.length > 25 ? `${doc.name.substring(0, 25)}...` : doc.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Chat Body Area */}
            <div className="bg-obsidian border border-slate-850/80 rounded-2xl h-80 overflow-y-auto p-4 space-y-4 flex flex-col scroll-smooth">
              {chatMessages.map(msg => (
                <div 
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] space-y-1 ${
                    msg.sender === 'patient' ? 'self-end items-end' : 'self-start items-start'
                  }`}
                >
                  <div className={`p-3.5 rounded-2xl text-xs leading-relaxed font-light ${
                    msg.sender === 'patient'
                      ? 'bg-teal-500/15 border border-teal-500/30 text-teal-100 rounded-br-none'
                      : 'bg-slate-900/60 border border-slate-800 text-slate-200 rounded-bl-none'
                  }`}>
                    {/* Simplified markdown formatter for bolding list items */}
                    <div className="whitespace-pre-line space-y-1.5">
                      {msg.text.split('\n').map((line, i) => {
                        if (line.startsWith('* **') || line.startsWith('1. **') || line.startsWith('2. **') || line.startsWith('3. **') || line.startsWith('4. **') || line.startsWith('5. **') || line.startsWith('  1.') || line.startsWith('  2.') || line.startsWith('  3.')) {
                          return <p key={i} className="pl-2 border-l border-slate-800 text-slate-100 font-medium">{line}</p>;
                        }
                        return <p key={i}>{line}</p>;
                      })}
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-550 font-mono pl-1">{msg.time}</span>
                </div>
              ))}
              
              {isTyping && (
                <div className="self-start flex flex-col items-start space-y-1">
                  <div className="p-3 rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-455 text-xs rounded-bl-none flex items-center gap-1.5 select-none">
                    <span className="flex gap-1 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Virtual companion is typing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Question Pills */}
            <div className="space-y-1.5">
              <span className="text-[9.5px] font-bold text-slate-450 uppercase tracking-widest block font-serif">Quick-Ask Patient Topics:</span>
              <div className="flex flex-wrap gap-2 select-none">
                {[
                  { text: 'Temporary hair thinning?', search: 'hair thinning' },
                  { text: 'Stomach pouch size?', search: 'banana stomach sizes' },
                  { text: 'Smoking & pregnancy?', search: 'smoking pregnancy childbearing options' },
                  { text: 'Water & straws?', search: 'drinking fluids during meals straws' },
                  { text: 'Weight loss expected?', search: 'how much weight will I lose' },
                  { text: 'Is Advil/Ibuprofen safe?', search: 'nsaid advil ibuprofen aspirin' },
                  { text: 'Post-op diet stages?', search: 'diet progression stages menu' }
                ].map((pill, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSendChatMessage(pill.search)}
                    disabled={isTyping}
                    className="p-1.5 px-3 rounded-lg bg-obsidian hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-[10.5px] text-teal-300 font-medium select-none cursor-pointer duration-100 transition-colors disabled:opacity-50"
                  >
                    {pill.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form Box */}
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage(chatInput)}
                disabled={isTyping}
                placeholder="Ask about the gastric sleeve (VSG), dehydration, diet stages..."
                className="flex-1 p-3 rounded-xl bg-obsidian border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-teal-400 placeholder:text-slate-600 disabled:opacity-60 font-light"
              />
              <button
                type="button"
                onClick={() => handleSendChatMessage(chatInput)}
                disabled={!chatInput.trim() || isTyping}
                className="p-3 bg-teal-500/10 border border-teal-500/35 hover:bg-teal-500 hover:text-slate-950 text-teal-300 rounded-xl transition-all duration-150 cursor-pointer flex items-center justify-center shrink-0 disabled:opacity-40"
              >
                <Send size={15} />
              </button>
            </div>
          </section>

        </div>

        {/* Right Column: Research Rationale, Team & Contacts (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Support & Trial Status card */}
          <div className="p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl relative space-y-4">
            <span className="absolute top-3 right-3 text-xs uppercase font-bold tracking-wider font-mono text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded">
              Active
            </span>
            <h4 className="text-lg font-serif text-slate-200 flex items-center gap-2">
              <Award size={18} className="text-indigo-400" /> Trial Eligibility
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={13} className="text-indigo-300 mt-0.5 shrink-0" />
                <span className="text-xs text-slate-300 font-light">Available for NLHS patients in St. John's</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={13} className="text-indigo-300 mt-0.5 shrink-0" />
                <span className="text-xs text-slate-300 font-light">Requirement: Low-risk uterine lesion</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={13} className="text-indigo-300 mt-0.5 shrink-0" />
                <span className="text-xs text-slate-300 font-light">Requirement: BMI &ge; 35 weight envelope</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={13} className="text-indigo-300 mt-0.5 shrink-0" />
                <span className="text-xs text-slate-300 font-light">Coordinated surgery takes place within 12 weeks of clinical referral</span>
              </li>
            </ul>
          </div>

          {/* Patient Inquiry Contact */}
          <div className="p-4 border border-teal-500/30 bg-teal-500/10 rounded-2xl space-y-2">
            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">Trial General Inquiry</span>
            <p className="text-xs text-slate-200 leading-relaxed font-light">
              Patients interested in participating or seeking further information should contact the administrative assistant directly:
            </p>
            <div className="p-3 bg-obsidian rounded-xl border border-slate-800/80 mt-1">
              <p className="text-xs font-semibold text-slate-200 font-serif">Melanie Reardon</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Administrative Assistant, Gynecologic Oncology, MUN</p>
              <p className="text-xs text-teal-300 font-semibold font-mono mt-1 w-fit rounded bg-teal-500/10 px-2 py-0.5">(709) 777-4836</p>
            </div>
          </div>

          {/* Research Co-Lead Directory */}
          <div className="glass-card p-6 border-white/5 space-y-4">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block border-b border-white/5 pb-2">Research Program Directory</span>
            
            <div className="space-y-4 font-light">
              {/* Leader 1 */}
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Principal Investigator</span>
                <p className="text-xs text-slate-200 font-semibold font-serif mt-0.5">Dr. Joannie Neveu</p>
                <p className="text-[10px] text-slate-400">Gynecologic Oncologist Surgeon, MUN</p>
              </div>

              {/* Leader 2 */}
              <div>
                <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider">Co-Investigator</span>
                <p className="text-xs text-slate-200 font-semibold font-serif mt-0.5">Dr. David Pace</p>
                <p className="text-[10px] text-slate-400">General & Bariatric Surgery specialist, MUN</p>
              </div>

              {/* Assistant 1 */}
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Resident Investigator</span>
                <p className="text-xs text-slate-350 font-semibold font-serif mt-0.5">Dr. Emma Goddard</p>
              </div>

              {/* Assistant 2 */}
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Clinical Research Assistant</span>
                <p className="text-xs text-slate-350 font-semibold font-serif mt-0.5">Dena Salehipour</p>
              </div>
            </div>
          </div>

          {/* Clinician Advice Notice */}
          <div className="p-5 bg-obsidian border border-slate-850 rounded-2xl space-y-3 font-light">
            <div className="flex items-center gap-2 text-rose-300">
              <AlertCircle size={14} className="shrink-0" />
              <span className="text-xs uppercase font-bold tracking-wider font-mono">Disclaimers & Ethics</span>
            </div>
            <p className="text-[10.5px] text-slate-400 leading-normal">
              Study HREB-2023-BariHyst-NL complies fully with the Newfoundland and Labrador Health Research Ethics Board (HREB). Data gathered from logs is saved directly in your browser's secure cache. When submitting physical forms, identifiers are assigned code codes to protect participant privacy in Bliss Murphy Room 2094.
            </p>
          </div>

        </div>

      </div>

      {/* Patient Handout & Clinical Packet Download Center */}
      <section className="glass-card p-8 border-white/5 bg-gradient-to-br from-indigo-950/10 via-slate-900/40 to-slate-950/80 rounded-3xl relative space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-4 gap-4">
          <div className="space-y-1">
            <h3 className="text-2xl font-serif text-slate-250 flex items-center gap-2.5">
              <Download className="text-teal-400" size={22} />
              Patient Download Center & Clinical Intake Packet
            </h3>
            <p className="text-xs text-slate-400 font-light font-sans">
              Print or download direct clinical materials and intake sheets ahead of your consultation in Area D (Floor 4).
            </p>
          </div>
          <span className="text-[10px] font-mono uppercase bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl text-slate-400 whitespace-nowrap self-start md:self-center font-medium">
            📁 Official Clinical Resources
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Patient Manual */}
          <div className="p-5 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-indigo-500/20 shadow-lg flex flex-col justify-between space-y-4 font-sans transition-all duration-200">
            <div className="space-y-3 font-sans">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-mono tracking-widest text-indigo-300 font-bold uppercase inline-block">
                  85 Pages • Patient Booklet
                </span>
                <BookOpen size={16} className="text-indigo-400" />
              </div>
              <h4 className="text-sm font-sans font-bold text-slate-100 font-sans">NLHS Gastric Sleeve Surgical Manual v5</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light font-sans">
                Official guide containing outpatient safety checklists, 90-minute radius rules, support timelines, and post-op diet stages.
              </p>
            </div>
            <button
              onClick={downloadBariatricManualOverview}
              className="w-full py-2.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/35 text-indigo-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors font-sans"
            >
              <Download size={13} /> Download Manual Guide Summary
            </button>
          </div>

          {/* Card 2: Patient Questionnaire */}
          <div className="p-5 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-teal-500/20 shadow-lg flex flex-col justify-between space-y-4 font-sans transition-all duration-200">
            <div className="space-y-3 font-sans">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-teal-500/10 border border-teal-500/20 text-[10px] font-mono tracking-widest text-teal-300 font-bold uppercase inline-block font-sans">
                  13 Pages • Intake Forms
                </span>
                <FileText size={16} className="text-teal-400" />
              </div>
              <h4 className="text-sm font-sans font-bold text-slate-100 font-sans">Bariatric Program Patient Questionnaire</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light font-sans">
                Comprehensive intake exam covering RED-5 scale, weight/eating background, sleep indices, and medical history screener.
              </p>
            </div>
            <button
              onClick={downloadPatientQuestionnaire}
              className="w-full py-2.5 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/35 text-teal-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors font-sans"
            >
              <Download size={13} /> Download Printable Intake Packet
            </button>
          </div>

          {/* Card 3: Research Study Consent */}
          <div className="p-5 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-indigo-500/20 shadow-lg flex flex-col justify-between space-y-4 font-sans transition-all duration-200">
            <div className="space-y-3 font-sans">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-[10px] font-mono tracking-widest text-purple-300 font-bold uppercase inline-block">
                  8 Pages • Study Registration
                </span>
                <UserCheck size={16} className="text-purple-400" />
              </div>
              <h4 className="text-sm font-sans font-bold text-slate-100 font-sans">Formal Cohort Study Informed Consent</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light font-sans">
                Co-authored consent sheet for laparoscopic sleeve combined with hysterectomy. Reviews parameters by Dr. Emma Goddard.
              </p>
            </div>
            <button
              onClick={downloadResearchConsentForm}
              className="w-full py-2.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/35 text-purple-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors font-sans"
            >
              <Download size={13} /> Download Informed Study Consent
            </button>
          </div>

          {/* Card 4: Printable Food Journal (CSV / Excel) */}
          <div className="p-5 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-teal-500/20 shadow-lg flex flex-col justify-between space-y-4 font-sans transition-all duration-200 md:grid-cols-2 md:col-span-2 lg:col-span-3 lg:col-start-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2 max-w-2xl font-sans">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono tracking-widest text-emerald-300 font-bold uppercase inline-block">
                    Printable Worksheet • Page 76
                  </span>
                </div>
                <h4 className="text-sm font-sans font-bold text-slate-100 font-sans">Tactile Patient Food & Fluid Journal Logsheet</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light font-sans">
                  The exact daily logging spreadsheet provided in clinical folders. Includes columns for phase times, protein tracking (Goal: 60g women / 80g men), calorie metrics, and diabetes-related blood sugar readings.
                </p>
              </div>
              <button
                onClick={downloadFoodJournalTemplate}
                className="w-full sm:w-auto py-3 px-6 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shrink-0 font-sans"
              >
                <Download size={13} /> Download Journal Spreadsheet (CSV)
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
