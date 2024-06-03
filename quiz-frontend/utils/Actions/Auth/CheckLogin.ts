"use server";

import { cookies } from "next/headers";

const CheckLogin = () => {
    return cookies().has("quiz-session");
}

export default CheckLogin;