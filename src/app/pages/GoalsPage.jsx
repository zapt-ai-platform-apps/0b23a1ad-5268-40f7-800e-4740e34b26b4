import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FiPlus, FiTrash2, FiTarget, FiEdit, FiCheck, FiX, FiCalendar } from 'react-icons/fi';
import PageHeader from '../../modules/core/components/PageHeader';
import EmptyState from '../../modules/core/components/EmptyState';
import { useData } from '../../modules/core/context/DataContext';
import { formatDate } from '../../modules/core/utils/dateUtils';

const GoalsPage = () => {
  const { goals, setGoals } = useData();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: '',
    targetDate: '',
    steps: [],
    completed: false
  });
  const [newStep, setNewStep] = useState('');
  const [filter, setFilter] = useState('all');

  const categoryOptions = [
    { value: 'career', label: 'Karir' },
    { value: 'finance', label: 'Keuangan' },
    { value: 'relationships', label: 'Hubungan' },
    { value: 'health', label: 'Kesehatan' },
    { value: 'personal', label: 'Pribadi' },
    { value: 'spiritual', label: 'Spiritual' },
    { value: 'other', label: 'Lainnya' }
  ];

  const handleAddGoal = () => {
    if (!newGoal.title) return;

    if (editIndex !== null) {
      // Editing existing goal
      const updatedGoals = [...goals];
      updatedGoals[editIndex] = {
        ...updatedGoals[editIndex],
        title: newGoal.title,
        description: newGoal.description,
        category: newGoal.category,
        targetDate: newGoal.targetDate,
        steps: [...newGoal.steps],
        updatedAt: new Date().toISOString()
      };
      setGoals(updatedGoals);
    } else {
      // Creating new goal
      const goal = {
        id: uuidv4(),
        title: newGoal.title,
        description: newGoal.description,
        category: newGoal.category || 'other',
        targetDate: newGoal.targetDate,
        steps: [...newGoal.steps],
        completed: false,
        createdAt: new Date().toISOString()
      };
      setGoals([...goals, goal]);
    }

    resetForm();
    setShowCreateModal(false);
  };

  const handleAddStep = () => {
    if (!newStep.trim()) return;

    setNewGoal({
      ...newGoal,
      steps: [...newGoal.steps, { id: uuidv4(), text: newStep, completed: false }]
    });
    setNewStep('');
  };

  const handleRemoveStep = (stepId) => {
    setNewGoal({
      ...newGoal,
      steps: newGoal.steps.filter(step => step.id !== stepId)
    });
  };

  const handleToggleStepComplete = (stepId) => {
    setNewGoal({
      ...newGoal,
      steps: newGoal.steps.map(step => 
        step.id === stepId ? { ...step, completed: !step.completed } : step
      )
    });
  };

  const handleDeleteGoal = (id) => {
    const updatedGoals = goals.filter(goal => goal.id !== id);
    setGoals(updatedGoals);
    if (selectedGoal && selectedGoal.id === id) {
      setSelectedGoal(null);
      setShowViewModal(false);
    }
  };

  const handleEditGoal = (index) => {
    const goal = goals[index];
    setNewGoal({
      title: goal.title,
      description: goal.description,
      category: goal.category,
      targetDate: goal.targetDate,
      steps: [...goal.steps],
      completed: goal.completed
    });
    setEditIndex(index);
    setShowCreateModal(true);
  };

  const viewGoal = (goal) => {
    setSelectedGoal(goal);
    setShowViewModal(true);
  };

  const toggleGoalComplete = (id) => {
    const updatedGoals = goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(updatedGoals);
  };

  const resetForm = () => {
    setNewGoal({
      title: '',
      description: '',
      category: '',
      targetDate: '',
      steps: [],
      completed: false
    });
    setNewStep('');
    setEditIndex(null);
  };

  const getCategoryLabel = (categoryValue) => {
    const category = categoryOptions.find(cat => cat.value === categoryValue);
    return category ? category.label : 'Lainnya';
  };

  const getStepProgress = (steps) => {
    if (steps.length === 0) return 0;
    const completedSteps = steps.filter(step => step.completed).length;
    return Math.round((completedSteps / steps.length) * 100);
  };

  const filteredGoals = goals.filter(goal => {
    if (filter === 'all') return true;
    if (filter === 'completed') return goal.completed;
    if (filter === 'active') return !goal.completed;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Pelacak Tujuan & Niat" 
        description="Tetapkan tujuan dan niat dengan jelas untuk manifestasi yang kuat."
      />

      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary flex items-center"
        >
          <FiPlus className="mr-2" /> Tambah Tujuan Baru
        </button>
        
        <div className="flex">
          <select
            className="input"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Semua Tujuan</option>
            <option value="active">Tujuan Aktif</option>
            <option value="completed">Tujuan Tercapai</option>
          </select>
        </div>
      </div>

      {goals.length === 0 ? (
        <EmptyState 
          message="Anda belum memiliki tujuan yang ditetapkan. Tetapkan tujuan Anda dengan jelas untuk memulai proses manifestasi!"
          icon={FiTarget}
          actionText="Tambah Tujuan"
          onAction={() => setShowCreateModal(true)}
        />
      ) : filteredGoals.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">Tidak ada tujuan yang sesuai dengan filter Anda.</p>
          <button 
            onClick={() => setFilter('all')}
            className="mt-4 text-purple-600 hover:text-purple-800"
          >
            Tampilkan Semua Tujuan
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGoals.map((goal, index) => (
            <div 
              key={goal.id} 
              className={`card card-hover cursor-pointer ${goal.completed ? 'bg-green-50' : ''}`}
              onClick={() => viewGoal(goal)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded mr-2">
                      {getCategoryLabel(goal.category)}
                    </span>
                    {goal.targetDate && (
                      <span className="flex items-center text-xs text-gray-500">
                        <FiCalendar className="mr-1" /> {formatDate(goal.targetDate, 'PPP')}
                      </span>
                    )}
                  </div>
                  <h3 className={`text-lg font-semibold my-2 ${goal.completed ? 'text-green-700' : 'text-purple-800'}`}>
                    {goal.title}
                  </h3>
                  {goal.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{goal.description}</p>
                  )}
                  
                  {goal.steps.length > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Kemajuan</span>
                        <span>{getStepProgress(goal.steps)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`rounded-full h-2 ${goal.completed ? 'bg-green-500' : 'bg-purple-500'}`}
                          style={{ width: `${getStepProgress(goal.steps)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditGoal(goals.indexOf(goal));
                    }}
                    className="text-blue-500 hover:text-blue-700 p-1 cursor-pointer"
                  >
                    <FiEdit />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteGoal(goal.id);
                    }}
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

      {/* Create/Edit Goal Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-purple-800">
                  {editIndex !== null ? 'Edit Tujuan' : 'Tambah Tujuan Baru'}
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
                  <label className="block text-gray-700 mb-1">Judul Tujuan</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Apa tujuan Anda?"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Deskripsi (Opsional)</label>
                  <textarea
                    className="textarea h-24"
                    placeholder="Deskripsikan tujuan Anda dengan lebih detail..."
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Kategori</label>
                    <select
                      className="input"
                      value={newGoal.category}
                      onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                    >
                      <option value="">Pilih Kategori</option>
                      {categoryOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Tanggal Target (Opsional)</label>
                    <input
                      type="date"
                      className="input"
                      value={newGoal.targetDate}
                      onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Langkah-langkah (Opsional)</label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      className="input flex-1"
                      placeholder="Tambahkan langkah untuk mencapai tujuan ini"
                      value={newStep}
                      onChange={(e) => setNewStep(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddStep();
                        }
                      }}
                    />
                    <button
                      onClick={handleAddStep}
                      className="ml-2 btn btn-outline px-3"
                    >
                      <FiPlus />
                    </button>
                  </div>

                  {newGoal.steps.length > 0 && (
                    <div className="space-y-2 mt-3">
                      {newGoal.steps.map(step => (
                        <div key={step.id} className="flex items-center bg-gray-50 p-2 rounded">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={step.completed}
                            onChange={() => handleToggleStepComplete(step.id)}
                          />
                          <span className={`flex-1 ${step.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                            {step.text}
                          </span>
                          <button
                            onClick={() => handleRemoveStep(step.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
                  onClick={handleAddGoal}
                  className="btn btn-primary"
                  disabled={!newGoal.title.trim()}
                >
                  {editIndex !== null ? 'Simpan Perubahan' : 'Tambah Tujuan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Goal Modal */}
      {showViewModal && selectedGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className={`text-2xl font-bold ${selectedGoal.completed ? 'text-green-700' : 'text-purple-800'}`}>
                    {selectedGoal.title}
                  </h2>
                  <div className="flex items-center mt-1">
                    <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded mr-2">
                      {getCategoryLabel(selectedGoal.category)}
                    </span>
                    {selectedGoal.targetDate && (
                      <span className="flex items-center text-xs text-gray-500">
                        <FiCalendar className="mr-1" /> {formatDate(selectedGoal.targetDate, 'PPP')}
                      </span>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <FiX size={24} />
                </button>
              </div>

              {selectedGoal.description && (
                <div className="mb-6 text-gray-700">
                  {selectedGoal.description}
                </div>
              )}

              {selectedGoal.steps.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-purple-700 mb-3">Langkah-langkah:</h3>
                  <div className="space-y-2">
                    {selectedGoal.steps.map(step => (
                      <div 
                        key={step.id} 
                        className="flex items-center bg-gray-50 p-3 rounded"
                      >
                        <div 
                          className={`w-5 h-5 rounded-full border flex items-center justify-center cursor-pointer mr-3 ${
                            step.completed 
                              ? 'bg-green-500 border-green-500 text-white' 
                              : 'border-gray-400'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            const updatedGoals = goals.map(g => {
                              if (g.id === selectedGoal.id) {
                                return {
                                  ...g,
                                  steps: g.steps.map(s => 
                                    s.id === step.id ? { ...s, completed: !s.completed } : s
                                  )
                                };
                              }
                              return g;
                            });
                            setGoals(updatedGoals);
                            setSelectedGoal({
                              ...selectedGoal,
                              steps: selectedGoal.steps.map(s => 
                                s.id === step.id ? { ...s, completed: !s.completed } : s
                              )
                            });
                          }}
                        >
                          {step.completed && <FiCheck size={14} />}
                        </div>
                        <span className={step.completed ? 'line-through text-gray-500' : 'text-gray-700'}>
                          {step.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Kemajuan</span>
                      <span>{getStepProgress(selectedGoal.steps)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`rounded-full h-2 ${selectedGoal.completed ? 'bg-green-500' : 'bg-purple-500'}`}
                        style={{ width: `${getStepProgress(selectedGoal.steps)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="goalCompleted"
                    className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    checked={selectedGoal.completed}
                    onChange={() => toggleGoalComplete(selectedGoal.id)}
                  />
                  <label htmlFor="goalCompleted" className={`ml-2 ${selectedGoal.completed ? 'text-green-700' : 'text-gray-700'}`}>
                    {selectedGoal.completed ? 'Tujuan Tercapai!' : 'Tandai sebagai tercapai'}
                  </label>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      handleEditGoal(goals.findIndex(g => g.id === selectedGoal.id));
                      setShowViewModal(false);
                    }}
                    className="btn text-blue-500 hover:text-blue-700 border border-blue-500 hover:bg-blue-50"
                  >
                    <FiEdit className="mr-2" /> Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteGoal(selectedGoal.id);
                      setShowViewModal(false);
                    }}
                    className="btn text-red-500 hover:text-red-700 border border-red-500 hover:bg-red-50"
                  >
                    <FiTrash2 className="mr-2" /> Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsPage;