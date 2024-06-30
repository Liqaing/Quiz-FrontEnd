"use server";

import { redirect } from "next/navigation";
import {GetUserRole} from "../../Auth/GetUserRole";
import { isEmpty } from "@/utils/utils";
import { customFetch } from "@/utils/API/CustomFetch";
import { headers } from "next/headers";


const CreateQuizAction = async (formState: {message: string}, formData: FormData): Promise<{
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
        
        if (isEmpty(name) || isEmpty(visibility)) {
            return {
                message: "Invalid input, please fill the form accordingly"
            };
        }
        
        const url = process.env.BASE_API_URL + "api/quiz/create";
        const body = JSON.stringify(
            {
                "name": name,
                "description": description,
                "visibility": visibility,
                "questions": []
            }
        );

        const res = await customFetch(url, "POST", body); 
        
        if(res.ok) {
            data = await res.json();
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
        const urlObj = new URL(fullUrl);
        redirect(`${urlObj.pathname}/edit/${data.id}?name=${data.name}&visibility=${data.visibility}&createdAt${data.createdAt}&description=${data.description}`);
    }

    return {
        message: ""
    }
}

export default CreateQuizAction;