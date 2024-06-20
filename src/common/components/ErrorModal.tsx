// src/components/ErrorModal.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { FiberManualRecord } from '@mui/icons-material';

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
                <List>
                    {errors.map((error, index) => (
                        <ListItem key={index}>
                            <ListItemIcon>
                                <FiberManualRecord fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={error} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ErrorModal;
