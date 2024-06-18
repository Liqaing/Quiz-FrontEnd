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
        const answer1 = formData.get("answer0") as string;
        const answer2 = formData.get("answer1") as string;
        const answer3 = formData.get("answer2") as string;
        const answer4 = formData.get("answer3") as string;
        const correctAnswer = formData.get("correctAnswer") as string;

        if (isEmpty(question) || isEmpty(questionId) ||
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
                "correct": "0" == correctAnswer
            }, 
            {
                "answer": answer2,
                "correct": "1" == correctAnswer
            },
            {
                "answer": answer3,
                "correct": "2" == correctAnswer
            },
            {
                "answer": answer4,
                "correct": "3" == correctAnswer
            }
        ];
        

        
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