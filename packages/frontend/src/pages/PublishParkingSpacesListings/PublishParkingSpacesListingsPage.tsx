import { MenuItem, Select, Stack, Typography } from '@mui/material'
import { type GridColDef } from '@mui/x-data-grid'
import { Listing, ListingStatus } from 'onecore-types'

import { DataGridTable } from '../../components'
import {
  ListingWithOffer,
  useParkingSpaceListings,
} from '../ParkingSpaces/hooks/useParkingSpaceListings'

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
          {row.address}
          {row.rentalObjectCode}
        </span>
      ),
    },
    {
      field: 'blockCaption',
      headerName: 'Område',
      ...sharedColumnProps,
    },
    {
      field: 'districtCaption',
      headerName: 'Distrikt',
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
    {
      field: 'numTimesPublishedInInternalQueue',
      headerName: 'Antal publiceringar intern kö',
      ...sharedColumnProps,
    },
  ]
}

const getActionColumns = (): Array<GridColDef<ListingWithOffer>> => {
  return [
    {
      field: 'actions',
      type: 'actions',
      flex: 1,
      minWidth: 250,
      headerName: 'Publicera i kötyp',
      headerAlign: 'left',
      renderCell: () => (
        <Select defaultValue="select" fullWidth>
          <MenuItem value="select">Välj</MenuItem>
          <MenuItem value="internal">Intern</MenuItem>
          <MenuItem value="external">Extern</MenuItem>
        </Select>
      ),
    },
  ]
}

const exampleListings: Array<Listing> = [
  {
    id: 1,
    address: 'Exempelgatan 1',
    districtCaption: 'Distrikt A',
    blockCaption: 'Område A',
    objectTypeCaption: 'Exempeltyp',
    monthlyRent: 1000,
    rentalObjectCode: '12345',
    publishedFrom: new Date(),
    publishedTo: new Date(),
    status: ListingStatus.Active,
    vacantFrom: new Date(),
  },
  {
    id: 2,
    address: 'Exempelgatan 2',
    districtCaption: 'Distrikt A',
    blockCaption: 'Område B',
    objectTypeCaption: 'Exempeltyp',
    monthlyRent: 1000,
    rentalObjectCode: '12345',
    publishedFrom: new Date(),
    publishedTo: new Date(),
    status: ListingStatus.Active,
    vacantFrom: new Date(),
  },
]

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
    checkboxSelection
    autoHeight
    hideFooterPagination
  />
)

const PublishParkingSpacesPage: React.FC = () => {
  // const { data: listings, isLoading } =
  //   useParkingSpaceListings('needs-republish')

  const { data: listings, isLoading } = {
    data: exampleListings,
    isLoading: false,
  }

  return (
    <Listings
      columns={[...getColumns(), ...getActionColumns()]}
      rows={listings}
      loading={isLoading}
      key="needs-republish"
    />
  )
}

export default PublishParkingSpacesPage
