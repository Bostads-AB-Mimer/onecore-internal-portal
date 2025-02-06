import { FormControl, Typography, TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

import { Inputs } from '../../Residences'

type Props = {
  control: Control<Inputs, any>
}

const Landlord: React.FC<Props> = ({ control }) => {
  return (
    <Controller
      name="landlord"
      control={control}
      shouldUnregister
      defaultValue=""
      render={({ field }) => (
        <FormControl fullWidth>
          <Typography paddingBottom={1} variant="h2">
            Hyresvärd *
          </Typography>

          <TextField
            size="small"
            placeholder="Namn på nuvarande hyresvärd"
            {...field}
          />
        </FormControl>
      )}
    />
  )
}

export default Landlord
