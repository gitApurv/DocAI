"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import FeatueresGrid from "@/app/_components/FeaturesGrid";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { user } = useUser();

  return (
    <div className="relative flex  flex-col items-center justify-center">
      <Navbar />
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"🧠 Transform Health care with AI Medical Voice Agents"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Provide 24/7 intelligent medical support using conversational AI.
          Triage symptoms, book appointments, and deliver empathetic care with
          voice-first automation.
        </motion.p>
        <Link href={user ? "/dashboard" : "/sign-in"}>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 1,
            }}
            className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Explore Now
            </button>
          </motion.div>
        </Link>
      </div>
      <FeatueresGrid />
    </div>
  );
}

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-10 md:px-20 py-4 dark:border-neutral-800 shadow-md">
      <div className="flex items-center gap-2">
        <Image src="/images/Logo.png" alt="Logo" width={50} height={50} />
        <h1 className="text-base font-bold md:text-2xl">
          <span className="text-blue-950 mr-1">Doc</span>
          <span className="text-green-500">AI</span>
        </h1>
      </div>
      {!user ? (
        <Link href="/sign-in">
          <Button className="cursor-pointer">Login</Button>
        </Link>
      ) : (
        <div className="flex gap-5 items-center">
          <Link href="/dashboard">
            <Button className="cursor-pointer">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      )}
    </nav>
  );
};
