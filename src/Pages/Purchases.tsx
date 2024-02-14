import useSWR from "swr";
import BasePage from "./BasePage"
import { addPurchase, getPurchases, purchaseUrlEndpoint } from "../api/purchasesApi";
import { Autocomplete, Button, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import { categoriesUrlEndpoint, getCategories } from "../api/categoriesApi";
import Purchase from "../types/Purchase";
import { DatePicker } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import Category from "../types/Category";

function Purchases() {

	const [newDate, setNewDate] = useState<Moment|null>(null);
	const [newCategory, setNewCategory] = useState<Category|null>(null);
	const [newNotes, setNewNotes] = useState("");

	const {
		data: purchases,
		mutate
	} = useSWR(purchaseUrlEndpoint, getPurchases, {
		suspense: true
	});

	const {
		data: categories
	} = useSWR(categoriesUrlEndpoint, getCategories, {
		suspense: true,
	});

	const addPurchaseMutate = async (newPurchase: Purchase) => {
		try {
			await addPurchase(newPurchase);
			mutate();
		} catch(e) {
			console.error(e);
		}
	}

	const handleAddPurchase = () => {
		addPurchaseMutate({
			PurchaseID: -1,
			CategoryID: newCategory?.CategoryID ?? -1, //TODO: remove ?? -1
			PurchaseDate: newDate ?? moment(), //TODO: remove ?? moment()
			Notes: newNotes.toUpperCase()
		});

		setNewDate(null);
		setNewCategory(null);
		setNewNotes("");
	}
	
  return (
    <BasePage>
			<Stack>
				<Grid container>
					<Grid>
						<DatePicker value={newDate} onChange={(newValue) => setNewDate(newValue)}/>
					</Grid>
					<Grid>
						<Autocomplete 
							options={categories}
							getOptionLabel={(c) => c.Name}
							value={newCategory}
							onChange={(_, newVal) => {setNewCategory(newVal)}}
							renderInput={(params) => <TextField {...params} label="Category" />} />
					</Grid>
					<Grid>
						<TextField value={newNotes} onChange={(e) => setNewNotes(e.target.value)} />
					</Grid>
					<Grid>
						<Button variant="text" onClick={handleAddPurchase}>Add</Button>
					</Grid>
				</Grid>

				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>Category</TableCell>
							<TableCell>Notes</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{purchases.map((purchase) => (
							<TableRow key={purchase.PurchaseID}>
								<TableCell>{moment(purchase.PurchaseDate).format("DD/MM/YY")}</TableCell>
								<TableCell>{purchase.CategoryID}</TableCell>
								<TableCell>{purchase.Notes}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Stack>
    </BasePage>
  )
}

export default Purchases
