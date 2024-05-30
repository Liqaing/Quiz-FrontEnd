'use server'

import { cookies } from "next/headers";
import { dataTable, tableResponse } from "./data";



export async function fetchTable(data: dataTable) {
  'use server';

  try {
    const url = new URL(process.env.BASE_API_URL + "api/quiz/findAll");
    url.searchParams.append("search", data.search);
    url.searchParams.append("orderBy", data.orderBy);
    url.searchParams.append("order", data.order);
    url.searchParams.append("page", data.page);
    url.searchParams.append("size", data.size);

    const res = await fetch(url.href, {
      method: "GET",
      headers: {
        Authorization : "Bearer " + cookies().get("quiz-session")?.value,
      }
    })
    if(res.ok) {
      const quiz: tableResponse | null = await res.json()
      return quiz;
    }
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
  return null;
}