import Link from "next/link";
import FormSubmit from "./FormSubmit";
import { QuizData } from "@/type/type";
import { useEffect, useState } from "react";
import { Button } from "@headlessui/react";
import { FetchDisplayQuiz } from "@/utils/API/quiz/FetchDisplayQuiz";

export default function QuizDetailFrom(props: {quizId:string | null, mode:string, formAction:any, formState:any, modelHandler:any}) {

    const [quizData, setquizData] = useState<QuizData | null>(null);

    const [name, setName] = useState("");
    const [visibility, setVisibility] = useState("DEFAULT");
    const [desc, setDesc] = useState("");
    const [id, setId] = useState("");

    async function getQuiz() {
        if (props.quizId) {
            const data = await FetchDisplayQuiz(props.quizId);
            if (data) {
                setquizData(data);
                setId(data.id);
                setName(data.name);
                setVisibility(data.visibility);
                setDesc(data.description);
            }        
        }
    }    

    useEffect(() => {
        getQuiz();
    }, [id])

    useEffect(() => {
        return () => {
            props.formState.message = "";
        };
    }, [props.formState]);


    return (
        <div tabIndex={-1} aria-hidden="true" className="bg-neutral-950/55 flex h-full overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-[#1a2d47]">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {props.mode == "ADD"? "Create New Quiz" : "Edit " + quizData?.name}
                        </h3>
                        <Button onClick={props.modelHandler} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close quiz</span>
                        </Button>
                    </div>
                    
                    <form className="p-4 md:p-5" action={props.formAction}>
                        
                        <input type="text" hidden name="id" id="id" value={id} readOnly/>

                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quiz Title</label>
                                <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter quiz title" required />
                            </div>                            
                            <div className="col-span-2">
                                <label htmlFor="visibility" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Visibility</label>
                                <select id="visibility" name="visibility" value={visibility} onChange={e => setVisibility(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value="DEFAULT" disabled>Select Visibility</option>
                                    <option value="PUBLIC">Public</option>
                                    <option value="PRIVATE" disabled>Private</option>                                    
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quiz Description</label>
                                <textarea id="description" name="description" rows={6} value={desc} onChange={e => setDesc(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter quiz description"></textarea>                    
                            </div>
                        </div>
                        {props.formState?.message && (
                            <div  className="flex items-center text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 mb-4" role="alert">
                                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                </svg>
                                <span className="sr-only">Erorr</span>
                                <p>
                                    {props.formState?.message}
                                </p>
                            </div>
                        )}
                        <div className="flex justify-end items-center space-x-4" role="group">
                            <FormSubmit modalHandler={props.modelHandler}></FormSubmit>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div> 
    )
}