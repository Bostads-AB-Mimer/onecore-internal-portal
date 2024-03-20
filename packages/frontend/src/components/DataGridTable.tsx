import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import type {GridColDef} from '@mui/x-data-grid';

//todo: rename?
const DataGridTable = ({
                       rows,
                       columns,
                       getRowId,
                   }: {
    rows: any[],
    columns: GridColDef[],
    getRowId: any

}) => {
    return (
        <DataGrid
            rows={rows}
            columns={columns}
            getRowId={getRowId}
            disableRowSelectionOnClick
            hideFooter
            autoHeight
            getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'bg-white' : 'bg-alto'
            }
            //sx={{ '&, [class^=MuiDataGrid]': { border: 'none'} }}
        />
    );
}
export default DataGridTable