import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
import UserStories from "./pages/UserStories";
import { UserStoriesProvider } from "./contexts/UserStoriesContext";

export default function App() {
  return (
    <UserStoriesProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<Create />} />
        <Route path="/user-stories" element={<UserStories />} />
      </Routes>
      <Toaster position="top-right" />
    </UserStoriesProvider>
  );
}
