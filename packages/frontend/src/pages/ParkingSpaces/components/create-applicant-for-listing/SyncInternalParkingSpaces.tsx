import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'

import { useSyncInternalParkingSpaces } from '../../hooks/useSyncInternalParkingSpaces'

export const SyncInternalParkingSpaces = () => {
  const syncInternalParkingSpaces = useSyncInternalParkingSpaces()
  const [open, setOpen] = useState(false)

  const onCloseModal = () => setOpen(false)

  return (
    <>
      <Button variant="dark-outlined" onClick={() => setOpen(true)}>
        <Box
          sx={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          Synka interna bilplatser
        </Box>
      </Button>

      <Dialog onClose={onCloseModal} open={open} maxWidth="sm" fullWidth>
        <Box paddingTop="1rem">
          <Box display="flex">
            <DialogTitle variant="h1" fontSize={24} textAlign="left">
              Synka interna bilplatser från Xpand
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
        </Box>
        <DialogContent sx={{ paddingTop: '0.5rem' }}>
          <Box paddingX="0.5rem">
            <Typography variant="body1">
              Här kan du synkronisera alla <i>publicerade</i> bilplatser som
              finns i Xpand till OneCore. När du trycker på "Synka" så hämtas
              alla bilplatser från Xpand och sen läggs de in i OneCores databas.
            </Typography>
            <Typography>
              Om en bilplats som ligger inne i OneCore tas bort från Xpand så
              kommer den behövas tas bort manuellt även här i
              medarbetarportalen.
            </Typography>
          </Box>
          <Button
            disabled={syncInternalParkingSpaces.isPending}
            variant="dark"
            sx={{ marginTop: '1rem' }}
            onClick={() => syncInternalParkingSpaces.mutate()}
          >
            Synka
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
