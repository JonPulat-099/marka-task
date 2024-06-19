import { getAllLeads, getContactInfo, getLeadStatus, getUserInfoByID } from "../services/amo-crm";
import { FastifyRequest, FastifyReply } from "fastify";


export const fetchLeads = async (req: FastifyRequest, res: FastifyReply) => {
    const query = (req.query as any).query
    const resp = await getAllLeads({ with: 'contacts', query: query || '' })
    const leadsLen = resp.data.length

    if (resp.status === 200 && leadsLen) {

        for (let i = 0; i < leadsLen; i++) {
            if (resp.data[i].contact_id) {
                const contacts = await getContactInfo(resp.data[i].contact_id)
                resp.data[i]['contact'] = contacts.data
            }

            if (resp.data[i].pipeline_id && resp.data[i].status_id) {
                const status = await getLeadStatus({ piplineId: resp.data[i].pipeline_id, statusId: resp.data[i].status_id })
                resp.data[i]['status'] = status.data
            }

            if (resp.data[i].responsible_user_id) {
                const user = await getUserInfoByID(resp.data[i].responsible_user_id)
                resp.data[i]['user'] = user.data
            }
        }
    }

    return res.code(resp.status).send(resp)
}