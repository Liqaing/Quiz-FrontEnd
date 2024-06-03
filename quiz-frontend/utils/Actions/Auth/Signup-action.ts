"use server";

import { redirect } from "next/navigation";

interface RegisterData {
    username: string,
    password: string,
    email:string,
    role:string
}

const SignUpAction = async (formData:any) => {
    
    const registerData: RegisterData = {
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        role: formData.get("role") as string
    }

    // console.log(JSON.stringify(registerData))

    const response = await fetch('https://quiz-uy6f.onrender.com/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": registerData.username,
            "email": registerData.email,
            "password": registerData.password,
            "role": registerData.role
        })
    });

    redirect("/account/login")
}

export default SignUpAction