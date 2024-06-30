
import DataTable from "@/components/Table/play/DataTable";
import { fetchTable } from "@/utils/API/play/table/fetch-play";

export default function Play() {
    
    return (
        <section className="block">
            <div className="max-w-screen-xl mx-auto">
                <DataTable fetchTable={fetchTable} pathBack="/admin/play-history"/>
            </div>
        </section>
    )
}