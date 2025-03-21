import { useQuery } from "react-query";
import { QK } from "../base/qk";
import { getUserProfile } from "../api/services/user";

// custom hooks
export const useUserProfile = () => {
  const profile = useQuery([QK.userProfile], getUserProfile);
  return profile.data;
};
