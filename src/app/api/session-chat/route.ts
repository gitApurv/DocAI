import { db } from "@/config/db";
import { sessionChatsTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId") || "";
  const user = await currentUser();
  const emailAddress = user?.primaryEmailAddress?.emailAddress || "";
  if (sessionId === "all") {
    const result = await db
      .select()
      .from(sessionChatsTable)
      .where(eq(sessionChatsTable.createdBy, emailAddress))
      .orderBy(desc(sessionChatsTable.id));
    return NextResponse.json(result);
  }
  const result = await db
    .select()
    .from(sessionChatsTable)
    .where(eq(sessionChatsTable.sessionId, sessionId));

  return NextResponse.json(result[0]);
}
