"use server"
import { cookies, headers } from "next/headers";
import GetHeader from "../Actions/Auth/GetHeader"
import RefreshToken from "../Actions/Auth/RefreshToken";
import CheckLogin from "../Actions/Auth/CheckLogin";
import { UserCookies } from "../data";

export default async function CustomFetch(url:string, method:string, body:any) {

    try {
        
        let res = await MakeReq(url, method, body);

        if (!res.ok && await CheckLogin()) {
        
            // Try to refresh token
            // await RefreshToken();
            const response = await fetch(process.env.MY_URL + '/api/refresh');
            if (!response.ok) {
                throw new Error("Something went wrong");
            }
            // new requst after refresh
            res = await MakeReq(url, method, body);
        }    
        
        return res;
    }    
    catch (error: any) {
        throw new Error(error?.message);
    }
}

async function MakeReq(url:string, method:string, body:any) {
    const reqHeaders = await GetHeader();
    const response = await fetch(
        url,    
        {
            method: method,
            headers: reqHeaders,
            body: body
        }
    );
    return response;
}