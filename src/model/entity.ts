export interface Grade {
  id: string
  name: string
  cash_back: number
}

export interface User {
  first_name: string | null
  birth_date: Date | null
  second_name: string | null
  phone_number: string
  city: string | null
  sex: string | null
  grade_id: string | null
  address_id: string | null
}

export interface Order {
  id: string
  price: number
  created_at: Date
  update_at: Date
  phone_number: string | null
  status: string
}

export interface ProductCashBack {
  id: string
  status: string | null
  cash_back: number | null
}

export interface Product {
  id: string
  name: string
  type: string
  volume: number | null
  price: number | null
  cost: number | null
}
