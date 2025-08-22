import { AIDoctorAgents } from "@/AIMedicalAgents";
import DoctorAgentCard from "./DoctorAgentCard";

const DoctorAgentList = () => {
  return (
    <div className="mt-12">
      <div className="text-center mb-8">
        <h2 className="font-bold text-3xl text-gray-900">
          AI Specialist Doctor Agents
        </h2>
        <p className="text-gray-600 mt-2">
          Choose from our AI-powered specialists to start your consultation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {AIDoctorAgents.map((agent, index) => (
          <DoctorAgentCard key={index} agent={agent} />
        ))}
      </div>
    </div>
  );
};

export default DoctorAgentList;
