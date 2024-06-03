"use server";

import { cookies } from "next/headers"
import { redirect } from "next/navigation";

const HandLogout = () => {
    cookies().delete("quiz-session");
    redirect("/account/login");
}

export default HandLogout;