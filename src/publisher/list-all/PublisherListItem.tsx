import React from 'react';
import { ListItem, ListItemText, ListItemAvatar, Avatar, Link as MuiLink } from '@mui/material';
import {PublisherResponse} from "../common/PublisherResponse.ts";

interface PublisherListItemProps {
    publisher: PublisherResponse;
}

const PublisherListItem: React.FC<PublisherListItemProps> = ({ publisher }) => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>{publisher.companyName.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    publisher.homePage ? (
                        <MuiLink href={publisher.homePage} target="_blank" rel="noopener noreferrer">
                            {publisher.companyName}
                        </MuiLink>
                    ) : (
                        publisher.companyName
                    )
                }
                secondary={publisher.description || 'No description available'}
            />
        </ListItem>
    );
};

export default PublisherListItem;
