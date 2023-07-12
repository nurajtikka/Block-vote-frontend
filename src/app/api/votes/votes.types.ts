// eslint-disable-next-line import/no-extraneous-dependencies
import { AxiosResponse } from 'axios';

//  types for checking eligibility
export type TGetEligibilityRequest = { nic_id: string };
export type TGetEligibilityResponse = { message: string };

//  API request type
type TGetEligibility = (payload: TGetEligibilityRequest) => Promise<AxiosResponse<TGetEligibilityResponse>>;

//  types for votes
export type TPostVotesRequest = { nic: string; party: string };
export type TPostVoterInformationRequest = { nic_id: string };
export type TPostVotesResponse = { message: string };
export type TGetAuthorizeResponse = { message: string };
export type TPostVoterInformationResponse = {
    voters: {
        _id: string;
        name: string;
        age: number;
        gender: string;
        district: string;
        voted: boolean;
    }[]
};

//  api request type
type TPostVotes = (payload: TPostVotesRequest) => Promise<AxiosResponse<TPostVotesResponse>>;
type TPostVoterInformation = (payload: TPostVoterInformationRequest) => Promise<AxiosResponse<TPostVoterInformationResponse>>;

//  api request type
type TGetAuthorize = () => Promise<AxiosResponse<TGetAuthorizeResponse>>;

export type TVotesSVCEndpoints = {
    getEligibility: TGetEligibility;
    postVotes: TPostVotes;
    getAuthorize: TGetAuthorize;
    postVoterInformation: TPostVoterInformation;
};
