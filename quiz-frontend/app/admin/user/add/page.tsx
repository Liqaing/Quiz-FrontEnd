"use client";

import AddUserAction from '@/utils/Actions/admin/user/action'
import AddEditUser from '@/components/form/admin/user/AddEditUser';
import Link from 'next/link'
import React from 'react'
import { useFormState } from 'react-dom'

export default function AddUser() {

    const initialState = {
        message: ""
    };
    const [formState, formAction] = useFormState(AddUserAction, initialState);

    return (
        <section className="block mt-12 px-12">
            <h3 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl dark:text-white">ADD USER</h3>
            <AddEditUser formAction={formAction} formState={formState}></AddEditUser>
        </section>
    )
}