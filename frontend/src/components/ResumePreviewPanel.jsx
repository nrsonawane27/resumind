import { useState } from "react";
import { 
  EyeIcon, 
  PencilIcon, 
  CheckIcon,
  XMarkIcon,
  DocumentTextIcon
} from "@heroicons/react/24/outline";

export default function ResumePreviewPanel({ analysis }) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [editableContent, setEditableContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Mock resume content - in real app, this would come from the backend
  const mockResumeContent = `
John Doe
Software Engineer
john.doe@email.com | (555) 123-4567 | LinkedIn: linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Experienced software engineer with 5+ years developing web applications using React, Node.js, and JavaScript. Led cross-functional teams and improved system performance by 40%.

TECHNICAL SKILLS
• JavaScript, Python, React, Node.js
• Database design and optimization
• Agile development methodologies
• Version control (Git)
• Cloud platforms (AWS, Azure)

EXPERIENCE
Software Engineer | Tech Corp | 2020-2023
• Developed web applications using React and Node.js
• Led a team of 3 developers on multiple projects
• Improved system performance by 40% through optimization
• Collaborated with product managers and designers

Junior Developer | StartupXYZ | 2018-2020
• Built responsive web interfaces using modern frameworks
• Participated in agile development processes
• Contributed to code reviews and testing

EDUCATION
Bachelor of Computer Science
University of Technology | 2016-2020
GPA: 3.8/4.0

PROJECTS
• E-commerce Platform: Built full-stack application serving 10k+ users
• Task Management App: Developed using React and Node.js
• Data Visualization Tool: Created interactive dashboards
`;

  const handleEdit = () => {
    setIsEditing(true);
    setEditableContent(mockResumeContent);
  };

  const handleSave = () => {
    setIsEditing(false);
    // In real app, this would save to backend
    console.log("Saving edited content:", editableContent);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditableContent("");
  };

  if (!analysis) {
    return (
      <section className="bg-white rounded-xl shadow-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <EyeIcon className="h-5 w-5 text-purple-500" />
          <h2 className="text-[15px] font-semibold">Resume Preview</h2>
        </div>
        <div className="text-center py-8">
          <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <p className="text-sm text-gray-500">
            Complete analysis to preview your tailored resume
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-xl shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <EyeIcon className="h-5 w-5 text-purple-500" />
          <h2 className="text-[15px] font-semibold">Resume Preview</h2>
        </div>
        <div className="flex gap-2">
          {!isPreviewMode ? (
            <button
              onClick={() => setIsPreviewMode(true)}
              className="bg-purple-600 text-white px-3 py-1 rounded-md text-xs font-semibold
                         hover:opacity-90 flex items-center gap-1"
            >
              <EyeIcon className="h-3 w-3" />
              Preview
            </button>
          ) : (
            <button
              onClick={() => setIsPreviewMode(false)}
              className="bg-gray-600 text-white px-3 py-1 rounded-md text-xs font-semibold
                         hover:opacity-90"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {isPreviewMode && (
        <div className="space-y-4">
          {/* Preview Header */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-3 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-purple-900">Tailored Resume Preview</h3>
                <p className="text-xs text-purple-700">
                  Based on analysis of job description
                </p>
              </div>
              <div className="flex gap-2">
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="bg-purple-600 text-white px-3 py-1 rounded-md text-xs font-semibold
                               hover:opacity-90 flex items-center gap-1"
                  >
                    <PencilIcon className="h-3 w-3" />
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-1">
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold
                                 hover:opacity-90 flex items-center gap-1"
                    >
                      <CheckIcon className="h-3 w-3" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold
                                 hover:opacity-90 flex items-center gap-1"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Resume Content */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            {isEditing ? (
              <textarea
                value={editableContent}
                onChange={(e) => setEditableContent(e.target.value)}
                className="w-full h-96 p-3 text-sm font-mono bg-white border border-gray-300 rounded
                           focus:outline-none focus:ring-2 focus:ring-purple-500/30 resize-none"
                placeholder="Edit your resume content here..."
              />
            ) : (
              <div className="text-sm font-mono whitespace-pre-line text-gray-800 leading-relaxed">
                {mockResumeContent}
              </div>
            )}
          </div>

          {/* Preview Actions */}
          <div className="flex gap-3 pt-2">
            <button
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold
                         hover:opacity-90 flex items-center justify-center gap-2"
            >
              <DocumentTextIcon className="h-4 w-4" />
              Download DOCX
            </button>
            <button
              className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-semibold
                         hover:opacity-95 flex items-center justify-center gap-2"
            >
              <DocumentTextIcon className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        </div>
      )}

      {!isPreviewMode && (
        <div className="text-center py-6">
          <EyeIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">
            Click "Preview" to see your tailored resume
          </p>
        </div>
      )}
    </section>
  );
}
