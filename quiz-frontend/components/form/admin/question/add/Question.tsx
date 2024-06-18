import Link from "next/link";
import FormSubmit from "./FormSubmit";
import { useState } from "react";

export default function AddQuestion(props: {quizId:string, pathBack:string, formAction:any, formState:any}) {

    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");

    const handleAnswer1 = (event: any) => {
        setAnswer1(event.target.value);        
    }
    const handleAnswer2 = (event: any) => {
        setAnswer2(event.target.value);        
    }
    const handleAnswer3 = (event: any) => {
        setAnswer3(event.target.value);        
    }
    const handleAnswer4 = (event: any) => {
        setAnswer4(event.target.value);        
    }

    return (
        <div tabIndex={-1} aria-hidden="true" className="bg-neutral-950/55 flex h-full overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-[#1a2d47]">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Create New Question
                        </h3>
                        <Link href={props.pathBack} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close add question</span>
                        </Link>
                    </div>
                    
                    <form className="p-4 md:p-5" action={props.formAction}>
                        <input type="text" hidden name="id" id="id" value={props.quizId}/>

                        <div className="grid gap-4 mb-4 grid-cols-4">
                            <div className="col-span-4">
                                <label htmlFor="question" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quiz Question</label>
                                <input type="text" name="question" id="question" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter question" required />
                            </div>                            
                            <div className="col-span-4">
                                <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Question Type</label>
                                <select id="type" name="type" defaultValue={"MULTIPLE CHOICE"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    {/* <option value="DEFAULT" disabled>Select Question Type</option> */}
                                    <option value="MULTIPLE CHOICE">Multiple Choice</option>                                             
                                </select>
                            </div>
                            
                            <div className="col-span-2">
                                <label htmlFor="answer1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Answer 1</label>
                                <input type="text" name="answer1" id="answer1" value={answer1} onChange={handleAnswer1} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Answer 1" required />
                            </div>

                            <div className="col-span-2">
                                <label htmlFor="answer2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Answer 2</label>
                                <input type="text" name="answer2" id="answer2" value={answer2} onChange={handleAnswer2} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Answer 2" required />
                            </div>

                            <div className="col-span-2">
                                <label htmlFor="answer3" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Answer 3</label>
                                <input type="text" name="answer3" id="answer3" value={answer3} onChange={handleAnswer3} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Answer 3" required />
                            </div>

                            <div className="col-span-2">
                                <label htmlFor="answer4" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Answer 4</label>
                                <input type="text" name="answer4" id="answer4" value={answer4} onChange={handleAnswer4} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Answer 4" required />
                            </div>
                            

                            <label htmlFor="correct-answer" className="col-span-4 block text-sm font-medium text-gray-900 dark:text-white">Which one is correct answer</label>
                            <ul id="correct-answer" className="col-span-4 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-600 dark:border-gray-600 dark:text-white">
                                <li className="w-full overflow-x-scroll border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input id="correct-1" type="radio" name="correct" value={answer1} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="correct-1" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{answer1 ? answer1 : "Answer 1"}</label>
                                    </div>
                                </li>
                                <li className="w-full w-full overflow-x-scroll border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input id="correct-2" type="radio" name="correct" value={answer2} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="correct-2" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{answer2 ? answer2 : "Answer 2"}</label>
                                    </div>
                                </li>
                                <li className="w-full w-full overflow-x-scroll border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input id="correct-3" type="radio" name="correct" value={answer3} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="correct-3" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{answer3 ? answer3 : "Answer 3"}</label>
                                    </div>
                                </li>
                                <li className="w-full overflow-x-scroll dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input id="correct-4" type="radio" name="correct" value={answer4} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="correct-4" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{answer4 ? answer4 : "Answer 4"}</label>
                                    </div>
                                </li>
                            </ul>
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
                        <div className="flex justify-end items-center space-x-4 mt-10" role="group">
                            <FormSubmit pathBack={props.pathBack}></FormSubmit>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div> 
    )
}