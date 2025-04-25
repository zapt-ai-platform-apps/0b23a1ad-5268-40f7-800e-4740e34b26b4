import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FiPlus, FiTrash2, FiSmile, FiEdit, FiCalendar, FiClock, FiBarChart2, FiX } from 'react-icons/fi';
import PageHeader from '../../modules/core/components/PageHeader';
import EmptyState from '../../modules/core/components/EmptyState';
import { useData } from '../../modules/core/context/DataContext';
import { formatDate, formatTimeAgo } from '../../modules/core/utils/dateUtils';
import { FEELING_TYPES } from '../../modules/core/constants';

const FeelingsPage = () => {
  const { feelings, setFeelings } = useData();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'stats'
  const [editIndex, setEditIndex] = useState(null);
  const [newFeeling, setNewFeeling] = useState({
    type: '',
    intensity: 5,
    note: '',
    aligned: true
  });

  const handleAddFeeling = () => {
    if (!newFeeling.type) return;

    if (editIndex !== null) {
      // Editing existing feeling
      const updatedFeelings = [...feelings];
      updatedFeelings[editIndex] = {
        ...updatedFeelings[editIndex],
        type: newFeeling.type,
        intensity: newFeeling.intensity,
        note: newFeeling.note,
        aligned: newFeeling.aligned,
        updatedAt: new Date().toISOString()
      };
      setFeelings(updatedFeelings);
    } else {
      // Creating new feeling
      const feeling = {
        id: uuidv4(),
        type: newFeeling.type,
        intensity: newFeeling.intensity,
        note: newFeeling.note,
        aligned: newFeeling.aligned,
        createdAt: new Date().toISOString()
      };
      setFeelings([...feelings, feeling]);
    }

    resetForm();
    setShowCreateModal(false);
  };

  const handleDeleteFeeling = (index) => {
    const updatedFeelings = feelings.filter((_, i) => i !== index);
    setFeelings(updatedFeelings);
  };

  const handleEditFeeling = (index) => {
    const feeling = feelings[index];
    setNewFeeling({
      type: feeling.type,
      intensity: feeling.intensity,
      note: feeling.note,
      aligned: feeling.aligned || true
    });
    setEditIndex(index);
    setShowCreateModal(true);
  };

  const resetForm = () => {
    setNewFeeling({
      type: '',
      intensity: 5,
      note: '',
      aligned: true
    });
    setEditIndex(null);
  };

  const getFeelingLabel = (feelingType) => {
    const feeling = FEELING_TYPES.find(f => f.value === feelingType);
    return feeling ? feeling.label : feelingType;
  };

  const getFeelingEmoji = (feelingType) => {
    const feeling = FEELING_TYPES.find(f => f.value === feelingType);
    return feeling ? feeling.emoji : '😐';
  };

  const getFeelingColor = (feelingType) => {
    const feeling = FEELING_TYPES.find(f => f.value === feelingType);
    return feeling ? feeling.color : 'bg-gray-300';
  };

  const getIntensityLabel = (intensity) => {
    if (intensity <= 2) return 'Sangat Rendah';
    if (intensity <= 4) return 'Rendah';
    if (intensity <= 6) return 'Sedang';
    if (intensity <= 8) return 'Tinggi';
    return 'Sangat Tinggi';
  };

  const groupFeelingsByDate = () => {
    const grouped = {};
    
    [...feelings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .forEach(feeling => {
        const date = formatDate(feeling.createdAt, 'PPP');
        if (!grouped[date]) {
          grouped[date] = [];
        }
        grouped[date].push(feeling);
      });
    
    return grouped;
  };

  const getFeelingStats = () => {
    const feelingCounts = {};
    FEELING_TYPES.forEach(type => {
      feelingCounts[type.value] = 0;
    });
    
    feelings.forEach(feeling => {
      if (feelingCounts[feeling.type] !== undefined) {
        feelingCounts[feeling.type]++;
      } else {
        feelingCounts[feeling.type] = 1;
      }
    });
    
    return Object.entries(feelingCounts)
      .map(([type, count]) => ({ type, count }))
      .filter(item => item.count > 0)
      .sort((a, b) => b.count - a.count);
  };
  
  const getAlignmentStats = () => {
    const aligned = feelings.filter(f => f.aligned).length;
    const notAligned = feelings.filter(f => !f.aligned).length;
    const total = feelings.length;
    
    return {
      aligned,
      notAligned,
      alignedPercentage: total ? Math.round((aligned / total) * 100) : 0
    };
  };

  const sortedGroupedFeelings = groupFeelingsByDate();
  const feelingStats = getFeelingStats();
  const alignmentStats = getAlignmentStats();

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Pemantauan Perasaan" 
        description="Catat dan pantau perasaan Anda untuk membantu menyelaraskan energi dengan keinginan Anda."
      />

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary flex items-center"
        >
          <FiPlus className="mr-2" /> Catat Perasaan Sekarang
        </button>
        
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            className={`px-4 py-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
            onClick={() => setViewMode('list')}
          >
            Daftar
          </button>
          <button
            className={`px-4 py-2 rounded ${viewMode === 'stats' ? 'bg-white shadow-sm' : ''}`}
            onClick={() => setViewMode('stats')}
          >
            Statistik
          </button>
        </div>
      </div>

      {feelings.length === 0 ? (
        <EmptyState 
          message="Anda belum mencatat perasaan. Mulailah mencatat untuk menyelaraskan energi Anda dengan keinginan!"
          icon={FiSmile}
          actionText="Catat Perasaan"
          onAction={() => setShowCreateModal(true)}
        />
      ) : viewMode === 'list' ? (
        <div className="space-y-6">
          {Object.entries(sortedGroupedFeelings).map(([date, dayFeelings]) => (
            <div key={date}>
              <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                <FiCalendar className="mr-2" /> {date}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {dayFeelings.map((feeling, idx) => (
                  <div 
                    key={feeling.id} 
                    className="card card-hover"
                  >
                    <div className="flex items-start">
                      <div className={`rounded-full p-3 ${getFeelingColor(feeling.type)} mr-4`}>
                        <span className="text-2xl">{getFeelingEmoji(feeling.type)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <h4 className="font-medium text-gray-800 mr-2">
                            {getFeelingLabel(feeling.type)}
                          </h4>
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            Intensitas: {feeling.intensity}/10 ({getIntensityLabel(feeling.intensity)})
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 mb-2 flex items-center">
                          <FiClock className="mr-1" />
                          {formatTimeAgo(feeling.createdAt)}
                        </div>
                        {feeling.note && (
                          <p className="text-gray-700 mb-2">{feeling.note}</p>
                        )}
                        <div className={`text-sm ${feeling.aligned ? 'text-green-600' : 'text-amber-600'}`}>
                          {feeling.aligned 
                            ? 'Selaras dengan keinginan ✓' 
                            : 'Tidak selaras dengan keinginan ✗'}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button 
                          onClick={() => handleEditFeeling(feelings.indexOf(feeling))}
                          className="text-blue-500 hover:text-blue-700 p-1 cursor-pointer"
                        >
                          <FiEdit />
                        </button>
                        <button 
                          onClick={() => handleDeleteFeeling(feelings.indexOf(feeling))}
                          className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-medium text-purple-800 mb-4 flex items-center">
              <FiBarChart2 className="mr-2" /> Distribusi Perasaan
            </h3>
            
            <div className="space-y-3">
              {feelingStats.map(({ type, count }) => (
                <div key={type} className="flex items-center">
                  <div className={`rounded-full p-2 ${getFeelingColor(type)} mr-3`}>
                    <span className="text-xl">{getFeelingEmoji(type)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-700">{getFeelingLabel(type)}</span>
                      <span className="text-gray-500 text-sm">{count} kali</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`rounded-full h-2 ${getFeelingColor(type)}`}
                        style={{ width: `${(count / feelings.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-medium text-purple-800 mb-4">Keselarasan dengan Keinginan</h3>
            
            <div className="text-center py-3">
              <div className="text-5xl font-bold text-purple-800 mb-2">
                {alignmentStats.alignedPercentage}%
              </div>
              <div className="text-gray-600 mb-4">perasaan selaras dengan keinginan</div>
              
              <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                <div 
                  className="rounded-full h-4 bg-green-500"
                  style={{ width: `${alignmentStats.alignedPercentage}%` }}
                ></div>
              </div>
              
              <div className="flex justify-around">
                <div>
                  <div className="text-xl font-semibold text-green-600">{alignmentStats.aligned}</div>
                  <div className="text-gray-600">Selaras</div>
                </div>
                <div>
                  <div className="text-xl font-semibold text-amber-600">{alignmentStats.notAligned}</div>
                  <div className="text-gray-600">Tidak Selaras</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-700 mb-2">Saran untuk meningkatkan keselarasan:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Fokus pada hal-hal yang Anda syukuri setiap hari</li>
                <li>Praktikkan afirmasi positif secara teratur</li>
                <li>Lakukan visualisasi ketika Anda merasa tidak selaras</li>
                <li>Temukan satu aspek positif dalam setiap situasi</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Feeling Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-purple-800">
                  {editIndex !== null ? 'Edit Catatan Perasaan' : 'Catat Perasaan Sekarang'}
                </h2>
                <button 
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-gray-700 mb-1">Apa yang Anda rasakan?</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {FEELING_TYPES.map(feeling => (
                      <div 
                        key={feeling.value}
                        className={`flex flex-col items-center p-3 rounded cursor-pointer border-2 transition-colors ${
                          newFeeling.type === feeling.value 
                            ? `${feeling.color} border-transparent` 
                            : 'border-gray-200 hover:border-purple-200'
                        }`}
                        onClick={() => setNewFeeling({...newFeeling, type: feeling.value})}
                      >
                        <span className="text-2xl mb-1">{feeling.emoji}</span>
                        <span className="text-sm">{feeling.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Intensitas: {newFeeling.intensity}/10 ({getIntensityLabel(newFeeling.intensity)})
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    value={newFeeling.intensity}
                    onChange={(e) => setNewFeeling({...newFeeling, intensity: parseInt(e.target.value)})}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Lemah</span>
                    <span>Kuat</span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Catatan (Opsional)</label>
                  <textarea
                    className="textarea h-24"
                    placeholder="Apa yang menyebabkan perasaan ini? Apa yang Anda pikirkan?"
                    value={newFeeling.note}
                    onChange={(e) => setNewFeeling({...newFeeling, note: e.target.value})}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="aligned"
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    checked={newFeeling.aligned}
                    onChange={(e) => setNewFeeling({...newFeeling, aligned: e.target.checked})}
                  />
                  <label htmlFor="aligned" className="ml-2 block text-gray-700">
                    Perasaan ini selaras dengan keinginan saya
                  </label>
                </div>
                
                {!newFeeling.aligned && (
                  <div className="bg-amber-50 p-4 rounded">
                    <p className="text-amber-800 text-sm">
                      Perasaan yang tidak selaras dengan keinginan dapat memperlambat manifestasi. 
                      Pertimbangkan untuk melakukan beberapa latihan berikut untuk meningkatkan perasaan Anda:
                    </p>
                    <ul className="list-disc list-inside text-amber-700 text-sm mt-2">
                      <li>Tulis tiga hal yang Anda syukuri saat ini</li>
                      <li>Lakukan visualisasi singkat tentang keinginan Anda</li>
                      <li>Ulangi afirmasi positif Anda</li>
                      <li>Fokus pada hal-hal kecil yang positif dalam situasi Anda</li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="btn hover:bg-gray-100 text-gray-700"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddFeeling}
                  className="btn btn-primary"
                  disabled={!newFeeling.type}
                >
                  {editIndex !== null ? 'Simpan Perubahan' : 'Catat Perasaan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeelingsPage;