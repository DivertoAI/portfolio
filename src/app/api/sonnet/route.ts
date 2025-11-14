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

    const apiKey = process.env.SONNET_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "SONNET_API_KEY is not configured" }, { status: 500 });
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
      model: "claude-3-5-haiku-20241022",
      max_tokens: 500,
      temperature: 0.3,
      system:
        "You are a concise AI concierge narrating Saswata Saha's impact for US-based engineering leaders. Respond in fast, executive-ready bullets with clear actions.",
      messages: [
        ...history.map((message: Message) => ({
          role: message.role,
          content: [{ type: "text" as const, text: message.content }],
        })),
        {
          role: "user" as const,
          content: [
            {
              type: "text" as const,
              text: `${summaryBlock}\n\nExperience:\n${experienceBlock}\n\nViewer question: ${prompt}`,
            },
          ],
        },
      ],
    };

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Sonnet error", errorText);
      return NextResponse.json({ error: "Unable to reach Sonnet" }, { status: 500 });
    }

    const data = await response.json();
    const reply = data?.content?.[0]?.text || "No response";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Sonnet route error", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
