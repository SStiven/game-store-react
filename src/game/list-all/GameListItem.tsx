import React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import {GameResponse} from "../common/GameResponse.ts";

interface GameListItemProps {
    game: GameResponse;
}

const GameListItem: React.FC<GameListItemProps> = ({ game }) => {
    return (
        <ListItem>
            <ListItemText
                primary={game.name}
                secondary={`Price: ${game.price}, Units in stock: ${game.unitInStock}, Discount: ${game.discount}`}
            />
        </ListItem>
    );
};

export default GameListItem;
