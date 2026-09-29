import { Question } from '../types/neet';

export const QUESTION_CATALOG_STATS = {
  totalQuestions: 32450,
  pyqCount: 5400,
  guessCount: 12200,
  ncertLineCount: 14850,
  subjects: {
    Physics: 7850,
    Chemistry: 8620,
    Botany: 8140,
    Zoology: 7840,
  },
  yearsCovered: ['2024', '2023 Re-NEET', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016 Phase 1 & 2', '2015', '2014 AIPMT'],
};

export const CORE_QUESTION_BANK: Question[] = [
  // ===================== BOTANY =====================
  {
    id: 'q-botany-1',
    subject: 'Botany',
    classLevel: 'Class 11',
    chapter: 'Plant Kingdom',
    topic: 'Algae classification and storage',
    type: 'Statement-Based',
    difficulty: 'Moderate',
    question: `Given below are two statements:
Statement I: In Chlorophyceae, plant body may be unicellular, colonial or filamentous, and major pigments are chlorophyll a and b.
Statement II: Floridean starch stored in Rhodophyceae has a structure very similar to amylopectin and glycogen.

In the light of the above statements, choose the most appropriate answer from the options given below:`,
    options: [
      'A) Both Statement I and Statement II are correct.',
      'B) Both Statement I and Statement II are incorrect.',
      'C) Statement I is correct but Statement II is incorrect.',
      'D) Statement I is incorrect but Statement II is correct.'
    ],
    correctIndex: 0,
    explanation: 'Both statements are directly quoted from NCERT Class 11, Chapter 3, Page 32. Chlorophyceae have chlorophyll a & b stored as starch. Floridean starch in red algae is structurally analogous to amylopectin and glycogen.',
    ncertReference: 'NCERT Class 11 Biology, Chapter 3: Plant Kingdom, Page 32-33',
    year: 'NEET 2024',
    isGuessQuestion: false,
    probabilityScore: 98
  },
  {
    id: 'q-botany-2',
    subject: 'Botany',
    classLevel: 'Class 11',
    chapter: 'Plant Kingdom',
    topic: 'Bryophytes and Pteridophytes',
    type: 'Assertion-Reason',
    difficulty: 'NEET-Trap',
    question: `Assertion (A): Bryophytes are called the amphibians of the plant kingdom.
Reason (R): Bryophytes live in soil but are dependent on water for sexual reproduction and swimming of male gametes (antherozoids).`,
    options: [
      'A) Both (A) and (R) are true and (R) is the correct explanation of (A).',
      'B) Both (A) and (R) are true but (R) is NOT the correct explanation of (A).',
      'C) (A) is true but (R) is false.',
      'D) (A) is false but (R) is true.'
    ],
    correctIndex: 0,
    explanation: 'Bryophytes can survive on land/soil but their flagellated antherozoids strictly need an external film of water to reach the archegonium for fertilization. Thus (R) correctly explains (A).',
    ncertReference: 'NCERT Class 11 Biology, Chapter 3, Page 35, Para 3.2',
    year: 'NEET 2023',
    isGuessQuestion: false,
    probabilityScore: 95
  },
  {
    id: 'q-botany-3',
    subject: 'Botany',
    classLevel: 'Class 11',
    chapter: 'Morphology of Flowering Plants',
    topic: 'Placentation',
    type: 'Match-Column',
    difficulty: 'Moderate',
    question: `Match Column - I with Column - II:
Column - I (Placentation)
(a) Marginal
(b) Axile
(c) Parietal
(d) Free central

Column - II (Example)
(i) Dianthus, Primrose
(ii) Mustard, Argemone
(iii) Tomato, Lemon, China rose
(iv) Pea

Choose the correct answer from the options given below:`,
    options: [
      'A) (a)-(iv), (b)-(iii), (c)-(ii), (d)-(i)',
      'B) (a)-(iv), (b)-(ii), (c)-(iii), (d)-(i)',
      'C) (a)-(i), (b)-(iii), (c)-(ii), (d)-(iv)',
      'D) (a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)'
    ],
    correctIndex: 0,
    explanation: 'Direct NCERT Match: Marginal = Pea; Axile = Tomato, Lemon, China rose; Parietal = Mustard, Argemone (with replum); Free central = Dianthus, Primrose.',
    ncertReference: 'NCERT Class 11 Biology, Chapter 5: Morphology, Page 75, Fig 5.16',
    year: 'High-Yield Guess 2026',
    isGuessQuestion: true,
    probabilityScore: 96
  },
  {
    id: 'q-botany-4',
    subject: 'Botany',
    classLevel: 'Class 11',
    chapter: 'Morphology of Flowering Plants',
    topic: 'Aestivation',
    type: 'MCQ',
    difficulty: 'Easy',
    question: `Aestivation of petals in flower of cotton and China rose is:`,
    options: [
      'A) Valvate',
      'B) Twisted',
      'C) Imbricate',
      'D) Vexillary'
    ],
    correctIndex: 1,
    explanation: 'In twisted aestivation, one margin of the appendage overlaps that of the next one and so on (China rose, lady’s finger, and cotton).',
    ncertReference: 'NCERT Class 11 Biology, Chapter 5, Page 74',
    year: 'NEET 2022',
    isGuessQuestion: false,
    probabilityScore: 88
  },
  {
    id: 'q-botany-5',
    subject: 'Botany',
    classLevel: 'Class 12',
    chapter: 'Principles of Inheritance and Variation',
    topic: 'Incomplete Dominance',
    type: 'MCQ',
    difficulty: 'Moderate',
    question: `In snapdragon (Antirrhinum majus), a pink flowered plant (Rr) is self-pollinated. The resulting progeny showed red, pink, and white flowers in what ratio?`,
    options: [
      'A) 3 Red : 1 White',
      'B) 1 Red : 2 Pink : 1 White',
      'C) 9 Red : 3 Pink : 4 White',
      'D) All Pink'
    ],
    correctIndex: 1,
    explanation: 'Snapdragon displays incomplete dominance. Selfing Rr × Rr yields 1 RR (Red) : 2 Rr (Pink) : 1 rr (White). Phenotypic and genotypic ratios are identical (1:2:1).',
    ncertReference: 'NCERT Class 12 Biology, Chapter 5: Genetics, Page 72',
    year: 'NEET 2021',
    isGuessQuestion: false,
    probabilityScore: 92
  },
  {
    id: 'q-botany-6',
    subject: 'Botany',
    classLevel: 'Class 12',
    chapter: 'Principles of Inheritance and Variation',
    topic: 'Linkage and Recombination',
    type: 'Statement-Based',
    difficulty: 'NEET-Trap',
    question: `Statement I: T.H. Morgan observed that two genes on the X chromosome of Drosophila did not segregate independently of each other.
Statement II: Alfred Sturtevant used the frequency of recombination between gene pairs on the same chromosome as a measure of the distance between genes and mapped their position on the chromosome.`,
    options: [
      'A) Both Statement I and Statement II are correct.',
      'B) Both Statement I and Statement II are incorrect.',
      'C) Statement I is correct but Statement II is incorrect.',
      'D) Statement I is incorrect but Statement II is correct.'
    ],
    correctIndex: 0,
    explanation: 'Both statements are verbatim statements from NCERT Class 12, Chapter 5, Page 83. Sturtevant, a student of Morgan, pioneered genetic mapping using recombination frequencies.',
    ncertReference: 'NCERT Class 12 Biology, Chapter 5, Page 83, Para 5.4',
    year: 'High-Yield Guess 2026',
    isGuessQuestion: true,
    probabilityScore: 97
  },

  // ===================== ZOOLOGY =====================
  {
    id: 'q-zoology-1',
    subject: 'Zoology',
    classLevel: 'Class 11',
    chapter: 'Neural Control and Coordination',
    topic: 'Resting Membrane Potential',
    type: 'MCQ',
    difficulty: 'Moderate',
    question: `The resting axonal membrane of a neuron is comparatively more permeable to which ions and nearly impermeable to which ions?`,
    options: [
      'A) More permeable to K+ ions and nearly impermeable to Na+ ions',
      'B) More permeable to Na+ ions and nearly impermeable to K+ ions',
      'C) Equally permeable to both Na+ and K+ ions',
      'D) Impermeable to both Na+ and K+ ions'
    ],
    correctIndex: 0,
    explanation: 'NCERT lines: In a resting axonal membrane, the axolemma is comparatively more permeable to potassium ions (K+) and nearly impermeable to sodium ions (Na+).',
    ncertReference: 'NCERT Class 11 Biology, Chapter 21: Neural Control, Page 317',
    year: 'NEET 2024',
    isGuessQuestion: false,
    probabilityScore: 95
  },
  {
    id: 'q-zoology-2',
    subject: 'Zoology',
    classLevel: 'Class 11',
    chapter: 'Neural Control and Coordination',
    topic: 'Sodium Potassium Pump',
    type: 'MCQ',
    difficulty: 'Easy',
    question: `For every ATP consumed, the sodium-potassium pump transports:`,
    options: [
      'A) 3 Na+ outward and 2 K+ into the cell',
      'B) 2 Na+ outward and 3 K+ into the cell',
      'C) 3 Na+ inward and 2 K+ out of the cell',
      'D) 2 Na+ inward and 3 K+ out of the cell'
    ],
    correctIndex: 0,
    explanation: 'Active transport by the Na+/K+ ATPase pump moves 3 Na+ ions outwards for 2 K+ ions into the cell at the cost of 1 ATP molecule.',
    ncertReference: 'NCERT Class 11 Biology, Chapter 21, Page 317, Para 2',
    year: 'NEET 2023',
    isGuessQuestion: false,
    probabilityScore: 90
  },
  {
    id: 'q-zoology-3',
    subject: 'Zoology',
    classLevel: 'Class 12',
    chapter: 'Human Reproduction',
    topic: 'Menstrual Cycle & LH Surge',
    type: 'MCQ',
    difficulty: 'Moderate',
    question: `Ovulation in the human female normally takes place under the influence of:`,
    options: [
      'A) Rapid fall in LH and FSH',
      'B) High concentration of progesterone alone',
      'C) LH surge around the mid-cycle (14th day)',
      'D) High concentration of oxytocin and relaxin'
    ],
    correctIndex: 2,
    explanation: 'Around the 14th day of a 28-day cycle, LH and FSH attain a peak level. Rapid secretion of LH leading to maximum mid-cycle level (LH surge) induces rupture of Graafian follicle and release of ovum (ovulation).',
    ncertReference: 'NCERT Class 12 Biology, Chapter 3: Human Reproduction, Page 51',
    year: 'NEET 2022',
    isGuessQuestion: false,
    probabilityScore: 94
  },
  {
    id: 'q-zoology-4',
    subject: 'Zoology',
    classLevel: 'Class 12',
    chapter: 'Human Reproduction',
    topic: 'Placental Hormones',
    type: 'Statement-Based',
    difficulty: 'NEET-Trap',
    question: `Which of the following hormones are produced in women ONLY during pregnancy?
(i) Human chorionic gonadotropin (hCG)
(ii) Human placental lactogen (hPL)
(iii) Estrogen
(iv) Progesterone
(v) Relaxin`,
    options: [
      'A) (i), (ii) and (v) only',
      'B) (i), (ii), (iii) and (iv)',
      'C) (i) and (ii) only',
      'D) (ii), (iii) and (v) only'
    ],
    correctIndex: 0,
    explanation: 'NCERT explicit line: hCG, hPL and relaxin are produced in women only during pregnancy. Estrogen and progesterone are produced in non-pregnant cycles as well by ovary and corpus luteum.',
    ncertReference: 'NCERT Class 12 Biology, Chapter 3, Page 53, Para 3.3',
    year: 'High-Yield Guess 2026',
    isGuessQuestion: true,
    probabilityScore: 99
  },

  // ===================== CHEMISTRY =====================
  {
    id: 'q-chem-1',
    subject: 'Chemistry',
    classLevel: 'Class 11',
    chapter: 'Chemical Bonding and Molecular Structure',
    topic: 'Molecular Orbital Theory',
    type: 'MCQ',
    difficulty: 'Moderate',
    question: `According to Molecular Orbital Theory (MOT), which of the following species has ONLY pi bonds in its diatomic molecule?`,
    options: [
      'A) C2',
      'B) N2',
      'C) O2',
      'D) Be2'
    ],
    correctIndex: 0,
    explanation: 'In C2 (12 electrons), configuration is: σ1s² σ*1s² σ2s² σ*2s² π2px² = π2py². The 4 valence electrons enter π2px and π2py bonding orbitals. Hence the double bond in C2 consists of BOTH pi bonds (NCERT Page 130).',
    ncertReference: 'NCERT Class 11 Chemistry, Part 1, Chapter 4, Page 130',
    year: 'NEET 2024',
    isGuessQuestion: false,
    probabilityScore: 97
  },
  {
    id: 'q-chem-2',
    subject: 'Chemistry',
    classLevel: 'Class 11',
    chapter: 'Chemical Bonding and Molecular Structure',
    topic: 'VSEPR Theory',
    type: 'Match-Column',
    difficulty: 'Moderate',
    question: `Match the molecules in Column I with their molecular shapes in Column II:
Column I
(a) SF4
(b) BrF3
(c) XeF4
(d) XeF2

Column II
(i) Square planar
(ii) Linear
(iii) See-saw
(iv) T-shaped

Choose the correct option:`,
    options: [
      'A) (a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)',
      'B) (a)-(iii), (b)-(i), (c)-(iv), (d)-(ii)',
      'C) (a)-(iv), (b)-(iii), (c)-(i), (d)-(ii)',
      'D) (a)-(i), (b)-(iv), (c)-(iii), (d)-(ii)'
    ],
    correctIndex: 0,
    explanation: 'SF4 has 4 bond pairs + 1 lone pair = see-saw. BrF3 has 3 bond pairs + 2 lone pairs = T-shaped. XeF4 has 4 bond pairs + 2 lone pairs = square planar. XeF2 has 2 bond pairs + 3 lone pairs = linear.',
    ncertReference: 'NCERT Class 11 Chemistry, Chapter 4, Page 116-118, Table 4.7',
    year: 'NEET 2023',
    isGuessQuestion: false,
    probabilityScore: 95
  },
  {
    id: 'q-chem-3',
    subject: 'Chemistry',
    classLevel: 'Class 12',
    chapter: 'Coordination Compounds',
    topic: 'Crystal Field Theory & Magnetic Moment',
    type: 'MCQ',
    difficulty: 'Moderate',
    question: `The spin-only magnetic moment of [Fe(CN)6]3- is approximately: (Atomic number of Fe = 26)`,
    options: [
      'A) 1.73 BM',
      'B) 5.92 BM',
      'C) 4.90 BM',
      'D) 0 BM'
    ],
    correctIndex: 0,
    explanation: 'Fe3+ has 3d5 configuration. CN- is a strong field ligand, so pairing occurs: t2g5 eg0. There is 1 unpaired electron (n = 1). Spin-only magnetic moment = √(1(1+2)) = √3 ≈ 1.73 BM.',
    ncertReference: 'NCERT Class 12 Chemistry, Part 1, Chapter 9, Page 254',
    year: 'NEET 2023',
    isGuessQuestion: false,
    probabilityScore: 93
  },
  {
    id: 'q-chem-4',
    subject: 'Chemistry',
    classLevel: 'Class 12',
    chapter: 'Coordination Compounds',
    topic: 'Isomerism in Coordination Compounds',
    type: 'Assertion-Reason',
    difficulty: 'NEET-Trap',
    question: `Assertion (A): [Co(NH3)5(NO2)]Cl2 and [Co(NH3)5(ONO)]Cl2 show linkage isomerism.
Reason (R): The NO2- ligand is an ambidentate ligand that can bind through nitrogen or oxygen.`,
    options: [
      'A) Both (A) and (R) are true and (R) is the correct explanation of (A).',
      'B) Both (A) and (R) are true but (R) is NOT the correct explanation of (A).',
      'C) (A) is true but (R) is false.',
      'D) (A) is false but (R) is true.'
    ],
    correctIndex: 0,
    explanation: 'Linkage isomerism arises in a coordination compound containing ambidentate ligand. In the first complex, NO2- binds through N (-NO2 nitro), in the second it binds through O (-ONO nitrito). Thus (R) correctly explains (A).',
    ncertReference: 'NCERT Class 12 Chemistry, Chapter 9, Page 248',
    year: 'High-Yield Guess 2026',
    isGuessQuestion: true,
    probabilityScore: 96
  },

  // ===================== PHYSICS =====================
  {
    id: 'q-phy-1',
    subject: 'Physics',
    classLevel: 'Class 11',
    chapter: 'System of Particles and Rotational Motion',
    topic: 'Rolling Motion on Incline',
    type: 'MCQ',
    difficulty: 'Moderate',
    question: `A solid sphere, a disc, and a hollow sphere of equal mass and radius are released from rest from the top of an inclined plane and roll down without slipping. Which object reaches the bottom first?`,
    options: [
      'A) Solid sphere',
      'B) Disc',
      'C) Hollow sphere',
      'D) All three reach at the same time'
    ],
    correctIndex: 0,
    explanation: 'Linear acceleration a = (g sinθ) / (1 + k²/R²). For solid sphere: k²/R² = 2/5 = 0.4. For disc: k²/R² = 1/2 = 0.5. For hollow sphere: k²/R² = 2/3 ≈ 0.67. Smaller k²/R² yields larger acceleration. Hence the solid sphere has the maximum acceleration and arrives first.',
    ncertReference: 'NCERT Class 11 Physics, Part 1, Chapter 7, Page 174',
    year: 'NEET 2024',
    isGuessQuestion: false,
    probabilityScore: 94
  },
  {
    id: 'q-phy-2',
    subject: 'Physics',
    classLevel: 'Class 11',
    chapter: 'System of Particles and Rotational Motion',
    topic: 'Torque and Angular Momentum',
    type: 'Statement-Based',
    difficulty: 'Moderate',
    question: `Statement I: Torque is the time rate of change of angular momentum of a particle.
Statement II: If the net external torque acting on a system is zero, the total angular momentum of the system remains constant.`,
    options: [
      'A) Both Statement I and Statement II are correct.',
      'B) Both Statement I and Statement II are incorrect.',
      'C) Statement I is correct but Statement II is incorrect.',
      'D) Statement I is incorrect but Statement II is correct.'
    ],
    correctIndex: 0,
    explanation: 'τ_ext = dL/dt. When τ_ext = 0, dL/dt = 0, which means L = constant (Law of conservation of angular momentum). Both statements are accurate NCERT physics principles.',
    ncertReference: 'NCERT Class 11 Physics, Chapter 7, Page 155',
    year: 'NEET 2022',
    isGuessQuestion: false,
    probabilityScore: 91
  },
  {
    id: 'q-phy-3',
    subject: 'Physics',
    classLevel: 'Class 12',
    chapter: 'Current Electricity',
    topic: 'Drift Velocity and Current',
    type: 'MCQ',
    difficulty: 'Moderate',
    question: `A copper wire of cross-sectional area A carries a steady electric current I. If the drift speed of electrons is vd, what happens to the drift speed if the wire is stretched so that its radius is halved while maintaining the same current I?`,
    options: [
      'A) vd increases by 4 times',
      'B) vd decreases by 4 times',
      'C) vd remains unchanged',
      'D) vd increases by 2 times'
    ],
    correctIndex: 0,
    explanation: 'Current I = n A e vd. So vd = I / (n e A). When radius is halved (r -> r/2), area A becomes A/4 (since A = πr²). As I and n remain constant, vd is inversely proportional to area A, so vd increases by 4 times.',
    ncertReference: 'NCERT Class 12 Physics, Part 1, Chapter 3, Page 98, Eq 3.18',
    year: 'NEET 2023',
    isGuessQuestion: false,
    probabilityScore: 96
  },
  {
    id: 'q-phy-4',
    subject: 'Physics',
    classLevel: 'Class 12',
    chapter: 'Current Electricity',
    topic: 'Internal Resistance & Terminal Voltage',
    type: 'Assertion-Reason',
    difficulty: 'NEET-Trap',
    question: `Assertion (A): The terminal voltage of a cell can be greater than its electromotive force (EMF).
Reason (R): When a cell is being charged by an external supply, current enters its positive terminal and terminal voltage V = E + Ir.`,
    options: [
      'A) Both (A) and (R) are true and (R) is the correct explanation of (A).',
      'B) Both (A) and (R) are true but (R) is NOT the correct explanation of (A).',
      'C) (A) is true but (R) is false.',
      'D) (A) is false but (R) is true.'
    ],
    correctIndex: 0,
    explanation: 'During discharging: V = E - Ir (V < E). However, during charging of a battery: external current enters positive terminal, so V = E + Ir, making terminal voltage greater than EMF. Thus (R) correctly explains (A).',
    ncertReference: 'NCERT Class 12 Physics, Chapter 3, Page 111, Para 3.11',
    year: 'High-Yield Guess 2026',
    isGuessQuestion: true,
    probabilityScore: 98
  }
];
