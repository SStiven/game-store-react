import { Typography, Container } from '@mui/material';

const Home = () => {
    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                Welcome to the Publishers App
            </Typography>
            <Typography variant="body1">
                This is the home page.
            </Typography>
        </Container>
    );
};

export default Home;