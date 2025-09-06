import { useState } from "react";
import { analyzeResume } from "../lib/api";
import toast from "react-hot-toast";
import { DocumentTextIcon, SparklesIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

export default function JobDescPanel({ resumeId, onAnalyzed }) {
  const [jobTitle, setJobTitle] = useState("");
  const [jd, setJd] = useState("");
  const [busy, setBusy] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  const run = async () => {
    if (!resumeId) return toast.error("Upload a resume first.");
    if (!jd.trim()) return toast.error("Paste a job description.");
    setBusy(true);
    try {
      const data = await analyzeResume(resumeId, jd, jobTitle);
      onAnalyzed(data);
      setAnalyzed(true);
      setAnalysisData(data);
      toast.success("Job description analyzed successfully!");
    } catch (e) {
      toast.error(e?.response?.data?.detail || "Analysis failed");
    } finally { setBusy(false); }
  };

  const handlePaste = (e) => {
    // Clear previous analysis when new content is pasted
    if (analyzed) {
      setAnalyzed(false);
      setAnalysisData(null);
      onAnalyzed(null);
    }
  };

  return (
    <section className="bg-white rounded-xl shadow-card p-5">
      <div className="flex items-center gap-2 mb-3">
        <DocumentTextIcon className="h-5 w-5 text-emerald-600" />
        <h2 className="text-[15px] font-semibold">Job Description</h2>
        {analyzed && <SparklesIcon className="h-5 w-5 text-emerald-500" />}
      </div>
      
      {analyzed && analysisData && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-md">
          <p className="text-sm text-emerald-800">
            ✅ Job description analyzed successfully!
          </p>
          <p className="text-xs text-emerald-600 mt-1">
            Found {analysisData.matched_keywords?.length || 0} matched keywords and {analysisData.missing_keywords?.length || 0} missing keywords.
          </p>
        </div>
      )}
      
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Target Job Title (optional)
          </label>
          <input
            value={jobTitle}
            onChange={(e)=>setJobTitle(e.target.value)}
            placeholder="e.g., Software Engineer, Product Manager"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Job Description
          </label>
          <textarea
            rows={8}
            value={jd}
            onChange={(e)=>setJd(e.target.value)}
            onPaste={handlePaste}
            placeholder="Paste the complete job description here... Include requirements, responsibilities, and qualifications."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-emerald-500/30
                       resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            💡 Tip: Copy and paste the entire job posting for best results
          </p>
        </div>
        
        <button
          onClick={run}
          disabled={busy || !resumeId || !jd.trim()}
          className="w-full bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-semibold
                     hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
        >
          {busy ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Analyzing Job Description...
            </>
          ) : (
            <>
              <ClipboardDocumentListIcon className="h-4 w-4" />
              Analyze Job Description
            </>
          )}
        </button>
      </div>
    </section>
  );
}
