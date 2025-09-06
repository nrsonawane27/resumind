import { useState } from "react";
import AppShell from "../layout/AppShell";
import UploadPanel from "../components/UploadPanel";
import JobDescPanel from "../components/JobDescPanel";
import SuggestionsPanel from "../components/SuggestionsPanel";
import ATSCompliancePanel from "../components/ATSCompliancePanel";
import ResumePreviewPanel from "../components/ResumePreviewPanel";

export default function Create() {
  const [resumeId, setResumeId] = useState("");
  const [analysis, setAnalysis] = useState(null);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Tailored Resume</h1>
          <p className="text-gray-600">
            Upload your resume, analyze a job description, and get personalized suggestions to optimize your application.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Main Workflow */}
          <div className="space-y-6 lg:col-span-2">
            <UploadPanel onUploaded={setResumeId} />
            <JobDescPanel resumeId={resumeId} onAnalyzed={setAnalysis} />
            <SuggestionsPanel analysis={analysis} />
          </div>
          
          {/* Right Column - Analysis & Tools */}
          <div className="space-y-6 lg:col-span-1">
            <ATSCompliancePanel analysis={analysis} />
            <ResumePreviewPanel analysis={analysis} />
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 bg-white rounded-xl shadow-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                resumeId ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                1
              </div>
              <span className="text-sm font-medium">Upload Resume</span>
            </div>
            
            <div className="flex-1 h-1 bg-gray-200 mx-4">
              <div className={`h-full transition-all duration-300 ${
                resumeId ? 'bg-green-500' : 'bg-gray-200'
              }`} style={{ width: resumeId ? '100%' : '0%' }}></div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                analysis ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <span className="text-sm font-medium">Analyze Job</span>
            </div>
            
            <div className="flex-1 h-1 bg-gray-200 mx-4">
              <div className={`h-full transition-all duration-300 ${
                analysis ? 'bg-green-500' : 'bg-gray-200'
              }`} style={{ width: analysis ? '100%' : '0%' }}></div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                analysis ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                3
              </div>
              <span className="text-sm font-medium">Download</span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
