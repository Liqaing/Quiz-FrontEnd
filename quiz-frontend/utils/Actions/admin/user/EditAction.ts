"use server";

import { redirect } from "next/navigation";
import { GetUserRole } from "../../Auth/GetUserRole";
import { isEmpty } from "@/utils/utils";
import { customFetch } from "@/utils/API/CustomFetch";

export default async function EditUserAction(formState: {message: string}, formData:FormData): Promise<{
    message:string
}> {
    let data = null;
    const userRole = await GetUserRole() as string;
    if (userRole != "ROLE_ADMIN") {            
        redirect("/");
    }

    try {    
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        let password = formData.get("password") as string;
        const role = formData.get("role") as string;
        const userId = formData.get("id") as string
        
        if (isEmpty(userId) || isEmpty(role) || isEmpty(username) || isEmpty(email)) {
            return {
                message: "Invalid input, please fill the form accordingly"
            };
        }

        // if (isEmpty(password)) {
        //     password = ""
        // };
        
        const url = process.env.BASE_API_URL + "api/user/update/" + userId;
        const body = JSON.stringify({
            "username": username,
            "email": email,
            "password": password,
            "role": role
        });

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

    if(data === "success") {
        redirect("/admin/user");                 
    }

    return {
        message: ""  
    };
}