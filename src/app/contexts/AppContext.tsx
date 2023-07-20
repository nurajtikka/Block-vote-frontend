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
  TPostCandidateByDistrictRequest,
  TPostCandidateByDistrictResponse,
  TPostVoterInformationResponse,
  TPostVoteRequest,
  TPostVoteResponse,
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
  candidateByDistrictInfo: null,
  // functions
  setEligible: () => undefined,
  setVotes: () => undefined,
  setNic: () => undefined,
  setParty: () => undefined,
  setIsAuthorized: () => undefined,
  setSelectedParty: () => undefined,
  setNicId: () => undefined,
  setVoterInformation: () => undefined,
  setCandidateRequestInfo: () => undefined,
  setCastVote: () => undefined,
};

const appContext = createContext<TAppContext>(INITIAL_DATA);
type TProvideAppContext = { children: JSX.Element };

export const ProvideAppContext = ({
  children,
}: TProvideAppContext): JSX.Element => {
  const router = useRouter();
  const language =
    typeof window !== "undefined"
      ? sessionStorage.getItem("block-vote-language")
      : "en";

  //  API states
  const [isLoading, setIsLoading] = useState<boolean>(INITIAL_DATA.isLoading);
  const [votes, setVotes] = useState<TPostVoteResponse | null>(
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
    useState<TPostVoterInformationResponse | null>(
      INITIAL_DATA.voterInformation
    );
  const [candidateRequestInfo, setCandidateRequestInfo] =
    useState<TPostCandidateByDistrictRequest | null>(null);
  const [candidateByDistrictInfo, setCandidateByDistrictInfo] =
    useState<TPostCandidateByDistrictResponse | null>(
      INITIAL_DATA.candidateByDistrictInfo
    );

  const [castVote, setCastVote] = useState<TPostVoteRequest | null>(null);

  //   get user eligibility api call
  const getUserEligibility = useCallback(
    async (userNic: string): Promise<void> => {
      setIsLoading(true);
      try {
        const { data } = await votesSVC().getEligibility({ nic_id: userNic });

        // console.log(data);
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
          postVoterInformation(nic);
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

    //   router.push("/pages/select");
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

  // post request to get voters information
  const postVoterInformation = useCallback(
    async (nic: string): Promise<void> => {
      setIsLoading(true);
      try {
        const { data } = await votesSVC().postVoterInformation({ nic_id: nic });
        setVoterInformation(data);
        // console.log(data);
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

  const postCandidateByDistrict = useCallback(
    async (district: string, party: string): Promise<void> => {
      setIsLoading(true);
      try {
        const { data } = await votesSVC().postCandidateByPartyAndDistrict({
          district: district,
          party: party,
        });
        setCandidateByDistrictInfo(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (language === "en")
          message.error("Couldn't get candidate information!");
        if (language === "ta")
          message.error("வேட்பாளர் தகவலைப் பெற முடியவில்லை!");
        if (language === "si")
          message.error("අපේක්ෂක තොරතුරු ලබා ගැනීමට නොහැකි විය!");
      }
    },
    []
  );

  const postVote = useCallback(
    async (
      nic_id: string,
      party_id: string,
      candidate_id: string
    ): Promise<void> => {
      setIsLoading(true);
      try {
        const { data } = await votesSVC().postVote({
          nic_id: nic_id,
          party_id: party_id,
          candidate_id: candidate_id,
        });
        setVotes(data);
        router.push("/pages/thankyou");
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (language === "en") message.error("Couldn't cast your vote");
        if (language === "ta") message.error("வாக்களிக்க முடியவில்லை");
        if (language === "si")
          message.error("ඔබේ ඡන්දය ප්‍රකාශ කිරීමට නොහැකි විය");
      }
    },
    []
  );

  //  API triggers for fingerprints
  useEffect(() => {
    setIsLoading(true);
    if (nic) {
      getUserEligibility(nic);
    } else {
      if (language === "en") message.error("Your NIC number is not detected.");
      if (language === "ta") message.error("உங்கள் NIC எண் கண்டறியப்படவில்லை.");
      if (language === "si")
        message.error("ඔබගේ ජාතික හැඳුනුම්පත් අංකය අනාවරණය කර නොමැත.");
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
      // postVoterInformation(nic);
    }
    setIsLoading(false);
  }, [eligibleError, getAuthorized, getUserEligibility, nicId, nic]);

  useEffect(() => {
    setIsLoading(true);
    if (castVote) {
      postVote(castVote.nic_id, castVote.party_id, castVote.candidate_id);
    }

    if (candidateRequestInfo) {
      postCandidateByDistrict(
        candidateRequestInfo.district,
        candidateRequestInfo.party
      );
    } else {
      if (language === "en")
        message.error("Your district or selected party is invalid.");
      if (language === "ta")
        message.error(
          "உங்கள் மாவட்டம் அல்லது தேர்ந்தெடுக்கப்பட்ட கட்சி தவறானது."
        );
      if (language === "si")
        message.error("ඔබගේ දිස්ත්‍රික්කය හෝ තෝරාගත් පාර්ශවය වලංගු නොවේ.");
    }

    setIsLoading(false);
  }, [castVote, nic, party, candidateRequestInfo]);

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
      candidateByDistrictInfo,
      setParty,
      setNic,
      setVotes,
      setEligible,
      setSelectedParty,
      setNicId,
      setVoterInformation,
      setCandidateRequestInfo,
      setCastVote,
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
      candidateByDistrictInfo,
      setNic,
      setParty,
      setVotes,
      setEligible,
      setSelectedParty,
      setNicId,
      setVoterInformation,
      setCandidateRequestInfo,
      setCastVote,
    ]
  );
  return <appContext.Provider value={ctx}>{children}</appContext.Provider>;
};

const useAppContext = (): TAppContext => useContext(appContext);

export default useAppContext;
