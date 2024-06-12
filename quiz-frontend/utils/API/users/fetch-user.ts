import { customFetch } from "@/utils/API/CustomFetch";

export type userData = {
    id: string,
    name: string,
    email: string,
    role: string,
    createdAt: string,
    updatedAt: string
}

export async function FetchUser(id: string) {

  try {

    const url = new URL(process.env.BASE_API_URL + "api/user/find/" + id);
    const res = await customFetch(url.href, "GET", null);
    
    if(res.ok) {
      const user: userData | null = await res.json()
      return user;
    }
    else {
        let err = null;
        try {
            err = await res.text();
        }
        catch (error) {}
        if (err) {
            throw new Error(err);
        }
    }

    throw new Error("User Not Found");
  
} catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
}