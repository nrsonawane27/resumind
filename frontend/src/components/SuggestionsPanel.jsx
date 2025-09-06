import { downloadTailored } from "../lib/api";
import { 
  LightBulbIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  ArrowDownTrayIcon,
  EyeIcon
} from "@heroicons/react/24/outline";

const Chip = ({children, type = "default"}) => {
  const baseClasses = "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium";
  const typeClasses = {
    matched: "bg-green-100 text-green-800 border border-green-200",
    missing: "bg-red-100 text-red-800 border border-red-200",
    default: "bg-gray-100 text-slate-700"
  };
  
  return (
    <span className={`${baseClasses} ${typeClasses[type]}`}>
      {children}
    </span>
  );
};

export default function SuggestionsPanel({ analysis }) {
  if (!analysis) {
    return (
      <section className="bg-white rounded-xl shadow-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <LightBulbIcon className="h-5 w-5 text-amber-500" />
          <h2 className="text-[15px] font-semibold">Analysis Results</h2>
        </div>
        <div className="text-center py-8">
          <LightBulbIcon className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <p className="text-sm text-gray-500">
            Upload a resume and analyze a job description to see tailored suggestions
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="bg-white rounded-xl shadow-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <LightBulbIcon className="h-5 w-5 text-amber-500" />
        <h2 className="text-[15px] font-semibold">Analysis Results</h2>
        <CheckCircleIcon className="h-5 w-5 text-green-500" />
      </div>

      <div className="space-y-6">
        {/* Analysis Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">📊 Analysis Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="h-4 w-4 text-green-600" />
              <span className="text-green-700">
                <strong>{analysis.matched_keywords?.length || 0}</strong> matched keywords
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />
              <span className="text-red-700">
                <strong>{analysis.missing_keywords?.length || 0}</strong> missing keywords
              </span>
            </div>
          </div>
        </div>

        {/* Matched Keywords */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircleIcon className="h-4 w-4 text-green-600" />
            <div className="text-sm font-semibold text-green-800">Matched Keywords</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.matched_keywords?.length
              ? analysis.matched_keywords.map((k,i)=><Chip key={i} type="matched">{k}</Chip>)
              : <span className="text-sm text-gray-500 italic">No keywords matched yet</span>}
          </div>
        </div>

        {/* Missing Keywords */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />
            <div className="text-sm font-semibold text-red-800">Missing Keywords</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.missing_keywords?.length
              ? analysis.missing_keywords.slice(0, 10).map((k,i)=><Chip key={i} type="missing">{k}</Chip>)
              : <span className="text-sm text-gray-500 italic">All keywords matched!</span>}
            {analysis.missing_keywords?.length > 10 && (
              <span className="text-xs text-gray-500 italic">
                +{analysis.missing_keywords.length - 10} more...
              </span>
            )}
          </div>
        </div>

        {/* Suggestions */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <div className="flex items-center gap-2 mb-3">
              <LightBulbIcon className="h-4 w-4 text-amber-600" />
              <div className="text-sm font-semibold text-amber-800">Add to Resume</div>
            </div>
            <ul className="space-y-2">
              {analysis.suggestions?.add?.slice(0, 5).map((s,i)=>(
                <li key={i} className="text-xs text-amber-700 flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircleIcon className="h-4 w-4 text-blue-600" />
              <div className="text-sm font-semibold text-blue-800">Emphasize</div>
            </div>
            <ul className="space-y-2">
              {analysis.suggestions?.emphasize?.slice(0, 5).map((s,i)=>(
                <li key={i} className="text-xs text-blue-700 flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Download Actions */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <ArrowDownTrayIcon className="h-4 w-4 text-gray-600" />
            <div className="text-sm font-semibold text-gray-800">Download Tailored Resume</div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={()=>downloadTailored(analysis.analysis_id, "docx")}
              className="flex-1 bg-brandBlue text-white px-4 py-2 rounded-md text-sm font-semibold 
                         hover:opacity-90 flex items-center justify-center gap-2"
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
              Download DOCX
            </button>
            <button
              onClick={()=>downloadTailored(analysis.analysis_id, "pdf")}
              className="flex-1 bg-slate-800 text-white px-4 py-2 rounded-md text-sm font-semibold 
                         hover:opacity-95 flex items-center justify-center gap-2"
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
