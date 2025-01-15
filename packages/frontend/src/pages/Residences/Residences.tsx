import React, { useState } from 'react'
import {
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextareaAutosize,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { SearchContact } from '../ParkingSpaces/components/create-applicant-for-listing/SearchContact'
import { ContactSearchData } from '../ParkingSpaces/components/create-applicant-for-listing/types'

const ComponentA: React.FC = () => <div>A</div>
const ComponentB: React.FC = () => <div>B</div>

const components: {
  [key: string]: JSX.Element | null
} = {
  approved: <ComponentA />,
  'not-approved': <ComponentB />,
  'contacted-no-response': null,
  'no-reference-required': null,
}

const ResidencesPage: React.FC = () => {
  const [selected, setSelected] = useState<string>('')

  const isMinWidth600 = useMediaQuery('(min-width:600px)')

  const [selectedContact, setSelectedContact] = useState<
    ContactSearchData | undefined
  >(undefined)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const handleRadioGroupChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setSelected(value)
  }

  return (
    <Stack spacing={4} padding={0}>
      <Typography variant="h1">Bostäder - sökandeuppgifter</Typography>

      <Container maxWidth="md" disableGutters>
        <Stack spacing={2}>
          <SearchContact
            placeholder="Sök på person eller kundnummer"
            contact={selectedContact}
            onSelect={setSelectedContact}
          />

          <Paper elevation={3}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} padding={2}>
                <Grid item xs={12}>
                  <Typography variant="h1">Kundinformation</Typography>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Namn</TableCell>
                        <TableCell align="right">John Applebaum</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Personnummer</TableCell>
                        <TableCell align="right">111122334444</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Kundnummer</TableCell>
                        <TableCell align="right">P123456</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Telefonnummer</TableCell>
                        <TableCell align="right">0720-123 45 67</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Typography paddingBottom={1} variant="h2">
                    Boendeform *
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      name="current-type-of-housing"
                      size="small"
                      defaultValue="0"
                    >
                      <MenuItem key={0} value={'0'}>
                        Välj ur lista
                      </MenuItem>
                      <MenuItem value="villa">Villa</MenuItem>
                      <MenuItem value="lägenhet">Lägenhet</MenuItem>
                      <MenuItem value="radhus">Radhus</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} margin={0}>
                  <Typography paddingBottom={1} variant="h2">
                    Antal vuxna i hushåll *
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      type="number"
                      name="adult-count"
                      variant="outlined"
                      size="small"
                      defaultValue={1}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} margin={0}>
                  <Typography paddingBottom={1} variant="h2">
                    Antal barn i hushåll *
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      type="number"
                      name="children-count"
                      variant="outlined"
                      size="small"
                      defaultValue={0}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h2">
                    Ange status boendereferens *
                  </Typography>
                  <FormControl>
                    <RadioGroup
                      name="status-housing-reference"
                      defaultValue="default"
                      row={isMinWidth600}
                      onChange={handleRadioGroupChange}
                    >
                      <FormControlLabel
                        value="approved"
                        control={<Radio />}
                        label="Godkänd"
                      />
                      <FormControlLabel
                        value="not-approved"
                        control={<Radio />}
                        label="Ej godkänd"
                      />
                      <FormControlLabel
                        value="contacted-no-response"
                        control={<Radio />}
                        label="Kontaktad - ej svar"
                      />
                      <FormControlLabel
                        value="no-reference-required"
                        control={<Radio />}
                        label="Referens krävs ej"
                      />
                    </RadioGroup>
                  </FormControl>

                  {selected && components[selected]}

                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Referensuppgifter från kund</TableCell>
                        <TableCell align="right">2024-01-01</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          Boendereferens hanterad/uppdaterad
                        </TableCell>
                        <TableCell align="right">2024-01-01</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Senast uppdaterad av</TableCell>
                        <TableCell align="right">MaS</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Giltig till</TableCell>
                        <TableCell align="right">2024-07-01</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Typography variant="h2" paddingBottom={1}>
                    Notering/kommentar
                  </Typography>
                  <FormControl fullWidth>
                    <TextareaAutosize
                      name="notes"
                      minRows={3}
                    ></TextareaAutosize>
                  </FormControl>
                </Grid>

                <Grid
                  item
                  container
                  justifyContent="center"
                  xs={12}
                  marginY={4}
                >
                  <Button type="submit" variant="contained">
                    Spara/uppdatera boendereferens
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Stack>
      </Container>
    </Stack>
  )
}

export default ResidencesPage
