import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Sentry from '@sentry/browser';
import { LOCAL_STORAGE_KEYS } from '../constants';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [visionBoards, setVisionBoards] = useState([]);
  const [gratitudeEntries, setGratitudeEntries] = useState([]);
  const [affirmations, setAffirmations] = useState([]);
  const [goals, setGoals] = useState([]);
  const [feelings, setFeelings] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      setIsLoading(true);
      
      const storedVisionBoards = localStorage.getItem(LOCAL_STORAGE_KEYS.VISION_BOARDS);
      if (storedVisionBoards) {
        setVisionBoards(JSON.parse(storedVisionBoards));
      }
      
      const storedGratitudeEntries = localStorage.getItem(LOCAL_STORAGE_KEYS.GRATITUDE_ENTRIES);
      if (storedGratitudeEntries) {
        setGratitudeEntries(JSON.parse(storedGratitudeEntries));
      }
      
      const storedAffirmations = localStorage.getItem(LOCAL_STORAGE_KEYS.AFFIRMATIONS);
      if (storedAffirmations) {
        setAffirmations(JSON.parse(storedAffirmations));
      }
      
      const storedGoals = localStorage.getItem(LOCAL_STORAGE_KEYS.GOALS);
      if (storedGoals) {
        setGoals(JSON.parse(storedGoals));
      }
      
      const storedFeelings = localStorage.getItem(LOCAL_STORAGE_KEYS.FEELINGS);
      if (storedFeelings) {
        setFeelings(JSON.parse(storedFeelings));
      }
      
      const storedReminders = localStorage.getItem(LOCAL_STORAGE_KEYS.REMINDERS);
      if (storedReminders) {
        setReminders(JSON.parse(storedReminders));
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      Sentry.captureException(error, {
        extra: {
          message: 'Failed to load data from localStorage',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving data to localStorage (${key}):`, error);
      Sentry.captureException(error, {
        extra: {
          message: `Failed to save data to localStorage: ${key}`,
          dataSize: JSON.stringify(data).length,
        },
      });
    }
  };

  const value = {
    visionBoards,
    setVisionBoards: (newVisionBoards) => {
      setVisionBoards(newVisionBoards);
      saveData(LOCAL_STORAGE_KEYS.VISION_BOARDS, newVisionBoards);
    },
    gratitudeEntries,
    setGratitudeEntries: (newGratitudeEntries) => {
      setGratitudeEntries(newGratitudeEntries);
      saveData(LOCAL_STORAGE_KEYS.GRATITUDE_ENTRIES, newGratitudeEntries);
    },
    affirmations,
    setAffirmations: (newAffirmations) => {
      setAffirmations(newAffirmations);
      saveData(LOCAL_STORAGE_KEYS.AFFIRMATIONS, newAffirmations);
    },
    goals,
    setGoals: (newGoals) => {
      setGoals(newGoals);
      saveData(LOCAL_STORAGE_KEYS.GOALS, newGoals);
    },
    feelings,
    setFeelings: (newFeelings) => {
      setFeelings(newFeelings);
      saveData(LOCAL_STORAGE_KEYS.FEELINGS, newFeelings);
    },
    reminders,
    setReminders: (newReminders) => {
      setReminders(newReminders);
      saveData(LOCAL_STORAGE_KEYS.REMINDERS, newReminders);
    },
    isLoading,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}