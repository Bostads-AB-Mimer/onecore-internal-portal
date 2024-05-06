import { Box, Chip, Divider, Typography } from '@mui/material'
import { Suspense } from 'react'
import type { GridColDef } from '@mui/x-data-grid'
import { useParams } from 'react-router-dom'
import { ApplicantStatus } from 'onecore-types'

import { useParkingSpaceListing } from './hooks/useParkingSpaceListing'
import { DataGridTable, PageGoBackTo } from '../../components'
import { ParkingSpaceLoading, RemoveApplicantFromListing } from './components'

const Applicants = (props: { listingId: string }) => {
  const { data: parkingSpaceListing } = useParkingSpaceListing({
    id: props.listingId,
  })

  const dateFormatter = new Intl.DateTimeFormat('sv-SE')

  const sharedProps = {
    editable: false,
    flex: 1,
    headerClassName: 'font-bison-bold text-lg text-fuscous-gray',
  }

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
      field: 'applicationType',
      headerName: 'Ärende',
      renderCell: (v) => v.value || <i>N/A</i>,
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
        emptyLabel="Det finns inga sökande att visa..."
        columns={columns}
        rows={parkingSpaceListing.applicants}
        getRowId={(row) => row.id}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          sorting: {
            sortModel: [{ field: 'queuePoints', sort: 'desc' }],
          },
        }}
        rowHeight={65}
        disableRowSelectionOnClick
        autoHeight
        hideFooter
      />
    </>
  )
}

const ParkingSpaceInfo = (props: { listingId: string }) => {
  const { data: parkingSpaceListing } = useParkingSpaceListing({
    id: props.listingId,
  })

  const dateFormatter = new Intl.DateTimeFormat('sv-SE')
  const numberFormatter = new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
  })

  return (
    <Box display="flex" justifyContent="space-between" gap="4rem">
      <Box flex="0.5" paddingX="1rem">
        <Box display="flex" justifyContent="space-between" flex="1">
          <Typography>Bilplats</Typography>
          <Box>
            <Typography fontWeight="bold">
              {parkingSpaceListing.address}
            </Typography>
            <Typography fontWeight="bold" textAlign="right">
              {parkingSpaceListing.rentalObjectCode}
            </Typography>
          </Box>
        </Box>
        <Box height="50px" />
        <Box display="flex" justifyContent="space-between" flex="1">
          <Typography>Skyltnummer</Typography>
          <Box>
            <Typography fontWeight="bold">{'N/A'}</Typography>
          </Box>
        </Box>
        <Box height="50px" />
        <Box display="flex" justifyContent="space-between" flex="1">
          <Typography>Område</Typography>
          <Box>
            <Typography fontWeight="bold">
              {parkingSpaceListing.districtCaption}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" flex="1">
          <Typography>Bilplatstyp</Typography>
          <Box>
            <Typography fontWeight="bold">
              {parkingSpaceListing.objectTypeCaption}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" flex="1">
          <Typography>Hyra</Typography>
          <Box>
            <Typography fontWeight="bold">{`${numberFormatter.format(
              parkingSpaceListing.monthlyRent
            )}/mån`}</Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" flex="1">
          <Typography>Sökande</Typography>
          <Box>
            <Typography fontWeight="bold">
              {parkingSpaceListing.applicants?.length ?? 0}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" flex="1">
          <Typography>Datum tilldelas</Typography>
          <Box>
            <Typography fontWeight="bold">
              {dateFormatter.format(new Date(parkingSpaceListing.publishedTo))}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" flex="1">
          <Typography>Ledig från och med</Typography>
          <Box>
            <Typography fontWeight="bold">
              {dateFormatter.format(new Date(parkingSpaceListing.vacantFrom))}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box border="1px solid black" flex="1" />
    </Box>
  )
}

const ParkingSpace = () => {
  const routeParams = useParams<'id'>()

  return (
    <>
      <PageGoBackTo to="/parkingspaces" text="Översikt Intresseanmälningar" />
      <Suspense fallback={<ParkingSpaceLoading />}>
        <Applicants listingId={routeParams.id ?? ''} />
      </Suspense>
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
      <Suspense fallback={<ParkingSpaceLoading />}>
        <ParkingSpaceInfo listingId={routeParams.id ?? ''} />
      </Suspense>
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

export default ParkingSpace
