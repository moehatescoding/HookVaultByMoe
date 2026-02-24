import { db } from "./index";
import { categories, subCategories, scriptTypes } from "./schema";

async function seed() {
    console.log("Seeding started...");

    // Categories
    const business = await db.insert(categories).values({
        name: "Business",
        slug: "business",
    }).returning();

    const entertainment = await db.insert(categories).values({
        name: "Entertainment",
        slug: "entertainment",
    }).returning();

    const lifestyle = await db.insert(categories).values({
        name: "Lifestyle",
        slug: "lifestyle",
    }).returning();

    const education = await db.insert(categories).values({
        name: "Education",
        slug: "education",
    }).returning();

    // SubCategories
    const saas = await db.insert(subCategories).values({
        categoryId: business[0].id,
        name: "SaaS",
        slug: "saas",
    }).returning();

    const ecommerce = await db.insert(subCategories).values({
        categoryId: business[0].id,
        name: "E-commerce",
        slug: "ecommerce",
    }).returning();

    const gaming = await db.insert(subCategories).values({
        categoryId: entertainment[0].id,
        name: "Gaming",
        slug: "gaming",
    }).returning();

    const fitness = await db.insert(subCategories).values({
        categoryId: lifestyle[0].id,
        name: "Fitness",
        slug: "fitness",
    }).returning();

    const programming = await db.insert(subCategories).values({
        categoryId: education[0].id,
        name: "Programming",
        slug: "programming",
    }).returning();

    // Script Types
    const types = [
        { name: "Reel Script", slug: "reel-script" },
        { name: "YouTube Script", slug: "youtube-script" },
        { name: "UGC Ad Script", slug: "ugc-ad-script" },
        { name: "Shorts Script", slug: "shorts-script" },
    ];

    for (const subCat of [saas[0], ecommerce[0], gaming[0], fitness[0], programming[0]]) {
        for (const type of types) {
            await db.insert(scriptTypes).values({
                subCategoryId: subCat.id,
                name: type.name,
                slug: type.slug,
            });
        }
    }

    console.log("Seeding completed successfully.");
}

seed().catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
});
