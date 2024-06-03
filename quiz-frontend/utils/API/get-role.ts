import GetHeader from "../Actions/Auth/GetHeader";

export async function GetRole() {
    
    const url = new URL(`${process.env.BASE_API_URL}api/role` as string);
    const headers = await GetHeader();    

    try {
        const response = await fetch(url.href, {
            method: "GET",
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    }
    catch (error) {
        console.error('An error occurred:', error);      
    } 
    
}