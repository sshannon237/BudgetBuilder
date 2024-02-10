import { useEffect, useState } from "react"
import BasePage from "./BasePage"
import Category from "../Types/Category"
import Grid from "@mui/material/Unstable_Grid2"
import { Button, TextField, Typography } from "@mui/material"

function Customization() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [newCategory, setNewCategory] = useState("");
	
	useEffect(() => {
		const getCategories = async () => {
			try {
				const res = await fetch("/data-api/rest/Category");
				if (!res.ok) {
					throw new Error(res.statusText);
				} 
				const result = await res.json();

				console.log(result.value)

				setCategories(result.value);
			} catch (e) {
				console.error(e);
			}
		};

		getCategories();
	}, []);

	const postCategory = async () => {
		try {
			const data: Category = {
				UserID: 1,
				Name: newCategory
			}

			const res = await fetch("/data-api/rest/Category", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data)
			});

			if (!res.ok) {
				throw new Error(res.statusText);
			}
			setNewCategory("");

			const result = await res.json();
			setCategories([...categories, ...result.value]);
		} catch (e) {
			console.error(e);
		}
	};

  return (
    <BasePage>
			<Grid container spacing={2}>
				<Grid xs={12}>
					<Typography variant="h6">
						Customize Categories
					</Typography>
				</Grid>

				<Grid container xs={12}>
					<Grid>
						<TextField variant="standard" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
					</Grid>

					<Grid>
						<Button variant="text" onClick={postCategory}>Add</Button>
					</Grid>
				</Grid>
				
				<Grid xs={12}>
					{categories.map(c => {
						return <Typography key={c.CategoryID} variant="body1">{c.Name}</Typography>
					})}
				</Grid>
			</Grid>
    </BasePage>
  )
}

export default Customization
