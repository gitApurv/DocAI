import { Button } from "@/components/ui/button";
import Agent from "@/types/agent";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const DoctorAgentCard = ({ agent }: { agent: Agent }) => {
  return (
    <div>
      <Image
        src={agent.image}
        alt={agent.specialist}
        width={250}
        height={250}
        className="w-full h-[250px] object-cover rounded-xl"
      />
      <h2 className="font-bold text-xl mt-2">{agent.specialist}</h2>
      <p className="line-clamp-2 text-sm text-gray-500">{agent.description}</p>
      <Button className="w-full mt-3">
        Start Consultation <ArrowRight />
      </Button>
    </div>
  );
};

export default DoctorAgentCard;
