import { Divider, Typography } from '@mui/material'
import type { GridColDef } from '@mui/x-data-grid'
import { useParams } from 'react-router-dom'

import { useParkingSpaceListings } from './hooks/useParkingSpaceListings'
import { PageGoBackTo, DataGridTable } from '../../components'
import { RemoveApplicantFromListing } from './components'

const ParkingSpace = () => {
  const routeParams = useParams<'id'>()
  const { data: parkingSpaceListings } = useParkingSpaceListings({
    id: routeParams.id ?? '',
  })

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
      renderCell: (v) => (v.value ? 'Ja' : 'Nej'),
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
      renderCell: (v) => (
        <RemoveApplicantFromListing
          listingId={routeParams.id ?? ''}
          applicantId={v.row.id}
          applicantName={v.row.name}
          listingAddress={v.row.address}
        />
      ),
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
        rows={parkingSpaceListings}
        getRowId={(row: any) => row.listed}
      />
      <Divider
        sx={{
          borderBottomWidth: '1.85px',
          borderColor: 'black',
          paddingTop: '4rem',
        }}
      />
      <Typography paddingBottom="2rem" variant="h1" paddingTop="2rem">
        Objektsinformation{' '}
      </Typography>
    </>
  )
}

export default ParkingSpace
