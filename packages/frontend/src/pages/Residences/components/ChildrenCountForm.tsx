import { FormControl, TextField, Typography } from '@mui/material'
import React from 'react'

const AdultCountForm: React.FC = () => {
  return (
    <FormControl fullWidth>
      <Typography paddingBottom={1} variant="h2">
        Antal barn i hushåll *
      </Typography>

      <TextField
        type="number"
        name="children-count"
        variant="outlined"
        size="small"
        defaultValue={0}
      />
    </FormControl>
  )
}

export default AdultCountForm
