import React, { useEffect, useState } from 'react'
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
import { schemas } from 'onecore-types'
import { z } from 'zod'

import { SearchContact } from '../ParkingSpaces/components/create-applicant-for-listing/SearchContact'
import { ContactSearchData } from '../ParkingSpaces/components/create-applicant-for-listing/types'
import CustomerInformation from './components/CustomerInformation'
import HousingType from './components/Form/HousingType'
import HousingReferenceReviewStatus from './components/Form/ReviewStatus'
import HousingReferenceComment from './components/Form/HousingReferenceComment'
import CustomerReference from './components/CustomerReference'
import HousingTypeComponentSwitcher from './components/HousingTypeComponentSwitcher'
import HousingReferenceReviewStatusComponentSwitcher from './components/HousingReferenceReviewStatusComponentSwitcher'
import { useCustomerCard } from './hooks/useCustomerCard'

type HousingTypes = z.infer<
  typeof schemas.v1.ApplicationProfileHousingTypeSchema
>

type RejectedReasons = z.infer<
  typeof schemas.v1.HousingReferenceReasonRejectedSchema
>

type ReviewStatus = z.infer<
  typeof schemas.v1.HousingReferenceReviewStatusSchema
>

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

const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

const ResidencesPage: React.FC = () => {
  const { handleSubmit, ...formMethods } = useForm<Inputs>({
    defaultValues: {
      housingType: '',
      housingTypeDescription: '',
      housingReference: {
        comment: '',
        email: '',
        expiresAt: dayjs(),
        phone: '',
        reasonRejected: '',
        reviewStatus: 'PENDING',
      },
      landlord: '',
      numAdults: 1,
      numChildren: 0,
    },
  })

  const [selectedContact, setSelectedContact] =
    useState<ContactSearchData | null>(null)

  const { isError, isSuccess, status, data } = useCustomerCard(
    selectedContact?.contactCode
  )

  useEffect(() => {
    if (isSuccess) {
      const {
        applicationProfile: {
          housingType,
          housingTypeDescription,
          landlord,
          numAdults,
          numChildren,
          housingReference,
        },
      } = data

      formMethods.reset({
        housingType: housingType || '',
        housingTypeDescription: housingTypeDescription || '',
        landlord: landlord || '',
        numAdults: numAdults,
        numChildren: numChildren,
        housingReference: {
          comment: housingReference.comment || '',
          email: housingReference.email || '',
          expiresAt: dayjs(housingReference.expiresAt),
          phone: housingReference.phone || '',
          reasonRejected: housingReference.reasonRejected || '',
          reviewStatus: housingReference.reviewStatus || '',
        },
      })
    }
    if (isError) {
      formMethods.reset()
    }
    // Using exhaustive-deps rule leads to an infinite loop, using `status`
    // instead
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

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
            <FormProvider handleSubmit={handleSubmit} {...formMethods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} padding={2}>
                  <Grid item xs={12}>
                    {isSuccess ? (
                      <CustomerInformation
                        fullName={data.contact.fullName}
                        nationalRegistrationNumber={
                          data.contact.nationalRegistrationNumber
                        }
                        contactCode={data.contact.contactCode}
                        phoneNumber={
                          data.contact.phoneNumbers?.find(
                            ({ isMainNumber }) => isMainNumber
                          )?.phoneNumber
                        }
                      />
                    ) : (
                      <CustomerInformation />
                    )}

                    <HousingType />
                    <HousingTypeComponentSwitcher />

                    <Divider />

                    <HousingReferenceReviewStatus />
                    <HousingReferenceReviewStatusComponentSwitcher />

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
