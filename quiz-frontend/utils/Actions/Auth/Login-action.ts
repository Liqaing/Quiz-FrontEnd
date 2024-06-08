"use server";

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import CheckLogin from './CheckLogin';
import { isEmpty } from '@/utils/utils';
import DeleteCookie from './DeleteCookie';

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
            data = await res.json();            
            cookies().set({
                name: "quiz-session",
                value: JSON.stringify(data)
            });            

        }
        else if (res.status == 401) {
            return {
                message: "Username and password is incorrect"
            };
        }
    } 
    catch (error) {        
        console.log("err", error);
        DeleteCookie();
        throw new Error;
    }
    
    redirect("/");
}

export default LoginAction;