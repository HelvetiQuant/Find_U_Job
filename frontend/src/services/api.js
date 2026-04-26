// API Service for Find U Job App
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.findujob.com/v1';

// Job Service
export const jobService = {
  // Search jobs with filters
  async searchJobs(query, filters = {}, page = 1, limit = 20) {
    const params = new URLSearchParams({
      q: query,
      page: page.toString(),
      limit: limit.toString(),
      ...filters
    });
    
    const response = await fetch(`${API_BASE_URL}/jobs/search?${params}`);
    if (!response.ok) throw new Error('Failed to search jobs');
    return response.json();
  },

  // Get featured jobs
  async getFeaturedJobs(limit = 10) {
    const response = await fetch(`${API_BASE_URL}/jobs/featured?limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch featured jobs');
    return response.json();
  },

  // Get job by ID
  async getJobById(jobId) {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`);
    if (!response.ok) throw new Error('Failed to fetch job');
    return response.json();
  },

  // Apply for job
  async applyForJob(jobId, applicationData) {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applicationData),
    });
    if (!response.ok) throw new Error('Failed to apply for job');
    return response.json();
  },

  // Save job
  async saveJob(jobId) {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/save`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to save job');
    return response.json();
  },

  // Unsave job
  async unsaveJob(jobId) {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/save`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to unsave job');
    return response.json();
  },

  // Get saved jobs
  async getSavedJobs() {
    const response = await fetch(`${API_BASE_URL}/jobs/saved`);
    if (!response.ok) throw new Error('Failed to fetch saved jobs');
    return response.json();
  },

  // Get job recommendations
  async getRecommendations() {
    const response = await fetch(`${API_BASE_URL}/jobs/recommendations`);
    if (!response.ok) throw new Error('Failed to fetch recommendations');
    return response.json();
  },
};

// User Service
export const userService = {
  // Get user profile
  async getProfile() {
    const response = await fetch(`${API_BASE_URL}/user/profile`);
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
  },

  // Update profile
  async updateProfile(profileData) {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
  },

  // Upload CV
  async uploadCV(file) {
    const formData = new FormData();
    formData.append('cv', file);
    
    const response = await fetch(`${API_BASE_URL}/user/cv`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to upload CV');
    return response.json();
  },

  // Get applications
  async getApplications() {
    const response = await fetch(`${API_BASE_URL}/user/applications`);
    if (!response.ok) throw new Error('Failed to fetch applications');
    return response.json();
  },

  // Get notifications
  async getNotifications() {
    const response = await fetch(`${API_BASE_URL}/user/notifications`);
    if (!response.ok) throw new Error('Failed to fetch notifications');
    return response.json();
  },

  // Mark notification as read
  async markNotificationRead(notificationId) {
    const response = await fetch(`${API_BASE_URL}/user/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
    if (!response.ok) throw new Error('Failed to mark notification as read');
    return response.json();
  },
};

// Job Alert Service
export const alertService = {
  // Get job alerts
  async getAlerts() {
    const response = await fetch(`${API_BASE_URL}/alerts`);
    if (!response.ok) throw new Error('Failed to fetch alerts');
    return response.json();
  },

  // Create job alert
  async createAlert(alertData) {
    const response = await fetch(`${API_BASE_URL}/alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alertData),
    });
    if (!response.ok) throw new Error('Failed to create alert');
    return response.json();
  },

  // Delete job alert
  async deleteAlert(alertId) {
    const response = await fetch(`${API_BASE_URL}/alerts/${alertId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete alert');
    return response.json();
  },
};

// AI Matching Service
export const aiService = {
  // Get AI-powered job matches
  async getMatches() {
    const response = await fetch(`${API_BASE_URL}/ai/matches`);
    if (!response.ok) throw new Error('Failed to fetch AI matches');
    return response.json();
  },

  // Get skill suggestions
  async getSkillSuggestions() {
    const response = await fetch(`${API_BASE_URL}/ai/skills/suggestions`);
    if (!response.ok) throw new Error('Failed to fetch skill suggestions');
    return response.json();
  },

  // Analyze CV
  async analyzeCV(cvText) {
    const response = await fetch(`${API_BASE_URL}/ai/cv/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cvText }),
    });
    if (!response.ok) throw new Error('Failed to analyze CV');
    return response.json();
  },
};

export default {
  jobService,
  userService,
  alertService,
  aiService,
};
