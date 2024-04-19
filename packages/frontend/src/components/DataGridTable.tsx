import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'

type Props = {
  rows: any[]
  columns: GridColDef[]
  getRowId: any
}

const DataGridTable = ({ rows, columns, getRowId }: Props) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      getRowId={getRowId}
      disableRowSelectionOnClick
      hideFooter
      autoHeight
    />
  )
}

export default DataGridTable

