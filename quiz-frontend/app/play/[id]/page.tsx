import Link from "next/link";


export default function ViewPlay({ params }: { params: { id: string } }) {

    return (
        <section className="sm:px-12 xs:px-6">                    
            <div className="max-w-screen-xl mx-auto p-2 mt-5">
                
                {/* <Link               
                    href="/admin/quiz" type="button" 
                    className="ml-1 py-2.5 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                    Back
                </Link> */}
            </div>            
        </section>
    )
}