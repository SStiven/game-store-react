import axios from 'axios';
import { useState, useCallback } from 'react';
import axiosInstance from './axiosConfig';

interface ApiErrorResponse {
    type: string;
    title: string;
    status: number;
    errors: Record<string, string[]>;
    traceId: string;
}

interface RequestOptions<T> {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: T;
}

function useApiRequest<T = unknown>(url: string, options?: RequestOptions<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const fetchData = useCallback(async (overrideOptions?: RequestOptions<T>) => {
        setLoading(true);
        setErrorMessages([]);
        setValidationErrors([]);
        const config = {
            method: overrideOptions?.method || options?.method || 'GET',
            url: url,
            data: overrideOptions?.data || options?.data,
        };

        try {
            const response = await axiosInstance(config);
            setData(response.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const parsedErrors = parseErrors(error.response.data);
                setErrorMessages(parsedErrors.errorMessages);
                setValidationErrors(parsedErrors.validationErrors);
            } else {
                setErrorMessages(['An unexpected error occurred.']);
            }
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [url, options]);

    const parseErrors = (errorResponse: ApiErrorResponse): { errorMessages: string[], validationErrors: string[] } => {
        const errorMessages: string[] = [];
        const validationErrors: string[] = [];

        if (errorResponse) {
            if (errorResponse.title) errorMessages.push(errorResponse.title);
            if (errorResponse.errors) {
                Object.values(errorResponse.errors).forEach(errorArray => {
                    validationErrors.push(...errorArray);
                });
            }
        }
        return { errorMessages, validationErrors };
    };

    return { data, loading, errorMessages, validationErrors, fetchData };
}

export default useApiRequest;
