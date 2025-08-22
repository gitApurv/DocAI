"use client";
import Agent from "@/types/agent";
import Image from "next/image";

const SuggestedDoctorAgentCard = ({
  agent,
  selectedAgent,
  setSelectedAgent,
}: {
  agent: Agent;
  selectedAgent: Agent | null;
  setSelectedAgent: (agent: Agent) => void;
}) => {
  const handleSelectAgent = () => {
    setSelectedAgent(agent);
  };

  const isSelected = selectedAgent?.specialist === agent.specialist;

  return (
    <div
      className={`flex flex-col items-center justify-start border rounded-2xl shadow-sm p-3 cursor-pointer transition 
        hover:shadow-md hover:border-blue-400
        ${
          isSelected
            ? "border-blue-500 ring-2 ring-blue-300"
            : "border-gray-200"
        }`}
      onClick={handleSelectAgent}
    >
      <Image
        src={agent.image}
        alt={agent.specialist}
        width={100}
        height={100}
        className="w-full h-[180px] rounded-xl object-cover"
      />
      <h2 className="font-semibold text-sm text-center mt-2 text-gray-800">
        {agent.specialist}
      </h2>
      <p className="text-xs text-gray-600 line-clamp-2 text-center mt-1">
        {agent.description}
      </p>
    </div>
  );
};

export default SuggestedDoctorAgentCard;
