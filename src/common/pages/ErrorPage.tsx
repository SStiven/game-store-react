import { useRouteError } from "react-router-dom";
import { Container, Typography, Box } from '@mui/material';

interface RouteError {
    statusText?: string;
    message?: string;
}

export default function ErrorPage() {
    const error = useRouteError() as RouteError;
    console.error(error);

    return (
        <Container maxWidth="sm">
            <Box mt={5} textAlign="center">
                <Typography variant="h1" component="h1" gutterBottom>
                    Oops!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Sorry, an unexpected error has occurred.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <i>{error.statusText || error.message}</i>
                </Typography>
            </Box>
        </Container>
    );
}
