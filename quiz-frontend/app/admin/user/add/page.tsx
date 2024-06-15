"use client";

import LoginAction from '@/utils/Actions/Auth/Login-action';
import AddUserAction from '@/utils/Actions/admin/user/action'
import AddEditUser from '@/components/form/admin/user/AddEditUser';
import Link from 'next/link'
import React from 'react'
import { useFormState } from 'react-dom'
import { FormState } from '@/utils/data';



const AddUser = () => {

    const initialState = {
        message: ""
    };
    const [formState, formAction] = useFormState(AddUserAction, initialState);

    return (
        <section className="block mt-12 sm:px-12 xs:px-6">
            <h3 className="text-center mb-4 lg:text-4xl text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl dark:text-white">ADD USER</h3>
            <AddEditUser formAction={formAction} formState={formState} userData={null}></AddEditUser>
        </section>
    )
}

export default AddUser;