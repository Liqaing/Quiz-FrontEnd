"use server"

import { QuizData } from "@/type/type";
import { customFetch } from "../CustomFetch";

export default async function FetchPlayQuiz(quizId: string) {
    
    const url = new URL(`${process.env.BASE_API_URL}api/play/quiz/${quizId}` as string);
    
    try {
        
        const response = await customFetch(url.href, "GET", null);

        if(response.ok) {
            const quiz: QuizData | null = await response.json();
            return quiz;
        }
        else {
            let err = null;
            try {
                err = await response.text();
            }
            catch (error) {}
            if (err) {
                throw new Error(err);
            }
        }
        throw new Error("Something went wrong");
    }
    catch (error:any) {
        throw new Error(error?.message);
    }
}