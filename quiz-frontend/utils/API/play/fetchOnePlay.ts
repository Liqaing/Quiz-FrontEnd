"use server"
import { PlayHistory } from "@/type/type";
import { customFetch } from "@/utils/API/CustomFetch";

export async function FetchOnePlay(id:string | null) {
    
    const url = new URL(`${process.env.BASE_API_URL}api/play/find/${id}` as string);   

    try {

        const response = await customFetch(url.href, "GET", null);

        if(response.ok) {
            const playHistory: PlayHistory | null = await response.json();
            return playHistory;
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
        throw new Error("Not Found");
    }
    catch (error:any) {
        console.log(error);
        throw new Error(error?.message);        
    }
    
}