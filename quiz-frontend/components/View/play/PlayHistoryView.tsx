import { PlayAnswer, PlayHistory, PlayQuestion } from "@/type/type";
import { Button } from "@headlessui/react";

export default function PlayHistoryView(props: {data: PlayHistory | null}) {


    return (
        <div className="w-full">
            {
                props.data?.answered.map((d:PlayQuestion, index:any) => {
                    return (
                        <div key={index} className="md:h-auto py-2 px-4 my-2 flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex justify-between text-sm">
                                <p className="py-1">{d.type}</p>

                                <div className="flex gap-2">
                                    <p className="p-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        1 points
                                    </p>                                 
                                </div>
                            </div>

                            <div className="w-4/5">
                                <p className="lg:text-lg md:text-base font-medium tracking-tight text-gray-900 dark:text-white">{`${index + 1}. ${d.question}`}</p>
                            </div>
                            
                            <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-2 gap-3 my-3 mb-5">
                                {
                                    d.answers.map((answer:PlayAnswer, answerIndex:any) => {
                                        return (
                                            <p key={answerIndex} className={`${answer.pick ? answer.correct ? "bg-green-700/50 dark:bg-green-600/50" : "bg-red-700/50 dark:bg-red-600/50" : ""} px-3 py-2 rounded-lg w-fit text-white inline-flex justify-start items-center text-sm font-medium focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700`}>                                                
                                                {
                                                    answer.correct ? 
                                                    (                                                        
                                                        <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#21e600" viewBox="0 0 20 20">
                                                            <path d="M16.707 5.293a1 1 0 0 0-1.414 0L8 12.586 4.707 9.293a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l8-8a1 1 0 0 0 0-1.414z"/>
                                                        </svg>
                                                    )
                                                    :
                                                    (
                                                        <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 20 20">
                                                            <path d="M10 8.586L3.293 1.879A1 1 0 0 0 1.879 3.293L8.586 10l-6.707 6.707a1 1 0 0 0 1.414 1.414L10 11.414l6.707 6.707a1 1 0 0 0 1.414-1.414L11.414 10l6.707-6.707a1 1 0 1 0-1.414-1.414L10 8.586z"/>
                                                        </svg>
                                                    )
                                                }
                                                {answer.answer}                                                
                                            </p>
                                        )
                                        
                                    })
                                }
                                
                            </div>                            
                        </div>             
                    )
                })
            }
            
        </div>
    )
}