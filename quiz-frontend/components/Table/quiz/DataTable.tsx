"use client"
import Search from "@/components/Table/Search"
import Pagination from "@/components/Table/Pagination"
import { Suspense, useEffect, useRef, useState } from "react"
import Order from "@/components/Table/Order"
import PageSize from "@/components/Table/PageSize"
import { order, orderBy, pageSize, DataResponse, tableResponse} from "@/utils/API/quiz/table/data"
import QuizContent from "./QuizContent"
import Loading from "@/app/loading"
import LoadingComponent from "@/components/loading"
import Link from "next/link"
import QuizDetailFrom from "@/components/form/admin/quiz/QuizDetail"
import { useSearchParams } from "next/navigation"
import { useFormState } from "react-dom"
import CreateQuizAction from "@/utils/Actions/admin/quiz/CreateAction"
import DeleteModal from "@/components/form/DeleteModal/DeleteModel"
import DeleteQuizAction from "@/utils/Actions/admin/quiz/DeleteQuizAction"

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

  const searchParams = useSearchParams();

  useEffect(() => {
    loadData();
  }, [page, search, size, orderSort, searchParams]);

  const loadData = async () => {
    try {
      const res: tableResponse|null = await props.fetchTable({
        search: search,
        orderBy: orderBy.NAME,
        order: orderSort,
        page: page,
        size: size,
      });
      if(res != null) {
        setData(res.data);
        setColumn(res.columns);
      }
    } catch (e) {
      console.log(e);
      throw new Error;
    }
  }

  const quizId = searchParams.get("id") as string;

  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEditQuiz, setshowEditQuiz] = useState(false);

  useEffect(() => {

    if (searchParams.has("add")) {
      setShowAdd(true);
    }  
    else {
      setShowAdd(false);
    }

    if (searchParams.has("delete")) {
      setShowDelete(true);
    }
    else {
      setShowDelete(false);
    }

    if (searchParams.has("editQuiz")) {
      setshowEditQuiz(true);
    }
    else {
      setshowEditQuiz(false);
    }
  })

  const initialState = {
      message: ""
  };
  const [formState, formAction] = useFormState(CreateQuizAction, initialState);
  const [DelteFormState, DeleteFormAction] = useFormState(DeleteQuizAction, initialState);


  return (
    <div className="h-full w-full flex flex-col justify-between items-center gap-2">
        <div className="w-full flex justify-between py-2 px-1 gap-2 sm:gap-4">
          <div className="flex gap-3">
            <PageSize pageSizeFunc={pageSizeFunc} sizePage={pageZero}/>
            <Link href="/admin/quiz?add" className="xs:w-21 md:w-26 inline-flex items-center text-black dark:text-white px-2 py-2 w-17 text-center h-8 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 xs:text-xs md:text-md sm:leading-6 dark:bg-slate-700">
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
          <QuizContent data={data}/>
        </div>

        <Pagination nextPage={nextPage} previousPage={previousPage} firstPage={firstPage} lastPage={lastPage} page={page}/>
        {
          showAdd &&
          (
            <QuizDetailFrom pathBack="/admin/quiz" mode="ADD" formAction={formAction} formState={formState} quizId={quizId}></QuizDetailFrom>
          )
        }

        {
          showEditQuiz &&
          (
            <QuizDetailFrom pathBack="/admin/quiz" mode="EDIT" formAction={formAction} formState={formState} quizId={quizId}></QuizDetailFrom>
          )
        }

        {
          showDelete &&
          (
            <DeleteModal pathBack="/admin/quiz" formAction={DeleteFormAction} formState={DelteFormState} id={quizId}></DeleteModal>
          )
        }
        
    </div>
  )
}

export default DataTable