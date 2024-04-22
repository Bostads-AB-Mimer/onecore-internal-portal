import { Button, Typography } from '@mui/material'
import type { GridColDef } from '@mui/x-data-grid'
import { useParams } from 'react-router-dom'

import { useParkingSpaceListing } from './hooks/useParkingSpaceListing'
import { PageGoBackTo, DataGridTable } from '../../components'

const ParkingSpace = () => {
  const routeParams = useParams<'id'>()
  const _data = useParkingSpaceListing({ id: routeParams.id ?? '' })

  const sharedProps = {
    cellClassName: '',
    editable: false,
    flex: 1,
    headerClassName: 'font-bison-bold text-lg text-fuscous-gray',
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Namn',
      ...sharedProps,
    },
    {
      field: 'points',
      headerName: 'Köpoäng',
      ...sharedProps,
    },
    {
      field: 'address',
      headerName: 'Boende/Adress',
      ...sharedProps,
    },
    {
      field: 'status',
      headerName: 'Status',
      ...sharedProps,
    },
    {
      field: 'listed',
      headerName: 'Anmälan',
      ...sharedProps,
    },
    {
      field: 'has_parking_space',
      headerName: 'Har bilplats',
      renderCell: (v: any) => (v.value ? 'Ja' : 'Nej'),
      ...sharedProps,
    },
    {
      field: 'type',
      headerName: 'Ärende',
      ...sharedProps,
    },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      renderCell: () => <Button>hej</Button>,
    },
  ]

  return (
    <>
      <PageGoBackTo to="/parkingspaces" text="Översikt Intresseanmälningar" />
      <Typography paddingBottom="2rem" variant="h1">
        Intresseanmälningar {routeParams.id}
      </Typography>
      <DataGridTable
        columns={columns}
        rows={[]}
        getRowId={(row: any) => row.listed}
      />
    </>
  )
}

export default ParkingSpace
