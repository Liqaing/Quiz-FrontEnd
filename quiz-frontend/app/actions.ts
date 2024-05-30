'use server';

import { FindAll } from "@/lib/quiz/quiz-api";
import { requestAsyncStorage } from "next/dist/client/components/request-async-storage-instance";
import { cookies, headers } from "next/headers";

export async function FetchQuiz(prop: {page:Number}) {
    
    const reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");

    // Retreive jwt bearer from cookie
    const userCookies = cookies().get("quiz-session");  
    
    if (userCookies != null) {
        reqHeaders.append("Authorization", "Bearer " + String(userCookies.value));    
    }

    const quizzes = await FindAll({page: prop.page, reqHeaders});
    const quizList = JSON.parse(JSON.stringify(quizzes)).quizzes;
    return quizList;
}