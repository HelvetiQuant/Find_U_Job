import React from 'react';
import { motion } from 'framer-motion';
import { Home, Search, FileText, Bookmark, User } from 'lucide-react';
import './BottomNav.css';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'search', label: 'Ricerca', icon: Search },
  { id: 'applications', label: 'Candidature', icon: FileText },
  { id: 'saved', label: 'Salvati', icon: Bookmark },
  { id: 'profile', label: 'Profilo', icon: User },
];

const BottomNav = ({ currentScreen, setCurrentScreen }) => {
  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-content">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <motion.button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setCurrentScreen(item.id)}
              whileTap={{ scale: 0.9 }}
            >
              <div className="nav-icon-container">
                <motion.div
                  className={`nav-icon-bg ${isActive ? 'visible' : ''}`}
                  layoutId="nav-bg"
                  initial={false}
                  animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
                <Icon 
                  className="nav-icon" 
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {item.id === 'applications' && (
                  <span className="nav-badge">2</span>
                )}
              </div>
              <span className={`nav-label ${isActive ? 'active' : ''}`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
      
      {/* Home Indicator */}
      <div className="home-indicator" />
    </nav>
  );
};

export default BottomNav;
