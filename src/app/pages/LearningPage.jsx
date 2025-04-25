import React, { useState } from 'react';
import { FiPlus, FiMinus, FiBook, FiExternalLink } from 'react-icons/fi';
import PageHeader from '../../modules/core/components/PageHeader';
import { LAW_OF_ATTRACTION_PRINCIPLES } from '../../modules/core/constants';

const LearningPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (id) => {
    if (expandedSection === id) {
      setExpandedSection(null);
    } else {
      setExpandedSection(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Prinsip-prinsip Hukum Ketertarikan" 
        description="Pelajari konsep-konsep kunci dari Hukum Ketertarikan untuk membantu Anda memahami dan menerapkannya dalam kehidupan."
      />

      <div className="mb-6 p-6 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl">
        <h2 className="text-2xl font-semibold text-purple-900 mb-3">Tentang "The Secret"</h2>
        <p className="text-gray-800">
          "The Secret" mengungkapkan hukum yang paling kuat di alam semesta — Hukum Ketertarikan. Menurut hukum ini, 
          kita menarik ke dalam hidup kita apa pun yang kita fokuskan. Pikiran dan perasaan kita menciptakan realitas kita. 
          Ini berarti kita dapat secara sadar menggunakan kekuatan pikiran untuk menarik apa yang kita inginkan, 
          baik itu kesehatan, kekayaan, hubungan, atau apa pun yang kita impikan.
        </p>
      </div>

      <div className="mb-8">
        <div className="space-y-4">
          {LAW_OF_ATTRACTION_PRINCIPLES.map((principle) => (
            <div 
              key={principle.id} 
              className="border rounded-lg overflow-hidden bg-white"
            >
              <div 
                className={`p-4 flex justify-between items-center cursor-pointer ${
                  expandedSection === principle.id ? 'bg-purple-100' : 'hover:bg-gray-50'
                }`}
                onClick={() => toggleSection(principle.id)}
              >
                <h3 className="text-xl font-medium text-purple-800">{principle.title}</h3>
                <span className="text-purple-600">
                  {expandedSection === principle.id ? <FiMinus size={20} /> : <FiPlus size={20} />}
                </span>
              </div>
              
              {expandedSection === principle.id && (
                <div className="p-6 border-t border-gray-200">
                  <p className="text-gray-700 mb-4">{principle.description}</p>
                  <h4 className="font-medium text-purple-700 mb-2">Poin Penting:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {principle.keyPoints.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h3 className="text-xl font-medium text-purple-800 mb-3">Tiga Langkah Proses Kreatif</h3>
          
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-1">1. Meminta</h4>
              <p className="text-gray-700">
                Tentukan dengan jelas apa yang Anda inginkan. Tulis keinginan Anda seolah-olah sudah terwujud.
                Gunakan afirmasi positif dan hindari kata-kata negatif.
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-1">2. Percaya</h4>
              <p className="text-gray-700">
                Yakini bahwa keinginan Anda sudah dalam proses perwujudan. Pertahankan keyakinan teguh dan
                hilangkan keraguan. Alam semesta merespons keyakinan, bukan keraguan.
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-1">3. Menerima</h4>
              <p className="text-gray-700">
                Rasakan seolah-olah keinginan Anda sudah terwujud. Bersyukur di muka. Rasakan emosi positif
                yang terkait dengan pencapaian keinginan Anda.
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-xl font-medium text-purple-800 mb-3">Praktik Harian</h3>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="bg-purple-100 text-purple-800 p-2 rounded-full mr-3">1</div>
              <div>
                <h4 className="font-medium text-gray-800">Praktikkan Rasa Syukur</h4>
                <p className="text-gray-600 text-sm">
                  Mulai dan akhiri hari dengan bersyukur atas hal-hal dalam hidup Anda. Rasa syukur adalah 
                  penguat yang kuat untuk manifestasi.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-purple-100 text-purple-800 p-2 rounded-full mr-3">2</div>
              <div>
                <h4 className="font-medium text-gray-800">Visualisasikan Secara Teratur</h4>
                <p className="text-gray-600 text-sm">
                  Luangkan 5-10 menit setiap hari untuk memvisualisasikan keinginan Anda dengan detail dan emosi.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-purple-100 text-purple-800 p-2 rounded-full mr-3">3</div>
              <div>
                <h4 className="font-medium text-gray-800">Ulangi Afirmasi</h4>
                <p className="text-gray-600 text-sm">
                  Gunakan afirmasi positif sepanjang hari. Buat afirmasi Anda dalam bentuk kalimat positif dan 
                  seolah-olah sudah terjadi.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-purple-100 text-purple-800 p-2 rounded-full mr-3">4</div>
              <div>
                <h4 className="font-medium text-gray-800">Perhatikan Perasaan Anda</h4>
                <p className="text-gray-600 text-sm">
                  Pantau perasaan Anda sepanjang hari dan kembali ke keadaan positif saat Anda merasa negatif.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-purple-100 text-purple-800 p-2 rounded-full mr-3">5</div>
              <div>
                <h4 className="font-medium text-gray-800">Ambil Tindakan yang Diinspirasi</h4>
                <p className="text-gray-600 text-sm">
                  Dengarkan intuisi Anda dan ambil tindakan yang diinspirasi ketika peluang muncul.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 p-6 rounded-xl mb-8">
        <h3 className="text-xl font-medium text-indigo-800 mb-3">Ingat Selalu</h3>
        <div className="text-gray-700 space-y-3">
          <p>
            Hukum Ketertarikan adalah hukum alam yang bekerja secara konsisten, terlepas dari apakah 
            kita percaya atau tidak. Seperti halnya dengan gravitasi, hukum ini tidak bisa dimatikan.
          </p>
          <p>
            Untuk hasil terbaik, penting untuk:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Menjaga frekuensi yang tinggi dengan perasaan dan pikiran positif</li>
            <li>Fokus pada apa yang Anda inginkan, bukan pada apa yang tidak Anda inginkan</li>
            <li>Bersabar dan percaya pada proses manifestasi</li>
            <li>Menyadari bahwa kebahagiaan harus berasal dari dalam, bukan dari pencapaian eksternal</li>
          </ul>
        </div>
      </div>

      <div className="p-6 border border-gray-200 rounded-xl">
        <div className="flex items-start">
          <FiBook className="text-purple-600 mr-4 mt-1" size={24} />
          <div>
            <h3 className="text-xl font-medium text-purple-800 mb-2">
              Ingin Belajar Lebih Lanjut?
            </h3>
            <p className="text-gray-700 mb-4">
              Untuk memperdalam pemahaman Anda tentang Hukum Ketertarikan, Anda dapat menonton video "THE SECRET RAHASIA KEHIDUPAN ALAM SEMESTA" atau membaca buku "The Secret" karya Rhonda Byrne.
            </p>
            <a 
              href="https://www.thesecret.tv/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 flex items-center"
            >
              Kunjungi Situs Resmi <FiExternalLink className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;