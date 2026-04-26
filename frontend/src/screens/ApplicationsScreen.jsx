import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle2, AlertCircle, X, Calendar, MapPin, Building2, ChevronRight, MessageSquare, Phone, Video } from 'lucide-react';
import './ApplicationsScreen.css';

const ApplicationsScreen = () => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'Tutte', count: 8 },
    { id: 'pending', label: 'In attesa', count: 3 },
    { id: 'interview', label: 'Colloqui', count: 2 },
    { id: 'rejected', label: 'Rifiutate', count: 1 },
    { id: 'accepted', label: 'Accettate', count: 2 },
  ];

  const applications = [
    {
      id: 1,
      jobTitle: 'AI Architect',
      company: 'Goldman Sachs',
      location: 'Londra, UK',
      appliedDate: '15 Gen 2025',
      status: 'interview',
      statusLabel: 'Colloquio programmato',
      statusColor: '#a855f7',
      logo: 'GS',
      logoColor: '#6366f1',
      nextStep: 'Colloquio tecnico',
      nextStepDate: '28 Gen, 14:00',
      interviewType: 'video',
      progress: 75,
    },
    {
      id: 2,
      jobTitle: 'Quantitative Researcher',
      company: 'Citadel',
      location: 'New York, USA',
      appliedDate: '12 Gen 2025',
      status: 'pending',
      statusLabel: 'In revisione',
      statusColor: '#ffcc00',
      logo: 'CT',
      logoColor: '#00ff88',
      nextStep: 'Attesa risposta',
      nextStepDate: 'Entro 5 giorni',
      interviewType: null,
      progress: 40,
    },
    {
      id: 3,
      jobTitle: 'Senior AI Engineer',
      company: 'JP Morgan',
      location: 'Remoto',
      appliedDate: '10 Gen 2025',
      status: 'interview',
      statusLabel: 'Secondo colloquio',
      statusColor: '#a855f7',
      logo: 'JP',
      logoColor: '#a855f7',
      nextStep: 'Colloquio con il team',
      nextStepDate: '25 Gen, 10:00',
      interviewType: 'phone',
      progress: 60,
    },
    {
      id: 4,
      jobTitle: 'Machine Learning Engineer',
      company: 'Google',
      location: 'Zurigo, CH',
      appliedDate: '5 Gen 2025',
      status: 'accepted',
      statusLabel: 'Offerta ricevuta!',
      statusColor: '#00ff88',
      logo: 'G',
      logoColor: '#4285f4',
      nextStep: 'Firma contratto',
      nextStepDate: 'Scadenza: 30 Gen',
      interviewType: null,
      progress: 100,
      offer: {
        salary: 'CHF 165k',
        bonus: 'CHF 25k',
        equity: '50k azioni',
      },
    },
    {
      id: 5,
      jobTitle: 'Data Scientist',
      company: 'Meta',
      location: 'Londra, UK',
      appliedDate: '2 Gen 2025',
      status: 'rejected',
      statusLabel: 'Non selezionato',
      statusColor: '#ff3366',
      logo: 'M',
      logoColor: '#1877f2',
      nextStep: null,
      nextStepDate: null,
      interviewType: null,
      progress: 100,
      feedback: 'Cerchiamo più esperienza in recommendation systems.',
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'interview':
        return <Calendar size={16} />;
      case 'pending':
        return <Clock size={16} />;
      case 'accepted':
        return <CheckCircle2 size={16} />;
      case 'rejected':
        return <X size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const getInterviewIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video size={14} />;
      case 'phone':
        return <Phone size={14} />;
      case 'onsite':
        return <Building2 size={14} />;
      default:
        return <MessageSquare size={14} />;
    }
  };

  const filteredApplications = activeTab === 'all' 
    ? applications 
    : applications.filter(app => app.status === activeTab);

  return (
    <div className="applications-screen">
      {/* Header */}
      <div className="applications-header">
        <h1 className="applications-title">Le mie candidature</h1>
        <p className="applications-subtitle">
          {applications.length} candidature inviate
        </p>
      </div>

      {/* Progress Overview */}
      <motion.div 
        className="progress-overview"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="progress-stats">
          <div className="progress-stat">
            <span className="stat-number">{applications.filter(a => a.status === 'interview').length}</span>
            <span className="stat-label">Colloqui</span>
          </div>
          <div className="progress-divider" />
          <div className="progress-stat">
            <span className="stat-number">{applications.filter(a => a.status === 'accepted').length}</span>
            <span className="stat-label">Offerte</span>
          </div>
          <div className="progress-divider" />
          <div className="progress-stat">
            <span className="stat-number">{applications.filter(a => a.status === 'pending').length}</span>
            <span className="stat-label">In attesa</span>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="applications-tabs">
        <div className="tabs-scroll">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
              <span className="tab-count">{tab.count}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <div className="applications-list">
        {filteredApplications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <FileText size={48} />
            </div>
            <h3>Nessuna candidatura</h3>
            <p>Inizia a candidarti per vedere le tue candidature qui.</p>
          </div>
        ) : (
          filteredApplications.map((app, index) => (
            <motion.div
              key={app.id}
              className={`application-card ${app.status}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Card Header */}
              <div className="application-header">
                <div 
                  className="company-logo"
                  style={{ background: app.logoColor }}
                >
                  {app.logo}
                </div>
                <div className="application-info">
                  <h3 className="job-title">{app.jobTitle}</h3>
                  <div className="company-info">
                    <Building2 size={14} />
                    <span>{app.company}</span>
                  </div>
                  <div className="location-info">
                    <MapPin size={14} />
                    <span>{app.location}</span>
                  </div>
                </div>
                <div 
                  className="status-badge"
                  style={{ 
                    background: `${app.statusColor}20`,
                    color: app.statusColor,
                    borderColor: app.statusColor
                  }}
                >
                  {getStatusIcon(app.status)}
                  <span>{app.statusLabel}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="application-progress">
                <div className="progress-bar-bg">
                  <motion.div 
                    className="progress-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${app.progress}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    style={{ background: app.statusColor }}
                  />
                </div>
                <span className="progress-text">{app.progress}%</span>
              </div>

              {/* Next Step */}
              {app.nextStep && (
                <div className="next-step">
                  <div className="next-step-label">Prossimo step:</div>
                  <div className="next-step-content">
                    {app.interviewType && (
                      <span className="interview-type">
                        {getInterviewIcon(app.interviewType)}
                      </span>
                    )}
                    <span className="next-step-name">{app.nextStep}</span>
                    <span className="next-step-date">
                      <Calendar size={12} />
                      {app.nextStepDate}
                    </span>
                  </div>
                </div>
              )}

              {/* Offer Details (if accepted) */}
              {app.offer && (
                <div className="offer-details">
                  <div className="offer-item">
                    <span className="offer-label">Stipendio base:</span>
                    <span className="offer-value">{app.offer.salary}</span>
                  </div>
                  <div className="offer-item">
                    <span className="offer-label">Bonus:</span>
                    <span className="offer-value">{app.offer.bonus}</span>
                  </div>
                  <div className="offer-item">
                    <span className="offer-label">Equity:</span>
                    <span className="offer-value">{app.offer.equity}</span>
                  </div>
                </div>
              )}

              {/* Feedback (if rejected) */}
              {app.feedback && (
                <div className="feedback-section">
                  <AlertCircle size={16} />
                  <p>{app.feedback}</p>
                </div>
              )}

              {/* Applied Date */}
              <div className="applied-date">
                <Clock size={14} />
                <span>Candidato il {app.appliedDate}</span>
              </div>

              {/* Card Actions */}
              <div className="application-actions">
                {app.status === 'accepted' && (
                  <>
                    <motion.button 
                      className="btn-primary btn-green btn-glossy"
                      whileTap={{ scale: 0.95 }}
                    >
                      Accetta offerta
                    </motion.button>
                    <motion.button 
                      className="btn-secondary btn-outline-blue"
                      whileTap={{ scale: 0.95 }}
                    >
                      Negozia
                    </motion.button>
                  </>
                )}
                {app.status === 'interview' && (
                  <>
                    <motion.button 
                      className="btn-primary btn-purple btn-glossy"
                      whileTap={{ scale: 0.95 }}
                    >
                      Dettagli colloquio
                    </motion.button>
                    <motion.button 
                      className="btn-secondary btn-outline-blue"
                      whileTap={{ scale: 0.95 }}
                    >
                      Preparati
                    </motion.button>
                  </>
                )}
                {(app.status === 'pending' || app.status === 'rejected') && (
                  <motion.button 
                    className="btn-secondary btn-outline-blue btn-full"
                    whileTap={{ scale: 0.95 }}
                  >
                    Vedi dettagli <ChevronRight size={16} />
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <motion.button 
          className="action-card"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="action-icon blue">
            <Calendar size={24} />
          </div>
          <span>Calendario colloqui</span>
        </motion.button>
        <motion.button 
          className="action-card"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="action-icon purple">
            <FileText size={24} />
          </div>
          <span>CV & Documenti</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ApplicationsScreen;
