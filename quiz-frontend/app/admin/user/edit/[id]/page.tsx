"use client";

import AddEditUser from '@/components/form/admin/user/AddEditUser';
import React from 'react'
import { useFormState } from 'react-dom'



const EditUser = () => {

    const initialState = {
        message: ""
    };
    const [formState, formAction] = useFormState(, initialState);

    return (
        <section className="block mt-12 px-12">
            <h3 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl dark:text-white">EDIT USER</h3>
            <AddEditUser formAction={formAction} formState={formState}></AddEditUser>
        </section>
    )
}

export default AddUser;