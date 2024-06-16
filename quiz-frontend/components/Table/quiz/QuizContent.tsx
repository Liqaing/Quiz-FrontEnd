import Link from "next/link"

const QuizContent = (props: {data:any}) => {
  return (
    <div className="flex flex-col gap-2 px-1">  
      {
        props.data?.map((d:any, index:any)=> {
          const date = new Date(d.createdAt)
          return (
            <div key={index} className="w-full md:h-28 h-[10.5 rem] py-2 px-4 sm:flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              
              <div>
                <p className="flex items-center gap-2 lg:text-lg md:text-base font-bold tracking-tight text-gray-900 dark:text-white">
                  {d.name}
                  <Link href={`/admin/quiz?editQuiz=${d.id}`}>
                    <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.414 2.586a2 2 0 0 1 0 2.828l-10 10a2 2 0 0 1-1.272.586H4a1 1 0 0 1-1-1v-2.142a2 2 0 0 1 .586-1.272l10-10a2 2 0 0 1 2.828 0zm-2.828 2.828l-10 10H4v-1.586l10-10 1.586 1.586zm-1.414-1.414L14 4.172 15.828 6 17 4.828 14.828 2.586z"/>
                    </svg>
                  </Link>
                  
                </p>

                <p className="sm:w-4/5 xs:4.5/5 my-1 text-[0.8rem] hyphens-auto font-extralight line-clamp-2 ">
                  {d.description}
                </p>

                <div className="lg:flex gap-2 mt-2">
                  <small className="flex items-end gap-1.5" >
                    <div className="pb-1">
                      <svg   width="8" height="8" xmlns="http://www.w3.org/2000/svg">
                        <circle  cx="3" cy="3" r="3" fill="blue" />
                      </svg>
                    </div>
                    <span className="lg:text-sm">                      
                      {d.visibility}
                    </span>
                  </small>                                  
                  
                  <small className="flex items-end gap-1.5">
                    <div className="pb-1">
                      <svg   width="8" height="8" xmlns="http://www.w3.org/2000/svg">
                        <circle  cx="3" cy="3" r="3" fill="blue" />
                      </svg>
                    </div> 
                    <span className="lg:text-sm">
                      Created - &nbsp;
                      {((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()}
                    </span>                    
                  </small>
                </div>                
              </div>
              
              <div className="inline-flex rounded-md shadow-sm sm:w-fit sm:mt-0 sm:w-fit mt-2 w-full justify-end" role="group">
                <Link href={`/admin/quiz/edit/${d.id}?name=${d.name}&visibility=${d.visibility}&createdAt${d.createdAt}&description=${d.description}`} className="sm:w-24 w-20 inline-flex justify-center items-center sm:px-4 sm:py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-blue-400 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:focus:ring-blue-500 dark:focus:text-white xs:py-1 xs:px-2">
                  <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.414 2.586a2 2 0 0 1 0 2.828l-10 10a2 2 0 0 1-1.272.586H4a1 1 0 0 1-1-1v-2.142a2 2 0 0 1 .586-1.272l10-10a2 2 0 0 1 2.828 0zm-2.828 2.828l-10 10H4v-1.586l10-10 1.586 1.586zm-1.414-1.414L14 4.172 15.828 6 17 4.828 14.828 2.586z"/>
                  </svg>
                  Edit
                </Link>                
                <Link href={`/admin/quiz/?delete=${d.id}`} className="sm:w-24 w-20 inline-flex justify-center items-center sm:px-4 sm:py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-red-400 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:focus:ring-blue-500 dark:focus:text-white xs:py-1 xs:px-2">
                  <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http: //www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 4V3a2 2 0 1 1 4 0v1h5a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h4zm-3 5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9zm5 1a1 1 0 1 0-2 0v6a1 1 0 0 0 2 0V10zm4 0a1 1 0 1 0-2 0v6a1 1 0 0 0 2 0V10z"/>
                  </svg>
                  Delete
                </Link>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default QuizContent