import { StudyTask, WeaknessInsight } from '../types/neet';

export const INITIAL_WEAKNESS_INSIGHTS: WeaknessInsight[] = [
  {
    subject: 'Physics',
    chapter: 'System of Particles and Rotational Motion',
    accuracy: 42,
    totalAttempts: 24,
    status: 'Critical Alert',
    recommendedAction: 'Revise Rolling Dynamics & Moment of Inertia standard tables in NCERT. Practice 30 numericals.'
  },
  {
    subject: 'Chemistry',
    chapter: 'Coordination Compounds',
    accuracy: 55,
    totalAttempts: 20,
    status: 'Needs Attention',
    recommendedAction: 'Re-read Crystal Field Splitting (CFT) & Spectrochemical series exceptions.'
  },
  {
    subject: 'Botany',
    chapter: 'Morphology of Flowering Plants',
    accuracy: 64,
    totalAttempts: 28,
    status: 'Needs Attention',
    recommendedAction: 'Memorize Placentation, Aestivation, and Family floral formulas using mnemonics.'
  },
  {
    subject: 'Zoology',
    chapter: 'Neural Control and Coordination',
    accuracy: 82,
    totalAttempts: 32,
    status: 'Strong',
    recommendedAction: 'Maintain with weekly rapid flashcard recall and PYQ drill.'
  }
];

export const INITIAL_STUDY_TASKS: StudyTask[] = [
  {
    id: 'task-1',
    timeSlot: '06:00 - 08:00 AM',
    subject: 'Physics',
    chapter: 'System of Particles and Rotational Motion',
    taskType: 'NCERT_READ',
    completed: false,
    priority: 'CRITICAL',
    description: 'Active NCERT reading of Section 7.14 (Pure Rolling) + deriving a = g sinθ / (1 + k^2/R^2).'
  },
  {
    id: 'task-2',
    timeSlot: '09:00 - 10:30 AM',
    subject: 'Physics',
    chapter: 'System of Particles and Rotational Motion',
    taskType: 'PYQ_PRACTICE',
    completed: false,
    priority: 'CRITICAL',
    description: 'Solve 25 PYQs from 2015 to 2024 specifically on Torque and Rolling without looking at hints.'
  },
  {
    id: 'task-3',
    timeSlot: '11:00 - 12:30 PM',
    subject: 'Chemistry',
    chapter: 'Coordination Compounds',
    taskType: 'NCERT_READ',
    completed: true,
    priority: 'HIGH',
    description: 'Review Spectrochemical Series & CFT d-orbital splitting patterns (Octahedral & Tetrahedral).'
  },
  {
    id: 'task-4',
    timeSlot: '02:30 - 03:15 PM',
    subject: 'Botany',
    chapter: 'Morphology of Flowering Plants',
    taskType: 'MISTAKE_REVISION',
    completed: false,
    priority: 'HIGH',
    description: 'Review 12 wrong questions in Mistake Book on Placentation examples & Solanaceae formula.'
  },
  {
    id: 'task-5',
    timeSlot: '04:00 - 04:45 PM',
    subject: 'Botany',
    chapter: 'Daily High-Yield Mock Drill',
    taskType: 'MOCK_TEST',
    completed: false,
    priority: 'HIGH',
    description: 'Complete 45-minute Daily Speed Sprint test to sharpen exam-hall time discipline.'
  },
  {
    id: 'task-6',
    timeSlot: '08:00 - 09:30 PM',
    subject: 'Zoology',
    chapter: 'Human Reproduction & Hormones',
    taskType: 'PYQ_PRACTICE',
    completed: false,
    priority: 'MEDIUM',
    description: 'Speed drill on Menstrual Cycle hormone peaks and Spermatogenesis vs Oogenesis stages.'
  }
];
