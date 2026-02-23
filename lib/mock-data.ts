import { Course } from './types';

export const courses: Course[] = [
  {
    id: 'morning-routines',
    title: 'Morning Routines',
    description: 'Learn to talk about your daily morning activities in English. Perfect for beginners who want to describe their everyday habits.',
    coverEmoji: '🌅',
    level: 'Beginner',
    chapters: [
      {
        id: 'vocabulary',
        title: 'Vocabulary',
        icon: '📖',
        blocks: [
          { type: 'heading', text: 'Morning Routine Vocabulary' },
          {
            type: 'explanation',
            html: 'In this chapter, you\'ll learn common words and phrases used to describe <strong>morning activities</strong>. These are everyday expressions that native speakers use to talk about their routines. Pay attention to the <em>pronunciation guide</em> — many of these words have sounds that are tricky for Japanese speakers.',
          },
          {
            type: 'vocabulary_table',
            words: [
              { word: 'wake up', pronunciation: '/weɪk ʌp/', meaning: '起きる', example: 'I wake up at 7 AM every day.' },
              { word: 'get dressed', pronunciation: '/ɡet drest/', meaning: '着替える', example: 'She gets dressed after taking a shower.' },
              { word: 'brush my teeth', pronunciation: '/brʌʃ maɪ tiːθ/', meaning: '歯を磨く', example: 'I brush my teeth twice a day.' },
              { word: 'eat breakfast', pronunciation: '/iːt ˈbrekfəst/', meaning: '朝食を食べる', example: 'We eat breakfast together as a family.' },
              { word: 'commute', pronunciation: '/kəˈmjuːt/', meaning: '通勤する', example: 'I commute to work by train.' },
              { word: 'alarm clock', pronunciation: '/əˈlɑːrm klɒk/', meaning: '目覚まし時計', example: 'My alarm clock rings at 6:30.' },
            ],
          },
          {
            type: 'tip',
            text: 'Try saying each word out loud 3 times. Focus on the vowel sounds — Japanese doesn\'t have the same "a" sound as in "wake" (/eɪ/). Practice stretching the sound: w-eɪ-k.',
          },
          {
            type: 'quiz_mcq',
            question: 'Which phrase means "着替える" in English?',
            options: ['wake up', 'get dressed', 'eat breakfast', 'brush my teeth'],
            correctIndex: 1,
            explanation: '"Get dressed" means to put on your clothes (着替える). "Wake up" means 起きる, "eat breakfast" means 朝食を食べる, and "brush my teeth" means 歯を磨く.',
          },
        ],
      },
      {
        id: 'grammar',
        title: 'Grammar',
        icon: '📝',
        blocks: [
          { type: 'heading', text: 'Simple Present Tense' },
          {
            type: 'explanation',
            html: 'We use the <strong>simple present tense</strong> to talk about habits and routines — things we do regularly. This is the most important tense for describing your morning routine. In Japanese, there\'s no distinction between <em>"I eat"</em> and <em>"I am eating"</em> — but in English, these are different!',
          },
          {
            type: 'grammar_table',
            rules: [
              { tense: 'Simple Present (+)', structure: 'Subject + verb (base form)', useCase: 'Habits and routines', example: 'I wake up at 7.' },
              { tense: 'Simple Present (+ / 3rd person)', structure: 'He/She/It + verb + s', useCase: '3rd person habits', example: 'She wakes up at 6.' },
              { tense: 'Simple Present (−)', structure: 'Subject + don\'t/doesn\'t + verb', useCase: 'Negative habits', example: 'I don\'t eat breakfast.' },
              { tense: 'Simple Present (?)', structure: 'Do/Does + subject + verb?', useCase: 'Questions about habits', example: 'Do you take a shower in the morning?' },
            ],
          },
          {
            type: 'cultural_note',
            text: 'In Japan, it\'s common to say you "take a bath" (お風呂に入る) in the evening. In many Western countries, people "take a shower" in the morning instead. When talking to English speakers, don\'t be surprised if they mention morning showers!',
          },
          {
            type: 'quiz_fill_blank',
            sentence: 'She ___ up at 6:30 every morning.',
            blank: '___',
            answer: 'wakes',
          },
          {
            type: 'quiz_mcq',
            question: 'Which sentence is correct?',
            options: [
              'He don\'t eat breakfast.',
              'He doesn\'t eats breakfast.',
              'He doesn\'t eat breakfast.',
              'He not eat breakfast.',
            ],
            correctIndex: 2,
            explanation: 'With "doesn\'t," the main verb stays in base form (eat, not eats). "Doesn\'t" already carries the third-person marking.',
          },
        ],
      },
      {
        id: 'dialogue',
        title: 'Dialogue',
        icon: '💬',
        blocks: [
          { type: 'heading', text: 'Talking About Mornings' },
          {
            type: 'explanation',
            html: 'Read this conversation between <strong>Saori</strong> (a Japanese student) and <strong>Catherine</strong> (her Canadian tutor). Notice how they use the simple present tense to describe their morning routines.',
          },
          {
            type: 'dialogue',
            lines: [
              { speaker: 'Catherine', text: 'Good morning, Saori! Tell me about your morning routine.' },
              { speaker: 'Saori', text: 'Good morning! Well, I wake up at 6:30. My alarm clock is very loud!' },
              { speaker: 'Catherine', text: 'Ha! Mine too. What do you do after you wake up?' },
              { speaker: 'Saori', text: 'I brush my teeth and wash my face. Then I eat breakfast.' },
              { speaker: 'Catherine', text: 'What do you usually eat for breakfast?' },
              { speaker: 'Saori', text: 'I eat rice, miso soup, and tamagoyaki. Sometimes I drink green tea.' },
              { speaker: 'Catherine', text: 'That sounds delicious! I just have toast and coffee. Do you take the train to work?' },
              { speaker: 'Saori', text: 'Yes, I commute by train. It takes about 45 minutes.' },
              { speaker: 'Catherine', text: 'That\'s a long commute! Do you listen to anything on the train?' },
              { speaker: 'Saori', text: 'I listen to English podcasts. It\'s good practice!' },
              { speaker: 'Catherine', text: 'That\'s a great idea! Keep it up.' },
            ],
          },
          {
            type: 'quiz_mcq',
            question: 'What does Saori eat for breakfast?',
            options: [
              'Toast and coffee',
              'Rice, miso soup, and tamagoyaki',
              'Cereal and milk',
              'Nothing — she skips breakfast',
            ],
            correctIndex: 1,
            explanation: 'Saori says "I eat rice, miso soup, and tamagoyaki." Catherine is the one who eats toast and coffee.',
          },
          {
            type: 'quiz_mcq',
            question: 'How does Saori practice English on the train?',
            options: [
              'She reads a textbook',
              'She talks to other passengers',
              'She listens to English podcasts',
              'She watches English TV shows',
            ],
            correctIndex: 2,
            explanation: 'Saori says "I listen to English podcasts. It\'s good practice!"',
          },
        ],
      },
      {
        id: 'practice',
        title: 'Practice',
        icon: '✏️',
        blocks: [
          { type: 'heading', text: 'Practice Exercises' },
          {
            type: 'explanation',
            html: 'Now it\'s your turn! Complete these exercises to practice what you\'ve learned about morning routines.',
          },
          {
            type: 'quiz_fill_blank',
            sentence: 'I ___ my teeth every morning before breakfast.',
            blank: '___',
            answer: 'brush',
          },
          {
            type: 'quiz_fill_blank',
            sentence: 'She ___ to work by train every day.',
            blank: '___',
            answer: 'commutes',
          },
          {
            type: 'quiz_fill_blank',
            sentence: '___ you eat breakfast in the morning?',
            blank: '___',
            answer: 'Do',
          },
          {
            type: 'quiz_mcq',
            question: 'Choose the correct sentence:',
            options: [
              'I am wake up at 7 every day.',
              'I wake up at 7 every day.',
              'I waking up at 7 every day.',
              'I waked up at 7 every day.',
            ],
            correctIndex: 1,
            explanation: 'For habitual actions, we use the simple present tense: "I wake up." No auxiliary verb (am) or -ing ending is needed for habits.',
          },
          {
            type: 'practice_prompt',
            text: 'Describe your own morning routine to your tutor. Try to use at least 5 of the vocabulary words from this lesson. Start with: "I usually wake up at..."',
          },
          {
            type: 'tip',
            text: 'When practicing with your tutor, don\'t worry about making mistakes! The goal is to communicate. Your tutor will help you with pronunciation and grammar naturally during the conversation.',
          },
        ],
      },
    ],
  },
  {
    id: 'ordering-food',
    title: 'Ordering at a Restaurant',
    description: 'Master the essential phrases for ordering food, asking about the menu, and handling common restaurant situations.',
    coverEmoji: '🍽️',
    level: 'Beginner',
    chapters: [
      {
        id: 'vocabulary',
        title: 'Vocabulary',
        icon: '📖',
        blocks: [
          { type: 'heading', text: 'Restaurant Vocabulary' },
          {
            type: 'explanation',
            html: 'Ordering food at a restaurant is one of the most <strong>practical English skills</strong> you can learn. Whether you\'re traveling abroad or eating at an international restaurant in Japan, these words will help you feel confident. Let\'s start with the basics.',
          },
          {
            type: 'vocabulary_table',
            words: [
              { word: 'menu', pronunciation: '/ˈmenjuː/', meaning: 'メニュー', example: 'Could I see the menu, please?' },
              { word: 'order', pronunciation: '/ˈɔːrdər/', meaning: '注文する', example: 'Are you ready to order?' },
              { word: 'appetizer', pronunciation: '/ˈæpɪtaɪzər/', meaning: '前菜', example: 'Would you like an appetizer?' },
              { word: 'main course', pronunciation: '/meɪn kɔːrs/', meaning: 'メインディッシュ', example: 'For my main course, I\'ll have the steak.' },
              { word: 'check / bill', pronunciation: '/tʃek/ /bɪl/', meaning: 'お会計', example: 'Could we have the check, please?' },
              { word: 'tip', pronunciation: '/tɪp/', meaning: 'チップ', example: 'In America, you should leave a 15-20% tip.' },
            ],
          },
          {
            type: 'cultural_note',
            text: 'In Japan, there is no tipping culture (チップ). But in the US, UK, and many other countries, leaving a tip (15-20% of the bill) is expected and considered part of the server\'s income. Not tipping can be seen as very rude!',
          },
          {
            type: 'quiz_mcq',
            question: 'What does "appetizer" mean?',
            options: ['メインディッシュ', '前菜', 'デザート', 'お会計'],
            correctIndex: 1,
            explanation: 'An "appetizer" (前菜) is a small dish served before the main course. It comes from the word "appetite" (食欲).',
          },
        ],
      },
      {
        id: 'grammar',
        title: 'Polite Forms',
        icon: '📝',
        blocks: [
          { type: 'heading', text: 'Polite Requests & Questions' },
          {
            type: 'explanation',
            html: 'In a restaurant, you need to be <strong>polite</strong> when ordering. English uses special phrases like <em>"Could I..."</em>, <em>"I\'d like..."</em>, and <em>"May I..."</em> to sound polite. Think of these as the English equivalent of 丁寧語 (polite language).',
          },
          {
            type: 'grammar_table',
            rules: [
              { tense: 'Polite request', structure: 'Could I + have + noun?', useCase: 'Ordering food/drinks', example: 'Could I have a glass of water?' },
              { tense: 'Polite preference', structure: 'I\'d like + noun', useCase: 'Stating what you want', example: 'I\'d like the chicken salad, please.' },
              { tense: 'Polite question', structure: 'May I + verb?', useCase: 'Asking permission', example: 'May I see the dessert menu?' },
              { tense: 'Making a choice', structure: 'I\'ll have + noun', useCase: 'Deciding from options', example: 'I\'ll have the pasta.' },
            ],
          },
          {
            type: 'tip',
            text: 'Adding "please" at the end of any request instantly makes it more polite. "Water." → "Water, please." → "Could I have some water, please?" Each level adds more politeness.',
          },
          {
            type: 'quiz_fill_blank',
            sentence: '___ I have the menu, please?',
            blank: '___',
            answer: 'Could',
          },
          {
            type: 'quiz_mcq',
            question: 'Which is the most polite way to order?',
            options: [
              'Give me a coffee.',
              'I want coffee.',
              'I\'d like a coffee, please.',
              'Coffee.',
            ],
            correctIndex: 2,
            explanation: '"I\'d like a coffee, please" is the most polite because it uses "I\'d like" (a polite form of "I want") and adds "please."',
          },
        ],
      },
      {
        id: 'dialogue',
        title: 'Dialogue',
        icon: '💬',
        blocks: [
          { type: 'heading', text: 'At the Restaurant' },
          {
            type: 'explanation',
            html: 'Read this conversation between <strong>Kenji</strong> (a Japanese tourist) and a <strong>Server</strong> at a restaurant in New York. Notice how Kenji uses polite phrases to order his meal.',
          },
          {
            type: 'dialogue',
            lines: [
              { speaker: 'Server', text: 'Hi there! Welcome in. Table for one?' },
              { speaker: 'Kenji', text: 'Yes, please. Thank you.' },
              { speaker: 'Server', text: 'Right this way. Here\'s your menu. Can I get you something to drink?' },
              { speaker: 'Kenji', text: 'Could I have a glass of water, please?' },
              { speaker: 'Server', text: 'Of course! Still or sparkling?' },
              { speaker: 'Kenji', text: 'Still water, please.' },
              { speaker: 'Server', text: 'Here you go. Are you ready to order, or do you need a few minutes?' },
              { speaker: 'Kenji', text: 'I\'d like the grilled salmon, please. Does it come with a salad?' },
              { speaker: 'Server', text: 'It comes with steamed vegetables or a side salad. Which would you prefer?' },
              { speaker: 'Kenji', text: 'I\'ll have the side salad, please.' },
              { speaker: 'Server', text: 'Great choice! Anything else?' },
              { speaker: 'Kenji', text: 'No, that\'s all. Thank you.' },
              { speaker: 'Server', text: 'I\'ll have that right out for you!' },
            ],
          },
          {
            type: 'cultural_note',
            text: 'In American restaurants, servers are very friendly and casual — they might say "Hi there!" or "How are you guys doing?" This isn\'t rude; it\'s the normal service style. In Japan, service is more formal (いらっしゃいませ), but in the US, casual friendliness is a sign of good service.',
          },
          {
            type: 'quiz_mcq',
            question: 'What did Kenji order?',
            options: [
              'Grilled chicken with vegetables',
              'Grilled salmon with a side salad',
              'Grilled salmon with steamed vegetables',
              'A side salad only',
            ],
            correctIndex: 1,
            explanation: 'Kenji ordered the grilled salmon and chose the side salad when given the option between steamed vegetables or a side salad.',
          },
          {
            type: 'quiz_mcq',
            question: 'What does "Still or sparkling?" mean?',
            options: [
              'Hot or cold water?',
              'Large or small water?',
              'Plain water or water with bubbles?',
              'Free or paid water?',
            ],
            correctIndex: 2,
            explanation: '"Still water" is regular water (普通の水). "Sparkling water" is carbonated water (炭酸水). This is a very common question at restaurants outside Japan.',
          },
        ],
      },
      {
        id: 'practice',
        title: 'Practice',
        icon: '✏️',
        blocks: [
          { type: 'heading', text: 'Practice Exercises' },
          {
            type: 'explanation',
            html: 'Practice ordering food using polite English. Complete the exercises below, then try the role-play prompt with your tutor!',
          },
          {
            type: 'quiz_fill_blank',
            sentence: 'I\'d ___ the chicken curry, please.',
            blank: '___',
            answer: 'like',
          },
          {
            type: 'quiz_fill_blank',
            sentence: 'Could we have the ___, please? (お会計)',
            blank: '___',
            answer: 'check',
          },
          {
            type: 'quiz_fill_blank',
            sentence: '___ I see the dessert menu?',
            blank: '___',
            answer: 'May',
          },
          {
            type: 'quiz_mcq',
            question: 'A server asks: "Can I get you anything else?" You don\'t want anything. What do you say?',
            options: [
              'No.',
              'I\'m fine. Go away.',
              'No, thank you. That\'s all.',
              'Nothing.',
            ],
            correctIndex: 2,
            explanation: '"No, thank you. That\'s all." is polite and complete. Just saying "No" or "Nothing" is too abrupt in English. Always add "thank you" when declining.',
          },
          {
            type: 'practice_prompt',
            text: 'Role-play with your tutor! One person is the customer and the other is the server. Try ordering a full meal: a drink, an appetizer, and a main course. Use "Could I have...", "I\'d like...", and "I\'ll have..." at least once each.',
          },
        ],
      },
    ],
  },
];

export const predefinedTopics = [
  { id: 'morning-routines', emoji: '🌅', title: 'Morning Routines', description: 'Daily habits and activities' },
  { id: 'ordering-food', emoji: '🍽️', title: 'Ordering at a Restaurant', description: 'Menu, ordering, and paying' },
  { id: 'job-interviews', emoji: '💼', title: 'Job Interviews', description: 'Common questions and answers' },
  { id: 'travel-conversations', emoji: '✈️', title: 'Travel Conversations', description: 'Airport, hotel, directions' },
  { id: 'small-talk', emoji: '💬', title: 'Small Talk', description: 'Weather, hobbies, weekend plans' },
  { id: 'phone-calls', emoji: '📞', title: 'Phone Calls', description: 'Business and casual calls' },
  { id: 'shopping', emoji: '🛍️', title: 'Shopping', description: 'Sizes, prices, returns' },
  { id: 'doctor-visit', emoji: '🏥', title: 'Doctor Visits', description: 'Symptoms and appointments' },
];

export function getCourseById(id: string): Course | undefined {
  return courses.find(c => c.id === id);
}
