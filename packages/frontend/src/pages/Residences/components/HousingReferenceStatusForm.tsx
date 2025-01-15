import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import React from 'react'

type HousingReferenceStatusFormProps = {
  isMinWidth600: boolean
  handleRadioGroupChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => void
}

const HousingReferenceStatusForm = ({
  isMinWidth600,
  handleRadioGroupChange,
}: HousingReferenceStatusFormProps) => {
  return (
    <FormControl>
      <Typography variant="h2">Ange status boendereferens *</Typography>

      <RadioGroup
        name="status-housing-reference"
        defaultValue="default"
        row={isMinWidth600}
        onChange={handleRadioGroupChange}
      >
        <FormControlLabel
          value="approved"
          control={<Radio />}
          label="Godkänd"
        />
        <FormControlLabel
          value="not-approved"
          control={<Radio />}
          label="Ej godkänd"
        />
        <FormControlLabel
          value="contacted-no-response"
          control={<Radio />}
          label="Kontaktad - ej svar"
        />
        <FormControlLabel
          value="no-reference-required"
          control={<Radio />}
          label="Referens krävs ej"
        />
      </RadioGroup>
    </FormControl>
  )
}

export default HousingReferenceStatusForm
