import { Divider, Typography } from '@mui/material'
import type { GridColDef, GridValueFormatterParams } from '@mui/x-data-grid'
import { useParams } from 'react-router-dom'
import { Applicant, ListingStatus } from 'onecore-types'

import { useParkingSpaceListing } from './hooks/useParkingSpaceListing'
import { PageGoBackTo, DataGridTable } from '../../components'
import { RemoveApplicantFromListing } from './components'

const ParkingSpace = () => {
  const dateFormatter = new Intl.DateTimeFormat('sv-SE')
  const routeParams = useParams<'id'>()
  const { data: parkingSpaceListing } = useParkingSpaceListing({
    id: routeParams.id ?? '',
  })

  const sharedProps = {
    cellClassName: '',
    editable: false,
    flex: 1,
    headerClassName: 'font-bison-bold text-lg text-fuscous-gray',
  }

  const columns: GridColDef<Applicant>[] = [
    {
      field: 'name',
      headerName: 'Namn',
      ...sharedProps,
    },
    {
      field: 'foo',
      headerName: 'Köpoäng',
      renderCell: () => 'N/A',
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
      valueFormatter: (v) => formatApplicationStatus(v.value),
    },
    {
      field: 'applicationDate',
      headerName: 'Anmälan',
      ...sharedProps,
      valueFormatter: (v: GridValueFormatterParams<string>) =>
        dateFormatter.format(new Date(v.value)),
    },
    {
      field: 'bar',
      headerName: 'Har bilplats',
      valueFormatter: (v) => (v.value ? 'N/A' : 'N/A'),
      ...sharedProps,
    },
    {
      field: 'applicationType',
      headerName: 'Ärende',
      ...sharedProps,
    },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (v) => (
        <RemoveApplicantFromListing
          listingId={routeParams.id ?? ''}
          applicantId={v.row.id}
          applicantName={v.row.name}
          listingAddress={parkingSpaceListing.address}
        />
      ),
    },
  ]

  return (
    <>
      <PageGoBackTo to="/parkingspaces" text="Översikt Intresseanmälningar" />
      <Typography paddingBottom="2rem" variant="h1">
        Intresseanmälningar {parkingSpaceListing.address}
      </Typography>
      <DataGridTable
        columns={columns}
        rows={parkingSpaceListing.applicants ?? []}
        getRowId={(row: any) => row.id}
      />
      <Divider
        sx={{
          borderBottomWidth: '1.85px',
          borderColor: 'black',
          paddingTop: '4rem',
        }}
      />
      <Typography paddingY="2rem" variant="h1">
        Objektsinformation
      </Typography>
    </>
  )
}

const formatApplicationStatus = (v: ListingStatus) =>
  ({
    [ListingStatus.Active]: 'Aktiv',
    [ListingStatus.Assigned]: 'Tilldelad',
    [ListingStatus.Deleted]: 'Borttagen',
  }[v] ?? 'N/A')

export default ParkingSpace
