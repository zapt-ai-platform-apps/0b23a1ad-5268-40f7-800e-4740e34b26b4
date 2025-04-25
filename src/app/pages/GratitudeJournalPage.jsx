import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FiPlus, FiTrash2, FiHeart, FiCalendar, FiClock } from 'react-icons/fi';
import PageHeader from '../../modules/core/components/PageHeader';
import EmptyState from '../../modules/core/components/EmptyState';
import { useData } from '../../modules/core/context/DataContext';
import { formatDate, formatTimeAgo, getTodayFormatted } from '../../modules/core/utils/dateUtils';

const GRATITUDE_PROMPTS = [
  "Apa tiga hal baik yang terjadi hari ini?",
  "Siapa yang Anda syukuri hadir dalam hidup Anda hari ini?",
  "Kemampuan atau keterampilan apa yang Anda syukuri?",
  "Pengalaman apa yang membuat Anda tersenyum hari ini?",
  "Apa yang membuat Anda merasa dikasihi hari ini?",
  "Pelajaran berharga apa yang Anda dapatkan hari ini?",
  "Apa yang Anda syukuri tentang kesehatan Anda?",
  "Tantangan apa yang Anda syukuri karena telah membantu Anda tumbuh?",
  "Apa keindahan alam yang Anda syukuri hari ini?",
  "Apa kesempatan yang Anda syukuri hari ini?"
];

const GratitudeJournalPage = () => {
  const { gratitudeEntries, setGratitudeEntries } = useData();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    items: ['', '', '']
  });
  
  const [randomPrompt, setRandomPrompt] = useState('');

  const handleGeneratePrompt = () => {
    const prompt = GRATITUDE_PROMPTS[Math.floor(Math.random() * GRATITUDE_PROMPTS.length)];
    setRandomPrompt(prompt);
  };

  const handleCreateEntry = () => {
    if (newEntry.items.some(item => item.trim() === '')) return;

    const newGratitudeEntry = {
      id: uuidv4(),
      title: newEntry.title || `Jurnal Syukur - ${getTodayFormatted()}`,
      content: newEntry.content,
      items: newEntry.items.filter(item => item.trim() !== ''),
      createdAt: new Date().toISOString()
    };

    setGratitudeEntries([newGratitudeEntry, ...gratitudeEntries]);
    resetForm();
    setShowCreateModal(false);
  };

  const handleGratitudeItemChange = (index, value) => {
    const updatedItems = [...newEntry.items];
    updatedItems[index] = value;
    setNewEntry({
      ...newEntry,
      items: updatedItems
    });
  };

  const handleAddGratitudeItem = () => {
    setNewEntry({
      ...newEntry,
      items: [...newEntry.items, '']
    });
  };

  const handleRemoveGratitudeItem = (index) => {
    const updatedItems = newEntry.items.filter((_, i) => i !== index);
    setNewEntry({
      ...newEntry,
      items: updatedItems.length ? updatedItems : ['']
    });
  };

  const handleDeleteEntry = (id) => {
    const updatedEntries = gratitudeEntries.filter(entry => entry.id !== id);
    setGratitudeEntries(updatedEntries);
    if (selectedEntry && selectedEntry.id === id) {
      setSelectedEntry(null);
      setShowViewModal(false);
    }
  };

  const viewEntry = (entry) => {
    setSelectedEntry(entry);
    setShowViewModal(true);
  };

  const resetForm = () => {
    setNewEntry({
      title: '',
      content: '',
      items: ['', '', '']
    });
    setRandomPrompt('');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Jurnal Rasa Syukur" 
        description="Catat hal-hal yang Anda syukuri setiap hari untuk menarik lebih banyak kebaikan."
      />

      <div className="mb-6">
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary flex items-center"
        >
          <FiPlus className="mr-2" /> Tambah Catatan Syukur
        </button>
      </div>

      {gratitudeEntries.length === 0 ? (
        <EmptyState 
          message="Anda belum memiliki catatan rasa syukur. Mulailah bersyukur untuk menarik lebih banyak hal baik!"
          icon={FiHeart}
          actionText="Tambah Catatan Syukur"
          onAction={() => setShowCreateModal(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gratitudeEntries.map(entry => (
            <div 
              key={entry.id} 
              className="card card-hover cursor-pointer"
              onClick={() => viewEntry(entry)}
            >
              <h3 className="text-xl font-semibold text-purple-800 mb-2">{entry.title}</h3>
              
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <FiCalendar className="mr-1" /> 
                <span className="mr-3">{formatDate(entry.createdAt, 'PPP')}</span>
                <FiClock className="mr-1" /> 
                <span>{formatTimeAgo(entry.createdAt)}</span>
              </div>
              
              <ul className="list-disc list-inside text-gray-700 mb-3">
                {entry.items.slice(0, 3).map((item, index) => (
                  <li key={index} className="line-clamp-1">{item}</li>
                ))}
                {entry.items.length > 3 && (
                  <li className="text-purple-600">+{entry.items.length - 3} hal lainnya...</li>
                )}
              </ul>
              
              <div className="flex justify-end">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteEntry(entry.id);
                  }}
                  className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Gratitude Entry Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-6">Tambah Catatan Syukur</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-gray-700 mb-1">Judul (Opsional)</label>
                  <input
                    type="text"
                    className="input"
                    placeholder={`Jurnal Syukur - ${getTodayFormatted()}`}
                    value={newEntry.title}
                    onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-gray-700">Apa yang Anda syukuri hari ini?</label>
                    <button 
                      onClick={handleGeneratePrompt}
                      className="text-sm text-purple-600 hover:text-purple-800"
                    >
                      Dapatkan ide
                    </button>
                  </div>
                  
                  {randomPrompt && (
                    <div className="bg-purple-50 text-purple-800 p-3 rounded-lg mb-3 text-sm">
                      {randomPrompt}
                    </div>
                  )}

                  {newEntry.items.map((item, index) => (
                    <div key={index} className="flex mb-2">
                      <input
                        type="text"
                        className="input flex-1"
                        placeholder={`Hal yang saya syukuri #${index + 1}`}
                        value={item}
                        onChange={(e) => handleGratitudeItemChange(index, e.target.value)}
                      />
                      {newEntry.items.length > 1 && (
                        <button
                          onClick={() => handleRemoveGratitudeItem(index)}
                          className="ml-2 text-red-500 hover:text-red-700 p-2"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    onClick={handleAddGratitudeItem}
                    className="text-purple-600 hover:text-purple-800 text-sm flex items-center mt-2"
                  >
                    <FiPlus className="mr-1" /> Tambah hal lain
                  </button>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Refleksi (Opsional)</label>
                  <textarea
                    className="textarea h-24"
                    placeholder="Bagaimana perasaan Anda setelah mencatat rasa syukur ini?"
                    value={newEntry.content}
                    onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="btn hover:bg-gray-100 text-gray-700"
                >
                  Batal
                </button>
                <button
                  onClick={handleCreateEntry}
                  className="btn btn-primary"
                  disabled={!newEntry.items.some(item => item.trim() !== '')}
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Gratitude Entry Modal */}
      {showViewModal && selectedEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-2">{selectedEntry.title}</h2>
              
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <FiCalendar className="mr-1" /> 
                <span className="mr-3">{formatDate(selectedEntry.createdAt, 'PPP')}</span>
                <FiClock className="mr-1" /> 
                <span>{formatDate(selectedEntry.createdAt, 'p')}</span>
              </div>
              
              <h3 className="text-lg font-medium text-purple-700 mb-3">
                Hal-hal yang saya syukuri:
              </h3>
              
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                {selectedEntry.items.map((item, index) => (
                  <li key={index} className="pl-2">{item}</li>
                ))}
              </ul>
              
              {selectedEntry.content && (
                <>
                  <h3 className="text-lg font-medium text-purple-700 mb-3">
                    Refleksi:
                  </h3>
                  <div className="text-gray-700 bg-purple-50 p-4 rounded-lg mb-6">
                    {selectedEntry.content}
                  </div>
                </>
              )}
              
              <div className="flex justify-between">
                <button
                  onClick={() => handleDeleteEntry(selectedEntry.id)}
                  className="btn text-red-500 hover:text-red-700 border border-red-500 hover:bg-red-50"
                >
                  <FiTrash2 className="mr-2" /> Hapus
                </button>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="btn btn-primary"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GratitudeJournalPage;