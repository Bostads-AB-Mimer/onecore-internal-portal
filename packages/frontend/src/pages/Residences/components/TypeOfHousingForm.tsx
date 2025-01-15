import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'

const TypeOfHousingForm: React.FC = () => {
  return (
    <>
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
    </>
  )
}

export default TypeOfHousingForm
