'use client';

import { Button } from "@headlessui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import QuizDetailDisplay from "./QuizDetailDisplay";
import Search from "../Table/Search";

interface Quiz {
    id: string,
    name: string,
    description: string,
    visibility: string,
    createdAt: Date,
    updatedAt: Date,
  }


const Quizzes = (prop: {FetchQuiz: Function}) => {
 

  const [quizzes, setQuizList] = useState<Quiz[]|undefined>();
  const [isEnd, setIsEnd] = useState<boolean>();
  const [page, setPage] = useState(0);
  const [ref, inView] = useInView();

  const [showPlay, setShowPlay] = useState(false);
  const [quizId, setQuizId] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const first = async () => {
    const data = await prop.FetchQuiz({page: 0, search: searchQuery});
    setIsEnd(data.isEnd)
    setQuizList(data.quizList)
  }
  useEffect(() => { 
    first();
  }, [])
  
  useEffect(() => { 
    first();
  }, [searchQuery])

  // Request more quizz from server and append to quizList
  async function loadMoreQuiz() {
    const next = page + 1;
    const quizzes = await prop.FetchQuiz({page:next, search: searchQuery});
    setIsEnd(quizzes.isEnd);

    if (quizzes.quizList?.length) {
      setPage(next);
      setQuizList((prev: Quiz[] | undefined) => [
        ...(prev?.length ? prev: []),
        ...quizzes.quizList
      ])
    }
  }

  async function handleShowPlay(quizId: string) {
    if (showPlay) {
      setShowPlay(false);
      setQuizId("");
    }
    else {
      setShowPlay(true);
      setQuizId(quizId);
    }
  }

  try {  
    // Call loadMoreQuiz function whenever spinning come into view
    useEffect(() => {
      if (inView) {
        loadMoreQuiz()
      }
    }, [inView])

    return (
        <>
          <div className="max-w-screen-xl mx-auto flex flex-col p-4">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search Quiz" className="lg:w-1/5 3/5  self-end bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-row auto-rows-max mt-4 gap-6">
              {quizzes?.map((quiz: Quiz) => (
                <div key={quiz.id} className="sm:w-full flex flex-col justify-between h-60 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <div>                
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{quiz.name}</h5>                
                    <p className="mb-3 line-clamp-3 font-normal text-gray-700 dark:text-gray-400">{quiz.description}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      <small>Create: {new Date(quiz.createdAt).toDateString()}</small>
                    </p>
                  </div>

                  <div className="w-full flex justify-end">
                    <Button onClick={() => handleShowPlay(quiz.id)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Play
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                    </Button>
                  </div>
                </div>
              ))}

              <div ref={ref} className={`text-center w-full col-span-full ${isEnd ? "hidden" : "block"}`}>
                  <div role="status">
                      <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>
                      <span className="sr-only">Loading more quiz</span>
                  </div>
              </div>

              {
                showPlay && (
                  <QuizDetailDisplay quizId={quizId} modelHandler={handleShowPlay}></QuizDetailDisplay>
                )
              }
            </div>
          </div>
        </>
    )
  }
  catch (error) {
    console.log("err", error);
    throw new Error;
  }
}
  
export default Quizzes;