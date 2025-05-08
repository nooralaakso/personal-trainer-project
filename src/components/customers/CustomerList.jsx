import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { useState, useEffect } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import { getCustomers, addCustomer, updateCustomer, deleteCustomer } from '../../api/customerApi';
import AddCustomer from './AddCustomer';
import DeleteCustomerDialog from './DeleteCustomerDialog';
import EditCustomer from './EditCustomer';
import AddTrainingForCustomer from '../trainings/AddTrainingForCustomer';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

// Main component to display and manage the customer list
export function CustomerList() {
    // State to store customer data
    const [customers, setCustomers] = useState([]);
    // State for delete confirmation dialog
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    // State for editing and adding training
    const [editCustomer, setEditCustomer] = useState(null);
    const [trainingCustomer, setTrainingCustomer] = useState(null);
    // Column definitions for AG Grid
    const columnDefs = [
        { field: 'firstname' },
        { field: 'lastname' },
        { field: 'streetaddress' },
        { field: 'postcode' },
        { field: 'city' },
        { field: 'email' },
        { field: 'phone' },
        {
            headerName: '',
            field: 'actions',
            cellRenderer: (params) => (
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteClick(params.data)}
                    >
                        Delete
                    </Button>

                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => setEditCustomer(params.data)}
                    >
                        Edit
                    </Button>
                </Stack>
            )
        },
        {
            headerName: 'Add Training',
            field: 'addTraining',
            cellRenderer: (params) => (
                <Button
                    variant="outlined"
                    color="success"
                    size="small"
                    onClick={() => setTrainingCustomer(params.data)}
                >
                    Add Training
                </Button>
            )
        }
    ];

    // Fetch customers from API when component mounts
    useEffect(() => {
        getCustomers().then(customerArray => setCustomers(customerArray));
    }, []);

    // Function to add a new customer
    async function addNewCustomer(customer) {
        try {
            await addCustomer(customer);
            setCustomers(await getCustomers());
        } catch (error) {
            console.error("Error adding customer:", error);
        }
    }

    // Function to handle delete button click
    // This function is called when the user clicks the delete button for a customer
    const handleDeleteClick = (customer) => {
        setCustomerToDelete(customer);
        setDeleteDialogOpen(true);
    }

    // Function to handle delete confirmation
    // This function is called when the user confirms the deletion of a customer
    const handleDeleteConfirm = async (customer) => {
        try {
            await deleteCustomer(customer); 
            setCustomers(await getCustomers()); 
        } catch (error) {
            console.error("Error deleting customer:", error);
        } finally {
            setDeleteDialogOpen(false);
            setCustomerToDelete(null);
        }
    };
    

    // Function to handle delete cancellation
    // This function is called when the user cancels the deletion of a customer
    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setCustomerToDelete(null);
    };

    // Function to save edited customer data
    // This function is called when the user saves the edited customer data
    async function saveCustomer(customer) {
        try {
            await updateCustomer(customer);
            setEditCustomer(null);
            setCustomers(await getCustomers());
        } catch (error) {
            console.error("Error updating customer:", error);
        }
    }

    // Function to export customer data to CSV
    // This function is called when the user clicks the "Export CSV" button
    function exportToCsv(){
        const csvData = customers.map(({firstname, lastname, streetaddress, postcode, city, email, phone}) => ({
            firstname,
            lastname,
            streetaddress,
            postcode,
            city,
            email,
            phone
        }));
    
        if (csvData.length === 0) return;
    
        const csvRows = [];
        const headers = Object.keys(csvData[0]);
        csvRows.push(headers.join(','));
    
        for (const row of csvData) {
            const values = headers.map(header => `"${(row[header] ?? '').toString().replace(/"/g, '""')}"`);
            csvRows.push(values.join(','));
        }
    
        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
    
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'customers.csv');
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    
    

    return (
        <>
            <Stack sx={{ display: "flex", flexGrow: 1, flexDirection: "column", gap: 2, padding: 2 }}>
                <Typography variant='h6'>Customer List ({customers.length})</Typography>

                <AddCustomer addCustomer={addNewCustomer} />

                <Box sx={{ flexGrow: 1, width: "100%", height: 400 }}>
                    <AgGridReact rowData={customers} columnDefs={columnDefs} defaultColDef={{ filter: true, floatingFilter: true, }} />

                </Box>
                {/* Delete confirmation dialog */}
                {deleteDialogOpen && (
                    <DeleteCustomerDialog
                        customer={customerToDelete}
                        ok={handleDeleteConfirm}
                        cancel={handleDeleteCancel}
                    />

                )}

                {/* Edit customer dialog */}
                {editCustomer && (
                    <EditCustomer
                        customer={editCustomer}
                        saveCustomer={saveCustomer}
                        open={!!editCustomer}
                        onClose={() => setEditCustomer(null)}
                    />
                )}

                {/* Add training dialog */}
                {trainingCustomer && (
                    <AddTrainingForCustomer
                        customer={trainingCustomer}
                        onClose={() => setTrainingCustomer(null)}
                        onTrainingAdded={() => setTrainingCustomer(null)}
                    />
                )}

            </Stack>

            <Button variant="outlined" onClick={exportToCsv}>Export CSV</Button>
        </>
    );

}