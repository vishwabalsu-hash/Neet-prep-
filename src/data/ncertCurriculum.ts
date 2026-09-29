import { NcertChapter } from '../types/neet';

export const NCERT_CHAPTERS: NcertChapter[] = [
  // ==================== BIOLOGY: BOTANY ====================
  {
    id: 'bio-11-plant-kingdom',
    subject: 'Botany',
    classLevel: 'Class 11',
    unit: 'Diversity in the Living World',
    chapterNumber: 3,
    title: 'Plant Kingdom',
    weightageScore: 16,
    pyqCount: 42,
    summary: 'Covers Algae (Chlorophyceae, Phaeophyceae, Rhodophyceae), Bryophytes (amphibians of plant kingdom), Pteridophytes (vascular cryptogams), Gymnosperms (naked seeded plants) and Angiosperms, along with alternation of generations.',
    concepts: [
      {
        id: 'c-algae-pigments',
        title: 'Algal Pigments & Stored Food (Direct NCERT Table 3.1)',
        ncertQuote: 'Chlorophyceae store food as starch; Phaeophyceae store complex carbohydrates as laminarin or mannitol; Rhodophyceae store floridean starch which is very similar to amylopectin and glycogen in structure.',
        explanation: 'Every year, NTA frames questions from Table 3.1 regarding cell wall composition, flagellar number, and stored food.',
        pyqHistory: ['NEET 2023', 'NEET 2021', 'NEET 2020', 'NEET 2017'],
        neetTrapWarning: 'Students confuse Floridean starch with amylose. Remember: Floridean starch is structurally identical to amylopectin AND glycogen!',
        mnemonic: 'Red Floridean Apple-Glycogen: Rhodophyceae = Floridean starch = Amylopectin + Glycogen.'
      },
      {
        id: 'c-bryo-pterido',
        title: 'Protonema vs Prothallus',
        ncertQuote: 'The juvenile stage of moss gametophyte is protonema, developed directly from spore. In pteridophytes, spores germinate to give inconspicuous, small but multicellular, free-living, mostly photosynthetic thalloid gametophytes called prothallus.',
        explanation: 'Protonema is haploid moss gametophyte developing into leafy stage; Prothallus is monoecious/dioecious haploid gametophyte requiring water for fertilization.',
        pyqHistory: ['NEET 2024', 'NEET 2022', 'NEET 2018'],
        neetTrapWarning: 'Never mark prothallus as diploid! Prothallus is gametophytic and strictly HAPLOID (n).'
      }
    ],
    formulaList: [
      'Alternation of Generations: Gametophyte (n) produces gametes (n) via mitosis; Sporophyte (2n) produces spores (n) via meiosis.',
      'Gymnosperms: Endosperm is formed BEFORE fertilization and is HAPLOID (n), unlike Angiosperms (3n).'
    ],
    sampleQuestionIds: ['q-botany-1', 'q-botany-2']
  },
  {
    id: 'bio-11-morphology',
    subject: 'Botany',
    classLevel: 'Class 11',
    unit: 'Structural Organisation in Plants & Animals',
    chapterNumber: 5,
    title: 'Morphology of Flowering Plants',
    weightageScore: 20,
    pyqCount: 58,
    summary: 'Root, stem, leaf modifications, inflorescence (Racemose vs Cymose), floral parts, aestivation (Valvate, Twisted, Imbricate, Vexillary), placentation (Marginal, Axile, Parietal, Free central, Basal), and families (Fabaceae, Solanaceae, Liliaceae).',
    concepts: [
      {
        id: 'c-placentation',
        title: 'Placentation Types & NCERT Examples',
        ncertQuote: 'Marginal (Pea), Axile (China rose, Tomato, Lemon), Parietal (Mustard, Argemone - false septum replum), Free Central (Dianthus, Primrose), Basal (Sunflower, Marigold).',
        explanation: 'Placentation questions are directly tested every year. Replum (false septum) is found only in Parietal placentation (Mustard).',
        pyqHistory: ['NEET 2024', 'NEET 2023', 'NEET 2021', 'NEET 2019', 'NEET 2016'],
        neetTrapWarning: 'Free central lacks septa (Dianthus, Primrose). In Parietal, ovules develop on inner ovary wall but ovary becomes two-chambered due to false septum replum.',
        mnemonic: 'M-Pea | A-CTL (China rose, Tomato, Lemon) | P-MA (Mustard, Argemone) | FC-DP (Dianthus, Primrose) | B-SM (Sunflower, Marigold)'
      },
      {
        id: 'c-aestivation',
        title: 'Aestivation Modes in Calyx and Corolla',
        ncertQuote: 'Valvate: Calotropis; Twisted: China rose, Ladyfinger, Cotton; Imbricate: Cassia, Gulmohur; Vexillary (Papilionaceous): Pea, Bean.',
        explanation: 'Vexillary aestivation has 5 petals: largest standard (vexillum), two lateral wings (alae), two anterior united keel (carina).',
        pyqHistory: ['NEET 2022', 'NEET 2020', 'NEET 2017'],
        neetTrapWarning: 'Twisted aestivation: One margin overlaps next regularly. Imbricate: margins overlap irregularly without particular direction.'
      }
    ],
    formulaList: [
      'Floral Formula: Solanaceae: ⊕ ⚥ K(5) C(5) A5 G(2) [Superior bicarpellary syncarpous with swollen placenta]',
      'Liliaceae: Br ⊕ ⚥ P(3+3) A3+3 G(3) [Tricarpellary trilocular with axile placentation]'
    ],
    sampleQuestionIds: ['q-botany-3', 'q-botany-4']
  },
  {
    id: 'bio-12-genetics',
    subject: 'Botany',
    classLevel: 'Class 12',
    unit: 'Genetics and Evolution',
    chapterNumber: 5,
    title: 'Principles of Inheritance and Variation',
    weightageScore: 28,
    pyqCount: 74,
    summary: 'Mendelian laws, Incomplete dominance (Mirabilis, Snapdragon), Codominance (ABO blood groups), Pleiotropy, Polygenic inheritance, Chromosomal theory of inheritance, Morgan’s linkage experiments on Drosophila, sex determination, and genetic disorders (Thalassemia, Hemophilia, Sickle Cell, Down, Klinefelter, Turner).',
    concepts: [
      {
        id: 'c-incomplete-dominance',
        title: 'Incomplete Dominance vs Codominance',
        ncertQuote: 'In incomplete dominance (Antirrhinum majus / Snapdragon), F2 phenotypic and genotypic ratios are identical: 1 Red : 2 Pink : 1 White (1:2:1). In ABO blood grouping, IA and IB are codominant because both express their own types of sugars.',
        explanation: 'Departure from Mendel’s 3:1 phenotypic ratio. In codominance, heterozygous individual shows both parental phenotypes simultaneously.',
        pyqHistory: ['NEET 2024', 'NEET 2022', 'NEET 2021', 'NEET 2019', 'NEET 2015'],
        neetTrapWarning: 'AB blood group is Codominance. ABO blood grouping in human population is Multiple Allelism (3 alleles: IA, IB, i).'
      },
      {
        id: 'c-linkage-morgan',
        title: 'T.H. Morgan Linkage & Recombination Frequency',
        ncertQuote: 'Genes yellow body and white eye were tightly linked and showed only 1.3 per cent recombination, while white eye and miniature wing showed 37.2 per cent recombination.',
        explanation: 'Distance between genes is directly proportional to recombination frequency. Alfred Sturtevant used recombination frequency to construct chromosome genetic maps.',
        pyqHistory: ['NEET 2023', 'NEET 2020', 'NEET 2016'],
        neetTrapWarning: '1 map unit (centiMorgan) = 1% recombination frequency. Maximum frequency of recombination between two unlinked genes is 50%.'
      }
    ],
    formulaList: [
      'Number of Gametes = 2^n (where n = number of heterozygous gene pairs)',
      'F2 Phenotypic Classes in Dihybrid cross = 2^2 = 4 (9:3:3:1) when dominance is complete',
      'F2 Genotypic Classes = 3^n = 3^2 = 9 distinct genotypes'
    ],
    sampleQuestionIds: ['q-botany-5', 'q-botany-6']
  },

  // ==================== BIOLOGY: ZOOLOGY ====================
  {
    id: 'bio-11-human-physio-neural',
    subject: 'Zoology',
    classLevel: 'Class 11',
    unit: 'Human Physiology',
    chapterNumber: 21,
    title: 'Neural Control and Coordination',
    weightageScore: 16,
    pyqCount: 44,
    summary: 'Structure of neuron, resting membrane potential, generation and conduction of nerve impulse (depolarization and repolarization), synaptic transmission (electrical vs chemical), central nervous system, reflex arc, and sensory receptors.',
    concepts: [
      {
        id: 'c-action-potential',
        title: 'Action Potential Generation & Sodium-Potassium Pump',
        ncertQuote: 'Resting membrane is relatively more permeable to potassium ions (K+) and nearly impermeable to sodium ions (Na+). At rest, 3 Na+ are pumped outwards for 2 K+ into the cell by Na+/K+ ATPase, maintaining negative charge inside (-70 mV). During depolarization, rapid influx of Na+ occurs.',
        explanation: 'Depolarization: Voltage-gated Na+ channels open, Na+ rushes into axoplasm reversing polarity (+30 mV). Repolarization: Na+ channels close, K+ channels open allowing K+ efflux.',
        pyqHistory: ['NEET 2024', 'NEET 2023', 'NEET 2021', 'NEET 2018'],
        neetTrapWarning: 'Watch out: Resting membrane is NOT impermeable to K+! It is 30 times MORE permeable to K+ than to Na+. The pump expels 3 Na+ out and imports 2 K+ in (costing 1 ATP).'
      }
    ],
    formulaList: [
      'Resting potential = -70 mV | Threshold = -55 mV | Spike peak = +30 mV',
      '3 Na+ out / 2 K+ in via active transport (Na+/K+ ATPase)'
    ],
    sampleQuestionIds: ['q-zoology-1', 'q-zoology-2']
  },
  {
    id: 'bio-12-human-reproduction',
    subject: 'Zoology',
    classLevel: 'Class 12',
    unit: 'Reproduction',
    chapterNumber: 3,
    title: 'Human Reproduction',
    weightageScore: 24,
    pyqCount: 68,
    summary: 'Male reproductive system (Spermatogenesis, Sertoli & Leydig cells), Female reproductive system (Oogenesis, Menstrual cycle, LH surge, Corpus luteum), Fertilization, Cleavage, Blastocyst implantation, Placenta hormones (hCG, hPL, relaxin), and Parturition.',
    concepts: [
      {
        id: 'c-menstrual-hormones',
        title: 'Hormonal Control of Menstrual Cycle & LH Surge',
        ncertQuote: 'Rapid secretion of LH leading to its maximum level during the mid-cycle (around 14th day) called LH surge induces rupture of Graafian follicle and thereby the release of ovum (ovulation). Corpus luteum secretes large amounts of progesterone.',
        explanation: 'Peak estrogen triggers positive feedback on LH causing LH surge at Day 14. Progesterone rises during luteal phase to maintain endometrium for possible pregnancy.',
        pyqHistory: ['NEET 2024', 'NEET 2023', 'NEET 2022', 'NEET 2020', 'NEET 2019'],
        neetTrapWarning: 'hCG, hPL and Relaxin are produced in women ONLY during pregnancy. Progesterone is essential for maintaining the endometrium.'
      }
    ],
    formulaList: [
      'Primary spermatocyte (2n) -> 2 Secondary spermatocytes (n) -> 4 Spermatids (n)',
      'Primary oocyte (2n) -> 1 Secondary oocyte (n) + 1st polar body (arrested in Metaphase II until sperm entry)'
    ],
    sampleQuestionIds: ['q-zoology-3', 'q-zoology-4']
  },

  // ==================== CHEMISTRY ====================
  {
    id: 'chem-11-chemical-bonding',
    subject: 'Chemistry',
    classLevel: 'Class 11',
    unit: 'Inorganic Chemistry',
    chapterNumber: 4,
    title: 'Chemical Bonding and Molecular Structure',
    weightageScore: 20,
    pyqCount: 62,
    summary: 'Ionic and covalent bonds, Lewis structures, Formal charge, VSEPR theory, Valence Bond Theory, Hybridisation (sp, sp2, sp3, sp3d, sp3d2), Molecular Orbital Theory (electronic configuration, bond order, magnetic properties of B2, C2, N2, O2, F2, superoxide, peroxide), and Hydrogen bonding.',
    concepts: [
      {
        id: 'c-mot-bond-order',
        title: 'Molecular Orbital Theory & Bond Order Rules',
        ncertQuote: 'For species up to 14 electrons (e.g. N2, C2, B2): pi(2px) = pi(2py) < sigma(2pz). For species with more than 14 electrons (e.g. O2, F2): sigma(2pz) < pi(2px) = pi(2py). Bond order = 0.5 * (Nb - Na).',
        explanation: 'B2 and C2 have ONLY pi bonds according to MOT. O2 is paramagnetic due to two unpaired electrons in antibonding pi* orbitals.',
        pyqHistory: ['NEET 2024', 'NEET 2023', 'NEET 2022', 'NEET 2021', 'NEET 2020'],
        neetTrapWarning: 'In C2 molecule, both the bonds are PI bonds! (No sigma bond, because 4 valence electrons are present in pi(2px) and pi(2py) MOs).'
      },
      {
        id: 'c-vsepr-shapes',
        title: 'VSEPR Theory & Lone Pair Repulsion',
        ncertQuote: 'Repulsive interaction of electron pairs decreases in the order: Lone pair-Lone pair > Lone pair-Bond pair > Bond pair-Bond pair. SF4 is see-saw, ClF3 is T-shaped, XeF4 is square planar, XeF2 is linear.',
        explanation: 'Trigonal bipyramidal geometry: lone pairs prefer equatorial positions to minimize 90-degree repulsive interactions.',
        pyqHistory: ['NEET 2024', 'NEET 2022', 'NEET 2019'],
        neetTrapWarning: 'Never place lone pairs at axial positions in Trigonal Bipyramidal geometry (e.g. SF4, ClF3). They always occupy equatorial positions to minimize 90° repulsions!'
      }
    ],
    formulaList: [
      'Bond Order = (Electrons in BMO - Electrons in ABMO) / 2',
      'Steric Number = Bond pairs (sigma) + Lone pairs on central atom',
      'Dipole moment: μ = q × d (in Debye, 1 D = 3.33564 × 10^-30 C·m)'
    ],
    sampleQuestionIds: ['q-chem-1', 'q-chem-2']
  },
  {
    id: 'chem-12-coordination-compounds',
    subject: 'Chemistry',
    classLevel: 'Class 12',
    unit: 'Inorganic Chemistry',
    chapterNumber: 9,
    title: 'Coordination Compounds',
    weightageScore: 16,
    pyqCount: 52,
    summary: 'Werner’s theory (primary vs secondary valency), IUPAC nomenclature, Isomerism (Geometrical, Optical, Linkage, Ionisation, Solvate, Coordination), Crystal Field Theory (octahedral and tetrahedral splitting, spectrochemical series, strong vs weak field ligands, pairing energy, magnetic moment).',
    concepts: [
      {
        id: 'c-cft-splitting',
        title: 'Octahedral Crystal Field Splitting (Δo)',
        ncertQuote: 'The d-orbitals split into t2g (lower energy: dxy, dyz, dzx) and eg (higher energy: dx2-y2, dz2). In presence of strong field ligands (Δo > P), pairing of electrons occurs in t2g orbitals leading to low-spin complexes.',
        explanation: 'Spin-only magnetic moment μ = sqrt(n(n+2)) BM, where n = number of unpaired electrons.',
        pyqHistory: ['NEET 2024', 'NEET 2023', 'NEET 2021', 'NEET 2020'],
        neetTrapWarning: '[Fe(CN)6]3- is d5 low spin (t2g5, 1 unpaired electron, μ = 1.73 BM), while [FeF6]3- is d5 high spin (t2g3 eg2, 5 unpaired electrons, μ = 5.92 BM).'
      }
    ],
    formulaList: [
      'Spin-only magnetic moment: μ = √[n(n+2)] Bohr Magnetons (BM)',
      'Octahedral Crystal Field Stabilization Energy: CFSE = [-0.4(nt2g) + 0.6(neg)] Δo + mp P',
      'Tetrahedral splitting relationship: Δt = (4/9) Δo'
    ],
    sampleQuestionIds: ['q-chem-3', 'q-chem-4']
  },

  // ==================== PHYSICS ====================
  {
    id: 'phy-11-rotational-motion',
    subject: 'Physics',
    classLevel: 'Class 11',
    unit: 'Mechanics',
    chapterNumber: 7,
    title: 'System of Particles and Rotational Motion',
    weightageScore: 20,
    pyqCount: 54,
    summary: 'Center of mass, torque, angular momentum and its conservation, Moment of Inertia of standard bodies (ring, disc, solid cylinder, hollow sphere, solid sphere), Theorems of parallel and perpendicular axes, Pure rolling motion (v = Rω, acceleration a = g sinθ / (1 + k^2/R^2)).',
    concepts: [
      {
        id: 'c-rolling-acceleration',
        title: 'Acceleration & Velocity in Pure Rolling on Inclined Plane',
        ncertQuote: 'For a body of mass m and radius R rolling without slipping down an inclined plane of inclination θ: a = (g sinθ) / (1 + k^2/R^2), where k is the radius of gyration.',
        explanation: 'The body with the SMALLEST (k^2/R^2) reaches the bottom FIRST with the greatest linear acceleration.',
        pyqHistory: ['NEET 2024', 'NEET 2023', 'NEET 2021', 'NEET 2019', 'NEET 2016'],
        neetTrapWarning: 'k^2/R^2 values: Solid Sphere (2/5 = 0.4) < Disc/Solid Cylinder (1/2 = 0.5) < Hollow Sphere (2/3 = 0.67) < Ring/Hollow Cylinder (1.0). Solid sphere always wins the race!',
        mnemonic: 'Sphere > Disc > Hollow Sphere > Ring (Smallest ratio rolls fastest down the incline)'
      }
    ],
    formulaList: [
      'Torque: τ = r × F = Iα = dL/dt',
      'Angular Momentum: L = r × p = Iω',
      'Rolling Kinetic Energy: K_total = (1/2)mv^2 (1 + k^2/R^2)',
      'Acceleration on Incline: a = (g sinθ) / (1 + k^2/R^2)'
    ],
    sampleQuestionIds: ['q-phy-1', 'q-phy-2']
  },
  {
    id: 'phy-12-current-electricity',
    subject: 'Physics',
    classLevel: 'Class 12',
    unit: 'Electrodynamics',
    chapterNumber: 3,
    title: 'Current Electricity',
    weightageScore: 24,
    pyqCount: 66,
    summary: 'Electric current, drift velocity (vd = eEτ/m), Ohm’s law, resistivity and temperature dependence, combination of resistors, internal resistance of a cell, cells in series and parallel, Kirchhoff’s laws and applications, Wheatstone bridge, meter bridge, and potentiometer principle.',
    concepts: [
      {
        id: 'c-drift-velocity',
        title: 'Microscopic Ohm’s Law & Drift Velocity',
        ncertQuote: 'Current I = n e A vd. Drift velocity vd = (e E τ) / m. Resistivity ρ = m / (n e^2 τ). When temperature increases in conductors, relaxation time τ decreases, so resistance increases.',
        explanation: 'In semiconductors, electron density n increases exponentially with temperature, so resistivity decreases (negative temperature coefficient).',
        pyqHistory: ['NEET 2024', 'NEET 2023', 'NEET 2022', 'NEET 2020'],
        neetTrapWarning: 'Drift velocity is very slow (order of mm/s or 10^-4 m/s), yet light turns on instantly because the electric field propagates through the wire at nearly the speed of light.'
      }
    ],
    formulaList: [
      'Current: I = n A e vd',
      'Drift velocity: vd = (e E τ) / m = (e V τ) / (m L)',
      'Resistivity: ρ = m / (n e^2 τ); Temperature dependence: Rt = R0 (1 + α ΔT)',
      'Cell terminal voltage: V = E - I r (discharging); V = E + I r (charging)',
      'Kirchhoff’s 1st Law (Junction): Conservation of Charge | 2nd Law (Loop): Conservation of Energy'
    ],
    sampleQuestionIds: ['q-phy-3', 'q-phy-4']
  }
];
