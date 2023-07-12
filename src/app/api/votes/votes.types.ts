// eslint-disable-next-line import/no-extraneous-dependencies
import { AxiosResponse } from 'axios';

//  types for checking eligibility
export type TGetEligibilityRequest = { nic_id: string };
export type TGetEligibilityResponse = { message: string };

//  API request type
type TGetEligibility = (payload: TGetEligibilityRequest) => Promise<AxiosResponse<TGetEligibilityResponse>>;

//  types for votes
export type TPostVoteRequest = { nic_id: string; party_id: string, candidate_id: string };
export type TPostVoterInformationRequest = { nic_id: string };
export type TPostCandidateByDistrictRequest = { district: string, party: string };
export type TPostVoteResponse = { message: string };
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

export type TPostCandidateByDistrictResponse = {
    candidates: {
        _id: string;
        name: string;
        party: string;
        district: string;

    }[]
}

//  api request type
type TPostVote = (payload: TPostVoteRequest) => Promise<AxiosResponse<TPostVoteResponse>>;
type TPostVoterInformation = (payload: TPostVoterInformationRequest) => Promise<AxiosResponse<TPostVoterInformationResponse>>;
type TPostCandidateByPartyAndDistrict = (payload: TPostCandidateByDistrictRequest) => Promise<AxiosResponse<TPostCandidateByDistrictResponse>>;

//  api request type
type TGetAuthorize = () => Promise<AxiosResponse<TGetAuthorizeResponse>>;

export type TVotesSVCEndpoints = {
    getEligibility: TGetEligibility;
    postVote: TPostVote;
    getAuthorize: TGetAuthorize;
    postVoterInformation: TPostVoterInformation;
    postCandidateByPartyAndDistrict: TPostCandidateByPartyAndDistrict;
};
