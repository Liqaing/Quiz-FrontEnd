"use client"
import Search from "@/components/Table/Search"
import Pagination from "@/components/Table/Pagination"
import { useEffect, useRef, useState } from "react"
import Order from "@/components/Table/Order"
import PageSize from "@/components/Table/PageSize"
import { order, orderBy, pageSize, DataResponse, tableResponse} from "@/utils/API/users/table/data"
import UserContent from "./user-content"
import Link from "next/link"
import DeleteModal from "@/components/form/DeleteModal/DeleteModel"
import { useSearchParams } from "next/navigation"
import DeleteUserAction from "@/utils/Actions/admin/user/DeleteUserAction"
import { useFormState } from "react-dom"

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
      case "10":
        return 10;
      case "15":
        return 15
      case "20":
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

  
  const initialState = {
      message: ""
  };
  const [formState, formAction] = useFormState(DeleteUserAction, initialState);

  const searchParams = useSearchParams()
  const deleteId = searchParams.get("delete") ;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (deleteId) {
      setShowModal(true);
    } else {
      setShowModal(false);
      loadData();
    }
  }, [deleteId]);


  return (
    <div className="h-full w-full flex flex-col justify-between items-center gap-2">
        <div className="w-full flex justify-between py-2 px-1 gap-2 sm:gap-4">
            <div className="flex gap-3">
                <PageSize pageSizeFunc={pageSizeFunc} sizePage={pageZero}/>
                <Link href="/admin/user/add" className="xs:w-21 md:w-26 inline-flex items-center text-black dark:text-white px-2 py-2 w-17 text-center h-8 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 xs:text-xs md:text-md sm:leading-6 dark:bg-slate-700">
                  <svg className="w-5 h-5 sm:me-1 xs:m-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H5a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1z"/>
                  </svg>
                  <span className="sm:block xs:hidden">
                    ADD
                  </span>                  
                </Link>
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
        {
          showModal && ( 
            <DeleteModal pathBack="/admin/user" reloadTable={loadData} formAction={formAction} formState={formState} id={deleteId as string}></DeleteModal>
          )
        }
        
    </div>

    
  )
}

export default DataTable