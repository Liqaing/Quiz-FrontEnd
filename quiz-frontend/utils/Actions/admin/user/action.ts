"use server";

import { redirect } from "next/navigation";
import CheckLogin from "../../Auth/CheckLogin";
import GetUserRole from "../../Auth/GetUserRole";
import { cookies } from "next/headers";

interface AddUserData {
    username: string,
    password: string,
    email:string,
    role:string
}

const AddUserAction = async (formData:any) => {
    let data = null;
    try {
        const isUserLogin = CheckLogin();
        if (isUserLogin) {
            redirect("/");
        }

        const userRole = await GetUserRole() as string;
        if (userRole != "ADMIN") {
            redirect("/");
        }

        const addUserData: AddUserData = {
            username: formData.get("username") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            role: formData.get("role") as string
        }
        
        const url = process.env.BASE_API_URL + "api/user/create";
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(addUserData),
        })
        if(res.ok) {
            data = await res.text()                        
        }

    } catch (error) {
        console.log(error);
    }
    
    if(data === "success    ") {
        redirect("/admin/user")
    }       
}

export default AddUserAction