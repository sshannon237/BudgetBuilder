import axios from "axios"
import Category from "../types/Category";

// const delay = (milliseconds:number) => {
// 	return new Promise(resolve => {
// 			setTimeout(resolve, milliseconds);
// 	});
// }

const api = axios.create({
	baseURL: "/data-api/rest"
});

export const categoriesUrlEndpoint = "/Category";

export const getCategories = async (): Promise<Category[]> => {
	// await delay(2000);
	const res = await api.get(categoriesUrlEndpoint);
	return res.data.value;
}

export const addCategory = async ({UserID, Name}:Category): Promise<Category> => {
	const res = await api.post(categoriesUrlEndpoint, {UserID, Name});
	return res.data.value;
}

export const updateCategory = async (category: Category) => {
	const res = await api.patch(`${categoriesUrlEndpoint}/CategoryID/${category.CategoryID}`, category);
	return res.data.value;
}

export const deleteCategory = async (CategoryID: number): Promise<void> => {
	const res = await api.delete(`${categoriesUrlEndpoint}/CategoryID/${CategoryID}`);
	return res.data.value;
}