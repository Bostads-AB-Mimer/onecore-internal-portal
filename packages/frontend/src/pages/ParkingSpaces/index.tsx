import { IconButton, Typography } from '@mui/material'
import type { GridColDef } from '@mui/x-data-grid'
import Chevron from '@mui/icons-material/ChevronRight'
import { Link } from 'react-router-dom'

import { DataGridTable } from '../../components'
import { useParkingSpaces } from './hooks/useParkingSpaces'

const ParkingSpaces = () => {
  const parkingSpaces = useParkingSpaces()
  const dateFormatter = new Intl.DateTimeFormat('sv-SE')

  const sharedProps = {
    cellClassName: '',
    editable: false,
    flex: 1,
    headerClassName: 'font-bison-bold text-lg text-fuscous-gray',
  }

  const columns: GridColDef[] = [
    {
      field: 'address',
      headerName: 'Bilplats',
      ...sharedProps,
    },
    {
      field: 'rentalObjectCode',
      headerName: 'Hyresid',
      ...sharedProps,
    },
    {
      field: 'applicants',
      headerName: 'Sökande',
      ...sharedProps,
      renderCell: (v) => v.value.length,
    },
    {
      field: 'publishedFrom',
      headerName: 'Datum publicering',
      ...sharedProps,
    },
    {
      field: 'publishedTo',
      headerName: 'Datum tilldelning',
      ...sharedProps,
    },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      renderCell: (x) => (
        <Link to={`/parkingspace/${x.id}`}>
          <IconButton>
            <Chevron />
          </IconButton>
        </Link>
      ),
    },
  ]

  const rows =
    parkingSpaces.data?.map((item: any) => ({
      ...item,
      publishedFrom: dateFormatter.format(new Date(item.publishedFrom)),
      publishedTo: dateFormatter.format(new Date(item.publishedTo)),
    })) ?? []

  return (
    <div>
      <Typography paddingBottom="2rem" variant="h1">
        Intresseanmälningar Parkeringsplats
      </Typography>
      {parkingSpaces.error && 'Error'}
      <DataGridTable
        columns={columns}
        rows={rows}
        getRowId={(row: any) => row.rentalObjectCode}
        loading={parkingSpaces.status === 'pending'}
      />
    </div>
  )
}

export default ParkingSpaces
