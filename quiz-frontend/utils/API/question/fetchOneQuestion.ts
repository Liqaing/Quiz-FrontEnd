"use server"
import { Question } from "@/type/type";
import { customFetch } from "@/utils/API/CustomFetch";

export async function FetchOneQuestion(id:string | null) {
    
    const url = new URL(`${process.env.BASE_API_URL}api/question/findQNA/${id}` as string);   

    try {

        const response = await customFetch(url.href, "GET", null);

        if(response.ok) {
            const quiz: Question | null = await response.json();
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
        throw new Error("Question Not Found");
    }
    catch (error:any) {
        console.log(error);
        throw new Error(error?.message);        
    }
    
}