"use client"

import { useState } from "react";
import NavLink from "./nav-link"

const NavBarMenu = (props: {isUserLogin:any, userRole:any}) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const toggleDropdown = () => {
        setOpenDropdown(!openDropdown);
        console.log(openDropdown)
    }

    return (
        <>
            <button onClick={toggleDropdown} id="nav-menu-toggle" data-collapse-toggle="navbar-menu" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>    
            <div className={`${openDropdown ? "block" : "hidden"} w-full md:block md:w-auto`} id="navbar-menu">
                <NavLink isUserLogin={props.isUserLogin} userRole={props.userRole}></NavLink>  
            </div>
        </>
    )
}

export default NavBarMenu;