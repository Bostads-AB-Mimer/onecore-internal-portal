import { IconButton, Stack, Typography } from '@mui/material'
import { type GridColDef } from '@mui/x-data-grid'
import Chevron from '@mui/icons-material/ChevronRight'
import { Listing, ListingStatus } from 'onecore-types'
import { Link } from 'react-router-dom'

import { DataGridTable } from '../../components'
import { ListingWithOffer } from '../ParkingSpaces/hooks/useParkingSpaceListings'
import { DeleteListing } from '../ParkingSpaces/components/DeleteListing'
import { CreateApplicantForListing } from '../ParkingSpaces/components/create-applicant-for-listing/CreateApplicantForListing'

const PublishParkingSpacesPage: React.FC = () => {
  return (
    <Listings
      columns={[...getColumns(), ...getActionColumns()]}
      rows={[]}
      loading={false}
      key="published"
    />
  )
}

const Listings = (props: {
  columns: Array<GridColDef>
  rows: Array<Listing>
  loading: boolean
}) => (
  <DataGridTable
    initialState={{
      sorting: {
        sortModel: [{ field: 'queuePoints', sort: 'desc' }],
      },
      pagination: { paginationModel: { pageSize: 30 } },
    }}
    pageSizeOptions={[10, 30, 60, 100]}
    slots={{
      noRowsOverlay: () => (
        <Stack paddingTop="1rem" alignItems="center" justifyContent="center">
          <Typography fontSize="14px">
            Det finns inga annonser att visa.
          </Typography>
        </Stack>
      ),
    }}
    columns={props.columns}
    rows={props.rows}
    getRowId={(row) => row.id}
    loading={props.loading}
    rowHeight={72}
    disableRowSelectionOnClick
    autoHeight
  />
)

const getColumns = (): Array<GridColDef<ListingWithOffer>> => {
  const numberFormatter = new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
  })

  const sharedColumnProps = {
    editable: false,
    flex: 1,
  }

  return [
    {
      field: 'address',
      headerName: 'Bilplats',
      ...sharedColumnProps,
      flex: 1.25,
      renderCell: ({ row }) => (
        <span>
          <span style={{ display: 'block' }}>{row.address}</span>
          {row.rentalObjectCode}
        </span>
      ),
    },
    {
      field: 'districtCaption',
      headerName: 'Område',
      ...sharedColumnProps,
    },
    {
      field: 'objectTypeCaption',
      headerName: 'Bilplatstyp',
      ...sharedColumnProps,
    },
    {
      field: 'monthlyRent',
      headerName: 'Hyra',
      ...sharedColumnProps,
      valueFormatter: ({ value }) => `${numberFormatter.format(value)}/mån`,
    },

    // TODO: Antal publicerade intern kö
  ]
}

const getActionColumns = (): Array<GridColDef<ListingWithOffer>> => {
  return [
    {
      field: 'actions',
      type: 'actions',
      flex: 1,
      minWidth: 250,
      cellClassName: 'actions',
      getActions: ({ row }) => [
        <DeleteListing
          key={0}
          address={row.address}
          rentalObjectCode={row.rentalObjectCode}
          disabled={row.status !== ListingStatus.Active}
          id={row.id}
        />,
        <CreateApplicantForListing
          key={1}
          disabled={row.status !== ListingStatus.Active}
          listing={row}
        />,
      ],
    },
    {
      field: 'action-link',
      headerName: '',
      sortable: false,
      filterable: false,
      flex: 0.5,
      disableColumnMenu: true,
      renderCell: ({ id }) => (
        <Link to={`/bilplatser/${id}`}>
          <IconButton sx={{ color: 'black' }}>
            <Chevron />
          </IconButton>
        </Link>
      ),
    },
  ]
}

export default PublishParkingSpacesPage
