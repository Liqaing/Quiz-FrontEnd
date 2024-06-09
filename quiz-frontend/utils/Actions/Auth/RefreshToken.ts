"use server"

import { cookies } from "next/headers";
import { UserCookies } from "@/utils/data";
import { NextResponse } from 'next/server';

export default async function RefreshToken() {
    try {
        const url = process.env.BASE_API_URL + "refreshToken";
        const userCookies = cookies().get("quiz-session-refresh")?.value;
        if (userCookies == null) {
            // No cookies
            throw new Error("You are not login");
        }
        // const cookiesData = JSON.parse(userCookies) as UserCookies; 
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + String(userCookies)
            },
        });
        
        if (res.ok) {
            let data = await res.json();            
            
            cookies().set("quiz-session", data.accessToken, { httpOnly: true });
            cookies().set("quiz-session-refresh", data.refreshToken, { httpOnly: true });                    
        }
        else {
            let error = await res.text();
            throw new Error(`Something went wrong. ${error}`);
        }
    }
    catch (error:any) {
        console.log("err", error);
        throw new Error(error?.message);
    }

    
    
    return new NextResponse()
}