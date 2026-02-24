import { getCombinedHistory } from "@/app/actions";
import DashboardContent from "@/components/DashboardContent";

export default async function DashboardPage() {
    const history = await getCombinedHistory();

    return (
        <DashboardContent initialHistory={history} />
    );
}
