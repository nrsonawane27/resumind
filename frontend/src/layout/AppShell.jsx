import Sidebar from "./Sidebar";

export default function AppShell({ children }) {
  return (
    <div className="min-h-full flex">
      <Sidebar />
      <main className="flex-1 bg-[#f7f8fb]">{children}</main>
    </div>
  );
}
