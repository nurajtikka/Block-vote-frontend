import { TGetEligibilityResponse, TPostCandidateByDistrictRequest, TPostCandidateByDistrictResponse, TPostVoteRequest, TPostVoterInformationRequest, TPostVoterInformationResponse, TPostVoteResponse } from '../api/votes/votes.types';

export type TAppContext = {
    //  values
    selectedParty: string;
    isLoading: boolean;
    votes: TPostVoteResponse | null;
    eligible: TGetEligibilityResponse | null;
    nic: string;
    party: string;
    voterInformation: TPostVoterInformationResponse | null;
    candidateByDistrictInfo: TPostCandidateByDistrictResponse | null;
    //  functions
    setNic: (value: string) => void;
    setParty: (value: string) => void;
    setSelectedParty: (value: string) => void;
    setVotes: (value: TPostVoteResponse) => void;
    setEligible: (value: TGetEligibilityResponse) => void;
    setNicId: (value: string) => void;
    setCandidateRequestInfo: (value: TPostCandidateByDistrictRequest) => void;
    setCastVote: (value: TPostVoteRequest) => void;
};
