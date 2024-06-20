import useApiRequest from '../../../common/api/useApiRequest.ts';
import {CreatePublisherRequest} from "../CreatePublisherRequest.ts";

interface CreatePublisherApiRequest {
    publisher: CreatePublisherRequest;
}

const useCreatePublisherApi = () => {
    const { data, loading, errorMessages, validationErrors, fetchData }
        = useApiRequest<CreatePublisherApiRequest>('/publishers', { method: 'POST' });

    const createPublisher = async (publisherData: CreatePublisherRequest) => {
        const requestBody: CreatePublisherApiRequest = {
            publisher: {
                ...publisherData,
                homePage: publisherData.homePage === '' ? null : publisherData.homePage,
                description: publisherData.description === '' ? null : publisherData.description
            }
        };
        await fetchData({ data: requestBody });
    };

    return { data, loading, errorMessages, validationErrors, createPublisher };
};

export default useCreatePublisherApi;
