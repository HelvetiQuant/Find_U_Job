import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial State
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  savedJobs: [],
  applications: [],
  notifications: [],
  alerts: [],
  theme: 'dark',
  language: 'it',
};

// Action Types
const ACTIONS = {
  SET_USER: 'SET_USER',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  ADD_SAVED_JOB: 'ADD_SAVED_JOB',
  REMOVE_SAVED_JOB: 'REMOVE_SAVED_JOB',
  ADD_APPLICATION: 'ADD_APPLICATION',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  MARK_NOTIFICATION_READ: 'MARK_NOTIFICATION_READ',
  SET_ALERTS: 'SET_ALERTS',
  ADD_ALERT: 'ADD_ALERT',
  REMOVE_ALERT: 'REMOVE_ALERT',
  SET_THEME: 'SET_THEME',
  SET_LANGUAGE: 'SET_LANGUAGE',
  CLEAR_ERROR: 'CLEAR_ERROR',
  LOGOUT: 'LOGOUT',
};

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    
    case ACTIONS.ADD_SAVED_JOB:
      return {
        ...state,
        savedJobs: [...state.savedJobs, action.payload],
      };
    
    case ACTIONS.REMOVE_SAVED_JOB:
      return {
        ...state,
        savedJobs: state.savedJobs.filter(job => job.id !== action.payload),
      };
    
    case ACTIONS.ADD_APPLICATION:
      return {
        ...state,
        applications: [...state.applications, action.payload],
      };
    
    case ACTIONS.SET_NOTIFICATIONS:
      return { ...state, notifications: action.payload };
    
    case ACTIONS.MARK_NOTIFICATION_READ:
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };
    
    case ACTIONS.SET_ALERTS:
      return { ...state, alerts: action.payload };
    
    case ACTIONS.ADD_ALERT:
      return { ...state, alerts: [...state.alerts, action.payload] };
    
    case ACTIONS.REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter(alert => alert.id !== action.payload),
      };
    
    case ACTIONS.SET_THEME:
      return { ...state, theme: action.payload };
    
    case ACTIONS.SET_LANGUAGE:
      return { ...state, language: action.payload };
    
    case ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    
    case ACTIONS.LOGOUT:
      return initialState;
    
    default:
      return state;
  }
}

// Context
const AppContext = createContext();

// Provider Component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load saved state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('findujob_state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.user) {
          dispatch({ type: ACTIONS.SET_USER, payload: parsed.user });
        }
        if (parsed.savedJobs) {
          parsed.savedJobs.forEach(job => {
            dispatch({ type: ACTIONS.ADD_SAVED_JOB, payload: job });
          });
        }
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }, []);

  // Save state to localStorage on change
  useEffect(() => {
    const stateToSave = {
      user: state.user,
      savedJobs: state.savedJobs,
      theme: state.theme,
      language: state.language,
    };
    localStorage.setItem('findujob_state', JSON.stringify(stateToSave));
  }, [state.user, state.savedJobs, state.theme, state.language]);

  // Actions
  const actions = {
    setUser: (user) => dispatch({ type: ACTIONS.SET_USER, payload: user }),
    setLoading: (loading) => dispatch({ type: ACTIONS.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: ACTIONS.SET_ERROR, payload: error }),
    clearError: () => dispatch({ type: ACTIONS.CLEAR_ERROR }),
    
    addSavedJob: (job) => dispatch({ type: ACTIONS.ADD_SAVED_JOB, payload: job }),
    removeSavedJob: (jobId) => dispatch({ type: ACTIONS.REMOVE_SAVED_JOB, payload: jobId }),
    
    addApplication: (application) => dispatch({ type: ACTIONS.ADD_APPLICATION, payload: application }),
    
    setNotifications: (notifications) => dispatch({ type: ACTIONS.SET_NOTIFICATIONS, payload: notifications }),
    markNotificationRead: (id) => dispatch({ type: ACTIONS.MARK_NOTIFICATION_READ, payload: id }),
    
    setAlerts: (alerts) => dispatch({ type: ACTIONS.SET_ALERTS, payload: alerts }),
    addAlert: (alert) => dispatch({ type: ACTIONS.ADD_ALERT, payload: alert }),
    removeAlert: (id) => dispatch({ type: ACTIONS.REMOVE_ALERT, payload: id }),
    
    setTheme: (theme) => dispatch({ type: ACTIONS.SET_THEME, payload: theme }),
    setLanguage: (language) => dispatch({ type: ACTIONS.SET_LANGUAGE, payload: language }),
    
    logout: () => dispatch({ type: ACTIONS.LOGOUT }),
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom Hook
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
