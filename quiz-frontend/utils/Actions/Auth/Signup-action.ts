"use server";

import { redirect } from "next/navigation";
import CheckLogin from "./CheckLogin";
import { isEmpty } from "@/utils/utils";
import DeleteCookie from "./DeleteCookie";

interface RegisterData {
    username: string,
    password: string,
    email:string,
    role:string
}

const SignUpAction = async (formState: {message: string}, formData:any) => {
    
    try {
        const isUserLogin = CheckLogin();
        if (isUserLogin) {
            redirect("/");
        }

        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirm-password") as string;
        const role = formData.get("role") as string;
        
        if (isEmpty(username) || isEmpty(password) || isEmpty(email) || isEmpty(confirmPassword) || isEmpty(role)) {
            return {
                message: "Invalid input, please fill the form accordingly"
            };
        }    

        if (password != confirmPassword) {
            return {
                message: "Confirmed password not matched"
            };
        }

        const response = await fetch('https://quiz-uy6f.onrender.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password,
                "role": role
            })
        });        
    }
    catch(error) {
        console.log("err", error);
        DeleteCookie();
        throw new Error;
    }

    redirect("/account/login");
}

export default SignUpAction