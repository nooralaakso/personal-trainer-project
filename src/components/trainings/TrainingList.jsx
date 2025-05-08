import React, { useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { useState } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import { getTrainings } from '../../api/trainingApi';
import dayjs from 'dayjs';
import DeleteTrainingDialog from './DeleteTrainingDialog';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);


export function TrainingList() {
    // State variables for storing training data and dialog states
    const [trainings, setTrainings] = useState([]); // Holds the list of trainings
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // Controls visibility of delete confirmation dialog
    const [trainingToDelete, setTrainingToDelete] = useState(null); // Holds the training to delete
    const columnDefs = [
        { field: 'customerName', headerName: 'Customer Name' }, 
        {
            field: 'date',  //Formatting date to be more readable
            valueFormatter: params => dayjs(params.value).format('DD.MM.YYYY hh:mm'),
            headerName: 'Date'
        },
        { field: 'duration', headerName: 'Duration' },
        { field: 'activity', headerName: 'Activity' },
        {
            headerName: '',
            field: 'actions',
            cellRenderer: (params) => (
                <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteClick(params.data)}
                >
                    Delete
                </Button>
            )
        }
    ];


    // Fetch trainings from the API when the component mounts
    useEffect(() => {
        getTrainings().then(trainingArray => setTrainings(trainingArray));
    }, []);



    // Function to handle delete button click
    const handleDeleteClick = (training) => {
        setTrainingToDelete(training);
        setDeleteDialogOpen(true);
    };

    // Function to handle delete confirmation
    const handleDeleteConfirm = (training) => {
        setTrainings(trainings.filter(c => c !== training));
        setDeleteDialogOpen(false);
        setTrainingToDelete(null);
    };

    // Function to handle delete cancellation
    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setTrainingToDelete(null);
    };

    return (
        <Stack sx={{ display: "flex", flexGrow: 1, flexDirection: "column", gap: 2, padding: 2 }}>
            <Typography variant='h6'>Trainings List ({trainings.length})</Typography>


            <Box sx={{ flexGrow: 1, width: "100%", height: 400 }}>
                <AgGridReact rowData={trainings} columnDefs={columnDefs} defaultColDef={{ filter: true, floatingFilter: true, }} />
            </Box>

            {/* Delete confirmation dialog */}
            {deleteDialogOpen && (
                <DeleteTrainingDialog
                    training={trainingToDelete}
                    ok={handleDeleteConfirm}
                    cancel={handleDeleteCancel}
                />
            )}
        </Stack>
    )

}