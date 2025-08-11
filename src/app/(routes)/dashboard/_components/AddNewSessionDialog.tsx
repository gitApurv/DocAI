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
import { useState } from "react";
import axios from "axios";
import SuggestedDoctorAgentCard from "./SuggestedDoctorAgentCard";
import Agent from "@/types/agent";
import { useRouter } from "next/navigation";

export function AddNewSessionDialog() {
  const [details, setDetails] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestedAgents, setSuggestedAgents] = useState<Agent[] | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const router = useRouter();

  const handleStartConsultation = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/session-chat", {
        details,
        selectedAgent,
      });
      router.push(`/dashboard/session/${response.data.sessionId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/suggest-agent", {
        details,
      });
      setSuggestedAgents(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-3">+ Consult With Doctor</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {!suggestedAgents ? (
            <>
              <DialogTitle>Add Basic Details</DialogTitle>
              <DialogDescription asChild>
                <div>
                  <h2>Add symptoms and other basic details to get started.</h2>
                  <Textarea
                    placeholder="Add details here..."
                    className="h-[200px] mt-2"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </div>
              </DialogDescription>
            </>
          ) : (
            <div>
              <h2 className="font-bold text-2xl">Suggested Doctor Agents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
                {suggestedAgents.map((agent, index) => (
                  <SuggestedDoctorAgentCard
                    key={index}
                    agent={agent}
                    selectedAgent={selectedAgent}
                    setSelectedAgent={setSelectedAgent}
                  />
                ))}
              </div>
            </div>
          )}
        </DialogHeader>
        <DialogFooter className="flex justify-between">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          {!suggestedAgents ? (
            <Button disabled={!details || loading} onClick={handleNext}>
              Next
              {loading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <ArrowRightIcon />
              )}
            </Button>
          ) : (
            <Button
              onClick={handleStartConsultation}
              disabled={loading || !selectedAgent}
            >
              Start Consultation
              {loading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <ArrowRightIcon />
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
