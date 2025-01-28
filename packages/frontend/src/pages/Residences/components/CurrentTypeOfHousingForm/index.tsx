import { FormControl, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'
import { Control, Controller } from 'react-hook-form'

import IsRenter from './IsRenter'
import IsOwner from './IsOwner'
import IsOther from './IsOther'
import { Inputs } from '../../Residences'

type Props = {
  control: Control<Inputs, any>
}

const CurrentTypeOfHousingForm = ({ control }: Props) => {
  const tabs: {
    [key: string]: JSX.Element | undefined
  } = {
    'rental-apartment': <IsRenter />,
    'sublet-apartment': <IsRenter />,
    'lives-with-parents': <IsOwner />,
    'living-with-tenant': <IsOwner />,
    'owns-villa': <IsOwner />,
    'owns-condominium': <IsOwner />,
    'owns-townhouse': <IsOwner />,
    other: <IsOther />,
  }

  return (
    <Controller
      name="currentTypeOfHousing"
      control={control}
      render={({ field }) => (
        <>
          <FormControl fullWidth>
            <Typography paddingBottom={1} variant="h2">
              Boendeform *
            </Typography>

            <Select size="small" {...field}>
              <MenuItem key={0} value={-1}>
                Välj ur lista
              </MenuItem>

              <MenuItem value="rental-apartment">Hyresrätt</MenuItem>
              <MenuItem value="sublet-apartment">Andrahand</MenuItem>
              <MenuItem value="lives-with-parents">Bor hos förälder</MenuItem>
              <MenuItem value="living-with-tenant">Inneboende</MenuItem>
              <MenuItem value="owns-villa">Äger villa</MenuItem>
              <MenuItem value="owns-condominium">Äger bostadsrätt</MenuItem>
              <MenuItem value="owns-townhouse">Äger radhus</MenuItem>
              <MenuItem value="other">Övrigt/annat</MenuItem>
            </Select>
          </FormControl>

          {tabs[field.value]}
        </>
      )}
    />
  )
}

export default CurrentTypeOfHousingForm
