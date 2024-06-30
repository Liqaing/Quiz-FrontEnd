"use client"

import Link from "next/link"
import { usePathname } from "next/navigation";
import HandLogout from "@/utils/Actions/Auth/HandleLogout";
import { useState } from "react";
import Navdropdown from "./nav-dropdown";
import { Button } from "@headlessui/react";

const NavLink = ({isUserLogin, userRole}: {isUserLogin:boolean, userRole:String} ) => {

    // Retreive path name which user currently on
    const pathName = usePathname(); 
    
    const [openDropdown, setOpenDropdown] = useState(false);
    const toggleDropdown = () => {
        setOpenDropdown(!openDropdown);
    }
    return (             
        <>           
            <ul className="flex flex-col gap-4 font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">                
                <li>
                    { userRole === "ROLE_ADMIN" && <Navdropdown/>}
                    {openDropdown && (
                        <div id="dropdownNavbar" className="absolute z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                <li>
                                    <Link href="/admin/user" className="block px-4 py-2 hover:bg-blue-700 dark:hover:text-white">User</Link>
                                </li>
                                <li>
                                    <Link href="/admin/quiz" className="block px-4 py-2 hover:bg-blue-700 dark:hover:text-white">Quiz</Link>
                                </li>
                                <li>
                                    <a href="/admin/play" className="block px-4 py-2 hover:bg-blue-700 dark:hover:text-white">Play History</a>
                                </li>
                            </ul>
                        </div>
                    )}                                                                       
                    
                </li>
                
                

                {(isUserLogin) && 
                    <>
                        {
                            (userRole == "ROLE_ADMIN" || userRole == "ROLE_TEACHER") && (
                            <li>
                                <Link href='/home/my-quiz' className={`block py-1 px-2.5 rounded md:border-0 dark:hover:text-white hover:bg-blue-700 rounded-md ${ pathName.startsWith("/home/my-quiz") ? "bg-blue-700" : "text-white-700"}`}>
                                    My Quiz
                                </Link>
                            </li>
                        )}
                        
                        
                        <li>
                            <Link href='/home/play-history' className={`block py-1 px-2.5 rounded t md:border-0 dark:hover:text-white hover:bg-blue-700 rounded-md ${ pathName.startsWith("/home/play-history") ? "bg-blue-700" : "text-white-700"}`}>
                                My Play History
                            </Link>
                        </li>
                    </>
                    
                }
                <li>
                    <Link href='/home/about' className={`block py-1 px-2.5 rounded md:border-0 dark:hover:text-white hover:bg-blue-700 rounded-md ${ pathName.startsWith("/home/about") ? "bg-blue-700" : "text-white-700"}`}>
                        About
                    </Link>
                </li>

                {!isUserLogin && (
                    <>                                
                        <li>
                            <Link href='/account/login' className={`block py-1 px-2.5 rounded md:border-0 dark:hover:text-white hover:bg-blue-700 rounded-md ${ pathName.startsWith("/account/login") ? "bg-blue-700" : "text-white-700"}`}>
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link href='/account/sign-up' className={`block py-1 px-2.5 rounded md:border-0 dark:hover:text-white hover:bg-blue-700 md:rounded-none rounded-md ${ pathName.startsWith("/account/sign-up") ? "bg-blue-700" : "text-white-700"}`}>
                                Sign up
                            </Link>
                        </li>
                    </>
                )}

                {isUserLogin && (
                    <>
                        <li>
                            <form action={HandLogout}>
                                <Button type="submit" className="block w-full py-1 px-2.5 text-start rounded dark:hover:text-white hover:bg-blue-700 rounded-md">
                                    Logout
                                </Button>                                
                            </form>                                            
                        </li>
                    </>
                )}
                    
            </ul>           
        </>
    )
}

export default NavLink