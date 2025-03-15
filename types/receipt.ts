export interface ReceiptItem {
  name: string
  weight: string
  category: string
}

export interface Receipt {
  id: number
  name: string
  date: string
  amount: string
  type: string
  items: ReceiptItem[]
}

