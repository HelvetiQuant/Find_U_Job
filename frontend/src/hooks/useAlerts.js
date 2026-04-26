import { useState, useEffect, useCallback } from 'react';
import { alertService } from '../services/api';

export function useAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await alertService.getAlerts();
      setAlerts(data.alerts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createAlert = useCallback(async (alertData) => {
    setLoading(true);
    try {
      const data = await alertService.createAlert(alertData);
      setAlerts(prev => [...prev, data.alert]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAlert = useCallback(async (alertId) => {
    try {
      await alertService.deleteAlert(alertId);
      setAlerts(prev => prev.filter(a => a.id !== alertId));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  return {
    alerts,
    loading,
    error,
    createAlert,
    deleteAlert,
    refetch: fetchAlerts,
  };
}
