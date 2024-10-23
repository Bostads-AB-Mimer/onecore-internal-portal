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
import { toast } from 'react-toastify'
import { LoadingButton } from '@mui/lab'

import { useCloseParkingSpaceListing } from '../hooks/useCloseParkingSpaceListing'

export const CloseListing = (props: { listingId: number }) => {
  const closeListing = useCloseParkingSpaceListing()
  const [open, setOpen] = useState(false)

  const onClose = () => {
    setOpen(false)
    closeListing.reset()
  }

  const onCloseListing = () =>
    closeListing.mutate(
      { listingId: props.listingId },
      {
        onSuccess: () => {
          setOpen(false)
          toast('Bilplatsannons markerad som ompublicerad', {
            type: 'success',
            hideProgressBar: true,
          })
        },
      }
    )

  return (
    <>
      <Button variant="dark" onClick={() => setOpen(true)}>
        Markera som publicerad
      </Button>
      <Dialog
        onClose={onClose}
        open={open}
        maxWidth="xs"
        TransitionProps={{ exit: false }}
      >
        <Box paddingTop="0.5rem">
          <Box display="flex">
            <DialogTitle variant="h1" fontSize={24} textAlign="left">
              Markera som publicerad
            </DialogTitle>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginLeft="auto"
              marginRight="1rem"
            >
              <IconButton onClick={onClose}>
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
              Bekräfta att du publicerat denna bilplats i Xpand
            </Typography>
            {closeListing.error && (
              <Typography
                color="error"
                textAlign="center"
                paddingTop="1rem"
                paddingBottom="2rem"
              >
                Något gick fel. Kontakta support.
              </Typography>
            )}
            <Box
              display="flex"
              gap="6rem"
              justifyContent="space-between"
              paddingTop="1rem"
            >
              <Button
                variant="dark-outlined"
                onClick={onClose}
                disabled={closeListing.isPending}
              >
                Avbryt
              </Button>
              <LoadingButton
                variant="dark"
                onClick={onCloseListing}
                loading={closeListing.isPending}
              >
                Bekräfta
              </LoadingButton>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  )
}
