import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiImage, FiHeart, FiMessageSquare, FiEye, FiBell, FiTarget, FiSmile, FiBookOpen } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
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
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Jurnal Rasa Syukur',
      description: 'Catat hal-hal yang Anda syukuri setiap hari.',
      icon: <FiHeart className="w-10 h-10" />,
      path: '/gratitude',
      color: 'from-pink-500 to-red-500'
    },
    {
      title: 'Afirmasi Harian',
      description: 'Tulis dan atur pengingat untuk afirmasi positif Anda.',
      icon: <FiMessageSquare className="w-10 h-10" />,
      path: '/affirmations',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'Visualisasi Terpandu',
      description: 'Ikuti sesi visualisasi terpandu untuk manifestasi yang kuat.',
      icon: <FiEye className="w-10 h-10" />,
      path: '/visualization',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      title: 'Pengingat Positif',
      description: 'Dapatkan pengingat untuk tetap fokus pada keinginan Anda.',
      icon: <FiBell className="w-10 h-10" />,
      path: '/reminders',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Pelacak Tujuan',
      description: 'Tetapkan tujuan dan niat Anda dengan jelas.',
      icon: <FiTarget className="w-10 h-10" />,
      path: '/goals',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'Pemantau Perasaan',
      description: 'Catat dan pantau perasaan Anda sepanjang hari.',
      icon: <FiSmile className="w-10 h-10" />,
      path: '/feelings',
      color: 'from-teal-400 to-cyan-500'
    },
    {
      title: 'Kutipan Inspirasi',
      description: 'Temukan kutipan inspiratif dari The Secret.',
      icon: <FaQuoteLeft className="w-10 h-10" />,
      path: '/quotes',
      color: 'from-rose-500 to-red-600'
    },
    {
      title: 'Pembelajaran',
      description: 'Pelajari prinsip-prinsip utama Hukum Ketertarikan.',
      icon: <FiBookOpen className="w-10 h-10" />,
      path: '/learning',
      color: 'from-amber-500 to-orange-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-12 px-4">
        <div className="max-w-3xl mx-auto mb-10 slide-up">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">
            Wujudkan Impian Anda dengan <span className="text-yellow-500">Hukum Ketertarikan</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8">
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
        <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-6 rounded-xl shadow-sm max-w-3xl mx-auto mb-12 fade-in">
          <FaQuoteLeft className="text-purple-500 text-xl mb-2" />
          <p className="text-xl font-medium text-purple-800 mb-2">"{randomQuote.quote}"</p>
          <p className="text-gray-600 text-right">— {randomQuote.author}</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-800 mb-8">
          Fitur-fitur Aplikasi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((feature, index) => (
            <div 
              key={index}
              className={`card card-hover bg-gradient-to-br ${feature.color} text-white p-6 rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105`}
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
          <h2 className="text-2xl md:text-3xl font-bold text-purple-800 mb-4">
            Mulailah Menerapkan Hukum Ketertarikan Hari Ini
          </h2>
          <p className="text-lg text-gray-700 mb-8">
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