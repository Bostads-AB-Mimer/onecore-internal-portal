import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Grid, FormControl, Typography, TextField } from '@mui/material'

import { housingFieldMatrix } from '../model/conditional'

const fieldConfigs: any = {
  landlord: {
    label: 'Hyresvärd *',
    input: {
      type: 'text',
      placeholder: 'Namn på nuvarande hyresvärd',
    },
  } as any,
  'housingReference.housingTypeDescription': {
    label: 'Beskriv boende *',
    input: {
      type: 'text',
    },
  },
  numAdults: {
    label: 'Antal vuxna i hushåll *',
    input: {
      type: 'number',
      inputProps: {
        min: 1,
      },
    },
    grid: {
      sm: 6,
    },
  },
  numChildren: {
    label: 'Antal barn i hushåll *',
    input: {
      type: 'number',
      inputProps: {
        min: 0,
      },
    },
    grid: {
      sm: 6,
    },
  },
  'housingReference.phone': {
    label: 'Telefonnummer hyresvärd *',
    input: { type: 'tel' },
  },
  'housingReference.email': {
    label: 'Mejladress hyresvärd',
    input: { type: 'email' },
  },
}

const HousingTypeDetailsSection = () => {
  const { control } = useFormContext()

  const housingType = useFormContext().watch('housingType') as
    | keyof typeof housingFieldMatrix

  const fields = housingFieldMatrix[housingType] ?? ['numAdults', 'numChildren']

  return (
    <React.Fragment>
      {fields.map((fieldName) => {
        const { label, grid, input } = fieldConfigs[fieldName]

        return (
          <Grid item key={fieldName} xs={12} {...grid}>
            <Controller
              name={fieldName}
              control={control}
              render={({ field }) => {
                if (input.type === 'number') {
                  input.onChange = ({ target }: any) =>
                    field.onChange(
                      target.value === '' ? 0 : parseInt(target.value)
                    )
                }
                return (
                  <FormControl fullWidth>
                    <Typography paddingBottom={1} variant="h2">
                      {label}
                    </Typography>

                    <TextField size="small" {...field} {...input} />
                  </FormControl>
                )
              }}
            />
          </Grid>
        )
      })}
    </React.Fragment>
  )
}

export default HousingTypeDetailsSection
