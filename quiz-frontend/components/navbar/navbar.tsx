'use client';

import { useState } from "react"
import NavBarContent from "./nav-content";

const Navbar = () => {
    /** 
     * Navigation bar conponent
     *      
    */

    const [isMenuOpen, setIsMenuOpen] = useState(false);    
    const handleToggle = () => {    
        setIsMenuOpen(!isMenuOpen);
    }


    return (
        <NavBarContent isMenuOpen={isMenuOpen} handleToggle={handleToggle}></NavBarContent>
    )
}

export default Navbar