import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { FileText } from "lucide-react";
import Image from "next/image";

export default function FeatueresGrid() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem] pb-4">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

const items = [
  {
    title: "AI Medical Transcription",
    description:
      "Convert doctor-patient conversations into accurate medical transcripts in real-time.",
    header: (
      <Image
        src="/images/AI-Medical-Transcription.png"
        alt="AI Medical Transcription"
        width={200}
        height={200}
      />
    ),
    className: "md:col-span-2",
    icon: <FileText className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Clinical Error Detection",
    description:
      "AI flags inconsistencies and possible medical errors in transcribed content.",
    header: (
      <Image
        src="/images/Clinical-Error-Detection.png"
        alt="Clinical Error Detection"
        width={150}
        height={150}
      />
    ),
    className: "md:col-span-1",
    icon: <FileText className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Context-Aware Recommendations",
    description:
      "Provide contextual treatment or diagnosis suggestions based on conversations.",
    header: (
      <Image
        src="/images/Context-Aware-Recommendations.png"
        alt="Context-Aware Recommendations"
        width={150}
        height={150}
      />
    ),
    className: "md:col-span-1",
    icon: <FileText className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Patient Sentiment Monitoring",
    description:
      "Analyze patient tone and emotion to assist doctors with empathetic communication.",
    header: (
      <Image
        src="/images/Patient-Sentiment-Monitoring.png"
        alt="Patient Sentiment Monitoring"
        width={150}
        height={150}
      />
    ),
    className: "md:col-span-1",
    icon: <FileText className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Summarized Case Notes",
    description:
      "Automatically generate brief, actionable summaries of medical discussions.",
    header: (
      <Image
        src="/images/Summarized-Case-Notes.png"
        alt="Summarized Case Notes"
        width={150}
        height={150}
      />
    ),
    className: "md:col-span-1",
    icon: <FileText className="h-4 w-4 text-neutral-500" />,
  },
];
