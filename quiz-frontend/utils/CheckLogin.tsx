"use server";

import { cookies } from "next/headers";

const CheckLogin = async () => {
    return cookies().has("quiz-session");
}

export default CheckLogin;