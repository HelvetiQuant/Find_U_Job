import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, MapPin, DollarSign, Building2, Clock, Trash2, Briefcase, Calendar, TrendingUp, Bell, Share2, ExternalLink } from 'lucide-react';
import './SavedScreen.css';

const SavedScreen = () => {
  const [savedJobs, setSavedJobs] = useState([
    {
      id: 1,
      title: 'AI Architect',
      company: 'Goldman Sachs',
      location: 'Londra, UK',
      salary: '€120k - €180k',
      type: 'Full-time',
      workMode: 'Hybrid',
      savedDate: '18 Gen 2025',
      logo: 'GS',
      color: '#6366f1',
      isNew: true,
      deadline: '30 Gen 2025',
      views: 1245,
      applicants: 89,
    },
    {
      id: 2,
      title: 'Quantitative Researcher',
      company: 'Citadel',
      location: 'New York, USA',
      salary: '$150k - $250k',
      type: 'Full-time',
      workMode: 'On-site',
      savedDate: '15 Gen 2025',
      logo: 'CT',
      color: '#00ff88',
      isNew: true,
      deadline: '15 Feb 2025',
      views: 2156,
      applicants: 156,
    },
    {
      id: 3,
      title: 'Senior AI Engineer',
      company: 'JP Morgan',
      location: 'Remoto',
      salary: '€100k - €150k',
      type: 'Full-time',
      workMode: 'Remote',
      savedDate: '10 Gen 2025',
      logo: 'JP',
      color: '#a855f7',
      isNew: false,
      deadline: '28 Gen 2025',
      views: 987,
      applicants: 67,
    },
    {
      id: 4,
      title: 'Machine Learning Engineer',
      company: 'Google',
      location: 'Zurigo, CH',
      salary: 'CHF 140k - 200k',
      type: 'Full-time',
      workMode: 'Hybrid',
      savedDate: '5 Gen 2025',
      logo: 'G',
      color: '#4285f4',
      isNew: false,
      deadline: '20 Feb 2025',
      views: 3456,
      applicants: 234,
    },
  ]);

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: 'Nuove offerte AI',
      keywords: ['AI', 'Machine Learning', 'Deep Learning'],
      location: 'Europa',
      frequency: 'Giornaliera',
      count: 24,
    },
    {
      id: 2,
      title: 'Quantitative Finance',
      keywords: ['Quant', 'Trading', 'HFT'],
      location: 'USA, UK',
      frequency: 'Settimanale',
      count: 12,
    },
  ]);

  const removeJob = (jobId) => {
    setSavedJobs(prev => prev.filter(job => job.id !== jobId));
  };

  return (
    <div className="saved-screen">
      {/* Header */}
      <div className="saved-header">
        <h1 className="saved-title">Offerte salvate</h1>
        <p className="saved-subtitle">
          {savedJobs.length} offerte salvate
        </p>
      </div>

      {/* Stats Overview */}
      <motion.div 
        className="saved-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="saved-stat">
          <Bookmark size={24} color="#a855f7" />
          <div>
            <span className="stat-value">{savedJobs.length}</span>
            <span className="stat-label">Salvate</span>
          </div>
        </div>
        <div className="saved-stat">
          <Bell size={24} color="#ffcc00" />
          <div>
            <span className="stat-value">{alerts.length}</span>
            <span className="stat-label">Alert attivi</span>
          </div>
        </div>
        <div className="saved-stat">
          <TrendingUp size={24} color="#00ff88" />
          <div>
            <span className="stat-value">36</span>
            <span className="stat-label">Nuove oggi</span>
          </div>
        </div>
      </motion.div>

      {/* Job Alerts Section */}
      <section className="alerts-section">
        <div className="section-header-row">
          <h2 className="section-title-small">Job Alert</h2>
          <motion.button 
            className="btn-secondary btn-outline-blue btn-small"
            whileTap={{ scale: 0.95 }}
          >
            + Nuovo alert
          </motion.button>
        </div>

        <div className="alerts-list">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              className="alert-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <div className="alert-icon">
                <Bell size={18} />
              </div>
              <div className="alert-content">
                <h4 className="alert-title">{alert.title}</h4>
                <div className="alert-tags">
                  {alert.keywords.map(keyword => (
                    <span key={keyword} className="alert-tag">{keyword}</span>
                  ))}
                </div>
                <div className="alert-meta">
                  <span><MapPin size={12} /> {alert.location}</span>
                  <span><Calendar size={12} /> {alert.frequency}</span>
                </div>
              </div>
              <div className="alert-count">
                <span>{alert.count}</span>
                <small>nuove</small>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Saved Jobs Section */}
      <section className="saved-jobs-section">
        <div className="section-header-row">
          <h2 className="section-title-small">Offerte salvate</h2>
          <div className="sort-options">
            <button className="sort-btn">Più recenti</button>
          </div>
        </div>

        <div className="saved-jobs-list">
          {savedJobs.map((job, index) => (
            <motion.div
              key={job.id}
              className="saved-job-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              layout
            >
              {job.isNew && (
                <div className="new-badge">Nuova</div>
              )}

              <div className="saved-job-header">
                <div 
                  className="saved-job-logo"
                  style={{ background: job.color }}
                >
                  {job.logo}
                </div>
                <div className="saved-job-actions">
                  <motion.button 
                    className="action-btn"
                    whileTap={{ scale: 0.9 }}
                  >
                    <Share2 size={16} />
                  </motion.button>
                  <motion.button 
                    className="action-btn delete"
                    onClick={() => removeJob(job.id)}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </div>

              <h3 className="saved-job-title">{job.title}</h3>
              <div className="saved-job-company">
                <Building2 size={14} />
                <span>{job.company}</span>
              </div>

              <div className="saved-job-details">
                <div className="saved-job-detail">
                  <MapPin size={14} />
                  <span>{job.location}</span>
                </div>
                <div className="saved-job-detail">
                  <Briefcase size={14} />
                  <span>{job.type}</span>
                </div>
                <div className="saved-job-detail">
                  <DollarSign size={14} />
                  <span>{job.salary}</span>
                </div>
              </div>

              <div className="saved-job-meta">
                <div className="meta-item">
                  <Clock size={14} />
                  <span>Scadenza: {job.deadline}</span>
                </div>
              </div>

              <div className="saved-job-stats">
                <div className="stat-item">
                  <ExternalLink size={14} />
                  <span>{job.views} visualizzazioni</span>
                </div>
                <div className="stat-item">
                  <Briefcase size={14} />
                  <span>{job.applicants} candidati</span>
                </div>
              </div>

              <div className="saved-job-footer">
                <motion.button 
                  className="btn-primary btn-green btn-glossy btn-small"
                  whileTap={{ scale: 0.95 }}
                >
                  Candidati ora
                </motion.button>
                <motion.button 
                  className="btn-secondary btn-outline-blue btn-small"
                  whileTap={{ scale: 0.95 }}
                >
                  Dettagli
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {savedJobs.length === 0 && (
          <div className="empty-saved">
            <Bookmark size={48} color="#a855f7" />
            <h3>Nessuna offerta salvata</h3>
            <p>Salva le offerte che ti interessano per trovarle facilmente.</p>
            <motion.button 
              className="btn-primary btn-blue btn-glossy"
              whileTap={{ scale: 0.95 }}
            >
              Cerca offerte
            </motion.button>
          </div>
        )}
      </section>

      {/* Quick Tip */}
      <motion.div 
        className="quick-tip"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="tip-icon">
          <Bell size={20} />
        </div>
        <div className="tip-content">
          <h4>💡 Suggerimento</h4>
          <p>Attiva gli alert per ricevere notifiche quando vengono pubblicate nuove offerte corrispondenti ai tuoi criteri.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default SavedScreen;
