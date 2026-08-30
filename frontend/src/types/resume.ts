export interface Resume {
  id: string;
  filename: string;
  s3_key: string;
  extracted_text?: string;
  uploaded_at: string;
}

export interface ScanResult {
  id: string;
  job_title?: string;
  match_score: number;
  missing_keywords: string[];
  suggestions: string[];
  created_at: string;
}