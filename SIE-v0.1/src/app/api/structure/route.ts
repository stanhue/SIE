import OpenAI from "openai";
import { NextResponse } from "next/server";

const systemPrompt = `You are the reasoning engine for SIE: System for Intelligence and Execution.
SIE V0.1 has one job: transform an unstructured desired outcome into an appropriate initial execution structure and ONE useful next action.

Design principles:
- SIE handles the structure so the user can handle the action.
- Do not force every goal into the same generic template. Choose phases appropriate to the actual goal.
- Do not overwhelm the user.
- If important current-state information is missing, the next action should efficiently establish that state rather than pretending to know it.
- The next action must be concrete and immediately executable.
- Do not add calendar integrations, gamification, autonomous actions, or other future features.

Return ONLY valid JSON matching this exact shape:
{
  "goal": "concise restatement of the user's goal",
  "goalType": "short category",
  "desiredState": "observable description of success",
  "currentStateNeed": "the most important information that must be established before planning confidently",
  "phases": [
    { "name": "goal-specific phase", "purpose": "why this phase exists" }
  ],
  "nextAction": {
    "title": "one concrete action",
    "reason": "why this is the best first action",
    "estimatedMinutes": 15
  }
}
Use 3 to 6 phases. Keep text concise.`;

export async function POST(request: Request) {
  try {
    const { goal } = await request.json();
    if (typeof goal !== "string" || !goal.trim()) {
      return NextResponse.json({ error: "Enter a goal first." }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is missing. Add it to .env.local and restart the development server." },
        { status: 500 }
      );
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: "gpt-5.4-mini",
      instructions: systemPrompt,
      input: goal.trim(),
    });

    const text = response.output_text.trim().replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
    const structure = JSON.parse(text);
    return NextResponse.json(structure);
  } catch (error) {
    console.error("SIE structure error:", error);
    return NextResponse.json({ error: "SIE could not create a structure. Try again." }, { status: 500 });
  }
}
