"use client"

import Link from "next/link"
import { usePathname } from "next/navigation";
import HandLogout from "@/utils/Actions/Auth/HandleLogout";
import { useState } from "react";
import Navdropdown from "./nav-dropdown";

const NavLink = ({isUserLogin, userRole}: {isUserLogin:boolean, userRole:String} ) => {

    // Retreive path name which user currently on
    const pathName = usePathname(); 
    
    const [openDropdown, setOpenDropdown] = useState(false);
    const toggleDropdown = () => {
        setOpenDropdown(!openDropdown);
    }
    return (             
        <>           
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">                
                <li>
                    { userRole === "ROLE_ADMIN" && <Navdropdown/>}                    
                    {openDropdown && (
                        <div id="dropdownNavbar" className="absolute z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                <li>
                                    <Link href="/admin/user" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">User</Link>
                                </li>
                                <li>
                                    <Link href="/admin/quiz" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Quiz</Link>
                                </li>
                                <li>
                                    <a href="/admin/play" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Play History</a>
                                </li>
                            </ul>
                            <div className="py-1">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                            </div>
                        </div>
                    )}                                                                       
                    
                </li>            
                
                

                {isUserLogin && 
                    <>
                        <li>
                            <Link href='/home/my-quiz' className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${ pathName.startsWith("/about") ? "text-blue-700 underline underline-offset-4" : "text-white-700"}`}>
                                My Quiz
                            </Link>
                        </li>
                        
                        <li>
                            <Link href='/home/play-history' className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${ pathName.startsWith("/about") ? "text-blue-700 underline underline-offset-4" : "text-white-700"}`}>
                                Play History
                            </Link>
                        </li>
                    </>
                    
                }
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