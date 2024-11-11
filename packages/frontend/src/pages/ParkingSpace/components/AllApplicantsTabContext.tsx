import { Box, Chip, Typography } from '@mui/material'

import { TabContext, TabPanel } from '@mui/lab'
import {
  Listing,
  ListingStatus,
  Offer,
  OfferStatus,
  OfferWithOfferApplicants,
} from 'onecore-types'

import { Tab, Tabs } from '../../../components'
import { Applicants } from './Applicants'

const AllApplicantsTabContext = (props: {
  listing: Listing
  offers: OfferWithOfferApplicants[]
  status: ListingStatus
}) => {
  return (
    <TabContext value={'1'}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Typography paddingBottom="0.5rem" marginRight="1rem" variant="h1">
          <span>Intresseanmälningar {props.listing.address}</span>
        </Typography>
        <Chip
          label={formatStatus(props.offers, props.status)}
          sx={{ marginY: 'auto' }}
        ></Chip>
      </Box>
      <Tabs>
        <Tab disableRipple label="Alla sökande" value="1" />
      </Tabs>
      <Box paddingTop="1rem">
        <TabPanel value="1" sx={{ padding: 0 }}>
          <Applicants key="foo" listingId={props.listing.id} />
        </TabPanel>
      </Box>
    </TabContext>
  )
}

const listingFormatMap: Record<ListingStatus, string> = {
  [ListingStatus.Active]: 'Publicerad',
  [ListingStatus.Assigned]: 'Tilldelad',
  [ListingStatus.Closed]: 'Stängd',
  [ListingStatus.NoApplicants]: 'Inga sökande',
  [ListingStatus.Expired]: 'Klar för erbjudande',
}

const offerFormatMap: Record<OfferStatus, string> = {
  [OfferStatus.Active]: 'Erbjudande',
  [OfferStatus.Accepted]: 'Tilldelad / kontrakterad',
  [OfferStatus.Declined]: 'Nekad',
  [OfferStatus.Expired]: 'Utgången',
}

const formatStatus = (offers: Offer[], listingStatus: ListingStatus) => {
  //if offers exists, the latest offer status is the overall status
  if (offers.length > 0) {
    return offerFormatMap[offers[offers.length - 1].status]
  }
  return listingFormatMap[listingStatus]
}

export default AllApplicantsTabContext
