"use client";
import { Button } from "@/components/ui/button";
import session from "@/types/session";
import axios from "axios";
import { Circle, Phone, PhoneOff } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";

import Message from "@/types/message";
import { toast } from "sonner";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

const SessionPage = () => {
  const router = useRouter();
  const { sessionId } = useParams();
  const [sessionDetails, setSessionDetails] = useState<session | undefined>(
    undefined
  );
  const [callStarted, setCallStarted] = useState<boolean>(false);
  const [vapiInstance, setVapiInstance] = useState<Vapi | undefined>(undefined);
  const [currentRole, setCurrentRole] = useState<string | undefined>(undefined);
  const [liveTranscript, setLiveTranscript] = useState<string | undefined>(
    undefined
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const getSessionDetails = async () => {
    try {
      const response = await axios.get(
        `/api/session-chat?sessionId=${sessionId}`
      );
      setSessionDetails(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSessionDetails();
  }, [sessionId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callStarted) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      setElapsedTime(0);
    }
    return () => clearInterval(interval);
  }, [callStarted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const startCall = () => {
    if (!sessionDetails) return;

    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY || "");
    setVapiInstance(vapi);

    const vapiAgentConfig: CreateAssistantDTO = {
      name: "AI Medical Voice Agent",
      firstMessage:
        "Hi there! I'm your AI Medical Assistant. I'm here to help you with any health questions or concerns you might have today. How are you feeling?",
      transcriber: {
        provider: "assembly-ai",
        language: "en",
      },
      voice: {
        provider: "vapi",
        voiceId: (sessionDetails.selectedAgent.voiceId as any) || undefined,
      },
      model: {
        provider: "google",
        model: "gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: sessionDetails.selectedAgent.agentPrompt,
          },
        ],
      },
    };

    vapi.start(vapiAgentConfig);

    vapi.on("call-start", () => {
      setCallStarted(true);
    });

    vapi.on("call-end", () => {
      setCallStarted(false);
    });

    vapi.on("message", (message) => {
      if (message.type === "transcript") {
        const { role, transcriptType, transcript } = message;

        if (transcriptType === "partial") {
          setLiveTranscript(transcript);
          setCurrentRole(role);
        } else if (transcriptType === "final") {
          setMessages((prev) => [...prev, { role: role, message: transcript }]);
          setLiveTranscript(undefined);
          setCurrentRole(undefined);
        }
      }
    });

    vapi.on("speech-start", () => {
      setCurrentRole("Assistant");
    });

    vapi.on("speech-end", () => {
      setCurrentRole("User");
    });
  };

  const endCall = async () => {
    setLoading(true);
    try {
      if (vapiInstance) {
        await generateReport();
        vapiInstance.stop();
        vapiInstance.removeAllListeners();
      }
      setCallStarted(false);
      setVapiInstance(undefined);
      setLiveTranscript(undefined);
      setCurrentRole(undefined);
      setMessages([]);
      toast.success("Report Generated!");
      router.push("/dashboard");
    } catch (err) {
      toast.error("Error ending session!");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async () => {
    const response = await axios.post("/api/generate-report", {
      messages: messages,
      sessionDetails: sessionDetails,
      sessionId: sessionId,
    });
    return response.data;
  };

  return (
    <div className="p-5 border rounded-3xl bg-secondary">
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
          <Circle
            className={`h-4 w-4 rounded-full ${
              callStarted ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {callStarted ? "Connected" : "Not Connected"}
        </h2>
        <h2 className="font-bold text-xl text-gray-400">
          {formatTime(elapsedTime)}
        </h2>
      </div>
      {sessionDetails && (
        <div className="flex items-center flex-col mt-12">
          <Image
            src={sessionDetails.selectedAgent.image}
            alt={sessionDetails.selectedAgent.specialist}
            width={200}
            height={200}
            className="h-[200px] w-[200px] rounded-full object-cover"
          />
          <h2 className="mt-2 text-lg">
            {sessionDetails.selectedAgent.specialist}
          </h2>
          <p className="text-sm text-gray-400">AI Medical Voice Agent</p>

          <div className="mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72 max-h-[250px]">
            {messages.slice(-4).map((message, index) => (
              <h2 className="text-gray-400" key={index}>
                {message.role} : {message.message}
              </h2>
            ))}
            {liveTranscript && (
              <h2 className="text-lg font-semibold">
                {currentRole} : {liveTranscript}
              </h2>
            )}
          </div>

          {!callStarted ? (
            <Button className="mt-12" onClick={startCall} disabled={loading}>
              {loading ? <Circle className="animate-spin" /> : <Phone />}
              Start Session
            </Button>
          ) : (
            <Button
              className="mt-12"
              variant="destructive"
              onClick={endCall}
              disabled={loading}
            >
              {loading ? <Circle className="animate-spin" /> : <PhoneOff />}
              End Session
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SessionPage;
