import axios from "axios"
import Purchase from "../types/Purchase";
import { getUserInfo } from "./userInfoApi";
const api = axios.create({
	baseURL: "/data-api/rest"
});

export const purchaseUrlEndpoint = "/Purchase";

// TODO: Fetching userInfo twice? user SWR or similar instead?
export const getPurchases = async (): Promise<Purchase[]> => {
	const userInfo = await getUserInfo();
	const res = await api.get(`${purchaseUrlEndpoint}?$filter=UserID eq '${userInfo.userId}'`);
	return res.data.value;
}

// TODO: Destructuring pattern can be cleaned
export const addPurchase = async ({UserID, CategoryID, PurchaseAmount, PurchaseDate, Notes}:Purchase): Promise<Purchase> => {
	const res = await api.post(purchaseUrlEndpoint, {UserID, CategoryID, PurchaseAmount, PurchaseDate, Notes});
	return res.data.value;
}

export const updatePurchase = async (category: Purchase) => { 
	const res = await api.patch(`${purchaseUrlEndpoint}/PurchaseID/${category.PurchaseID}`, category);
	return res.data.value;
}

export const deletePurchase = async (PurchaseID: number): Promise<void> => {
	const res = await api.delete(`${purchaseUrlEndpoint}/PurchaseID/${PurchaseID}`);
	return res.data.value;
}