"use client"

import PlayHistoryView from "@/components/View/play/PlayHistoryView";
import DeleteModal from "@/components/form/DeleteModal/DeleteModel";
import { PlayHistory } from "@/type/type";
import { FetchOnePlay } from "@/utils/API/play/fetchOnePlay";
import DeletePlayAction from "@/utils/Actions/play/DeletePlayAction";
import { Button } from "@headlessui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";


export default function ViewPlay({ params }: { params: { id: string} }) {

    const [playHistory, setPlayHistory] = useState<PlayHistory | null>(null);
    const [date, setDate] = useState<Date>();
    const [showDelete, setShowDelete] = useState(false);

    const searchParams = useSearchParams();
    const pathBack = searchParams.get("from");

    async function fetchPlayHistory() {
        const data = await FetchOnePlay(params.id);
        if (data) {
            const createDate = new Date(data.createdAt);
            setDate(createDate);
            setPlayHistory(data);
        }
    } 

    function handleDeleteModal() {
        if (showDelete) {
          setShowDelete(false);
        }
        else {
          setShowDelete(true);
        }
      }

    useEffect(() => {
        fetchPlayHistory();        
    }, [])

    const initialState = {
        message: ""
    };
    const [DeleteFormState, DeleteFormAction] = useFormState(DeletePlayAction, initialState);

    return (
        <section className="px-4">                    
            <div className="max-w-screen-xl mx-auto mt-5">
                    
                <div className="flex flex-col justify-between border-b-2 pb-4">

                    <div className="flex justify-between w-full mb-3">
                        
                        <Link href={`${pathBack}`} className="inline-flex justify-center items-center sm:px-4 sm:py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-blue-800 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:focus:ring-blue-500 dark:focus:text-white xs:py-1 xs:px-2">
                            <svg className="w-3 h-3 me-2 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>
                            <span>Go back</span>
                        </Link>                                                

                        <Button onClick={handleDeleteModal} className="inline-flex justify-center items-center sm:px-4 sm:py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-red-400 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:focus:ring-blue-500 dark:focus:text-white xs:py-1 xs:px-2">
                            <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http: //www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M7 4V3a2 2 0 1 1 4 0v1h5a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h4zm-3 5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9zm5 1a1 1 0 1 0-2 0v6a1 1 0 0 0 2 0V10zm4 0a1 1 0 1 0-2 0v6a1 1 0 0 0 2 0V10z"/>
                            </svg>
                            Delete&nbsp;<span className="md:inline hidden">Play History</span>
                        </Button>                   
                    </div>

                    <div className="lg:w-10/12 w-full">
                        <p className="lg:text-lg md:text-base font-semibold uppercase text-gray-900 dark:text-white">{playHistory?.quizName}</p>
                        <p className="lg:text-md md:text-sm my-1 text-[0.8rem] hyphens-auto font-extralight">
                            {playHistory?.quizDescription}
                        </p>
                    </div>
                    <div className="lg:w-2/12 w-full lg:block flex justify-end gap-3 md:mt-0 mt-5">
                        {                     
                            date && (
                                <p className="text-end lg:text-sm text-xs">                            
                                    Created - {((date?.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()}                
                                </p>
                            )
                        }
                    </div>
                </div>
                
                <div className="mt-4">
                    <p className="lg:text-lg md:text-base font-semibold uppercase text-gray-900 dark:text-white">Total Score : {playHistory?.score} / {playHistory?.answered.length}</p>                        
                    <PlayHistoryView data={playHistory}></PlayHistoryView>
                </div>

                {
                    showDelete &&
                    (
                        <DeleteModal modalHandler={handleDeleteModal} formAction={DeleteFormAction} formState={DeleteFormState} id={params.id} pathBack={null}></DeleteModal>
                    )
                }
            </div>            
        </section>
    )
}