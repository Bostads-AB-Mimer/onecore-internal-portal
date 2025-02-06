import { FormControl, Typography, TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

const NumAdults: React.FC = () => {
  const { control } = useFormContext()

  return (
    <Controller
      name="numAdults"
      control={control}
      defaultValue={1}
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
