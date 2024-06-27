'use server';

import { customFetch } from "@/utils/API/CustomFetch";

export async function FetchQuiz(prop: {page:Number}) {
    try {
        const url = new URL(process.env.BASE_API_URL + "api/quiz/findAll");
        url.searchParams.append("search", "");
        url.searchParams.append("orderBy", "DATE");
        url.searchParams.append("order", "DESC");
        url.searchParams.append("page", prop.page.toString());
        url.searchParams.append("size", "TEN");

        const quizzes = await customFetch(url.href, "GET", null);
        if(!quizzes.ok) {
            throw new Error("Something Went Wrong");
        }
        
        const quizzesData = await quizzes.json();
        const quizList = quizzesData.data;

        const isEnd =  Math.ceil(quizzesData.columns / 10) == prop.page;
        return {quizList, isEnd};
    }
    catch (error: any) {
        console.log("err", error)
        throw new Error(error?.message);
    }
}