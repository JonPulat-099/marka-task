import useFetch from '@/composables/useFetch'
import type { AxiosPromise } from 'axios'
import type { TBaseResponse, TLead } from '../types'

namespace amoCRMAPI {
  export namespace GET {
    export namespace LeadsList {
      export type Params = {
        query: string
      }
      export type Response = AxiosPromise<TBaseResponse<TLead[]>>
    }
  }
}

export const getLeads = (
  params: amoCRMAPI.GET.LeadsList.Params
): amoCRMAPI.GET.LeadsList.Response => useFetch('/leads', { params })
