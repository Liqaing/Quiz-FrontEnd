import DataTable from "@/components/Table/DataTable"
import { fetchTable } from "@/utils/listdata"

const page = () => {
  return (
    <div className="w-[80%] mx-auto">
      <DataTable fetchTable={fetchTable}/>
    </div>
  )
}

export default page