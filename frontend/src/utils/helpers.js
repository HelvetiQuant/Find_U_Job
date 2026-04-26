// Utility Functions

// Format date to relative time
export function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'Adesso';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min fa`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ore fa`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} giorni fa`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} settimane fa`;
  
  return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
}

// Format currency
export function formatCurrency(amount, currency = 'EUR') {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Truncate text
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Generate initials from name
export function getInitials(name) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Debounce function
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Generate random color (for avatars)
export function generateRandomColor() {
  const colors = [
    '#6366f1', '#a855f7', '#ff0080', '#00d4ff', 
    '#00ff88', '#ffcc00', '#ff6b35', '#ff3366'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Validate email
export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate phone
export function isValidPhone(phone) {
  const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return re.test(phone);
}

// Calculate profile completion percentage
export function calculateProfileCompletion(profile) {
  const fields = [
    'name',
    'title',
    'location',
    'email',
    'phone',
    'about',
    'experience',
    'education',
    'skills',
  ];
  
  let completed = 0;
  fields.forEach(field => {
    if (profile[field] && 
        (Array.isArray(profile[field]) ? profile[field].length > 0 : true)) {
      completed++;
    }
  });
  
  return Math.round((completed / fields.length) * 100);
}

// Format job type
export function formatJobType(type) {
  const types = {
    'full-time': 'Full-time',
    'part-time': 'Part-time',
    'contract': 'Contratto',
    'internship': 'Stage',
    'freelance': 'Freelance',
  };
  return types[type] || type;
}

// Format work mode
export function formatWorkMode(mode) {
  const modes = {
    'remote': 'Remoto',
    'hybrid': 'Ibrido',
    'onsite': 'In sede',
  };
  return modes[mode] || mode;
}

// Local storage helpers
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },
};

// Analytics helper
export const analytics = {
  track: (event, properties = {}) => {
    // Send to analytics service
    console.log('[Analytics]', event, properties);
    
    // Example: Send to Google Analytics, Mixpanel, etc.
    if (window.gtag) {
      window.gtag('event', event, properties);
    }
  },
  
  pageView: (page) => {
    console.log('[Analytics] Page view:', page);
    
    if (window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: page,
      });
    }
  },
};
