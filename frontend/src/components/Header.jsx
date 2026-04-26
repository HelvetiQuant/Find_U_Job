import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Settings, User, LogOut, ChevronRight } from 'lucide-react';

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notificationCount] = useState(3);

  const notifications = [
    { id: 1, title: 'Nuova offerta di lavoro!', message: 'Software Engineer @ Google', time: '2 min fa', icon: '💼', color: 'blue' },
    { id: 2, title: 'Candidatura visualizzata', message: 'Il tuo CV è stato visto da Amazon', time: '1 ora fa', icon: '👁️', color: 'green' },
    { id: 3, title: 'Colloquio confermato', message: 'Domani alle 14:00 con Microsoft', time: '3 ore fa', icon: '📅', color: 'purple' },
  ];

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="logo-icon">
            <svg viewBox="0 0 40 40" className="logo-svg">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ff0080" />
                </linearGradient>
              </defs>
              <rect x="4" y="8" width="14" height="24" rx="3" fill="url(#logoGrad)" opacity="0.9" />
              <rect x="22" y="4" width="14" height="18" rx="3" fill="url(#logoGrad)" opacity="0.7" />
              <rect x="22" y="26" width="14" height="10" rx="3" fill="url(#logoGrad)" opacity="0.5" />
            </svg>
          </div>
          <span className="logo-text">Find U Job</span>
        </motion.div>

        {/* Actions */}
        <div className="header-actions">
          {/* Notification Button */}
          <motion.button 
            className="header-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bell className="header-icon" />
            {notificationCount > 0 && (
              <span className="notification-badge">{notificationCount}</span>
            )}
          </motion.button>

          {/* Profile Button */}
          <motion.button 
            className="header-btn profile-btn"
            onClick={() => setShowProfile(!showProfile)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="avatar">
              <svg viewBox="0 0 40 40" className="avatar-svg">
                <circle cx="20" cy="20" r="18" fill="#3b82f6" />
                <circle cx="20" cy="16" r="8" fill="#ffdbac" />
                <path d="M8 32 Q20 25 32 32" stroke="#ffdbac" strokeWidth="6" fill="none" />
                <circle cx="16" cy="15" r="2" fill="#1e40af" />
                <circle cx="24" cy="15" r="2" fill="#1e40af" />
              </svg>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Notifications Dropdown */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            className="dropdown notifications-dropdown"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
          >
            <div className="dropdown-header">
              <h3>Notifiche</h3>
              <button className="mark-read">Segna tutte come lette</button>
            </div>
            <div className="notifications-list">
              {notifications.map((notif, index) => (
                <motion.div
                  key={notif.id}
                  className="notification-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className={`notification-icon bg-${notif.color}`}>
                    {notif.icon}
                  </div>
                  <div className="notification-content">
                    <h4>{notif.title}</h4>
                    <p>{notif.message}</p>
                    <span className="notification-time">{notif.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <button className="dropdown-footer">
              Vedi tutte <ChevronRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Dropdown */}
      <AnimatePresence>
        {showProfile && (
          <motion.div
            className="dropdown profile-dropdown"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
          >
            <div className="profile-header">
              <div className="avatar-large">
                <svg viewBox="0 0 60 60" className="avatar-svg-large">
                  <circle cx="30" cy="30" r="28" fill="#3b82f6" />
                  <circle cx="30" cy="24" r="12" fill="#ffdbac" />
                  <path d="M12 48 Q30 38 48 48" stroke="#ffdbac" strokeWidth="8" fill="none" />
                  <circle cx="24" cy="22" r="3" fill="#1e40af" />
                  <circle cx="36" cy="22" r="3" fill="#1e40af" />
                </svg>
              </div>
              <div className="profile-info">
                <h3>Riccardo Gaetti</h3>
                <p>AI Architect & Founder</p>
              </div>
            </div>
            <div className="profile-menu">
              <button className="menu-item">
                <User size={18} />
                <span>Il mio profilo</span>
              </button>
              <button className="menu-item">
                <Settings size={18} />
                <span>Impostazioni</span>
              </button>
              <button className="menu-item logout">
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {(showNotifications || showProfile) && (
        <motion.div
          className="dropdown-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setShowNotifications(false);
            setShowProfile(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
