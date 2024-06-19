import fastify from "fastify";
import cors from '@fastify/cors'
import dotenv from "dotenv";
import { pingService } from "./services/amo-crm";

const defaultRoutes = require("./routes");

dotenv.config();

/**
 * Check Services
 */

(async () => {
    try {
        await pingService()
    } catch (e) {
        console.error('\x1b[41m', e, '\x1b[0m');
        process.exit(1)        
    }
})()

const server = fastify();
server.register(cors, {
    origin: true
})
server.register(defaultRoutes, { prefix: '' })

const PORT: number = (process.env.PORT && Number(process.env.PORT)) || 2332;
const HOST: string = process.env.HOST || "0.0.0.0";
server.listen({ port: PORT, host: HOST }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
