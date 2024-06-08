"use server";

import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import DeleteCookie from "./DeleteCookie";

const HandLogout = () => {
    DeleteCookie();
    redirect("/account/login");
}

export default HandLogout;