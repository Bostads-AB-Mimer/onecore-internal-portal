import { Box, IconButton, TextField, Typography } from '@mui/material'
import { useCallback, useMemo } from 'react'
import type { GridColDef } from '@mui/x-data-grid'
import Chevron from '@mui/icons-material/ChevronRight'
import { Link } from 'react-router-dom'
import { Listing } from 'onecore-types'

import { DataGridTable } from '../../components'
import { useParkingSpaces } from './hooks/useParkingSpaces'

const sharedProps = {
  cellClassName: '',
  editable: false,
  flex: 1,
  headerClassName: 'font-bison-bold text-lg text-fuscous-gray',
}

const ParkingSpaces = () => {
  const parkingSpaces = useParkingSpaces()
  const dateFormatter = new Intl.DateTimeFormat('sv-SE')
  const numberFormatter = new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
  })

  const columns: GridColDef[] = [
    {
      field: 'address',
      headerName: 'Bilplats',
      ...sharedProps,
      flex: 1.25,
      renderCell: (v) => (
        <span>
          <span style={{ display: 'block' }}>{v.row.address}</span>
          {v.row.rentalObjectCode}
        </span>
      ),
    },
    {
      field: 'districtCaption',
      headerName: 'Område',
      ...sharedProps,
    },
    {
      field: 'rentalObjectTypeCaption',
      headerName: 'Bilplatstyp',
      ...sharedProps,
    },
    {
      field: 'monthlyRent',
      headerName: 'Hyra',
      ...sharedProps,
      valueFormatter: (v) => `${numberFormatter.format(v.value)}/mån`,
    },
    {
      field: 'applicants',
      headerName: 'Sökande',
      ...sharedProps,
      flex: 0.75,
      valueFormatter: (v) => v.value.length,
    },
    {
      field: 'publishedTo',
      headerName: 'Datum tilldelas',
      ...sharedProps,
      valueFormatter: (v) => dateFormatter.format(new Date(v.value)),
    },
    {
      field: 'vacantFrom',
      headerName: 'Ledig från och med',
      ...sharedProps,
      valueFormatter: (v) => dateFormatter.format(new Date(v.value)),
    },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (v) => (
        <Link to={`/parkingspace/${v.id}`}>
          <IconButton>
            <Chevron />
          </IconButton>
        </Link>
      ),
    },
  ]

  const handleSearch = useCallback((v: string) => {
    console.log('Searching for:', v)
  }, [])

  const onSearch = useMemo(() => debounce(handleSearch, 300), [handleSearch])

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
        paddingBottom="2rem"
      >
        <Typography variant="h1">
          Intresseanmälningar Parkeringsplats
        </Typography>
        <SearchApplicant onChange={onSearch} />
      </Box>
      {parkingSpaces.error && 'Error'}
      <DataGridTable
        columns={columns}
        rows={parkingSpaces.data ?? []}
        getRowId={(row: Listing) => row.id}
        loading={parkingSpaces.status === 'pending'}
      />
    </>
  )
}

type SearchApplicantProps = {
  onChange: (v: string) => void
}

const SearchApplicant = (props: SearchApplicantProps) => {
  return (
    <TextField
      size="small"
      variant="outlined"
      placeholder="Sök kundnummer"
      sx={{ width: '100%', maxWidth: 350 }}
      onChange={(e) => props.onChange(e.currentTarget.value)}
    />
  )
}

function debounce<F extends (...args: any[]) => void>(
  callback: F,
  delay: number
): (...args: Parameters<F>) => void {
  let timer: NodeJS.Timeout | null = null

  return (...args: Parameters<F>) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

export default ParkingSpaces
