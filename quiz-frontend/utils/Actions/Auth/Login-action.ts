"use server";

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import CheckLogin from './CheckLogin';
import { isEmpty } from '@/utils/utils';

interface LoginData {
    username: string,
    password: string, 
}

const LoginAction = async (currentState: {message: string}, formData: FormData) => {
    
    const isUserLogin = CheckLogin();
    if (isUserLogin) {
        redirect("/");
    }

    const username = formData.get("username");
    const password = formData.get("password")

    if (isEmpty(username) || isEmpty(password)) {
        return {
            message: "Please input username and password for login"
        };
    }

    let data = null;
    try {
        const url = process.env.BASE_API_URL + "auth";
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
            username: username,
            password: password
            }),
        });
        if(res.ok) {
            data = await res.text();
            cookies().set("quiz-session", data, { httpOnly: true });
            redirect("/");
        }
    } 
    catch (error) {        
        console.log("err", error);
        return {
            message: "error"
        };
    }
    

}

export default LoginAction;