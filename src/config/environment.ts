import dotenv from "dotenv";
import path from 'path';

dotenv.config({path: path.resolve(__dirname, '.env')});

export default {
    name: process.env.NODE_ENV,
    port: process.env.PORT
}