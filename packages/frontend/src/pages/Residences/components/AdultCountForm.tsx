import { FormControl, TextField, Typography } from '@mui/material'
import React from 'react'

const AdultCountForm: React.FC = () => {
  return (
    <FormControl fullWidth>
      <Typography paddingBottom={1} variant="h2">
        Antal vuxna i hushåll *
      </Typography>

      <TextField
        type="number"
        name="adult-count"
        variant="outlined"
        size="small"
        defaultValue={1}
      />
    </FormControl>
  )
}

export default AdultCountForm
