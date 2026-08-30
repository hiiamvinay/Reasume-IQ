import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import FileUpload from '../components/FileUpload';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useScan } from '../hooks/useScan';
import { uploadResume } from '../services/resume';

const NewScan: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { runScan } = useScan();

  const handleFileSelect = async (file: File) => {
    setResumeFile(file);
    try {
      const response = await uploadResume(file);
      setResumeId(response.data.id);
    } catch (err) {
      alert('Upload failed');
      console.error(err);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeId || !jobDescription.trim()) {
      alert('Please upload a resume and paste a job description.');
      return;
    }

    setLoading(true);
    try {
      const result = await runScan(resumeId, jobDescription);
      navigate('/results', { state: { scanResult: result } });
    } catch (err) {
      alert('Analysis failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar />
        <main className="mx-auto max-w-4xl flex-1 overflow-y-auto p-8">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-3xl font-bold text-white mb-2">New Resume Analysis</h1>
            <p className="text-gray-400">Follow these steps to analyze your resume against a job description</p>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {/* Step 1: Upload Resume */}
            <div className="glass-card-dark p-8 border-l-4 border-blue-500 hover:border-blue-400 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg text-white font-bold">
                  1
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Upload Your Resume</h2>
                  <p className="text-gray-400 text-sm mt-1">PDF or Word document</p>
                </div>
              </div>
              <FileUpload onFileSelect={handleFileSelect} />
              {resumeFile && (
                <div className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  <div>
                    <p className="text-green-300 font-semibold text-sm">{resumeFile.name}</p>
                    <p className="text-green-300/70 text-xs">Ready to analyze</p>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Job Description */}
            <div className="glass-card-dark p-8 border-l-4 border-purple-500 hover:border-purple-400 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white font-bold">
                  2
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Paste Job Description</h2>
                  <p className="text-gray-400 text-sm mt-1">Copy the full job posting</p>
                </div>
              </div>
              <textarea
                rows={10}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full rounded-lg bg-gray-800/50 border border-gray-600 p-4 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
              />
              <div className="mt-3 text-right text-xs text-gray-500">
                {jobDescription.length} characters
              </div>
            </div>

            {/* Step 3: Analyze */}
            <div className="glass-card-dark p-8 border-l-4 border-green-500 hover:border-green-400 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg text-white font-bold">
                  3
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Analyze</h2>
                  <p className="text-gray-400 text-sm mt-1">Our AI will compare and provide insights</p>
                </div>
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={!resumeId || !jobDescription.trim() || loading}
                variant="gradient"
                size="lg"
                className="w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Analyzing...
                  </span>
                ) : (
                  '🚀 Start Analysis'
                )}
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewScan;
