import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

// Component for confirming customer deletion
export default function DeleteDialog({ customer, ok, cancel }) {

    return (
        // Dialog component for confirming deletion
        <Dialog
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">

            {/* Dialog title */}
            <DialogTitle id="alert-dialog-title">
                Delete customer?
            </DialogTitle>

            {/* Dialog content with description */}
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {/* Show customer’s first and last name */}
                    Are you sure you want to delete customer {customer.firstname} {customer.lastname}?
                </DialogContentText>
            </DialogContent>

            {/* Dialog actions (Cancel and Delete buttons) */}
            <DialogActions>
                {/* Cancel button - triggers the cancel function passed in as a prop */}
                <Button
                    onClick={() => cancel()}
                    variant="outlined">
                    Cancel
                </Button>

                {/* Delete button - triggers the ok function passed in as a prop, passing the customer */}
                <Button
                    onClick={() => ok(customer)}
                    autoFocus
                    color="error"
                    variant="outlined"
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}