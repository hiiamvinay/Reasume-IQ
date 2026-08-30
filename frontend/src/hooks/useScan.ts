import { useState } from 'react';
import { createScan, getScanHistory } from '../services/scan';
import type { ScanResult } from '../types/resume';

export const useScan = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runScan = async (resumeId: string, jd: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createScan(resumeId, jd);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Scan failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await getScanHistory();
      return response.data as ScanResult[];
    } catch (err: any) {
      setError(err.message || 'Unable to fetch history');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { runScan, fetchHistory, loading, error };
};
