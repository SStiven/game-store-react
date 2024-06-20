import { useEffect } from 'react';
import useApiRequest from '../../../common/api/useApiRequest.ts';
import {PlatformResponse} from "../../common/PlatformResponse.ts";


export const usePlatformsApi = () => {
    const {
        data: platforms,
        loading,
        errorMessages,
        validationErrors,
        fetchData
    } = useApiRequest<PlatformResponse[]>('/platforms');

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { platforms, loading, errorMessages, validationErrors };
};