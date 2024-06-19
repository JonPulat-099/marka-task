import type { TLead } from '@/shared/types'
import { formatDateForClient, formatPriceForClient } from '@/shared/helpers'

export function formattingLeads(list: TLead[]) {
  return list.map((x, i) => ({
    key: i + 1,
    ...x,
    price: formatPriceForClient(x.price),
    created_at: formatDateForClient(x.created_at)
  }))
}
