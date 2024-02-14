import { useState } from "react"
import BasePage from "./BasePage"
import Category from "../types/Category"
import Grid from "@mui/material/Grid"
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, Stack, TextField, Typography } from "@mui/material"
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
			<Stack spacing={2}>
				<Typography variant="h6">
					Customize Categories
				</Typography>

				<Grid container>
					<Grid>
						<TextField variant="standard" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
					</Grid>
					<Grid>
						<Button variant="text" onClick={handleAddCategory}>Add</Button>
					</Grid>
				</Grid>

				<Stack>
					{categories?.map(c => {
						return(
							<Grid container key={c.CategoryID}>
								<Grid>
									<Typography variant="body1">{c.Name}</Typography>
								</Grid>
								
								<IconButton aria-label="delete" size="small" onClick={() => deleteCategoryMutate(c)}>
									<EditIcon fontSize="small"/>
								</IconButton>
							</Grid>
						)
					})}
				</Stack>
			</Stack>
    </BasePage>
  )
}

export default Customization
