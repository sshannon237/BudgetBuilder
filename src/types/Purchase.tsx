import { Moment } from "moment"

interface Purchase {
	PurchaseID: number,
	CategoryID: number,
	PurchaseAmount: number,
	PurchaseDate: Moment,
	Notes: string
}

export default Purchase