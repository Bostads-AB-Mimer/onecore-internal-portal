import React, { useState } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'

import { SearchContact } from '../ParkingSpaces/components/create-applicant-for-listing/SearchContact'
import { ContactSearchData } from '../ParkingSpaces/components/create-applicant-for-listing/types'
import CustomerInformation from './components/CustomerInformation'
import CurrentTypeOfHousingForm from './components/CurrentTypeOfHousingForm'
import HousingReferenceStatusForm from './components/HousingReferenceStatusForm'
import AdditionalNotesForm from './components/AdditionalNotesForm'
import CustomerReference from './components/CustomerReference'

export type Inputs = {
  currentTypeOfHousing: string
  housingReferenceStatus: string
  notApprovedReason: string
  notes: string
}

const ResidencesPage: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<
    ContactSearchData | undefined
  >(undefined)

  const { handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
      currentTypeOfHousing: '-1',
      housingReferenceStatus: 'not-approved',
      notApprovedReason: '-1',
      notes: '',
    },
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <Stack spacing={4} padding={0}>
      <Typography variant="h1">Bostäder - sökandeuppgifter</Typography>

      <Container maxWidth="md" disableGutters>
        <Stack spacing={2}>
          <SearchContact
            placeholder="Sök på person eller kundnummer"
            contact={selectedContact}
            onSelect={setSelectedContact}
          />

          <Paper elevation={3}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2} padding={2}>
                <Grid item xs={12}>
                  <CustomerInformation
                    name="John Applebaum"
                    socialSecurityNumber="111122334444"
                    customerNumber="P123456"
                    phoneNumber="0720-123 45 67"
                  />

                  <CurrentTypeOfHousingForm control={control} />

                  <Divider />

                  <HousingReferenceStatusForm control={control} />

                  <CustomerReference
                    customerReferenceReceivedAt="2024-01-01"
                    housingReferenceUpdatedAt="2024-01-01"
                    updatedBy="MaS"
                    validUntil="2024-07-01"
                  />

                  <AdditionalNotesForm control={control} />
                </Grid>

                <Grid
                  item
                  container
                  justifyContent="center"
                  xs={12}
                  marginY={4}
                >
                  <Button type="submit" variant="contained">
                    Spara/uppdatera boendereferens
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Stack>
      </Container>
    </Stack>
  )
}

export default ResidencesPage
