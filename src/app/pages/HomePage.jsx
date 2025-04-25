import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiImage, FiHeart, FiMessageSquare, FiEye, FiBell, FiTarget, FiSmile, FiBookOpen } from 'react-icons/fi';
import { FaQuoteLeft, FaRocket, FaSatellite, FaMeteor, FaGlobeAsia, FaMoon } from 'react-icons/fa';
import { QUOTES } from '../../modules/core/constants';

const HomePage = () => {
  const navigate = useNavigate();
  const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  const featureCards = [
    {
      title: 'Papan Visi Digital',
      description: 'Buat papan visi dengan gambar dan afirmasi untuk visualisasi.',
      icon: <FiImage className="w-10 h-10" />,
      path: '/vision-board',
      color: 'from-purple-600 to-indigo-800'
    },
    {
      title: 'Jurnal Rasa Syukur',
      description: 'Catat hal-hal yang Anda syukuri setiap hari.',
      icon: <FiHeart className="w-10 h-10" />,
      path: '/gratitude',
      color: 'from-indigo-600 to-blue-800'
    },
    {
      title: 'Afirmasi Harian',
      description: 'Tulis dan atur pengingat untuk afirmasi positif Anda.',
      icon: <FiMessageSquare className="w-10 h-10" />,
      path: '/affirmations',
      color: 'from-blue-600 to-cyan-800'
    },
    {
      title: 'Visualisasi Terpandu',
      description: 'Ikuti sesi visualisasi terpandu untuk manifestasi yang kuat.',
      icon: <FiEye className="w-10 h-10" />,
      path: '/visualization',
      color: 'from-cyan-600 to-teal-800'
    },
    {
      title: 'Pengingat Positif',
      description: 'Dapatkan pengingat untuk tetap fokus pada keinginan Anda.',
      icon: <FiBell className="w-10 h-10" />,
      path: '/reminders',
      color: 'from-teal-600 to-green-800'
    },
    {
      title: 'Pelacak Tujuan',
      description: 'Tetapkan tujuan dan niat Anda dengan jelas.',
      icon: <FiTarget className="w-10 h-10" />,
      path: '/goals',
      color: 'from-blue-600 to-indigo-800'
    },
    {
      title: 'Pemantau Perasaan',
      description: 'Catat dan pantau perasaan Anda sepanjang hari.',
      icon: <FiSmile className="w-10 h-10" />,
      path: '/feelings',
      color: 'from-purple-600 to-pink-800'
    },
    {
      title: 'Kutipan Inspirasi',
      description: 'Temukan kutipan inspiratif dari The Secret.',
      icon: <FaQuoteLeft className="w-10 h-10" />,
      path: '/quotes',
      color: 'from-indigo-500 to-violet-800'
    },
    {
      title: 'Pembelajaran',
      description: 'Pelajari prinsip-prinsip utama Hukum Ketertarikan.',
      icon: <FiBookOpen className="w-10 h-10" />,
      path: '/learning',
      color: 'from-violet-600 to-purple-800'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto relative z-10">
      {/* Hero Section */}
      <section className="text-center py-12 px-4 relative">
        {/* Floating space elements */}
        <div className="absolute -top-4 right-10 text-yellow-300 animate-pulse">
          <FaSatellite size={24} />
        </div>
        <div className="absolute top-20 left-10 text-indigo-300 animate-pulse" style={{animationDelay: '1s'}}>
          <FaMeteor size={20} />
        </div>
        <div className="absolute bottom-10 right-20 text-blue-300 animate-pulse" style={{animationDelay: '1.5s'}}>
          <FaGlobeAsia size={28} />
        </div>
        
        <div className="max-w-3xl mx-auto mb-10 slide-up">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Wujudkan Impian Anda dengan <span className="text-yellow-300 inline-flex items-center">Hukum Ketertarikan <FaRocket className="ml-2" /></span>
          </h1>
          <p className="text-lg text-indigo-200 mb-8">
            Gunakan kekuatan pikiran dan perasaan Anda untuk menciptakan kehidupan yang Anda inginkan.
          </p>
          <button 
            onClick={() => navigate('/learning')}
            className="btn btn-primary px-8 py-3 text-lg"
          >
            Mulai Perjalanan Anda
          </button>
        </div>

        {/* Quote of the day */}
        <div className="bg-indigo-950/60 backdrop-blur-sm border border-indigo-800/50 p-6 rounded-xl shadow-md max-w-3xl mx-auto mb-12 fade-in">
          <FaQuoteLeft className="text-yellow-400 text-xl mb-2" />
          <p className="text-xl font-medium text-white mb-2">"{randomQuote.quote}"</p>
          <p className="text-indigo-300 text-right">— {randomQuote.author}</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 flex items-center justify-center">
          <FaMoon className="mr-3 text-yellow-200" /> Fitur-fitur Aplikasi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((feature, index) => (
            <div 
              key={index}
              className={`card card-hover bg-gradient-to-br ${feature.color} text-white p-6 rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105 border border-indigo-500/30`}
              onClick={() => navigate(feature.path)}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="opacity-90">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Mulailah Menerapkan Hukum Ketertarikan Hari Ini
          </h2>
          <p className="text-lg text-indigo-200 mb-8">
            Apa yang Anda pikirkan, Anda tarik. Mulai pikirkan kehidupan yang Anda inginkan sekarang!
          </p>
          <div className="flex flex-col md:flex-row md:justify-center gap-4">
            <button 
              onClick={() => navigate('/vision-board')}
              className="btn btn-primary"
            >
              Buat Papan Visi
            </button>
            <button 
              onClick={() => navigate('/gratitude')}
              className="btn btn-secondary"
            >
              Mulai Jurnal Syukur
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;