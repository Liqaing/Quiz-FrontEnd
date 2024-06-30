"use server";

import { redirect } from "next/navigation";
import { isEmpty } from "@/utils/utils";
import { customFetch } from "@/utils/API/CustomFetch";
import { headers } from "next/headers";
import { GetUserRole } from "../Auth/GetUserRole";

export default async function DeletePlayAction(formState: {message: string}, formData:FormData): Promise<{ message: string }> {
    
    let data = null;
    // const userRole = await GetUserRole() as string;
    // if (userRole != "ROLE_ADMIN") {            
    //     redirect("/");
    // }

    try {    
        const playId = formData.get("id") as string;        
        
        if (isEmpty(playId)) {
            return {
                message: "Invalid Input"
            };
        }

        const url = process.env.BASE_API_URL + "api/play/delete/" + playId;
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

    if(data) {
        const headersList = headers();
        const url = headersList.get('referer') || "";
        const fullURL = new URL(url);
        const pathname = fullURL.pathname;

        if (pathname.endsWith("/play-history")) {
            return {
                message: "success"
            };
        }
        else {
            const fromQuery = fullURL.searchParams.get("from") as string;
            redirect(fromQuery);
        }              
    }
    else{        
        return {
            message: "Something went wrong, delete unsuccessful"
        };
    }
}