import { Typography } from '@mui/material'
import { Suspense } from 'react'
import { useParams } from 'react-router-dom'

import { PageGoBackTo } from '../../components'
import {
  ApplicantsLoading,
  ParkingSpaceInfo,
  ParkingSpaceInfoLoading,
} from './components'
import { useParkingSpaceListing } from './hooks/useParkingSpaceListing'
import OffersTabContext from './components/OffersTabContext'
import AllApplicantsTabContext from './components/AllApplicantsTabContext'

const ParkingSpace = () => {
  const routeParams = useParams<'id'>()
  if (!routeParams.id) return null
  const listingId = Number.parseInt(routeParams.id)

  return (
    <>
      <PageGoBackTo to="/parkingspaces" text="Översikt lediga bilplatser" />
      <Suspense fallback={<ApplicantsLoading />}>
        <ParkingSpaceTabs listingId={listingId} />
      </Suspense>
      <Typography paddingY="2rem" variant="h1">
        Objektsinformation
      </Typography>
      <Suspense fallback={<ParkingSpaceInfoLoading />}>
        <ParkingSpaceInfo listingId={listingId} />
      </Suspense>
    </>
  )
}

const ParkingSpaceTabs = (props: { listingId: number }) => {
  const { data } = useParkingSpaceListing({
    id: props.listingId,
  })

  return (
    <>
      {!data.offers.length ? (
        <AllApplicantsTabContext
          listing={data}
          offers={data.offers}
          status={data.status}
        />
      ) : (
        <OffersTabContext
          listing={data}
          offers={data.offers}
          status={data.status}
        />
      )}
    </>
  )
}

export default ParkingSpace
