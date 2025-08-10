import { AIDoctorAgents } from "@/AIDoctorAgents";
import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/config/openAIModel";

export async function POST(req: NextRequest) {
  const { details } = await req.json();

  try {
    const response = await ai.models.generateContent({
      model: "gemma-3n-e4b-it",
      contents: [
        {
          parts: [
            {
              text: `System: ${JSON.stringify(
                AIDoctorAgents
              )} User: User Details/Symptoms: ${details}.Depend on the user details/symptoms, suggest the best list of agent for the user. Return the list of agents in JSON format.
                  `,
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
    return NextResponse.json(JSONResponse, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to suggest agent. " + error },
      { status: 500 }
    );
  }
}
