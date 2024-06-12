

import AddEditUser from '@/components/form/admin/user/AddEditUser';
import { FetchUser, userData } from '@/utils/API/users/fetch-user';
import UserForm from './form';

export default async function EditUser({ params }: { params: { id: string } }) {
 
    const userData:userData | null = await FetchUser(params.id as string);
        
    return (
        <section className="block mt-12 px-12">
            <h3 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl dark:text-white">EDIT USER</h3>
            <UserForm userData={userData}></UserForm>        
        </section>
    )
}