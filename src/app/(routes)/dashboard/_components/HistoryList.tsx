"use client";
import Image from "next/image";
import { useState } from "react";
import { AddNewSessionDialog } from "./AddNewSessionDialog";

const HistoryList = () => {
  const [historyList, setHistoryList] = useState([]);

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
        <div>HistoryList</div>
      )}
    </div>
  );
};

export default HistoryList;
