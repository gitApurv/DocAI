"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Agent from "@/types/agent";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/clerk-react";

const DoctorAgentCard = ({ agent }: { agent: Agent }) => {
  const { has } = useAuth();
  const hasPremiumAccess = has && has({ plan: "pro" });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleStartConsultation = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/session-chat", {
        details: "New Session",
        agent,
      });
      router.push(`/dashboard/session/${response.data.sessionId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
        disabled={loading || (agent.subscriptionRequired && !hasPremiumAccess)}
        onClick={handleStartConsultation}
      >
        Start Consultation <ArrowRight />
      </Button>
    </div>
  );
};

export default DoctorAgentCard;
