export interface MonthlyData {
  month: string
  recycled: number
  composted: number
  landfill: number
}

export interface WasteCategory {
  category: string
  amount: number
  recyclable: boolean
}

export interface Stats {
  total: number
  recycled: number
  composted: number
  landfill: number
  monthlyData: MonthlyData[]
  wasteByCategory: WasteCategory[]
}

