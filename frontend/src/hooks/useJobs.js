import { useState, useEffect, useCallback } from 'react';
import { jobService } from '../services/api';

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const searchJobs = useCallback(async (query, filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobService.searchJobs(query, filters, 1);
      setJobs(data.jobs);
      setHasMore(data.hasMore);
      setPage(1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(async (query, filters = {}) => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const nextPage = page + 1;
      const data = await jobService.searchJobs(query, filters, nextPage);
      setJobs(prev => [...prev, ...data.jobs]);
      setHasMore(data.hasMore);
      setPage(nextPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  const saveJob = useCallback(async (jobId) => {
    try {
      await jobService.saveJob(jobId);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, []);

  const unsaveJob = useCallback(async (jobId) => {
    try {
      await jobService.unsaveJob(jobId);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, []);

  const applyToJob = useCallback(async (jobId, applicationData) => {
    try {
      await jobService.applyForJob(jobId, applicationData);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, []);

  return {
    jobs,
    loading,
    error,
    hasMore,
    searchJobs,
    loadMore,
    saveJob,
    unsaveJob,
    applyToJob,
  };
}

export function useFeaturedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await jobService.getFeaturedJobs();
        setJobs(data.jobs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return { jobs, loading, error };
}

export function useSavedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSavedJobs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await jobService.getSavedJobs();
      setJobs(data.jobs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSavedJobs();
  }, [fetchSavedJobs]);

  return { jobs, loading, error, refetch: fetchSavedJobs };
}
