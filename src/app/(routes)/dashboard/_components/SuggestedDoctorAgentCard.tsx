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

  return (
    <div
      className={`flex flex-col items-center justify-center border rounded-2xl shadow p-3 m-2 cursor-pointer ${
        selectedAgent === agent && "border-blue-500"
      }`}
      onClick={handleSelectAgent}
    >
      <Image
        src={agent.image}
        alt={agent.specialist}
        width={100}
        height={100}
        className="w-full h-[200px]  rounded-2xl object-cover"
      />
      <h2 className="font-bold text-sm text-center mt-1">{agent.specialist}</h2>
      <p className="text-xs line-clamp-2 text-center">{agent.description}</p>
    </div>
  );
};

export default SuggestedDoctorAgentCard;
