"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AddNewSessionDialog } from "./AddNewSessionDialog";
import axios from "axios";
import HistoryTable from "./HistoryTable";
import session from "@/types/session";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

const HistoryList = () => {
  const [historyList, setHistoryList] = useState<session[]>([]);
  const [loading, setLoading] = useState(true);

  const getHistoryList = async () => {
    try {
      const response = await axios.get("/api/session-chat?sessionId=all");
      setHistoryList(response.data);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistoryList();
  }, []);

  return (
    <div className="mt-10">
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner key="circle" variant="circle" className="w-10 h-10" />
        </div>
      ) : historyList.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-2xl bg-gray-50 text-center">
          <Image
            src="/images/Medical-Assistance.png"
            alt="Medical Assistance"
            width={200}
            height={200}
            className="mb-4"
          />
          <h2 className="font-bold text-2xl text-gray-800">
            No Recent Consultations
          </h2>
          <p className="text-gray-600 mb-4">
            It looks like you haven&apos;t consulted with any doctors yet.
          </p>
          <AddNewSessionDialog />
        </div>
      ) : (
        <div className="rounded-2xl border shadow-sm bg-white p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Consultation History
          </h2>
          <HistoryTable historyList={historyList} />
        </div>
      )}
    </div>
  );
};

export default HistoryList;
