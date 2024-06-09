import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';

export default async function handler(req: NextApiRequest, response: NextApiResponse) {

    try {
        const url = process.env.BASE_API_URL + "refreshToken";
        const userCookies = cookies().get("quiz-session-refresh")?.value;
        if (userCookies == null) {
            // No cookies
            throw new Error("You are not login");
        }
        // const cookiesData = JSON.parse(userCookies) as UserCookies; 
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + String(userCookies)
            },
        });
        
        if (res.ok) {
            let data = await res.json();            
            
            cookies().set("quiz-session", data.accessToken, { httpOnly: true });
            cookies().set("quiz-session-refresh", data.refreshToken, { httpOnly: true });   

            // Clear the cookie by setting an expired date
            response.setHeader('Set-Cookie', `quiz-session=${data.accessToken}`);
            response.setHeader('Set-Cookie', `quiz-session-refresh=${data.refreshToken}`);
            response.status(200).end();                 
        }
        else {
            let error = await res.text();
            throw new Error(`Something went wrong. ${error}`);
        }
    }
    catch (error:any) {
        console.log("err", error);
        throw new Error(error?.message);
    }
  
    
}