import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
} from '@mui/material'

export interface Props {
  applicantId: string
  applicantName: string
  listingAddress: string
}

export const RemoveListing = (props: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="dark" onClick={() => setOpen(true)}>
        Ta bort
      </Button>
      <Dialog onClose={() => setOpen(false)} open={open} maxWidth="xs">
        <DialogTitle variant="h2" textAlign="left">
          Ta bort intresseanmälan
        </DialogTitle>
        <DialogContent>
          <Typography textAlign="center" paddingY="2rem">
            Vill du ta bort {props.applicantName} som intressent för{' '}
            {props.listingAddress}?
          </Typography>
          <Box
            display="flex"
            gap="6rem"
            justifyContent="space-between"
            paddingY="1rem"
          >
            <Button variant="dark-outlined" onClick={() => setOpen(false)}>
              Nej, avbryt
            </Button>
            <Button variant="dark">Ja, ta bort</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}
