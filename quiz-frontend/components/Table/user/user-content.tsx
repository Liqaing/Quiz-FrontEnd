
const UserContent = (props: {data:any}) => {
  return (
    <div className="flex flex-col gap-2 px-1">
      {
        props.data?.map((d:any, index:any)=> {
          const date = new Date(d.createdAt)
          return (
            <div key={index} className="w-full py-2 px-4 flex items-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="w-1/2">
                <p className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">{d.name}</p>
                <div className="flex">
                  <small className="flex items-end" >
                    <div className="pb-1">
                    <svg   width="9" height="9" xmlns="http://www.w3.org/2000/svg">
                      <circle  cx="4" cy="4" r="4" fill="blue" />
                    </svg>
                    </div>
                    
                    <span className="" text-anchor="end">
                      email : &nbsp;
                      {d.email}
                    </span>                     
                  </small>
                  
                  <small className="mr-2">
                    | Role : &nbsp;
                    {d.role}
                  </small>
                  
                  <small className="mr-2">
                    | Created : &nbsp;
                    {((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()}
                  </small>
                </div>                
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default UserContent