import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface ErrorModalProps {
    open: boolean;
    errors: string[];
    onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ open, errors, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Validation Errors</DialogTitle>
            <DialogContent>
                {errors.map((error, index) => (
                    <DialogContentText key={index}>{error}</DialogContentText>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ErrorModal;
