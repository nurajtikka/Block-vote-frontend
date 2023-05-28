// eslint-disable-next-line import/no-extraneous-dependencies
import { AxiosResponse } from 'axios';

// @Nuraj types for checking eligibility
export type TGetEligibilityRequest = { nic: string };
export type TGetEligibilityResponse = { message: string };

// @Nuraj API request type
type TGetEligibility = (payload: TGetEligibilityRequest) => Promise<AxiosResponse<TGetEligibilityResponse>>;

// @Nuraj types for votes
export type TPostVotesRequest = { nic: string; party: string };
export type TPostVotesResponse = { message: string };
export type TPostAuthorizeResponse = { message: string };

// @Nuraj api request type
type TPostVotes = (payload: TPostVotesRequest) => Promise<AxiosResponse<TPostVotesResponse>>;

// @Nuraj api request type
type TPostAuthorize = () => Promise<AxiosResponse<TPostAuthorizeResponse>>;

export type TVotesSVCEndpoints = {
    getEligibility: TGetEligibility;
    postVotes: TPostVotes;
    postAuthorize: TPostAuthorize;
};
