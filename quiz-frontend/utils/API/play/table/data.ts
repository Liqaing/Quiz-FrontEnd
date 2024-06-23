export const pageSize = {
  TEN: "TEN",
  FIFTEEN: "FIFTEEN",
  TWENTY: " TWENTY"
}

export const order = {
  ASC: "ASC",
  DESC: "DESC"
}

export const orderBy = {
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
  data: DataResponse,
  columns: number
}

export type DataResponse = {
  id: string,
  score: number,
  quizId: string,
  quizName: string,
  createdAt: string,
  updatedAt: string
}[]