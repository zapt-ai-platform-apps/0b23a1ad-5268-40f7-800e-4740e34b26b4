import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FiPlus, FiTrash2, FiImage, FiEdit, FiX } from 'react-icons/fi';
import PageHeader from '../../modules/core/components/PageHeader';
import EmptyState from '../../modules/core/components/EmptyState';
import { useData } from '../../modules/core/context/DataContext';
import { VISION_BOARD_CATEGORIES } from '../../modules/core/constants';

const VisionBoardPage = () => {
  const { visionBoards, setVisionBoards } = useData();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedVisionBoard, setSelectedVisionBoard] = useState(null);
  const [newBoard, setNewBoard] = useState({
    title: '',
    description: '',
    category: '',
    items: []
  });
  const [newItem, setNewItem] = useState({
    imageUrl: '',
    caption: '',
    affirmation: ''
  });
  const [fileInput, setFileInput] = useState(null);

  const handleCreateVisionBoard = () => {
    if (!newBoard.title) return;

    const newVisionBoard = {
      id: uuidv4(),
      title: newBoard.title,
      description: newBoard.description,
      category: newBoard.category || 'other',
      items: newBoard.items,
      createdAt: new Date().toISOString()
    };

    setVisionBoards([...visionBoards, newVisionBoard]);
    resetForm();
    setShowCreateModal(false);
  };

  const handleAddItem = () => {
    if (!newItem.imageUrl && !newItem.caption) return;

    const newItems = [
      ...newBoard.items,
      {
        id: uuidv4(),
        imageUrl: newItem.imageUrl,
        caption: newItem.caption,
        affirmation: newItem.affirmation
      }
    ];

    setNewBoard({
      ...newBoard,
      items: newItems
    });

    setNewItem({
      imageUrl: '',
      caption: '',
      affirmation: ''
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setNewItem({
        ...newItem,
        imageUrl: e.target.result
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = newBoard.items.filter(item => item.id !== itemId);
    setNewBoard({
      ...newBoard,
      items: updatedItems
    });
  };

  const handleDeleteVisionBoard = (id) => {
    const updatedVisionBoards = visionBoards.filter(board => board.id !== id);
    setVisionBoards(updatedVisionBoards);
    if (selectedVisionBoard && selectedVisionBoard.id === id) {
      setSelectedVisionBoard(null);
      setShowViewModal(false);
    }
  };

  const viewVisionBoard = (board) => {
    setSelectedVisionBoard(board);
    setShowViewModal(true);
  };

  const resetForm = () => {
    setNewBoard({
      title: '',
      description: '',
      category: '',
      items: []
    });
    setNewItem({
      imageUrl: '',
      caption: '',
      affirmation: ''
    });
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const getCategoryLabel = (categoryId) => {
    const category = VISION_BOARD_CATEGORIES.find(cat => cat.id === categoryId);
    return category ? category.label : 'Lainnya';
  };

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Papan Visi Digital" 
        description="Buat papan visi dengan gambar dan afirmasi untuk visualisasi sehari-hari."
      />

      <div className="mb-6">
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary flex items-center"
        >
          <FiPlus className="mr-2" /> Buat Papan Visi Baru
        </button>
      </div>

      {visionBoards.length === 0 ? (
        <EmptyState 
          message="Anda belum memiliki papan visi. Buatlah papan visi untuk memvisualisasikan impian Anda!"
          icon={FiImage}
          actionText="Buat Papan Visi"
          onAction={() => setShowCreateModal(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visionBoards.map(board => (
            <div 
              key={board.id} 
              className="card card-hover cursor-pointer"
              onClick={() => viewVisionBoard(board)}
            >
              <h3 className="text-xl font-semibold text-purple-800 mb-2">{board.title}</h3>
              <div className="text-sm text-purple-600 mb-2">Kategori: {getCategoryLabel(board.category)}</div>
              <p className="text-gray-600 mb-3 line-clamp-2">{board.description}</p>
              <div className="flex overflow-x-auto pb-2 mb-3 gap-2">
                {board.items.slice(0, 3).map(item => (
                  <div key={item.id} className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded overflow-hidden">
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.caption} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <FiImage size={20} />
                      </div>
                    )}
                  </div>
                ))}
                {board.items.length > 3 && (
                  <div className="flex-shrink-0 w-20 h-20 bg-purple-100 rounded flex items-center justify-center text-purple-700 font-medium">
                    +{board.items.length - 3}
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">{board.items.length} item</div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteVisionBoard(board.id);
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

      {/* Create Vision Board Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-purple-800">Buat Papan Visi Baru</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-gray-700 mb-1">Judul</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Judul papan visi Anda"
                    value={newBoard.title}
                    onChange={(e) => setNewBoard({...newBoard, title: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Deskripsi</label>
                  <textarea
                    className="textarea h-20"
                    placeholder="Deskripsi papan visi Anda"
                    value={newBoard.description}
                    onChange={(e) => setNewBoard({...newBoard, description: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Kategori</label>
                  <select
                    className="input"
                    value={newBoard.category}
                    onChange={(e) => setNewBoard({...newBoard, category: e.target.value})}
                  >
                    <option value="">Pilih Kategori</option>
                    {VISION_BOARD_CATEGORIES.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="text-lg font-semibold text-purple-700 mb-4">Tambahkan Item</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-gray-700 mb-1">Gambar</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      ref={(input) => setFileInput(input)}
                    />
                    <button
                      onClick={() => fileInput && fileInput.click()}
                      className="btn btn-outline w-full flex items-center justify-center"
                    >
                      <FiImage className="mr-2" /> Pilih Gambar
                    </button>
                    {newItem.imageUrl && (
                      <div className="mt-2 relative">
                        <img
                          src={newItem.imageUrl}
                          alt="Preview"
                          className="h-40 object-contain rounded"
                        />
                        <button
                          onClick={() => setNewItem({...newItem, imageUrl: ''})}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">Keterangan</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Keterangan untuk gambar ini"
                      value={newItem.caption}
                      onChange={(e) => setNewItem({...newItem, caption: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">Afirmasi</label>
                    <textarea
                      className="textarea h-20"
                      placeholder="Afirmasi terkait gambar ini"
                      value={newItem.affirmation}
                      onChange={(e) => setNewItem({...newItem, affirmation: e.target.value})}
                    />
                  </div>

                  <button
                    onClick={handleAddItem}
                    className="btn btn-secondary w-full"
                  >
                    Tambahkan Item
                  </button>
                </div>

                {newBoard.items.length > 0 && (
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-2">Item yang ditambahkan:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {newBoard.items.map(item => (
                        <div key={item.id} className="bg-gray-50 rounded p-3 relative">
                          {item.imageUrl && (
                            <img
                              src={item.imageUrl}
                              alt={item.caption}
                              className="h-32 w-full object-cover rounded mb-2"
                            />
                          )}
                          <div className="text-sm font-medium">{item.caption}</div>
                          {item.affirmation && (
                            <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                              "{item.affirmation}"
                            </div>
                          )}
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <FiX size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="btn hover:bg-gray-100 text-gray-700"
                >
                  Batal
                </button>
                <button
                  onClick={handleCreateVisionBoard}
                  className="btn btn-primary"
                  disabled={!newBoard.title}
                >
                  Simpan Papan Visi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Vision Board Modal */}
      {showViewModal && selectedVisionBoard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-purple-800">{selectedVisionBoard.title}</h2>
                  <div className="text-sm text-purple-600 mt-1">
                    Kategori: {getCategoryLabel(selectedVisionBoard.category)}
                  </div>
                </div>
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <FiX size={24} />
                </button>
              </div>

              {selectedVisionBoard.description && (
                <div className="mb-6 text-gray-700">
                  {selectedVisionBoard.description}
                </div>
              )}

              {selectedVisionBoard.items.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  Papan visi ini masih kosong.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedVisionBoard.items.map(item => (
                    <div key={item.id} className="card">
                      {item.imageUrl && (
                        <div className="mb-3">
                          <img
                            src={item.imageUrl}
                            alt={item.caption}
                            className="w-full h-48 object-cover rounded"
                          />
                        </div>
                      )}
                      {item.caption && (
                        <h4 className="font-medium text-purple-700 mb-1">{item.caption}</h4>
                      )}
                      {item.affirmation && (
                        <div className="text-gray-600 italic">"{item.affirmation}"</div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleDeleteVisionBoard(selectedVisionBoard.id)}
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

export default VisionBoardPage;