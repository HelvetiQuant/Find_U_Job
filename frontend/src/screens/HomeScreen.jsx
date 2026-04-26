import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Briefcase, MapPin, DollarSign, Heart, Clock, TrendingUp, Users, Award, Zap } from 'lucide-react';
import './HomeScreen.css';

const HomeScreen = () => {
  const stats = [
    { icon: Bookmark, label: 'Offerte salvate', value: '12', color: 'purple', bgColor: 'rgba(168, 85, 247, 0.2)' },
    { icon: Briefcase, label: 'Candidature', value: '8', color: 'blue', bgColor: 'rgba(0, 212, 255, 0.2)' },
    { icon: Users, label: 'Colloqui', value: '3', color: 'green', bgColor: 'rgba(0, 255, 136, 0.2)' },
    { icon: Sparkles, label: 'Nuove offerte', value: '24', color: 'yellow', bgColor: 'rgba(255, 204, 0, 0.2)' },
  ];

  const featuredJobs = [
    {
      id: 1,
      title: 'AI Architect',
      company: 'Goldman Sachs',
      location: 'Londra, UK',
      salary: '€120k - €180k',
      tags: ['Full-time', 'Hybrid'],
      logo: 'GS',
      color: '#6366f1',
      isNew: true,
    },
    {
      id: 2,
      title: 'Quantitative Researcher',
      company: 'Citadel',
      location: 'New York, USA',
      salary: '$150k - $250k',
      tags: ['Full-time', 'On-site'],
      logo: 'CT',
      color: '#00ff88',
      isNew: true,
    },
    {
      id: 3,
      title: 'Senior AI Engineer',
      company: 'JP Morgan',
      location: 'Remoto',
      salary: '€100k - €150k',
      tags: ['Full-time', 'Remote'],
      logo: 'JP',
      color: '#a855f7',
      isNew: false,
    },
  ];

  return (
    <div className="home-screen">
      {/* Hero Section with Mascot */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="hero-content">
          <div className="hero-text">
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Ciao, <span className="gradient-text">Riccardo!</span>
            </motion.h1>
            <motion.p 
              className="hero-slogan"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Il tuo futuro inizia qui
            </motion.p>
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Trova il lavoro dei tuoi sogni con l'AI
            </motion.p>
          </div>
          
          <motion.div 
            className="hero-mascot"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <svg viewBox="0 0 150 150" className="hero-mascot-svg">
              <defs>
                <linearGradient id="heroMascotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#ff0080" stopOpacity="0.3" />
                </linearGradient>
                <filter id="heroGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Circuit Background */}
              <g stroke="url(#heroMascotGrad)" strokeWidth="1.5" fill="none">
                <path d="M15 75 Q37 37 75 22" />
                <path d="M135 75 Q112 37 75 22" />
                <path d="M15 90 Q37 127 75 142" />
                <path d="M135 90 Q112 127 75 142" />
                <circle cx="75" cy="22" r="4" fill="#00d4ff" />
                <circle cx="15" cy="75" r="4" fill="#a855f7" />
                <circle cx="135" cy="75" r="4" fill="#ff0080" />
                <circle cx="75" cy="142" r="4" fill="#00ff88" />
              </g>
              
              {/* Character */}
              <ellipse cx="75" cy="97" rx="37" ry="33" fill="#3b82f6" />
              <ellipse cx="75" cy="97" rx="33" ry="29" fill="#60a5fa" />
              <circle cx="75" cy="63" r="26" fill="#ffdbac" />
              <path d="M49 60 Q45 45 56 41 Q60 33 67 37 Q75 30 82 37 Q90 33 93 41 Q105 45 101 60" fill="#8B4513" />
              <ellipse cx="66" cy="63" rx="6" ry="7" fill="white" />
              <ellipse cx="84" cy="63" rx="6" ry="7" fill="white" />
              <circle cx="66" cy="63" r="4" fill="#1e40af" />
              <circle cx="84" cy="63" r="4" fill="#1e40af" />
              <path d="M66 75 Q75 81 84 75" stroke="#dc2626" strokeWidth="2" fill="none" strokeLinecap="round" />
              <circle cx="105" cy="90" r="11" fill="#ffdbac" />
              <rect x="101" y="79" width="8" height="14" rx="4" fill="#ffdbac" />
              <rect x="108" y="86" width="6" height="9" rx="3" fill="#ffdbac" />
              <rect x="37" y="82" width="19" height="22" rx="2" fill="white" stroke="#6366f1" strokeWidth="1.5" />
              <rect x="40" y="86" width="11" height="1.5" rx="0.75" fill="#cbd5e1" />
              <rect x="40" y="90" width="14" height="1.5" rx="0.75" fill="#cbd5e1" />
              <rect x="40" y="94" width="9" height="1.5" rx="0.75" fill="#cbd5e1" />
              <rect x="40" y="98" width="12" height="1.5" rx="0.75" fill="#cbd5e1" />
              <circle cx="37" cy="93" r="7" fill="#ffdbac" />
            </svg>
          </motion.div>
        </div>

        {/* Primary CTA Buttons */}
        <div className="hero-buttons">
          <motion.button 
            className="btn-primary btn-yellow btn-glossy btn-large"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles size={20} />
            Trova offerte
          </motion.button>
          <motion.button 
            className="btn-primary btn-blue btn-glossy btn-large"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Award size={20} />
            Crea il tuo profilo
          </motion.button>
        </div>
      </motion.section>

      {/* Stats Cards */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)' }}
              >
                <div 
                  className="stat-icon"
                  style={{ background: stat.bgColor }}
                >
                  <Icon size={22} color={stat.color === 'yellow' ? '#ffcc00' : stat.color === 'purple' ? '#a855f7' : stat.color === 'blue' ? '#00d4ff' : '#00ff88'} />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="featured-jobs-section">
        <div className="section-header">
          <h2 className="section-title">Offerte in evidenza</h2>
          <motion.button 
            className="btn-secondary btn-outline-blue"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Vedi tutte
          </motion.button>
        </div>

        <div className="jobs-list">
          {featuredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              className="job-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -3 }}
            >
              {job.isNew && (
                <div className="job-badge new">Nuova</div>
              )}
              
              <div className="job-header">
                <div 
                  className="company-logo"
                  style={{ background: job.color }}
                >
                  {job.logo}
                </div>
                <div className="job-actions">
                  <motion.button 
                    className="btn-icon"
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart size={18} />
                  </motion.button>
                </div>
              </div>

              <h3 className="job-title">{job.title}</h3>
              <p className="company-name">{job.company}</p>

              <div className="job-details">
                <div className="job-detail">
                  <MapPin size={14} />
                  <span>{job.location}</span>
                </div>
                <div className="job-detail">
                  <DollarSign size={14} />
                  <span>{job.salary}</span>
                </div>
              </div>

              <div className="job-tags">
                {job.tags.map((tag) => (
                  <span key={tag} className="job-tag">{tag}</span>
                ))}
              </div>

              <div className="job-footer">
                <motion.button 
                  className="btn-primary btn-green btn-glossy btn-small"
                  whileTap={{ scale: 0.95 }}
                >
                  Candidati ora
                </motion.button>
                <motion.button 
                  className="btn-secondary btn-outline-purple btn-small"
                  whileTap={{ scale: 0.95 }}
                >
                  Dettagli
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Success Banner */}
      <motion.div 
        className="success-banner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="success-icon">
          <Zap size={20} />
        </div>
        <div className="success-content">
          <h4>Profilo completato al 85%!</h4>
          <p>Aggiungi le tue competenze per aumentare le chance</p>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '85%' }} />
        </div>
      </motion.div>

      {/* Floating Action Button */}
      <motion.button 
        className="fab"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <TrendingUp size={24} />
      </motion.button>
    </div>
  );
};

export default HomeScreen;
