import { Bars3Icon } from "@heroicons/react/24/outline";

export default function Topbar({ onOpenSidebar }) {
  return (
    <header className="md:hidden sticky top-0 z-20 bg-indigo-700 text-white px-3 py-2 flex items-center gap-2">
      <button onClick={onOpenSidebar}><Bars3Icon className="h-6 w-6" /></button>
      <div className="font-semibold">Resumind</div>
    </header>
  );
}
