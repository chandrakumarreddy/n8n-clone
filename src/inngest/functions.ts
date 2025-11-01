import { inngest } from "./client";

export const executeAi = inngest.createFunction(
  { id: "execute-ai" },
  { event: "test/execute-ai" },
  async ({ step }) => {
    await step.run("executing-ai", async () => {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          },
          body: JSON.stringify({
            reasoning: {
              enabled: false,
            },
            model: "z-ai/glm-4.5-air:free",
            messages: [
              {
                role: "user",
                content:
                  "Write a India's independence movement and role of sardar vallabhai patel ",
              },
            ],
          }),
        }
      );
      return response.json();
    });
    return { message: `Ai executed` };
  }
);
