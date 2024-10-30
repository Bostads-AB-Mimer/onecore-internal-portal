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
import { LoadingButton } from '@mui/lab'

interface ReplyDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  content: string
  submitButtonText: string
  isPending: boolean
}

export const ActionDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
  submitButtonText,
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
              Avbryt
            </Button>
            <LoadingButton
              variant="dark"
              onClick={onConfirm}
              loading={isPending}
            >
              {submitButtonText}
            </LoadingButton>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  )
}
