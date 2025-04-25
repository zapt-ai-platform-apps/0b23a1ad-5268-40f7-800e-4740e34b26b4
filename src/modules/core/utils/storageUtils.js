import * as Sentry from '@sentry/browser';

export const getFromStorage = (key, defaultValue = null) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error(`Error getting item from localStorage (${key}):`, error);
    Sentry.captureException(error, {
      extra: { 
        message: `Failed to retrieve data from localStorage: ${key}`,
        action: 'getFromStorage'
      }
    });
    return defaultValue;
  }
};

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving item to localStorage (${key}):`, error);
    Sentry.captureException(error, {
      extra: { 
        message: `Failed to save data to localStorage: ${key}`,
        action: 'saveToStorage',
        dataSize: JSON.stringify(value).length
      }
    });
    return false;
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing item from localStorage (${key}):`, error);
    Sentry.captureException(error, {
      extra: { 
        message: `Failed to remove data from localStorage: ${key}`,
        action: 'removeFromStorage'
      }
    });
    return false;
  }
};

export const clearAllStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    Sentry.captureException(error, {
      extra: { 
        message: 'Failed to clear localStorage',
        action: 'clearAllStorage'
      }
    });
    return false;
  }
};