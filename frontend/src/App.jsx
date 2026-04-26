import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ApplicationsScreen from './screens/ApplicationsScreen';
import SavedScreen from './screens/SavedScreen';
import ProfileScreen from './screens/ProfileScreen';
import BottomNav from './components/BottomNav';
import CircuitBackground from './components/CircuitBackground';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [showOnboarding, setShowOnboarding] = useState(true);

  const screens = {
    home: <HomeScreen />,
    search: <SearchScreen />,
    applications: <ApplicationsScreen />,
    saved: <SavedScreen />,
    profile: <ProfileScreen />,
  };

  return (
    <div className="app-container">
      <CircuitBackground />
      
      <AnimatePresence mode="wait">
        {showOnboarding ? (
          <OnboardingScreen key="onboarding" onComplete={() => setShowOnboarding(false)} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="main-content"
          >
            <Header />
            
            <div className="screen-container">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScreen}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="screen-content"
                >
                  {screens[currentScreen]}
                </motion.div>
              </AnimatePresence>
            </div>
            
            <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Onboarding Screen Component
function OnboardingScreen({ onComplete }) {
  return (
    <motion.div
      className="onboarding-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="onboarding-content">
        <motion.div
          className="mascot-container"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <svg viewBox="0 0 200 200" className="mascot-svg">
            {/* AI Circuit Background */}
            <defs>
              <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ff0080" stopOpacity="0.3" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Circuit Lines */}
            <g stroke="url(#circuitGrad)" strokeWidth="2" fill="none">
              <path d="M20 100 Q50 50 100 30" />
              <path d="M180 100 Q150 50 100 30" />
              <path d="M20 120 Q50 170 100 190" />
              <path d="M180 120 Q150 170 100 190" />
              <circle cx="100" cy="30" r="5" fill="#00d4ff" />
              <circle cx="20" cy="100" r="5" fill="#a855f7" />
              <circle cx="180" cy="100" r="5" fill="#ff0080" />
              <circle cx="100" cy="190" r="5" fill="#00ff88" />
            </g>
            
            {/* Character Body/Hoodie */}
            <ellipse cx="100" cy="130" rx="50" ry="45" fill="#3b82f6" />
            <ellipse cx="100" cy="130" rx="45" ry="40" fill="#60a5fa" />
            
            {/* Head */}
            <circle cx="100" cy="85" r="35" fill="#ffdbac" />
            
            {/* Hair - Messy Brown */}
            <path d="M65 80 Q60 60 75 55 Q80 45 90 50 Q100 40 110 50 Q120 45 125 55 Q140 60 135 80 Q140 70 130 65" fill="#8B4513" />
            <path d="M70 75 Q75 55 90 60 Q100 50 110 60 Q125 55 130 75" fill="#8B4513" />
            
            {/* Eyes - Big and Expressive */}
            <ellipse cx="88" cy="85" rx="8" ry="10" fill="white" />
            <ellipse cx="112" cy="85" rx="8" ry="10" fill="white" />
            <circle cx="88" cy="85" r="5" fill="#1e40af" />
            <circle cx="112" cy="85" r="5" fill="#1e40af" />
            <circle cx="90" cy="83" r="2" fill="white" />
            <circle cx="114" cy="83" r="2" fill="white" />
            
            {/* Smile */}
            <path d="M88 100 Q100 108 112 100" stroke="#dc2626" strokeWidth="3" fill="none" strokeLinecap="round" />
            
            {/* Thumbs Up Hand */}
            <circle cx="140" cy="120" r="15" fill="#ffdbac" />
            <rect x="135" y="105" width="10" height="20" rx="5" fill="#ffdbac" />
            <rect x="145" y="115" width="8" height="12" rx="4" fill="#ffdbac" />
            
            {/* CV/Resume Hand */}
            <rect x="50" y="110" width="25" height="30" rx="3" fill="white" stroke="#6366f1" strokeWidth="2" />
            <rect x="53" y="115" width="15" height="2" rx="1" fill="#cbd5e1" />
            <rect x="53" y="120" width="19" height="2" rx="1" fill="#cbd5e1" />
            <rect x="53" y="125" width="12" height="2" rx="1" fill="#cbd5e1" />
            <rect x="53" y="130" width="16" height="2" rx="1" fill="#cbd5e1" />
            <circle cx="50" cy="125" r="10" fill="#ffdbac" />
          </svg>
        </motion.div>
        
        <motion.h1
          className="onboarding-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Find U Job
        </motion.h1>
        
        <motion.p
          className="onboarding-slogan"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Il tuo futuro inizia qui
        </motion.p>
        
        <motion.p
          className="onboarding-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Trova il lavoro dei tuoi sogni con l'aiuto dell'AI
        </motion.p>
        
        <motion.button
          className="btn-primary btn-glossy btn-yellow"
          onClick={onComplete}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: "spring" }}
          whileTap={{ scale: 0.95 }}
        >
          Inizia Ora
        </motion.button>
      </div>
    </motion.div>
  );
}

export default App;
