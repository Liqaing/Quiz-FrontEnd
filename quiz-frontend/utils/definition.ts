export type UserCookies = {
  refreshToken: string;
  accessToken: string;
};

export type dataTable = {
  search: string,
  orderBy: string
  order: string,
  page: string,
  size: string
}

export type tableResponse = {
  data: any,
  columns: number
}

export type tokenResponse = {
  accessToken: string,
  refreshToken: string
}
