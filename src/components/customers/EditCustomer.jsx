import { Dialog, TextField, DialogContent, DialogActions, DialogTitle, Button } from "@mui/material";
import React from "react";

// EditCustomer component to edit customer details
export default function EditCustomer({ customer, saveCustomer, onClose }) {
    // State to manage customer details
    const [customerState, setCustomerState] = React.useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    // Update the form state when the 'customer' prop changes
    React.useEffect(() => {
        if (customer) {
            setCustomerState({
                firstname: customer.firstname || '',
                lastname: customer.lastname || '',
                streetaddress: customer.streetaddress || '',
                postcode: customer.postcode || '',
                city: customer.city || '',
                email: customer.email || '',
                phone: customer.phone || ''
            });
        }

    }, [customer]);

    // Handle changes in input fields
    const handleInputChange = (e) => {
        setCustomerState({
            ...customerState,
            [e.target.name]: e.target.value
        });
    };

    // Close the dialog
    const handleClose = () => {
        if (typeof onClose === 'function') {
            onClose();
        }
    };


    // Handle saving the updated customer data
    const handleSave = () => {
        const updatedCustomer = { ...customer, ...customerState };
        saveCustomer(updatedCustomer);
        handleClose();
    };

    return (

        // Dialog box for editing customer details
        <Dialog open={true} onClose={() => handleClose()}>
            <DialogTitle>Edit customer</DialogTitle>
            <DialogContent>
                {/* Form inputs for each field */}
                <TextField
                    autoFocus
                    margin="dense"
                    name='firstname'
                    value={customerState.firstname}
                    onChange={e => handleInputChange(e)}
                    label="Firstname"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name='lastname'
                    value={customerState.lastname}
                    onChange={e => handleInputChange(e)}
                    label="Lastname"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name='streetaddress'
                    value={customerState.streetaddress}
                    onChange={e => handleInputChange(e)}
                    label="Street Address"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name='postcode'
                    value={customerState.postcode}
                    onChange={e => handleInputChange(e)}
                    label="Postcode"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name='city'
                    value={customerState.city}
                    onChange={e => handleInputChange(e)}
                    label="City"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name='email'
                    value={customerState.email}
                    onChange={e => handleInputChange(e)}
                    label="Email"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name='phone'
                    value={customerState.phone}
                    onChange={e => handleInputChange(e)}
                    label="Phone"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                {/* Cancel and Save buttons */}
                <Button onClick={() => handleClose()} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => handleSave()} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );

}