import { Box, Typography } from '@mui/material'
import { Suspense, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TabContext, TabPanel } from '@mui/lab'

import { PageGoBackTo, Tab, Tabs } from '../../components'
import {
  Applicants,
  ApplicantsLoading,
  OfferRound,
  ParkingSpaceInfo,
  ParkingSpaceInfoLoading,
} from './components'
import { useParkingSpaceListing } from './hooks/useParkingSpaceListing'

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
  const [selectedTab, setSelectedTab] = useState('1')
  const { data } = useParkingSpaceListing({
    id: props.listingId,
  })

  const handleChange = (_e: React.SyntheticEvent, tab: string) =>
    setSelectedTab(tab)

  return (
    <TabContext value={selectedTab}>
      <Typography paddingBottom="0.5rem" variant="h1">
        Intresseanmälningar {data.address}
      </Typography>
      <Tabs onChange={handleChange}>
        <Tab disableRipple label="Alla sökande" value="1" />
        {data.offers.map((offer, i) => (
          <Tab
            key={offer.id}
            disableRipple
            label={`Omgång ${i + 1}`}
            value={String(offer.id)}
          />
        ))}
      </Tabs>
      <Box paddingTop="1rem">
        <TabPanel value="1" sx={{ padding: 0 }}>
          <Applicants key="foo" listingId={props.listingId} />
        </TabPanel>
        {data.offers.map((offer, i) => (
          <TabPanel key={offer.id} value={String(offer.id)} sx={{ padding: 0 }}>
            <OfferRound
              key={offer.id}
              applicants={offer.selectedApplicants}
              numRound={i + 1}
            />
          </TabPanel>
        ))}
      </Box>
    </TabContext>
  )
}
export default ParkingSpace
