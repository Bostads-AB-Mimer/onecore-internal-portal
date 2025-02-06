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
import dayjs from 'dayjs'

import { SearchContact } from '../ParkingSpaces/components/create-applicant-for-listing/SearchContact'
import { ContactSearchData } from '../ParkingSpaces/components/create-applicant-for-listing/types'
import CustomerInformation from './components/CustomerInformation'
import CurrentTypeOfHousingForm from './components/Form'
import HousingReferenceStatusForm from './components/Form/ReviewStatus'
import Comment from './components/Form/Comment'
import CustomerReference from './components/CustomerReference'

export enum RejectedReasons {
  DISTURBANCE = 'DISTURBANCE',
  LATE_RENT_PAYMENT = 'LATE_RENT_PAYMENT',
  DEBT_TO_LANDLORD = 'DEBT_TO_LANDLORD',
  MISMANAGEMENT = 'MISMANAGEMENT',
}

export enum HousingTypes {
  LIVES_WITH_FAMILY = 'LIVES_WITH_FAMILY',
  LODGER = 'LODGER',
  RENTAL = 'RENTAL',
  SUB_RENTAL = 'SUB_RENTAL',
  OWNS_HOUSE = 'OWNS_HOUSE',
  OWNS_FLAT = 'OWNS_FLAT',
  OWNS_ROW_HOUSE = 'OWNS_ROW_HOUSE',
  OTHER = 'OTHER',
}

export enum ReviewStatus {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CONTACTED_UNREACHABLE = 'CONTACTED_UNREACHABLE',
  PENDING = 'PENDING',
  REFERENCE_NOT_REQUIRED = 'REFERENCE_NOT_REQUIRED',
}

export type Inputs = {
  housingType: HousingTypes | ''
  housingTypeDescription: string
  housingReference: {
    comment: string
    email: string
    expiresAt: dayjs.Dayjs
    lastAdminUpdatedAt: Date
    lastApplicantUpdatedAt: Date
    phone: string
    reasonRejected: RejectedReasons | ''
    reviewStatus: ReviewStatus
  }
  landlord: string
  numAdults: number
  numChildren: number
}

const ResidencesPage: React.FC = () => {
  const [selectedContact, setSelectedContact] =
    useState<ContactSearchData | null>(null)

  const { handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
      housingReference: {
        reviewStatus: ReviewStatus.REJECTED,
        expiresAt: dayjs().add(1, 'month'),
      },
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

                  <Comment control={control} />
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
