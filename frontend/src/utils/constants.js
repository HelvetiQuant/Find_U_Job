// App Constants

// App Information
export const APP_NAME = 'Find U Job';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Trova il lavoro dei tuoi sogni con l\'aiuto dell\'AI';

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://api.findujob.com/v1',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
};

// Job Types
export const JOB_TYPES = [
  { value: 'full-time', label: 'Full-time', icon: 'Briefcase' },
  { value: 'part-time', label: 'Part-time', icon: 'Clock' },
  { value: 'contract', label: 'Contratto', icon: 'FileText' },
  { value: 'internship', label: 'Stage', icon: 'GraduationCap' },
  { value: 'freelance', label: 'Freelance', icon: 'User' },
];

// Work Modes
export const WORK_MODES = [
  { value: 'remote', label: 'Remoto', icon: 'Globe' },
  { value: 'hybrid', label: 'Ibrido', icon: 'MapPin' },
  { value: 'onsite', label: 'In sede', icon: 'Building2' },
];

// Experience Levels
export const EXPERIENCE_LEVELS = [
  { value: 'entry', label: 'Junior', years: '0-2 anni' },
  { value: 'mid', label: 'Mid-level', years: '2-5 anni' },
  { value: 'senior', label: 'Senior', years: '5-10 anni' },
  { value: 'lead', label: 'Lead', years: '10+ anni' },
];

// Salary Ranges
export const SALARY_RANGES = [
  { value: '0-30000', label: '< €30k', min: 0, max: 30000 },
  { value: '30000-60000', label: '€30k - €60k', min: 30000, max: 60000 },
  { value: '60000-100000', label: '€60k - €100k', min: 60000, max: 100000 },
  { value: '100000+', label: '> €100k', min: 100000, max: null },
];

// Skills Categories
export const SKILL_CATEGORIES = {
  TECH: [
    'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Go', 'Rust',
    'React', 'Vue', 'Angular', 'Node.js', 'Django', 'FastAPI',
    'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform',
    'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch',
  ],
  DESIGN: [
    'Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator',
    'UI/UX', 'Design Systems', 'Prototyping', 'Wireframing',
  ],
  BUSINESS: [
    'Project Management', 'Agile', 'Scrum', 'Product Management',
    'Marketing', 'Sales', 'Business Development', 'Strategy',
  ],
};

// Application Status
export const APPLICATION_STATUS = {
  PENDING: { value: 'pending', label: 'In revisione', color: '#ffcc00' },
  INTERVIEW: { value: 'interview', label: 'Colloquio', color: '#a855f7' },
  OFFER: { value: 'offer', label: 'Offerta', color: '#00d4ff' },
  ACCEPTED: { value: 'accepted', label: 'Accettata', color: '#00ff88' },
  REJECTED: { value: 'rejected', label: 'Rifiutata', color: '#ff3366' },
};

// Notification Types
export const NOTIFICATION_TYPES = {
  JOB_MATCH: { value: 'job_match', icon: 'Sparkles', color: '#00d4ff' },
  APPLICATION_VIEWED: { value: 'application_viewed', icon: 'Eye', color: '#00ff88' },
  INTERVIEW_SCHEDULED: { value: 'interview_scheduled', icon: 'Calendar', color: '#a855f7' },
  OFFER_RECEIVED: { value: 'offer_received', icon: 'Gift', color: '#ffcc00' },
  JOB_ALERT: { value: 'job_alert', icon: 'Bell', color: '#ff6b35' },
  MESSAGE: { value: 'message', icon: 'MessageSquare', color: '#6366f1' },
};

// Routes
export const ROUTES = {
  HOME: '/',
  SEARCH: '/search',
  JOB_DETAIL: '/job/:id',
  APPLICATIONS: '/applications',
  SAVED: '/saved',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
};

// Colors
export const COLORS = {
  PRIMARY: '#6366f1',
  SECONDARY: '#a855f7',
  ACCENT: '#ff0080',
  SUCCESS: '#00ff88',
  WARNING: '#ffcc00',
  ERROR: '#ff3366',
  INFO: '#00d4ff',
  
  NEON: {
    BLUE: '#00d4ff',
    PURPLE: '#a855f7',
    PINK: '#ff0080',
    YELLOW: '#ffcc00',
    GREEN: '#00ff88',
    ORANGE: '#ff6b35',
    RED: '#ff3366',
  },
  
  DARK: {
    BG: '#0a0a1a',
    CARD: '#12122a',
    CARD_LIGHT: '#1a1a3e',
  },
};

// Animation Durations
export const ANIMATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
};

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  WIDE: 1440,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'findujob_user',
  TOKEN: 'findujob_token',
  THEME: 'findujob_theme',
  LANGUAGE: 'findujob_language',
  SAVED_JOBS: 'findujob_saved_jobs',
  ONBOARDING_COMPLETE: 'findujob_onboarding_complete',
};

// Feature Flags
export const FEATURES = {
  AI_MATCHING: true,
  PREMIUM: true,
  NOTIFICATIONS: true,
  DARK_MODE: true,
  MULTILANGUAGE: true,
  SOCIAL_LOGIN: true,
};

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Qualcosa è andato storto. Riprova più tardi.',
  NETWORK: 'Errore di connessione. Controlla la tua connessione internet.',
  NOT_FOUND: 'Risorsa non trovata.',
  UNAUTHORIZED: 'Non autorizzato. Effettua il login.',
  FORBIDDEN: 'Accesso negato.',
  VALIDATION: 'Controlla i dati inseriti.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  JOB_SAVED: 'Offerta salvata con successo!',
  JOB_UNSAVED: 'Offerta rimossa dai salvati.',
  APPLICATION_SENT: 'Candidatura inviata con successo!',
  PROFILE_UPDATED: 'Profilo aggiornato con successo!',
  CV_UPLOADED: 'CV caricato con successo!',
  ALERT_CREATED: 'Job alert creato con successo!',
  SETTINGS_SAVED: 'Impostazioni salvate.',
};
