import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  Divider,
  Radio,
  FormControlLabel,
  RadioGroup,
  Tab as MuiTab,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Listing } from 'onecore-types'
import { toast } from 'react-toastify'
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab'
import { styled } from 'styled-components'

import {
  CreateApplicantRequestParams,
  useCreateApplicantForListing,
} from '../../hooks/useCreateApplicantForListing'
import { SearchContact } from './SearchContact'
import { ListingInfo } from './ListingInfo'
import { ContactSearchData } from './types'
import { useContactByContactCode } from '../../hooks/useContactByContactCode'
import { ContactInfo } from './ContactInfo'

export interface Props {
  listing: Listing
  disabled: boolean
}

const Tab = styled(MuiTab)(() => ({
  fontSize: 20,
  textTransform: 'uppercase',
  fontFamily: 'bisonBold',
  fontWeight: 900,
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

export const CreateApplicantForListing = (props: Props) => {
  const createApplicant = useCreateApplicantForListing(props.listing.id)
  const [open, setOpen] = useState(false)
  const [selectedContact, setSelectedContact] =
    useState<ContactSearchData | null>(null)
  const [selectedTab, setSelectedTab] = useState('1')

  const [applicationType, setApplicationType] = useState<
    'Replace' | 'Additional'
  >()

  const contactQuery = useContactByContactCode(selectedContact?.contactCode)

  const onCreate = (params: CreateApplicantRequestParams) =>
    createApplicant.mutate(params, {
      onSuccess: () => {
        onCloseModal()
        toast('Intresseanmälan skapad', {
          type: 'success',
          hideProgressBar: true,
        })
      },
    })

  const onCloseModal = () => {
    setOpen(false)
    setSelectedContact(null)
    setApplicationType(undefined)
  }

  const handleChange = (_e: React.SyntheticEvent, tab: string) =>
    setSelectedTab(tab)

  const leases =
    contactQuery.data?.housingContracts.concat(
      contactQuery.data.parkingSpaceContracts ?? []
    ) ?? []

  return (
    <>
      <Button
        disabled={props.disabled}
        variant="dark"
        onClick={() => setOpen(true)}
      >
        <Box
          sx={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          Ny anmälan
        </Box>
      </Button>
      <Dialog onClose={onCloseModal} open={open} maxWidth="sm" fullWidth>
        {createApplicant.error ? (
          <CreateApplicantError reset={createApplicant.reset} />
        ) : (
          <Box paddingTop="1rem">
            <Box display="flex">
              <DialogTitle variant="h1" fontSize={24} textAlign="left">
                Ny intresseanmälan, {props.listing.address}
              </DialogTitle>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginLeft="auto"
                marginRight="1rem"
              >
                <IconButton onClick={() => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
            <DialogContent sx={{ paddingTop: '0.5rem' }}>
              <Box paddingX="0.5rem">
                <Typography variant="h2">Objektsinformation</Typography>
                <ListingInfo listing={props.listing} />
              </Box>
              <Box paddingX="0.5rem" paddingTop="1rem">
                <TabContext value={selectedTab}>
                  <Tabs onChange={handleChange}>
                    <Tab
                      disableRipple
                      label="Kundinformation"
                      value="1"
                      sx={{ paddingLeft: 0 }}
                    />
                    <Tab
                      label={`Kontrakt (${leases.length})`}
                      value="2"
                      disableRipple
                    />
                  </Tabs>
                  <TabPanel value="1" sx={{ paddingLeft: 0, paddingTop: 0 }}>
                    <SearchContact
                      onSelect={setSelectedContact}
                      contact={selectedContact}
                    />
                    <ContactInfo contact={contactQuery.data ?? null} />
                  </TabPanel>
                  <TabPanel value="2" sx={{ paddingLeft: 0, paddingTop: 0 }}>
                    <SearchContact
                      onSelect={setSelectedContact}
                      contact={selectedContact}
                    />
                    <ContactInfo contact={contactQuery.data ?? null} />
                  </TabPanel>
                </TabContext>
              </Box>
              <Box paddingX="0.5rem">
                <Divider />
              </Box>
              <Box
                paddingX="0.5rem"
                paddingTop="0.5rem"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Ärendetyp</Typography>
                <RadioGroup name="radio-buttons-group" row>
                  <FormControlLabel
                    checked={applicationType === 'Replace'}
                    control={<Radio size="small" />}
                    label="Byte"
                    onChange={() => setApplicationType('Replace')}
                  />
                  <FormControlLabel
                    checked={applicationType === 'Additional'}
                    control={<Radio size="small" />}
                    label="Hyra flera"
                    onChange={() => setApplicationType('Additional')}
                  />
                </RadioGroup>
              </Box>
              <Box
                paddingTop="2rem"
                display="flex"
                justifyContent="space-between"
              >
                <Button onClick={onCloseModal} variant="dark-outlined">
                  Avbryt
                </Button>
                {contactQuery.data && applicationType ? (
                  <LoadingButton
                    disabled={false}
                    loading={createApplicant.isPending}
                    variant="dark"
                    onClick={() =>
                      onCreate({
                        applicationType,
                        contactCode: contactQuery.data.contactCode,
                        parkingSpaceId: props.listing.rentalObjectCode,
                      })
                    }
                  >
                    Spara
                  </LoadingButton>
                ) : (
                  <Button disabled variant="dark">
                    Lägg till
                  </Button>
                )}
              </Box>
            </DialogContent>
          </Box>
        )}
      </Dialog>
    </>
  )
}

const CreateApplicantError = (props: { reset: () => void }) => (
  <Box
    padding="1rem"
    height="250px"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="space-between"
  >
    <Typography textAlign="center" variant="h1">
      Något gick fel...
    </Typography>
    <Box>Försök igen eller kontakta support</Box>
    <Box paddingTop="2rem">
      <Button variant="dark-outlined" onClick={props.reset}>
        Försök igen
      </Button>
    </Box>
  </Box>
)
