import { Box, Chip, Typography } from '@mui/material'
import { Suspense, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TabContext, TabPanel } from '@mui/lab'
import { ApplicantStatus, ListingStatus, OfferStatus } from 'onecore-types'

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

  const listingFormatMap: Record<ListingStatus, string> = {
    [ListingStatus.Active]: 'Publicerad',
    [ListingStatus.Assigned]: 'Tilldelad',
    [ListingStatus.Deleted]: 'Borttagen',
    //todo: what is the translation here?
    //todo: the listing will be in the "Klara för erbjudande" tab
    //todo: when an offer exists offerFormatMap will be used instead
    [ListingStatus.Expired]: 'Klar för erbjudande',
  }

  const offerFormatMap: Record<OfferStatus, string> = {
    [OfferStatus.Active]: 'Aktiv',
    [OfferStatus.Accepted]: 'Tilldelad / kontrakterad',
    [OfferStatus.Declined]: 'Nekad',
    [OfferStatus.Expired]: 'Utgången',
  }

  //todo do we need to be this granular?
  const applicantStatusFormatMap: Record<ApplicantStatus, string> = {
    [ApplicantStatus.Active]: '',
    [ApplicantStatus.Assigned]: '',
    [ApplicantStatus.AssignedToOther]: '',
    [ApplicantStatus.WithdrawnByUser]: '',
    [ApplicantStatus.WithdrawnByManager]: '',
    [ApplicantStatus.Offered]: '',
    [ApplicantStatus.OfferAccepted]: '',
    [ApplicantStatus.OfferDeclined]: '',
    [ApplicantStatus.OfferExpired]: '',
  }

  const formatStatus = (v: any) => {
    console.log(data)
    if (data.offers.length > 0) {
      return offerFormatMap[data.offers[data.offers.length - 1].status]
    }
    return listingFormatMap[data.status]
  }

  return (
    <TabContext value={selectedTab}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Typography paddingBottom="0.5rem" marginRight="1rem" variant="h1">
          <span>Intresseanmälningar {data.address}</span>
        </Typography>
        <Chip label={formatStatus(data)} sx={{ marginY: 'auto' }}></Chip>
      </Box>

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
              offer={offer}
              numRound={i + 1}
            />
          </TabPanel>
        ))}
      </Box>
    </TabContext>
  )
}
export default ParkingSpace
