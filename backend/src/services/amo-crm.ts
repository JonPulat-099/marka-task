import type {
    BaseReturnType,
    TContact,
    TContactData,
    TLead,
    TLeadsData,
    TLeadsParams,
    TLeadStatus,
    TLeadStatusData,
    TLeadStatusParams,
    TUserInfo,
    TUserInfoData,
} from "../types";
import axios, { AxiosError } from "axios";
import dotenv from "dotenv";
dotenv.config();


/**
 * CONSTANTS of amoCRM services
 */
const BASE_URL = process.env.SERVICE_AMOCRM_API || "";
const TOKEN_TYPE = process.env.SERVICE_AMOCRM_TOKEN_TYPE || "";
const TOKEN = process.env.SERVICE_AMOCRM_TOKEN || "";

/**
 * API modul
 */
export namespace AMOCRMServiceAPI {
    export const Headers = {
        Authorization: `${TOKEN_TYPE} ${TOKEN}`,
        Accept: "application/json",
    };

    export namespace GET {
        export namespace AllLeads {
            export type Params = TLeadsParams;
            export type Response = TLeadsData;
            export type ReturnType = TLead;
        }

        export namespace ContactInfoByID {
            export type Params = number;
            export type Response = TContactData;
            export type ReturnType = TContact
        }

        export namespace LeadsStatus {
            export type Params = TLeadStatusParams;
            export type Response = TLeadStatusData;
            export type ReturnType = TLeadStatus
        }

        export namespace UserInfoByID {
            export type Params = number;
            export type Response = TUserInfoData;
            export type ReturnType = TUserInfo
        }
    }
}

/**
 * Methods of amoCRM service
 */

export const getAllLeads = async (
    params?: AMOCRMServiceAPI.GET.AllLeads.Params
): Promise<BaseReturnType<AMOCRMServiceAPI.GET.AllLeads.ReturnType[]>> => {
    if (params?.query && params.query.length < 3) {
        return {
            data: [],
            status: 400,
            message: "Введите не менее 3 символов для поиска",
        };
    }

    try {
        const { data } = await axios.get<AMOCRMServiceAPI.GET.AllLeads.Response>(
            `${BASE_URL}/leads`,
            {
                params,
                headers: AMOCRMServiceAPI.Headers,
            }
        );

        return {
            status: 200,
            message: "",
            data:
                data?._embedded?.leads?.map((x) => ({
                    id: x.id,
                    name: x.name,
                    price: x.price,
                    responsible_user_id: x.responsible_user_id,
                    status_id: x.status_id,
                    pipeline_id: x.pipeline_id,
                    updated_by: x.updated_by,
                    created_at: x.created_at,
                    company_id: x._embedded.companies[0].id,
                    contact_id: x._embedded.contacts[0]?.id,
                    contact: null,
                    status: null,
                    user: null
                })) || [],
        };
    } catch (e) {
        const { status, detail } = (
            e as AxiosError<any, { status: number; detail: string }>
        ).response?.data;

        return {
            data: [],
            status,
            message: detail,
        };
    }
};

export const getContactInfo = async (
    contactId: AMOCRMServiceAPI.GET.ContactInfoByID.Params
): Promise<BaseReturnType<AMOCRMServiceAPI.GET.ContactInfoByID.ReturnType | null>> => {
    try {
        const { data } =
            await axios.get<AMOCRMServiceAPI.GET.ContactInfoByID.Response>(
                `${BASE_URL}/contacts/` + contactId,
                {
                    headers: AMOCRMServiceAPI.Headers,
                }
            );

        const email =
            data.custom_fields_values
                ?.find((x) => x.field_code === "EMAIL")
                ?.values?.map((x) => x.value)
                ?.join(", ") || "";

        const phone =
            data.custom_fields_values
                ?.find((x) => x.field_code === "PHONE")
                ?.values?.map((x) => x.value)
                ?.join(", ") || "";

        return {
            data: {
                id: data.id,
                name: data.name,
                email,
                phone,
            },
            message: '',
            status: 200
        }

    } catch (e) {
        const { status, detail } = (
            e as AxiosError<any, { status: number; detail: string }>
        ).response?.data;

        return {
            data: null,
            status,
            message: detail,
        };
    }
};

export const getLeadStatus = async (
    params: AMOCRMServiceAPI.GET.LeadsStatus.Params
): Promise<BaseReturnType<AMOCRMServiceAPI.GET.LeadsStatus.ReturnType | null>> => {
    try {
        const { data } = await axios.get<AMOCRMServiceAPI.GET.LeadsStatus.Response>(
            `${BASE_URL}/leads/pipelines/${params.piplineId}/statuses/${params.statusId}`,
            {
                headers: AMOCRMServiceAPI.Headers,
            }
        );

        return {
            data: {
                id: data.id,
                name: data.name,
                color: data.color,
            },
            message: '',
            status: 200
        }
    } catch (e) {
        const { status, detail } = (
            e as AxiosError<any, { status: number; detail: string }>
        ).response?.data;

        return {
            data: null,
            status,
            message: detail,
        };
    }
};

export const getUserInfoByID = async (
    params: AMOCRMServiceAPI.GET.UserInfoByID.Params
): Promise<BaseReturnType<AMOCRMServiceAPI.GET.UserInfoByID.ReturnType | null>> => {
    try {
        const { data } =
            await axios.get<AMOCRMServiceAPI.GET.UserInfoByID.Response>(
                `${BASE_URL}/users/${params}`,
                {
                    headers: AMOCRMServiceAPI.Headers,
                }
            );

        return {
            data: {
                id: data.id,
                name: data.name,
            },
            message: '',
            status: 200
        };
    } catch (e) {
        const { status, detail } = (
            e as AxiosError<any, { status: number; detail: string }>
        ).response?.data;

        return {
            data: null,
            status,
            message: detail,
        };
    }
};

export const pingService = async () => {
    if (!BASE_URL || !TOKEN || !TOKEN_TYPE) {
        throw Error('Проверьте конфигурацию, связанную с сервисом amoCRM (BASE_URL, TOKEN, TOKEN_TYPE)');
    }

    try {
        await axios.get(`${BASE_URL}/account`, {
            headers: AMOCRMServiceAPI.Headers
        })
        console.log('\x1b[42m', 'amoCRM service: ✅ OK', '\x1b[0m');
    } catch (e) {
        throw Error('Сервис amoCRM не работает, пользователь не авторизован');
    }
}
