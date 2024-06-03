"use server";

import { GetRole } from "@/utils/API/get-role";
import CheckLogin from "./CheckLogin";

const GetUserRole = async () => {
    const isUserLogin = CheckLogin();
    if (isUserLogin) {
        
        const role = await GetRole();
        return role;
    }
    return false
}

export default GetUserRole;