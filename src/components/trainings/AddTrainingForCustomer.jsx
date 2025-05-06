import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { addTraining } from '../../api/trainingApi';


// This component shows a dialog for adding a training to a specific customer
export default function AddTrainingForCustomer ({customer, onClose, onTrainingAdded}) {
    // State for training form data
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
    });

    // Snackbar state to show success message
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // Updates the training state when user types in a form field
    const handleChange = (e) => {
        setTraining({ ...training, [e.target.name]: e.target.value });
    };

    // Handles the saving of the training
    const handleSave = async () => {
        try {
            await addTraining({
                ...training,
                customer: customer._links.customer.href // Link to the customer
            });
            setSnackbarOpen(true); // Show success message
            onTrainingAdded(); // Notify parent component that a training has been added
        } catch (error) {
            console.error("Error adding training:", error); // Handle error
        }
    };

    return (
        <>
            <Dialog open={true} onClose={onClose}>
                <DialogTitle>Add Training for {customer.firstname} {customer.lastname}</DialogTitle>
                <DialogContent>
                <TextField
                        autoFocus
                        margin="dense"
                        name="date"
                        value={training.date}
                        type="date"
                        onChange={handleChange}
                    ></TextField>
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={handleChange}
                        label="Duration"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={handleChange}
                        label="Activity"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Add</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
                    Training added successfully!
                </Alert>
            </Snackbar>
        </>
    );

}