import axios from "axios"
import UserInfo from "../types/UserInfo";

// const delay = (milliseconds:number) => {
// 	return new Promise(resolve => {
// 			setTimeout(resolve, milliseconds);
// 	});
// }

// await delay(2000);

export const userInfoUrlEndpoint = "/.auth/me";

export const getUserInfo = async (): Promise<UserInfo> => {
	const res = await axios.get(userInfoUrlEndpoint);
	return res.data.clientPrincipal;
}