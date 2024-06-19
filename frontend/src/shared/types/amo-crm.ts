export type TBaseResponse<T> = {
  data: T
  status: number
  message: string
}

export type TLead = {
  id: number
  name: string
  price: number
  responsible_user_id: number
  status_id: number
  pipeline_id: number
  updated_by: number
  created_at: number
  company_id: number
  contact_id: number
  status: null | {
    id: number
    name: string
    color: string
  }
  user: null | {
    id: number
    name: string
  }
  contact: null | {
    id: number
    name: string
    email: string
    phone: string
  }
}
