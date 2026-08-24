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
    time: '10:30 AM',
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
    coverImage: '/gallery/Photos/Environment_day_2.jpeg',
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
    coverImage: '/gallery/Photos/First_day_at_school.jpeg',
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
    coverImage: '/gallery/Photos/Guru_Purnima_1.jpeg',
    accentColor: '#8B5CF6',
    author: 'Head of Literacy Curriculum',
    readTime: '3 min read',
    publishedAt: 'July 14, 2026',
  },
  {
    id: 'blog-4',
    title: 'Colour Day Celebration: Learning Through Vibrant Experiences',
    slug: 'colour-day-celebration',
    category: 'Activities',
    excerpt:
      'How our Colour Day activities help children identify, appreciate, and express themselves through the magic of colours.',
    content: `Colour Day is one of our most exciting activity sessions where children explore the world through vibrant hues.

What Happens:
- Children wear clothes matching the colour of the day
- Hands-on painting, mixing, and sensory exploration with coloured materials
- Identifying objects, fruits, and nature items that match the colour
- Building vocabulary: names of colours, shades, and related words

Benefits:
- Visual discrimination and pattern recognition
- Language development through colour-related conversations
- Fine motor skills through painting and crafting activities
- Social bonding as children celebrate together`,
    coverImage: '/gallery/Photos/Colour_activity.jpeg',
    accentColor: '#FF4F6D',
    author: 'Activity Coordinator',
    readTime: '3 min read',
    publishedAt: 'August 5, 2026',
  },
  {
    id: 'blog-5',
    title: 'Independence Day Celebration: Patriotism Through Play',
    slug: 'independence-day-celebration',
    category: 'School Events',
    excerpt:
      'A glimpse into our vibrant Independence Day celebration with flag hoisting, patriotic songs, and fun-filled activities for our little learners.',
    content: `Our Independence Day celebration is a joyful blend of patriotism and playful learning.

Highlights:
- Flag hoisting ceremony with all children and staff
- Patriotic songs and rhymes performed by different classes
- Craft activities: making tricolour badges, flags, and decorations
- Storytelling about India's heroes in age-appropriate ways
- Fun games and outdoor activities with a patriotic theme

Impact:
- Instilling a sense of national pride and belonging
- Understanding the significance of freedom through stories
- Creative expression through themed crafts
- Building community spirit among children and parents`,
    coverImage: '/gallery/Photos/Independance_.jpeg',
    accentColor: '#29B6F6',
    author: 'Event Coordinator',
    readTime: '4 min read',
    publishedAt: 'August 15, 2026',
  },
  {
    id: 'blog-6',
    title: 'Yoga Day: Building Balance, Focus, and Calm',
    slug: 'yoga-day-celebration',
    category: 'Activities',
    excerpt:
      'How our Yoga Day activities help children develop physical balance, mental focus, and emotional calm through fun poses and breathing exercises.',
    content: `Yoga Day at A Kid's Pre School is all about making mindfulness fun and accessible for young children.

Activities Include:
- Animal-themed yoga poses: cat, cow, tree, butterfly
- Simple breathing exercises with guided imagery
- Partner yoga for building trust and cooperation
- Nature walk combined with gentle stretching
- Calm-down corner with soothing music

Benefits for Little Learners:
- Improved balance, coordination, and body awareness
- Enhanced focus and concentration
- Emotional self-regulation through breathing techniques
- Stress relief and better sleep patterns
- Building healthy habits from an early age`,
    coverImage: '/gallery/Photos/yoga_3.jpeg',
    accentColor: '#5BC85A',
    author: 'Wellness Coordinator',
    readTime: '3 min read',
    publishedAt: 'June 21, 2026',
  },
  {
    id: 'blog-7',
    title: 'Rainy Day Celebration: Embracing Nature with Joy',
    slug: 'rainy-day-celebration',
    category: 'School Events',
    excerpt:
      'A fun-filled rainy day celebration where children splash, dance, and explore the magic of monsoon through sensory activities and creative play.',
    content: `Our Rainy Day celebration turns a regular monsoon day into a magical learning experience.

Highlights:
- Rain-themed arts and crafts: umbrellas, clouds, raindrops
- Sensory play with water, puddles, and safe rain exploration
- Dancing to rain songs and rhymes
- Storytelling about the water cycle in simple terms
- Making rain gauges and measuring rainfall

Learning Outcomes:
- Understanding weather patterns through hands-on experience
- Sensory development through water play
- Creative expression through rain-themed art
- Building appreciation for nature and environment`,
    coverImage: '/gallery/Photos/Rainy_day_activity.jpeg',
    accentColor: '#29B6F6',
    author: 'Activity Coordinator',
    readTime: '3 min read',
    publishedAt: 'July 20, 2026',
  },
];

export interface GalleryMediaItem {
  id: string;
  group: 'Celebrations' | 'Activities';
  title: string;
  file: string;
  type: 'photo' | 'video';
  subcategory: string;
}

export const GALLERY_MEDIA: GalleryMediaItem[] = [
  // ── Celebrations – Photos ──
  { id: 'g-01', group: 'Celebrations', title: 'World Environment Day', file: '/gallery/Photos/Environment_day_2.jpeg', type: 'photo', subcategory: 'Environment Day' },
  { id: 'g-02', group: 'Celebrations', title: 'First Day at School', file: '/gallery/Photos/First_day_at_school.jpeg', type: 'photo', subcategory: 'First Day' },
  { id: 'g-03', group: 'Celebrations', title: 'First Day at School', file: '/gallery/Photos/first_day_at_school_2.jpeg', type: 'photo', subcategory: 'First Day' },
  { id: 'g-04', group: 'Celebrations', title: 'Happy Independence Day', file: '/gallery/Photos/Independance_.jpeg', type: 'photo', subcategory: 'Independence Day' },
  { id: 'g-05', group: 'Celebrations', title: 'Happy Independence Day', file: '/gallery/Photos/independance_2.jpeg', type: 'photo', subcategory: 'Independence Day' },
  { id: 'g-06', group: 'Celebrations', title: 'Happy Independence Day', file: '/gallery/Photos/independance_3.jpeg', type: 'photo', subcategory: 'Independence Day' },
  { id: 'g-07', group: 'Celebrations', title: 'Happy Independence Day', file: '/gallery/Photos/independance_4.jpeg', type: 'photo', subcategory: 'Independence Day' },
  { id: 'g-08', group: 'Celebrations', title: 'Happy Independence Day', file: '/gallery/Photos/independance_5.jpeg', type: 'photo', subcategory: 'Independence Day' },
  { id: 'g-09', group: 'Celebrations', title: 'Happy Independence Day', file: '/gallery/Photos/independance_6.jpeg', type: 'photo', subcategory: 'Independence Day' },
  { id: 'g-10', group: 'Celebrations', title: 'Happy Independence Day', file: '/gallery/Photos/independance_7.jpeg', type: 'photo', subcategory: 'Independence Day' },
  { id: 'g-11', group: 'Celebrations', title: 'Happy Independence Day', file: '/gallery/Photos/independance_8.jpeg', type: 'photo', subcategory: 'Independence Day' },
  { id: 'g-12', group: 'Celebrations', title: 'Rainy Day Celebration', file: '/gallery/Photos/Rainy_day_activity.jpeg', type: 'photo', subcategory: 'Rainy Day' },
  { id: 'g-13', group: 'Celebrations', title: 'Rainy Day Celebration', file: '/gallery/Photos/rainy_day_activity_2.jpeg', type: 'photo', subcategory: 'Rainy Day' },
  { id: 'g-14', group: 'Celebrations', title: 'Rainy Day Celebration', file: '/gallery/Photos/Rainy_day_activity_3.jpeg', type: 'photo', subcategory: 'Rainy Day' },
  { id: 'g-15', group: 'Celebrations', title: 'Rainy Day Celebration', file: '/gallery/Photos/rainy_day_4.jpeg', type: 'photo', subcategory: 'Rainy Day' },
  { id: 'g-16', group: 'Celebrations', title: "Doctor's Day", file: "/gallery/Photos/doctor's_day_.jpeg", type: 'photo', subcategory: "Doctor's Day" },
  { id: 'g-17', group: 'Celebrations', title: 'Guru Purnima Celebration', file: '/gallery/Photos/Guru_Purnima_1.jpeg', type: 'photo', subcategory: 'Guru Purnima' },
  { id: 'g-18', group: 'Celebrations', title: 'Guru Purnima Celebration', file: '/gallery/Photos/guru_purnima_2.jpeg', type: 'photo', subcategory: 'Guru Purnima' },
  { id: 'g-19', group: 'Celebrations', title: 'Guru Purnima Celebration', file: '/gallery/Photos/guru_purnima_3.jpeg', type: 'photo', subcategory: 'Guru Purnima' },
  { id: 'g-20', group: 'Celebrations', title: 'Guru Purnima Celebration', file: '/gallery/Photos/guru_purnima_4.jpeg', type: 'photo', subcategory: 'Guru Purnima' },
  { id: 'g-21', group: 'Celebrations', title: 'Guru Purnima Celebration', file: '/gallery/Photos/guru_purnima_5.jpeg', type: 'photo', subcategory: 'Guru Purnima' },
  { id: 'g-22', group: 'Celebrations', title: 'Guru Purnima Celebration', file: '/gallery/Photos/guru_purnima_6.jpeg', type: 'photo', subcategory: 'Guru Purnima' },
  { id: 'g-23', group: 'Celebrations', title: 'Yoga Day Celebration', file: '/gallery/Photos/yoga_day.jpeg', type: 'photo', subcategory: 'Yoga Day' },
  { id: 'g-24', group: 'Celebrations', title: 'Yoga Day Celebration', file: '/gallery/Photos/yoga_day_2.jpeg', type: 'photo', subcategory: 'Yoga Day' },
  { id: 'g-25', group: 'Celebrations', title: 'Yoga Day Celebration', file: '/gallery/Photos/yoga_3.jpeg', type: 'photo', subcategory: 'Yoga Day' },
  { id: 'g-26', group: 'Celebrations', title: 'Yoga Day Celebration', file: '/gallery/Photos/Yoga_Day_celebration.jpeg', type: 'photo', subcategory: 'Yoga Day' },
  { id: 'g-27', group: 'Celebrations', title: 'Happy Friendship Day', file: '/gallery/Photos/friendhip_day_3.jpeg', type: 'photo', subcategory: 'Friendship Day' },
  { id: 'g-28', group: 'Celebrations', title: 'Happy Friendship Day', file: '/gallery/Photos/friendship_5.jpeg', type: 'photo', subcategory: 'Friendship Day' },
  { id: 'g-29', group: 'Celebrations', title: 'Happy Friendship Day', file: '/gallery/Photos/friendship_day_celebration.jpeg', type: 'photo', subcategory: 'Friendship Day' },
  { id: 'g-30', group: 'Celebrations', title: 'Happy Friendship Day', file: '/gallery/Photos/friendship_day_celebrtion_2.jpeg', type: 'photo', subcategory: 'Friendship Day' },
  { id: 'g-31', group: 'Celebrations', title: 'Happy Friendship Day', file: '/gallery/Photos/friendship_day_4.jpeg', type: 'photo', subcategory: 'Friendship Day' },
  { id: 'g-32', group: 'Celebrations', title: 'Happy Friendship Day', file: '/gallery/Photos/WhatsApp_Image_2026-08-15_at_21.14.32.jpeg', type: 'photo', subcategory: 'Friendship Day' },

  // ── Activities – Photos ──
  { id: 'g-33', group: 'Activities', title: 'Colour Days', file: '/gallery/Photos/Colour\'s_day_activity_2.jpeg', type: 'photo', subcategory: 'Colour Days' },
  { id: 'g-34', group: 'Activities', title: 'Colour Days', file: '/gallery/Photos/Colour_activity.jpeg', type: 'photo', subcategory: 'Colour Days' },
  { id: 'g-35', group: 'Activities', title: 'Shapes Day', file: '/gallery/Photos/circle_shape_day.jpeg', type: 'photo', subcategory: 'Shapes Day' },
  { id: 'g-36', group: 'Activities', title: 'Colour Days', file: '/gallery/Photos/Blue_colour_day_.jpeg', type: 'photo', subcategory: 'Colour Days' },
  { id: 'g-37', group: 'Activities', title: 'Colour Days', file: '/gallery/Photos/Blue_colour_day_2.jpeg', type: 'photo', subcategory: 'Colour Days' },
  { id: 'g-38', group: 'Activities', title: 'Colour Days', file: '/gallery/Photos/Blue_colour_day_3_.jpeg', type: 'photo', subcategory: 'Colour Days' },
  { id: 'g-39', group: 'Activities', title: 'Colour Days', file: '/gallery/Photos/green.jpeg', type: 'photo', subcategory: 'Colour Days' },
  { id: 'g-40', group: 'Activities', title: 'Colour Days', file: '/gallery/Photos/green_2.jpeg', type: 'photo', subcategory: 'Colour Days' },
  { id: 'g-41', group: 'Activities', title: 'Colour Days', file: '/gallery/Photos/green_3.jpeg', type: 'photo', subcategory: 'Colour Days' },

  // ── Celebrations – Videos ──
  { id: 'g-42', group: 'Celebrations', title: 'Rainy Day Celebration', file: '/gallery/Videos/Rainy_day_celebration.mp4', type: 'video', subcategory: 'Rainy Day' },
  { id: 'g-43', group: 'Celebrations', title: 'Rainy Day Celebration', file: '/gallery/Videos/Rainy_day_celebration_2.mp4', type: 'video', subcategory: 'Rainy Day' },
  { id: 'g-44', group: 'Celebrations', title: 'Independence Day Celebration', file: '/gallery/Videos/independance_day_celebration.mp4', type: 'video', subcategory: 'Independence Day' },
  { id: 'g-45', group: 'Celebrations', title: 'Independence Day Celebration', file: '/gallery/Videos/Independance_day_activity_.mp4', type: 'video', subcategory: 'Independence Day' },
  { id: 'g-46', group: 'Celebrations', title: 'Guru Purnima Celebration', file: '/gallery/Videos/Guru_Purnima_celebration.mp4', type: 'video', subcategory: 'Guru Purnima' },
  { id: 'g-47', group: 'Celebrations', title: 'Guru Purnima Celebration', file: '/gallery/Videos/Guru_Purnima_Celebration_2.mp4', type: 'video', subcategory: 'Guru Purnima' },
  { id: 'g-48', group: 'Celebrations', title: "Doctor's Day Celebration", file: "/gallery/Videos/Doctor's_day_celebration.mp4", type: 'video', subcategory: "Doctor's Day" },
  { id: 'g-49', group: 'Celebrations', title: 'Yoga Day Celebration', file: '/gallery/Videos/Yoga_Day_Celebration.mp4', type: 'video', subcategory: 'Yoga Day' },
  { id: 'g-50', group: 'Celebrations', title: 'Green Day Celebration', file: '/gallery/Videos/green_day_celebration.mp4', type: 'video', subcategory: 'Green Day' },
  { id: 'g-51', group: 'Celebrations', title: 'Green Day Celebration', file: '/gallery/Videos/Green_Day_Celebration_2.mp4', type: 'video', subcategory: 'Green Day' },

  // ── Activities – Videos ──
  { id: 'g-52', group: 'Activities', title: 'Identifying Alphabets', file: '/gallery/Videos/Identify_the_Alphabet_2.mp4', type: 'video', subcategory: 'Alphabet Identification' },
  { id: 'g-53', group: 'Activities', title: 'Identifying Alphabets', file: '/gallery/Videos/Identify_the_alphabets_activity_.mp4', type: 'video', subcategory: 'Alphabet Identification' },
  { id: 'g-54', group: 'Activities', title: 'Identifying Alphabets', file: '/gallery/Videos/identify_the_alphabets_activity_2.mp4', type: 'video', subcategory: 'Alphabet Identification' },
  { id: 'g-55', group: 'Activities', title: 'Learning Alphabets', file: '/gallery/Videos/Learning_about_alphabets_activity_.mp4', type: 'video', subcategory: 'Alphabet Identification' },
  { id: 'g-56', group: 'Activities', title: 'Match the Alphabets', file: '/gallery/Videos/Match_the_alphabets_activity_.mp4', type: 'video', subcategory: 'Alphabet Identification' },
  { id: 'g-57', group: 'Activities', title: 'Identifying Parts of Human Body', file: '/gallery/Videos/Identifying_the_parts_of_a_human_body_activity_.mp4', type: 'video', subcategory: 'Human Body' },
  { id: 'g-58', group: 'Activities', title: 'Learning About Shapes', file: '/gallery/Videos/Learning_about_shapes_activity_.mp4', type: 'video', subcategory: 'Shapes Day' },
  { id: 'g-59', group: 'Activities', title: 'Circle Day Activity', file: '/gallery/Videos/circle_day_activity.mp4', type: 'video', subcategory: 'Shapes Day' },
  { id: 'g-60', group: 'Activities', title: 'Pre-Math Concepts', file: '/gallery/Videos/Pre_Math_concept_activity.mp4', type: 'video', subcategory: 'Pre-Math Concepts' },
  { id: 'g-61', group: 'Activities', title: 'Pre-Math Concepts', file: '/gallery/Videos/Pre_Math_Concept_Activity_2.mp4', type: 'video', subcategory: 'Pre-Math Concepts' },
  { id: 'g-62', group: 'Activities', title: 'Pre-Math Concepts', file: '/gallery/Videos/Pre_Math_Concept_Activity_.mp4', type: 'video', subcategory: 'Pre-Math Concepts' },
  { id: 'g-63', group: 'Activities', title: 'Standing Line Activity', file: '/gallery/Videos/standing_line_Activity_2.mp4', type: 'video', subcategory: 'Standing Line' },
  { id: 'g-64', group: 'Activities', title: 'Standing Line Activity', file: '/gallery/Videos/Learning_about_standing_line_activity.mp4', type: 'video', subcategory: 'Standing Line' },
  { id: 'g-65', group: 'Activities', title: 'Identifying Colours', file: '/gallery/Videos/identify_the_colour_activity_.mp4', type: 'video', subcategory: 'Identifying Colours' },
  { id: 'g-66', group: 'Activities', title: 'Identifying Colours', file: '/gallery/Videos/Understanding_of_colours_activity_.mp4', type: 'video', subcategory: 'Identifying Colours' },
  { id: 'g-67', group: 'Activities', title: 'Rhyme Reciting', file: '/gallery/Videos/Rhymes_Reciting_.mp4', type: 'video', subcategory: 'Rhyme Reciting' },
  { id: 'g-68', group: 'Activities', title: 'Fun Games', file: '/gallery/Videos/Fun_Games_Activity.mp4', type: 'video', subcategory: 'Fun Games' },
  { id: 'g-69', group: 'Activities', title: 'Fun Games', file: '/gallery/Videos/Fun_Games_Activity_2.mp4', type: 'video', subcategory: 'Fun Games' },
  { id: 'g-70', group: 'Activities', title: 'Fun Games', file: '/gallery/Videos/Fun_Games_Activity_3.mp4', type: 'video', subcategory: 'Fun Games' },
  { id: 'g-71', group: 'Activities', title: 'Learning About Sizes', file: '/gallery/Videos/Learning_about_size_activity.mp4', type: 'video', subcategory: 'Big and Small' },
];
