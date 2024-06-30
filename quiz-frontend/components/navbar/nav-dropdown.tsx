import { Button } from "@headlessui/react";
import Link from "next/link";
import { useState, useEffect, useRef, MouseEvent } from "react";

const Navdropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleShow = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside as unknown as EventListener);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside as unknown as EventListener);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
        <Button
          onClick={handleShow}
          className="flex justify-center items-center font-medium px-2.5 py-1 hover:bg-blue-700 rounded-md bg-gray-50 rtl:space-x-reverse flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
            Manage
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          
        </Button>
      
      <div
        className={`${showDropdown ? "block" : "hidden"} md:absolute block md:w-auto p-2 w-full mt-4 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
      >
        <ul className="py-2 text-sm dark:text-white" aria-labelledby="dropdownLargeButton">
          <li>
            <Link onClick={handleShow} href="/admin/user" className="block py-2 px-2.5 rounded md:border-0 dark:hover:text-white hover:bg-blue-700 rounded-md">
              User
            </Link>
          </li>
          <li>
            <Link onClick={handleShow} href="/admin/quiz" className="block py-2 px-2.5 rounded md:border-0 dark:hover:text-white hover:bg-blue-700 rounded-md">
              Quiz
            </Link>
          </li>
          <li>
            <Link onClick={handleShow} href="/admin/play-history" className="block py-2 px-2.5 rounded md:border-0 dark:hover:text-white hover:bg-blue-700 rounded-md">
              Play History
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navdropdown;
