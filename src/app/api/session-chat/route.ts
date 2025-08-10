import { db } from "@/config/db";
import { sessionChatsTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(req: NextRequest) {
  const { details, selectedAgent } = await req.json();
  const user = await currentUser();
  try {
    const sessionId = uuid();
    const result = await db
      .insert(sessionChatsTable)
      .values({
        sessionId,
        details,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        selectedAgent: selectedAgent,
        createdOn: new Date().toString(),
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to start consultation. " + error },
      { status: 500 }
    );
  }
}
