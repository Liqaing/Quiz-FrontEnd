"use client"

import Link from "next/link"
import { usePathname } from "next/navigation";
import HandLogout from '@/utils/HandleLogout';

const NavLink = ({isUserLogin}: {isUserLogin:boolean} ) => {

    // Retreive path name which user currently on
    const pathName = usePathname();     
    
    return (
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
                <Link href='/' className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${ pathName == "/" ? "text-blue-700 underline underline-offset-4" : "text-white-700"}`} aria-current="page">
                    Home
                </Link>
            </li>
            <li>
                <Link href='/about' className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${ pathName.startsWith("/about") ? "text-blue-700 underline underline-offset-4" : "text-white-700"}`} aria-current="page">
                    About
                </Link>                           
            </li>

            {!isUserLogin && (
                <>
                    <li>
                        <Link href='/account/login' className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${ pathName.startsWith("/account/login") ? "text-blue-700 underline underline-offset-4" : "text-white-700"}`} aria-current="page">
                            Login
                        </Link>                         
                    </li>
                    <li>
                        <Link href='/account/sign-up' className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${ pathName.startsWith("/account/sign-up") ? "text-blue-700 underline underline-offset-4" : "text-white-700"}}`} aria-current="page">
                            Sign Up
                        </Link>
                    </li>
                </>
            )}
            
            {isUserLogin && (
                <>
                    <form action={HandLogout}>
                        <li>
                            <button type="submit" className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`} aria-current="page">
                                Logout
                            </button>                         
                        </li>
                    </form>
                                        
                </>
            )}
        </ul>

    )
}

export default NavLink