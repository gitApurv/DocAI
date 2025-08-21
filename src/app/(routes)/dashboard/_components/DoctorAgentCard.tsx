import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Agent from "@/types/agent";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

const DoctorAgentCard = async ({ agent }: { agent: Agent }) => {
  const { has } = await auth();
  const hasPremiumAccess = has({ plan: "pro" });

  return (
    <div className="relative">
      {agent.subscriptionRequired && (
        <Badge className="absolute m-1 p-1 right-0">Premium</Badge>
      )}
      <Image
        src={agent.image}
        alt={agent.specialist}
        width={250}
        height={250}
        className="w-full h-[250px] object-cover rounded-xl"
      />
      <h2 className="font-bold text-xl mt-2">{agent.specialist}</h2>
      <p className="line-clamp-2 text-sm text-gray-500">{agent.description}</p>
      <Button
        className="w-full mt-3"
        disabled={agent.subscriptionRequired && !hasPremiumAccess}
      >
        Start Consultation <ArrowRight />
      </Button>
    </div>
  );
};

export default DoctorAgentCard;
