import { DoubtPost } from '../types/neet';

export const INITIAL_FORUM_POSTS: DoubtPost[] = [
  {
    id: 'doubt-1',
    studentName: 'Aarav Patel',
    studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face',
    title: 'Why is C2 molecule having BOTH pi bonds? Shouldn\'t there be at least one sigma bond?',
    subject: 'Chemistry',
    classLevel: 'Class 11',
    chapter: 'Chemical Bonding and Molecular Structure',
    questionText: `In general, we are taught that a single bond is sigma, a double bond has 1 sigma + 1 pi, and a triple bond has 1 sigma + 2 pi. Why does NCERT state that in C2 molecule, both the bonds in the double bond are pi bonds? Can someone explain the MOT diagram?`,
    userAttempt: `I thought C2 would have 1 sigma and 1 pi bond like ethylene, but my test marked it wrong!`,
    upvotes: 42,
    userUpvoted: false,
    status: 'MENTOR_ANSWERED',
    repliesCount: 7,
    createdAt: '2 hours ago',
    mentorReply: {
      mentorName: 'Dr. Arvind Gupta',
      mentorRole: 'Senior NEET Chemistry Specialist | IIT-BHU & Medical Mentor',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      content: `Hello Aarav! This is one of the classic NTA NEET traps. 
In C2, there are 12 total electrons. 
Its electronic configuration according to Molecular Orbital Theory (MOT) for species with <= 14 electrons is:
σ1s² σ*1s² σ2s² σ*2s² (π2px² = π2py²).
Notice the 4 valence electrons (electrons 9, 10, 11, 12):
All four valence electrons occupy the degenerate degenerate π2px and π2py bonding molecular orbitals!
No valence electrons enter the σ2pz orbital!
Therefore, both the bonds in C2 are strictly π (pi) bonds due to the presence of 4 electrons in two π molecular orbitals.

Refer to NCERT Class 11 Chemistry Part 1, Chapter 4, Page 130, Section 4.7.4. Keep this noted in your Mistake Book!`,
      ncertCitation: 'NCERT Class 11 Chemistry, Part 1, Chapter 4, Page 130',
      date: '1 hour ago'
    }
  },
  {
    id: 'doubt-2',
    studentName: 'Pooja Deshmukh',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    title: 'Why is prothallus in Pteridophytes strictly haploid when the main plant body is diploid?',
    subject: 'Botany',
    classLevel: 'Class 11',
    chapter: 'Plant Kingdom',
    questionText: `In Pteridophytes (Ferns), the main plant body is a diploid sporophyte (2n). How does the prothallus become haploid, and how does it form gametes? Is meiosis involved in gamete formation?`,
    userAttempt: `I assumed since sporophyte is 2n, gametes are formed by meiosis directly like in humans.`,
    upvotes: 35,
    userUpvoted: true,
    status: 'MENTOR_ANSWERED',
    repliesCount: 4,
    createdAt: '5 hours ago',
    mentorReply: {
      mentorName: 'Dr. Sneha Rao',
      mentorRole: 'MAMC Delhi Alumna | Senior Botany Specialist',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
      content: `Pooja, never confuse plant life cycles with animal reproduction!
In plants with alternation of generations:
1. The diploid sporophyte (2n) has sporangia containing spore mother cells.
2. Spore mother cells undergo MEIOSIS to produce haploid spores (n).
3. These haploid spores germinate on moist soil to form the prothallus. Hence, the prothallus is 100% HAPLOID (n) gametophyte!
4. Since the prothallus is already haploid, it produces antherozoids (male) and egg (female) by MITOSIS (not meiosis!).
5. Fertilization yields a diploid zygote (2n) which grows into the young sporophyte.

NCERT lines: 'The spores germinate to give rise to inconspicuous, small but multicellular, free-living, mostly photosynthetic thalloid gametophytes called prothallus.' (Class 11, Chapter 3, Page 38).`,
      ncertCitation: 'NCERT Class 11 Biology, Chapter 3: Plant Kingdom, Page 38',
      date: '3 hours ago'
    }
  },
  {
    id: 'doubt-3',
    studentName: 'Rohan Iyer',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    title: 'Short trick to remember rolling acceleration on inclined plane without deriving each time',
    subject: 'Physics',
    classLevel: 'Class 11',
    chapter: 'System of Particles and Rotational Motion',
    questionText: `In the exam, deriving a = g sinθ / (1 + k^2/R^2) takes too much time when comparing sphere, disc, and cylinder. Is there a speed technique or memory order to answer in 10 seconds?`,
    upvotes: 56,
    userUpvoted: false,
    status: 'MENTOR_ANSWERED',
    repliesCount: 9,
    createdAt: '1 day ago',
    mentorReply: {
      mentorName: 'Prof. K. R. Verma',
      mentorRole: 'Ex-Kota Senior Physics Faculty (16+ yrs)',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: `Rohan, memorize the coefficient of MR² (which is equal to k²/R²):
- Solid Sphere: 2/5 = 0.40 (Lowest inertia ratio -> highest acceleration -> arrives FIRST)
- Disc / Solid Cylinder: 1/2 = 0.50
- Hollow Sphere: 2/3 = 0.67
- Ring / Hollow Cylinder: 1.00 (Highest inertia ratio -> lowest acceleration -> arrives LAST)

Speed Golden Rule:
Acceleration ∝ 1 / (1 + β), where β = I / (MR²).
Order of acceleration: Solid Sphere > Disc > Hollow Sphere > Ring.
Order of time taken: Solid Sphere < Disc < Hollow Sphere < Ring.
You can answer any incline race question in NEET in under 5 seconds with this table!`,
      ncertCitation: 'NCERT Class 11 Physics, Chapter 7, Page 174',
      date: '18 hours ago'
    }
  }
];
