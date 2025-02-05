import { FormControl, MenuItem, Select, Typography } from '@mui/material'
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
    [HousingTypes.LIVES_WITH_FAMILY]: <IsOwner />,
    [HousingTypes.LODGER]: <IsOwner />,
    [HousingTypes.OWNS_HOUSE]: <IsOwner />,
    [HousingTypes.OWNS_FLAT]: <IsOwner />,
    [HousingTypes.OWNS_ROW_HOUSE]: <IsOwner />,
    [HousingTypes.OTHER]: <IsOther />,
  }

  return (
    <>
      <Typography paddingBottom={1} variant="h2">
        Boendeform *
      </Typography>

      <Controller
        name="housingType"
        control={control}
        shouldUnregister={true}
        defaultValue=""
        rules={{
          required: { value: true, message: 'Du behöver välja en boendeform' },
        }}
        render={({ field }) => (
          <FormControl fullWidth>
            <Select fullWidth size="small" displayEmpty {...field}>
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

            {tabs[field.value]}
          </FormControl>
        )}
      />
    </>
  )
}

export default CurrentTypeOfHousingForm
