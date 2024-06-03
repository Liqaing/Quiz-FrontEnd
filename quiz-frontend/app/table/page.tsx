import DataTable from "@/components/Table/DataTable"
import { fetchTable } from "@/utils/listdata"

const page = () => {
  return (
    <div>
      <DataTable fetchTable={fetchTable}/>
    </div>
  )
}

export default page