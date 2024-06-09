'use server';

import { FindAll } from "@/utils/API/quiz/quiz-api";
import { cookies } from "next/headers";
import GetHeader from "../Auth/GetHeader";
import RefreshToken from "../Auth/RefreshToken";

export async function FetchQuiz(prop: {page:Number}) {
    
    try {
        const quizzes = await FindAll({page: prop.page});
        
        const quizzesData = JSON.parse(JSON.stringify(quizzes));
        const quizList = quizzesData.data;

        const isEnd =  Math.ceil(quizzesData.columns / 10) == prop.page;
        return {quizList, isEnd};
    }
    catch (error: any) {
        console.log("err", error)
        throw new Error(error?.message);
    }
}