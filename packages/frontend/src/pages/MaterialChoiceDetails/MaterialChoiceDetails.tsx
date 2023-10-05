import { Box, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useCommittedChoices, RoomType } from './hooks/useCommittedChoices';

const MaterialChoiceDetails = () => {
  const { data } = useCommittedChoices('406-091-08-0101');
  const roomTypes = data?.roomTypes as RoomType[];

  console.log('roomTypes', roomTypes);

  return (
    <>
      <Box style={{ padding: '4mm', margin: '4mm', /* A4: width: '21cm', height: '29.7cm' */ }}>
        <Typography variant="h1">Materialval</Typography>
        <Divider />
        <Typography variant="h2">Lägenhetsid: '406-091-08-0101'</Typography>

        {roomTypes && Array.isArray(roomTypes) ? (
          roomTypes.map((roomType: RoomType) => (
            <div key={roomType.roomTypeId}>
              {roomType.materialOptionGroups.map((group) => (
                <div key={group.materialOptionGroupId}>
                  {typeof group === 'object' && group.name && (
                    <Typography variant="h4">{group.name || 'Material Options'}</Typography>
                  )}

                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ width: '25%' }}>RUM</TableCell>
                          <TableCell style={{ width: '25%' }}>VAL</TableCell>
                          <TableCell style={{ width: '50%' }}>BESKRIVNING</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {roomType.materialOptionGroups.map((group) =>
                          group.materialChoices.map((choice) => (
                            <TableRow key={choice.materialChoiceId}>
                              <TableCell>{roomType.name}</TableCell>
                              <TableCell>
                                {group.materialOptions.find(
                                  (option) => option.materialOptionId === choice.materialOptionId
                                )?.caption || 'null'}
                              </TableCell>
                              <TableCell>
                                {group.materialOptions.find(
                                  (option) => option.materialOptionId === choice.materialOptionId
                                )?.shortDescription || 'null'}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              ))}
            </div>
          ))
        ) : (
          <Typography>No data available</Typography>
        )}
      </Box>
    </>
  );
}

export default MaterialChoiceDetails;
