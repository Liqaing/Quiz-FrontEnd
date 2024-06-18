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
    if (userRole != "ROLE_ADMIN") {            
        redirect("/");
    }

    try {
        const question = formData.get("question") as string;
        const quizId = formData.get("id") as string;
        const type = formData.get("type") as string;
        const answer1 = formData.get("answer1") as string;
        const answer2 = formData.get("answer2") as string;
        const answer3 = formData.get("answer3") as string;
        const answer4 = formData.get("answer4") as string;
        const correctAnswer = formData.get("correct") as string;

        if (isEmpty(question) || isEmpty(quizId) || isEmpty(quizId) ||
            isEmpty(type) || isEmpty(answer1) || isEmpty(answer2) || isEmpty(answer3) ||
            isEmpty(answer4) || isEmpty(correctAnswer)
        ) {
            return {
                message: "Invalid input, please fill the form accordingly"
            };
        }

        // Construct answer for submit
        const answerList = [
            {
                "answer": answer1,
                "correct": answer1 == correctAnswer
            }, 
            {
                "answer": answer2,
                "correct": answer2 == correctAnswer
            },
            {
                "answer": answer3,
                "correct": answer3 == correctAnswer
            },
            {
                "answer": answer4,
                "correct": answer4 == correctAnswer
            }
        ];
        

        
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
        redirect(fullUrl.replace("&add-question=True", ""));
    }

    return {
        message: ""
    }
}

export default CreateQuestionAction;