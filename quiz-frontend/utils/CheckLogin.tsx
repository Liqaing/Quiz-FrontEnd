"use server";

import { cookies } from "next/headers";

const CheckLogin = () => {
    const userCookies = cookies().get("quiz-session");  
    
    if (userCookies) {
        return true;
    }
    return false;
}

export default CheckLogin;