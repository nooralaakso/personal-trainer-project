import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
 
export default function DeleteTrainingDialog({training, ok, cancel}) {
    
    return (
    <Dialog
        open={true} // Dialog is always open when this component is rendered
        aria-labelledby="alert-dialog-title" // Accessibility label for dialog title
        aria-describedby="alert-dialog-description"> {/* Accessibility label for dialog description */ } 
        <DialogTitle id="alert-dialog-title"> 
            Delete training? {/* Title of the dialog */}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {/* Text asking for confirmation to delete the specific training */}
                Are you sure you want to delete training {training.activity} {training.duration}?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            {/* Button to cancel the delete action */}
            <Button
                onClick={() => cancel()}
                variant="outlined">
                Cancel
            </Button>
            {/* Button to confirm the delete action */}
            <Button
                onClick={() => ok(training)}
                autoFocus
                color="error"
                variant="outlined"
            >
                Delete
            </Button>
        </DialogActions>
    </Dialog>
    );}