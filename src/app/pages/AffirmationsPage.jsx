import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FiPlus, FiTrash2, FiMessageSquare, FiEdit, FiClock, FiBell, FiX } from 'react-icons/fi';
import PageHeader from '../../modules/core/components/PageHeader';
import EmptyState from '../../modules/core/components/EmptyState';
import { useData } from '../../modules/core/context/DataContext';
import { AFFIRMATION_CATEGORIES } from '../../modules/core/constants';

const AffirmationsPage = () => {
  const { affirmations, setAffirmations } = useData();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newAffirmation, setNewAffirmation] = useState({
    text: '',
    category: '',
    reminder: false,
    reminderTime: '08:00'
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddAffirmation = () => {
    if (!newAffirmation.text) return;

    if (editIndex !== null) {
      // Editing existing affirmation
      const updatedAffirmations = [...affirmations];
      updatedAffirmations[editIndex] = {
        ...updatedAffirmations[editIndex],
        text: newAffirmation.text,
        category: newAffirmation.category,
        reminder: newAffirmation.reminder,
        reminderTime: newAffirmation.reminderTime,
        updatedAt: new Date().toISOString()
      };
      setAffirmations(updatedAffirmations);
    } else {
      // Creating new affirmation
      const affirmation = {
        id: uuidv4(),
        text: newAffirmation.text,
        category: newAffirmation.category || 'personal',
        reminder: newAffirmation.reminder,
        reminderTime: newAffirmation.reminderTime,
        createdAt: new Date().toISOString()
      };
      setAffirmations([...affirmations, affirmation]);
    }

    resetForm();
    setShowCreateModal(false);
  };

  const handleDeleteAffirmation = (index) => {
    const updatedAffirmations = affirmations.filter((_, i) => i !== index);
    setAffirmations(updatedAffirmations);
  };

  const handleEditAffirmation = (index) => {
    const affirmation = affirmations[index];
    setNewAffirmation({
      text: affirmation.text,
      category: affirmation.category,
      reminder: affirmation.reminder || false,
      reminderTime: affirmation.reminderTime || '08:00'
    });
    setEditIndex(index);
    setShowCreateModal(true);
  };

  const resetForm = () => {
    setNewAffirmation({
      text: '',
      category: '',
      reminder: false,
      reminderTime: '08:00'
    });
    setEditIndex(null);
  };

  const getCategoryLabel = (categoryId) => {
    const category = AFFIRMATION_CATEGORIES.find(cat => cat.id === categoryId);
    return category ? category.label : 'Pribadi';
  };

  const getCategoryExamples = (categoryId) => {
    const category = AFFIRMATION_CATEGORIES.find(cat => cat.id === categoryId);
    return category ? category.examples : [];
  };

  const handleSetExampleAffirmation = (text) => {
    setNewAffirmation({
      ...newAffirmation,
      text
    });
  };

  const filteredAffirmations = affirmations.filter(affirmation => {
    const matchesCategory = selectedCategory === 'all' || affirmation.category === selectedCategory;
    const matchesSearch = affirmation.text.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Afirmasi Harian" 
        description="Tulis dan atur pengingat untuk afirmasi positif yang memperkuat manifestasi Anda."
      />

      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary flex items-center"
        >
          <FiPlus className="mr-2" /> Tambah Afirmasi Baru
        </button>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            className="input"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Semua Kategori</option>
            {AFFIRMATION_CATEGORIES.map(category => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
          
          <input
            type="text"
            className="input"
            placeholder="Cari afirmasi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {affirmations.length === 0 ? (
        <EmptyState 
          message="Anda belum memiliki afirmasi. Buatlah afirmasi positif untuk memperkuat manifestasi Anda!"
          icon={FiMessageSquare}
          actionText="Tambah Afirmasi"
          onAction={() => setShowCreateModal(true)}
        />
      ) : filteredAffirmations.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">Tidak ada afirmasi yang sesuai dengan filter Anda.</p>
          <button 
            onClick={() => {
              setSelectedCategory('all');
              setSearchTerm('');
            }}
            className="mt-4 text-purple-600 hover:text-purple-800"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredAffirmations.map((affirmation, index) => (
            <div 
              key={affirmation.id} 
              className="card card-hover"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded mr-2">
                      {getCategoryLabel(affirmation.category)}
                    </span>
                    {affirmation.reminder && (
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded flex items-center">
                        <FiBell className="mr-1" />
                        {affirmation.reminderTime}
                      </span>
                    )}
                  </div>
                  <div className="text-xl text-gray-800 my-3">
                    "{affirmation.text}"
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => handleEditAffirmation(affirmations.indexOf(affirmation))}
                    className="text-blue-500 hover:text-blue-700 p-1 cursor-pointer"
                  >
                    <FiEdit />
                  </button>
                  <button 
                    onClick={() => handleDeleteAffirmation(affirmations.indexOf(affirmation))}
                    className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Affirmation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-purple-800">
                  {editIndex !== null ? 'Edit Afirmasi' : 'Tambah Afirmasi Baru'}
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
                  <label className="block text-gray-700 mb-1">Kategori</label>
                  <select
                    className="input"
                    value={newAffirmation.category}
                    onChange={(e) => setNewAffirmation({...newAffirmation, category: e.target.value})}
                  >
                    <option value="">Pilih Kategori</option>
                    {AFFIRMATION_CATEGORIES.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Afirmasi</label>
                  <textarea
                    className="textarea h-24"
                    placeholder="Tuliskan afirmasi positif Anda..."
                    value={newAffirmation.text}
                    onChange={(e) => setNewAffirmation({...newAffirmation, text: e.target.value})}
                  />
                </div>
                
                {newAffirmation.category && (
                  <div className="bg-purple-50 p-4 rounded">
                    <p className="text-sm text-purple-800 mb-2 font-medium">Contoh afirmasi untuk kategori ini:</p>
                    <div className="space-y-2">
                      {getCategoryExamples(newAffirmation.category).map((example, idx) => (
                        <div 
                          key={idx} 
                          className="text-gray-800 text-sm p-2 bg-white rounded border border-purple-200 cursor-pointer hover:border-purple-400"
                          onClick={() => handleSetExampleAffirmation(example)}
                        >
                          "{example}"
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="reminder"
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    checked={newAffirmation.reminder}
                    onChange={(e) => setNewAffirmation({...newAffirmation, reminder: e.target.checked})}
                  />
                  <label htmlFor="reminder" className="ml-2 block text-gray-700">
                    Ingatkan saya setiap hari
                  </label>
                </div>

                {newAffirmation.reminder && (
                  <div>
                    <label className="block text-gray-700 mb-1">Waktu Pengingat</label>
                    <div className="flex items-center">
                      <FiClock className="text-gray-500 mr-2" />
                      <input
                        type="time"
                        className="input"
                        value={newAffirmation.reminderTime}
                        onChange={(e) => setNewAffirmation({...newAffirmation, reminderTime: e.target.value})}
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Notifikasi akan muncul jika browser Anda terbuka pada waktu ini.
                    </p>
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
                  onClick={handleAddAffirmation}
                  className="btn btn-primary"
                  disabled={!newAffirmation.text.trim()}
                >
                  {editIndex !== null ? 'Simpan Perubahan' : 'Tambah Afirmasi'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AffirmationsPage;