import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.port || 5000;
export const MONGO_URI = process.env.MONGO_URI;
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
export const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;
export const SERVER_BASE_URL = process.env.SERVER_BASE_URl;
export const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
