"use server";

import { redirect } from "next/navigation";
import {GetUserRole} from "../../Auth/GetUserRole";
import { isEmpty } from "@/utils/utils";
import { customFetch } from "@/utils/API/CustomFetch";
import { headers } from 'next/headers';


const EditQuestionAction = async (formState: {message: string}, formData: FormData): Promise<{
    message:string
}> => {

    let data:any = null;
    const userRole = await GetUserRole() as string;
    if (userRole != "ROLE_ADMIN") {            
        redirect("/");
    }

    try {
        const question = formData.get("question") as string;
        const questionId = formData.get("question-id") as string;
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

        if (isEmpty(question) || isEmpty(questionId) ||
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
            const answerId = formData.get(`answerId${i}`) as string;
            const isCorrect = `${i}` == correctAnswer
            
            if (isEmpty(answer) || isEmpty(answerId) || isEmpty(isCorrect)
            ) {
                return {
                    message: "Invalid input, please fill the form accordingly"
                };
            }

            const answerData = {
                "id": answerId,
                "answer": answer,
                "correct": isCorrect
            }

            answerList.push(answerData)
        }

        
        const url = process.env.BASE_API_URL + "api/question/updateQNA/" + questionId;
        const body = JSON.stringify(
            {
                "question": question,
                "type": type,
                "answer": answerList
            }
        );

        const res = await customFetch(url, "PUT", body); 
        
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

export default EditQuestionAction;