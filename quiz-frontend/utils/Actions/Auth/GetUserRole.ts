"use server";
import { cookies } from "next/headers";
import CheckLogin from "./CheckLogin";

export const GetUserRole = async () => {
    const isUserLogin = CheckLogin();
    if (isUserLogin) {
        const token = cookies().get("quiz-session")?.value;
        const data = await parseJwt(token);
        const role = data.role;
        return role;
    }
    return false
}

export async function parseJwt(token: string | undefined) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
}
