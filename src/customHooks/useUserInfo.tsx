import { useOutletContext } from "react-router-dom";
import UserInfo from "../types/UserInfo";

type ContextType = { userInfo: UserInfo | null}

const useUserInfo = () => {
  return useOutletContext<ContextType>();
}
export default useUserInfo;