import pg from "pg";
import env from "dotenv";

env.config();

export const db = new pg.Client({
    user: "postgres",
    password: process.env.DB_PASS,
    database: "blog",
    host: "localhost",
    port: 5432
});