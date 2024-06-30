import { Answer, Question, QuizData } from "@/type/type";
import { Button } from "@headlessui/react";
import Link from "next/link";

export default function QuestionView(props: {data: QuizData | null, handleEditQuestionModal:any, handleDeleteModal:any}) {
    return (
        <div className="w-full">
            {
                props.data?.questions?.map((d:Question, index:any) => {
                    const updateDate = new Date(d.updatedAt);
                    return (
                        <div key={index} className="md:h-auto py-2 px-4 my-2 flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex justify-between text-sm">
                                <p className="py-1 md:text-sm text-[0.7rem]">{d.type}</p>

                                <div className="flex md:gap-2 gap-1">
                                    <p className="p-1 px-2 bg-white md:text-sm text-xs border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        1 P<span className="xs:hidden sm:inline-block">oints</span>
                                    </p>
                                    <p className="p-1 px-2 bg-white md:text-sm text-xs border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        <span className="xs:hidden sm:inline-block">Create Date -</span>&nbsp;                                    
                                        {((updateDate.getMonth() > 8) ? (updateDate.getMonth() + 1) : ('0' + (updateDate.getMonth() + 1))) + '/' + ((updateDate.getDate() > 9) ? updateDate.getDate() : ('0' + updateDate.getDate())) + '/' + updateDate.getFullYear()}
                                    </p>
                                </div>  
                            </div>

                            <div className="w-full md:my-0 my-2">
                                <p className="lg:text-lg md:text-base font-medium tracking-tight text-gray-900 dark:text-white">{d.question}</p>
                            </div>
                            
                            <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-2 gap-4 my-3 mb-5">
                                {
                                    d.answers.map((answer:Answer, answerIndex:any) => {
                                        return (
                                            <p key={answerIndex} className="inline-flex justify-start items-center text-sm font-medium focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">                                                
                                                {
                                                    answer.correct ? 
                                                    (                                                        
                                                        <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 20 20">
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

                            <div className="w-full inline-flex rounded-md shadow-sm sm:mt-0 justify-end" role="group">
                                <Button onClick={() => props.handleEditQuestionModal(d.id)} className="sm:w-24 w-20 inline-flex justify-center items-center sm:px-4 sm:py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-blue-400 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:focus:ring-blue-500 dark:focus:text-white xs:py-1 xs:px-2">
                                <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17.414 2.586a2 2 0 0 1 0 2.828l-10 10a2 2 0 0 1-1.272.586H4a1 1 0 0 1-1-1v-2.142a2 2 0 0 1 .586-1.272l10-10a2 2 0 0 1 2.828 0zm-2.828 2.828l-10 10H4v-1.586l10-10 1.586 1.586zm-1.414-1.414L14 4.172 15.828 6 17 4.828 14.828 2.586z"/>
                                </svg>
                                Edit
                                </Button>

                                <Button onClick={() => props.handleDeleteModal(d.id)} className="sm:w-24 w-20 inline-flex justify-center items-center sm:px-4 sm:py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-red-400 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:focus:ring-blue-500 dark:focus:text-white xs:py-1 xs:px-2">
                                <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http: //www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M7 4V3a2 2 0 1 1 4 0v1h5a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h4zm-3 5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9zm5 1a1 1 0 1 0-2 0v6a1 1 0 0 0 2 0V10zm4 0a1 1 0 1 0-2 0v6a1 1 0 0 0 2 0V10z"/>
                                </svg>
                                Delete
                                </Button>
                            </div>
                        </div>             
                    )
                })
            }
            
        </div>
    )
}