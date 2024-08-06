import { useState } from "react"
import BasePage from "./BasePage"
import Category from "../types/Category"
import useSWR from "swr";
import { 
	getCategories,
	addCategory,
	// updateCategory,
	deleteCategory,
	categoriesUrlEndpoint
} from "../api/categoriesApi";

function Customization() {
	const [newCategory, setNewCategory] = useState("");

	const {
		data: categories,
		mutate
	} = useSWR(categoriesUrlEndpoint, getCategories, {
		suspense: true
	});

	const addCategoryMutate = async (newCategory: Category) => {
		try {
			await addCategory(newCategory);
			mutate();
		} catch(e) {
			console.error(e); 
		}
	}

	// const updateCategoryMutate = async (updatedCategory: Category) => {
	// 	try {
	// 		await updateCategory(updatedCategory);
	// 		mutate();
	// 	} catch(e) {
	// 		console.error(e);
	// 	}
	// } 

	const deleteCategoryMutate = async ({CategoryID}: Category) => {
		try {
			await deleteCategory(CategoryID);
			mutate();
		} catch (e) {
			console.error(e);
		}
	}

	const handleAddCategory = () => {
		addCategoryMutate({ 
			CategoryID: -1,
			UserID: 1,
			Name: newCategory.toUpperCase()
		});

		setNewCategory("");
	}

  return (
    <BasePage>
				<h2>Customization</h2>
				
				<input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
				<input type="button" value="Add" onClick={handleAddCategory} />

				<table>
					<tbody>
						{categories?.map(c => {
							return(
								<tr key={c.CategoryID}>
									<td>{c.Name}</td>
									
									<td>
										<input type="button" value="Delete" onClick={() => deleteCategoryMutate(c)}/>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
    </BasePage>
  )
}

export default Customization
