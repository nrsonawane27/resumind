import { createContext, useContext, useState } from 'react';

const UserStoriesContext = createContext();

export const useUserStories = () => {
  const context = useContext(UserStoriesContext);
  if (!context) {
    throw new Error('useUserStories must be used within a UserStoriesProvider');
  }
  return context;
};

export const UserStoriesProvider = ({ children }) => {
  const [userStories, setUserStories] = useState([
    {
      id: 1,
      description: "Upload my existing resume to Resumind.",
      goal: "Start the process of tailoring my resume for job applications without manual re-entry.",
      status: "Estimate Story"
    },
    {
      id: 2,
      description: "Paste a job description into Resumind.",
      goal: "Enable the platform to analyze the required qualifications and skills for my target job.",
      status: "Estimate Story"
    },
    {
      id: 3,
      description: "Have Resumind automatically analyze and highlight the key points from a job description.",
      goal: "Easily identify which skills and experiences are most valued by the employer.",
      status: "Estimate Story"
    },
    {
      id: 4,
      description: "Have my resume automatically tailored by Resumind to match job description requirements.",
      goal: "Make my application more relevant and improve my chances of standing out.",
      status: "Estimate Story"
    },
    {
      id: 5,
      description: "Generate a new, tailored version of my resume.",
      goal: "Save time and ensure my resume is optimized for each application.",
      status: "Estimate Story"
    },
    {
      id: 6,
      description: "Have my tailored resume automatically scanned for ATS compliance.",
      goal: "Ensure my resume will pass automated screening systems.",
      status: "Estimate Story"
    },
    {
      id: 7,
      description: "Review and make final customizations to my new resume in preview mode.",
      goal: "Confirm it represents me accurately and professionally before submission.",
      status: "Estimate Story"
    },
    {
      id: 8,
      description: "Download or export my finalized resume in multiple formats.",
      goal: "Submit my application easily to any employer or job portal.",
      status: "Estimate Story"
    }
  ]);

  const updateStoryStatus = (storyId, newStatus) => {
    setUserStories(prev => 
      prev.map(story => 
        story.id === storyId 
          ? { ...story, status: newStatus }
          : story
      )
    );
  };

  const addStory = (newStory) => {
    const story = {
      id: Date.now(),
      ...newStory,
      status: "Estimate Story"
    };
    setUserStories(prev => [...prev, story]);
  };

  const value = {
    userStories,
    updateStoryStatus,
    addStory
  };

  return (
    <UserStoriesContext.Provider value={value}>
      {children}
    </UserStoriesContext.Provider>
  );
};
