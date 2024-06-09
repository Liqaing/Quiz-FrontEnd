"use server";

import { redirect } from "next/navigation";
import CheckLogin from "../../Auth/CheckLogin";
import GetUserRole from "../../Auth/GetUserRole";
import { isEmpty } from "@/utils/utils";
import { customFetch } from "@/utils/API/CustomFetch";


const AddUserAction = async (formData: FormData) => {

    try {
        const isUserLogin = CheckLogin();
        if (isUserLogin) {
            redirect("/login");
        }

        const userRole = await GetUserRole() as string;
        if (userRole != "ADMIN") {
            redirect("/");
        }
        
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const role = formData.get("role") as string;
        
        if (isEmpty(role) || isEmpty(username) || isEmpty(email) || isEmpty(password)) {
            return {
                message: "Invalid input, please fill the form accordingly"
            };
        }
        
        const url = process.env.BASE_API_URL + "api/user/create";
        const body = JSON.stringify({
            "username": username,
            "email": email,
            "password": password,
            "role": role
        });
        console.log(body)
        const res = await customFetch(url, "POST", body); 
        
        if(res.ok) {
            const data = await res.text()
            if(data === "success") {
                redirect("/admin/user")
            }
        }
    }
    catch (error: any) {
        return {
            message: error.message  
        };
    }
    
}

export default AddUserAction;