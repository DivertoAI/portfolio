import { NextResponse } from "next/server";
import { profile } from "@/data/profile";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, history = [] } = body as {
      prompt?: string;
      history?: Message[];
    };

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OPENAI_API_KEY is not configured" }, { status: 500 });
    }

    const summaryBlock = `Profile: ${profile.name} – ${profile.title} based in ${profile.location}.
Summary: ${profile.summary}
Core stats: ${profile.stats.map((stat) => `${stat.label}: ${stat.value}`).join(" | ")}.`;
    const experienceBlock = profile.experiences
      .map(
        (exp) =>
          `${exp.role} @ ${exp.company} (${exp.period}) – ${exp.impact}. Highlights: ${exp.highlights.join(", ")}`,
      )
      .join("\n");

    const payload = {
      model: "gpt-4o-mini",
      max_tokens: 500,
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You are a concise AI concierge narrating Saswata Saha's impact for US-based engineering leaders. Respond in fast, executive-ready bullets with clear actions.",
        },
        ...history.map((message: Message) => ({
          role: message.role,
          content: message.content,
        })),
        {
          role: "user" as const,
          content: `${summaryBlock}\n\nExperience:\n${experienceBlock}\n\nViewer question: ${prompt}`,
        },
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI error", errorText);
      return NextResponse.json({ error: "Unable to reach OpenAI" }, { status: 500 });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "No response";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("OpenAI route error", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
