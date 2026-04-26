import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Edit2, Settings, FileText, Award, Briefcase, GraduationCap, MapPin, Mail, Phone, Globe, ChevronRight, Star, Download, Share2, Eye, Zap, TrendingUp } from 'lucide-react';
import './ProfileScreen.css';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [profileCompletion] = useState(85);

  const user = {
    name: 'Riccardo Gaetti',
    title: 'AI Architect & Founder',
    company: 'HelvetiQuant',
    location: 'Lugano, Switzerland',
    email: 'Riccardo.gaetti@gmail.com',
    phone: '+41 76 843 23 71',
    website: 'linkedin.com/in/riccardo-gaetti',
    avatar: null,
    verified: true,
    premium: true,
  };

  const stats = [
    { label: 'Esperienza', value: '7+ anni', icon: Briefcase },
    { label: 'Progetti', value: '15+', icon: FileText },
    { label: 'Skills', value: '25+', icon: Star },
    { label: 'Certificazioni', value: '8', icon: Award },
  ];

  const skills = [
    { name: 'Python', level: 95, category: 'tech' },
    { name: 'Machine Learning', level: 90, category: 'tech' },
    { name: 'Deep Learning', level: 88, category: 'tech' },
    { name: 'Quantitative Trading', level: 85, category: 'finance' },
    { name: 'TensorFlow', level: 90, category: 'tech' },
    { name: 'PyTorch', level: 87, category: 'tech' },
    { name: 'Risk Management', level: 82, category: 'finance' },
    { name: 'NLP', level: 80, category: 'tech' },
  ];

  const experience = [
    {
      id: 1,
      role: 'AI Architect & Founder',
      company: 'HelvetiQuant',
      type: 'Full-time',
      period: '2022 - Presente',
      duration: '3 anni',
      description: 'Fondatore e lead developer di NATALI_AI, un trading system multi-AI con 3ms latency e quantum security.',
      skills: ['Python', 'TensorFlow', 'Quantitative'],
    },
    {
      id: 2,
      role: 'Personal Trainer & Entrepreneur',
      company: 'Self-employed',
      type: 'Full-time',
      period: '2019 - 2022',
      duration: '3 anni',
      description: 'Gestito business personale con 150+ ore/mese e CHF 100k+ fatturato annuo.',
      skills: ['Business', 'Sales', 'Management'],
    },
    {
      id: 3,
      role: 'Commercial Manager',
      company: 'BSL Agencies',
      type: 'Full-time',
      period: '2015 - 2019',
      duration: '4 anni',
      description: 'Gestione operazioni multimillion-euro in logistica internazionale (EU-Gulf).',
      skills: ['Negotiation', 'Logistics', 'P&L'],
    },
  ];

  const education = [
    {
      id: 1,
      degree: 'Self-Taught AI Engineer',
      school: 'Autodidatta',
      period: '2022 - Presente',
      description: 'Mastery in Python, Deep Learning, Algorithmic Trading, Quantum Computing',
    },
    {
      id: 2,
      degree: 'Maritime Economics',
      school: 'Università di Genova',
      period: '2010 - 2014',
      description: 'Studi in economia marittima e logistica internazionale',
    },
  ];

  const achievements = [
    { id: 1, title: 'World Championship Medalist', icon: '🥇', description: 'Kickboxing European Championships' },
    { id: 2, title: 'NATALI_AI Creator', icon: '🤖', description: 'Multi-AI trading system with quantum security' },
    { id: 3, title: '97.3% Fraud Detection', icon: '🛡️', description: 'FraudGNN-RL algorithm implementation' },
    { id: 4, title: '20h Work Ethic', icon: '⚡', description: 'Consistent high-performance execution' },
  ];

  const menuItems = [
    { id: 'cv', label: 'Il mio CV', icon: FileText, badge: null },
    { id: 'applications', label: 'Candidature', icon: Briefcase, badge: '8' },
    { id: 'saved', label: 'Offerte salvate', icon: Star, badge: '12' },
    { id: 'settings', label: 'Impostazioni', icon: Settings, badge: null },
  ];

  return (
    <div className="profile-screen">
      {/* Profile Header Card */}
      <motion.div 
        className="profile-header-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="profile-cover">
          <div className="cover-gradient" />
        </div>
        
        <div className="profile-info-section">
          <div className="profile-avatar-container">
            <div className="profile-avatar">
              <svg viewBox="0 0 100 100" className="avatar-svg">
                <circle cx="50" cy="50" r="48" fill="#3b82f6" />
                <circle cx="50" cy="40" r="20" fill="#ffdbac" />
                <path d="M20 80 Q50 65 80 80" stroke="#ffdbac" strokeWidth="10" fill="none" />
                <circle cx="42" cy="38" r="4" fill="#1e40af" />
                <circle cx="58" cy="38" r="4" fill="#1e40af" />
                <path d="M42 52 Q50 58 58 52" stroke="#dc2626" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            {user.verified && (
              <div className="verified-badge">
                <Zap size={12} />
              </div>
            )}
          </div>
          
          <div className="profile-text">
            <div className="profile-name-row">
              <h1 className="profile-name">{user.name}</h1>
              {user.premium && (
                <span className="premium-badge">PRO</span>
              )}
            </div>
            <p className="profile-title">{user.title}</p>
            <p className="profile-company">@ {user.company}</p>
            
            <div className="profile-location">
              <MapPin size={14} />
              <span>{user.location}</span>
            </div>
          </div>
          
          <motion.button 
            className="edit-profile-btn"
            whileTap={{ scale: 0.95 }}
          >
            <Edit2 size={16} />
          </motion.button>
        </div>

        {/* Profile Completion */}
        <div className="profile-completion">
          <div className="completion-header">
            <span className="completion-label">Profilo completato</span>
            <span className="completion-value">{profileCompletion}%</span>
          </div>
          <div className="completion-bar">
            <motion.div 
              className="completion-fill"
              initial={{ width: 0 }}
              animate={{ width: `${profileCompletion}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="completion-hint">
            Aggiungi competenze per raggiungere il 100%
          </p>
        </div>

        {/* Quick Actions */}
        <div className="profile-quick-actions">
          <motion.button 
            className="quick-action-btn"
            whileTap={{ scale: 0.95 }}
          >
            <Eye size={18} />
            <span>Preview</span>
          </motion.button>
          <motion.button 
            className="quick-action-btn"
            whileTap={{ scale: 0.95 }}
          >
            <Download size={18} />
            <span>Scarica CV</span>
          </motion.button>
          <motion.button 
            className="quick-action-btn"
            whileTap={{ scale: 0.95 }}
          >
            <Share2 size={18} />
            <span>Condividi</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="profile-stats-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className="profile-stat-card"
              whileHover={{ y: -3 }}
            >
              <Icon size={20} color="#a855f7" />
              <div>
                <span className="stat-value-large">{stat.value}</span>
                <span className="stat-label-small">{stat.label}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Menu Items */}
      <motion.div 
        className="profile-menu-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              className="profile-menu-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="menu-icon">
                <Icon size={20} />
              </div>
              <span className="menu-label">{item.label}</span>
              {item.badge && (
                <span className="menu-badge">{item.badge}</span>
              )}
              <ChevronRight size={18} className="menu-arrow" />
            </motion.button>
          );
        })}
      </motion.div>

      {/* Skills Section */}
      <motion.section 
        className="profile-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="section-header-with-action">
          <h2 className="section-title">Competenze</h2>
          <motion.button 
            className="btn-text"
            whileTap={{ scale: 0.95 }}
          >
            + Aggiungi
          </motion.button>
        </div>
        
        <div className="skills-list">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-level">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <motion.div 
                  className="skill-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                  style={{ 
                    background: skill.category === 'tech' 
                      ? 'linear-gradient(90deg, #00d4ff, #a855f7)' 
                      : 'linear-gradient(90deg, #00ff88, #00d4ff)'
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section 
        className="profile-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="section-header-with-action">
          <h2 className="section-title">Esperienza</h2>
          <motion.button 
            className="btn-text"
            whileTap={{ scale: 0.95 }}
          >
            + Aggiungi
          </motion.button>
        </div>
        
        <div className="experience-list">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="experience-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="experience-timeline">
                <div className="timeline-dot" />
                {index !== experience.length - 1 && <div className="timeline-line" />}
              </div>
              <div className="experience-content">
                <h4 className="experience-role">{exp.role}</h4>
                <p className="experience-company">{exp.company} • {exp.type}</p>
                <p className="experience-period">{exp.period} • {exp.duration}</p>
                <p className="experience-description">{exp.description}</p>
                <div className="experience-skills">
                  {exp.skills.map(skill => (
                    <span key={skill} className="exp-skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section 
        className="profile-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="section-header-with-action">
          <h2 className="section-title">Formazione</h2>
          <motion.button 
            className="btn-text"
            whileTap={{ scale: 0.95 }}
          >
            + Aggiungi
          </motion.button>
        </div>
        
        <div className="education-list">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              className="education-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="education-icon">
                <GraduationCap size={20} />
              </div>
              <div className="education-content">
                <h4 className="education-degree">{edu.degree}</h4>
                <p className="education-school">{edu.school}</p>
                <p className="education-period">{edu.period}</p>
                <p className="education-description">{edu.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Achievements Section */}
      <motion.section 
        className="profile-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="section-title">Achievement</h2>
        
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              className="achievement-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -3 }}
            >
              <div className="achievement-icon">{achievement.icon}</div>
              <h4 className="achievement-title">{achievement.title}</h4>
              <p className="achievement-desc">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        className="profile-section contact-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="section-title">Contatti</h2>
        
        <div className="contact-list">
          <div className="contact-item">
            <Mail size={18} color="#00d4ff" />
            <span>{user.email}</span>
          </div>
          <div className="contact-item">
            <Phone size={18} color="#00ff88" />
            <span>{user.phone}</span>
          </div>
          <div className="contact-item">
            <Globe size={18} color="#a855f7" />
            <span>{user.website}</span>
          </div>
        </div>
      </motion.section>

      {/* Premium Banner */}
      <motion.div 
        className="premium-banner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="premium-icon">
          <TrendingUp size={24} />
        </div>
        <div className="premium-content">
          <h4>Passa a PRO</h4>
          <p>Sblocca insights avanzati e priorità nelle candidature</p>
        </div>
        <motion.button 
          className="btn-primary btn-yellow btn-glossy btn-small"
          whileTap={{ scale: 0.95 }}
        >
          Scopri
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ProfileScreen;
