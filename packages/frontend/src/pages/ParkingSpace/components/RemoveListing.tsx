import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

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
        <Box padding="1rem">
          <Box display="flex">
            <DialogTitle variant="h2" textAlign="left">
              Ta bort intresseanmälan
            </DialogTitle>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginLeft="auto"
              marginRight="1rem"
            >
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <DialogContent>
            <Typography
              textAlign="center"
              paddingTop="1rem"
              paddingBottom="2rem"
            >
              Vill du ta bort {props.applicantName} som intressent för{' '}
              {props.listingAddress}?
            </Typography>
            <Box
              display="flex"
              gap="6rem"
              justifyContent="space-between"
              paddingTop="1rem"
            >
              <Button variant="dark-outlined" onClick={() => setOpen(false)}>
                Nej, avbryt
              </Button>
              <Button variant="dark">Ja, ta bort</Button>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  )
}
