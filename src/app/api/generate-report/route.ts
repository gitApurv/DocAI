import { db } from "@/config/db";
import { ai } from "@/config/openAIModel";
import { sessionChatsTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messages, sessionDetails, sessionId } = await req.json();

  const REPORT_GEN_PROMP = `You are an AI Medical Voice Agent that just finished a consultation. Based on the info of the AI Medical Agent and the conversation between the Agent and User , generate a report in JSON format.
  
    Fields to include:
    1. agent: the medical specialist name (e.g., "General Practitioner", "Dermatologist")
    2. user: name of the patient or "Anonymous" if not provided
    3. timestamp: current date and time in ISO format
    4. chiefComplaint: one-sentence summary of the main issue
    5. summary: a 2-3 sentence summary of the conversation
    6. symptoms: list of symptoms mentioned by the user
    7. duration: how long the user has experienced the symptoms
    8. severity: "mild", "moderate", or "severe"
    9. medicationsMentioned: list of any medicines mentioned
    10. recommendations: list of AI suggestions (e.g., rest, hydration, specialist referral)

Return the result strictly in this JSON format:
    {
    "agent": "string",
    "user": "string",
    "timestamp": "ISO Date string",
    "chiefComplaint": "string",
    "summary": "string",
    "symptoms": ["symptom1", "symptom2"],
    "duration": "string",
    "severity": "string",
    "medicationsMentioned": ["med1", "med2"],
    "recommendations": ["rec1", "rec2"]
    }

Important:
    1. Only include valid fields.
    2. Respond with nothing else except the JSON output.`;

  const UserInput =
    "AI Medical Agent Info: " +
    JSON.stringify(sessionDetails) +
    ", Conversation: " +
    JSON.stringify(messages);

  try {
    const response = await ai.models.generateContent({
      model: "gemma-3n-e4b-it",
      contents: [
        {
          parts: [
            {
              text: `System: ${REPORT_GEN_PROMP}`,
            },
            {
              text: `User: ${UserInput}`,
            },
          ],
        },
      ],
    });
    const data = response.text || "";
    const cleanedResponse = data
      .trim()
      .replace("```json", "")
      .replace("```", "");
    const JSONResponse = JSON.parse(cleanedResponse);
    await db
      .update(sessionChatsTable)
      .set({ report: JSONResponse, conversation: messages })
      .where(eq(sessionChatsTable.sessionId, sessionId));
    return NextResponse.json(JSONResponse, { status: 200 });
  } catch (err) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
