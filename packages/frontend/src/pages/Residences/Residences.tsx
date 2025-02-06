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
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import dayjs from 'dayjs'

import { SearchContact } from '../ParkingSpaces/components/create-applicant-for-listing/SearchContact'
import { ContactSearchData } from '../ParkingSpaces/components/create-applicant-for-listing/types'
import CustomerInformation from './components/CustomerInformation'
import HousingType from './components/Form/HousingType'
import HousingReferenceReviewStatus from './components/Form/ReviewStatus'
import HousingReferenceComment from './components/Form/HousingReferenceComment'
import CustomerReference from './components/CustomerReference'
import RejectedReason from './components/Form/RejectedReason'
import ExpiresAt from './components/Form/ExpiresAt'
import HousingTypeComponentSwitcher from './components/HousingTypeComponentSwitcher'

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
    lastAdminUpdatedAt: dayjs.Dayjs
    lastApplicantUpdatedAt: dayjs.Dayjs
    phone: string
    reasonRejected: RejectedReasons | ''
    reviewStatus: ReviewStatus
  }
  landlord: string
  numAdults: number
  numChildren: number
}

const renderReviewStatusTab = (tab: ReviewStatus) => {
  switch (tab) {
    case ReviewStatus.REJECTED:
      return (
        <React.Fragment>
          <RejectedReason />
          <ExpiresAt />
        </React.Fragment>
      )
    default:
      return null
  }
}

const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

const ResidencesPage: React.FC = () => {
  const [selectedContact, setSelectedContact] =
    useState<ContactSearchData | null>(null)

  const { handleSubmit, watch, ...formMethods } = useForm<Inputs>()

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
            <FormProvider
              handleSubmit={handleSubmit}
              watch={watch}
              {...formMethods}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} padding={2}>
                  <Grid item xs={12}>
                    <CustomerInformation
                      name="John Applebaum"
                      socialSecurityNumber="111122334444"
                      customerNumber="P123456"
                      phoneNumber="0720-123 45 67"
                    />

                    <HousingType />
                    <HousingTypeComponentSwitcher />

                    <Divider />

                    <HousingReferenceReviewStatus />

                    {renderReviewStatusTab(
                      watch('housingReference.reviewStatus')
                    )}

                    <CustomerReference
                      customerReferenceReceivedAt="2024-01-01"
                      housingReferenceUpdatedAt="2024-01-01"
                      updatedBy="MaS"
                      validUntil="2024-07-01"
                    />

                    <HousingReferenceComment />
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
            </FormProvider>
          </Paper>
        </Stack>
      </Container>
    </Stack>
  )
}

export default ResidencesPage
