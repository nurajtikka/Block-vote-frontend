/* eslint-disable no-underscore-dangle */
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";

import { message } from "antd";
import { useRouter } from "next/navigation";

import {
  TGetEligibilityResponse,
  TPostVoterInformationResponse,
  TPostVotesResponse,
} from "../api/votes/votes.types";
import { votesSVC } from "../api";
import { TAppContext } from "./AppContext.types";

const INITIAL_DATA = {
  //  values
  isLoading: true,
  nic: "",
  selectedParty: "",
  party: "",
  votes: null,
  eligible: null,
  isAuthorized: false,
  voterInformation: null,
  // functions
  setEligible: () => undefined,
  setVotes: () => undefined,
  setNic: () => undefined,
  setParty: () => undefined,
  setIsAuthorized: () => undefined,
  setSelectedParty: () => undefined,
  setNicId: () => undefined,
  setVoterInformation: () => undefined,
};

const appContext = createContext<TAppContext>(INITIAL_DATA);
type TProvideAppContext = { children: JSX.Element };

export const ProvideAppContext = ({
  children,
}: TProvideAppContext): JSX.Element => {
  const router = useRouter();
  const language = sessionStorage.getItem("block-vote-language");
  //  API states
  const [isLoading, setIsLoading] = useState<boolean>(INITIAL_DATA.isLoading);
  const [votes, setVotes] = useState<TPostVotesResponse | null>(
    INITIAL_DATA.votes
  );
  const [eligible, setEligible] = useState<TGetEligibilityResponse | null>(
    INITIAL_DATA.eligible
  );

  //  User states
  const [nic, setNic] = useState<string>(INITIAL_DATA.nic);
  const [selectedParty, setSelectedParty] = useState<string>(
    INITIAL_DATA.selectedParty
  );
  const [party, setParty] = useState<string>(INITIAL_DATA.party);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(
    INITIAL_DATA.isAuthorized
  );
  const [eligibleError, setEligibleError] = useState<boolean>(true);
  const [nicId, setNicId] = useState<string>("");
  const [voterInformation, setVoterInformation] =
    useState<TPostVoterInformationResponse | null>(null);

  //   get user eligibility api call
  const getUserEligibility = useCallback(
    async (userNic: string): Promise<void> => {
      setIsLoading(true);
      try {
        const { data } = await votesSVC().getEligibility({ nic_id: userNic });

        console.log(data);
        if (data.message === "Already voted") {
          if (language === "en") message.error("You have already voted!");
          if (language === "ta")
            message.error("நீங்கள் ஏற்கனவே வாக்களித்து விட்டீர்கள்!");
          if (language === "si") message.error("ඔබ දැනටමත් ඡන්දය දී ඇත!");
          setEligibleError(true);
        } else if (data.message === "Not eligible to vote") {
          setEligibleError(true);
          if (language === "en") message.error("You are not eligible to vote!");
          if (language === "ta")
            message.error("நீங்கள் வாக்களிக்க தகுதியற்றவர்!");
          if (language === "si")
            message.error("ඔබ ඡන්දය දීමට සුදුසුකම් නොලබයි!");
        } else {
          setEligible(data);

          setEligibleError(false);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (language === "en")
          message.error("Couldn't get eligibility details!");
        if (language === "ta")
          message.error("தகுதி விவரங்களைப் பெற முடியவில்லை!");
        if (language === "si")
          message.error("සුදුසුකම් විස්තර ලබා ගැනීමට නොහැකි විය!");
      }

      router.push("/pages/select");
    },
    []
  );

  //  post user votes api call
  const getUserVotes = useCallback(
    async (userNic: string, userParty: string): Promise<void> => {
      setIsLoading(true);
      try {
        const { data } = await votesSVC().postVotes({
          nic: userNic,
          party: userParty,
        });
        setVotes(data);
        router.push("/pages/thankyou");
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (language === "en") message.error("Couldn't get vote details!");
        if (language === "ta")
          message.error("வாக்கு விவரங்களைப் பெற முடியவில்லை!");
        if (language === "si")
          message.error("ඡන්ද විස්තර ලබා ගැනීමට නොහැකි විය!");
      }
    },
    []
  );

  //   get user eligibility api call
  const getAuthorized = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { data } = await votesSVC().getAuthorize();
      if (data.message === "Authorized") {
        setIsAuthorized(true);
        router.push("/pages/select");
      } else {
        if (language === "en") message.error("You're not authorized to vote!");
        if (language === "ta")
          message.error("வாக்களிக்க உங்களுக்கு அங்கீகாரம் இல்லை!");
        if (language === "si") message.error("ඔබට ඡන්දය දීමට අවසර නැත!");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (language === "en") message.error("You're not authorized to vote!");
      if (language === "ta")
        message.error("வாக்களிக்க உங்களுக்கு அங்கீகாரம் இல்லை!");
      if (language === "si") message.error("ඔබට ඡන්දය දීමට අවසර නැත!");
    }
  }, []);

  // post request to get uesr information
  const postVoterInformation = useCallback(
    async (nic: string): Promise<void> => {
      setIsLoading(true);
      try {
        const { data } = await votesSVC().postVoterInformation({ nic_id: nic });
        setVoterInformation(data);
        console.log(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (language === "en") message.error("Couldn't get user information!");
        if (language === "ta") message.error("பயனர் தகவலைப் பெற முடியவில்லை!");
        if (language === "si")
          message.error("පරිශීලක තොරතුරු ලබා ගැනීමට නොහැකි විය!");
      }
    },
    []
  );

  //  API triggers for fingerpri
  useEffect(() => {
    setIsLoading(true);
    if (nic) {
      getUserEligibility(nic);
    }

    if (nicId) {
      postVoterInformation(nic);
    } else {
      if (language === "en") message.error("Your NIC number is not detected.");
      if (language === "ta") message.error("உங்கள் NIC எண் கண்டறியப்படவில்லை.");
      if (language === "si") message.error("ඔබගේ ජාතික හැඳුනුම්පත් අංකය අනාවරණය කර නොමැත.");
    }

    if (nic && !eligibleError) {
      if (language === "en")
        message.info("Scan your fingerprint to authorize and to continue.");
      if (language === "ta")
        message.info(
          "அங்கீகரிக்க மற்றும் தொடர உங்கள் கைரேகையை ஸ்கேன் செய்யவும்."
        );
      if (language === "si")
        message.info(
          "අවසර දීමට සහ ඉදිරියට යාමට ඔබගේ ඇඟිලි සලකුණ පරිලෝකනය කරන්න."
        );
      getAuthorized();
    }
    setIsLoading(false);
  }, [eligibleError, getAuthorized, getUserEligibility, nicId, nic]);

  useEffect(() => {
    setIsLoading(true);
    if (nic && party) {
      getUserVotes(nic, party);
    }
    setIsLoading(false);
  }, [getUserVotes, nic, party]);

  //  context provider parameters
  const ctx = useMemo<TAppContext>(
    () => ({
      selectedParty,
      isLoading,
      isAuthorized,
      votes,
      eligible,
      nic,
      party,
      voterInformation,
      setParty,
      setNic,
      setVotes,
      setEligible,
      setSelectedParty,
      setNicId,
      setVoterInformation,
    }),
    [
      selectedParty,
      isLoading,
      isAuthorized,
      eligible,
      votes,
      nic,
      party,
      voterInformation,
      setNic,
      setParty,
      setVotes,
      setEligible,
      setSelectedParty,
      setNicId,
      setVoterInformation,
    ]
  );
  return <appContext.Provider value={ctx}>{children}</appContext.Provider>;
};

const useAppContext = (): TAppContext => useContext(appContext);

export default useAppContext;
