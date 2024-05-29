"use server";

import { cookies } from "next/headers";

const FetchQuiz = async (prop: {page:Number}) => {
    const reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");

    // Retreive jwt bearer from cookie
    const userCookies = cookies().get("quiz-session");  
    
    if (userCookies != null) {
        reqHeaders.append("Authorization", "Bearer " + String(userCookies.value));    
    }

    const url = new URL(`${process.env.BASE_API_URL}api/quiz/findAll` as string);
    const searchParams = new URLSearchParams(
        {
        orderBy: "DATE",
        order: "DESC",
        page: String(prop.page),
        size: "TWENTY"
        }
    );

    url.search = searchParams.toString();  

    try {
        const response = await fetch(url.href, {
            method: "GET",
            headers: reqHeaders
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(response.json(), "  ")
        return await response.json();
    }
    catch (error) {
        console.error('An error occurred:', error);      
    } 
    
}

export default FetchQuiz;