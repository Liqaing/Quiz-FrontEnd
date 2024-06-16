import { FetchUser, userData } from '@/utils/API/users/fetch-user';
import UserForm from './form';

export default async function EditUser({ params }: { params: { id: string } }) {
 
    const userData:userData | null = await FetchUser(params.id as string);
        
    return (
        <section className="block mt-12 sm:px-12 xs:px-6">
            <h3 className="text-center mb-4 lg:text-4xl text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl dark:text-white">EDIT USER</h3>
            <UserForm userData={userData}></UserForm>        
        </section>
    )
}