"use client"
import Search from "@/components/Table/Search"
import Pagination from "@/components/Table/Pagination"
import { useEffect, useRef, useState } from "react"
import Order from "@/components/Table/Order"
import PageSize from "@/components/Table/PageSize"
import { order, orderBy, pageSize, DataResponse, tableResponse} from "@/utils/API/users/table/data"
import UserContent from "./user-content"
import Link from "next/link"

const DataTable = (props: {fetchTable: Function}) => {

  const [data, setData] = useState<DataResponse | null>(null);
  const [page, setPage] = useState<number>(0);
  const [column, setColumn] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [orderSort, setOrderSort] = useState<string>(order.ASC);
  const [size, setSize] = useState<string>(pageSize.TEN);

  const nextPage = (): void => {
    const sizePage = getPageSizeNum(size)
    setPage(e => {
      if(e >= Math.ceil(column/sizePage)-1) return e;
      return e+1;
    });
  }

  const previousPage = (): void => {
    setPage(e => {
      if(e <= 0) return e;
      return e-1;
    });
  }

  const firstPage = (): void => {
    setPage(0);
  }

  const lastPage = (): void => {
    const sizePage = getPageSizeNum(size)
    setPage(e => {
      if(e >= Math.ceil(column/sizePage)-1) return e;
      return Math.ceil(column/sizePage)-1;
    });
  }

  const pageZero = (): void => {
    setPage(0);
  }

  const searchPage = (val: string): void => {
    setSearch(val);
  }

  const pageSizeFunc = (val: string): void => {
    setSize(val);
    setPage(0);
  }

  const orderSortFunc = (val: string): void => {
    setOrderSort(val);
  }

  const getPageSizeNum = (size: string | undefined): number => {
    if(size == undefined) return 10;
    switch(size) {
      case "TEN":
        return 10;
      case "FIFTEEN":
        return 15
      case "TWENTY":
        return 20;
      default:
        return 10;
    }
  }

  useEffect(() => {
      loadData();
  }, [page, search, size, orderSort]);

  const loadData = async () => {
    try {
      const res: tableResponse|null = await props.fetchTable({
        search: search,
        orderBy: orderBy.NAME,
        order: orderSort,
        page: page,
        size: size,
      });
      console.log(page);
      if(res != null) {
        setData(res.data);
        setColumn(res.columns);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="h-full w-full flex flex-col justify-between items-center gap-2">
        <div className="w-full flex justify-between py-2 px-1 gap-2 sm:gap-4">
            <div className="flex gap-3">
                <PageSize pageSizeFunc={pageSizeFunc} sizePage={pageZero}/>
                <Link href="/admin/user/add" className="dark:text-white bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 px-6">Add</Link>
            </div>
            <div className="flex gap-3">
              <Order orderSortFunc={orderSortFunc} />
              <Search searchPage={searchPage} />
            </div>           
        </div>

        <div className="w-full overflow-y-scroll overflow-x-hidden rounded-lg h-[80vh]">
            <UserContent data={data}/>
        </div>

        <Pagination nextPage={nextPage} previousPage={previousPage} firstPage={firstPage} lastPage={lastPage} page={page}/>
    </div>
  )
}

export default DataTable