import { DataGrid, gridClasses } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'
import { styled } from '@mui/material'

type Props = {
  rows: any[]
  columns: GridColDef[]
  getRowId: any
}

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.odd`]: {
    backgroundColor: theme.palette.grey[200],
  },
}))

export const DataGridTable = ({ rows, columns, getRowId }: Props) => (
  <StripedDataGrid
    rowHeight={65}
    rows={rows}
    columns={columns}
    getRowId={getRowId}
    disableRowSelectionOnClick
    hideFooter
    autoHeight
    getRowClassName={(params) =>
      params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
    }
  />
)
