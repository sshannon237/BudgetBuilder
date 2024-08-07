import axios from "axios"
import Purchase from "../types/Purchase";

// const delay = (milliseconds:number) => {
// 	return new Promise(resolve => {
// 			setTimeout(resolve, milliseconds);
// 	});
// }

const api = axios.create({
	baseURL: "/data-api/rest"
});

export const purchaseUrlEndpoint = "/Purchase";

export const getPurchases = async (): Promise<Purchase[]> => {
	// await delay(2000);
	const res = await api.get(purchaseUrlEndpoint);
	return res.data.value;
}

// TODO: Destructuring pattern can be cleaned
export const addPurchase = async ({CategoryID, PurchaseAmount, PurchaseDate, Notes}:Purchase): Promise<Purchase> => {
	
	console.log({CategoryID, PurchaseAmount, PurchaseDate, Notes});
	const res = await api.post(purchaseUrlEndpoint, {CategoryID, PurchaseAmount, PurchaseDate, Notes});
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