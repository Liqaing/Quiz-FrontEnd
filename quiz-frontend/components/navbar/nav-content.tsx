import Link from "next/link"
import NavLink from "./nav-link"
import CheckLogin from "@/utils/CheckLogin";

const NavBarContent = ({isMenuOpen, handleToggle}: {isMenuOpen: boolean, handleToggle:any}) => {
    
    const isLogIn = CheckLogin();

    return (                

        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="/icon.png" className="h-8" alt="Quiz Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Quiz</span>
                    </Link>
                <button onClick={handleToggle} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className={`w-full md:block md:w-auto ${isMenuOpen? "Block" : "hidden"}`} id="navbar-default">
                    <NavLink isLogIn={isLogIn}></NavLink>
                </div>
            </div>
        </nav>

    )
}

export default NavBarContent;