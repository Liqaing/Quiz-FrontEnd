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
  quizzes: DataResponse,
  columns: number
}

export type DataResponse = {
  id: string,
  name: string,
  description: string,
  visibility: string,
  createdAt: string,
  updatedAt: string
}[]