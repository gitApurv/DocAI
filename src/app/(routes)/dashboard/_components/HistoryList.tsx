"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AddNewSessionDialog } from "./AddNewSessionDialog";
import axios from "axios";
import HistoryTable from "./HistoryTable";
import session from "@/types/session";

const HistoryList = () => {
  const [historyList, setHistoryList] = useState<session[]>([]);

  const getHistoryList = async () => {
    const response = await axios.get("/api/session-chat?sessionId=all");
    console.log(response.data);
    setHistoryList(response.data);
  };

  useEffect(() => {
    getHistoryList();
  }, []);

  return (
    <div className="mt-10">
      {historyList.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-7 border-2 border-dashed rounded-2xl">
          <Image
            src="/images/Medical-Assistance.png"
            alt="Medical Assistance"
            width={200}
            height={200}
          />
          <h2 className="font-bold text-2xl">No Recent Consultations</h2>
          <p>It looks like you haven't consulted with any doctors yet.</p>
          <AddNewSessionDialog />
        </div>
      ) : (
        <div>
          <HistoryTable historyList={historyList} />
        </div>
      )}
    </div>
  );
};

export default HistoryList;
