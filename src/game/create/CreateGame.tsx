// src/components/CreateGameForm.tsx
import React, { useState } from 'react';
import {
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    CircularProgress,
    Box,
    Typography,
    Container,
    Paper,
} from '@mui/material';
import { CreateGameFormData } from './CreateGameFormData.ts';
import { useGenresApi } from '../../genre/list-all/hooks/useListAllGenres.ts';
import { usePlatformsApi } from '../../platform/list-all/hooks/useListAllPlatformsApi.ts';
import { useCreateGame } from './hooks/useCreateGame.ts';
import { useListAllPublishers } from '../../publisher/list-all/hooks/useListAllPublishers.ts';
import ErrorModal from '../../common/components/ErrorModal.tsx';

const CreateGame: React.FC = () => {
    const { genres, loading: genresLoading } = useGenresApi();
    const { platforms, loading: platformsLoading } = usePlatformsApi();
    const { publishers, loading: publishersLoading } = useListAllPublishers();
    const { createGame, loading: createLoading, errorMessages, validationErrors, data: success } = useCreateGame();

    const [game, setGame] = useState<CreateGameFormData['game']>({
        name: '',
        key: '',
        description: '',
        price: 0,
        unitInStock: 0,
        discount: 0,
    });

    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [selectedPublisher, setSelectedPublisher] = useState<string>('');

    const [errorModalOpen, setErrorModalOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setGame({ ...game, [name as string]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const gameData: CreateGameFormData = {
            game,
            genres: selectedGenres,
            platforms: selectedPlatforms,
            publisher: selectedPublisher,
        };
        await createGame(gameData);
        if (validationErrors.length > 0 || errorMessages.length > 0) {
            setErrorModalOpen(true);
        }
    };

    if (genresLoading || platformsLoading || publishersLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container>
            <Box my={4}>
                <Paper elevation={3}>
                    <Box p={3}>
                        <Typography variant="h5" component="h2">Create New Game</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Name"
                                name="name"
                                value={game.name}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Key"
                                name="key"
                                value={game.key}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Description"
                                name="description"
                                value={game.description}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Price"
                                name="price"
                                type="number"
                                value={game.price}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Unit In Stock"
                                name="unitInStock"
                                type="number"
                                value={game.unitInStock}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Discount"
                                name="discount"
                                type="number"
                                value={game.discount}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Genres</InputLabel>
                                <Select
                                    multiple
                                    value={selectedGenres}
                                    onChange={(e) => setSelectedGenres(e.target.value as string[])}
                                >
                                    {genres?.map((genre) => (
                                        <MenuItem key={genre.id} value={genre.id}>
                                            {genre.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Platforms</InputLabel>
                                <Select
                                    multiple
                                    value={selectedPlatforms}
                                    onChange={(e) => setSelectedPlatforms(e.target.value as string[])}
                                >
                                    {platforms?.map((platform) => (
                                        <MenuItem key={platform.id} value={platform.id}>
                                            {platform.type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Publisher</InputLabel>
                                <Select
                                    value={selectedPublisher}
                                    onChange={(e) => setSelectedPublisher(e.target.value as string)}
                                >
                                    {publishers?.map((publisher) => (
                                        <MenuItem key={publisher.id} value={publisher.id}>
                                            {publisher.companyName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Box mt={2}>
                                <Button type="submit" variant="contained" color="primary" disabled={createLoading}>
                                    {createLoading ? <CircularProgress size={24} /> : 'Create Game'}
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Paper>
                {success && <Typography color="primary">Game created successfully!</Typography>}
            </Box>
            <ErrorModal
                open={errorModalOpen}
                errors={[...errorMessages, ...validationErrors]}
                onClose={() => setErrorModalOpen(false)}
            />
        </Container>
    );
};

export default CreateGame;
