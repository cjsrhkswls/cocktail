import { Sequelize } from "sequelize";

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

export const conn = new Sequelize(`mysql://${DB_USER}:${DB_PASSWORD}@localhost:3306/${DB_NAME}`);