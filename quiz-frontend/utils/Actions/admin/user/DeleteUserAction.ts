"use server";

import { redirect } from "next/navigation";
import { GetUserRole } from "../../Auth/GetUserRole";
import { isEmpty } from "@/utils/utils";
import { customFetch } from "@/utils/API/CustomFetch";

export default async function DeleteUserAction(formState: {message: string}, formData:FormData): Promise<{ message: string }> {
    let data = null;
    const userRole = await GetUserRole() as string;
    if (userRole != "ROLE_ADMIN") {            
        redirect("/");
    }

    try {    
        const userId = formData.get("id") as string;        
        
        if (isEmpty(userId)) {
            return {
                message: "Invalid User ID"
            };
        }

        const url = process.env.BASE_API_URL + "api/user/delete/" + userId;
        const res = await customFetch(url, "DELETE", null); 
        
        if(res.ok) {
            data = await res.text();
        }

        if (res.status == 404) {
            return {
                message: await res.text()
            };
        }
    }
    catch (error: any) {
        
        return {
            message: error.message
        };
    }

    if(data === "success") {
        redirect("/admin/user");
    }
    else{        
        return {
            message: "Something went wrong, delete unsuccessful"
        };
    }
}