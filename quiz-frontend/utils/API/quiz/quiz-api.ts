
export async function FindAll(prop: {page:Number, reqHeaders:Headers}) {
    
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
        const response = await fetch(url.href, {
            method: "GET",
            headers: prop.reqHeaders
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response   .json();
    }
    catch (error) {
        console.error('An error occurred:', error);      
    } 
    
}