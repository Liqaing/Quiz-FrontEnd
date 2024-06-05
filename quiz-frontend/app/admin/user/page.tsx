import DataTable from "@/components/Table/user/DataTable";
import { fetchTable } from "@/utils/API/users/table/fetch-users";

export default function User() {
    
    return (
        <section className="block">
            <div className="max-w-screen-xl mx-auto p-2">
                <DataTable fetchTable={fetchTable}/>
            </div>
        </section>        
    )
}