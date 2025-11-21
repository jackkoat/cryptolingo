// Continuation of lessons - Understanding Cryptocurrency and beyond

export const UNDERSTANDING_CRYPTO_QUESTIONS = [
  {
    id: 'uc-1',
    type: 'multiple-choice' as const,
    question: 'What is cryptocurrency?',
    options: [
      'Physical coins made of precious metals',
      'Digital or virtual currency secured by cryptography',
      'A type of stock market investment',
      'Government-issued paper money',
    ],
    correctAnswer: 1,
    explanation:
      'Excellent! Cryptocurrency is a digital or virtual currency that uses cryptography for security and operates independently of central banks.',
  },
  {
    id: 'uc-2',
    type: 'true-false' as const,
    question: 'Bitcoin was the first cryptocurrency ever created.',
    correctAnswer: true,
    explanation:
      'You got it! Bitcoin, launched in 2009, was the first decentralized cryptocurrency and remains the most well-known.',
  },
  {
    id: 'uc-3',
    type: 'fill-blank' as const,
    question: 'Bitcoin was created in 2009 by an anonymous person or group known as _____.',
    correctAnswer: 'Satoshi Nakamoto',
    explanation:
      'Perfect! Satoshi Nakamoto is the pseudonym used by the creator(s) of Bitcoin. Their true identity remains unknown.',
  },
  {
    id: 'uc-4',
    type: 'multiple-choice' as const,
    question: 'Which statement about cryptocurrency is TRUE?',
    options: [
      'All cryptocurrencies are the same',
      'Cryptocurrency transactions can be reversed easily',
      'Cryptocurrencies operate 24/7 without central authority',
      'Only one cryptocurrency exists',
    ],
    correctAnswer: 2,
    explanation:
      'Awesome! Cryptocurrencies operate continuously without a central authority, unlike traditional banking systems with limited hours.',
  },
  {
    id: 'uc-5',
    type: 'true-false' as const,
    question: 'Cryptocurrency transactions are recorded on a blockchain.',
    correctAnswer: true,
    explanation:
      'Spot on! All cryptocurrency transactions are permanently recorded on their respective blockchain networks, ensuring transparency.',
  },
  {
    id: 'uc-6',
    type: 'multiple-choice' as const,
    question: 'What is "mining" in cryptocurrency?',
    options: [
      'Digging for physical crypto coins',
      'The process of validating transactions and adding them to the blockchain',
      'Buying cryptocurrency from exchanges',
      'Storing crypto in a wallet',
    ],
    correctAnswer: 1,
    explanation:
      'Great job! Mining is the computational process of validating transactions and securing the network, rewarding miners with new coins.',
  },
  {
    id: 'uc-7',
    type: 'fill-blank' as const,
    question: 'The total supply of Bitcoin is limited to _____ million coins.',
    correctAnswer: '21',
    explanation:
      'Brilliant! Bitcoin has a hard cap of 21 million coins, making it a deflationary asset unlike traditional fiat currencies.',
  },
  {
    id: 'uc-8',
    type: 'true-false' as const,
    question: 'Cryptocurrency is legal in all countries around the world.',
    correctAnswer: false,
    explanation:
      'Good catch! Cryptocurrency regulations vary widely by country. Some embrace it, others restrict or ban it entirely.',
  },
  {
    id: 'uc-9',
    type: 'matching' as const,
    question: 'Match cryptocurrency use cases:',
    matchingPairs: [
      { term: 'Store of Value', definition: 'Holding wealth like digital gold' },
      { term: 'Medium of Exchange', definition: 'Buying goods and services' },
      { term: 'Unit of Account', definition: 'Measuring value of assets' },
      { term: 'Remittance', definition: 'Cross-border money transfers' },
    ],
    correctAnswer: '',
    explanation: 'Nice work! Cryptocurrencies serve multiple financial functions in the digital economy.',
  },
  {
    id: 'uc-10',
    type: 'multiple-choice' as const,
    question: 'What makes cryptocurrency different from traditional money?',
    options: [
      'It can only be used online',
      'It is decentralized and not controlled by governments',
      'It is always more valuable',
      'It cannot be exchanged for goods',
    ],
    correctAnswer: 1,
    explanation:
      'Exactly right! The key difference is decentralization - no single entity controls cryptocurrency networks.',
  },
  {
    id: 'uc-11',
    type: 'true-false' as const,
    question: 'All cryptocurrencies use the same blockchain.',
    correctAnswer: false,
    explanation:
      'Correct! Each cryptocurrency typically has its own blockchain or operates on established platforms like Ethereum.',
  },
  {
    id: 'uc-12',
    type: 'fill-blank' as const,
    question: 'Ethereum introduced smart _____, which are self-executing programs on the blockchain.',
    correctAnswer: 'contracts',
    explanation:
      'Perfect! Smart contracts are self-executing agreements coded on the blockchain, enabling complex decentralized applications.',
  },
  {
    id: 'uc-13',
    type: 'multiple-choice' as const,
    question: 'What is an "altcoin"?',
    options: [
      'An alternative to the internet',
      'Any cryptocurrency other than Bitcoin',
      'A fake cryptocurrency',
      'A type of mining hardware',
    ],
    correctAnswer: 1,
    explanation:
      'You nailed it! "Altcoin" refers to any cryptocurrency alternative to Bitcoin, including Ethereum, Cardano, Solana, and thousands of others.',
  },
];
