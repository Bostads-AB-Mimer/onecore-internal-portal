import { FormControl, MenuItem, Select, Typography } from '@mui/material'
import React, { useState } from 'react'

import Apartment from './Apartment'
import OwnsVilla from './OwnsVilla'

const tabs: {
  [key: string]: JSX.Element | undefined
} = {
  'rental-apartment': <Apartment />,
  'sublet-apartment': <Apartment />,
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

          <MenuItem value="rental-apartment">Hyresrätt</MenuItem>
          <MenuItem value="sublet-apartment">Andrahand</MenuItem>
          <MenuItem value="lives-with-parents">Bor hos förälder</MenuItem>
          <MenuItem value="living-with-tenant">Inneboende</MenuItem>
          <MenuItem value="owns-villa">Äger villa</MenuItem>
          <MenuItem value="owns-condominium">Äger bostadsrätt</MenuItem>
          <MenuItem value="owns-townhouse">Äger radhus</MenuItem>
          <MenuItem value="other">Annat/övrigt</MenuItem>
        </Select>
      </FormControl>

      {tabs[selectedTab]}
    </>
  )
}

export default CurrentTypeOfHousingForm
