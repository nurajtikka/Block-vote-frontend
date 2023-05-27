// eslint-disable-next-line import/no-extraneous-dependencies
import { AxiosInstance } from 'axios';

import {
    TGetEligibilityRequest,
    TGetEligibilityResponse,
    TPostVotesRequest,
    TPostVotesResponse,
    TVotesSVCEndpoints,
} from './votes.types';

// @Nuraj API base URL - Change this correctly
const BASE_URL = 'http://localhost:3001';

// @Nuraj API endpoints
const Votes = (api: AxiosInstance): TVotesSVCEndpoints => {
    const getEligibility = (payload: TGetEligibilityRequest) =>
        api.post<TGetEligibilityResponse>(`${BASE_URL}/checkEligibility`, payload);

    const postVotes = (payload: TPostVotesRequest) => api.post<TPostVotesResponse>(`${BASE_URL}//vote`, payload);

    return {
        getEligibility,
        postVotes,
    };
};

export default Votes;
