"use server";

import { db } from "@/db";
import { hookGenerations, categories, subCategories, scriptTypes, scriptGenerations } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import OpenAI from "openai";
import { revalidatePath } from "next/cache";
import { eq, desc } from "drizzle-orm";

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

// SCRIPTS ACTIONS
export async function getScriptsMetadata() {
    const allCategories = await db.query.categories.findMany();
    const allSubCategories = await db.query.subCategories.findMany();
    const allScriptTypes = await db.query.scriptTypes.findMany();

    return {
        categories: allCategories,
        subCategories: allSubCategories,
        scriptTypes: allScriptTypes
    };
}

export async function generateScript(formData: {
    categoryId: string;
    subCategoryId: string;
    scriptTypeId: string;
    inputText?: string;
}) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const category = await db.query.categories.findFirst({ where: eq(categories.id, formData.categoryId) });
    const subCategory = await db.query.subCategories.findFirst({ where: eq(subCategories.id, formData.subCategoryId) });
    const scriptType = await db.query.scriptTypes.findFirst({ where: eq(scriptTypes.id, formData.scriptTypeId) });

    if (!category || !subCategory || !scriptType) throw new Error("Invalid selection");

    const prompt = `
        Category: ${category.name}
        Sub-Category: ${subCategory.name}
        Script Type: ${scriptType.name}
        Context/Topic: ${formData.inputText || "General trending topics in this niche"}

        Please generate a high-retention script following this structure:
        1. Hook (1-2 scroll-stopping lines)
        2. Script body (Engaging, platform-appropriate content)
        3. CTA (1 clear call to action)

        Keep it concise, high-retention, and optimized for the selected script type.
    `;

    const response = await client.chat.completions.create({
        model: model,
        messages: [
            {
                role: "system",
                content: "You are a senior social media scriptwriter specializing in high-retention content. You write scripts that hook viewers instantly and lead to high engagement."
            },
            {
                role: "user",
                content: prompt
            }
        ],
    });

    const outputText = response.choices[0].message.content || "";

    // Save to DB
    const [savedScript] = await db.insert(scriptGenerations).values({
        userId,
        categoryId: formData.categoryId,
        subCategoryId: formData.subCategoryId,
        scriptTypeId: formData.scriptTypeId,
        inputText: formData.inputText,
        outputText: outputText,
    }).returning();

    revalidatePath("/dashboard/scripts");

    return { success: true, script: savedScript };
}

export async function getScriptsHistory() {
    const { userId } = await auth();
    if (!userId) return [];

    return await db.query.scriptGenerations.findMany({
        where: (scripts, { eq }) => eq(scripts.userId, userId),
        with: {
            category: true,
            subCategory: true,
            scriptType: true
        },
        orderBy: (scripts, { desc }) => [desc(scripts.createdAt)],
    });
}
