export const pageSize = {
  TEN: "TEN",
  FIFTEEN: "FIFTEEN",
  TWENTY: " TWENTY"
}

export const order = {
  ASC: "ASC",
  DESC: "DESC"
}

export const orderByQuiz = {
  NAME: "NAME",
  DATE: "DATE"
}

export type dataTable = {
  search: string,
  orderBy: string
  order: string,
  page: string,
  size: string
}

export type tableResponse = {
  quizzes: quizzesResponse,
  columns: number
}

export type quizzesResponse = {
  id: string,
  name: string,
  description: string,
  visibility: string,
  createdAt: string,
  updatedAt: string
}[]