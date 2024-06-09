"use server"
import { UserCookies } from "@/utils/data";
import { cookies } from "next/headers";


export default async function GetHeader() {
    const reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");

    // Retreive jwt bearer from cookie
    const userCookies = cookies().get("quiz-session")?.value;  
    
    if (userCookies != null) {
        // const cookieData = JSON.parse(userCookies) as UserCookies;
        reqHeaders.append("Authorization", "Bearer " + String(userCookies));    
        return reqHeaders;
    }
    return reqHeaders;
} 