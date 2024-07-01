import Link from "next/link"
import NavLink from "./nav-link"
import CheckLogin from "@/utils/Actions/Auth/CheckLogin";
import { GetUserRole } from "@/utils/Actions/Auth/GetUserRole";
import NavBarMenu from "./menu";

const NavBarContent = async () => {

    const isUserLogin = await CheckLogin();
    const userRole = await GetUserRole();

    return (                        

        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="/icon.png" className="h-8" alt="Quiz Logo" />
                        <span className="self-center lg:text-xl text-lg whitespace-nowrap dark:text-white">អ្នកនឹងក្លាយជាសេដ្ឋី</span>
                    </Link>
                    <NavBarMenu isUserLogin={isUserLogin} userRole={userRole}></NavBarMenu>
                </div>
            </nav>
        </>
    )
}

export default NavBarContent;