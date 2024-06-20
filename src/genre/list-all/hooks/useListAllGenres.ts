import { useEffect } from 'react';
import useApiRequest from '../../../common/api/useApiRequest.ts';
import { GenreResponse } from "../../common/GenreResponse.ts";

export const useGenresApi = () => {
    const {
        data: genres,
        loading,
        errorMessages,
        validationErrors,
        fetchData
    } = useApiRequest<GenreResponse[]>('/genres');

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { genres, loading, errorMessages, validationErrors };
};
