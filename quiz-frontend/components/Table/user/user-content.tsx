
const UserContent = (props: {data:any}) => {
  return (
    <div className="flex flex-col gap-2 px-1">
      {
        props.data?.map((d:any, index:any)=> {
          const date = new Date(d.createdAt)
          return (
            <div key={index} className="w-full py-2 px-4 flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div>
                <p className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">{d.name}</p>
                <div className="flex gap-2 mt-2">
                  <small className="flex items-end gap-1.5" >
                    <div className="pb-1">
                      <svg   width="8" height="8" xmlns="http://www.w3.org/2000/svg">
                        <circle  cx="3" cy="3" r="3" fill="blue" />
                      </svg>
                    </div>                    
                    <span>                      
                      {d.email}
                    </span>
                  </small>
                  
                  <small className="flex items-end gap-1.5">
                    <div className="pb-1">
                      <svg   width="8" height="8" xmlns="http://www.w3.org/2000/svg">
                        <circle  cx="3" cy="3" r="3" fill="blue" />
                      </svg>
                    </div>
                    <span>
                      {d.role}    
                    </span>
                  </small>
                  
                  <small className="flex items-end gap-1.5">
                    <div className="pb-1">
                      <svg   width="8" height="8" xmlns="http://www.w3.org/2000/svg">
                        <circle  cx="3" cy="3" r="3" fill="blue" />
                      </svg>
                    </div> 
                    <span>
                      Created - &nbsp;
                      {((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()}
                    </span>                    
                  </small>
                </div>                
              </div>
              
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                  <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                  </svg>
                  Edit
                </button>                
                <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                  <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                    <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default UserContent