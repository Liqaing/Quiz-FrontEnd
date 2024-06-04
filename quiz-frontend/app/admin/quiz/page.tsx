import DataTable from "@/components/Table/quiz/DataTable";
import { fetchTable } from "@/utils/API/quiz/table/fetch-quiz";


export default function User() {
    
    return (
        <section className="block">
            <div className="max-w-screen-xl mx-auto p-2">
                <DataTable fetchTable={fetchTable}/>
            </div>
        </section>        
    )
}