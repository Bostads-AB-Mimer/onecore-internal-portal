import { Stack, Typography } from '@mui/material'
import { type GridColDef } from '@mui/x-data-grid'
import { Listing } from 'onecore-types'

import { DataGridTable } from '../../components'
import {
  ListingWithOffer,
  useParkingSpaceListings,
} from '../ParkingSpaces/hooks/useParkingSpaceListings'

const PublishParkingSpacesPage: React.FC = () => {
  const { data: parkingSpaceListings, isLoading } =
    useParkingSpaceListings('needs-republish')

  return (
    <Listings
      columns={[...getColumns(), ...getActionColumns()]}
      rows={parkingSpaceListings}
      loading={isLoading}
      key="needs-republish"
    />
  )
}

const Listings = ({
  columns,
  rows = [],
  loading,
}: {
  columns: Array<GridColDef>
  rows?: Array<Listing>
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
    columns={columns}
    rows={rows}
    getRowId={(row) => row.id}
    loading={loading}
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
      getActions: () => [
        // TODO: Add dropdown menu for publish in queue type
      ],
    },
  ]
}

export default PublishParkingSpacesPage
