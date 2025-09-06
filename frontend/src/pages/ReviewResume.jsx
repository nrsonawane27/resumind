import { useState } from "react";
import AppShell from "../layout/AppShell";
import { 
  DocumentTextIcon, 
  ShieldCheckIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  StarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";

const ResumeCard = ({ resume, onPreview, onEdit, onDelete, onDownload, onCheckATS }) => {
  const [atsScore, setAtsScore] = useState(null);
  const [isCheckingATS, setIsCheckingATS] = useState(false);

  const handleCheckATS = async () => {
    setIsCheckingATS(true);
    // Simulate ATS check
    setTimeout(() => {
      setAtsScore(Math.floor(Math.random() * 40) + 60); // Random score between 60-100
      setIsCheckingATS(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-card p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{resume.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{resume.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Uploaded: {resume.uploaded}</span>
            <span>Size: {resume.size}</span>
            <span>Format: {resume.format}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onPreview(resume)}
            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
            title="Preview"
          >
            <EyeIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onEdit(resume)}
            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
            title="Edit"
          >
            <PencilSquareIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDownload(resume)}
            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            title="Download"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(resume)}
            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            title="Delete"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ATS Score Section */}
      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-semibold text-gray-900">ATS Compliance Score</span>
          </div>
          {atsScore && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm font-bold ${
              atsScore >= 80 ? 'bg-green-100 text-green-800' :
              atsScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              <StarIcon className="h-4 w-4" />
              {atsScore}%
            </div>
          )}
        </div>
        
        {!atsScore ? (
          <button
            onClick={handleCheckATS}
            disabled={isCheckingATS}
            className="w-full bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isCheckingATS ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Checking ATS...
              </>
            ) : (
              <>
                <ShieldCheckIcon className="h-4 w-4" />
                Check ATS Compliance
              </>
            )}
          </button>
        ) : (
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  atsScore >= 80 ? 'bg-green-500' :
                  atsScore >= 60 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${atsScore}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600">
              {atsScore >= 80 ? 'Excellent ATS compatibility' :
               atsScore >= 60 ? 'Good ATS compatibility' :
               'Needs improvement for ATS compatibility'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ATSRecommendations = () => {
  const recommendations = [
    {
      type: 'success',
      title: 'Keyword Optimization',
      description: 'Your resume contains relevant keywords from your target job descriptions.',
      icon: CheckCircleIcon
    },
    {
      type: 'warning',
      title: 'Format Consistency',
      description: 'Consider using consistent formatting for dates and job titles.',
      icon: ExclamationTriangleIcon
    },
    {
      type: 'success',
      title: 'Contact Information',
      description: 'All required contact information is present and properly formatted.',
      icon: CheckCircleIcon
    },
    {
      type: 'error',
      title: 'File Format',
      description: 'Consider saving as a .docx file for better ATS compatibility.',
      icon: XCircleIcon
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheckIcon className="h-5 w-5 text-purple-600" />
        <h2 className="text-lg font-semibold">ATS Recommendations</h2>
      </div>
      
      <div className="space-y-3">
        {recommendations.map((rec, index) => {
          const Icon = rec.icon;
          return (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100">
              <Icon className={`h-5 w-5 mt-0.5 ${
                rec.type === 'success' ? 'text-green-500' :
                rec.type === 'warning' ? 'text-yellow-500' :
                'text-red-500'
              }`} />
              <div>
                <h4 className="text-sm font-semibold text-gray-900">{rec.title}</h4>
                <p className="text-xs text-gray-600">{rec.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function ReviewResume() {
  // Mock resume data
  const mockResumes = [
    {
      id: 1,
      title: "Software Engineer Resume",
      description: "My main resume for software engineering positions",
      uploaded: "2 days ago",
      size: "245 KB",
      format: "PDF"
    },
    {
      id: 2,
      title: "Product Manager Resume",
      description: "Tailored for product management roles",
      uploaded: "1 week ago",
      size: "198 KB",
      format: "DOCX"
    },
    {
      id: 3,
      title: "Senior Developer Resume",
      description: "Updated resume for senior-level positions",
      uploaded: "3 days ago",
      size: "312 KB",
      format: "PDF"
    }
  ];

  const handlePreview = (resume) => {
    alert(`Previewing: ${resume.title}`);
  };

  const handleEdit = (resume) => {
    alert(`Editing: ${resume.title}`);
  };

  const handleDelete = (resume) => {
    if (confirm(`Are you sure you want to delete "${resume.title}"?`)) {
      alert(`Deleted: ${resume.title}`);
    }
  };

  const handleDownload = (resume) => {
    alert(`Downloading: ${resume.title}`);
  };

  const handleCheckATS = (resume) => {
    alert(`Checking ATS for: ${resume.title}`);
  };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Review My Resume</h1>
          <p className="text-gray-600">
            Review your uploaded resumes, check ATS compliance, and get suggestions for improvement.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resume List */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <DocumentTextIcon className="h-5 w-5 text-brandBlue" />
                <h2 className="text-lg font-semibold">My Resumes ({mockResumes.length})</h2>
              </div>
              
              <div className="space-y-4">
                {mockResumes.map(resume => (
                  <ResumeCard
                    key={resume.id}
                    resume={resume}
                    onPreview={handlePreview}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onDownload={handleDownload}
                    onCheckATS={handleCheckATS}
                  />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <button className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                  <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                  <div className="text-left">
                    <div className="font-semibold text-blue-900">Upload New Resume</div>
                    <div className="text-sm text-blue-700">Add another resume to your collection</div>
                  </div>
                </button>
                
                <button className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                  <ShieldCheckIcon className="h-6 w-6 text-green-600" />
                  <div className="text-left">
                    <div className="font-semibold text-green-900">Bulk ATS Check</div>
                    <div className="text-sm text-green-700">Check all resumes at once</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ATSRecommendations />
            
            {/* Tips */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Resume Review Tips</h3>
              <ul className="space-y-3 text-sm text-amber-800">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Use action verbs to start bullet points</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Quantify achievements with numbers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Keep formatting simple and consistent</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Tailor content for each job application</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
