import { customFetch } from "./CustomFetch";

export async function GetRole() {
    
    const url = new URL(`${process.env.BASE_API_URL}api/role` as string);

    try {
        const response = await customFetch(url.href,"GET",null);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    }
    catch (error) {
        console.error('An error occurred:', error);      
    } 
    
}