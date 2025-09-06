import AppShell from "../layout/AppShell";
import CreateCard from "../components/CreateCard";
import ResumeCard from "../components/ResumeCard";

export default function Dashboard() {
  // You can replace with real data later (GET /api/resumes)
  const items = [
    { id: "1", title: "Yinzheng guan sanofi", edited: "16 days ago" },
    { id: "2", title: "Uploaded resume",       edited: "17 days ago" },
  ];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CreateCard />
          {items.map(x => (
            <ResumeCard key={x.id} title={x.title} edited={x.edited} />
          ))}
        </div>

        <div className="px-2 mt-6">
          <button className="flex items-center gap-2 text-gray-600 text-sm">
            <span className="inline-block w-4 h-4 rounded bg-gray-300"></span>
            <span className="font-semibold">ADD SECTION</span>
          </button>
        </div>
      </div>
    </AppShell>
  );
}
