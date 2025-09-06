import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export default function ResumeCard({ title, edited }) {
  return (
    <div className="bg-white rounded-xl shadow-card hover:shadow-none transition p-3">
      <div className="h-[240px] bg-gray-100 rounded-md mb-3" />
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold text-[15px] leading-snug">{title}</div>
          <div className="text-sm text-gray-500">Edited {edited}</div>
        </div>
        <EllipsisVerticalIcon className="h-6 w-6 text-gray-500" />
      </div>
    </div>
  );
}
