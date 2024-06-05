import { useCallback, useMemo, useState } from 'react'
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

import { useCreateApplicantForListing } from '../hooks/useCreateApplicantForListing'
import { SearchBar } from '../../../components'
import { useContact } from '../hooks/useContact'
import * as utils from '../../../utils'

export interface Props {
  listing: Listing
  disabled: boolean
}

export const CreateApplicantForListing = (props: Props) => {
  const createApplicant = useCreateApplicantForListing()
  const [open, setOpen] = useState(false)
  const [searchString, setSearchString] = useState<string>('')
  const contactQuery = useContact(searchString)

  const handleSearch = useCallback((v: string) => setSearchString(v), [])
  const onSearch = useMemo(
    () => utils.debounce(handleSearch, 500),
    [handleSearch]
  )

  const onCreate = () =>
    createApplicant.mutate(
      { listingId: props.listing.id },
      { onSuccess: () => setOpen(false) }
    )

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
              <Box paddingTop="1rem">
                <SearchBar
                  disabled={false}
                  onChange={onSearch}
                  placeholder="Sök personnummer/kundnummer"
                />
              </Box>
              {!contactQuery.data && <Box height="50px" />}
              <Box
                paddingTop="1rem"
                display="flex"
                gap="0.5rem"
                justifyContent="flex-end"
              >
                <Button variant="dark-outlined">Avbryt</Button>
                <Button disabled={Boolean(!contactQuery.data)} variant="dark">
                  Spara
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  )
}
