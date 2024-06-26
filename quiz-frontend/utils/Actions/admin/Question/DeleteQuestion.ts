 "use server";

import { redirect } from "next/navigation";
import { GetUserRole } from "../../Auth/GetUserRole";
import { isEmpty } from "@/utils/utils";
import { customFetch } from "@/utils/API/CustomFetch";
import { headers } from "next/headers";

export default async function DeleteQuestionAction(formState: {message: string}, formData:FormData): Promise<{ message: string }> {
    let data = null;
    const userRole = await GetUserRole() as string;
    if (userRole != "ROLE_ADMIN" && userRole != "ROLE_TEACHER") {        
        return {
            message: "Unauthorized"
        }
    }

    try {    
        const questionId = formData.get("id") as string;        
        
        if (isEmpty(questionId)) {
            return {
                message: "Invalid Question"
            };
        }

        const url = process.env.BASE_API_URL + "api/question/delete/" + questionId;
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

        return {
            message: "success"
        };

        // const headersList = headers();
        // const fullUrl = headersList.get('referer') || "";
        // redirect(fullUrl);
    }
    else{        
        return {
            message: "Something went wrong, delete unsuccessful"
        };
    }
}