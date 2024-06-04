
const UserContent = (props: {data:any}) => {
  return (
    <div className="flex flex-col gap-2 px-1">
      {
        props.data?.map((d:any, index:any)=> {
          const date = new Date(d.createdAt)
          return (
            <div key={index} className="w-full py-2 px-4 rounded-lg flex items-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="w-1/2">
                <p className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">{d.name}</p>
                <small>
                  Description : &nbsp;
                  {d.description}
                </small>
                <br></br>
                <small>
                  Visibility : &nbsp;
                  {d.visibility}
                </small>
              </div>
              <div className="w-1/2 text-end ">
                Created : &nbsp;
                {((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default UserContent