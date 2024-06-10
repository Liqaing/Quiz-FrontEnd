"use server";

import { redirect } from 'next/navigation'
import { cookies, headers } from 'next/headers'
import CheckLogin from './CheckLogin';
import { isEmpty } from '@/utils/utils';
import DeleteCookie from './DeleteCookie';
import { tokenResponse } from '@/utils/definition'

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
            message: "Invalid input, please fill the form accordingly"
        };
    }   

    try {
        const url = process.env.BASE_API_URL + "auth";  
        const body = JSON.stringify({
            username: username,
            password: password
        });

        const res = await fetch(
            url,
            {
                method: "POST",
                headers: {
                    'Content-type' : "application/json"
                },
                body: body
            }
        );
        console.log(url);
        if(res.ok) {
            const data: tokenResponse = await res.json();
            console.log(data);
            cookies().set("quiz-session", data.accessToken, { httpOnly: true });
            cookies().set("quiz-session-refresh", data.refreshToken, { httpOnly: true });
        }
        else if (res.status == 401) {
            return {
                message: "Username and password is incorrect"
            };
        }

    } 
    catch (error : any) {
        DeleteCookie();
        throw new Error(error);
    }
    
    redirect("/");
}

export default LoginAction;