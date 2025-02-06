import { FormControl, TextareaAutosize, Typography } from '@mui/material'
import React from 'react'
import { Control, Controller } from 'react-hook-form'

interface CommentProps {
  control: Control<any>
}

const Comment: React.FC<CommentProps> = ({ control }) => (
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

export default Comment
