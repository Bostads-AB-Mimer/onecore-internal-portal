import { FormControl, Typography, TextField } from '@mui/material'
import { Controller, Control } from 'react-hook-form'

import { Inputs } from '../../Residences'

type Props = {
  control: Control<Inputs, any>
}

const NumAdults: React.FC<Props> = () => {
  return (
    <Controller
      name="numAdults"
      render={({ field }) => (
        <FormControl fullWidth>
          <Typography paddingBottom={1} variant="h2">
            Antal vuxna i hushåll *
          </Typography>

          <TextField
            type="number"
            variant="outlined"
            size="small"
            InputProps={{ inputProps: { min: 1 } }}
            {...field}
          />
        </FormControl>
      )}
    />
  )
}

export default NumAdults
