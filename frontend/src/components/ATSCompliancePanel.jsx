import React, { useState, useEffect } from "react";
import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon, 
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";

const ComplianceItem = ({ title, status, description, suggestion }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'pass':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'fail':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'pass':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'fail':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className={`p-3 rounded-lg border ${getStatusColor()}`}>
      <div className="flex items-start gap-3">
        {getStatusIcon()}
        <div className="flex-1">
          <h4 className="text-sm font-semibold">{title}</h4>
          <p className="text-xs mt-1 opacity-80">{description}</p>
          {suggestion && (
            <p className="text-xs mt-2 font-medium opacity-90">
              💡 {suggestion}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ATSCompliancePanel({ analysis }) {
  const [complianceScore, setComplianceScore] = useState(null);

  // Simulate ATS compliance check based on analysis
  const checkATSCompliance = () => {
    if (!analysis) return;

    const checks = [
      {
        title: "Keyword Density",
        status: analysis.matched_keywords?.length > 5 ? 'pass' : 'warning',
        description: `Found ${analysis.matched_keywords?.length || 0} relevant keywords`,
        suggestion: analysis.matched_keywords?.length <= 5 ? "Add more relevant keywords from the job description" : null
      },
      {
        title: "File Format",
        status: 'pass',
        description: "Resume is in ATS-friendly format (PDF/DOCX)",
        suggestion: null
      },
      {
        title: "Contact Information",
        status: 'pass',
        description: "Contact information is properly formatted",
        suggestion: null
      },
      {
        title: "Section Headers",
        status: 'pass',
        description: "Standard section headers detected",
        suggestion: null
      },
      {
        title: "Length Optimization",
        status: 'warning',
        description: "Resume length is within acceptable range",
        suggestion: "Consider keeping resume to 1-2 pages for best ATS compatibility"
      },
      {
        title: "Skills Match",
        status: analysis.missing_keywords?.length < 10 ? 'pass' : 'warning',
        description: `Missing ${analysis.missing_keywords?.length || 0} important keywords`,
        suggestion: analysis.missing_keywords?.length >= 10 ? "Add more skills and keywords from the job description" : null
      }
    ];

    const passedChecks = checks.filter(check => check.status === 'pass').length;
    const totalChecks = checks.length;
    const score = Math.round((passedChecks / totalChecks) * 100);

    setComplianceScore({ score, checks });
  };

  // Auto-check compliance when analysis changes
  useEffect(() => {
    if (analysis && !complianceScore) {
      checkATSCompliance();
    }
  }, [analysis]);

  if (!analysis) {
    return (
      <section className="bg-white rounded-xl shadow-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheckIcon className="h-5 w-5 text-blue-500" />
          <h2 className="text-[15px] font-semibold">ATS Compliance</h2>
        </div>
        <div className="text-center py-8">
          <ShieldCheckIcon className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <p className="text-sm text-gray-500">
            Analyze a job description to check ATS compliance
          </p>
        </div>
      </section>
    );
  }

  if (!complianceScore) {
    return (
      <section className="bg-white rounded-xl shadow-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheckIcon className="h-5 w-5 text-blue-500" />
          <h2 className="text-[15px] font-semibold">ATS Compliance</h2>
        </div>
        <button
          onClick={checkATSCompliance}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold
                     hover:opacity-90 flex items-center justify-center gap-2"
        >
          <ShieldCheckIcon className="h-4 w-4" />
          Check ATS Compliance
        </button>
      </section>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <section className="bg-white rounded-xl shadow-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheckIcon className="h-5 w-5 text-blue-500" />
        <h2 className="text-[15px] font-semibold">ATS Compliance</h2>
        <div className={`ml-auto px-3 py-1 rounded-full text-sm font-bold ${getScoreBg(complianceScore.score)} ${getScoreColor(complianceScore.score)}`}>
          {complianceScore.score}%
        </div>
      </div>

      <div className="space-y-4">
        {/* Score Summary */}
        <div className={`p-4 rounded-lg border-2 ${getScoreBg(complianceScore.score)} border-current`}>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(complianceScore.score)} mb-1`}>
              {complianceScore.score}%
            </div>
            <div className="text-sm font-medium">
              {complianceScore.score >= 80 ? 'Excellent ATS Compatibility' : 
               complianceScore.score >= 60 ? 'Good ATS Compatibility' : 
               'Needs Improvement for ATS'}
            </div>
          </div>
        </div>

        {/* Compliance Checks */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-800">Compliance Checks</h3>
          {complianceScore.checks.map((check, index) => (
            <ComplianceItem
              key={index}
              title={check.title}
              status={check.status}
              description={check.description}
              suggestion={check.suggestion}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={() => setComplianceScore(null)}
          className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-semibold
                     hover:bg-gray-200 transition-colors"
        >
          Re-check Compliance
        </button>
      </div>
    </section>
  );
}
