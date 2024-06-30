"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const otp = async (formData: FormData) => {
  let otp = "";
  formData.forEach((val, key) => {
    if(key === "otp") {
      otp = otp + val;
    }
  })
  let data;
  try {
    const url = process.env.BASE_API_URL + "authenticateEmail";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        otp: otp,
        email: formData.get("email")
      }),
    })
    if(res.ok) {
      data = await res.json()
      console.log(data);
      cookies().set("quiz-session", data.accessToken, { httpOnly: true });
      cookies().set("quiz-session-refresh", data.refreshToken, { httpOnly: true });
    } else {
      console.log(res);
      throw new Error(res.statusText)
    }
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong")
  }
  if(data !== null) {
    redirect("/");
  }
}

export default otp;