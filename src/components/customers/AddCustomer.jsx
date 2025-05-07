import { DialogActions, DialogContent, DialogTitle, TextField, Button, Dialog, Snackbar, Alert } from '@mui/material';
import React from 'react';
import { useState } from 'react';

export default function AddCustomer(props){
    const [open, setOpen] = useState(false); // State to control the dialog visibility
    const [customer, setCustomer] = useState({ // State to store the customer form data
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control snackbar visibility

    const handleClickOpen = () => {
        setOpen(true); // Opens the dialog to add a new customer
    };

    const handleClose = () => {
        setOpen(false); // Closes the dialog
    };

    const handleInputChange = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value // Updates the customer state with the input value
        });
    }

    const addCustomer = () => {
        props.addCustomer(customer); // Calls the parent component's function to add the customer
        setSnackbarOpen(true); // Opens the snackbar to show success message
        handleClose(); // Closes the dialog after customer is added
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false); // Closes the snackbar
    };

    return (
        <div>
            <Button 
            variant='outlined' 
            onClick={handleClickOpen}
            >                           {/* Button to open the dialog */}
                Add Customer
            </Button>
            <Dialog open={open} onClose={handleClose}> {/* Dialog to add a new customer */}
                <DialogTitle>New customer</DialogTitle>
                <DialogContent>
                    {/* Form fields for customer data */}
                    <TextField
                    autoFocus
                    margin="dense"
                    name='firstname'
                    value={customer.firstname}
                    onChange={e => handleInputChange(e)}
                    label="Firstname"
                    fullWidth
                    />
                    <TextField
                    autoFocus
                    margin="dense"
                    name='lastname'
                    value={customer.lastname}
                    onChange={e => handleInputChange(e)}
                    label="Lastname"
                    fullWidth
                    />
                    <TextField
                    autoFocus
                    margin="dense"
                    name='streetaddress'
                    value={customer.streetaddress}
                    onChange={e => handleInputChange(e)}
                    label="Streetaddress"
                    fullWidth
                    />
                    <TextField
                    autoFocus
                    margin="dense"
                    name='postcode'
                    value={customer.postcode}
                    onChange={e => handleInputChange(e)}
                    label="Postcode"
                    fullWidth
                    />
                    <TextField
                    autoFocus
                    margin="dense"
                    name='city'
                    value={customer.city}
                    onChange={e => handleInputChange(e)}
                    label="City"
                    fullWidth
                    />
                    <TextField
                    autoFocus
                    margin="dense"
                    name='email'
                    value={customer.email}
                    onChange={e => handleInputChange(e)}
                    label="Email"
                    fullWidth
                    />
                    <TextField
                    autoFocus
                    margin="dense"
                    name='phone'
                    value={customer.phone}
                    onChange={e => handleInputChange(e)}
                    label="Phone"
                    fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button> {/* Cancel button to close dialog */}
                    <Button onClick={addCustomer}>Add</Button> {/* Add button to submit the form */}

                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Customer added successfully!
                </Alert>
                </Snackbar>
        </div>
    );
}