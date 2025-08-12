"use client";
import { Button } from "@/components/ui/button";
import session from "@/types/session";
import axios from "axios";
import { Circle, Phone, PhoneOff } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import Message from "@/types/message";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

const SessionPage = () => {
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

  const startCall = () => {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY || "");
    setVapiInstance(vapi);

    if (!sessionDetails) {
      return;
    }

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
        voiceId: sessionDetails.selectedAgent.voiceId,
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

  const endCall = () => {
    if (!vapiInstance) return;
    vapiInstance.stop();
    vapiInstance.removeAllListeners();
    setCallStarted(false);
    setVapiInstance(undefined);
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
          {!callStarted && "Not"} Connected
        </h2>
        <h2 className="font-bold text-xl text-gray-400">00:00</h2>
      </div>
      {sessionDetails && (
        <div className="flex items-center flex-col mt-12">
          <Image
            src={sessionDetails.selectedAgent.image}
            alt={sessionDetails.selectedAgent.specialist}
            width={120}
            height={120}
            className="h-[200px] w-[200px] rounded-full object-cover"
          />
          <h2 className="mt-2 text-lg">
            {sessionDetails.selectedAgent.specialist}
          </h2>
          <p className="text-sm text-gray-400">AI Medical Voice Agent</p>

          <div className="mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72">
            {messages.slice(-4).map((message, index) => (
              <h2 className="text-gray-400" key={index}>
                {message.role} : {message.message}
              </h2>
            ))}
            {liveTranscript && (
              <h2 className="text-lg">
                {currentRole} : {liveTranscript}
              </h2>
            )}
          </div>

          {!callStarted ? (
            <Button className="mt-12" onClick={startCall}>
              <Phone /> Start Session
            </Button>
          ) : (
            <Button className="mt-12" variant="destructive" onClick={endCall}>
              <PhoneOff />
              End Session
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SessionPage;
