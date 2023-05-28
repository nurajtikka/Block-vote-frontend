// eslint-disable-next-line import/no-extraneous-dependencies
import { AxiosInstance } from 'axios';

import {
    TPostAuthorizeResponse,
    TGetEligibilityRequest,
    TGetEligibilityResponse,
    TPostVotesRequest,
    TPostVotesResponse,
    TVotesSVCEndpoints,
} from './votes.types';

// @Nuraj API base URL - Change this correctly
const BASE_URL = 'http://192.168.1.10:3001/api/v1';

// @Nuraj API endpoints
const Votes = (api: AxiosInstance): TVotesSVCEndpoints => {
    const getEligibility = (payload: TGetEligibilityRequest) =>
        api.post<TGetEligibilityResponse>(`${BASE_URL}/voters/checkEligibility`, payload);

    const postVotes = (payload: TPostVotesRequest) => api.post<TPostVotesResponse>(`${BASE_URL}/votes/vote`, payload);

    const postAuthorize = () => api.get<TPostAuthorizeResponse>(`${BASE_URL}/fingerprint/scan`);

    return {
        getEligibility,
        postVotes,
        postAuthorize,
    };
};

export default Votes;
