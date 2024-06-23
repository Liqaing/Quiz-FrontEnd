import Link from "next/link";
import { FetchOneQuiz } from "@/utils/API/quiz/FetchOneQuiz";
import { QuizData } from "@/type/type";
import { useEffect, useState } from "react";
import { Button } from "@headlessui/react";
import FormSubmit from "../form/DeleteModal/formsubmit";

export default function QuizDetailDisplay(props: {quizId:string | null, modelHandler:any}) {

    const [quizData, setquizData] = useState<QuizData | null>(null);

    // const [name, setName] = useState("");
    // const [visibility, setVisibility] = useState("DEFAULT");
    // const [desc, setDesc] = useState("");
    // const [id, setId] = useState("");

    async function getQuiz() {
        if (props.quizId) {
            const data = await FetchOneQuiz(props.quizId);
            if (data) {
                setquizData(data);                
            }
        }
    }    

    useEffect(() => {
        getQuiz();
    }, [quizData?.id])

    return (
        <div tabIndex={-1} aria-hidden="true" className="bg-neutral-950/55 flex h-full overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 size-3/5">
                <div className="relative bg-white h-full rounded-lg shadow dark:bg-[#1a2d47]">
                    <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {quizData?.name}
                            </h3>
                            <Button onClick={props.modelHandler} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close quiz</span>
                            </Button>
                        </div>
                        <div className="h-full flex flex-col items-center justify-between p-4 md:p-5 dark:border-gray-600">
                            <div>
                                {quizData?.description}
                            </div>

                            <div className="w-full flex justify-end gap-3">
                                <Button 
                                    onClick={props.modelHandler}
                                    type="button" 
                                    className=" md:px-4 py-2.5 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                    Cancel
                                </Button>
                                <Link href={`/home/play/${quizData?.id}`} type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">                                    
                                    start 
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </div> 
    )
}