import React, { useState } from 'react';
import { FaQuoteLeft, FaQuoteRight, FaRegCopy } from 'react-icons/fa';
import { FiShare2, FiDownload, FiHeart } from 'react-icons/fi';
import PageHeader from '../../modules/core/components/PageHeader';
import { QUOTES } from '../../modules/core/constants';

const QuotesPage = () => {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleNextQuote = () => {
    setActiveQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    setCopySuccess(false);
  };

  const handlePrevQuote = () => {
    setActiveQuoteIndex((prev) => (prev - 1 + QUOTES.length) % QUOTES.length);
    setCopySuccess(false);
  };

  const handleRandomQuote = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * QUOTES.length);
    } while (newIndex === activeQuoteIndex && QUOTES.length > 1);
    
    setActiveQuoteIndex(newIndex);
    setCopySuccess(false);
  };

  const toggleFavorite = (index) => {
    if (favorites.includes(index)) {
      setFavorites(favorites.filter(i => i !== index));
    } else {
      setFavorites([...favorites, index]);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  const shareQuote = () => {
    const quote = QUOTES[activeQuoteIndex];
    const text = `"${quote.quote}" - ${quote.author}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Kutipan Inspiratif dari The Secret',
        text: text
      }).catch(err => {
        console.error('Error sharing quote:', err);
      });
    } else {
      copyToClipboard(text);
    }
  };

  const activeQuotes = showFavorites 
    ? favorites.map(index => ({ ...QUOTES[index], index }))
    : QUOTES.map((quote, index) => ({ ...quote, index }));

  const activeQuote = QUOTES[activeQuoteIndex];
  const isFavorite = favorites.includes(activeQuoteIndex);

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Kutipan Inspirasi" 
        description="Temukan kutipan-kutipan inspiratif dari The Secret untuk membantu meningkatkan motivasi dan menjaga semangat manifestasi Anda."
      />

      <div className="mb-10">
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-8 shadow-sm">
          <div className="relative">
            <FaQuoteLeft className="text-purple-300 text-4xl absolute -top-4 -left-2" />
            <div className="text-center py-8 px-4">
              <p className="text-2xl sm:text-3xl font-medium text-purple-900 mb-4">
                "{activeQuote.quote}"
              </p>
              <p className="text-purple-700">— {activeQuote.author}</p>
            </div>
            <FaQuoteRight className="text-purple-300 text-4xl absolute -bottom-4 -right-2" />
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm text-purple-700 hover:bg-purple-50"
              onClick={handlePrevQuote}
            >
              ←
            </button>
            <button 
              className={`flex items-center justify-center w-10 h-10 rounded-full shadow-sm ${
                isFavorite 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-white text-gray-600 hover:text-red-500 hover:bg-red-50'
              }`}
              onClick={() => toggleFavorite(activeQuoteIndex)}
            >
              <FiHeart className={isFavorite ? 'fill-current' : ''} />
            </button>
            <button 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm text-purple-700 hover:bg-purple-50"
              onClick={handleRandomQuote}
            >
              ↻
            </button>
            <button 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm text-gray-600 hover:bg-gray-50 relative"
              onClick={() => copyToClipboard(`"${activeQuote.quote}" - ${activeQuote.author}`)}
            >
              <FaRegCopy />
              {copySuccess && (
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                  Disalin!
                </span>
              )}
            </button>
            <button 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm text-gray-600 hover:bg-gray-50"
              onClick={shareQuote}
            >
              <FiShare2 />
            </button>
            <button 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm text-purple-700 hover:bg-purple-50"
              onClick={handleNextQuote}
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-purple-800">
          {showFavorites ? 'Kutipan Favorit' : 'Semua Kutipan'}
        </h2>
        <button 
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            showFavorites
              ? 'bg-red-100 text-red-700 hover:bg-red-200'
              : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
          }`}
          onClick={() => setShowFavorites(!showFavorites)}
        >
          {showFavorites ? 'Tampilkan Semua' : 'Tampilkan Favorit'}
        </button>
      </div>

      {activeQuotes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FiHeart className="mx-auto text-gray-400 mb-3" size={32} />
          <p className="text-gray-600">Anda belum memiliki kutipan favorit.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeQuotes.map(quote => (
            <div 
              key={quote.index} 
              className={`card card-hover cursor-pointer ${activeQuoteIndex === quote.index ? 'border-2 border-purple-500' : ''}`}
              onClick={() => setActiveQuoteIndex(quote.index)}
            >
              <div className="flex">
                <FaQuoteLeft className="text-purple-300 text-lg mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-gray-800 mb-2">"{quote.quote}"</p>
                  <p className="text-right text-purple-600">— {quote.author}</p>
                </div>
              </div>
              <div className="flex justify-end mt-3">
                <button 
                  className={`text-sm flex items-center p-1 rounded ${
                    favorites.includes(quote.index) 
                      ? 'text-red-500' 
                      : 'text-gray-400 hover:text-red-500'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(quote.index);
                  }}
                >
                  <FiHeart className={favorites.includes(quote.index) ? 'fill-current' : ''} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuotesPage;