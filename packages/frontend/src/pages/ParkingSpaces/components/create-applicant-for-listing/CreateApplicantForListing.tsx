import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Listing } from 'onecore-types'
import { toast } from 'react-toastify'
import { LoadingButton } from '@mui/lab'

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

export const CreateApplicantForListing = (props: Props) => {
  const createApplicant = useCreateApplicantForListing(props.listing.id)
  const [open, setOpen] = useState(false)
  const [selectedContact, setSelectedContact] =
    useState<ContactSearchData | null>(null)

  const contactQuery = useContactByContactCode(selectedContact?.contactCode)

  const onCreate = (params: CreateApplicantRequestParams) =>
    createApplicant.mutate(params, {
      onSuccess: () => {
        setOpen(false)
        toast('Intresseanmälan skapad', {
          type: 'success',
          hideProgressBar: true,
        })
        createApplicant.reset()
      },
    })

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
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        maxWidth="xs"
        fullWidth
      >
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
            <DialogContent>
              <Box paddingX="0.5rem">
                <Typography variant="h2">Objektsinformation</Typography>
                <ListingInfo listing={props.listing} />
              </Box>
              <Box paddingX="0.5rem" paddingTop="1rem">
                <Typography variant="h2">Kundinformation</Typography>
                <SearchContact
                  onSelect={setSelectedContact}
                  contact={selectedContact}
                />
                <ContactInfo contact={contactQuery.data ?? null} />
              </Box>
              <Box
                paddingTop="2rem"
                display="flex"
                justifyContent="space-between"
              >
                <Button onClick={() => setOpen(false)} variant="dark-outlined">
                  Avbryt
                </Button>
                {!contactQuery.data ? (
                  <Button disabled variant="dark">
                    Spara
                  </Button>
                ) : (
                  <LoadingButton
                    disabled={false}
                    loading={createApplicant.isPending}
                    variant="dark"
                    onClick={() =>
                      onCreate({
                        applicationType: 'Additional', // TODO: Need to get this value
                        contactCode: contactQuery.data.contactCode,
                        parkingSpaceId: props.listing.rentalObjectCode,
                      })
                    }
                  >
                    Spara
                  </LoadingButton>
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
