import { ProgramInfo, ActivityCardData, Testimonial, BlogPost } from '../types';

export const PROGRAMS_DATA: ProgramInfo[] = [
  {
    id: 'playgroup',
    name: 'Playgroup',
    tagline: 'First Steps Into A World Of Wonder',
    ageRange: '1.5 – 2.5 Years',
    color: '#F4511E',
    bgColor: '#FFF3E0',
    accentBorder: '#F4511E',
    overview:
      'A warm, nurturing introduction to social interaction, sensory discovery, and gentle separation from parents in a joyful play environment.',
    learningFocus: [
      'Sensory-motor development',
      'Social bonding & sharing',
      'Basic language rhymes & songs',
      'Fine motor muscle grasping',
    ],
    keyActivities: ['Sensory messy play', 'Finger painting', 'Nursery rhyme circle', 'Soft play obstacles'],
    timing: '9:00 AM – 11:30 AM',
    ratio: '1:6 (Teacher : Student)',
    mascotRole: 'super',
  },
  {
    id: 'nursery',
    name: 'Nursery',
    tagline: 'Curiosity Sparks Endless Exploration',
    ageRange: '2.5 – 3.5 Years',
    color: '#29B6F6',
    bgColor: '#E1F5FE',
    accentBorder: '#0288D1',
    overview:
      'Cultivating curiosity through structured play, vocabulary expansion, gross motor coordination, and self-expression through arts and rhythm.',
    learningFocus: [
      'Phonetic sounds & speech clarity',
      'Color, shape & pattern recognition',
      'Self-help routines & bathroom habits',
      'Cooperative play with peers',
    ],
    keyActivities: ['Story enactment with puppets', 'Sand & water exploration', 'Rhythm & movement', 'Building block towers'],
    timing: '8:30 AM – 12:00 PM',
    ratio: '1:8 (Teacher : Student)',
    mascotRole: 'music',
  },
  {
    id: 'lkg',
    name: 'Junior KG (LKG)',
    tagline: 'Building Confidence & Early Numeracy',
    ageRange: '3.5 – 4.5 Years',
    color: '#FFD21F',
    bgColor: '#FFFDE7',
    accentBorder: '#FBC02D',
    overview:
      'Fostering early literacy, logical thinking, scientific inquiry, and collaborative teamwork through inquiry-driven themes.',
    learningFocus: [
      'Early writing strokes & pre-reading',
      'Numbers 1–50 & counting concepts',
      'Environmental awareness & nature',
      'Social emotional self-regulation',
    ],
    keyActivities: ['Little Explorers STEM experiments', 'Drama & show-and-tell', 'Fine arts studio', 'Outdoor obstacle circuits'],
    timing: '8:30 AM – 12:30 PM',
    ratio: '1:10 (Teacher : Student)',
    mascotRole: 'artist',
  },
  {
    id: 'ukg',
    name: 'Senior KG (UKG)',
    tagline: 'Ready to Roar Into Grade School',
    ageRange: '4.5 – 5.5 Years',
    color: '#FF4F6D',
    bgColor: '#FCE4EC',
    accentBorder: '#E91E63',
    overview:
      'Comprehensive readiness for formal schooling with confident reading, mathematical reasoning, creative problem solving, and public speaking.',
    learningFocus: [
      'Independent sentence reading & writing',
      'Addition, subtraction & measurement logic',
      'Critical thinking & project work',
      'Leadership & empathetic communication',
    ],
    keyActivities: ['Junior science lab', 'Math puzzle quests', 'Storybook authoring', 'Team sports & yoga'],
    timing: '8:30 AM – 1:30 PM',
    ratio: '1:12 (Teacher : Student)',
    mascotRole: 'teacher',
  },
  {
    id: 'daycare',
    name: 'Day Care & Extended Care',
    tagline: 'A Safe, Loving Home Away From Home',
    ageRange: '1.5 – 8 Years',
    color: '#8B5CF6',
    bgColor: '#F3E8FF',
    accentBorder: '#7C3AED',
    overview:
      'Full-day nutritious meals, peaceful nap zones, guided homework assistance, creative hobby hours, and secure supervised play.',
    learningFocus: [
      'Healthy eating habits & table manners',
      'Calm mindfulness & resting routines',
      'Creative hobby exploration',
      'Peer collaboration across age groups',
    ],
    keyActivities: ['Nap time fairy stories', 'Board games & puzzles', 'Evening outdoor games', 'Art & craft workshops'],
    timing: '8:00 AM – 6:30 PM',
    ratio: '1:6 (Caregiver : Child)',
    mascotRole: 'meditate',
  },
];

export const ACTIVITIES_DATA: ActivityCardData[] = [
  {
    id: 'art',
    title: 'Art & Creative Studio',
    category: 'Creative Expression',
    description: 'Finger paints, clay modeling, collage, and canvas creations to unlock visual imagination.',
    accentColor: '#FF4F6D',
    iconName: 'Palette',
    mascotRole: 'artist',
    skillsDeveloped: ['Hand-eye coordination', 'Color theory', 'Self-expression', 'Fine motor control'],
  },
  {
    id: 'music',
    title: 'Music & Movement',
    category: 'Acoustic Discovery',
    description: 'Drums, xylophones, nursery acoustics, and rhythmic dance that activate neuro-pathways.',
    accentColor: '#8B5CF6',
    iconName: 'Music',
    mascotRole: 'music',
    skillsDeveloped: ['Auditory processing', 'Rhythm sense', 'Gross motor coordination', 'Joyful confidence'],
  },
  {
    id: 'stem',
    title: 'Little Explorers / STEM',
    category: 'Scientific Inquiry',
    description: 'Water displacement, seed germination, magnet quests, and sensory balance experiments.',
    accentColor: '#29B6F6',
    iconName: 'Compass',
    mascotRole: 'super',
    skillsDeveloped: ['Hypothesis thinking', 'Cause and effect', 'Spatial reasoning', 'Patience & curiosity'],
  },
  {
    id: 'nature',
    title: 'Nature & Outdoor Garden',
    category: 'Green Connection',
    description: 'Herb gardening, bird watching, sand castle sculpting, and fresh air playground circuits.',
    accentColor: '#5BC85A',
    iconName: 'Trees',
    mascotRole: 'teacher',
    skillsDeveloped: ['Environmental respect', 'Physical endurance', 'Tactile sensation', 'Immune health'],
  },
  {
    id: 'story',
    title: 'Puppet & Storytelling Den',
    category: 'Language Immersion',
    description: 'Interactive picture books, felt-board fairy tales, and character role-play that spark vocabulary.',
    accentColor: '#FFD21F',
    iconName: 'BookOpen',
    mascotRole: 'reader',
    skillsDeveloped: ['Vocabulary expansion', 'Empathy & listening', 'Sequence memory', 'Public speaking'],
  },
  {
    id: 'mindfulness',
    title: 'Kids Yoga & Calm Zone',
    category: 'Emotional Wellbeing',
    description: 'Gentle diaphragmatic breathing with Leo, animal poses, soothing soundscapes, and sensory calm.',
    accentColor: '#5ED7E8',
    iconName: 'Heart',
    mascotRole: 'meditate',
    skillsDeveloped: ['Emotional self-regulation', 'Core balance', 'Mindfulness', 'Stress relief'],
  },
];

export const DAILY_TIMELINE = [
  {
    time: '8:30 AM',
    title: 'Sunny Morning Welcome',
    desc: 'Warm hugs from teachers, shoe cubby independence, and greeting friend Leo at the door.',
    badgeColor: '#F4511E',
    icon: 'Sun',
  },
  {
    time: '9:00 AM',
    title: 'Circle Time & Rhyme Circle',
    desc: 'Attendance song, weather wheel exploration, emotion check-in, and morning calendar joy.',
    badgeColor: '#FFD21F',
    icon: 'Users',
  },
  {
    time: '10:00 AM',
    title: 'Creative Corner & Sensory Play',
    desc: 'Hands-on stations: painting, clay sculpting, alphabet puzzles, and discovery sand tables.',
    badgeColor: '#FF4F6D',
    icon: 'Palette',
  },
  {
    time: '11:00 AM',
    title: 'Outdoor Adventure & Motor Circuit',
    desc: 'Tricycle track, soft lawn obstacle runs, balancing beams, and supervised swings.',
    badgeColor: '#5BC85A',
    icon: 'Compass',
  },
  {
    time: '12:00 PM',
    title: 'Nutritious Snack & Table Talks',
    desc: 'Handwashing hygiene, organic seasonal snacks, table etiquette, and joyful chatter with peers.',
    badgeColor: '#29B6F6',
    icon: 'Coffee',
  },
  {
    time: '1:00 PM',
    title: 'Storybook Den & Mindful Reflection',
    desc: 'Immersive puppetry, cozy carpet reading, calming breathing with Leo, and daily reflection.',
    badgeColor: '#8B5CF6',
    icon: 'BookOpen',
  },
  {
    time: '2:00 PM',
    title: 'Proud Smiles & See You Tomorrow!',
    desc: 'Pack-up routines, sharing daily triumphs with parents, and waving high-fives to Leo.',
    badgeColor: '#F4511E',
    icon: 'Smile',
  },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    parentName: 'Priya & Rahul Sharma',
    childName: 'Aarav (Nursery)',
    program: 'Nursery Program',
    review:
      'Enrolling Aarav at A Kid’s Pre School was the best decision for our family. He used to be shy, but within two months he started singing rhymes, identifying patterns, and talking happily about Leo the Lion every single day! The teachers treat each child with incredible love and patience.',
    rating: 5,
    avatarColor: '#F4511E',
    published: true,
    date: 'March 2026',
  },
  {
    id: 'test-2',
    parentName: 'Ananya & Vikram Iyer',
    childName: 'Meera (Playgroup)',
    program: 'Playgroup',
    review:
      'The campus environment is colorful, clean, and completely child-safe. We love the daily updates, transparent safety measures, and how sensory play has boosted Meera’s vocabulary and fine motor grasp. Highly recommended to all parents!',
    rating: 5,
    avatarColor: '#29B6F6',
    published: true,
    date: 'February 2026',
  },
  {
    id: 'test-3',
    parentName: 'Dr. Sameer & Neha Gupta',
    childName: 'Kabir (Junior KG)',
    program: 'Junior KG',
    review:
      'What sets A Kid’s Pre School apart is their hands-on methodology. Kabir doesn’t just memorize words; he understands science concepts through Little Explorers and paints with real passion. The curriculum balance is world-class.',
    rating: 5,
    avatarColor: '#FFD21F',
    published: true,
    date: 'January 2026',
  },
  {
    id: 'test-4',
    parentName: 'Sneha & Rohan Patel',
    childName: 'Diya (Senior KG)',
    program: 'Senior KG',
    review:
      'Diya is now reading storybooks independently and writing with great confidence. The transition into big school feels effortless thanks to the strong foundational numeracy and emotional resilience built here.',
    rating: 5,
    avatarColor: '#FF4F6D',
    published: true,
    date: 'April 2026',
  },
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Why Sensory Play Is Crucial for Brain Development in Toddlers',
    slug: 'sensory-play-brain-development',
    category: 'Child Development',
    excerpt:
      'Discover how tactile experiences with playdough, water, and textures build neural synapses and emotional self-regulation in early years.',
    content: `Early childhood neuroscientists emphasize that the first 5 years build over 90% of a child's foundational brain architecture. When children touch, pour, squish, and sculpt, they aren't just having messy fun—they are actively firing sensory neurons.

Key Takeaways for Parents:
1. Tactile Variety: Offer safe materials like edible dough, lentils, and water basins.
2. Emotional Grounding: Sensory play calms overstimulated nervous systems.
3. Language Link: Describing textures (slimy, crunchy, silky) expands expressive vocabulary exponentially.`,
    coverImage: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
    accentColor: '#FF4F6D',
    author: 'Early Learning Research Team',
    readTime: '4 min read',
    publishedAt: 'August 10, 2026',
  },
  {
    id: 'blog-2',
    title: '5 Gentle Ways to Overcome Preschool Separation Anxiety',
    slug: 'overcoming-preschool-separation-anxiety',
    category: 'Parenting Tips',
    excerpt:
      'A compassionate guide for parents on turning morning drop-off tears into confident high-fives and joyful farewells.',
    content: `Separation anxiety is a normal and healthy milestone of secure attachment. With predictable routines and reassuring rituals, children quickly learn that goodbye is always followed by a happy reunion.

Helpful Strategies:
- Consistent Goodbye Ritual: A special handshake or pocket kiss creates comfort.
- Never Sneak Away: Always say a clear, confident goodbye so trust remains intact.
- Keep Morning Drop-Offs Swift: Lingering often increases anxious anticipation.`,
    coverImage: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80',
    accentColor: '#29B6F6',
    author: 'Child Psychologist Dr. Meera Sen',
    readTime: '5 min read',
    publishedAt: 'July 28, 2026',
  },
  {
    id: 'blog-3',
    title: 'Fostering a Love for Storybooks Before Children Learn to Read',
    slug: 'fostering-love-for-storybooks',
    category: 'Learning at Home',
    excerpt:
      'How bedtime picture stories, expressive character voices, and open-ended questions spark a lifelong passion for reading.',
    content: `Reading together for just 15 minutes a day exposes a preschooler to over 1 million words per year compared to non-reading peers.

Practical Tips:
- Let Your Child Hold & Turn Pages: Builds book handling confidence.
- Ask "What happens next?": Cultivates narrative prediction skills.
- Point to Pictures and Relate to Real Life: Bridges imaginative concepts with their daily world.`,
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    accentColor: '#8B5CF6',
    author: 'Head of Literacy Curriculum',
    readTime: '3 min read',
    publishedAt: 'July 14, 2026',
  },
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    category: 'Classrooms',
    title: 'Sunny Interactive Activity Hub',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80',
    desc: 'Child-scaled wooden furniture, natural lighting, and tactile discovery corners.',
  },
  {
    id: 'gal-2',
    category: 'Activities',
    title: 'Color Splashes in the Art Den',
    image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=900&q=80',
    desc: 'Young artists discovering finger paints and watercolor mixing.',
  },
  {
    id: 'gal-3',
    category: 'Outdoor',
    title: 'Grassland Discovery & Motor Fun',
    image: 'https://images.unsplash.com/photo-1567057419565-4349c49d8a04?auto=format&fit=crop&w=900&q=80',
    desc: 'Safe rubberized flooring, tricycle tracks, and lush green lawns.',
  },
  {
    id: 'gal-4',
    category: 'Events',
    title: 'Annual Sports & Wonder Carnival',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80',
    desc: 'Proud smiles, team obstacle courses, and parent-child races.',
  },
  {
    id: 'gal-5',
    category: 'Celebrations',
    title: 'World Culture & Festive Dress Day',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
    desc: 'Celebrating diversity, unity, and joyful cultural heritage.',
  },
  {
    id: 'gal-6',
    category: 'Activities',
    title: 'Little Explorers STEM Science Table',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80',
    desc: 'Magnifying glasses, seed growth jars, and balance scales.',
  },
];
