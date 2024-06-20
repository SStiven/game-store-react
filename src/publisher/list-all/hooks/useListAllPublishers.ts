import { useEffect } from 'react';
import useApiRequest from '../../../common/api/useApiRequest.ts';
import {PublisherResponse} from "../../common/PublisherResponse.ts";


export const useListAllPublishers = () => {
    const {
        data: publishers,
        loading,
        errorMessages,
        validationErrors,
        fetchData
    } = useApiRequest<PublisherResponse[]>('/publishers');

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { publishers, loading, errorMessages, validationErrors };
};
