import { Tab as MuiTab, Typography, styled } from '@mui/material'
import { Suspense, useState } from 'react'
import { useParams } from 'react-router-dom'

import { PageGoBackTo } from '../../components'
import {
  Applicants,
  ApplicantsLoading,
  OfferRound,
  ParkingSpaceInfo,
  ParkingSpaceInfoLoading,
} from './components'
import { TabContext, TabPanel, TabList } from '@mui/lab'
import { useParkingSpaceListing } from './hooks/useParkingSpaceListing'

const ParkingSpace = () => {
  const routeParams = useParams<'id'>()

  return (
    <>
      <PageGoBackTo to="/parkingspaces" text="Översikt lediga bilplatser" />
      <Suspense fallback={<ApplicantsLoading />}>
        <ParkingSpaceTabs listingId={routeParams.id ?? ''} />
      </Suspense>
      <Typography paddingY="2rem" variant="h1">
        Objektsinformation
      </Typography>
      <Suspense fallback={<ParkingSpaceInfoLoading />}>
        <ParkingSpaceInfo listingId={routeParams.id ?? ''} />
      </Suspense>
    </>
  )
}

const Tab = styled(MuiTab)(() => ({
  fontSize: 20,
  textTransform: 'uppercase',
  fontFamily: 'bisonBold',
  fontWeight: 900,
  cursor: 'pointer',
  letterSpacing: '-0.00833em',
  color: 'rgba(0, 0, 0, 0.5)',
  '&.Mui-selected': {
    color: 'rgba(0, 0, 0, 0.87)',
  },
}))

const Tabs = styled(TabList)(() => ({
  '& .MuiTabs-indicator': {
    width: '100%',
    backgroundColor: 'black',
    height: '3px',
  },
}))

const ParkingSpaceTabs = (props: { listingId: string }) => {
  const [selectedTab, setSelectedTab] = useState('1')
  const { data } = useParkingSpaceListing({
    id: props.listingId,
  })

  const handleChange = (_e: React.SyntheticEvent, tab: string) =>
    setSelectedTab(tab)

  return (
    <TabContext value={selectedTab}>
      <Tabs onChange={handleChange}>
        <Tab disableRipple label="Annons" value="1" sx={{}} />
        {data.offers.map((offer, i) => (
          <Tab
            key={offer.id}
            disableRipple
            label={`Erbjudandeomgång ${i + 1}`}
            value={String(offer.id)}
            sx={{}}
          />
        ))}
      </Tabs>
      <>
        <TabPanel value="1" sx={{ padding: 0 }}>
          <Applicants key="foo" listingId={props.listingId} />
        </TabPanel>
        {data.offers.map((offer, i) => (
          <TabPanel key={offer.id} value={String(offer.id)} sx={{ padding: 0 }}>
            <OfferRound
              key={offer.id}
              listingId={props.listingId}
              numRound={i + 1}
            />
          </TabPanel>
        ))}
      </>
    </TabContext>
  )
}
export default ParkingSpace
