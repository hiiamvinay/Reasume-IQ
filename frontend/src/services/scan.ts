import api from './api';
import type { ScanResult } from '../types/resume';

export const createScan = (resumeId: string, jobDescription: string) =>
  api.post<ScanResult>('/scans', { resume_id: resumeId, job_description: jobDescription });

export const getScanHistory = () =>
  api.get<ScanResult[]>('/scans');

export const getScanDetails = (scanId: string) =>
  api.get<ScanResult>(`/scans/${scanId}`);
