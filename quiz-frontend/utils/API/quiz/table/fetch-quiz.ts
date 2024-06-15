'use server'

import { customFetch } from "@/utils/API/CustomFetch";
import { dataTable, tableResponse } from "./data";

export async function fetchTable(data: dataTable) {

  try {
    const url = new URL(process.env.BASE_API_URL + "api/quiz/findAll");
    url.searchParams.append("search", data.search);
    url.searchParams.append("orderBy", data.orderBy);
    url.searchParams.append("order", data.order);
    url.searchParams.append("page", data.page);
    url.searchParams.append("size", data.size);

    const res = await customFetch(url.href, "GET", null);

    if(res.ok) {
      const quizzes: tableResponse | null = await res.json()
      return quizzes;
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
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
  return null;
}