"use client";
import { useFormStatus } from "react-dom";

export default function FormSubmit() {
    const formStatus = useFormStatus();

    return (
        <button type="submit" disabled={formStatus.pending} className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            {formStatus.pending ? "Creating an account" : "Create an account"}
        </button>       
    )
}