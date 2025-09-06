import { useState } from "react";
import AppShell from "../layout/AppShell";
import { 
  MagnifyingGlassIcon, 
  HeartIcon, 
  BookmarkIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  ClockIcon,
  BriefcaseIcon
} from "@heroicons/react/24/outline";

const JobCard = ({ job, onSave, onApply }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(job, !isSaved);
  };

  return (
    <div className="bg-white rounded-xl shadow-card p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1">
              <BuildingOfficeIcon className="h-4 w-4" />
              {job.company}
            </div>
            <div className="flex items-center gap-1">
              <MapPinIcon className="h-4 w-4" />
              {job.location}
            </div>
          </div>
        </div>
        <button
          onClick={handleSave}
          className={`p-2 rounded-lg transition-colors ${
            isSaved 
              ? 'bg-red-100 text-red-600 hover:bg-red-200' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <HeartIcon className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <CurrencyDollarIcon className="h-4 w-4" />
          {job.salary}
        </div>
        <div className="flex items-center gap-1">
          <BriefcaseIcon className="h-4 w-4" />
          {job.type}
        </div>
        <div className="flex items-center gap-1">
          <ClockIcon className="h-4 w-4" />
          {job.posted}
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-3">{job.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onApply(job)}
          className="flex-1 bg-brandBlue text-white px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90"
        >
          Apply Now
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-semibold hover:bg-gray-50">
          View Details
        </button>
      </div>
    </div>
  );
};

export default function JobSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [savedJobs, setSavedJobs] = useState([]);

  // Mock job data
  const mockJobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120k - $160k",
      type: "Full-time",
      posted: "2 days ago",
      description: "We are looking for a Senior Software Engineer to join our growing team. You will be responsible for developing and maintaining our core platform, working with modern technologies like React, Node.js, and AWS.",
      skills: ["React", "Node.js", "AWS", "TypeScript", "MongoDB"]
    },
    {
      id: 2,
      title: "Product Manager",
      company: "StartupXYZ",
      location: "Remote",
      salary: "$100k - $140k",
      type: "Full-time",
      posted: "1 week ago",
      description: "Join our product team to drive the development of innovative features. You'll work closely with engineering, design, and business teams to deliver exceptional user experiences.",
      skills: ["Product Management", "Agile", "Analytics", "User Research", "Figma"]
    },
    {
      id: 3,
      title: "UX Designer",
      company: "DesignStudio",
      location: "New York, NY",
      salary: "$80k - $110k",
      type: "Full-time",
      posted: "3 days ago",
      description: "We're seeking a talented UX Designer to create intuitive and beautiful user experiences. You'll work on both web and mobile applications, conducting user research and creating wireframes.",
      skills: ["Figma", "Sketch", "User Research", "Prototyping", "Adobe Creative Suite"]
    }
  ];

  const handleSaveJob = (job, isSaved) => {
    if (isSaved) {
      setSavedJobs(prev => [...prev, job]);
    } else {
      setSavedJobs(prev => prev.filter(savedJob => savedJob.id !== job.id));
    }
  };

  const handleApplyJob = (job) => {
    // In a real app, this would open an application form or redirect to the company's application page
    alert(`Applying to ${job.title} at ${job.company}`);
  };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Search</h1>
          <p className="text-gray-600">
            Find your next opportunity. Search for jobs, save interesting positions, and apply with your tailored resumes.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-card p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <MagnifyingGlassIcon className="h-5 w-5 text-brandBlue" />
            <h2 className="text-lg font-semibold">Search Jobs</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title or Keywords
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., Software Engineer, Product Manager"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brandBlue/30"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., San Francisco, Remote"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brandBlue/30"
              />
            </div>
            
            <div className="flex items-end">
              <button className="w-full bg-brandBlue text-white px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 flex items-center justify-center gap-2">
                <MagnifyingGlassIcon className="h-4 w-4" />
                Search Jobs
              </button>
            </div>
          </div>
        </div>

        {/* Saved Jobs Section */}
        {savedJobs.length > 0 && (
          <div className="bg-white rounded-xl shadow-card p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BookmarkIcon className="h-5 w-5 text-amber-500" />
              <h2 className="text-lg font-semibold">Saved Jobs ({savedJobs.length})</h2>
            </div>
            <div className="grid gap-4">
              {savedJobs.map(job => (
                <div key={job.id} className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                  </div>
                  <button
                    onClick={() => handleApplyJob(job)}
                    className="bg-brandBlue text-white px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90"
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Job Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Job Opportunities ({mockJobs.length})
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Sort by:</span>
              <select className="border border-gray-300 rounded-md px-2 py-1 text-sm">
                <option>Most Recent</option>
                <option>Salary (High to Low)</option>
                <option>Relevance</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6">
            {mockJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onSave={handleSaveJob}
                onApply={handleApplyJob}
              />
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
