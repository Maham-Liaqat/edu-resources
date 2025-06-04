export const EDUCATION_LEVELS = {
  CLASS_9: 'class-9',
  CLASS_10: 'class-10',
  FSC_PART1: 'fsc-part-1',
  FSC_PART2: 'fsc-part-2'
};

export const RESOURCE_TYPES = {
  TEXTBOOK: 'textbook',
  NOTES: 'notes',
  PAST_PAPERS: 'past-papers'
};

export const SUBJECTS = {
  [EDUCATION_LEVELS.CLASS_9]: [
    'Physics', 'Chemistry', 'Biology', 'Math', 'Computer Science', 'English', 'Urdu', 'Islamiyat', 'Tarjama tul Quran'
  ],
  // Add other levels...
   [EDUCATION_LEVELS.CLASS_10]: [
    'Physics', 'Chemistry', 'Biology', 'Math', 'Computer Science', 'English', 'Urdu', 'Pak Studies', 'Tarjama tul Quran'
  ],
   [EDUCATION_LEVELS.FSC_PART1]: [
    'Physics', 'Chemistry', 'Biology', 'Math', 'Computer Science', 'English', 'Urdu', 'Islamiyat', 'Tarjama tul Quran'
  ],
  [EDUCATION_LEVELS.FSC_PART2]: [
    'Physics', 'Chemistry', 'Biology', 'Math', 'Computer Science', 'English', 'Urdu', 'Pak Studies', 'Tarjama tul Quran'
  ]
};