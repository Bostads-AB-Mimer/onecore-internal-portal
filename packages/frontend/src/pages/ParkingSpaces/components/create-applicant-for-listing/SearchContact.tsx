import { Box, Autocomplete, TextField, MenuItem } from '@mui/material'
import { Contact } from 'onecore-types'
import { useState, useMemo, useCallback } from 'react'

import * as utils from '../../../../utils'
import { useSearchContact } from '../../hooks/useSearchContact'
import { mdTheme } from '../../../../theme'

export const SearchContact = (props: {
  onSelect: (contact: Contact) => void
  contact: Contact | null
}) => {
  const [searchString, setSearchString] = useState<string>('')

  const contactQuery = useSearchContact(searchString)

  const onSetSearchString = useMemo(
    () => utils.debounce((value: string) => setSearchString(value), 500),
    []
  )

  const handleSearch = useCallback(
    (v: string) => {
      onSetSearchString(v)
    },
    [onSetSearchString]
  )

  const onSelect = (c: Contact) => {
    props.onSelect(c)
  }

  return (
    <Box paddingTop="1rem">
      <Autocomplete<Contact>
        getOptionLabel={(v) => v.fullName}
        filterOptions={(v) => v}
        options={contactQuery.data ?? []}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            variant="outlined"
            placeholder="Sök boende"
            fullWidth
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
        )}
        onInputChange={(_, v) => handleSearch(v)}
        renderOption={(props, v) => (
          <MenuItem {...props} key={v.contactCode}>
            {v.fullName}
          </MenuItem>
        )}
        onChange={(_, v) => {
          if (v) {
            onSelect(v)
          }
        }}
        getOptionKey={(v) => v.contactCode}
        value={props.contact}
        ListboxProps={{ style: { maxHeight: 125 } }}
      />
    </Box>
  )
}
