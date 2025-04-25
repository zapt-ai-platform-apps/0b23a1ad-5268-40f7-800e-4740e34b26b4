import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FiPlus, FiTrash2, FiBell, FiEdit, FiClock, FiCalendar, FiX } from 'react-icons/fi';
import PageHeader from '../../modules/core/components/PageHeader';
import EmptyState from '../../modules/core/components/EmptyState';
import { useData } from '../../modules/core/context/DataContext';
import { formatDate } from '../../modules/core/utils/dateUtils';

const REMINDER_TYPES = [
  { value: 'focus', label: 'Fokus pada Keinginan', color: 'bg-purple-100 text-purple-800' },
  { value: 'gratitude', label: 'Rasa Syukur', color: 'bg-pink-100 text-pink-800' },
  { value: 'affirmation', label: 'Afirmasi', color: 'bg-blue-100 text-blue-800' },
  { value: 'visualization', label: 'Visualisasi', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'action', label: 'Tindakan', color: 'bg-green-100 text-green-800' },
  { value: 'custom', label: 'Kustom', color: 'bg-gray-100 text-gray-800' }
];

const DEFAULT_MESSAGES = {
  focus: [
    'Fokuslah pada apa yang Anda inginkan, bukan pada apa yang tidak Anda inginkan.',
    'Pikiran Anda menciptakan realitas Anda. Fokuslah pada pikiran positif.',
    'Ingat: Anda akan menarik apa yang Anda pikirkan paling banyak.'
  ],
  gratitude: [
    'Luangkan waktu untuk bersyukur atas hal-hal baik dalam hidup Anda.',
    'Rasa syukur adalah magnet untuk lebih banyak hal yang disyukuri.',
    'Bersyukurlah terlebih dahulu, maka Anda akan menarik lebih banyak kebaikan.'
  ],
  affirmation: [
    'Waktunya untuk mengulang afirmasi positif Anda.',
    'Ucapkan afirmasi Anda dengan keyakinan dan perasaan.',
    'Afirmasi positif memperkuat manifestasi keinginan Anda.'
  ],
  visualization: [
    'Luangkan beberapa menit untuk memvisualisasikan keinginan Anda.',
    'Bayangkan keinginan Anda sudah terwujud. Rasakan emosi positifnya.',
    'Visualisasi yang kuat membantu mempercepat manifestasi.'
  ],
  action: [
    'Lakukan satu tindakan kecil menuju impian Anda hari ini.',
    'Tindakan yang diinspirasi adalah kunci manifestasi yang sukses.',
    'Ikuti intuisi Anda dan ambil tindakan hari ini.'
  ],
  custom: [
    'Ini adalah pengingat personal Anda.',
    'Pengingat kustom untuk mendukung perjalanan manifestasi Anda.',
    'Tetap fokus pada tujuan Anda.'
  ]
};

const RemindersPage = () => {
  const { reminders, setReminders } = useData();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newReminder, setNewReminder] = useState({
    message: '',
    type: 'focus',
    time: '09:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    active: true
  });
  
  const daysOfWeek = [
    { value: 'Mon', label: 'Sen' },
    { value: 'Tue', label: 'Sel' },
    { value: 'Wed', label: 'Rab' },
    { value: 'Thu', label: 'Kam' },
    { value: 'Fri', label: 'Jum' },
    { value: 'Sat', label: 'Sab' },
    { value: 'Sun', label: 'Min' }
  ];

  const handleAddReminder = () => {
    if (!newReminder.message) return;

    if (editIndex !== null) {
      // Editing existing reminder
      const updatedReminders = [...reminders];
      updatedReminders[editIndex] = {
        ...updatedReminders[editIndex],
        message: newReminder.message,
        type: newReminder.type,
        time: newReminder.time,
        days: [...newReminder.days],
        active: newReminder.active,
        updatedAt: new Date().toISOString()
      };
      setReminders(updatedReminders);
    } else {
      // Creating new reminder
      const reminder = {
        id: uuidv4(),
        message: newReminder.message,
        type: newReminder.type,
        time: newReminder.time,
        days: [...newReminder.days],
        active: newReminder.active,
        createdAt: new Date().toISOString()
      };
      setReminders([...reminders, reminder]);
    }

    resetForm();
    setShowCreateModal(false);
  };

  const handleDeleteReminder = (index) => {
    const updatedReminders = reminders.filter((_, i) => i !== index);
    setReminders(updatedReminders);
  };

  const handleEditReminder = (index) => {
    const reminder = reminders[index];
    setNewReminder({
      message: reminder.message,
      type: reminder.type,
      time: reminder.time,
      days: [...reminder.days],
      active: reminder.active
    });
    setEditIndex(index);
    setShowCreateModal(true);
  };

  const toggleReminderActive = (index) => {
    const updatedReminders = [...reminders];
    updatedReminders[index].active = !updatedReminders[index].active;
    setReminders(updatedReminders);
  };

  const resetForm = () => {
    setNewReminder({
      message: '',
      type: 'focus',
      time: '09:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      active: true
    });
    setEditIndex(null);
  };

  const handleTypeChange = (type) => {
    setNewReminder({
      ...newReminder,
      type,
      message: newReminder.message || DEFAULT_MESSAGES[type][Math.floor(Math.random() * DEFAULT_MESSAGES[type].length)]
    });
  };

  const handleToggleDay = (day) => {
    if (newReminder.days.includes(day)) {
      setNewReminder({
        ...newReminder,
        days: newReminder.days.filter(d => d !== day)
      });
    } else {
      setNewReminder({
        ...newReminder,
        days: [...newReminder.days, day]
      });
    }
  };

  const getTypeLabel = (typeValue) => {
    const type = REMINDER_TYPES.find(t => t.value === typeValue);
    return type ? type.label : 'Kustom';
  };

  const getTypeColor = (typeValue) => {
    const type = REMINDER_TYPES.find(t => t.value === typeValue);
    return type ? type.color : 'bg-gray-100 text-gray-800';
  };

  const formatDays = (days) => {
    if (days.length === 7) return 'Setiap hari';
    if (days.length === 0) return 'Tidak ada';
    
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const weekend = ['Sat', 'Sun'];
    
    if (weekdays.every(day => days.includes(day)) && weekend.every(day => !days.includes(day))) {
      return 'Hari kerja';
    }
    
    if (weekend.every(day => days.includes(day)) && weekdays.every(day => !days.includes(day))) {
      return 'Akhir pekan';
    }
    
    return days.map(day => {
      const dayObj = daysOfWeek.find(d => d.value === day);
      return dayObj ? dayObj.label : day;
    }).join(', ');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Pengingat Fokus Positif" 
        description="Atur pengingat untuk tetap fokus pada keinginan Anda, bukan pada kekurangan."
      />

      <div className="mb-6">
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary flex items-center"
        >
          <FiPlus className="mr-2" /> Tambah Pengingat Baru
        </button>
      </div>

      {reminders.length === 0 ? (
        <EmptyState 
          message="Anda belum memiliki pengingat. Buatlah pengingat untuk membantu Anda tetap fokus pada keinginan!"
          icon={FiBell}
          actionText="Tambah Pengingat"
          onAction={() => setShowCreateModal(true)}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {reminders.map((reminder, index) => (
            <div 
              key={reminder.id} 
              className={`card card-hover ${!reminder.active ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start">
                <div className="mr-4">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      reminder.active ? 'bg-purple-100' : 'bg-gray-100'
                    }`}
                    onClick={() => toggleReminderActive(index)}
                  >
                    <FiBell 
                      className={`${reminder.active ? 'text-purple-600' : 'text-gray-400'}`} 
                      size={20}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`px-2 py-1 text-xs rounded ${getTypeColor(reminder.type)}`}>
                      {getTypeLabel(reminder.type)}
                    </span>
                    <span className="flex items-center text-gray-500 text-sm">
                      <FiClock className="mr-1" /> {reminder.time}
                    </span>
                    <span className="flex items-center text-gray-500 text-sm">
                      <FiCalendar className="mr-1" /> {formatDays(reminder.days)}
                    </span>
                  </div>
                  <div className="text-gray-800 mb-3">
                    {reminder.message}
                  </div>
                  <div className="text-xs text-gray-500">
                    Dibuat: {formatDate(reminder.createdAt)}
                    {reminder.updatedAt && ` • Diperbarui: ${formatDate(reminder.updatedAt)}`}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => handleEditReminder(index)}
                    className="text-blue-500 hover:text-blue-700 p-1 cursor-pointer"
                  >
                    <FiEdit />
                  </button>
                  <button 
                    onClick={() => handleDeleteReminder(index)}
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

      {/* Create/Edit Reminder Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-purple-800">
                  {editIndex !== null ? 'Edit Pengingat' : 'Tambah Pengingat Baru'}
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
                  <label className="block text-gray-700 mb-1">Jenis Pengingat</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {REMINDER_TYPES.map(type => (
                      <div 
                        key={type.value}
                        className={`px-3 py-2 rounded border cursor-pointer text-center transition-colors ${
                          newReminder.type === type.value 
                            ? `${type.color} border-transparent` 
                            : 'border-gray-300 hover:border-purple-300'
                        }`}
                        onClick={() => handleTypeChange(type.value)}
                      >
                        {type.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Pesan</label>
                  <textarea
                    className="textarea h-24"
                    placeholder="Pesan pengingat Anda..."
                    value={newReminder.message}
                    onChange={(e) => setNewReminder({...newReminder, message: e.target.value})}
                  />
                  <div className="mt-2">
                    <button 
                      onClick={() => {
                        const messages = DEFAULT_MESSAGES[newReminder.type];
                        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                        setNewReminder({...newReminder, message: randomMessage});
                      }}
                      className="text-sm text-purple-600 hover:text-purple-800"
                    >
                      Gunakan pesan contoh
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Waktu Pengingat</label>
                  <div className="flex items-center">
                    <FiClock className="text-gray-500 mr-2" />
                    <input
                      type="time"
                      className="input"
                      value={newReminder.time}
                      onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Hari</label>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map(day => (
                      <div 
                        key={day.value}
                        className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                          newReminder.days.includes(day.value) 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => handleToggleDay(day.value)}
                      >
                        {day.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="active"
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    checked={newReminder.active}
                    onChange={(e) => setNewReminder({...newReminder, active: e.target.checked})}
                  />
                  <label htmlFor="active" className="ml-2 block text-gray-700">
                    Aktifkan pengingat
                  </label>
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
                  onClick={handleAddReminder}
                  className="btn btn-primary"
                  disabled={!newReminder.message.trim() || newReminder.days.length === 0}
                >
                  {editIndex !== null ? 'Simpan Perubahan' : 'Tambah Pengingat'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemindersPage;