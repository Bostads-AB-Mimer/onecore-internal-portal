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
import { ApplicantStatus, Contact, Listing } from 'onecore-types'

import {
  CreateApplicantRequestParams,
  useCreateApplicantForListing,
} from '../../hooks/useCreateApplicantForListing'
import { SearchContact } from './SearchContact'
import { ListingInfo } from './ListingInfo'
import { ContactInfo } from './ContactInfo'
import { ContactSearchData } from './types'

export interface Props {
  listing: Listing
  disabled: boolean
}

export const CreateApplicantForListing = (props: Props) => {
  const createApplicant = useCreateApplicantForListing()
  const [open, setOpen] = useState(false)
  const [contact, setContact] = useState<ContactSearchData | null>(null)

  const onCreate = (params: CreateApplicantRequestParams) =>
    createApplicant.mutate(params, { onSuccess: () => setOpen(false) })

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
        <Box paddingTop="1rem" paddingX="1rem">
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
              <SearchContact onSelect={setContact} contact={contact} />
              {/* <ContactInfo contact={contact} /> */}
              <Box
                paddingTop="2rem"
                display="flex"
                justifyContent="space-between"
              >
                <Button onClick={() => setOpen(false)} variant="dark-outlined">
                  Avbryt
                </Button>
                {/* !contact ? (
                  <Button disabled variant="dark">
                    Spara
                  </Button>
                ) : (
                  <Button
                    disabled={false}
                    variant="dark"
                    onClick={() =>
                      onCreate({
                        contactCode: contact.contactCode,
                        status: ApplicantStatus.Active,
                        listingId: props.listing.id,
                        name: contact.fullName,
                        nationalRegistrationNumber:
                          contact.nationalRegistrationNumber,
                        applicationType: 'foo',
                      })
                    }
                  >
                    Spara
                  </Button>
                  ) */}
              </Box>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  )
}
