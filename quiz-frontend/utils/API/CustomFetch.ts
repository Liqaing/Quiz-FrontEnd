import { cookies } from "next/headers";
import { tokenResponse } from "@/utils/definition";
import { redirect } from "next/navigation";

export async function customFetch(url: string, method: string, body: any) {
  const accessToken = "Bearer " + cookies().get("quiz-session")?.value
  const res = await fetch(
    url,
    {
      method: method,
      headers: { 
        "Content-type": "application/json",
        Authorization : accessToken
      },
      body: body
    }
  )

  if(!res.ok) {
    const role = await fetch(
      process.env.BASE_API_URL + "api/role",
      {
        method: "GET",
        headers: { 
          "Content-type": "application/json",
          Authorization : accessToken
        }
      }
    )

    if(role.ok) {
      throw new Error(await res.text());
    }

    else {
      const refreshToken = "Bearer " + cookies().get("quiz-session-refresh")?.value;
      const token = await fetch(
        process.env.BASE_API_URL + "refreshToken",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization : refreshToken
          }
        }
      )
      if(token.ok) {
        const data: tokenResponse = await token.json();
        console.log(data);
        cookies().set("quiz-session", data.accessToken, { httpOnly: true });
        cookies().set("quiz-session-refresh", data.refreshToken, { httpOnly: true });
        
        const newRes = await fetch(
          url,
          {
            method: method,
            headers: { 
              "Content-type": "application/json",
              Authorization : "Bearer " + data.accessToken
            },
            body: body
          }
        )

        if(newRes.ok) {
          return newRes;
        }
        else {

          // Try to get error message if have
          let err_msg:string | null = null
          try {
            err_msg = await newRes.text();            
          }
          catch (error) {}
          if (err_msg) {
            throw new Error(err_msg)
          }          
                  
          return newRes
        }
      }
      else {
        cookies().delete("quiz-session");
        cookies().delete("quiz-session-refresh");
        redirect("login");
      }
    }
  }
  
  return res;
}