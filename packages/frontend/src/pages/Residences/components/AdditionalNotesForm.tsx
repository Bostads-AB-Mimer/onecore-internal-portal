import { FormControl, TextareaAutosize, Typography } from '@mui/material'
import React from 'react'
import { Control, Controller } from 'react-hook-form'

interface AdditionalNotesFormProps {
  control: Control<any>
}

const AdditionalNotesForm: React.FC<AdditionalNotesFormProps> = ({
  control,
}) => {
  return (
    <Controller
      name="notes"
      control={control}
      render={({ field }) => (
        <FormControl fullWidth>
          <Typography variant="h2" paddingBottom={1}>
            Notering/kommentar
          </Typography>
          <TextareaAutosize {...field} minRows={3} />
        </FormControl>
      )}
    />
  )
}

export default AdditionalNotesForm
