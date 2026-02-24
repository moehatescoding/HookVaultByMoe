"use server";

import { db } from "@/db";
import { hookGenerations, storyGenerations } from "@/db/schema";
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
        hookCount: parseInt(hookCount),
        generatedHooks,
    });

    revalidatePath("/dashboard");

    return { success: true, hooks: generatedHooks };
}

export async function generateStories(formData: {
    niche: string;
    storyType: string;
    audience: string;
    platform: string;
    tone: string;
    goal: string;
    length: string;
}) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const { niche, storyType, audience, platform, tone, goal, length } = formData;

    const response = await client.chat.completions.create({
        model: model,
        messages: [
            {
                role: "system",
                content: "You are a viral short-form storytelling expert. Generate platform-optimized short-form stories designed for high retention, emotional impact, and shareability."
            },
            {
                role: "user",
                content: `
                    Niche: ${niche}
                    Story Type: ${storyType}
                    Audience: ${audience}
                    Platform: ${platform}
                    Tone: ${tone}
                    Goal: ${goal}
                    Length: ${length}

                    Rules:
                    - Start with a strong hook
                    - Maintain fast pacing
                    - Emotional triggers required
                    - End with subtle CTA
                    - Return clean formatted story only
                `
            }
        ],
    });

    const generatedStories = response.choices[0].message.content || "";

    // Save to Database
    await db.insert(storyGenerations).values({
        userId,
        niche,
        storyType,
        audience,
        platform,
        tone,
        goal,
        length,
        generatedStories,
    });

    revalidatePath("/dashboard");

    return { success: true, stories: generatedStories };
}

export async function getCombinedHistory() {
    const { userId } = await auth();

    if (!userId) {
        return [];
    }

    const hooks = await db.query.hookGenerations.findMany({
        where: (hooks, { eq }) => eq(hooks.userId, userId),
    });

    const stories = await db.query.storyGenerations.findMany({
        where: (stories, { eq }) => eq(stories.userId, userId),
    });

    const combined = [
        ...hooks.map(h => ({ ...h, type: "hook" as const })),
        ...stories.map(s => ({ ...s, type: "story" as const }))
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return combined;
}
