const PlayerContent = (props: {data:any}) => {
  return (
    <div className="flex flex-col gap-2 px-1">  
      {
        props.data?.map((d:any, index:any)=> {
          const date = new Date(d.createdAt)
          return (
            <div key={index} className="md:h-auto py-2 px-4 my-2 flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                <div className="flex md:flex-row-reverse flex-col justify-between text-sm">
                  
                    <div className="flex md:w-fit w-full gap-2">
                        <p className="md:w-fit w-1/2 p-1 px-2 h-fit bg-white md:text-sm text-xs border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <span>Score {d.score}</span>
                        </p>
                        <p className="md:w-fit w-1/2 p-1 px-2 h-fit bg-white md:text-sm text-xs border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <span className="xs:hidden sm:inline-block">Play Date -</span>&nbsp;
                            {((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()}
                        </p>
                    </div>
                    
                    <div className="w-3/5 my-0 ">
                      <p className="lg:text-lg md:mt-0 mt-2 md:text-base tracking-tight text-gray-900 dark:text-white">Player: {d.username}</p>
                      <p className="lg:text-lg mt-2 md:text-base tracking-tight text-gray-900 dark:text-white">Quiz: {d.quizName}</p>
                    </div>
                </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default PlayerContent