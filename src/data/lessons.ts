// Learning Content Data for CryptoLingo

export interface Question {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'matching' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation: string;
  matchingPairs?: { term: string; definition: string }[];
}

export interface Lesson {
  id: string;
  pathId: string;
  title: string;
  description: string;
  xpReward: number;
  estimatedMinutes: number;
  questions: Question[];
}

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  lessons: string[];
  totalXP: number;
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'beginner-fundamentals',
    name: 'Beginner Fundamentals',
    description: 'Master the core concepts of blockchain and cryptocurrency',
    lessons: ['blockchain-basics', 'understanding-crypto', 'keys-security', 'wallet-basics'],
    totalXP: 650,
  },
  {
    id: 'defi-essentials',
    name: 'DeFi Essentials',
    description: 'Learn about decentralized finance and its powerful applications',
    lessons: ['what-is-defi', 'swapping-trading', 'liquidity-pools', 'staking-basics'],
    totalXP: 725,
  },
];

export const LESSONS: Lesson[] = [
  // Path 1: Beginner Fundamentals
  {
    id: 'blockchain-basics',
    pathId: 'beginner-fundamentals',
    title: 'What is Blockchain?',
    description: 'Learn the fundamental concepts of distributed ledger technology',
    xpReward: 150,
    estimatedMinutes: 8,
    questions: [
      {
        id: 'bb-1',
        type: 'multiple-choice',
        question: 'What is a blockchain?',
        options: [
          'A type of cryptocurrency',
          'A distributed digital ledger that records transactions',
          'A physical chain of computer blocks',
          'A programming language',
        ],
        correctAnswer: 1,
        explanation:
          'Perfect! A blockchain is a distributed digital ledger that records transactions across many computers in a way that prevents retroactive alteration.',
      },
      {
        id: 'bb-2',
        type: 'true-false',
        question: 'Blockchain data can be easily deleted or modified by anyone.',
        correctAnswer: false,
        explanation:
          'Nice work! Once data is written to a blockchain, it becomes extremely difficult to modify or delete due to cryptographic linking and distributed consensus.',
      },
      {
        id: 'bb-3',
        type: 'fill-blank',
        question: 'Each block in a blockchain contains a cryptographic _____ of the previous block.',
        correctAnswer: 'hash',
        explanation:
          'Spot on! Each block contains a cryptographic hash of the previous block, creating an immutable chain of records.',
      },
      {
        id: 'bb-4',
        type: 'multiple-choice',
        question: 'What makes blockchain secure?',
        options: [
          'It requires passwords',
          'Decentralization and cryptographic hashing',
          'Only governments can access it',
          'It stores data in the cloud',
        ],
        correctAnswer: 1,
        explanation:
          'Excellent! Blockchain security comes from its decentralized nature and cryptographic hashing, making it extremely difficult to alter past transactions.',
      },
      {
        id: 'bb-5',
        type: 'true-false',
        question: 'Every computer on a blockchain network has the same copy of the ledger.',
        correctAnswer: true,
        explanation:
          'You got it! All nodes in a blockchain network maintain a synchronized copy of the entire ledger, ensuring transparency and redundancy.',
      },
      {
        id: 'bb-6',
        type: 'multiple-choice',
        question: 'Who invented blockchain technology?',
        options: [
          'Bill Gates',
          'Satoshi Nakamoto',
          'Elon Musk',
          'Mark Zuckerberg',
        ],
        correctAnswer: 1,
        explanation:
          'Great job! Satoshi Nakamoto introduced blockchain technology through Bitcoin in 2008. Their true identity remains unknown.',
      },
      {
        id: 'bb-7',
        type: 'fill-blank',
        question: 'In a blockchain, transactions are grouped together into _____.',
        correctAnswer: 'blocks',
        explanation:
          'Exactly right! Transactions are bundled into blocks, which are then added to the chain in chronological order.',
      },
      {
        id: 'bb-8',
        type: 'true-false',
        question: 'Blockchain requires a central authority to validate transactions.',
        correctAnswer: false,
        explanation:
          'Correct! One of blockchain\'s key features is decentralization - no central authority is needed. Network participants validate transactions through consensus.',
      },
      {
        id: 'bb-9',
        type: 'multiple-choice',
        question: 'What happens when someone tries to tamper with a block in the chain?',
        options: [
          'Nothing, it goes unnoticed',
          'The entire network accepts the change',
          'The tampered block\'s hash changes, breaking the chain and alerting the network',
          'Only that person\'s copy is affected',
        ],
        correctAnswer: 2,
        explanation:
          'Awesome! Any tampering changes the block\'s hash, which breaks the chain and is immediately detected by other nodes.',
      },
      {
        id: 'bb-10',
        type: 'matching',
        question: 'Match blockchain terms with their definitions:',
        matchingPairs: [
          { term: 'Block', definition: 'Container of transaction data' },
          { term: 'Chain', definition: 'Linked sequence of blocks' },
          { term: 'Node', definition: 'Computer maintaining blockchain copy' },
          { term: 'Hash', definition: 'Unique cryptographic identifier' },
        ],
        correctAnswer: '',
        explanation:
          'Perfect matching! Understanding these core terms is essential for grasping how blockchain technology functions.',
      },
      {
        id: 'bb-11',
        type: 'true-false',
        question: 'Blockchain technology can only be used for cryptocurrency.',
        correctAnswer: false,
        explanation:
          'Well done! While blockchain powers cryptocurrencies, it has many other applications including supply chain, healthcare, voting systems, and digital identity.',
      },
      {
        id: 'bb-12',
        type: 'multiple-choice',
        question: 'What is a "genesis block"?',
        options: [
          'The most recent block in the chain',
          'The first block in a blockchain',
          'A block that contains errors',
          'A block created by miners',
        ],
        correctAnswer: 1,
        explanation:
          'Brilliant! The genesis block is the very first block in a blockchain, serving as the foundation for all subsequent blocks.',
      },
    ],
  },
  {
    id: 'understanding-crypto',
    pathId: 'beginner-fundamentals',
    title: 'Understanding Cryptocurrency',
    description: 'Discover what cryptocurrency is and how it works',
    xpReward: 150,
    estimatedMinutes: 8,
    questions: [
      {
        id: 'uc-1',
        type: 'multiple-choice',
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
        type: 'true-false',
        question: 'Bitcoin was the first cryptocurrency ever created.',
        correctAnswer: true,
        explanation:
          'You got it! Bitcoin, launched in 2009, was the first decentralized cryptocurrency and remains the most well-known.',
      },
      {
        id: 'uc-3',
        type: 'fill-blank',
        question: 'Bitcoin was created in 2009 by an anonymous person or group known as _____.',
        correctAnswer: 'Satoshi Nakamoto',
        explanation:
          'Perfect! Satoshi Nakamoto is the pseudonym used by the creator(s) of Bitcoin. Their true identity remains unknown.',
      },
      {
        id: 'uc-4',
        type: 'multiple-choice',
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
        type: 'true-false',
        question: 'Cryptocurrency transactions are recorded on a blockchain.',
        correctAnswer: true,
        explanation:
          'Spot on! All cryptocurrency transactions are permanently recorded on their respective blockchain networks, ensuring transparency.',
      },
      {
        id: 'uc-6',
        type: 'multiple-choice',
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
        type: 'fill-blank',
        question: 'The total supply of Bitcoin is limited to _____ million coins.',
        correctAnswer: '21',
        explanation:
          'Brilliant! Bitcoin has a hard cap of 21 million coins, making it a deflationary asset unlike traditional fiat currencies.',
      },
      {
        id: 'uc-8',
        type: 'true-false',
        question: 'Cryptocurrency is legal in all countries around the world.',
        correctAnswer: false,
        explanation:
          'Good catch! Cryptocurrency regulations vary widely by country. Some embrace it, others restrict or ban it entirely.',
      },
      {
        id: 'uc-9',
        type: 'matching',
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
        type: 'multiple-choice',
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
        type: 'true-false',
        question: 'All cryptocurrencies use the same blockchain.',
        correctAnswer: false,
        explanation:
          'Correct! Each cryptocurrency typically has its own blockchain or operates on established platforms like Ethereum.',
      },
      {
        id: 'uc-12',
        type: 'multiple-choice',
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
    ],
  },
  {
    id: 'keys-security',
    pathId: 'beginner-fundamentals',
    title: 'Public vs Private Keys',
    description: 'Understand cryptographic keys and their role in security',
    xpReward: 175,
    estimatedMinutes: 9,
    questions: [
      {
        id: 'ks-1',
        type: 'multiple-choice',
        question: 'What is a private key?',
        options: [
          'A password to your email',
          'A secret code that proves ownership of crypto assets',
          'Your wallet address',
          'A public identifier',
        ],
        correctAnswer: 1,
        explanation:
          'Perfect! A private key is a secret cryptographic code that proves ownership and allows you to access and spend your cryptocurrency.',
      },
      {
        id: 'ks-2',
        type: 'true-false',
        question: 'Your public key can be safely shared with others to receive cryptocurrency.',
        correctAnswer: true,
        explanation:
          'Exactly right! Your public key (or wallet address) works like an email address - safe to share for receiving funds.',
      },
      {
        id: 'ks-3',
        type: 'fill-blank',
        question: 'Your _____ key can be shared publicly to receive cryptocurrency.',
        correctAnswer: 'public',
        explanation:
          'You got it! Your public key is designed to be shared so others can send you cryptocurrency.',
      },
      {
        id: 'ks-4',
        type: 'multiple-choice',
        question: 'If someone gets your private key, they can:',
        options: [
          'Only view your balance',
          'Send you more cryptocurrency',
          'Access and control all your crypto assets',
          'Nothing, it is harmless',
        ],
        correctAnswer: 2,
        explanation:
          'Important! Anyone with your private key has complete control over your cryptocurrency. Never share it with anyone!',
      },
      {
        id: 'ks-5',
        type: 'true-false',
        question: 'A seed phrase and private key serve the same purpose - to access your wallet.',
        correctAnswer: true,
        explanation:
          'Nice work! Both provide access to your wallet. The seed phrase is typically 12-24 words that can regenerate your private key.',
      },
      {
        id: 'ks-6',
        type: 'multiple-choice',
        question: 'How many words are typically in a seed phrase?',
        options: [
          '6 words',
          '12 or 24 words',
          '100 words',
          '1 word',
        ],
        correctAnswer: 1,
        explanation:
          'Brilliant! Seed phrases are typically 12 or 24 random words that can be used to recover your wallet.',
      },
      {
        id: 'ks-7',
        type: 'matching',
        question: 'Match key security concepts:',
        matchingPairs: [
          { term: 'Private Key', definition: 'Must be kept secret always' },
          { term: 'Public Key', definition: 'Safe to share for receiving funds' },
          { term: 'Seed Phrase', definition: 'Backup recovery words' },
          { term: 'Encryption', definition: 'Secures data using cryptography' },
        ],
        correctAnswer: '',
        explanation:
          'Awesome! Understanding the difference between public and private information is crucial for crypto security.',
      },
      {
        id: 'ks-8',
        type: 'true-false',
        question: 'If you lose your seed phrase and private key, there is no way to recover your funds.',
        correctAnswer: true,
        explanation:
          'Important lesson! Crypto is truly self-custodial. No company or authority can help you recover lost keys.',
      },
      {
        id: 'ks-9',
        type: 'multiple-choice',
        question: 'What happens to your crypto if you share your seed phrase with a scammer?',
        options: [
          'Nothing, seed phrases are safe to share',
          'They can view but not access your funds',
          'They can steal all your cryptocurrency',
          'Your wallet locks automatically',
        ],
        correctAnswer: 2,
        explanation:
          'Critical! Scammers with your seed phrase can drain your entire wallet. Never share it with anyone, ever!',
      },
      {
        id: 'ks-10',
        type: 'fill-blank',
        question: 'A cryptographic _____ links your public and private keys together.',
        correctAnswer: 'algorithm',
        explanation:
          'Great job! Cryptographic algorithms mathematically link your key pairs while keeping the private key secure.',
      },
      {
        id: 'ks-11',
        type: 'multiple-choice',
        question: 'Best practice for storing your seed phrase:',
        options: [
          'Save it in a cloud service',
          'Email it to yourself',
          'Write it on paper and store it securely offline',
          'Share it with your friends for backup',
        ],
        correctAnswer: 2,
        explanation:
          'Perfect! The safest way to store your seed phrase is to write it on paper and keep it in a secure, offline location.',
      },
      {
        id: 'ks-12',
        type: 'true-false',
        question: 'Digital storage like cloud services is the safest place for your seed phrase.',
        correctAnswer: false,
        explanation:
          'Correct! Cloud services can be hacked. Physical, offline storage is much safer for seed phrases.',
      },
    ],
  },
  {
    id: 'wallet-basics',
    pathId: 'beginner-fundamentals',
    title: 'Wallet Basics & Security',
    description: 'Learn about crypto wallets and how to keep them secure',
    xpReward: 175,
    estimatedMinutes: 9,
    questions: [
      {
        id: 'wb-1',
        type: 'multiple-choice',
        question: 'What is a cryptocurrency wallet?',
        options: [
          'A physical wallet for coins',
          'Software or hardware that stores your private keys',
          'A bank account for crypto',
          'A website that sells cryptocurrency',
        ],
        correctAnswer: 1,
        explanation:
          'Perfect! A crypto wallet is software or hardware that stores your private keys and allows you to interact with blockchain networks.',
      },
      {
        id: 'wb-2',
        type: 'true-false',
        question: 'Your cryptocurrency is actually stored inside your wallet.',
        correctAnswer: false,
        explanation:
          'Great insight! Your crypto stays on the blockchain. Your wallet only stores the keys that give you access to your crypto.',
      },
      {
        id: 'wb-3',
        type: 'fill-blank',
        question: 'A _____ wallet is connected to the internet, while a cold wallet is offline.',
        correctAnswer: 'hot',
        explanation:
          'Spot on! Hot wallets are connected to the internet (convenient but less secure), while cold wallets are offline (more secure but less convenient).',
      },
      {
        id: 'wb-4',
        type: 'multiple-choice',
        question: 'Which wallet type offers the highest security?',
        options: ['Exchange wallet', 'Mobile wallet', 'Hardware wallet (cold storage)', 'Web wallet'],
        correctAnswer: 2,
        explanation:
          'Excellent choice! Hardware wallets offer the highest security because your private keys never leave the device and are stored offline.',
      },
      {
        id: 'wb-5',
        type: 'true-false',
        question: 'Popular hardware wallets include Ledger and Trezor.',
        correctAnswer: true,
        explanation:
          'You got it! Ledger and Trezor are the two most popular and trusted hardware wallet brands in the crypto space.',
      },
      {
        id: 'wb-6',
        type: 'multiple-choice',
        question: 'What is the main advantage of using a software wallet?',
        options: [
          'Maximum security',
          'Convenience and easy access for daily transactions',
          'No need for internet',
          'Cannot be hacked',
        ],
        correctAnswer: 1,
        explanation:
          'Nice work! Software wallets are convenient for daily use and quick transactions, though they sacrifice some security for this convenience.',
      },
      {
        id: 'wb-7',
        type: 'matching',
        question: 'Match wallet types with their characteristics:',
        matchingPairs: [
          { term: 'Hardware Wallet', definition: 'Physical device, highly secure' },
          { term: 'Software Wallet', definition: 'App on phone or computer' },
          { term: 'Paper Wallet', definition: 'Printed private keys' },
          { term: 'Exchange Wallet', definition: 'Hosted by trading platform' },
        ],
        correctAnswer: '',
        explanation: 'Perfect matching! Different wallet types offer varying levels of security and convenience.',
      },
      {
        id: 'wb-8',
        type: 'true-false',
        question: 'Keeping crypto on an exchange is safer than using your own wallet.',
        correctAnswer: false,
        explanation:
          'Good catch! "Not your keys, not your crypto." Exchange wallets are custodial - the exchange controls your funds, not you.',
      },
      {
        id: 'wb-9',
        type: 'multiple-choice',
        question: 'What should you NEVER do with your wallet?',
        options: [
          'Update the software',
          'Share your private key or seed phrase',
          'Check your balance',
          'Make a backup',
        ],
        correctAnswer: 1,
        explanation:
          'Critical rule! Never share your private key or seed phrase with anyone. This gives complete access to your funds!',
      },
      {
        id: 'wb-10',
        type: 'fill-blank',
        question: 'A _____ wallet allows multiple people to approve transactions.',
        correctAnswer: 'multisig',
        explanation:
          'Brilliant! Multisig (multi-signature) wallets require multiple private keys to authorize a transaction, adding extra security for teams or high-value accounts.',
      },
      {
        id: 'wb-11',
        type: 'true-false',
        question: 'Mobile wallets like Phantom and MetaMask are examples of hot wallets.',
        correctAnswer: true,
        explanation:
          'Exactly right! Mobile and browser extension wallets are hot wallets since they connect to the internet for easy access.',
      },
      {
        id: 'wb-12',
        type: 'multiple-choice',
        question: 'What should you do before using a new wallet?',
        options: [
          'Share your seed phrase with customer support',
          'Backup your seed phrase and test with a small amount',
          'Never write down the seed phrase',
          'Use all your funds immediately',
        ],
        correctAnswer: 1,
        explanation:
          'Smart approach! Always backup your seed phrase securely and test the wallet with a small amount first to ensure everything works correctly.',
      },
    ],
  },

  // Path 2: DeFi Essentials
  {
    id: 'what-is-defi',
    pathId: 'defi-essentials',
    title: 'What is DeFi?',
    description: 'Explore decentralized finance and its advantages',
    xpReward: 150,
    estimatedMinutes: 8,
    questions: [
      {
        id: 'wd-1',
        type: 'multiple-choice',
        question: 'What does DeFi stand for?',
        options: [
          'Defined Finance',
          'Decentralized Finance',
          'Digital Finance',
          'Distributed Finance',
        ],
        correctAnswer: 1,
        explanation:
          'Perfect! DeFi stands for Decentralized Finance, a financial system built on blockchain without traditional intermediaries.',
      },
      {
        id: 'wd-2',
        type: 'true-false',
        question: 'DeFi operates without banks or traditional financial institutions.',
        correctAnswer: true,
        explanation:
          'Exactly right! DeFi removes intermediaries like banks and brokers, enabling direct peer-to-peer financial transactions.',
      },
      {
        id: 'wd-3',
        type: 'fill-blank',
        question: 'DeFi eliminates the need for traditional financial _____ like banks.',
        correctAnswer: 'intermediaries',
        explanation:
          'Spot on! By removing intermediaries, DeFi reduces costs and increases access to financial services.',
      },
      {
        id: 'wd-4',
        type: 'multiple-choice',
        question: 'What is a key advantage of DeFi?',
        options: [
          'Requires government approval',
          'Only available during business hours',
          'Accessible 24/7 to anyone with internet',
          'Controlled by central banks',
        ],
        correctAnswer: 2,
        explanation:
          'Awesome! DeFi is accessible 24/7 to anyone with an internet connection, without geographic or institutional restrictions.',
      },
      {
        id: 'wd-5',
        type: 'true-false',
        question: 'Smart contracts are the foundation of DeFi applications.',
        correctAnswer: true,
        explanation:
          'You got it! Smart contracts are self-executing code on blockchains that automate DeFi services without intermediaries.',
      },
      {
        id: 'wd-6',
        type: 'multiple-choice',
        question: 'Which blockchain is most commonly associated with DeFi?',
        options: [
          'Bitcoin',
          'Ethereum',
          'Litecoin',
          'Dogecoin',
        ],
        correctAnswer: 1,
        explanation:
          'Great knowledge! Ethereum is the leading DeFi platform due to its smart contract capabilities, though other chains are growing.',
      },
      {
        id: 'wd-7',
        type: 'fill-blank',
        question: 'In DeFi, you maintain _____ of your funds at all times.',
        correctAnswer: 'control',
        explanation:
          'Brilliant! Unlike traditional finance, DeFi lets you maintain full custody and control of your assets without trusting a third party.',
      },
      {
        id: 'wd-8',
        type: 'true-false',
        question: 'DeFi protocols require you to provide identification documents to use them.',
        correctAnswer: false,
        explanation:
          'Correct! Most DeFi protocols are permissionless - you can use them with just a crypto wallet, no KYC required.',
      },
      {
        id: 'wd-9',
        type: 'matching',
        question: 'Match DeFi concepts:',
        matchingPairs: [
          { term: 'Smart Contract', definition: 'Self-executing code on blockchain' },
          { term: 'DEX', definition: 'Decentralized exchange' },
          { term: 'Yield Farming', definition: 'Earning rewards on crypto deposits' },
          { term: 'Liquidity', definition: 'Available trading assets' },
        ],
        correctAnswer: '',
        explanation: 'Excellent matching! These fundamental DeFi concepts form the foundation of decentralized finance.',
      },
      {
        id: 'wd-10',
        type: 'multiple-choice',
        question: 'What is a DeFi protocol?',
        options: [
          'A type of cryptocurrency',
          'A set of smart contracts that provide financial services',
          'A government regulation',
          'A physical device',
        ],
        correctAnswer: 1,
        explanation:
          'Perfect understanding! DeFi protocols are collections of smart contracts that automate financial services like lending, borrowing, and trading.',
      },
      {
        id: 'wd-11',
        type: 'true-false',
        question: 'DeFi is only used for trading cryptocurrencies.',
        correctAnswer: false,
        explanation:
          'Good catch! DeFi encompasses lending, borrowing, insurance, derivatives, savings, and much more beyond just trading.',
      },
      {
        id: 'wd-12',
        type: 'multiple-choice',
        question: 'What is the total value locked (TVL) in DeFi?',
        options: [
          'The number of users in DeFi',
          'The total value of crypto assets deposited in DeFi protocols',
          'The number of smart contracts',
          'The amount of Bitcoin mined',
        ],
        correctAnswer: 1,
        explanation:
          'Nice work! TVL measures the total value of all cryptocurrency deposited across DeFi protocols, indicating the ecosystem\'s size and health.',
      },
    ],
  },
  {
    id: 'swapping-trading',
    pathId: 'defi-essentials',
    title: 'Swapping & Trading',
    description: 'Learn how to trade crypto on decentralized exchanges',
    xpReward: 175,
    estimatedMinutes: 9,
    questions: [
      {
        id: 'st-1',
        type: 'multiple-choice',
        question: 'What is a DEX (Decentralized Exchange)?',
        options: [
          'A physical crypto trading location',
          'A peer-to-peer marketplace for trading crypto without a central authority',
          'A government-regulated exchange',
          'A type of cryptocurrency',
        ],
        correctAnswer: 1,
        explanation:
          'Perfect! A DEX is a peer-to-peer marketplace where users can trade cryptocurrencies directly without a centralized intermediary.',
      },
      {
        id: 'st-2',
        type: 'true-false',
        question: 'Popular DEXs include Uniswap, SushiSwap, and PancakeSwap.',
        correctAnswer: true,
        explanation:
          'You got it! These are some of the most popular decentralized exchanges, each on different blockchains.',
      },
      {
        id: 'st-3',
        type: 'fill-blank',
        question: '_____ is the difference between expected and actual price when executing a trade.',
        correctAnswer: 'Slippage',
        explanation:
          'Spot on! Slippage occurs when the actual trade price differs from the expected price due to market movement or low liquidity.',
      },
      {
        id: 'st-4',
        type: 'multiple-choice',
        question: 'On a DEX, who holds custody of your funds?',
        options: [
          'The exchange operator',
          'The government',
          'You maintain custody via your wallet',
          'A third-party custodian',
        ],
        correctAnswer: 2,
        explanation:
          'Excellent! On DEXs, you maintain custody of your funds through your wallet. The exchange never holds your assets.',
      },
      {
        id: 'st-5',
        type: 'true-false',
        question: 'DEXs require you to create an account with email and password.',
        correctAnswer: false,
        explanation:
          'Correct! DEXs are permissionless - you just connect your wallet. No signup, no email, no personal info needed.',
      },
      {
        id: 'st-6',
        type: 'multiple-choice',
        question: 'What is slippage tolerance?',
        options: [
          'The maximum price change you are willing to accept for a trade',
          'Your tolerance for waiting',
          'A fee charged by DEXs',
          'The time it takes to complete a trade',
        ],
        correctAnswer: 0,
        explanation:
          'Great understanding! Slippage tolerance sets the maximum price change you will accept - if exceeded, the trade will fail.',
      },
      {
        id: 'st-7',
        type: 'fill-blank',
        question: 'A _____ order executes immediately at the current market price.',
        correctAnswer: 'market',
        explanation:
          'Perfect! Market orders execute instantly at whatever the current price is, which is convenient but may have more slippage.',
      },
      {
        id: 'st-8',
        type: 'true-false',
        question: 'Gas fees on DEXs vary based on network congestion.',
        correctAnswer: true,
        explanation:
          'Absolutely right! Gas fees fluctuate with blockchain network activity - higher congestion means higher fees.',
      },
      {
        id: 'st-9',
        type: 'matching',
        question: 'Match trading concepts:',
        matchingPairs: [
          { term: 'Market Order', definition: 'Execute trade at current price' },
          { term: 'Limit Order', definition: 'Set specific price for trade' },
          { term: 'Liquidity Pool', definition: 'Funds available for trading' },
          { term: 'Gas Fee', definition: 'Transaction cost on blockchain' },
        ],
        correctAnswer: '',
        explanation: 'Brilliant matching! Understanding these trading concepts helps you make better trading decisions.',
      },
      {
        id: 'st-10',
        type: 'multiple-choice',
        question: 'What affects slippage on a trade?',
        options: [
          'The color of your wallet',
          'Trading volume and liquidity pool size',
          'Your account age',
          'Time of day only',
        ],
        correctAnswer: 1,
        explanation:
          'Excellent! Slippage is primarily affected by trading volume and liquidity pool size. Larger pools typically have less slippage.',
      },
      {
        id: 'st-11',
        type: 'true-false',
        question: 'You can trade any cryptocurrency pair on any DEX.',
        correctAnswer: false,
        explanation:
          'Good catch! DEXs only support pairs with available liquidity pools. Not all pairs are available on all DEXs.',
      },
      {
        id: 'st-12',
        type: 'multiple-choice',
        question: 'What is an AMM (Automated Market Maker)?',
        options: [
          'A person who trades manually',
          'An algorithm that prices assets based on supply and demand in liquidity pools',
          'A type of cryptocurrency',
          'A trading bot',
        ],
        correctAnswer: 1,
        explanation:
          'Fantastic! AMMs are algorithms that automatically price assets based on liquidity pool ratios, eliminating the need for order books.',
      },
      {
        id: 'st-13',
        type: 'fill-blank',
        question: 'Before executing a swap, you must _____ the DEX to access your tokens.',
        correctAnswer: 'approve',
        explanation:
          'Spot on! Token approval lets the DEX smart contract interact with your tokens. You only need to approve each token once per DEX.',
      },
    ],
  },
  {
    id: 'liquidity-pools',
    pathId: 'defi-essentials',
    title: 'Liquidity Pools',
    description: 'Understand how liquidity pools power DeFi trading',
    xpReward: 200,
    estimatedMinutes: 10,
    questions: [
      {
        id: 'lp-1',
        type: 'multiple-choice',
        question: 'What is a liquidity pool?',
        options: [
          'A swimming pool at a crypto conference',
          'A collection of funds locked in a smart contract to facilitate trading',
          'A type of cryptocurrency',
          'A physical vault for storing crypto',
        ],
        correctAnswer: 1,
        explanation:
          'Perfect! A liquidity pool is a collection of funds locked in a smart contract, used to facilitate trading on decentralized exchanges.',
      },
      {
        id: 'lp-2',
        type: 'true-false',
        question: 'Liquidity pools typically contain pairs of tokens, like ETH/USDC.',
        correctAnswer: true,
        explanation:
          'Exactly right! Most pools contain two tokens in a trading pair, allowing users to swap between them.',
      },
      {
        id: 'lp-3',
        type: 'fill-blank',
        question: 'People who provide funds to liquidity pools are called _____ providers.',
        correctAnswer: 'liquidity',
        explanation:
          'Spot on! Liquidity providers (LPs) deposit their assets into pools to enable trading and earn fees in return.',
      },
      {
        id: 'lp-4',
        type: 'multiple-choice',
        question: 'How do liquidity providers earn rewards?',
        options: [
          'By winning competitions',
          'Through trading fees collected from swaps',
          'By mining new coins',
          'Government subsidies',
        ],
        correctAnswer: 1,
        explanation:
          'Great job! Liquidity providers earn a portion of the trading fees generated by swaps in their pool.',
      },
      {
        id: 'lp-5',
        type: 'true-false',
        question: 'Adding liquidity to a pool is completely risk-free.',
        correctAnswer: false,
        explanation:
          'Good awareness! Liquidity provision involves risks like impermanent loss and smart contract vulnerabilities.',
      },
      {
        id: 'lp-6',
        type: 'fill-blank',
        question: '_____ loss occurs when the price ratio of tokens in a pool changes significantly.',
        correctAnswer: 'Impermanent',
        explanation:
          'Perfect! Impermanent loss is the temporary loss of funds experienced by liquidity providers due to price volatility.',
      },
      {
        id: 'lp-7',
        type: 'multiple-choice',
        question: 'When you add liquidity to a pool, what do you receive?',
        options: [
          'Nothing',
          'LP tokens representing your share of the pool',
          'Free cryptocurrency',
          'A certificate from the government',
        ],
        correctAnswer: 1,
        explanation:
          'Excellent! LP tokens are like receipts that prove your share of the pool and can be redeemed for your tokens plus earned fees.',
      },
      {
        id: 'lp-8',
        type: 'true-false',
        question: 'You must provide equal value of both tokens when adding liquidity to a pool.',
        correctAnswer: true,
        explanation:
          'Correct! Most pools require a 50/50 split by value to maintain balance, though some newer protocols offer different ratios.',
      },
      {
        id: 'lp-9',
        type: 'matching',
        question: 'Match liquidity pool concepts:',
        matchingPairs: [
          { term: 'LP Token', definition: 'Receipt for pool deposit' },
          { term: 'AMM', definition: 'Automated Market Maker algorithm' },
          { term: 'Pool Ratio', definition: 'Balance of token pairs' },
          { term: 'Fee APR', definition: 'Annual percentage return from fees' },
        ],
        correctAnswer: '',
        explanation: 'Brilliant matching! These concepts are essential for understanding liquidity pool mechanics.',
      },
      {
        id: 'lp-10',
        type: 'multiple-choice',
        question: 'What is the typical fee structure for liquidity pools?',
        options: [
          'Fixed 10% fee for all pools',
          'Variable fee (commonly 0.3%) split among liquidity providers',
          'No fees',
          'Fees go to the government',
        ],
        correctAnswer: 1,
        explanation:
          'Great understanding! Most pools charge a small trading fee (often 0.3%) that is distributed to LPs proportionally.',
      },
      {
        id: 'lp-11',
        type: 'true-false',
        question: 'Impermanent loss becomes permanent if you withdraw when prices have diverged.',
        correctAnswer: true,
        explanation:
          'Important insight! The loss is "impermanent" because it can be recovered if prices return to original ratios before withdrawal.',
      },
      {
        id: 'lp-12',
        type: 'fill-blank',
        question: 'The constant product formula x * y = k is used by _____ to price swaps.',
        correctAnswer: 'AMMs',
        explanation:
          'Fantastic! This formula (used by Uniswap and others) ensures the product of token quantities remains constant, automatically adjusting prices.',
      },
      {
        id: 'lp-13',
        type: 'multiple-choice',
        question: 'Why might someone provide liquidity despite impermanent loss risk?',
        options: [
          'They enjoy losing money',
          'Trading fees and rewards can outweigh impermanent loss',
          'It is required by law',
          'There is no other way to make money',
        ],
        correctAnswer: 1,
        explanation:
          'Smart reasoning! Many LPs profit when trading fee income exceeds impermanent loss, especially in high-volume pools.',
      },
    ],
  },
  {
    id: 'staking-basics',
    pathId: 'defi-essentials',
    title: 'Staking Basics',
    description: 'Learn how staking works and earn passive income',
    xpReward: 200,
    estimatedMinutes: 10,
    questions: [
      {
        id: 'sb-1',
        type: 'multiple-choice',
        question: 'What is cryptocurrency staking?',
        options: [
          'Selling your crypto immediately',
          'Locking up crypto to support blockchain operations and earn rewards',
          'Trading crypto frequently',
          'Storing crypto on an exchange',
        ],
        correctAnswer: 1,
        explanation:
          'Perfect! Staking involves locking cryptocurrency to support blockchain network operations (like validation) in exchange for rewards.',
      },
      {
        id: 'sb-2',
        type: 'true-false',
        question: 'Ethereum transitioned from Proof of Work to Proof of Stake in 2022.',
        correctAnswer: true,
        explanation:
          'Exactly right! Ethereum completed "The Merge" in September 2022, switching from energy-intensive mining to staking.',
      },
      {
        id: 'sb-3',
        type: 'fill-blank',
        question: 'Staking is used in _____ of Stake consensus mechanisms.',
        correctAnswer: 'Proof',
        explanation:
          'Spot on! Staking is a core component of Proof of Stake (PoS) consensus mechanisms, which validate transactions and secure the network.',
      },
      {
        id: 'sb-4',
        type: 'multiple-choice',
        question: 'What is a key benefit of staking?',
        options: [
          'Guaranteed profits',
          'Earning passive income through staking rewards',
          'Free cryptocurrency with no risk',
          'Immediate access to funds at all times',
        ],
        correctAnswer: 1,
        explanation:
          'Great understanding! Staking allows you to earn passive income through rewards, though funds are typically locked for a period.',
      },
      {
        id: 'sb-5',
        type: 'true-false',
        question: 'Staking rewards are paid out in the same cryptocurrency you staked.',
        correctAnswer: true,
        explanation:
          'Correct! When you stake ETH, you earn more ETH. When you stake SOL, you earn more SOL, and so on.',
      },
      {
        id: 'sb-6',
        type: 'multiple-choice',
        question: 'What is a validator in staking?',
        options: [
          'Someone who approves transactions',
          'A node that validates transactions and maintains the blockchain',
          'A type of wallet',
          'A cryptocurrency exchange',
        ],
        correctAnswer: 1,
        explanation:
          'Excellent! Validators are nodes that process transactions, create new blocks, and secure the network by staking their crypto.',
      },
      {
        id: 'sb-7',
        type: 'fill-blank',
        question: 'Many people participate in staking by _____ their tokens to a validator rather than running their own node.',
        correctAnswer: 'delegating',
        explanation:
          'Perfect! Delegation lets you stake without running validator hardware - you assign your stake to a trusted validator who does the work.',
      },
      {
        id: 'sb-8',
        type: 'true-false',
        question: 'Staking typically requires less energy than mining.',
        correctAnswer: true,
        explanation:
          'Absolutely! Proof of Stake uses over 99% less energy than Proof of Work mining, making it much more environmentally friendly.',
      },
      {
        id: 'sb-9',
        type: 'matching',
        question: 'Match staking concepts:',
        matchingPairs: [
          { term: 'Validator', definition: 'Node that validates transactions' },
          { term: 'Delegation', definition: 'Assigning stake to validator' },
          { term: 'Lock Period', definition: 'Time funds are locked' },
          { term: 'APY', definition: 'Annual percentage yield earned' },
        ],
        correctAnswer: '',
        explanation: 'Brilliant! Understanding staking terminology helps you make informed staking decisions.',
      },
      {
        id: 'sb-10',
        type: 'multiple-choice',
        question: 'What is slashing in staking?',
        options: [
          'A type of reward',
          'A penalty where validators lose staked funds for misbehavior',
          'A trading strategy',
          'A way to unlock funds faster',
        ],
        correctAnswer: 1,
        explanation:
          'Important concept! Slashing penalizes validators who act maliciously or fail to stay online, protecting network integrity.',
      },
      {
        id: 'sb-11',
        type: 'true-false',
        question: 'You can always unstake and access your funds immediately without waiting.',
        correctAnswer: false,
        explanation:
          'Good awareness! Most networks have an "unbonding period" where your funds remain locked for days or weeks after unstaking.',
      },
      {
        id: 'sb-12',
        type: 'multiple-choice',
        question: 'What is a risk of staking?',
        options: [
          'No risks exist',
          'Locked funds and potential slashing penalties',
          'Too much profit',
          'Immediate loss of all assets',
        ],
        correctAnswer: 1,
        explanation:
          'Smart thinking! Staking risks include locked liquidity (cannot access funds immediately) and potential slashing penalties for validator misbehavior.',
      },
      {
        id: 'sb-13',
        type: 'fill-blank',
        question: 'The minimum amount of ETH required to run a validator on Ethereum is _____ ETH.',
        correctAnswer: '32',
        explanation:
          'Fantastic knowledge! Running an Ethereum validator requires exactly 32 ETH, though you can stake smaller amounts through pools.',
      },
      {
        id: 'sb-14',
        type: 'multiple-choice',
        question: 'What is liquid staking?',
        options: [
          'Staking with water',
          'Staking that gives you a tradeable token representing your staked assets',
          'A type of cryptocurrency',
          'Staking with no rewards',
        ],
        correctAnswer: 1,
        explanation:
          'Excellent! Liquid staking (like Lido) gives you tokens (e.g., stETH) that represent your stake, letting you use them in DeFi while still earning rewards.',
      },
    ],
  },
];
