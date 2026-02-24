import { getScriptsMetadata } from "@/app/actions";
import ScriptsContent from "@/components/ScriptsContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Script Generator | HookVaultByMoe",
    description: "Generate high-retention social media scripts in seconds.",
};

export default async function ScriptsPage() {
    const { categories, subCategories, scriptTypes } = await getScriptsMetadata();

    return (
        <ScriptsContent
            initialCategories={categories}
            initialSubCategories={subCategories}
            initialScriptTypes={scriptTypes}
        />
    );
}
