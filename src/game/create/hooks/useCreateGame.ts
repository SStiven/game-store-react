import {CreateGameFormData} from "../CreateGameFormData.ts";
import useApiRequest from "../../../common/api/useApiRequest.ts";

interface CreateGameApiRequest {
    game: {
        name: string;
        key: string;
        description: string;
        price: number;
        unitInStock: number;
        discount: number;
    };
    genres: string[];
    platforms: string[];
    publisher: string;
}

export const useCreateGame = () => {
    const { data, loading, errorMessages, validationErrors, fetchData }
        = useApiRequest<CreateGameApiRequest>('/games', { method: 'POST' });

    const createGame = async (gameData: CreateGameFormData) => {
        const requestBody: CreateGameApiRequest = {
            game: {
                name: gameData.game.name,
                key: gameData.game.key,
                description: gameData.game.description,
                price: gameData.game.price,
                unitInStock: gameData.game.unitInStock,
                discount: gameData.game.discount
            },
            genres: gameData.genres,
            platforms: gameData.platforms,
            publisher: gameData.publisher
        };
        await fetchData({ method: 'POST', data: requestBody });
    };

    return { data, loading, errorMessages, validationErrors, createGame };
};



