import React, { useState } from 'react';
import { CircularProgress, Typography, List, Container, Paper, Box } from '@mui/material';
import PublisherListItem from './PublisherListItem.tsx';
import { usePublishersApi } from './hooks/usePublishersApi.ts';
import ErrorModal from "../../common/components/ErrorModal.tsx";

const PublishersList: React.FC = () => {
    const { publishers, loading, errorMessages, validationErrors } = usePublishersApi();
    const [errorModalOpen, setErrorModalOpen] = useState(false);

    React.useEffect(() => {
        if (validationErrors.length > 0) {
            setErrorModalOpen(true);
        }
    }, [validationErrors]);

    return (
        <Container>
            <Box my={4}>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                        <CircularProgress />
                    </Box>
                ) : errorMessages.length > 0 ? (
                    <Typography color="error">{errorMessages.join(', ')}</Typography>
                ) : (
                    <Paper elevation={3}>
                        <List>
                            {publishers?.map((publisher) => (
                                <PublisherListItem key={publisher.id} publisher={publisher} />
                            ))}
                        </List>
                    </Paper>
                )}
            </Box>
            <ErrorModal
                open={errorModalOpen}
                errors={validationErrors}
                onClose={() => setErrorModalOpen(false)}
            />
        </Container>
    );
};

export default PublishersList;
