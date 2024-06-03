"use client"

import Link from "next/link"
import { usePathname } from "next/navigation";
import HandLogout from '@/utils/HandleLogout';
import { useState } from "react";

const NavLink = ({isUserLogin}: {isUserLogin:boolean} ) => {

    // Retreive path name which user currently on
    const pathName = usePathname(); 
    
    const [openDropdown, setOpenDropdown] = useState(false);
    const toggleDropdown = () => {
        setOpenDropdown(!openDropdown);
    }
    console.log(openDropdown);

   
    return (   
        // <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        //     <li>
        //         <Link href='/' className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${ pathName == "/" ? "text-blue-700 underline underline-offset-4" : "text-white-700"}`} aria-current="page">
        //             Home
        //         </Link>
        //     </li>

        //     <li>
        //         <button onClick={toggleDropdown} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
        //             Dropdown <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        //             </svg>
        //         </button>
        //     </li>
            
        //     <li>
        //         <Link href='/about' className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${ pathName.startsWith("/about") ? "text-blue-700 underline underline-offset-4" : "text-white-700"}`} aria-current="page">
        //             About
        //         </Link>                           
        //     </li>

        //     {!isUserLogin && (
        //         <>
        //             <li>
        //                 <Link href='/account/login' className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${ pathName.startsWith("/account/login") ? "text-blue-700 underline underline-offset-4" : "text-white-700"}`} aria-current="page">
        //                     Login
        //                 </Link>                         
        //             </li>
        //             <li>
        //                 <Link href='/account/sign-up' className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${ pathName.startsWith("/account/sign-up") ? "text-blue-700 underline underline-offset-4" : "text-white-700"}}`} aria-current="page">
        //                     Sign Up
        //                 </Link>
        //             </li>
        //         </>
        //     )}
            
        //     {isUserLogin && (
        //         <>
        //             <form action={HandLogout}>
        //                 <li>
        //                     <button type="submit" className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`} aria-current="page">
        //                         Logout
        //                     </button>                         
        //                 </li>
        //             </form>                                            
        //         </>
        //     )}
        // </ul>     
        <>           
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                    <Link href="/" className={`block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent ${ pathName == "/" ? "text-blue-700 underline underline-offset-4" : "text-white-700"}`} aria-current="page">
                        Home
                    </Link>
                </li>
                <li>
                    <button onClick={toggleDropdown} data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                        Dropdown 
                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>          
                    {openDropdown && (
                        <div id="dropdownNavbar" className="z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                </li>
                            </ul>
                            <div className="py-1">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                            </div>
                        </div>
                    )}                                                                       
                    
                </li>            

                <li>
                    <Link href='/about' className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${ pathName.startsWith("/about") ? "text-blue-700 underline underline-offset-4" : "text-white-700"}`}>
                        About
                    </Link>
                </li>

                {!isUserLogin && (
                    <>                                
                        <li>
                            <Link href='/account/login' className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${ pathName.startsWith("/account/login") ? "text-blue-700 underline underline-offset-4" : "text-white-700"}`}>
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
                                <button type="submit" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                    Logout
                                </button>
                            </li>
                        </form>                                            
                    </>
                )}
                    
            </ul>           
        </>
    )
}

export default NavLink