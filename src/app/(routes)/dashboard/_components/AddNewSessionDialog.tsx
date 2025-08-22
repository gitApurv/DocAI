"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRightIcon, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import SuggestedDoctorAgentCard from "./SuggestedDoctorAgentCard";
import Agent from "@/types/agent";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import session from "@/types/session";

export function AddNewSessionDialog() {
  const [details, setDetails] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestedAgents, setSuggestedAgents] = useState<Agent[] | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const router = useRouter();
  const [historyList, setHistoryList] = useState<session[]>([]);
  const { has } = useAuth();
  const hasPremiumAccess = has && has({ plan: "pro" });

  const handleStartConsultation = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/session-chat", {
        details,
        selectedAgent,
      });
      router.push(`/dashboard/session/${response.data.sessionId}`);
    } catch (error) {
      console.error("Failed to start consultation:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/suggest-agent", { details });
      setSuggestedAgents(response.data);
    } catch (error) {
      console.error("Failed to fetch suggested agents:", error);
    } finally {
      setLoading(false);
    }
  };

  const getHistoryList = async () => {
    const response = await axios.get("/api/session-chat?sessionId=all");
    setHistoryList(response.data);
  };

  useEffect(() => {
    getHistoryList();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="mt-3"
          disabled={!hasPremiumAccess && historyList.length >= 1}
        >
          + Consult With Doctor
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          {!suggestedAgents ? (
            <>
              <DialogTitle>Add Basic Details</DialogTitle>
              <DialogDescription asChild>
                <div className="mt-2">
                  <p className="text-gray-600">
                    Describe your symptoms and basic concerns to get matched
                    with the right AI specialist.
                  </p>
                  <Textarea
                    placeholder="e.g., I have been experiencing headaches and dizziness for the past week..."
                    className="h-[180px] mt-3"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </div>
              </DialogDescription>
            </>
          ) : (
            <div>
              <h2 className="font-bold text-2xl">Suggested Doctor Agents</h2>
              <p className="text-sm text-gray-600 mt-1">
                Based on your symptoms, here are the recommended specialists:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                {suggestedAgents.map((agent, index) => (
                  <SuggestedDoctorAgentCard
                    key={index}
                    agent={agent}
                    selectedAgent={selectedAgent}
                    setSelectedAgent={setSelectedAgent}
                  />
                ))}
              </div>
              {!selectedAgent && (
                <p className="text-sm text-red-500 mt-3">
                  Please select a doctor to continue.
                </p>
              )}
            </div>
          )}
        </DialogHeader>

        <DialogFooter className="flex justify-between sticky bottom-0 bg-white pt-3 border-t">
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          {!suggestedAgents ? (
            <Button disabled={!details || loading} onClick={handleNext}>
              {loading ? (
                <>
                  Processing...
                  <Loader2Icon className="animate-spin ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRightIcon className="ml-2" />
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleStartConsultation}
              disabled={loading || !selectedAgent}
            >
              {loading ? (
                <>
                  Starting...
                  <Loader2Icon className="animate-spin ml-2" />
                </>
              ) : (
                <>
                  Start Consultation
                  <ArrowRightIcon className="ml-2" />
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
