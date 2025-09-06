import { useState } from "react";
import { useUserStories } from "../contexts/UserStoriesContext";

export default function UserStoryCard({ story }) {
  const { updateStoryStatus } = useUserStories();
  const [isEditing, setIsEditing] = useState(false);
  const [newStatus, setNewStatus] = useState(story.status);

  const statusOptions = [
    "Estimate Story",
    "To Do",
    "In Progress", 
    "Review",
    "Done"
  ];

  const handleStatusUpdate = () => {
    updateStoryStatus(story.id, newStatus);
    setIsEditing(false);
  };

  const handleStatusClick = () => {
    setIsEditing(true);
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
          {story.description}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-700 max-w-lg leading-relaxed">
          {story.goal}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">-</span>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1"
                autoFocus
              >
                {statusOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <button
                onClick={handleStatusUpdate}
                className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-xs bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          ) : (
            <span 
              className="text-sm text-gray-600 font-medium cursor-pointer hover:text-blue-600"
              onClick={handleStatusClick}
            >
              {story.status}
            </span>
          )}
        </div>
      </td>
    </tr>
  );
}
