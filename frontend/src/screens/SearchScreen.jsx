import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Briefcase, DollarSign, Heart, Filter, ChevronDown, X, Building2, Globe, Clock, Star } from 'lucide-react';
import './SearchScreen.css';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set());

  const filterCategories = [
    { id: 'type', label: 'Tipo contratto', options: ['Tutte', 'Full-time', 'Part-time', 'Stage', 'Freelance'] },
    { id: 'location', label: 'Location', options: ['Tutte', 'Remoto', 'Ibrido', 'On-site'] },
    { id: 'level', label: 'Livello', options: ['Tutti', 'Junior', 'Mid-level', 'Senior', 'Lead'] },
    { id: 'salary', label: 'Stipendio', options: ['Tutti', '< 30k', '30-60k', '60-100k', '> 100k'] },
  ];

  const jobs = [
    {
      id: 1,
      title: 'AI Architect',
      company: 'Goldman Sachs',
      location: 'Londra, UK',
      type: 'Full-time',
      workMode: 'Hybrid',
      salary: '€120k - €180k',
      level: 'Senior',
      postedAt: '2 giorni fa',
      rating: 4.8,
      logo: 'GS',
      color: '#6366f1',
      skills: ['Python', 'TensorFlow', 'Quantitative'],
    },
    {
      id: 2,
      title: 'Quantitative Researcher',
      company: 'Citadel',
      location: 'New York, USA',
      type: 'Full-time',
      workMode: 'On-site',
      salary: '$150k - $250k',
      level: 'Senior',
      postedAt: '1 giorno fa',
      rating: 4.9,
      logo: 'CT',
      color: '#00ff88',
      skills: ['C++', 'Python', 'Statistics'],
    },
    {
      id: 3,
      title: 'Senior AI Engineer',
      company: 'JP Morgan',
      location: 'Remoto',
      type: 'Full-time',
      workMode: 'Remote',
      salary: '€100k - €150k',
      level: 'Senior',
      postedAt: '3 giorni fa',
      rating: 4.7,
      logo: 'JP',
      color: '#a855f7',
      skills: ['PyTorch', 'MLOps', 'Cloud'],
    },
    {
      id: 4,
      title: 'Machine Learning Engineer',
      company: 'Google',
      location: 'Zurigo, CH',
      type: 'Full-time',
      workMode: 'Hybrid',
      salary: 'CHF 140k - 200k',
      level: 'Mid-level',
      postedAt: '5 giorni fa',
      rating: 4.9,
      logo: 'G',
      color: '#4285f4',
      skills: ['TensorFlow', 'Kubernetes', 'BigQuery'],
    },
    {
      id: 5,
      title: 'AI Research Scientist',
      company: 'DeepMind',
      location: 'Londra, UK',
      type: 'Full-time',
      workMode: 'Hybrid',
      salary: '£130k - £200k',
      level: 'Senior',
      postedAt: '1 settimana fa',
      rating: 5.0,
      logo: 'DM',
      color: '#00d4ff',
      skills: ['Research', 'PyTorch', 'Publications'],
    },
  ];

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  return (
    <div className="search-screen">
      {/* Search Header */}
      <div className="search-header">
        <div className="search-input-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Cerca lavoro, azienda o skill..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="clear-search"
              onClick={() => setSearchQuery('')}
            >
              <X size={18} />
            </button>
          )}
        </div>
        
        <motion.button 
          className={`filter-toggle ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
          whileTap={{ scale: 0.9 }}
        >
          <Filter size={20} />
          {activeFilters.length > 0 && (
            <span className="filter-badge">{activeFilters.length}</span>
          )}
        </motion.button>
      </div>

      {/* Quick Filters */}
      <div className="quick-filters">
        {['Tutte', 'Full-time', 'Part-time', 'Stage', 'Remoto'].map((filter, index) => (
          <motion.button
            key={filter}
            className={`quick-filter-chip ${activeFilters.includes(filter) ? 'active' : ''}`}
            onClick={() => {
              if (activeFilters.includes(filter)) {
                setActiveFilters(activeFilters.filter(f => f !== filter));
              } else {
                setActiveFilters([...activeFilters, filter]);
              }
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter}
          </motion.button>
        ))}
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="advanced-filters"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {filterCategories.map((category) => (
              <div key={category.id} className="filter-category">
                <label className="filter-label">{category.label}</label>
                <div className="filter-options">
                  {category.options.map((option) => (
                    <button
                      key={option}
                      className={`filter-option ${activeFilters.includes(option) ? 'active' : ''}`}
                      onClick={() => {
                        if (activeFilters.includes(option)) {
                          setActiveFilters(activeFilters.filter(f => f !== option));
                        } else {
                          setActiveFilters([...activeFilters, option]);
                        }
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="filter-actions">
              <button 
                className="btn-secondary"
                onClick={() => {
                  setActiveFilters([]);
                  setShowFilters(false);
                }}
              >
                Resetta filtri
              </button>
              <button 
                className="btn-primary btn-blue btn-glossy"
                onClick={() => setShowFilters(false)}
              >
                Applica filtri
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <div className="results-header">
        <span className="results-count">{jobs.length} offerte trovate</span>
        <div className="sort-dropdown">
          <span>Ordina per:</span>
          <button className="sort-btn">
            Più recenti <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Job List */}
      <div className="search-results">
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            className="job-result-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -3 }}
          >
            <div className="job-result-header">
              <div 
                className="job-result-logo"
                style={{ background: job.color }}
              >
                {job.logo}
              </div>
              <div className="job-result-meta">
                <h3 className="job-result-title">{job.title}</h3>
                <div className="job-result-company">
                  <Building2 size={14} />
                  <span>{job.company}</span>
                </div>
              </div>
              <motion.button 
                className={`save-btn ${savedJobs.has(job.id) ? 'saved' : ''}`}
                onClick={() => toggleSaveJob(job.id)}
                whileTap={{ scale: 0.8 }}
              >
                <Heart 
                  size={22} 
                  fill={savedJobs.has(job.id) ? '#ff3366' : 'none'}
                  color={savedJobs.has(job.id) ? '#ff3366' : 'rgba(255, 255, 255, 0.5)'}
                />
              </motion.button>
            </div>

            <div className="job-result-details">
              <div className="job-result-detail">
                <MapPin size={14} />
                <span>{job.location}</span>
              </div>
              <div className="job-result-detail">
                <Briefcase size={14} />
                <span>{job.type}</span>
              </div>
              <div className="job-result-detail">
                <Globe size={14} />
                <span>{job.workMode}</span>
              </div>
              <div className="job-result-detail">
                <DollarSign size={14} />
                <span>{job.salary}</span>
              </div>
              <div className="job-result-detail">
                <Clock size={14} />
                <span>{job.postedAt}</span>
              </div>
              <div className="job-result-detail rating">
                <Star size={14} fill="#ffcc00" color="#ffcc00" />
                <span>{job.rating}</span>
              </div>
            </div>

            <div className="job-result-skills">
              {job.skills.map((skill) => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>

            <div className="job-result-actions">
              <motion.button 
                className="btn-primary btn-green btn-glossy"
                whileTap={{ scale: 0.95 }}
              >
                Candidati ora
              </motion.button>
              <motion.button 
                className="btn-secondary btn-outline-blue"
                whileTap={{ scale: 0.95 }}
              >
                Dettagli
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="load-more">
        <motion.button 
          className="btn-secondary btn-outline-purple"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Carica altre offerte
        </motion.button>
      </div>
    </div>
  );
};

export default SearchScreen;
