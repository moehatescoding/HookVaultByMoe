import { getHistory } from "@/app/actions";
import DashboardContent from "@/components/DashboardContent";

export default async function DashboardPage() {
    const history = await getHistory();

    return (
        <DashboardContent initialHistory={history} />
    );
}
