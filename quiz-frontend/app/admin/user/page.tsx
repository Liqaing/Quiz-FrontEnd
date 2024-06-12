import DataTable from "@/components/Table/user/DataTable";
import DeleteModal from "@/components/form/DeleteModal/DeleteModel";
import { fetchTable } from "@/utils/API/users/table/fetch-users";
import {GetUserRole} from "@/utils/Actions/Auth/GetUserRole";
import { redirect } from "next/navigation";

export default async function User() {
    
    const userRole: string = await GetUserRole();
    if (userRole != "ROLE_ADMIN") {
        redirect("/");
    }

    return (
        <section className="block ">
            <div className="max-w-screen-xl mx-auto p-2">
                <DataTable fetchTable={fetchTable}/>
            </div>
            
        </section>
    )
}