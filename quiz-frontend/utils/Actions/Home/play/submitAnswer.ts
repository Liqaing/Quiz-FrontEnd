"use server";

import { customFetch } from "@/utils/API/CustomFetch";
import { isEmpty } from "@/utils/utils";

export default async function submitAnswer(formState: {message: string, result:string | null}, formData: FormData): Promise<{
    message:string,
    result:string | null,
}> {

    let data = null;
    try {        
        const quizId = formData.get("quizId") as string;

        let questionCount = null
        try {
            questionCount = Number(formData.get("question-count") as string);
        }
        catch(e) {
            return {
                message: "Invalid input, please fill the form accordingly",
                result: ""
            };
        }
    
        if (isEmpty(questionCount) || isEmpty(quizId)) {
            return {
                message: "Invalid input, please fill the form accordingly",
                result: null
            };
        }

        const questionAnswerList:Array<{}> = [];    
        for (let i = 0; i < questionCount; i++) {

            const questionId = formData.get(`question-${i}`) as string;
            const answerId = formData.get(`answer-${i}` as string)
            
            if (isEmpty(answerId) || isEmpty(questionId)
            ) {
                return {
                    message: "Invalid input, please fill the form accordingly",
                    result: null
                };
            }

            const questionData = {  
                "questionId": questionId,
                "answerId": answerId
            }

            questionAnswerList.push(questionData);
        }

        const url = process.env.BASE_API_URL + "api/play/quiz/summit";
        const body = JSON.stringify(
            {
                "id": quizId,
                "questions": questionAnswerList
            }
        );

        const res = await customFetch(url, "POST", body); 
        
        
        if(res.ok) {
            data = await res.json();
        }
        else {
            
            let err = null;
            try {
                err = await res.text();
            }
            catch (error) {}
            
            if (err) {
                return {
                    message: err,
                    result: null
                };
            }
        }
    }
    catch (error: any) {        
        return {
            message: error.message,
            result: null
        };
    }
        
    return {
        message: "success",
        result: data?.score as string
    }
    
}