"use server";

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

interface LoginData {
    username: string,
    password: string, 
}

const LoginAction = async (formData:FormData) => {
      
    let data = null;
    try {
        const url = process.env.BASE_API_URL + "auth";
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
            username: formData.get("username"),
            password: formData.get("password") 
            }),
    })
        if(res.ok) {
            data = await res.text()
            console.log(data);            
            cookies().set("quiz-session", data, { httpOnly: true });
        }
    } catch (error) {
        console.log(error);
    }
    
    if(data !== null) {
        redirect("/");
    }

}

export default LoginAction;