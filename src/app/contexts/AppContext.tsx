/* eslint-disable no-underscore-dangle */
import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';

import { message } from 'antd';

import { TGetEligibilityResponse, TPostVotesResponse } from '../api/votes/votes.types';
import { votesSVC } from '../api';
import { TAppContext } from './AppContext.types';

const INITIAL_DATA = {
    // @Nuraj values
    isLoading: true,
    nic: '',
    party: '',
    votes: null,
    eligible: null,
    // @Nurajfunctions
    setEligible: () => undefined,
    setVotes: () => undefined,
    setNic: () => undefined,
    setParty: () => undefined,
};

const appContext = createContext<TAppContext>(INITIAL_DATA);
type TProvideAppContext = { children: JSX.Element };

export const ProvideAppContext = ({ children }: TProvideAppContext): JSX.Element => {
    // @Nuraj API states
    const [isLoading, setIsLoading] = useState<boolean>(INITIAL_DATA.isLoading);
    const [votes, setVotes] = useState<TPostVotesResponse | null>(INITIAL_DATA.votes);
    const [eligible, setEligible] = useState<TGetEligibilityResponse | null>(INITIAL_DATA.eligible);

    // @Nuraj User states
    const [nic, setNic] = useState<string>(INITIAL_DATA.nic);
    const [party, setParty] = useState<string>(INITIAL_DATA.party);

    // @Nuraj  get user eligibility api call
    const getUserEligibility = useCallback(async (userNic: string): Promise<void> => {
        setIsLoading(true);
        try {
            const { data } = await votesSVC().getEligibility({ nic: userNic });
            setEligible(data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            message.error("Couldn't get eligibility details!");
        }
    }, []);

    // @Nuraj post user votes api call
    const getUserVotes = useCallback(async (userNic: string, userParty: string): Promise<void> => {
        setIsLoading(true);
        try {
            const { data } = await votesSVC().postVotes({ nic: userNic, party: userParty });
            setVotes(data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            message.error("Couldn't get vote details!");
        }
    }, []);

    // @Nuraj API triggers
    useEffect(() => {
        if (!nic) {
            getUserEligibility(nic);
        }
    }, [getUserEligibility, nic]);

    useEffect(() => {
        if (!nic && !party) {
            getUserVotes(nic, party);
        }
    }, [getUserVotes, nic, party]);

    // @Nuraj context provider parameters
    const ctx = useMemo<TAppContext>(
        () => ({
            isLoading,
            votes,
            eligible,
            nic,
            party,
            setParty,
            setNic,
            setVotes,
            setEligible,
        }),
        [isLoading, eligible, votes, nic, party, setNic, setParty, setVotes, setEligible],
    );
    return <appContext.Provider value={ctx}>{children}</appContext.Provider>;
};

const useAppContext = (): TAppContext => useContext(appContext);

export default useAppContext;
