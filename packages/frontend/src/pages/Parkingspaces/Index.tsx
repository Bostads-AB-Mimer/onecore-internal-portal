import {
    IconButton, Typography,
} from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import Chevron from '@mui/icons-material/ChevronRight';
import * as React from "react";

import DataGridTable from "../../components/DataGridTable";

const ParkingSpaces = () => {

    const sharedProps = {
        cellClassName: '',
        editable: false,
        flex: 1,
        headerClassName: ''
    }

    const columns: GridColDef[] = [
        {
            field: 'address',
            headerName: 'Bilplats',
            ...sharedProps
        },
        {
            field: 'rentalPropertyId',
            headerName: 'Hyresid',
            ...sharedProps
        },
        {
            field: 'numberOfApplicants',
            headerName: 'Sökande',
            ...sharedProps
        },
        {
            field: 'pubishedFrom',
            headerName: 'Datum publicering',
            ...sharedProps
        },
        {
            field: 'publishedTo',
            headerName: 'Datum tilldelning',
            ...sharedProps
        },
        {
            field: "action",
            headerName: "",
            sortable: false,
            renderCell: () => (
                <IconButton onClick={() => console.log("todo: implement collapsed view")}>
                    <Chevron/>
                </IconButton>
            ),
        }
    ];

    const rows = [
        { address: 'Bellmansgatan 1', rentalPropertyId: '123-123-123-0201/01', numberOfApplicants: '1', pubishedFrom: '2024-01-01', publishedTo: '2024-01-01' },
        { address: 'Bellmansgatan 2', rentalPropertyId: '123-123-123-0201/02', numberOfApplicants: '2', pubishedFrom: '2024-01-01', publishedTo: '2024-01-01' },
        { address: 'Bellmansgatan 3', rentalPropertyId: '123-123-123-0201/03', numberOfApplicants: '3', pubishedFrom: '2024-01-01', publishedTo: '2024-01-01' },
        { address: 'Bellmansgatan 4', rentalPropertyId: '123-123-123-0201/04', numberOfApplicants: '4', pubishedFrom: '2024-01-01', publishedTo: '2024-01-01' },
    ];

    return (
        <div>
            <Typography className="pb-8" variant="h1">Intresseanmälningar Parkeringsplats</Typography>
            <DataGridTable columns={columns} rows={rows} getRowId={(row: any) => row.rentalPropertyId}></DataGridTable>
        </div>
    )
}

export default ParkingSpaces;
