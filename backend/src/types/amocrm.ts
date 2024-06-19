export type BaseReturnType<T> = {
    status: number;
    message: string;
    data: T;
};

/**
 * Types for Leads
 */
export type TLeadsParams = {
    with?: string;
    page?: number;
    limit?: number;
    query?: string;
    filter?: {
        id: number | number[];
        name: string | string[];
    };
    order?: {
        id: "asc" | "desc";
        updated_at: "asc" | "desc";
        created_at: "asc" | "desc";
    };
};

export type TLeadsData = {
    _page: number;
    _embedded: {
        leads: {
            id: number;
            name: string;
            status_id: number;
            pipeline_id: number;
            created_at: number;
            updated_at: number;
            price: number;
            responsible_user_id: number;
            updated_by: number;
            _embedded: {
                companies: {
                    id: number;
                }[];
                contacts: {
                    id: number;
                }[];
            };
        }[];
    };
};

export type TLead = {
    id: number;
    name: string;
    price: number;
    responsible_user_id: number;
    status_id: number;
    pipeline_id: number;
    updated_by: number;
    created_at: number;
    company_id: number;
    contact_id: number;
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


/**
 * Types for Contacts
 */
export type TContactData = {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    created_at: number;
    updated_at: number;
    custom_fields_values: {
        field_id: number;
        field_name: string;
        field_code: "PHONE" | "EMAIL";
        field_type: "multitext";
        values: [
            {
                value: string;
                enum_id: string;
                enum_code: string;
            }
        ];
    }[];
    account_id: number;
};

export type TContact = {
    id: number;
    name: string;
    email: string;
    phone: string;
}


/**
 * Types for Status
 */
export type TLeadStatusParams = {
    piplineId: number;
    statusId: number
}

export type TLeadStatusData = {
    id: number;
    name: string;
    sort: number;
    is_editable: boolean;
    pipeline_id: number;
    color: string;
    type: number;
    account_id: number;
};

export type TLeadStatus = {
    id: number
    name: string
    color: string
}

/**
 * Types for UserInfo
 */
export type TUserInfoData = {
    id: number;
    name: string;
    email: string;
    lang: string;
}

export type TUserInfo = {
    id: number
    name: string
}
