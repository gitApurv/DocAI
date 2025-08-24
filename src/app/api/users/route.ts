import { currentUser } from "@clerk/nextjs/server";
import type { User } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const user: User | null = await currentUser();

  if (!user || !user.primaryEmailAddress?.emailAddress) {
    return NextResponse.json(
      { error: "User not authenticated or email not found" },
      { status: 401 }
    );
  }

  const email = user.primaryEmailAddress.emailAddress;

  try {
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (users.length === 0) {
      const result = await db
        .insert(usersTable)
        .values({
          name: user?.fullName ?? "Unknown",
          email,
        })
        .returning();
      return NextResponse.json(result[0]);
    }

    return NextResponse.json(users[0]);
  } catch (err) {
    return NextResponse.json(
      { error: "Server error", detail: err },
      { status: 500 }
    );
  }
}
