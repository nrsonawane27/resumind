import { useState } from "react";
import AppShell from "../layout/AppShell";
import { 
  DocumentTextIcon, 
  ArrowDownTrayIcon,
  EyeIcon,
  TagIcon,
  UserIcon,
  BriefcaseIcon,
  AcademicCapIcon
} from "@heroicons/react/24/outline";

const SampleCard = ({ sample, onView, onDownload }) => {
  return (
    <div className="bg-white rounded-xl shadow-card p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{sample.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{sample.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <UserIcon className="h-4 w-4" />
              {sample.experience}
            </div>
            <div className="flex items-center gap-1">
              <BriefcaseIcon className="h-4 w-4" />
              {sample.industry}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onView(sample)}
            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            title="Preview"
          >
            <EyeIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDownload(sample)}
            className="p-2 bg-brandBlue text-white rounded-lg hover:opacity-90 transition-colors"
            title="Download"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {sample.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md flex items-center gap-1"
          >
            <TagIcon className="h-3 w-3" />
            {tag}
          </span>
        ))}
      </div>

      <div className="text-xs text-gray-500">
        Last updated: {sample.updated}
      </div>
    </div>
  );
};

export default function SampleLibrary() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Templates", count: 12 },
    { id: "tech", name: "Technology", count: 4 },
    { id: "business", name: "Business", count: 3 },
    { id: "creative", name: "Creative", count: 2 },
    { id: "healthcare", name: "Healthcare", count: 2 },
    { id: "education", name: "Education", count: 1 }
  ];

  // Mock sample data
  const mockSamples = [
    {
      id: 1,
      title: "Software Engineer Resume",
      description: "Clean, modern design perfect for tech professionals. Highlights technical skills and project experience.",
      experience: "2-5 years",
      industry: "Technology",
      tags: ["React", "Python", "AWS", "Modern Design"],
      updated: "2 days ago",
      category: "tech"
    },
    {
      id: 2,
      title: "Product Manager Resume",
      description: "Strategic layout emphasizing leadership, product vision, and cross-functional collaboration skills.",
      experience: "3-7 years",
      industry: "Business",
      tags: ["Product Strategy", "Agile", "Analytics", "Leadership"],
      updated: "1 week ago",
      category: "business"
    },
    {
      id: 3,
      title: "UX Designer Resume",
      description: "Creative design showcasing portfolio work and user-centered design thinking process.",
      experience: "1-4 years",
      industry: "Creative",
      tags: ["Figma", "User Research", "Prototyping", "Creative"],
      updated: "3 days ago",
      category: "creative"
    },
    {
      id: 4,
      title: "Marketing Manager Resume",
      description: "Results-focused template highlighting campaign performance and marketing metrics.",
      experience: "4-8 years",
      industry: "Business",
      tags: ["Digital Marketing", "Analytics", "Campaign Management", "Results"],
      updated: "5 days ago",
      category: "business"
    },
    {
      id: 5,
      title: "Data Scientist Resume",
      description: "Technical template emphasizing machine learning, statistics, and data analysis capabilities.",
      experience: "2-6 years",
      industry: "Technology",
      tags: ["Python", "Machine Learning", "Statistics", "SQL"],
      updated: "1 day ago",
      category: "tech"
    },
    {
      id: 6,
      title: "Nurse Resume",
      description: "Professional healthcare template focusing on patient care, certifications, and clinical experience.",
      experience: "1-5 years",
      industry: "Healthcare",
      tags: ["Patient Care", "Certifications", "Clinical", "Healthcare"],
      updated: "4 days ago",
      category: "healthcare"
    }
  ];

  const filteredSamples = mockSamples.filter(sample => {
    const matchesCategory = selectedCategory === "all" || sample.category === selectedCategory;
    const matchesSearch = sample.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sample.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sample.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleView = (sample) => {
    // In a real app, this would open a preview modal or new page
    alert(`Previewing: ${sample.title}`);
  };

  const handleDownload = (sample) => {
    // In a real app, this would trigger a download
    alert(`Downloading: ${sample.title}`);
  };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sample Library</h1>
          <p className="text-gray-600">
            Browse our collection of professional resume templates. Find inspiration and download samples to help create your perfect resume.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-card p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <DocumentTextIcon className="h-5 w-5 text-brandBlue" />
            <h2 className="text-lg font-semibold">Find Your Perfect Template</h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates by title, skills, or industry..."
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brandBlue/30"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-brandBlue text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Templates */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured Templates</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSamples.slice(0, 3).map(sample => (
              <SampleCard
                key={sample.id}
                sample={sample}
                onView={handleView}
                onDownload={handleDownload}
              />
            ))}
          </div>
        </div>

        {/* All Templates */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              All Templates ({filteredSamples.length})
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Sort by:</span>
              <select className="border border-gray-300 rounded-md px-2 py-1 text-sm">
                <option>Most Popular</option>
                <option>Newest</option>
                <option>Alphabetical</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSamples.map(sample => (
              <SampleCard
                key={sample.id}
                sample={sample}
                onView={handleView}
                onDownload={handleDownload}
              />
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-2 mb-4">
            <AcademicCapIcon className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-900">Resume Writing Tips</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Choose the Right Template</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Match your industry and experience level</li>
                <li>• Consider ATS compatibility</li>
                <li>• Keep it clean and professional</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Customize for Success</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Tailor content to each job application</li>
                <li>• Use keywords from job descriptions</li>
                <li>• Quantify your achievements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
