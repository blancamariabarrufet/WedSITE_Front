export type DemoChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type DemoChatContext = {
  partner1_name: string;
  partner2_name: string;
  contact_email: string;
  wedding_date: string;
  tone: string;
  ceremony_venue: string;
  reception_venue: string;
  dress_code: string;
  arrival_note: string;
  extra_details: string;
};

const CHATBOT_API_BASE_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL?.replace(/\/+$/, "") ?? "";
const CHAT_HISTORY_LIMIT = 20;
const CHAT_TEXT_LIMIT = 4000;

function cleanText(value: string) {
  return value.trim().slice(0, CHAT_TEXT_LIMIT);
}

function cleanHistory(history: DemoChatMessage[]) {
  return history
    .map((message) => ({
      role: message.role,
      content: cleanText(message.content),
    }))
    .filter((message) => message.content)
    .slice(-CHAT_HISTORY_LIMIT);
}

type StreamDemoChatInput = {
  message: string;
  history: DemoChatMessage[];
  demoContext: DemoChatContext;
  signal: AbortSignal;
  onDelta: (delta: string) => void;
};

function parseDataLine(eventText: string) {
  return eventText
    .split("\n")
    .find((line) => line.startsWith("data: "))
    ?.slice(6)
    .trim();
}

export async function streamDemoChat({
  message,
  history,
  demoContext,
  signal,
  onDelta,
}: StreamDemoChatInput) {
  const cleanMessage = cleanText(message);

  if (!CHATBOT_API_BASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_CHATBOT_API_URL");
  }

  if (!cleanMessage) {
    throw new Error("Message is required");
  }

  const response = await fetch(`${CHATBOT_API_BASE_URL}/api/chat/demo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "omit",
    signal,
    body: JSON.stringify({
      message: cleanMessage,
      history: cleanHistory(history),
      demo_context: demoContext,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("Demo chat request failed", { status: response.status, body });
    throw new Error(`Chat API ${response.status}`);
  }

  if (!response.body) {
    throw new Error("Chat API response body is empty");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let fullReply = "";

  function handleEvent(eventText: string) {
    const payload = parseDataLine(eventText);
    if (!payload) {
      return false;
    }

    if (payload === "[DONE]") {
      return true;
    }

    try {
      const event = JSON.parse(payload) as { delta?: string; error?: string };

      if (event.error) {
        console.error("Demo chat stream error", event.error);
        throw new Error(event.error);
      }

      if (event.delta) {
        fullReply += event.delta;
        onDelta(event.delta);
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        return false;
      }
      throw error;
    }

    return false;
  }

  while (true) {
    const { value, done } = await reader.read();

    if (done) {
      if (buffer) {
        handleEvent(buffer);
      }
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";

    for (const eventText of events) {
      if (handleEvent(eventText)) {
        return fullReply;
      }
    }
  }

  return fullReply;
}
