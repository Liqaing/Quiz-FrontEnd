"use server";

import { redirect } from "next/navigation";
import {GetUserRole} from "../../Auth/GetUserRole";
import { isEmpty } from "@/utils/utils";
import { customFetch } from "@/utils/API/CustomFetch";
import { headers } from 'next/headers';


const CreateQuestionAction = async (formState: {message: string}, formData: FormData): Promise<{
    message:string
}> => {

    let data:any = null;
    const userRole = await GetUserRole() as string;
    if (userRole != "ROLE_ADMIN" && userRole != "ROLE_TEACHER") {        
        return {
            message: "Unauthorized"
        }
    }

    try {
        const question = formData.get("question") as string;
        const quizId = formData.get("id") as string;
        const type = formData.get("type") as string;
        const correctAnswer = formData.get("correctAnswer") as string;

        let answerCount = null
        try {
            answerCount = Number(formData.get("answer-count") as string);        
        }
        catch(e) {
            return {
                message: "Invalid input, please fill the form accordingly"
            };
        }

        if (isEmpty(question) || isEmpty(quizId) ||
            isEmpty(type) || isEmpty(answerCount) || isEmpty(correctAnswer)
        ) {
            return {
                message: "Invalid input, please fill the form accordingly"
            };
        }
        
        const answerList:Array<{}> = [];
        // Loop through answer key word to get answer list
        for (let i = 0; i < answerCount; i++) {
            const answer = formData.get(`answer${i}`) as string;
            const isCorrect = `${i}` == correctAnswer
            
            if (isEmpty(answer) || isEmpty(isCorrect)
            ) {
                return {
                    message: "Invalid input, please fill the form accordingly"
                };
            }

            const answerData = {  
                "answer": answer,
                "correct": isCorrect
            }

            answerList.push(answerData)
        }
        
        const url = process.env.BASE_API_URL + "api/question/createQNA";
        const body = JSON.stringify(
            {
                "question": question,
                "type": type,
                "quizId": quizId,
                "answer": answerList
            }
        );

        const res = await customFetch(url, "POST", body); 
        
        if(res.ok) {
            data = await res.text();
        }
        else {
            
            let err = null;
            try {
                err = await res.text();
            }
            catch (error) {}
            
            if (err) {
                return {
                    message: err
                };
            }
        }
    }
    catch (error: any) {        
        return {
            message: error.message  
        };
    }

    if (data) {

        const headersList = headers();
        const fullUrl = headersList.get('referer') || "";
        redirect(fullUrl);
    }

    return {
        message: ""
    }
}

export default CreateQuestionAction;