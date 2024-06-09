import CheckLogin from "@/utils/Actions/Auth/CheckLogin";
import CustomFetch from "../CustomFetch";
import RefreshToken from "@/utils/Actions/Auth/RefreshToken";

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

        let response = await CustomFetch(url.href, "GET", null);

        // Refresh token in server action as tempoary solution
        if (response.status == 401 && CheckLogin()) {
            await RefreshToken(); 
            response = await CustomFetch(url.href, "GET", null);
        }
        
        if (!response) {
            throw new Error("Something went wrong");
        }
        return await response.json();
    }
    catch (error:any) {
        throw new Error(error?.message);
    } 
    
}