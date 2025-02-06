import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import React from 'react'
import { Control, Controller } from 'react-hook-form'

import IsRenter from './IsRenter'
import IsOwner from './IsOwner'
import IsOther from './IsOther'
import { HousingTypes, Inputs } from '../../Residences'

type Props = {
  control: Control<Inputs, any>
}

const CurrentTypeOfHousingForm = ({ control }: Props) => {
  const tabs: {
    [key: string]: JSX.Element | undefined
  } = {
    [HousingTypes.RENTAL]: <IsRenter control={control} />,
    [HousingTypes.SUB_RENTAL]: <IsRenter control={control} />,
    [HousingTypes.LIVES_WITH_FAMILY]: <IsOwner control={control} />,
    [HousingTypes.LODGER]: <IsOwner control={control} />,
    [HousingTypes.OWNS_HOUSE]: <IsOwner control={control} />,
    [HousingTypes.OWNS_FLAT]: <IsOwner control={control} />,
    [HousingTypes.OWNS_ROW_HOUSE]: <IsOwner control={control} />,
    [HousingTypes.OTHER]: <IsOther />,
  }

  return (
    <Controller
      name="housingType"
      control={control}
      shouldUnregister
      defaultValue=""
      rules={{
        required: { value: true, message: 'Du behöver välja en boendeform' },
      }}
      render={({ field, fieldState }) => (
        <>
          <FormControl fullWidth>
            <Typography paddingBottom={1} variant="h2">
              Boendeform *
            </Typography>
            <Select
              size="small"
              displayEmpty
              error={fieldState.invalid}
              {...field}
            >
              <MenuItem value="" disabled>
                Välj ur lista
              </MenuItem>

              <MenuItem value={HousingTypes.RENTAL}>Hyresrätt</MenuItem>
              <MenuItem value={HousingTypes.SUB_RENTAL}>Andrahand</MenuItem>
              <MenuItem value={HousingTypes.LIVES_WITH_FAMILY}>
                Bor hos förälder
              </MenuItem>
              <MenuItem value={HousingTypes.LODGER}>Inneboende</MenuItem>
              <MenuItem value={HousingTypes.OWNS_HOUSE}>Äger villa</MenuItem>
              <MenuItem value={HousingTypes.OWNS_FLAT}>
                Äger bostadsrätt
              </MenuItem>
              <MenuItem value={HousingTypes.OWNS_ROW_HOUSE}>
                Äger radhus
              </MenuItem>
              <MenuItem value={HousingTypes.OTHER}>Övrigt/annat</MenuItem>
            </Select>

            <FormHelperText>{fieldState.error?.message}</FormHelperText>
          </FormControl>
          {tabs[field.value]}
        </>
      )}
    />
  )
}

export default CurrentTypeOfHousingForm
