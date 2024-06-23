import DataTable from "@/components/Table/play/DataTable";
import { fetchTable } from "@/utils/API/play/table/fetch-user-play";

export default function PlayHistory() {
    
    return (
        <section className="block">
            <div className="max-w-screen-xl mx-auto p-2">
                <DataTable fetchTable={fetchTable}/>
            </div>
        </section>
    )
}