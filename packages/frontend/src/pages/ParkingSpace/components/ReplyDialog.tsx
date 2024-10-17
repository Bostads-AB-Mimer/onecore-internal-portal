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

interface ReplyDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  content: string
  isPending: boolean
}

export const ReplyDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
  isPending,
}: ReplyDialogProps) => {
  return (
    <Dialog onClose={onClose} open={open} maxWidth="xs">
      <Box padding="1rem">
        <Box display="flex">
          <DialogTitle variant="h2" textAlign="left">
            {title}
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
          <Typography textAlign="center" paddingTop="1rem" paddingBottom="2rem">
            {content}
          </Typography>
          <Box
            display="flex"
            gap="6rem"
            justifyContent="space-between"
            paddingTop="1rem"
          >
            <Button
              variant="dark-outlined"
              onClick={onClose}
              disabled={isPending}
            >
              Nej, avbryt
            </Button>
            <Button variant="dark" onClick={onConfirm} disabled={isPending}>
              Ja, ta bort
            </Button>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  )
}
