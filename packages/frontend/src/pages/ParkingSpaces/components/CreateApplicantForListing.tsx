import { useCallback, useMemo, useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  Stack,
  MenuItem,
  CircularProgress,
  Autocomplete,
  TextField,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ApplicantStatus, Contact, Listing } from 'onecore-types'

import {
  CreateApplicantRequestParams,
  useCreateApplicantForListing,
} from '../hooks/useCreateApplicantForListing'
import { SearchBar } from '../../../components'
import { useSearchContact } from '../hooks/useSearchContact'
import * as utils from '../../../utils'

export interface Props {
  listing: Listing
  disabled: boolean
}

export const CreateApplicantForListing = (props: Props) => {
  const createApplicant = useCreateApplicantForListing()
  const [open, setOpen] = useState(false)
  const [contact, setContact] = useState<Contact | null>(null)

  const onCreate = (params: CreateApplicantRequestParams) =>
    createApplicant.mutate(params, { onSuccess: () => setOpen(false) })

  const dateFormatter = new Intl.DateTimeFormat('sv-SE')
  const numberFormatter = new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
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
        <Box padding="1rem">
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
              <Box>
                <Box
                  paddingTop="1rem"
                  display="flex"
                  justifyContent="space-between"
                  flex="1"
                >
                  <Typography>Område</Typography>
                  <Box>
                    <Typography fontWeight="bold">
                      {props.listing.districtCaption}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flex="1"
                  paddingTop="0.5rem"
                >
                  <Typography>Objektsid</Typography>
                  <Box>
                    <Typography fontWeight="bold">
                      {props.listing.rentalObjectCode}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flex="1"
                  paddingTop="0.5rem"
                >
                  <Typography>Bilplatstyp</Typography>
                  <Box>
                    <Typography fontWeight="bold">
                      {props.listing.objectTypeCaption}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flex="1"
                  paddingTop="0.5rem"
                >
                  <Typography>Hyra</Typography>
                  <Box>
                    <Typography fontWeight="bold">{`${numberFormatter.format(
                      props.listing.monthlyRent
                    )}/mån`}</Typography>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flex="1"
                  paddingTop="0.5rem"
                >
                  <Typography>Sökande</Typography>
                  <Box>
                    <Typography fontWeight="bold">
                      {props.listing.applicants?.length ?? 0}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flex="1"
                  paddingTop="0.5rem"
                >
                  <Typography>Datum tilldelas</Typography>
                  <Box>
                    <Typography fontWeight="bold">
                      {dateFormatter.format(
                        new Date(props.listing.publishedTo)
                      )}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flex="1"
                  paddingTop="0.5rem"
                >
                  <Typography>Ledig från och med</Typography>
                  <Box>
                    <Typography fontWeight="bold">
                      {dateFormatter.format(new Date(props.listing.vacantFrom))}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box paddingX="0.5rem" paddingTop="1rem">
              <Typography variant="h2">Kundinformation</Typography>
              <SearchContact onSelect={setContact} />
              <Box>
                <Box
                  paddingTop="1rem"
                  display="flex"
                  justifyContent="space-between"
                  flex="1"
                >
                  <Typography>Namn</Typography>
                  <Box>
                    <Typography fontWeight="bold">
                      {contact?.fullName}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flex="1"
                  paddingTop="0.5rem"
                >
                  <Typography>Adress</Typography>
                  <Box>
                    <Typography fontWeight="bold">
                      {contact?.address?.street} {contact?.address?.number}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flex="1"
                  paddingTop="0.5rem"
                >
                  <Typography>Område</Typography>
                  <Box>
                    <Typography fontWeight="bold">N/A</Typography>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flex="1"
                  paddingTop="0.5rem"
                >
                  <Typography>Kontraktstatus bostad</Typography>
                  <Box>
                    <Typography fontWeight="bold">N/A</Typography>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flex="1"
                  paddingTop="0.5rem"
                >
                  <Typography>Kontrakt bilplats</Typography>
                  <Box>
                    <Typography fontWeight="bold">N/A</Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                paddingTop="2rem"
                display="flex"
                justifyContent="space-between"
              >
                <Button variant="dark-outlined">Avbryt</Button>
                {!contact ? (
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
                )}
              </Box>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  )
}

const SearchContact = (props: { onSelect: (contact: Contact) => void }) => {
  const [contact, setContact] = useState<Contact | null>(null)
  const [searchString, setSearchString] = useState<string>('')

  const contactQuery = useSearchContact(searchString)

  const [state, setState] = useState<'idle' | 'focus' | 'typing'>('idle')

  const onSetSearchString = useMemo(
    () => utils.debounce((value: string) => setSearchString(value), 500),
    []
  )

  const handleSearch = useCallback(
    (v: string) => {
      onSetSearchString(v)
      setState(v ? 'typing' : 'idle')
    },
    [onSetSearchString]
  )

  const onSelect = (c: Contact) => {
    console.log('selected contact: ', c)
    props.onSelect(c)
    setContact(c)
  }

  const onBlur = () => {
    setState('idle')
  }

  return (
    <Box paddingTop="1rem">
      <Autocomplete<Contact>
        getOptionLabel={(v) => v.fullName}
        filterOptions={(v) => v}
        options={contactQuery.data ?? []}
        renderInput={(params) => (
          <TextField {...params} label="Add a location" fullWidth />
        )}
        onInputChange={(_, v) => handleSearch(v)}
        renderOption={(props, v) => (
          <MenuItem {...props} key={v.contactCode}>
            {v.fullName}
          </MenuItem>
        )}
        onChange={(_, v) => {
          if (v) {
            onSelect(v)
          }
        }}
        getOptionKey={(v) => v.contactCode}
        value={contact}
      />
      {/* <SearchBar */}

      {/* value={inputValue} */}
      {/* onFocus={() => setState('focus')} */}
      {/* onBlur={() => setState('idle')} */}
      {/* disabled={false} */}
      {/* onChange={handleSearch} */}
      {/* placeholder="Sök personnummer/kundnummer" */}
      {/* /> */}
      {/* {state === 'typing' && ( */}
      {/* <Stack */}
      {/* borderRadius="6px" */}
      {/* marginTop="6px" */}
      {/* position="absolute" */}
      {/* width="100%" */}
      {/* bgcolor="white" */}
      {/* zIndex="99" */}
      {/* maxHeight="120px" */}
      {/* minHeight="40px" */}
      {/* overflow="scroll" */}
      {/* boxShadow="0px 1px 3px 0px rgba(0, 0, 0, 0.3)" */}
      {/* > */}
      {/* {contactQuery.status === 'pending' && ( */}
      {/* <Box */}
      {/* display="flex" */}
      {/* alignItems="center" */}
      {/* justifyContent="center" */}
      {/* flex="1" */}
      {/* > */}
      {/* <CircularProgress size="25px" /> */}
      {/* </Box> */}
      {/* )} */}
      {/* {contactQuery.status !== 'pending' && ( */}
      {/* <> */}
      {/* {!contactQuery.data?.length ? ( */}
      {/* <Typography>Inga resultat hittades...</Typography> */}
      {/* ) : ( */}
      {/* contactQuery.data.map((c) => ( */}
      {/* <MenuItem */}
      {/* key={c.contactCode} */}
      {/* onClick={() => props.onSelect(c as unknown as Contact)} */}
      {/* > */}
      {/* {c.fullName} */}
      {/* </MenuItem> */}
      {/* )) */}
      {/* )} */}
      {/* </> */}
      {/* )} */}
      {/* </Stack> */}
      {/* )} */}
    </Box>
  )
}
