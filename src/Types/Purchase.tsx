import { Moment } from "moment"

interface Purchase {
	PurchaseID: number,
	CategoryID: number,
	PurchaseDate: Moment,
	Notes: string
}

export default Purchase