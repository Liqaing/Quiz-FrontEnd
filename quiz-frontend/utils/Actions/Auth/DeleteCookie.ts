import { cookies } from "next/headers";

export default function DeleteCookie() {
    if (cookies().has("quiz-session")) {
        cookies().delete("quiz-session");
    }
}