// Données initiales pour les tâches
export const initialTasks = [
  {
    id: 1,
    title: 'Complete Math Assignment',
    description: 'Solve problems 1-20 from Chapter 5',
    dueDate: '2023-11-25',
    priority: 'high',
    category: 'Homework',
    completed: false,
    reminder: '2023-11-24 18:00',
    tags: ['math', 'calculus'],
    subtasks: [
      { id: 101, title: 'Problems 1-10', completed: true },
      { id: 102, title: 'Problems 11-20', completed: false },
    ]
  },
  {
    id: 2,
    title: 'Read History Textbook',
    description: 'Read chapters 7-8 and take notes',
    dueDate: '2023-11-26',
    priority: 'medium',
    category: 'Reading',
    completed: false,
    reminder: null,
    tags: ['history', 'notes'],
    subtasks: []
  },
  {
    id: 3,
    title: 'Research for Science Project',
    description: 'Find sources for renewable energy project',
    dueDate: '2023-12-05',
    priority: 'high',
    category: 'Project',
    completed: false,
    reminder: '2023-12-03 10:00',
    tags: ['science', 'research'],
    subtasks: [
      { id: 103, title: 'Find 5 academic sources', completed: false },
      { id: 104, title: 'Create outline', completed: false },
    ]
  },
  {
    id: 4,
    title: 'Study for English Quiz',
    description: 'Review vocabulary and grammar rules',
    dueDate: '2023-11-24',
    priority: 'medium',
    category: 'Study',
    completed: true,
    reminder: null,
    tags: ['english', 'quiz'],
    subtasks: []
  },
  {
    id: 5,
    title: 'Complete Programming Assignment',
    description: 'Implement sorting algorithm and submit code',
    dueDate: '2023-11-28',
    priority: 'high',
    category: 'Homework',
    completed: false,
    reminder: '2023-11-27 20:00',
    tags: ['programming', 'algorithms'],
    subtasks: [
      { id: 105, title: 'Implement algorithm', completed: false },
      { id: 106, title: 'Write documentation', completed: false },
      { id: 107, title: 'Test code', completed: false },
    ]
  },
  {
    id: 6,
    title: 'Prepare Presentation Slides',
    description: 'Create slides for group presentation',
    dueDate: '2023-12-10',
    priority: 'medium',
    category: 'Project',
    completed: false,
    reminder: '2023-12-08 15:00',
    tags: ['presentation', 'group'],
    subtasks: []
  },
];

// Données pour les catégories
export const taskCategories = [
  'Homework',
  'Reading',
  'Study',
  'Project',
  'Exam',
  'Other'
];

// Données pour les priorités
export const taskPriorities = [
  { value: 'high', label: 'High', color: 'red' },
  { value: 'medium', label: 'Medium', color: 'orange' },
  { value: 'low', label: 'Low', color: 'green' },
];