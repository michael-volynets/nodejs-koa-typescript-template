import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.resolve(__dirname, ".env")});

export default {
    name: process.env.NODE_ENV,
    port: process.env.PORT,
    secretKey: process.env.SECRET_KEY,
    mongoConnectionString: process.env.MONGO_CONNECTION,
    isDevelopment: (): boolean => {
        return process.env.NODE_ENV === "development";
    }
};