import DataTable from "@/components/Table/user/DataTable";
import { fetchTable } from "@/utils/API/users/table/fetch-users";
import GetUserRole from "@/utils/Actions/Auth/GetUserRole";
import { redirect } from "next/navigation";

export default async function User() {
    
    const userRole = await GetUserRole() as string;
    if (userRole != "ADMIN") {
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