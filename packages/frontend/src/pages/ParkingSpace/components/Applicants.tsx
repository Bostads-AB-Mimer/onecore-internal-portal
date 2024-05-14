import { Chip, Stack, Typography } from '@mui/material'
import type { GridColDef } from '@mui/x-data-grid'
import { ApplicantStatus } from 'onecore-types'

import { DataGridTable } from '../../../components'
import { useParkingSpaceListing } from '../hooks/useParkingSpaceListing'
import { RemoveApplicantFromListing } from './RemoveApplicantFromListing'

const sharedProps = {
  editable: false,
  flex: 1,
}

export const Applicants = (props: { listingId: string }) => {
  const { data: parkingSpaceListing } = useParkingSpaceListing({
    id: props.listingId,
  })

  const dateFormatter = new Intl.DateTimeFormat('sv-SE')

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Namn',
      ...sharedProps,
      flex: 1.25,
    },
    {
      field: 'queuePoints',
      headerName: 'Köpoäng',
      ...sharedProps,
      flex: 0.75,
    },
    {
      field: 'address',
      headerName: 'Boende/Adress',
      valueGetter: (v) => v.row.address.street,
      ...sharedProps,
      flex: 1.25,
    },
    {
      field: 'status',
      headerName: 'Status',
      ...sharedProps,
      flex: 1.25,
      valueFormatter: (v) => formatApplicantStatus(v.value),
      renderCell: (v) => <Chip label={v.formattedValue} />,
    },
    {
      field: 'applicationDate',
      headerName: 'Anmälan',
      ...sharedProps,
      valueFormatter: (v) => dateFormatter.format(new Date(v.value)),
    },
    {
      field: 'currentHousingContract',
      headerName: 'Har bilplats',
      valueFormatter: (v) => (v.value ? 'Ja' : 'Nej'),
      ...sharedProps,
      flex: 0.75,
    },
    {
      field: 'foo',
      headerName: 'Svar erbj.',
      renderCell: (v) => v.value || <i>N/A</i>,
      ...sharedProps,
    },
    {
      field: 'applicationType',
      headerName: 'Ärende',
      renderCell: (v) => v.value || <i>N/A</i>,
      valueFormatter: (v) => (v.value === 'Replace' ? 'Byte' : 'Hyra flera'),
      ...sharedProps,
    },
    {
      field: 'priority',
      headerName: 'Prioritetsgrupp',
      ...sharedProps,
      valueFormatter: (v) => formatApplicantStatus(v.value),
      renderCell: (v) => v.value ?? <i>N/A</i>,
    },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (v) => (
        <RemoveApplicantFromListing
          disabled={v.row.status !== ApplicantStatus.Active}
          listingId={props.listingId}
          applicantId={v.row.id}
          applicantName={v.row.name}
          listingAddress={parkingSpaceListing.address}
        />
      ),
    },
  ]

  return (
    <>
      <Typography paddingBottom="2rem" variant="h1">
        Intresseanmälningar {parkingSpaceListing.address}
      </Typography>
      <DataGridTable
        columns={columns}
        rows={parkingSpaceListing.applicants}
        getRowId={(row) => row.id}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        slots={{
          noRowsOverlay: () => (
            <Stack
              paddingTop="1rem"
              alignItems="center"
              justifyContent="center"
            >
              <Typography fontSize="14px">
                Det finns inga sökande att visa...
              </Typography>
            </Stack>
          ),
        }}
        pageSizeOptions={[5, 10, 25]}
        rowHeight={72}
        disableRowSelectionOnClick
        autoHeight
      />
    </>
  )
}

const applicantStatusFormatMap: Record<ApplicantStatus, string> = {
  [ApplicantStatus.Active]: 'Aktiv',
  [ApplicantStatus.Assigned]: 'Tilldelad',
  [ApplicantStatus.AssignedToOther]: 'Tilldelad annan',
  [ApplicantStatus.WithdrawnByUser]: 'Borttagen av användare',
  [ApplicantStatus.WithdrawnByManager]: 'Borttagen av medarbetare',
}

const formatApplicantStatus = (v: ApplicantStatus) =>
  applicantStatusFormatMap[v]
