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
      console.error("Failed to start consultation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative rounded-2xl border shadow-sm bg-white p-4 hover:shadow-md transition">
      {agent.subscriptionRequired && (
        <Badge className="absolute top-3 right-3 bg-yellow-500 text-white">
          Premium
        </Badge>
      )}

      <div className="flex flex-col items-center text-center">
        <Image
          src={agent.image}
          alt={agent.specialist}
          width={250}
          height={250}
          className="w-full h-[220px] object-cover rounded-xl"
        />

        <h2 className="font-bold text-lg mt-3 text-gray-900">
          {agent.specialist}
        </h2>
        <p className="line-clamp-2 text-sm text-gray-600 mt-1">
          {agent.description}
        </p>

        <Button
          className="w-full mt-4"
          disabled={
            loading || (agent.subscriptionRequired && !hasPremiumAccess)
          }
          onClick={handleStartConsultation}
        >
          {loading ? "Starting..." : "Start Consultation"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DoctorAgentCard;
