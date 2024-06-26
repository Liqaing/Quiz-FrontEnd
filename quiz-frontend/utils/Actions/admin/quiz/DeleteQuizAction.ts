"use server";

import { redirect } from "next/navigation";
import { GetUserRole } from "../../Auth/GetUserRole";
import { isEmpty } from "@/utils/utils";
import { customFetch } from "@/utils/API/CustomFetch";
import { headers } from "next/headers";

export default async function DeleteQuizAction(formState: {message: string}, formData:FormData): Promise<{ message: string }> {
    let data = null;
    const userRole = await GetUserRole() as string;
    if (userRole != "ROLE_ADMIN" && userRole != "ROLE_TEACHER") {        
        return {
            message: "Unauthorized"
        }
    }

    try {    
        const quizId = formData.get("id") as string;        
        
        if (isEmpty(quizId)) {
            return {
                message: "Invalid Quiz"
            };
        }

        const url = process.env.BASE_API_URL + "api/quiz/delete/" + quizId;
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
        const headersList = headers();
        const fullUrl = headersList.get('referer') || "";
        // redirect(fullUrl);
        if (fullUrl.endsWith("/quiz")) {
            return {
                message: "success"
            };            
        }
        else {
            const pathname = new URL(fullUrl).pathname;
            const pathParts = pathname.split('/');
            const path = `/${pathParts[1]}/${pathParts[2]}`;
            redirect(path);
        }       
    }
    else{        
        return {
            message: "Something went wrong, delete unsuccessful"
        };
    }
}