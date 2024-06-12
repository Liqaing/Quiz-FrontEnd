"use client";

import AddEditUser from '@/components/form/admin/user/AddEditUser';
import { userData } from '@/utils/API/users/fetch-user';
import EditUserAction from '@/utils/Actions/admin/user/EditAction';
import React from 'react'
import { useFormState } from 'react-dom'


export default function UserForm(props: { userData: userData | null } ) {

    const initialState = {
        message: ""
    };
    const [formState, formAction] = useFormState(EditUserAction, initialState);

    return (
        <AddEditUser formAction={formAction} formState={formState} userData={props.userData}></AddEditUser>
    )
}