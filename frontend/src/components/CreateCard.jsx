import { useNavigate } from "react-router-dom";

export default function CreateCard() {
  const nav = useNavigate();
  return (
    <button
      onClick={()=>nav("/create")}
      className="w-full h-[360px] rounded-xl border-2 border-dashed border-gray-300
                 bg-white text-gray-500 hover:border-gray-400 hover:shadow-card transition
                 flex items-center justify-center"
    >
      <span className="text-lg font-medium">Create new resume</span>
    </button>
  );
}
