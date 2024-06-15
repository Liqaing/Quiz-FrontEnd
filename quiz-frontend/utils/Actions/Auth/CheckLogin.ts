"use server";

import { cookies } from "next/headers";

const CheckLogin = () => {
    // TODO: check here what happen to expire cookie
    return cookies().has("quiz-session");
}

export default CheckLogin;