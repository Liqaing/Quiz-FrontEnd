import { Button } from "@headlessui/react"
import Link from "next/link"

const PlayContent = (props: {data:any, handleDeleteModal:any, pathBack:string}) => {
  return (
    <div className="flex flex-col gap-2 px-1">  
      {
        props.data?.map((d:any, index:any)=> {
          const date = new Date(d.createdAt)
          return (
            <div key={index} className="w-full md:h-24 h-[10.5 rem] py-2 px-4 sm:flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              
              <div>
                <p className="flex items-center gap-2 lg:text-lg md:text-base font-bold tracking-tight text-gray-900 dark:text-white">
                  {d.quizName}
                </p>

                <div className="lg:flex gap-2 mt-2">
                  <small className="flex items-end gap-1.5" >
                    <div className="pb-1">
                      <svg  width="8" height="8" xmlns="http://www.w3.org/2000/svg">
                        <circle  cx="3" cy="3" r="3" fill="blue" />
                      </svg>
                    </div>
                    <span className="lg:text-sm">                      
                      {d.score} Scores
                    </span>
                  </small>                                  
                  
                  <small className="flex items-end gap-1.5">
                    <div className="pb-1">
                      <svg   width="8" height="8" xmlns="http://www.w3.org/2000/svg">
                        <circle  cx="3" cy="3" r="3" fill="blue" />
                      </svg>
                    </div> 
                    <span className="lg:text-sm">
                      Play at - &nbsp;
                      {((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()}
                    </span>                    
                  </small>
                </div>                
              </div>
              
              <div className="inline-flex roun  d-md shadow-sm sm:w-fit sm:mt-0 sm:w-fit mt-2 w-full justify-end" role="group">
                <Link href={`/play/${d.id}?from=${props.pathBack}`} className="sm:w-24 w-20 inline-flex justify-center items-center sm:px-4 sm:py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-blue-400 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:focus:ring-blue-500 dark:focus:text-white xs:py-1 xs:px-2">
                  <svg className="w-3 h-3 me-2 mt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2C6.158 2 2.867 4.389 1.235 7.515a1 1 0 0 0 0 .97C2.867 11.61 6.158 14 10 14s7.133-2.39 8.765-5.515a1 1 0 0 0 0-.97C17.133 4.39 13.842 2 10 2zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                  </svg>
                  View
                </Link>                
                <Button onClick={() => props.handleDeleteModal(d.id)} className="sm:w-24 w-20 inline-flex justify-center items-center sm:px-4 sm:py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-red-400 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:focus:ring-blue-500 dark:focus:text-white xs:py-1 xs:px-2">
                  <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http: //www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 4V3a2 2 0 1 1 4 0v1h5a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h4zm-3 5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9zm5 1a1 1 0 1 0-2 0v6a1 1 0 0 0 2 0V10zm4 0a1 1 0 1 0-2 0v6a1 1 0 0 0 2 0V10z"/>
                  </svg>
                  Delete
                </Button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default PlayContent