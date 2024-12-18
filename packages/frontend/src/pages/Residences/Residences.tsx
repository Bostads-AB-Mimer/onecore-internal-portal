import React from 'react'
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material'

const ResidencesPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} maxWidth={800}>
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

          <Box paddingBottom={1}>
            <Typography variant="h2">Nuvarande boendeform</Typography>
          </Box>
          <FormControl fullWidth>
            <InputLabel>Välj</InputLabel>
            <Select id="current-type-of-housing" label="Välj">
              <MenuItem value="villa">Villa</MenuItem>
              <MenuItem value="lägenhet">Lägenhet</MenuItem>
              <MenuItem value="radhus">Radhus</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} margin={0}>
          <Box paddingBottom={1}>
            <Typography variant="h2">Antal vuxna i hushåll</Typography>
          </Box>
          <FormControl fullWidth>
            <TextField type="number" id="adult-count" variant="outlined" />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} margin={0}>
          <Box paddingBottom={1}>
            <Typography variant="h2">Antal barn i hushåll</Typography>
          </Box>
          <FormControl fullWidth>
            <TextField type="number" id="children-count" variant="outlined" />
          </FormControl>
        </Grid>

        <Divider />

        <Grid item xs={12}>
          <Typography variant="h2">Ange status boendereferens</Typography>
          <RadioGroup id="status-housing-reference" defaultValue="default" row>
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

          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Referensuppgifter från kund</TableCell>
                <TableCell align="right">2024-01-01</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Boendereferens hanterad/uppdaterad</TableCell>
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

          <Box paddingBottom={1}>
            <Typography variant="h2">Notering/kommentar</Typography>
          </Box>
          <FormControl fullWidth>
            <TextareaAutosize id="notes" minRows={3}></TextareaAutosize>
          </FormControl>

          <Box paddingY={2}>
            <Button type="submit">Spara/uppdatera boendereferens</Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}

export default ResidencesPage
