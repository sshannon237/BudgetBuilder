import useSWR from "swr";
import BasePage from "./BasePage"
import { addPurchase, deletePurchase, getPurchases, purchaseUrlEndpoint } from "../api/purchasesApi";
import { useState } from "react";
import { categoriesUrlEndpoint, getCategories } from "../api/categoriesApi";
import Purchase from "../types/Purchase";
import moment from "moment";

function Purchases() {

	const [newDate, setNewDate] = useState("");
	const [newAmount, setNewAmount] = useState("");
	const [newCategory, setNewCategory] = useState("");
	const [newNotes, setNewNotes] = useState("");
  const [month, setMonth] = useState("");  

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
		console.log(newCategory)
		addPurchaseMutate({
			PurchaseID: -1,
			PurchaseAmount: parseInt(newAmount), 
			CategoryID: parseInt(newCategory),
			PurchaseDate: moment(newDate),
			Notes: newNotes.toUpperCase()
		});

		setNewDate("");
		setNewCategory("");
		setNewNotes("");
	}

	const deletePurchaseMutate = async ({PurchaseID}: Purchase) => {
		try {
			await deletePurchase(PurchaseID);
			mutate();
		} catch (e) {
			console.error(e);
		}
	}
	
  return (
    <BasePage>
      <h2>Purchases</h2>

      <input type="month" value={month} onChange={e => setMonth(e.target.value)}/>
			<input type="button" value="All Purchases" onClick={() => setMonth("")}/>

      <div>
        <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)}/>
				<input type="number" value={newAmount} onChange={e => setNewAmount(e.target.value)}/>
        <select onChange={e => {
					console.log(e.target.value)
					setNewCategory(e.target.value)
				}
				}>
					<option />
          {categories.map((category) => (
            <option key={category.CategoryID} value={category.CategoryID}>{category.Name}</option>
          ))} 
        </select>
        <input type="text" placeholder="Note" value={newNotes} onChange={e => setNewNotes(e.target.value)}/>
        <input type="button" value="Add Purchase" onClick={handleAddPurchase}/>
      </div>

      <table>
        <tbody>
          <tr>
            <th>Date</th>
						<th>Amount</th>
            <th>Category</th>
            <th>Notes</th>
						<th/>
          </tr>
          {purchases.map((purchase) => {
						console.log(month)
							if (month.length == 0 || moment(purchase.PurchaseDate).isSame(moment(month), "month")) {
								return (
									<tr key={purchase.PurchaseID}>
										<td>{moment(purchase.PurchaseDate).format("DD/MM/YY")}</td>
										<td>{purchase.PurchaseAmount}</td>
										<td>{purchase.CategoryID}</td>
										<td>{purchase.Notes}</td>
										<td>
											<input type="button" value="Delete" onClick={() => deletePurchaseMutate(purchase)}/>
										</td>
									</tr>
								)
							}
						})}
        </tbody>
      </table>
    </BasePage>
  )
}

export default Purchases
