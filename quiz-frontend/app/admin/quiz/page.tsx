import DataTable from "@/components/Table/quiz/DataTable";
import { fetchTable } from "@/utils/API/quiz/table/fetch-quiz";


export default function Quiz() {
    
    return (
        <section className="block">
            <div className="max-w-screen-xl mx-auto">
                <DataTable fetchTable={fetchTable}/>
            </div>
        </section>
    )
}