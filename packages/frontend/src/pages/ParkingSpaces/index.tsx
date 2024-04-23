import { IconButton, Typography } from '@mui/material'
import type { GridColDef } from '@mui/x-data-grid'
import Chevron from '@mui/icons-material/ChevronRight'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { DataGridTable } from '../../components'

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api'

const ParkingSpaces = () => {
  const navigate = useNavigate()
  const [rows, setData] = useState([])

  useEffect(() => {
    const getListingsWithApplicantsRequest = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/leases/listings-with-applicants`
        )
        //todo: use onecore-types
        const rows = response.data.map((item: any) => ({
          address: item.Address,
          rentalPropertyId: item.RentalObjectCode,
          numberOfApplicants: item.applicants.length,
          publishedFrom: formatDateString(item.PublishedFrom),
          publishedTo: formatDateString(item.PublishedTo),
        }))
        setData(rows)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    getListingsWithApplicantsRequest()
  }, [])

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString)

    const year = date.getFullYear()

    const month = date.getMonth() + 1
    const day = date.getDate()

    return `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`
  }

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
      field: 'rentalPropertyId',
      headerName: 'Hyresid',
      ...sharedProps,
    },
    {
      field: 'numberOfApplicants',
      headerName: 'Sökande',
      ...sharedProps,
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
        <IconButton onClick={() => navigate(`/parkingspace/${x.id}`)}>
          <Chevron />
        </IconButton>
      ),
    },
  ]

  return (
    <div>
      <Typography paddingBottom="2rem" variant="h1">
        Intresseanmälningar Parkeringsplats
      </Typography>
      <DataGridTable
        columns={columns}
        rows={rows}
        getRowId={(row: any) => row.rentalPropertyId}
      />
    </div>
  )
}

export default ParkingSpaces
