import { useState } from "react";
import AppShell from "../layout/AppShell";
import UserStoryCard from "../components/UserStoryCard";
import { useUserStories } from "../contexts/UserStoriesContext";

export default function UserStories() {
  const { userStories } = useUserStories();

  const [activeTab, setActiveTab] = useState("User Stories");

  const tabs = ["User Stories", "Persona Highlights", "User Journey", "Jobs To Be Done"];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">Resumind</span>
            <span className="mx-2">/</span>
            <span className="font-medium text-gray-900">Maya Tran</span>
          </nav>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* User Stories Table */}
        {activeTab === "User Stories" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                      Goal
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userStories.map((story) => (
                    <UserStoryCard key={story.id} story={story} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab !== "User Stories" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{activeTab}</h3>
            <p className="text-gray-500">This section is coming soon...</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
