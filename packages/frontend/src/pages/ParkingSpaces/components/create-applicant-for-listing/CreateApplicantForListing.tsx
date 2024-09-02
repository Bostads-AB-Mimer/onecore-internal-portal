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
  Stack,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Lease, Listing } from 'onecore-types'
import { toast } from 'react-toastify'
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab'
import { styled } from 'styled-components'
import { GridColDef } from '@mui/x-data-grid'

import {
  CreateApplicantRequestParams,
  useCreateApplicantForListing,
} from '../../hooks/useCreateApplicantForListing'
import { SearchContact } from './SearchContact'
import { ListingInfo } from './ListingInfo'
import { ContactSearchData } from './types'
import { useTenantWithValidation } from '../../hooks/useTenantWithValidation'
import { ContactInfo } from './ContactInfo'
import { DataGridTable } from '../../../../components'

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

  const tenantQuery = useTenantWithValidation(
    selectedContact?.contactCode,
    props.listing.districtCode,
    props.listing.rentalObjectCode
  )

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
    tenantQuery.data?.tenant.housingContracts.concat(
      tenantQuery.data.tenant.parkingSpaceContracts ?? []
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
                  <TabPanel value="1" sx={{ padding: 0 }}>
                    <SearchContact
                      onSelect={setSelectedContact}
                      contact={selectedContact}
                    />
                    <ContactInfo contact={tenantQuery.data ?? null} />
                    <Box>
                      <Divider />
                    </Box>
                  </TabPanel>
                  <TabPanel value="2" sx={{ padding: 0 }}>
                    <Leases leases={leases} />
                  </TabPanel>
                </TabContext>
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
                {tenantQuery.data && applicationType ? (
                  <LoadingButton
                    disabled={false}
                    loading={createApplicant.isPending}
                    variant="dark"
                    onClick={() =>
                      onCreate({
                        applicationType,
                        contactCode: tenantQuery.data.tenant.contactCode,
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

const sharedProps = {
  editable: false,
  flex: 1,
}

const columns: GridColDef[] = [
  {
    field: 'type',
    headerName: 'Typ',
    ...sharedProps,
  },
  {
    field: 'status',
    headerName: 'Status',
    ...sharedProps,
  },
  {
    field: 'address',
    headerName: 'Adress',
    ...sharedProps,
  },
  {
    field: 'monthlyRent',
    headerName: 'Hyra',
    ...sharedProps,
  },
]

const Leases = (props: { leases: Lease[] }) => (
  <DataGridTable
    sx={{ paddingTop: '1rem' }}
    initialState={{
      pagination: { paginationModel: { pageSize: 5 } },
    }}
    slots={{
      noRowsOverlay: () => (
        <Stack paddingTop="1rem" alignItems="center" justifyContent="center">
          <Typography fontSize="14px">
            Det finns inga kontrakt att visa...
          </Typography>
        </Stack>
      ),
    }}
    hideFooter
    columns={columns}
    rows={props.leases}
    getRowId={(row) => row.id}
    loading={false}
    rowHeight={72}
    disableRowSelectionOnClick
    autoHeight
  />
)

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
