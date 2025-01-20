import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'

const OwnsVilla: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} margin={0}>
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
            InputProps={{ inputProps: { min: 1 } }}
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} margin={0}>
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
            InputProps={{ inputProps: { min: 0 } }}
          />
        </FormControl>
      </Grid>
    </Grid>
  )
}

const tabs: {
  [key: string]: JSX.Element | undefined
} = {
  'rental-apartment': undefined,
  'sublet-apartment': undefined,
  'lives-with-parents': undefined,
  'living-with-tenant': undefined,
  'owns-villa': <OwnsVilla />,
  'owns-condominium': undefined,
  'owns-townhouse': undefined,
  other: undefined,
}

const CurrentTypeOfHousingForm: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('0')

  return (
    <>
      <FormControl fullWidth>
        <Typography paddingBottom={1} variant="h2">
          Boendeform *
        </Typography>

        <Select
          name="current-type-of-housing"
          size="small"
          defaultValue={0}
          onChange={(event) => setSelectedTab(event.target.value as string)}
        >
          <MenuItem key={0} value={0}>
            Välj ur lista
          </MenuItem>
          <MenuItem value="owns-villa">Äger villa</MenuItem>
        </Select>
      </FormControl>

      {tabs[selectedTab]}
    </>
  )
}

export default CurrentTypeOfHousingForm
