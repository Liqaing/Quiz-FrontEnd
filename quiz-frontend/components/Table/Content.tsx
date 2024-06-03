import { quizzesResponse } from "@/utils/data"

const Content = (props: {data: quizzesResponse | null}) => {
  return (
    <div className="flex flex-col gap-2 px-1">
      {
        props.data?.map((d, index)=> {
          const date = new Date(d.createdAt)
          return (
            <div key={index} className="w-full py-2 px-4 dark:bg-slate-600 bg-slate-700 text-white rounded-lg flex items-center">
              <div className="w-1/2">
                <strong>{d.name}</strong>
                <div>
                  Description : &nbsp;
                  {d.description}
                </div>
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

export default Content