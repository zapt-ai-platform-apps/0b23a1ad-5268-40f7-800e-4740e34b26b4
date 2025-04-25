export const LOCAL_STORAGE_KEYS = {
  THEME: 'secret-app-theme',
  VISION_BOARDS: 'secret-app-vision-boards',
  GRATITUDE_ENTRIES: 'secret-app-gratitude-entries',
  AFFIRMATIONS: 'secret-app-affirmations',
  GOALS: 'secret-app-goals',
  FEELINGS: 'secret-app-feelings',
  REMINDERS: 'secret-app-reminders',
};

export const NAVIGATION_ITEMS = [
  { path: '/', label: 'Beranda', icon: 'home' },
  { path: '/vision-board', label: 'Papan Visi', icon: 'image' },
  { path: '/gratitude', label: 'Jurnal Syukur', icon: 'heart' },
  { path: '/affirmations', label: 'Afirmasi', icon: 'message-square' },
  { path: '/visualization', label: 'Visualisasi', icon: 'eye' },
  { path: '/reminders', label: 'Pengingat', icon: 'bell' },
  { path: '/goals', label: 'Tujuan', icon: 'target' },
  { path: '/feelings', label: 'Perasaan', icon: 'smile' },
  { path: '/quotes', label: 'Kutipan', icon: 'quote' },
  { path: '/learning', label: 'Pembelajaran', icon: 'book' },
];

export const FEELING_TYPES = [
  { value: 'joy', label: 'Bahagia', color: 'bg-yellow-400', emoji: '😄' },
  { value: 'love', label: 'Cinta', color: 'bg-pink-400', emoji: '❤️' },
  { value: 'gratitude', label: 'Syukur', color: 'bg-purple-400', emoji: '🙏' },
  { value: 'excitement', label: 'Semangat', color: 'bg-red-400', emoji: '🔥' },
  { value: 'contentment', label: 'Puas', color: 'bg-green-400', emoji: '😌' },
  { value: 'hope', label: 'Harapan', color: 'bg-blue-400', emoji: '✨' },
  { value: 'calm', label: 'Tenang', color: 'bg-blue-300', emoji: '😌' },
  { value: 'neutral', label: 'Netral', color: 'bg-gray-300', emoji: '😐' },
  { value: 'worry', label: 'Khawatir', color: 'bg-yellow-300', emoji: '😟' },
  { value: 'sadness', label: 'Sedih', color: 'bg-blue-200', emoji: '😢' },
  { value: 'fear', label: 'Takut', color: 'bg-purple-300', emoji: '😨' },
  { value: 'anger', label: 'Marah', color: 'bg-red-300', emoji: '😠' },
];

export const VISION_BOARD_CATEGORIES = [
  { id: 'career', label: 'Karir', icon: 'briefcase' },
  { id: 'finance', label: 'Keuangan', icon: 'dollar-sign' },
  { id: 'relationships', label: 'Hubungan', icon: 'users' },
  { id: 'health', label: 'Kesehatan', icon: 'heart' },
  { id: 'personal', label: 'Pribadi', icon: 'user' },
  { id: 'travel', label: 'Perjalanan', icon: 'map' },
  { id: 'spiritual', label: 'Spiritual', icon: 'sun' },
  { id: 'education', label: 'Pendidikan', icon: 'book' },
  { id: 'home', label: 'Rumah', icon: 'home' },
  { id: 'other', label: 'Lainnya', icon: 'star' },
];

export const QUOTES = [
  {
    quote: "Anda menarik apa yang Anda pikirkan, baik itu yang Anda inginkan atau tidak.",
    author: "The Secret"
  },
  {
    quote: "Bersyukurlah untuk apa yang sudah Anda miliki, dan Anda akan menarik lebih banyak hal baik.",
    author: "The Secret"
  },
  {
    quote: "Apa pun yang Anda pikirkan dan rasakan hari ini menciptakan masa depan Anda.",
    author: "The Secret"
  },
  {
    quote: "Pikiran menjadi hal. Apa yang paling sering Anda pikirkan, Anda tarik ke dalam hidup Anda.",
    author: "The Secret"
  },
  {
    quote: "Rahasianya adalah melakukan apa yang membahagiakan Anda.",
    author: "The Secret"
  },
  {
    quote: "Untuk menarik uang, fokuskan diri pada kekayaan. Mustahil untuk membawa lebih banyak uang ke dalam hidup Anda saat Anda fokus pada kekurangan uang.",
    author: "The Secret"
  },
  {
    quote: "Ketika Anda ingin sesuatu dengan segenap jiwa, seluruh alam semesta bersekongkol untuk membantu Anda mencapainya.",
    author: "The Secret"
  },
  {
    quote: "Jika Anda bisa melihatnya dalam pikiran, Anda bisa memegang di tangan Anda.",
    author: "The Secret"
  },
  {
    quote: "Setiap pikiran, perasaan, atau emosi yang Anda miliki memengaruhi setiap atom di dunia Anda.",
    author: "The Secret"
  },
  {
    quote: "Apa yang Anda pikirkan sekarang menciptakan masa depan Anda. Jika Anda mengubah pikiran Anda, Anda mengubah masa depan Anda.",
    author: "The Secret"
  }
];

export const AFFIRMATION_CATEGORIES = [
  {
    id: 'abundance',
    label: 'Kelimpahan',
    examples: [
      'Saya menarik kelimpahan dengan mudah ke dalam hidup saya',
      'Saya berhak menerima kelimpahan dalam segala bentuk',
      'Uang datang kepada saya dengan mudah dan dalam jumlah banyak'
    ]
  },
  {
    id: 'health',
    label: 'Kesehatan',
    examples: [
      'Tubuh saya penuh dengan energi dan vitalitas',
      'Setiap sel dalam tubuh saya memancarkan kesehatan dan kebahagiaan',
      'Saya mencintai tubuh saya dan merawatnya dengan baik'
    ]
  },
  {
    id: 'relationships',
    label: 'Hubungan',
    examples: [
      'Saya menarik hubungan yang sehat dan penuh cinta ke dalam hidup saya',
      'Saya layak mendapatkan cinta dan penghargaan',
      'Hati saya terbuka untuk memberi dan menerima cinta'
    ]
  },
  {
    id: 'career',
    label: 'Karir',
    examples: [
      'Saya menarik kesuksesan dalam segala yang saya lakukan',
      'Setiap hari saya menjadi semakin sukses',
      'Pekerjaan saya memberi kepuasan dan kemakmuran'
    ]
  },
  {
    id: 'personal',
    label: 'Pribadi',
    examples: [
      'Saya mencintai dan menerima diri saya apa adanya',
      'Saya memiliki kekuatan untuk menciptakan hidup yang saya inginkan',
      'Saya adalah pembuat keajaiban dalam hidup saya'
    ]
  }
];

export const VISUALIZATION_SESSIONS = [
  {
    id: 'abundance',
    title: 'Visualisasi Kelimpahan',
    description: 'Bayangkan hidup dalam kelimpahan material dan spiritual',
    duration: 10,
    backgroundMusic: 'abundance.mp3'
  },
  {
    id: 'health',
    title: 'Tubuh yang Sehat',
    description: 'Visualisasikan tubuh Anda yang sehat, kuat, dan penuh energi',
    duration: 8,
    backgroundMusic: 'health.mp3'
  },
  {
    id: 'success',
    title: 'Menarik Kesuksesan',
    description: 'Bayangkan mencapai semua tujuan dan impian Anda',
    duration: 12,
    backgroundMusic: 'success.mp3'
  },
  {
    id: 'relationships',
    title: 'Hubungan yang Harmonis',
    description: 'Visualisasikan hubungan yang penuh cinta dan harmonis',
    duration: 9,
    backgroundMusic: 'love.mp3'
  },
  {
    id: 'manifestation',
    title: 'Manifestasi Cepat',
    description: 'Teknik visualisasi untuk mempercepat manifestasi keinginan Anda',
    duration: 15,
    backgroundMusic: 'manifest.mp3'
  }
];

export const LAW_OF_ATTRACTION_PRINCIPLES = [
  {
    id: 'law-of-attraction',
    title: 'Hukum Ketertarikan',
    description: 'Hukum Ketertarikan adalah hukum alam yang menyatakan bahwa pikiran kita (baik sadar maupun tidak sadar) menarik pengalaman positif atau negatif ke dalam hidup kita. Singkatnya, pikiran menjadi kenyataan.',
    keyPoints: [
      'Seperti menarik seperti: Apa yang Anda fokuskan, Anda tarik',
      'Pikiran menciptakan realitas Anda',
      'Perasaan adalah faktor kunci dalam proses manifestasi'
    ]
  },
  {
    id: 'creative-process',
    title: 'Proses Kreatif',
    description: 'Tiga langkah proses kreatif untuk mewujudkan keinginan Anda:',
    keyPoints: [
      'Meminta: Tentukan dengan jelas apa yang Anda inginkan',
      'Percaya: Yakini bahwa keinginan Anda sudah dalam proses perwujudan',
      'Menerima: Rasakan seolah-olah keinginan Anda sudah terwujud'
    ]
  },
  {
    id: 'gratitude',
    title: 'Kekuatan Rasa Syukur',
    description: 'Rasa syukur adalah penguat dalam proses manifestasi. Ketika Anda bersyukur atas apa yang sudah Anda miliki, Anda menarik lebih banyak hal untuk disyukuri.',
    keyPoints: [
      'Bersyukur menarik lebih banyak kebaikan',
      'Praktikkan rasa syukur setiap hari',
      'Gunakan rasa syukur untuk mengubah energi negatif menjadi positif'
    ]
  },
  {
    id: 'visualization',
    title: 'Visualisasi',
    description: 'Visualisasi adalah proses membayangkan apa yang Anda inginkan seolah-olah sudah terwujud. Ini adalah alat yang kuat untuk mengkomunikasikan keinginan Anda kepada Alam Semesta.',
    keyPoints: [
      'Gunakan semua indera Anda saat memvisualisasikan',
      'Rasakan emosi seolah-olah keinginan Anda sudah terwujud',
      'Praktikkan visualisasi secara teratur'
    ]
  },
  {
    id: 'belief',
    title: 'Keyakinan dan Harapan',
    description: 'Keyakinan dan harapan positif adalah kunci untuk manifestasi yang berhasil. Keyakinan bahwa apa yang Anda inginkan akan terwujud membuat manifestasi lebih mudah.',
    keyPoints: [
      'Pertahankan keyakinan dan harapan positif',
      'Hilangkan keragu-raguan dan ketakutan',
      'Percayalah bahwa Anda layak mendapatkan yang Anda inginkan'
    ]
  }
];