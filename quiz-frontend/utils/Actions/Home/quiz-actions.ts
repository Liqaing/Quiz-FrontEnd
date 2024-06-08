'use server';

import { FindAll } from "@/utils/API/quiz/quiz-api";
import { cookies } from "next/headers";
import GetHeader from "../Auth/GetHeader";

export async function FetchQuiz(prop: {page:Number}) {
    
    try {        
        // Retreive jwt bearer from cookie
        const reqHeaders = await GetHeader();

        const quizzes = await FindAll({page: prop.page, reqHeaders});
        
        const quizzesData = JSON.parse(JSON.stringify(quizzes));
        const quizList = quizzesData.data;

        const isEnd =  Math.ceil(quizzesData.columns / 10) == prop.page;
        return {quizList, isEnd};
    }
    catch (error: any) {
        throw new Error(error?.message);
    }
}