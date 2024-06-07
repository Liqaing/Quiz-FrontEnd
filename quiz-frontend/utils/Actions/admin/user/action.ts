"use server";

import { redirect } from "next/navigation";
import CheckLogin from "../../Auth/CheckLogin";
import GetUserRole from "../../Auth/GetUserRole";
import { cookies } from "next/headers";
import { isEmpty } from "@/utils/utils";

interface AddUserData {
    username: string,
    password: string,
    email:string,
    role:string
}

const AddUserAction = async (formState: {message: string}, formData:any) => {

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
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password,
                "role": role
            }),
        })
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