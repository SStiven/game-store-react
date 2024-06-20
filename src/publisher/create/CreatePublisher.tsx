import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Box, Typography } from '@mui/material';
import useCreatePublisherApi from './hooks/useCreatePublisherApi.ts';
import ErrorModal from "../../common/components/ErrorModal.tsx";
import {CreatePublisherRequest} from "./CreatePublisherRequest.ts";

const CreatePublisher: React.FC = () => {
    const [form, setForm]
        = useState<CreatePublisherRequest>({ companyName: '', homePage: '', description: '' });

    const { createPublisher, loading, errorMessages, validationErrors } = useCreatePublisherApi();
    const [errorModalOpen, setErrorModalOpen] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await createPublisher(form);
        if (validationErrors.length > 0 || errorMessages.length > 0) {
            setErrorModalOpen(true);
        }
    };

    return (
        <Container>
            <Box my={4}>
                <Paper elevation={3}>
                    <Box p={3}>
                        <Typography variant="h5" component="h2">Create Publisher</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Company Name"
                                name="companyName"
                                value={form.companyName}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Home Page"
                                name="homePage"
                                value={form.homePage}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Description"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                multiline
                                rows={4}
                            />
                            <Box mt={2}>
                                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                                    {loading ? 'Creating...' : 'Create'}
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Paper>
            </Box>
            <ErrorModal
                open={errorModalOpen}
                errors={[...errorMessages, ...validationErrors]}
                onClose={() => setErrorModalOpen(false)}
            />
        </Container>
    );
};

export default CreatePublisher;
