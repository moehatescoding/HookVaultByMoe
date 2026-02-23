"use server";

import { db } from "@/db";
import { hookGenerations } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import OpenAI from "openai";
import { revalidatePath } from "next/cache";

const token = process.env.GITHUB_TOKEN;
const model = process.env.AI_MODEL || "gpt-4o";

const client = new OpenAI({
    apiKey: token,
    baseURL: "https://models.inference.ai.azure.com",
});

export async function generateHooks(formData: {
    niche: string;
    topic: string;
    audience: string;
    platform: string;
    tone: string;
    goal: string;
    hookCount: string;
}) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const { niche, topic, audience, platform, tone, goal, hookCount } = formData;

    const response = await client.chat.completions.create({
        model: model,
        messages: [
            {
                role: "system",
                content: "You are an elite short-form content strategist. Generate high-converting viral hooks optimized for retention, curiosity, and emotional impact. Do not generate full scripts. Only hooks. Hooks must be scroll-stopping. Avoid clichés. Avoid generic lines. Keep most hooks under 15 words. Vary hook pattern types. Return clean numbered list only."
            },
            {
                role: "user",
                content: `
Niche: ${niche}
Topic: ${topic}
Target Audience: ${audience}
Platform: ${platform}
Tone: ${tone}
Goal: ${goal}
Number of Hooks: ${hookCount}
        `
            }
        ],
    });

    const generatedHooks = response.choices[0].message.content || "";

    // Save to Database
    await db.insert(hookGenerations).values({
        userId,
        niche,
        topic,
        audience,
        platform,
        tone,
        goal,
        hookCount,
        generatedHooks,
    });

    revalidatePath("/dashboard");

    return { success: true, hooks: generatedHooks };
}

export async function getHistory() {
    const { userId } = await auth();

    if (!userId) {
        return [];
    }

    return await db.query.hookGenerations.findMany({
        where: (hooks, { eq }) => eq(hooks.userId, userId),
        orderBy: (hooks, { desc }) => [desc(hooks.createdAt)],
    });
}
