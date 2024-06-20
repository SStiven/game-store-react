// src/hooks/useGamesApi.ts
import { useEffect } from 'react';
import useApiRequest from '../../../common/api/useApiRequest.ts';
import {GameResponse} from "../../common/GameResponse.ts";


export const useGamesApi = () => {
    const {
        data: games,
        loading,
        errorMessages,
        validationErrors,
        fetchData
    } = useApiRequest<GameResponse[]>('/gamesType');

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { games, loading, errorMessages, validationErrors };
};
