"use server"
import { customFetch } from "@/utils/API/CustomFetch";

export async function FindAll(prop: {page:Number}) {
    
    const url = new URL(`${process.env.BASE_API_URL}api/quiz/findAll` as string);
    const searchParams = new URLSearchParams(
        {
        orderBy: "DATE",
        order: "DESC",
        page: String(prop.page),
        size: "TEN"
        }
    );

    url.search = searchParams.toString();  

    try {

        const response = await customFetch(url.href, "GET", null);

        if (!response) {
            throw new Error("Something went wrong");
        }
        return await response.json();
    }
    catch (error:any) {
        throw new Error(error?.message);
    }
    
}