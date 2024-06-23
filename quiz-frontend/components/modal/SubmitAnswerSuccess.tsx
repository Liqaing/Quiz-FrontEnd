import { Button } from "@headlessui/react";
import Link from "next/link";

export default async function SucessModal(props: {result:string, totalScore:string}) {
    return (    
        <div tabIndex={-1} aria-hidden="true" className="bg-neutral-950/55 flex h-full overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md h-auto">
                <div className="relative bg-white h-full rounded-lg shadow dark:bg-[#1a2d47]">

                    <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Completed
                            </h3>                            
                        </div>
                        <div className="h-full flex flex-col gap-6 items-center justify-between p-4 md:p-5 dark:border-gray-600">
                            <div>
                                <img src="/congrat.png" className="h-20" alt="Congratulations Icon" />                                
                            </div>

                            <p className="text-center">Congratulations! You've got {props.result} out of {props.totalScore}</p>

                            <div className="w-full flex justify-end gap-3">
                                <Link 
                                    href="/"
                                    type="button" 
                                    className=" md:px-4 py-2.5 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                    Back
                                </Link>
                                <Link href="/home/play/" type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">                                    
                                    See result 
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </div> 
    )
}