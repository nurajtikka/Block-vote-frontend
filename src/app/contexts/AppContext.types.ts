import { TGetEligibilityResponse, TPostVotesResponse } from '../api/votes/votes.types';

export type TAppContext = {
    // @Nuraj values
    isLoading: boolean;
    votes: TPostVotesResponse | null;
    eligible: TGetEligibilityResponse | null;
    nic: string;
    party: string;
    // @Nuraj functions
    setNic: (value: string) => void;
    setParty: (value: string) => void;
    setVotes: (value: TPostVotesResponse) => void;
    setEligible: (value: TGetEligibilityResponse) => void;
};
