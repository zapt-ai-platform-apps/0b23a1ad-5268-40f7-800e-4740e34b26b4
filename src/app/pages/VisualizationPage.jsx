import React, { useState, useEffect, useRef } from 'react';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiClock, FiEye } from 'react-icons/fi';
import PageHeader from '../../modules/core/components/PageHeader';
import { VISUALIZATION_SESSIONS } from '../../modules/core/constants';

const VisualizationPage = () => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const totalTimeRef = useRef(0);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleSelectSession = (session) => {
    setSelectedSession(session);
    setTimeRemaining(session.duration * 60);
    totalTimeRef.current = session.duration * 60;
    setProgress(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!selectedSession) return;
    
    setIsPlaying(prev => !prev);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const resetSession = () => {
    if (!selectedSession) return;
    
    setTimeRemaining(selectedSession.duration * 60);
    totalTimeRef.current = selectedSession.duration * 60;
    setProgress(0);
    setIsPlaying(false);
    clearInterval(timerRef.current);
  };

  const toggleInstructions = () => {
    setShowInstructions(prev => !prev);
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    if (totalTimeRef.current > 0) {
      setProgress(((totalTimeRef.current - timeRemaining) / totalTimeRef.current) * 100);
    }
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Visualisasi Terpandu" 
        description="Ikuti sesi visualisasi terpandu untuk memperkuat manifestasi keinginan Anda."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold text-purple-800 mb-4">Pilih Sesi Visualisasi</h2>
          <div className="space-y-3">
            {VISUALIZATION_SESSIONS.map((session) => (
              <div 
                key={session.id}
                className={`card card-hover cursor-pointer transition-all ${
                  selectedSession?.id === session.id ? 'border-2 border-purple-500' : ''
                }`}
                onClick={() => handleSelectSession(session)}
              >
                <h3 className="text-lg font-medium text-purple-700">{session.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{session.description}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <FiClock className="mr-1" /> {session.duration} menit
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={toggleInstructions}
            className="mt-6 text-purple-600 text-sm flex items-center"
          >
            <FiEye className="mr-1" /> {showInstructions ? 'Sembunyikan' : 'Tampilkan'} petunjuk visualisasi
          </button>

          {showInstructions && (
            <div className="mt-3 bg-purple-50 p-4 rounded-lg text-sm">
              <h3 className="font-medium text-purple-800 mb-2">Petunjuk Visualisasi Efektif:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Cari tempat yang tenang dan nyaman tanpa gangguan</li>
                <li>Duduk atau berbaring dalam posisi yang rileks</li>
                <li>Tutup mata dan mulai dengan beberapa napas dalam</li>
                <li>Bayangkan dengan detail keinginan Anda seolah sudah terwujud</li>
                <li>Gunakan semua indera dalam visualisasi Anda</li>
                <li>Rasakan emosi positif seolah-olah keinginan sudah tercapai</li>
                <li>Lakukan visualisasi secara teratur, idealnya setiap hari</li>
              </ol>
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          {!selectedSession ? (
            <div className="bg-purple-50 rounded-xl p-8 text-center h-full flex flex-col items-center justify-center">
              <FiEye className="text-purple-400 w-16 h-16 mb-4" />
              <h3 className="text-xl font-medium text-purple-800 mb-2">Pilih Sesi Visualisasi</h3>
              <p className="text-gray-600">
                Pilih sesi visualisasi dari daftar untuk memulai perjalanan manifestasi Anda.
              </p>
            </div>
          ) : (
            <div className="bg-gradient-to-b from-purple-100 to-indigo-50 rounded-xl p-6 h-full flex flex-col">
              <h2 className="text-2xl font-semibold text-purple-900 mb-2">
                {selectedSession.title}
              </h2>
              <p className="text-gray-700 mb-6">{selectedSession.description}</p>

              <div className="bg-white rounded-lg p-5 mb-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-lg font-medium text-purple-800">
                    {formatTime(timeRemaining)}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {selectedSession.duration} menit
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={togglePlay}
                    className="btn btn-primary px-6"
                  >
                    {isPlaying ? (
                      <><FiPause className="mr-2" /> Jeda</>
                    ) : (
                      <><FiPlay className="mr-2" /> Mulai</>
                    )}
                  </button>

                  <div className="flex space-x-3">
                    <button
                      onClick={toggleMute}
                      className="text-gray-600 hover:text-purple-700 p-2"
                    >
                      {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
                    </button>
                    <button
                      onClick={resetSession}
                      className="text-gray-600 hover:text-purple-700 p-2"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 flex-1 shadow-sm">
                <h3 className="text-lg font-medium text-purple-800 mb-3">
                  Panduan Visualisasi
                </h3>
                <div className="text-gray-700 space-y-3">
                  <p>
                    Pejamkan mata Anda dan mulailah dengan beberapa napas dalam. Rilekskan tubuh Anda dari kepala hingga kaki.
                  </p>
                  <p>
                    Bayangkan dengan jelas dan detail seolah-olah keinginan Anda sudah terwujud. Lihat, dengar, rasakan, dan alami situasi tersebut dengan semua indera Anda.
                  </p>
                  <p>
                    Yang terpenting, rasakan emosi positif yang kuat - kebahagiaan, rasa syukur, kegembiraan - seolah-olah keinginan Anda sudah menjadi kenyataan.
                  </p>
                  <p>
                    Pertahankan visualisasi ini selama sesi berlangsung, dengan keyakinan penuh bahwa keinginan Anda sedang dalam proses manifestasi.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisualizationPage;