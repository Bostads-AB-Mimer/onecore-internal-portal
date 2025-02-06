import { FormControl, Typography, TextField } from '@mui/material'
import { Controller, Control } from 'react-hook-form'

import { Inputs } from '../../Residences'

type Props = {
  control: Control<Inputs, any>
}

const NumChildren: React.FC<Props> = ({ control }) => {
  return (
    <Controller
      name="numChildren"
      control={control}
      defaultValue={0}
      render={({ field }) => (
        <FormControl fullWidth>
          <Typography paddingBottom={1} variant="h2">
            Antal barn i hushåll *
          </Typography>

          <TextField
            type="number"
            variant="outlined"
            size="small"
            defaultValue={0}
            InputProps={{ inputProps: { min: 0 } }}
            {...field}
          />
        </FormControl>
      )}
    />
  )
}

export default NumChildren
