import React, { useState } from 'react';
import { CircularProgress, Typography, List, Container, Paper, Box } from '@mui/material';
import GameListItem from './GameListItem.tsx';

import ErrorModal from "../../common/components/ErrorModal.tsx";
import {useGamesApi} from "./hooks/useListAllGamesApi.ts";

const GamesList: React.FC = () => {
    const { games, loading, errorMessages, validationErrors } = useGamesApi();
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
                            {games?.map((game) => (
                                <GameListItem key={game.id} game={game} />
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

export default GamesList;
