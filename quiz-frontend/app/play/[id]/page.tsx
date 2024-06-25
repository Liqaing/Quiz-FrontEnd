"use client"

import PlayHistoryView from "@/components/View/play/PlayHistoryView";
import { PlayHistory } from "@/type/type";
import { FetchOnePlay } from "@/utils/API/play/fetchOnePlay";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function ViewPlay({ params }: { params: { id: string } }) {

    const [playHistory, setPlayHistory] = useState<PlayHistory | null>(null);
    const [date, setDate] = useState<Date>();


    async function fetchPlayHistory() {
        const data = await FetchOnePlay(params.id);
        if (data) {
            const createDate = new Date(data.createdAt);
            setDate(createDate);
            setPlayHistory(data);
        }
    } 

    useEffect(() => {
        fetchPlayHistory();        
    }, [])

    return (
        <section className="sm:px-12 xs:px-6">                    
            <div className="max-w-screen-xl mx-auto p-2 mt-5">
                    
                <div className="flex justify-between border-b-2 pb-4">
                    <div className="w-10/12">
                        <p className="lg:text-lg md:text-base font-semibold uppercase text-gray-900 dark:text-white">{playHistory?.quizName}</p>
                        <p className="lg:text-md md:text-sm my-1 text-[0.8rem] hyphens-auto font-extralight">
                            {playHistory?.quizDescription}
                        </p>
                    </div>
                    <div className="w-2/12">
                        {                     
                            date && (
                                <p className="text-end lg:text-md md:text-sm">                            
                                    Created - {((date?.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()}                
                                </p>
                            )
                        }
                    </div>
                </div>
                
                <div className="mt-4">
                    <p className="lg:text-base md:text-sm font-semibold uppercase text-gray-900 dark:text-white">Total Score : {playHistory?.score} / {playHistory?.answered.length}</p>

                        
                    <PlayHistoryView data={playHistory}></PlayHistoryView>
                </div>
            </div>            
        </section>
    )
}