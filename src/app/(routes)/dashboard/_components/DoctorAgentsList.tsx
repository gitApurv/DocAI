import { AIDoctorAgents } from "@/AIDoctorAgents";
import DoctorAgentCard from "./DoctorAgentCard";

const DoctorAgentList = () => {
  return (
    <div className="mt-10">
      <h2 className="font-bold text-2xl">AI Specialist Doctor Agent</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-5">
        {AIDoctorAgents.map((agent, index) => (
          <DoctorAgentCard key={index} agent={agent} />
        ))}
      </div>
    </div>
  );
};

export default DoctorAgentList;
