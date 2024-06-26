"use server";

import { redirect } from "next/navigation";
import {GetUserRole} from "../../Auth/GetUserRole";
import { isEmpty } from "@/utils/utils";
import { customFetch } from "@/utils/API/CustomFetch";
import { headers } from "next/headers";


const EditQuizAction = async (formState: {message: string}, formData: FormData): Promise<{
    message:string
}> => {

    let data:any = null;
    const userRole = await GetUserRole() as string;
    if (userRole != "ROLE_ADMIN" && userRole != "ROLE_TEACHER") {        
        return {
            message: "Unauthorized"
        }
    }

    try {    
        const name = formData.get("name") as string;
        const visibility = formData.get("visibility") as string;
        const description = formData.get("description") as string;
        const quizId = formData.get("id") as string;
        
        if (isEmpty(quizId) || isEmpty(name) || isEmpty(visibility)) {
            return {
                message: "Invalid input, please fill the form accordingly"
            };
        }
        
        const url = process.env.BASE_API_URL + "api/quiz/update/" + quizId;
        const body = JSON.stringify(
            {
                "name": name,
                "description": description,
                "visibility": visibility,
            }
        );

        const res = await customFetch(url, "PUT", body); 
        
        if(res.ok) {
            data = await res.text();
        }
        else {
            
            let err = null;
            try {
                err = await res.text();
            }
            catch (error) {}
            
            if (err) {
                return {
                    message: err
                };
            }
        }
    }
    catch (error: any) {        
        return {
            message: error.message  
        };
    }

    if (data) {
        const headersList = headers();
        const fullUrl = headersList.get('referer') || "";
        redirect(fullUrl);
    }

    return {
        message: ""
    }
}

export default EditQuizAction;