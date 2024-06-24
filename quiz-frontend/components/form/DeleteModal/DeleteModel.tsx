import Link from "next/link";
import FormSubmit from "./formsubmit";
import { Button } from "@headlessui/react";
import { useEffect } from "react";

export default function DeleteModal(props: {id:string, formAction:any, formState:any, modalHandler:any}) {
    
    useEffect(() => {  
        if (props.formState) props.formState.message = "";        
    }, []);

    useEffect(() => {
        if(props.formState.message === "success") props.modalHandler();
    })

    return (
        <form action={props.formAction} >
            <input type="text" hidden name="id" id="id" value={props.id} required readOnly/>

            <div id="deleteModal" tabIndex={-1} aria-hidden="true" className="bg-neutral-950/55 flex justify-center content-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full inset-0">
                <div className="relative p-4 w-full max-w-md h-auto">
                    <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-[#1a2d47] sm:p-5">
                        <Button onClick={props.modalHandler} className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close</span>
                        </Button>
                        <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
                       
                        {(props.formState?.message && props.formState?.message !== "success") && (
                            <div  className="mb-4 flex justify-center items-center text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                </svg>
                                <span className="sr-only">Erorr</span>
                                <p>
                                    {props.formState?.message}
                                </p>
                            </div>
                        )}
                        
                        <div className="flex justify-center items-center space-x-4">                            
                            <FormSubmit modalHandler={props.modalHandler}></FormSubmit>
                        </div>
                    </div>
                </div>
            </div>
        </form>        
    )
}