import { NavLink, useNavigate } from "react-router-dom";
import {
  DocumentArrowUpIcon, FolderIcon, MagnifyingGlassIcon, DocumentTextIcon,
  ClipboardDocumentListIcon, SparklesIcon, ListBulletIcon
} from "@heroicons/react/24/solid";

const Item = ({ to, icon:Icon, children, badge }) => (
  <NavLink
    to={to}
    className={({isActive}) =>
      `flex items-center gap-3 px-4 py-3 rounded-md text-white/95 text-sm
       hover:bg-white/10 transition ${isActive ? "bg-white/15" : ""}`
    }
  >
    <Icon className="h-5 w-5 text-white/90" />
    <span className="font-semibold">{children}</span>
    {badge && (
      <span className="ml-auto text-[10px] bg-emerald-500 text-white rounded px-2 py-[2px]">NEW</span>
    )}
  </NavLink>
);

export default function Sidebar() {
  const nav = useNavigate();
  return (
    <aside className="hidden md:flex w-[270px] min-h-screen p-4
                      bg-gradient-to-b from-sidebarTop to-sidebarBot">
      <div className="w-full flex flex-col gap-3">
        <button
          onClick={()=>nav("/upload")}
          className="flex items-center justify-center gap-2 bg-white text-brandText
                     font-bold rounded-md h-11 hover:opacity-95"
        >
          <DocumentArrowUpIcon className="h-5 w-5" /> UPLOAD RESUME
        </button>

        <div className="mt-2 flex flex-col gap-2">
          <Item to="/" icon={FolderIcon}>MY DASHBOARD</Item>
          <Item to="/user-stories" icon={ListBulletIcon}>USER STORIES</Item>
          <Item to="/job-search" icon={MagnifyingGlassIcon} badge>JOB SEARCH</Item>
          <Item to="/samples" icon={DocumentTextIcon}>SAMPLE LIBRARY</Item>
          <Item to="/review" icon={ClipboardDocumentListIcon}>REVIEW MY RESUME</Item>
          <Item to="/ai-interview" icon={SparklesIcon}>AI INTERVIEW</Item>
        </div>
      </div>
    </aside>
  );
}
