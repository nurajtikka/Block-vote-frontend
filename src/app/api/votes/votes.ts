// eslint-disable-next-line import/no-extraneous-dependencies
import { AxiosInstance } from 'axios';

import {
    TGetAuthorizeResponse,
    TGetEligibilityRequest,
    TGetEligibilityResponse,
    TPostCandidateByDistrictRequest,
    TPostCandidateByDistrictResponse,
    TPostVoterInformationRequest,
    TPostVoterInformationResponse,
    TPostVoteRequest,
    TPostVoteResponse,
    TVotesSVCEndpoints,
} from './votes.types';

//  API base URL - Change this correctly
// const BASE_URL = 'http://192.168.8.187:3001/_svc/block-vote/api/v1';
const BASE_URL = 'http://localhost:3001/_svc/block-vote/api/v1';

//  API endpoints
const Votes = (api: AxiosInstance): TVotesSVCEndpoints => {
    const getEligibility = (payload: TGetEligibilityRequest) =>
        api.post<TGetEligibilityResponse>(`${BASE_URL}/voters/eligibility/verification`, payload);

    const postVote = (payload: TPostVoteRequest) => api.post<TPostVoteResponse>(`${BASE_URL}/votes/vote`, payload);

    const getAuthorize = () => api.get<TGetAuthorizeResponse>(`${BASE_URL}/fingerprint/scan`);

    const postVoterInformation = (payload: TPostVoterInformationRequest) => api.post<TPostVoterInformationResponse>(`${BASE_URL}/voters/details`, payload);

    const postCandidateByPartyAndDistrict = (payload: TPostCandidateByDistrictRequest) => api.post<TPostCandidateByDistrictResponse>(`${BASE_URL}/candidates/filter-by/party/district`, payload);

    return {
        getEligibility,
        postVote,
        getAuthorize,
        postVoterInformation,
        postCandidateByPartyAndDistrict,
    };
};

export default Votes;
