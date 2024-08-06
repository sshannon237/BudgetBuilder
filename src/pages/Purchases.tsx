import useSWR from "swr";
import BasePage from "./BasePage"
import { addPurchase, getPurchases, purchaseUrlEndpoint } from "../api/purchasesApi";
import { useState } from "react";
import { categoriesUrlEndpoint, getCategories } from "../api/categoriesApi";
import Purchase from "../types/Purchase";
import moment from "moment";

function Purchases() {

	const [newDate, setNewDate] = useState("");
	const [newCategory, setNewCategory] = useState("");
	const [newNotes, setNewNotes] = useState("");
  const [month, setMonth] = useState("2024-08");  

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
			CategoryID: parseInt(newCategory), //TODO: remove ?? -1
			PurchaseDate: moment(newDate), //TODO: remove ?? moment()
			Notes: newNotes.toUpperCase()
		});

		setNewDate("");
		setNewCategory("");
		setNewNotes("");
	}
	
  return (
    <BasePage>
      <h2>Purchases</h2>

      <input type="month" value={month} onChange={e => setMonth(e.target.value)}/>

      <div>
        <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)}/>
        <select onChange={e => setNewCategory(e.target.value)}>
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
            <th>Category</th>
            <th>Notes</th>
          </tr>
          {purchases.map((purchase) => (
                <tr key={purchase.PurchaseID}>
                  <td>{moment(purchase.PurchaseDate).format("DD/MM/YY")}</td>
                  <td>{purchase.CategoryID}</td>
                  <td>{purchase.Notes}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </BasePage>
  )
}

export default Purchases
