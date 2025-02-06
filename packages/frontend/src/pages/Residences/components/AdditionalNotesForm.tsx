import { FormControl, TextareaAutosize, Typography } from '@mui/material'
import React from 'react'
import { Control, Controller } from 'react-hook-form'

interface CommentFormProps {
  control: Control<any>
}

const CommentForm: React.FC<CommentFormProps> = ({ control }) => {
  return (
    <Controller
      name="housingReference.comment"
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

export default CommentForm
