'use server'

import { dataTable, tableResponse } from "./data";
import GetHeader from "@/utils/Actions/Auth/GetHeader";

export async function fetchTable(data: dataTable) {

  try {
    const url = new URL(process.env.BASE_API_URL + "api/user/findAll");
    url.searchParams.append("search", data.search);
    url.searchParams.append("orderBy", data.orderBy);
    url.searchParams.append("order", data.order);
    url.searchParams.append("page", data.page);
    url.searchParams.append("size", data.size);

    const headers = await GetHeader();

    const res = await fetch(url.href, {
      method: "GET",
      headers: headers
    })
    if(res.ok) {
      const user: tableResponse | null = await res.json()
      return user;
    }
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
  return null;
}