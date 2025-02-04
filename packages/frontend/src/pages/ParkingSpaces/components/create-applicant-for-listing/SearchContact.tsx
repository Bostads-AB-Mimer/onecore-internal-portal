import {
  Box,
  Autocomplete,
  TextField,
  MenuItem,
  Typography,
} from '@mui/material'
import { useState, useMemo, useCallback } from 'react'

import * as utils from '../../../../utils'
import { useSearchContacts } from '../../hooks/useSearchContacts'
import { ContactSearchData } from './types'
import { mdTheme } from '../../../../theme'

type SearchContactProps = {
  placeholder?: string
  onSelect: (contact: ContactSearchData | undefined) => void
  contact?: ContactSearchData
}

export const SearchContact = ({
  onSelect,
  contact,
  placeholder = 'Sök boende',
}: SearchContactProps) => {
  const [searchString, setSearchString] = useState<string>('')
  const contactsQuery = useSearchContacts(searchString)

  const onSetSearchString = useMemo(
    () => utils.debounce(setSearchString, 500),
    []
  )

  const handleSearch = useCallback(onSetSearchString, [onSetSearchString])

  if (contactsQuery.error) {
    return (
      <Box paddingTop="1rem">
        <Typography color="error">
          Något gick fel. Försök igen eller kontakta support
        </Typography>
      </Box>
    )
  }

  return (
    <Box paddingTop="1rem">
      <Autocomplete<ContactSearchData>
        getOptionLabel={(v) => v.fullName}
        filterOptions={(v) => v}
        options={contactsQuery.data ?? []}
        onInputChange={(_, v) => handleSearch(v)}
        onChange={(_, v) => onSelect(v || undefined)}
        getOptionKey={(v) => v.contactCode}
        value={contact}
        ListboxProps={{ style: { maxHeight: 125 } }}
        noOptionsText="Inga boende hittades..."
        loading={contactsQuery.fetchStatus === 'fetching'}
        renderOption={(props, v) => (
          <MenuItem {...props} key={v.contactCode}>
            {v.fullName}
          </MenuItem>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            variant="outlined"
            placeholder={placeholder}
            fullWidth
          />
        )}
        sx={{
          '& .MuiOutlinedInput-root': {
            fontSize: '16px',
            paddingTop: '2px',
            paddingBottom: '2px',
            color: '#000',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: mdTheme.palette.warmGrey.main,
              borderRadius: '6px',
              borderWidth: '1.5px',
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1.5px',
                borderColor: '#2e2e2e',
              },
            },
            '& .MuiInputLabel-outlined': {
              color: '#2e2e2e',
              '&.Mui-focused': {},
            },
          },
        }}
      />
    </Box>
  )
}
