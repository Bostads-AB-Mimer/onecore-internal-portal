import { FormControl, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'

const TypeOfHousingForm: React.FC = () => {
  return (
    <FormControl fullWidth>
      <Typography paddingBottom={1} variant="h2">
        Boendeform *
      </Typography>

      <Select name="current-type-of-housing" size="small" defaultValue="0">
        <MenuItem key={0} value={'0'}>
          Välj ur lista
        </MenuItem>
        <MenuItem value="villa">Villa</MenuItem>
        <MenuItem value="lägenhet">Lägenhet</MenuItem>
        <MenuItem value="radhus">Radhus</MenuItem>
      </Select>
    </FormControl>
  )
}

export default TypeOfHousingForm
